export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmation } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    // PayComet sends application/x-www-form-urlencoded
    const formData = await req.formData()
    const fields: Record<string, string> = {}
    formData.forEach((value, key) => {
      fields[key] = String(value)
    })

    const { Order, Amount, Currency, Response, ErrorCode, Signature } = fields

    // Verify HMAC signature if secret is configured
    const secret = process.env.PAYCOMET_WEBHOOK_SECRET
    if (secret && Signature) {
      const terminal = process.env.PAYCOMET_TERMINAL ?? ''
      const raw = `${terminal}${Order}${Amount}${Currency}${Response}${ErrorCode}`
      const expected = createHmac('sha256', secret).update(raw).digest('hex')

      try {
        const sigBuf = Buffer.from(Signature, 'hex')
        const expBuf = Buffer.from(expected, 'hex')
        if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
          console.warn('[PayComet webhook] Invalid signature for order', Order)
          return NextResponse.json({ ok: false }, { status: 403 })
        }
      } catch {
        console.warn('[PayComet webhook] Signature comparison failed for order', Order)
        return NextResponse.json({ ok: false }, { status: 403 })
      }
    }

    if (Response === 'OK' && ErrorCode === '0') {
      console.log('[PayComet webhook] ✅ Payment confirmed', { Order, Amount, Currency })

      const pending = await prisma.pendingOrder.findUnique({ where: { orderId: Order } })
      if (pending) {
        await prisma.booking.upsert({
          where: { orderId: Order },
          update: { status: 'confirmed' },
          create: {
            orderId: Order,
            slug: pending.slug,
            experienceTitle: pending.experienceTitle,
            name: pending.name,
            email: pending.email,
            phone: pending.phone,
            date: pending.date,
            people: pending.people,
            tierLabel: pending.tierLabel,
            depositPaid: pending.depositPaid,
            fullPrice: pending.fullPrice,
            status: 'confirmed',
            specialRequests: pending.specialRequests,
          },
        })

        await sendBookingConfirmation({
          to: pending.email,
          name: pending.name,
          orderId: Order,
          experienceTitle: pending.experienceTitle,
          date: pending.date,
          people: pending.people,
          tierLabel: pending.tierLabel,
          depositPaid: pending.depositPaid,
          fullPrice: pending.fullPrice,
        })

        await prisma.pendingOrder.delete({ where: { orderId: Order } })
        console.log('[PayComet webhook] Booking saved and email sent for order', Order)
      } else {
        console.warn('[PayComet webhook] No pending order found for', Order)
      }
    } else {
      console.log('[PayComet webhook] ❌ Payment failed', { Order, Response, ErrorCode })
    }

    // Always return 200 — PayComet retries on 4xx/5xx indefinitely
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[PayComet webhook] error:', err)
    // Still return 200 to stop retries
    return NextResponse.json({ ok: true })
  }
}

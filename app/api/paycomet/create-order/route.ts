export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { experiences } from '@/lib/experiences'
import { createPaycometOrder } from '@/lib/paycomet'
import { generateOrderId } from '@/lib/order-id'
import { db } from '@/lib/db'

const schema = z.object({
  slug: z.string().min(1),
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(9).max(20),
  date: z.string().min(1),
  people: z.number().int().min(1).max(20),
  tierPrice: z.number().positive(),
  tierLabel: z.string().min(1),
  specialRequests: z.string().max(500).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data', details: parsed.error.flatten() }, { status: 400 })
    }

    const { slug, name, email, phone, date, people, tierPrice, tierLabel, specialRequests } = parsed.data

    // Server-side price verification — never trust the client amount
    const experience = experiences.find((e) => e.slug === slug)
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }

    const validTier = experience.pricingTiers?.find((t) => t.label === tierLabel)
    if (!validTier) {
      return NextResponse.json({ error: 'Invalid pricing tier' }, { status: 400 })
    }

    // Charge deposit if defined, otherwise charge the full tier price
    const chargePerUnit = validTier.deposit ?? validTier.price
    const isFlat = validTier.perPerson === false
    const chargeEuros = isFlat ? chargePerUnit : chargePerUnit * people
    const amountCents = String(Math.round(chargeEuros * 100))
    const orderId = generateOrderId()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const terminal = Number(process.env.PAYCOMET_TERMINAL)
    if (!terminal || isNaN(terminal)) {
      console.error('PAYCOMET_TERMINAL not configured')
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 503 })
    }

    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1'

    const paycometRes = await createPaycometOrder({
      terminal,
      order: orderId,
      amount: amountCents,
      currency: 'EUR',
      originalIp: clientIp,
      productDescription: `${experience.title} — ${isFlat ? 'Privado' : `${people} persona${people > 1 ? 's' : ''}`} · ${tierLabel}`,
      merchantDescription: 'TenerifeDreamsExcursion',
      language: 'en',
      urlOk: `${siteUrl}/checkout/success?order=${orderId}&slug=${slug}`,
      urlKo: `${siteUrl}/checkout/error?order=${orderId}&slug=${slug}`,
    })

    if (paycometRes.errorCode !== 0 || !paycometRes.challengeUrl) {
      console.error('PayComet error:', paycometRes)
      return NextResponse.json(
        { error: `Payment gateway error (code ${paycometRes.errorCode})` },
        { status: 502 }
      )
    }

    const fullPrice = isFlat ? validTier.price : validTier.price * people

    // Persist pending order so the webhook can look up customer data
    await db.pendingOrder.create({
      orderId,
      slug,
      experienceTitle: experience.title,
      name,
      email,
      phone,
      date,
      people,
      tierLabel,
      depositPaid: chargeEuros,
      fullPrice,
      specialRequests: specialRequests ?? null,
    })

    console.log('[PayComet] Order created', { orderId, slug, name, email, tierLabel, chargeEuros, fullPrice })

    return NextResponse.json({ challengeUrl: paycometRes.challengeUrl, orderId })
  } catch (err) {
    console.error('[PayComet] create-order error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

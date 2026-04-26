import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'

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
      // TODO: update order status in DB, send confirmation email, etc.
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

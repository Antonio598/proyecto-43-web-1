import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { experiences } from '@/lib/experiences'
import { createPaycometOrder } from '@/lib/paycomet'
import { generateOrderId } from '@/lib/order-id'

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

    const validTier = experience.pricingTiers?.find(
      (t) => t.price === tierPrice && t.label === tierLabel
    )
    if (!validTier) {
      return NextResponse.json({ error: 'Invalid pricing tier' }, { status: 400 })
    }

    const totalEuros = tierPrice * people
    const amountCents = String(Math.round(totalEuros * 100))
    const orderId = generateOrderId()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const terminal = Number(process.env.PAYCOMET_TERMINAL)
    if (!terminal || isNaN(terminal)) {
      console.error('PAYCOMET_TERMINAL not configured')
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 503 })
    }

    const paycometRes = await createPaycometOrder({
      terminal,
      methods: [1],
      order: orderId,
      amount: amountCents,
      currency: 'EUR',
      productDescription: `${experience.title} — ${people} persona${people > 1 ? 's' : ''} · ${tierLabel}`,
      merchantDescription: 'TenerifeDreamsExcursion',
      language: 'en',
      urlOk: `${siteUrl}/checkout/success?order=${orderId}&slug=${slug}`,
      urlKo: `${siteUrl}/checkout/error?order=${orderId}&slug=${slug}`,
      hosted: 1,
      userInteraction: 1,
    })

    if (paycometRes.errorCode !== 0 || !paycometRes.challengeUrl) {
      console.error('PayComet error:', paycometRes)
      return NextResponse.json(
        { error: `Payment gateway error (code ${paycometRes.errorCode})` },
        { status: 502 }
      )
    }

    // Log the booking intent (extend with DB write later)
    console.log('[PayComet] Order created', {
      orderId,
      slug,
      name,
      email,
      phone,
      date,
      people,
      tierLabel,
      totalEuros,
      specialRequests,
    })

    return NextResponse.json({ challengeUrl: paycometRes.challengeUrl, orderId })
  } catch (err) {
    console.error('[PayComet] create-order error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

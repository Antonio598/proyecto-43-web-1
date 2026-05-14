export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { generateOrderId } from '@/lib/order-id'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { slug, experienceTitle, tierLabel, name, email, phone, date, people, depositPaid, fullPrice, specialRequests } = body

  if (!slug || !experienceTitle || !tierLabel || !name || !email || !phone || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const orderId = generateOrderId()

  await db.booking.upsert({
    orderId,
    slug,
    experienceTitle,
    name,
    email,
    phone,
    date,
    people: Number(people) || 1,
    tierLabel,
    depositPaid: Number(depositPaid) || 0,
    fullPrice: Number(fullPrice) || 0,
    status: 'confirmed',
    specialRequests: specialRequests ?? null,
  })

  return NextResponse.json({ ok: true, orderId }, { status: 201 })
}

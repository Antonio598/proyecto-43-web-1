export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date') ?? ''
  const slug = searchParams.get('slug') ?? ''

  const blocks = await db.availabilityBlock.list({
    ...(date ? { date } : {}),
    ...(slug ? { slug } : {}),
  })

  return NextResponse.json(blocks)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { date, slug, reason } = await req.json()
  if (!date) return NextResponse.json({ error: 'date is required' }, { status: 400 })

  const block = await db.availabilityBlock.create({ date, slug: slug || null, reason: reason || null })

  return NextResponse.json(block, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })

  await db.availabilityBlock.delete(id)

  return NextResponse.json({ ok: true })
}

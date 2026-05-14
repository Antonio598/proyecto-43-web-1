export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? ''
  const date = searchParams.get('date') ?? ''
  const slug = searchParams.get('slug') ?? ''
  const status = searchParams.get('status') ?? ''
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const pageSize = 20

  const where = {
    ...(q ? { q } : {}),
    ...(date ? { date } : {}),
    ...(slug ? { slug } : {}),
    ...(status ? { status } : {}),
  }

  const [bookings, total] = await Promise.all([
    db.booking.findMany({ where, skip: (page - 1) * pageSize, take: pageSize }),
    db.booking.count(where),
  ])

  return NextResponse.json({ bookings, total, page, pageSize })
}

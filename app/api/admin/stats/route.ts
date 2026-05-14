export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const today = new Date().toISOString().split('T')[0]

  const [todayCount, upcomingCount, totalRevenue, allTimeCount] = await Promise.all([
    db.booking.count({ date: today, status: 'confirmed' }),
    db.booking.count({ dateGte: today, status: 'confirmed' }),
    db.booking.sumDeposit({ status: 'confirmed' }),
    db.booking.count({ status: 'confirmed' }),
  ])

  return NextResponse.json({ todayCount, upcomingCount, totalRevenue, allTimeCount })
}

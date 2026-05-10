import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const today = new Date().toISOString().split('T')[0]

  const [todayCount, upcomingCount, totalResult, allTimeCount] = await Promise.all([
    prisma.booking.count({ where: { date: today, status: 'confirmed' } }),
    prisma.booking.count({ where: { date: { gte: today }, status: 'confirmed' } }),
    prisma.booking.aggregate({ _sum: { depositPaid: true }, where: { status: 'confirmed' } }),
    prisma.booking.count({ where: { status: 'confirmed' } }),
  ])

  return NextResponse.json({
    todayCount,
    upcomingCount,
    totalRevenue: totalResult._sum.depositPaid ?? 0,
    allTimeCount,
  })
}

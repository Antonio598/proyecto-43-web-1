export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')
  const slug = searchParams.get('slug')

  if (!date || !slug) {
    return NextResponse.json({ error: 'Missing date or slug' }, { status: 400 })
  }

  try {
    const blocks = await db.availabilityBlock.list({ date })
    // Blocked if there's a block for all activities OR for this specific activity
    const blocked = blocks.find((b) => b.slug === null || b.slug === slug)

    if (blocked) {
      return NextResponse.json({
        available: false,
        reason: blocked.reason ?? 'This date is not available for bookings.',
      })
    }

    return NextResponse.json({ available: true })
  } catch {
    // On DB error, allow booking — don't block users due to infrastructure issues
    return NextResponse.json({ available: true })
  }
}

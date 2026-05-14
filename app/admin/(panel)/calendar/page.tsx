export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { db, type AvailabilityBlock } from '@/lib/db'
import { experiences } from '@/lib/experiences'
import BlockManager from '@/components/admin/BlockManager'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const ACTIVITY_COLORS: Record<string, string> = {
  'jet-ski-tenerife': 'bg-blue-500',
  'buceo-padi': 'bg-cyan-500',
  'speedboat-tenerife': 'bg-indigo-500',
  'quad-biking-teide': 'bg-amber-500',
  'buggy-safari-teide': 'bg-orange-500',
}
function activityColor(slug: string) {
  return ACTIVITY_COLORS[slug] ?? 'bg-purple-500'
}

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: { year?: string; month?: string; selectedDate?: string }
}) {
  const now = new Date()
  const year = Number(searchParams.year ?? now.getFullYear())
  const month = Number(searchParams.month ?? (now.getMonth() + 1))

  const pad = (n: number) => String(n).padStart(2, '0')
  const startDate = `${year}-${pad(month)}-01`
  const daysInMonth = new Date(year, month, 0).getDate()
  const endDate = `${year}-${pad(month)}-${daysInMonth}`

  let bookings: { id: string; date: string; slug: string; name: string; people: number }[] = []
  let blocks: AvailabilityBlock[] = []

  try {
    ;[bookings, blocks] = await Promise.all([
      db.booking.forCalendar(startDate, endDate),
      db.availabilityBlock.list({ dateGte: startDate, dateLte: endDate }),
    ])
  } catch {
    // DB unavailable — show empty calendar
  }

  const bookingsByDate: Record<string, typeof bookings> = {}
  for (const b of bookings) {
    if (!bookingsByDate[b.date]) bookingsByDate[b.date] = []
    bookingsByDate[b.date].push(b)
  }
  const blocksByDate: Record<string, typeof blocks> = {}
  for (const bl of blocks) {
    if (!blocksByDate[bl.date]) blocksByDate[bl.date] = []
    blocksByDate[bl.date].push(bl)
  }

  const firstDow = (new Date(year, month - 1, 1).getDay() + 6) % 7
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const todayStr = now.toISOString().split('T')[0]

  const prevYear = month === 1 ? year - 1 : year
  const prevMonth = month === 1 ? 12 : month - 1
  const nextYear = month === 12 ? year + 1 : year
  const nextMonth = month === 12 ? 1 : month + 1
  const monthName = new Date(year, month - 1).toLocaleString('en-GB', { month: 'long', year: 'numeric' })

  const selectedDate = searchParams.selectedDate ?? null
  const activityOptions = experiences.map((e) => ({ value: e.slug, label: e.title }))
  const selectedBlocks = selectedDate ? (blocksByDate[selectedDate] ?? []) : []

  return (
    <div className="flex flex-col gap-5">
      <div className="grid lg:grid-cols-[1fr_280px] gap-5 items-start">

        {/* Calendar card */}
        <div className="bg-white shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <Link
              href={`/admin/calendar?year=${prevYear}&month=${prevMonth}`}
              className="p-2 text-[#555] hover:text-[#1a3a5c] hover:bg-gray-50 rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h2 className="font-bold text-[#222] text-base">{monthName}</h2>
            <Link
              href={`/admin/calendar?year=${nextYear}&month=${nextMonth}`}
              className="p-2 text-[#555] hover:text-[#1a3a5c] hover:bg-gray-50 rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wide text-[#aaa] py-2">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-100">
            {cells.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} className="bg-[#f5f5f5] aspect-square sm:aspect-auto sm:min-h-[80px]" />

              const dateStr = `${year}-${pad(month)}-${pad(day)}`
              const dayBookings = bookingsByDate[dateStr] ?? []
              const dayBlocks = blocksByDate[dateStr] ?? []
              const isToday = dateStr === todayStr
              const isPast = dateStr < todayStr
              const isSelected = dateStr === selectedDate
              const isBlocked = dayBlocks.length > 0
              const slugs = dayBookings.map((b) => b.slug).filter((s, i, arr) => arr.indexOf(s) === i)

              return (
                <Link
                  key={dateStr}
                  href={`/admin/calendar?year=${year}&month=${month}&selectedDate=${dateStr}`}
                  className={`bg-white aspect-square sm:aspect-auto sm:min-h-[80px] p-1.5 flex flex-col cursor-pointer transition-colors hover:bg-blue-50 ${
                    isSelected ? 'ring-2 ring-inset ring-[#f5920a]' : ''
                  } ${isBlocked ? 'bg-red-50' : ''} ${isPast ? 'opacity-50' : ''}`}
                >
                  <div className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 ${
                    isToday ? 'bg-[#f5920a] text-white' : 'text-[#555]'
                  }`}>
                    {day}
                  </div>
                  {slugs.length > 0 && (
                    <div className="flex flex-wrap gap-0.5 mt-1">
                      {slugs.map((slug) => (
                        <span key={slug} className={`w-2 h-2 rounded-full ${activityColor(slug)}`} title={slug} />
                      ))}
                    </div>
                  )}
                  {dayBookings.length > 0 && (
                    <span className="text-[9px] text-[#888] mt-auto hidden sm:block">
                      {dayBookings.length} booking{dayBookings.length > 1 ? 's' : ''}
                    </span>
                  )}
                  {isBlocked && (
                    <span className="text-[9px] text-red-500 font-bold mt-auto hidden sm:block">Blocked</span>
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-100">
            {experiences.map((e) => (
              <div key={e.slug} className="flex items-center gap-1.5 text-[11px] text-[#666]">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${activityColor(e.slug)}`} />
                {e.title}
              </div>
            ))}
          </div>
        </div>

        <BlockManager
          selectedDate={selectedDate}
          existingBlocks={selectedBlocks}
          activityOptions={activityOptions}
          year={year}
          month={month}
        />
      </div>
    </div>
  )
}

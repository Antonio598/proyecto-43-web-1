export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { db, type Booking } from '@/lib/db'
import { CalendarDays, TrendingUp, Clock, Users } from 'lucide-react'

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-600 border-red-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
  }
  return (
    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 border rounded-full ${styles[status] ?? styles.pending}`}>
      {status}
    </span>
  )
}

export default async function AdminDashboardPage() {
  const today = new Date().toISOString().split('T')[0]

  let todayCount = 0, upcomingCount = 0, allTimeCount = 0, totalRevenue = 0
  let recentBookings: Booking[] = []

  try {
    const [tc, uc, rev, atc, rb] = await Promise.all([
      db.booking.count({ date: today, status: 'confirmed' }),
      db.booking.count({ dateGte: today, status: 'confirmed' }),
      db.booking.sumDeposit({ status: 'confirmed' }),
      db.booking.count(),
      db.booking.findMany({ take: 6 }),
    ])
    todayCount = tc; upcomingCount = uc; allTimeCount = atc
    totalRevenue = rev
    recentBookings = rb
  } catch {
    // DB unavailable — show empty state
  }

  const stats = [
    { label: "Today's bookings", value: todayCount, icon: CalendarDays, color: 'text-[#1a3a5c]', bg: 'bg-blue-50' },
    { label: 'Total revenue', value: `€${totalRevenue.toFixed(0)}`, icon: TrendingUp, color: 'text-[#f5920a]', bg: 'bg-orange-50' },
    { label: 'Upcoming', value: upcomingCount, icon: Clock, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'All time', value: allTimeCount, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  return (
    <div className="flex flex-col gap-6">

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white shadow-sm p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-[#888]">{label}</span>
              <div className={`w-9 h-9 ${bg} rounded-full flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
            </div>
            <span className="font-extrabold text-[#222] text-2xl leading-none">{value}</span>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-[#222] text-sm uppercase tracking-wide">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-xs text-[#1a3a5c] hover:text-[#f5920a] font-semibold transition-colors">
            View all →
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="px-5 py-12 text-center text-[#aaa] text-sm">
            No bookings yet. They will appear here after a successful payment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f5f5f5] border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#888]">Order</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#888]">Guest</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#888] hidden sm:table-cell">Activity</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#888] hidden md:table-cell">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#888]">Deposit</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#888]">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <Link href={`/admin/bookings/${b.orderId}`} className="font-mono text-xs text-[#1a3a5c] hover:underline">
                        #{b.orderId}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-[#222] text-xs">{b.name}</div>
                      <div className="text-[#888] text-[11px]">{b.email}</div>
                    </td>
                    <td className="px-5 py-3.5 text-[#555] text-xs hidden sm:table-cell">{b.experienceTitle}</td>
                    <td className="px-5 py-3.5 text-[#555] text-xs hidden md:table-cell">{b.date}</td>
                    <td className="px-5 py-3.5 font-bold text-[#f5920a] text-xs">€{b.depositPaid.toFixed(0)}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

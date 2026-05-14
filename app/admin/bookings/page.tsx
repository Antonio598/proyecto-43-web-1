export const dynamic = 'force-dynamic'

import Link from 'next/link'
import type { Booking } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { experiences } from '@/lib/experiences'
import BookingFilters from '@/components/admin/BookingFilters'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE = 20

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-600 border-red-200',
  }
  return (
    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 border rounded-full ${styles[status] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
      {status}
    </span>
  )
}

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: { q?: string; date?: string; slug?: string; status?: string; page?: string }
}) {
  const page = Math.max(1, Number(searchParams.page ?? 1))
  const q = searchParams.q ?? ''
  const date = searchParams.date ?? ''
  const slug = searchParams.slug ?? ''
  const status = searchParams.status ?? ''

  const where = {
    ...(q ? {
      OR: [
        { name: { contains: q } },
        { email: { contains: q } },
        { orderId: { contains: q } },
      ],
    } : {}),
    ...(date ? { date } : {}),
    ...(slug ? { slug } : {}),
    ...(status ? { status } : {}),
  }

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.booking.count({ where }),
  ])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const activityOptions = experiences.map((e) => ({ value: e.slug, label: e.title }))

  return (
    <div className="flex flex-col gap-5">

      {/* Filters */}
      <BookingFilters activityOptions={activityOptions} />

      {/* Table */}
      <div className="bg-white shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-[#222] text-sm uppercase tracking-wide">
            {total} booking{total !== 1 ? 's' : ''}
          </h2>
        </div>

        {bookings.length === 0 ? (
          <div className="px-5 py-12 text-center text-[#aaa] text-sm">No bookings match your filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f5f5f5] border-b border-gray-100">
                  {['Order', 'Guest', 'Activity', 'Date', 'People', 'Deposit', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#888] whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b: Booking) => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-[11px] text-[#888]">#{b.orderId}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-[#222] text-xs whitespace-nowrap">{b.name}</div>
                      <div className="text-[#888] text-[11px]">{b.email}</div>
                    </td>
                    <td className="px-4 py-3.5 text-[#555] text-xs max-w-[160px]">
                      <div className="truncate">{b.experienceTitle}</div>
                      <div className="text-[11px] text-[#aaa] truncate">{b.tierLabel}</div>
                    </td>
                    <td className="px-4 py-3.5 text-[#555] text-xs whitespace-nowrap">{b.date}</td>
                    <td className="px-4 py-3.5 text-[#555] text-xs text-center">{b.people}</td>
                    <td className="px-4 py-3.5 font-bold text-[#f5920a] text-xs whitespace-nowrap">€{b.depositPaid.toFixed(0)}</td>
                    <td className="px-4 py-3.5"><StatusBadge status={b.status} /></td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/bookings/${b.orderId}`}
                        className="text-xs text-[#1a3a5c] hover:text-[#f5920a] font-semibold transition-colors whitespace-nowrap"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-sm">
            <span className="text-[#888] text-xs">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`/admin/bookings?q=${q}&date=${date}&slug=${slug}&status=${status}&page=${page - 1}`}
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-[#555] hover:border-[#1a3a5c] text-xs font-medium transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`/admin/bookings?q=${q}&date=${date}&slug=${slug}&status=${status}&page=${page + 1}`}
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-[#555] hover:border-[#1a3a5c] text-xs font-medium transition-colors"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

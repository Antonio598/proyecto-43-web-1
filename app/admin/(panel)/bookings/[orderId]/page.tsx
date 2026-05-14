export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { ChevronLeft, Phone, MessageCircle, Mail } from 'lucide-react'
import BookingStatusButton from '@/components/admin/BookingStatusButton'

export default async function BookingDetailPage({ params }: { params: { orderId: string } }) {
  let booking = null
  try {
    booking = await db.booking.findByOrderId(params.orderId)
  } catch {
    notFound()
  }
  if (!booking) notFound()

  const remainingDue = booking.fullPrice - booking.depositPaid
  const formattedDate = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
  const createdAt = new Date(booking.createdAt).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <Link
        href="/admin/bookings"
        className="inline-flex items-center gap-1.5 text-[#1a3a5c] hover:text-[#f5920a] text-sm font-semibold transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to bookings
      </Link>

      <div className="grid sm:grid-cols-[1fr_240px] gap-5 items-start">

        {/* Main details */}
        <div className="bg-white shadow-sm p-6 flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] text-[#888] font-mono mb-0.5">#{booking.orderId}</p>
              <h2 className="font-bold text-[#222] text-lg leading-tight">{booking.experienceTitle}</h2>
              <p className="text-[#888] text-sm mt-0.5">{booking.tierLabel}</p>
            </div>
            <span className={`text-[10px] font-bold uppercase px-2.5 py-1 border rounded-full flex-shrink-0 ${
              booking.status === 'confirmed'
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-600 border-red-200'
            }`}>
              {booking.status}
            </span>
          </div>

          <div className="divide-y divide-gray-50">
            {[
              { label: 'Guest', value: booking.name },
              { label: 'Email', value: booking.email },
              { label: 'Phone', value: booking.phone },
              { label: 'Date', value: formattedDate },
              { label: 'People', value: booking.people },
              { label: 'Deposit paid', value: `€${booking.depositPaid.toFixed(2)}`, highlight: true },
              { label: 'Full price', value: `€${booking.fullPrice.toFixed(2)}` },
              ...(remainingDue > 0 ? [{ label: 'Remaining at venue', value: `€${remainingDue.toFixed(2)}` }] : []),
              ...(booking.specialRequests ? [{ label: 'Special requests', value: booking.specialRequests }] : []),
              { label: 'Booked at', value: createdAt },
            ].map(({ label, value, highlight }) => (
              <div key={label} className="flex items-start justify-between gap-4 py-3">
                <span className="text-xs text-[#888] font-medium flex-shrink-0 w-36">{label}</span>
                <span className={`text-sm text-right ${highlight ? 'font-bold text-[#f5920a]' : 'font-medium text-[#333]'}`}>
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions sidebar */}
        <div className="flex flex-col gap-4">
          <div className="bg-white shadow-sm p-5 flex flex-col gap-3">
            <h3 className="font-bold text-[#222] text-sm uppercase tracking-wide border-b border-gray-100 pb-3">
              Contact Guest
            </h3>
            <a
              href={`tel:${booking.phone}`}
              className="flex items-center gap-2 w-full border border-[#1a3a5c] text-[#1a3a5c] hover:bg-blue-50 font-semibold text-xs py-2.5 px-3 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> {booking.phone}
            </a>
            <a
              href={`https://wa.me/${booking.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs py-2.5 px-3 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
            <a
              href={`mailto:${booking.email}`}
              className="flex items-center gap-2 w-full border border-gray-200 text-[#555] hover:border-[#1a3a5c] font-semibold text-xs py-2.5 px-3 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
          </div>

          <div className="bg-white shadow-sm p-5">
            <h3 className="font-bold text-[#222] text-sm uppercase tracking-wide border-b border-gray-100 pb-3 mb-3">
              Actions
            </h3>
            <BookingStatusButton orderId={booking.orderId} currentStatus={booking.status} />
          </div>
        </div>
      </div>
    </div>
  )
}

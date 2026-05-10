'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BookingStatusButton({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function updateStatus(newStatus: string) {
    if (!confirm(`Mark this booking as "${newStatus}"?`)) return
    setLoading(true)
    await fetch(`/api/admin/bookings/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    router.refresh()
    setLoading(false)
  }

  if (currentStatus === 'confirmed') {
    return (
      <button
        onClick={() => updateStatus('cancelled')}
        disabled={loading}
        className="w-full border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50 font-semibold text-xs py-2.5 px-3 transition-colors"
      >
        {loading ? 'Updating…' : 'Cancel booking'}
      </button>
    )
  }

  return (
    <button
      onClick={() => updateStatus('confirmed')}
      disabled={loading}
      className="w-full bg-[#f5920a] hover:bg-[#e07e08] disabled:opacity-50 text-white font-semibold text-xs py-2.5 px-3 transition-colors"
    >
      {loading ? 'Updating…' : 'Restore booking'}
    </button>
  )
}

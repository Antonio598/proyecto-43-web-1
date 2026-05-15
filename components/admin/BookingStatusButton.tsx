'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function BookingStatusButton({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function updateStatus(newStatus: string) {
    if (!confirm(`Mark this booking as "${newStatus}"?`)) return
    setLoading(true)
    const res = await fetch(`/api/admin/bookings/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    if (res.ok) {
      router.refresh()
    } else {
      alert('Error updating status. Check SUPABASE_SERVICE_ROLE_KEY in EasyPanel.')
    }
    setLoading(false)
  }

  async function deleteBooking() {
    if (!confirm('Delete this booking permanently? This cannot be undone.')) return
    setDeleting(true)
    const res = await fetch(`/api/admin/bookings/${orderId}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/bookings')
    } else {
      alert('Error deleting booking. Check SUPABASE_SERVICE_ROLE_KEY in EasyPanel.')
      setDeleting(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {currentStatus === 'confirmed' ? (
        <button
          onClick={() => updateStatus('cancelled')}
          disabled={loading || deleting}
          className="w-full border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50 font-semibold text-xs py-2.5 px-3 transition-colors"
        >
          {loading ? 'Updating…' : 'Cancel booking'}
        </button>
      ) : (
        <button
          onClick={() => updateStatus('confirmed')}
          disabled={loading || deleting}
          className="w-full bg-[#f5920a] hover:bg-[#e07e08] disabled:opacity-50 text-white font-semibold text-xs py-2.5 px-3 transition-colors"
        >
          {loading ? 'Updating…' : 'Restore booking'}
        </button>
      )}

      <button
        onClick={deleteBooking}
        disabled={loading || deleting}
        className="w-full flex items-center justify-center gap-1.5 border border-gray-200 text-[#888] hover:border-red-300 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 font-semibold text-xs py-2.5 px-3 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
        {deleting ? 'Deleting…' : 'Delete booking'}
      </button>
    </div>
  )
}

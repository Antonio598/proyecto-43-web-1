'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function DeleteBookingButton({ orderId }: { orderId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this booking permanently? This cannot be undone.')) return
    setLoading(true)
    const res = await fetch(`/api/admin/bookings/${orderId}`, { method: 'DELETE' })
    if (res.ok) {
      router.refresh()
    } else {
      alert('Error deleting booking. Check SUPABASE_SERVICE_ROLE_KEY in EasyPanel.')
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      title="Delete booking"
      className="text-[#ccc] hover:text-red-500 disabled:opacity-40 transition-colors"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  )
}

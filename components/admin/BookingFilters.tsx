'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Search, X } from 'lucide-react'

interface ActivityOption { value: string; label: string }

export default function BookingFilters({ activityOptions }: { activityOptions: ActivityOption[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`/admin/bookings?${params.toString()}`)
  }, [router, searchParams])

  const clearAll = () => router.push('/admin/bookings')
  const hasFilters = searchParams.toString().length > 0

  const inputClass = 'border border-gray-200 bg-white px-3 py-2 text-sm text-[#333] outline-none focus:border-[#1a3a5c] transition-colors'

  return (
    <div className="bg-white shadow-sm p-4 flex flex-wrap gap-3 items-end">
      {/* Search */}
      <div className="flex-1 min-w-[180px] flex flex-col gap-1">
        <label className="text-[10px] font-bold uppercase tracking-wide text-[#888]">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aaa]" />
          <input
            type="text"
            placeholder="Name, email, order ID…"
            defaultValue={searchParams.get('q') ?? ''}
            onChange={(e) => setParam('q', e.target.value)}
            className={`${inputClass} pl-8 w-full`}
          />
        </div>
      </div>

      {/* Date */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold uppercase tracking-wide text-[#888]">Date</label>
        <input
          type="date"
          defaultValue={searchParams.get('date') ?? ''}
          onChange={(e) => setParam('date', e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Activity */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold uppercase tracking-wide text-[#888]">Activity</label>
        <select
          defaultValue={searchParams.get('slug') ?? ''}
          onChange={(e) => setParam('slug', e.target.value)}
          className={inputClass}
        >
          <option value="">All activities</option>
          {activityOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold uppercase tracking-wide text-[#888]">Status</label>
        <select
          defaultValue={searchParams.get('status') ?? ''}
          onChange={(e) => setParam('status', e.target.value)}
          className={inputClass}
        >
          <option value="">All statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 px-3 py-2 text-xs text-[#888] hover:text-[#555] border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <X className="w-3.5 h-3.5" /> Clear
        </button>
      )}
    </div>
  )
}

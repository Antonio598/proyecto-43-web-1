'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarX2, Plus, Trash2 } from 'lucide-react'

interface Block {
  id: string
  date: string
  slug: string | null
  reason: string | null
}
interface ActivityOption { value: string; label: string }

interface Props {
  selectedDate: string | null
  existingBlocks: Block[]
  activityOptions: ActivityOption[]
  year: number
  month: number
}

export default function BlockManager({ selectedDate, existingBlocks, activityOptions, year, month }: Props) {
  const router = useRouter()
  const [slug, setSlug] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState('')

  const inputClass = 'w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#333] outline-none focus:border-[#1a3a5c] transition-colors'

  async function addBlock() {
    if (!selectedDate) return
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/blocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate, slug: slug || null, reason: reason || null }),
    })
    if (res.ok) {
      setSlug('')
      setReason('')
      router.refresh()
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? `Error ${res.status} — check SUPABASE_SERVICE_ROLE_KEY in EasyPanel`)
    }
    setLoading(false)
  }

  async function removeBlock(id: string) {
    setDeleting(id)
    setError('')
    const res = await fetch('/api/admin/blocks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      router.refresh()
    } else {
      setError('Error deleting block — check SUPABASE_SERVICE_ROLE_KEY in EasyPanel')
    }
    setDeleting(null)
  }

  if (!selectedDate) {
    return (
      <div className="bg-white shadow-sm p-5 flex flex-col items-center justify-center gap-3 min-h-[200px]">
        <CalendarX2 className="w-8 h-8 text-[#ddd]" />
        <p className="text-[#aaa] text-sm text-center">Click a day on the calendar to manage its availability</p>
      </div>
    )
  }

  const formattedDate = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  return (
    <div className="bg-white shadow-sm p-5 flex flex-col gap-4">
      <div>
        <h3 className="font-bold text-[#222] text-sm uppercase tracking-wide border-b border-gray-100 pb-3">
          Manage Availability
        </h3>
        <p className="text-xs text-[#888] mt-2 font-medium">{formattedDate}</p>
      </div>

      {/* Existing blocks */}
      {existingBlocks.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#888]">Active blocks</p>
          {existingBlocks.map((block) => (
            <div key={block.id} className="flex items-start justify-between gap-2 bg-red-50 border border-red-100 px-3 py-2">
              <div>
                <p className="text-xs font-semibold text-red-700">
                  {block.slug
                    ? activityOptions.find((a) => a.value === block.slug)?.label ?? block.slug
                    : 'All activities'}
                </p>
                {block.reason && <p className="text-[11px] text-red-500">{block.reason}</p>}
              </div>
              <button
                onClick={() => removeBlock(block.id)}
                disabled={deleting === block.id}
                className="text-red-400 hover:text-red-600 disabled:opacity-40 flex-shrink-0 mt-0.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2">
          ⚠️ {error}
        </div>
      )}

      {/* Add block form */}
      <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#888]">Add block</p>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wide text-[#555]">Activity</label>
          <select value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass}>
            <option value="">All activities</option>
            {activityOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wide text-[#555]">Reason (optional)</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Public holiday, maintenance…"
            className={inputClass}
          />
        </div>

        <button
          onClick={addBlock}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-[#1a3a5c] hover:bg-[#0d2645] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-xs py-3 transition-colors"
        >
          {loading ? (
            <><span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Adding…</>
          ) : (
            <><Plus className="w-3.5 h-3.5" /> Block this date</>
          )}
        </button>
      </div>
    </div>
  )
}

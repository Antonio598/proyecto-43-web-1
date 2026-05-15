'use client'

import { useState } from 'react'
import { experiences } from '@/lib/experiences'
import { UserPlus } from 'lucide-react'

interface Props {
  selectedDate: string | null
}

const inputClass =
  'w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#333] outline-none focus:border-[#1a3a5c] transition-colors'

export default function ManualBookingForm({ selectedDate }: Props) {
  const [expSlug, setExpSlug] = useState('')
  const [tierLabel, setTierLabel] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [people, setPeople] = useState(1)
  const [depositPaid, setDepositPaid] = useState(0)
  const [specialRequests, setSpecialRequests] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const selectedExp = experiences.find((e) => e.slug === expSlug)
  const tiers = selectedExp?.pricingTiers ?? []
  const selectedTier = tiers.find((t) => t.label === tierLabel)
  const isPerPerson = selectedTier?.perPerson !== false
  const fullPrice = selectedTier
    ? isPerPerson
      ? selectedTier.price * people
      : selectedTier.price
    : 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDate || !expSlug || !tierLabel || !name || !email || !phone) return
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/bookings/manual', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: expSlug,
        experienceTitle: selectedExp!.title,
        tierLabel,
        name,
        email,
        phone,
        date: selectedDate,
        people,
        depositPaid,
        fullPrice,
        specialRequests: specialRequests || null,
      }),
    })

    if (res.ok) {
      setSuccess(true)
      setExpSlug('')
      setTierLabel('')
      setName('')
      setEmail('')
      setPhone('')
      setPeople(1)
      setDepositPaid(0)
      setSpecialRequests('')
      setTimeout(() => window.location.reload(), 1500)
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? 'Error al crear la reserva')
    }
    setLoading(false)
  }

  if (!selectedDate) return null

  return (
    <div className="bg-white shadow-sm p-5 flex flex-col gap-4">
      <h3 className="font-bold text-[#222] text-sm uppercase tracking-wide border-b border-gray-100 pb-3">
        Nueva Reserva Manual
      </h3>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-2 rounded">
          ✓ Reserva creada correctamente
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Activity */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wide text-[#555]">Actividad</label>
          <select
            required
            value={expSlug}
            onChange={(e) => { setExpSlug(e.target.value); setTierLabel('') }}
            className={inputClass}
          >
            <option value="">Selecciona…</option>
            {experiences.map((exp) => (
              <option key={exp.slug} value={exp.slug}>{exp.title}</option>
            ))}
          </select>
        </div>

        {/* Tier */}
        {tiers.length > 0 && (
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wide text-[#555]">Opción / Precio</label>
            <select
              required
              value={tierLabel}
              onChange={(e) => setTierLabel(e.target.value)}
              className={inputClass}
            >
              <option value="">Selecciona…</option>
              {tiers.map((t) => (
                <option key={t.label} value={t.label}>
                  {t.label} — €{t.price}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* People (only for per-person tiers) */}
        {selectedTier && isPerPerson && (
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wide text-[#555]">Personas</label>
            <input
              type="number"
              min={1}
              max={20}
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        )}

        {/* Full price display */}
        {selectedTier && (
          <div className="flex items-center justify-between bg-gray-50 px-3 py-2 text-xs border border-gray-100">
            <span className="text-[#888]">Precio total</span>
            <span className="font-bold text-[#222]">€{fullPrice.toFixed(2)}</span>
          </div>
        )}

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wide text-[#555]">Nombre</label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wide text-[#555]">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@email.com"
            className={inputClass}
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wide text-[#555]">Teléfono</label>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+34 612 345 678"
            className={inputClass}
          />
        </div>

        {/* Deposit paid */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wide text-[#555]">Depósito cobrado (€)</label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={depositPaid}
            onChange={(e) => setDepositPaid(Number(e.target.value))}
            className={inputClass}
          />
        </div>

        {/* Special requests */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wide text-[#555]">Peticiones especiales</label>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows={2}
            placeholder="Opcional…"
            className={inputClass + ' resize-none'}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-[#f5920a] hover:bg-[#e0820a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-xs py-3 transition-colors"
        >
          {loading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Creando…
            </>
          ) : (
            <>
              <UserPlus className="w-3.5 h-3.5" />
              Crear reserva
            </>
          )}
        </button>
      </form>
    </div>
  )
}

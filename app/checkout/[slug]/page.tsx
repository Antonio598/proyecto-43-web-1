'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { experiences } from '@/lib/experiences'
import { ChevronLeft, Lock, Users, Calendar, Phone, Mail, User, MessageSquare, ShoppingCart } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name too short').max(80),
  email: z.string().email('Invalid email'),
  phone: z.string().min(9, 'Invalid phone').max(20),
  date: z.string().min(1, 'Please select a date'),
  people: z.coerce.number().int().min(1, 'Min 1 person').max(20, 'Max 20 people'),
  tierLabel: z.string().min(1, 'Please select an option'),
  tierPrice: z.coerce.number().positive(),
  specialRequests: z.string().max(500).optional(),
})

type FormData = z.infer<typeof schema>

const tomorrow = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

function inputClass(hasError: boolean) {
  return `w-full border ${hasError ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'} px-3 py-2.5 text-sm text-[#333] outline-none focus:border-[#3399ff] transition-colors`
}

function Field({ label, icon, error, children }: { label: string; icon: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold uppercase tracking-wide text-[#555] flex items-center gap-1.5">
        <span className="text-[#3399ff]">{icon}</span>{label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}

export default function CheckoutPage({ params }: { params: { slug: string } }) {
  const experience = experiences.find((e) => e.slug === params.slug)
  if (!experience) notFound()

  const defaultTier = experience.pricingTiers?.[0]
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      people: 1,
      tierLabel: defaultTier?.label ?? '',
      tierPrice: defaultTier?.price ?? experience.price,
    },
  })

  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const people = watch('people') || 1
  const tierPrice = watch('tierPrice') || experience.price
  const tierLabel = watch('tierLabel')
  const total = tierPrice * people

  async function onSubmit(data: FormData) {
    setSubmitting(true)
    setServerError(null)
    try {
      const res = await fetch('/api/paycomet/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, slug: params.slug }),
      })
      const json = await res.json()
      if (!res.ok) {
        setServerError(json.error || 'Payment could not be initiated. Please try again.')
        setSubmitting(false)
        return
      }
      window.location.href = json.challengeUrl
    } catch {
      setServerError('Network error. Please check your connection and try again.')
      setSubmitting(false)
    }
  }

  return (
    <main className="bg-[#f5f5f5] min-h-screen py-6 sm:py-10">
      <div className="max-w-[960px] mx-auto px-3 sm:px-4">

        <Link href={`/experiencias/${params.slug}`} className="inline-flex items-center gap-1.5 text-[#3399ff] hover:text-[#ff3399] text-sm font-semibold mb-5 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to activity
        </Link>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* ── Left: form ── */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            {/* Tier selector */}
            {experience.pricingTiers && experience.pricingTiers.length > 0 && (
              <div className="bg-white shadow-sm p-5 sm:p-6">
                <h2 className="font-bold text-[#222] text-base mb-4">Select your option</h2>
                <div className="flex flex-col gap-2">
                  {experience.pricingTiers.map((tier) => (
                    <button key={tier.label} type="button"
                      onClick={() => { setValue('tierLabel', tier.label); setValue('tierPrice', tier.price) }}
                      className={`flex justify-between items-center px-4 py-3 border text-sm font-medium transition-colors text-left ${
                        tierLabel === tier.label ? 'border-[#ff3399] bg-pink-50 text-[#ff3399]' : 'border-gray-200 hover:border-[#3399ff] text-[#333]'
                      }`}
                    >
                      <span>{tier.label}</span>
                      <span className="font-bold">€{tier.price}<span className="text-xs font-normal text-[#888]">/person</span></span>
                    </button>
                  ))}
                </div>
                <input type="hidden" {...register('tierLabel')} />
                <input type="hidden" {...register('tierPrice')} />
                {errors.tierLabel && <p className="text-red-500 text-xs mt-2">{errors.tierLabel.message}</p>}
              </div>
            )}

            {/* Contact details */}
            <div className="bg-white shadow-sm p-5 sm:p-6">
              <h2 className="font-bold text-[#222] text-base mb-4">Your details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" icon={<User className="w-4 h-4" />} error={errors.name?.message}>
                  <input {...register('name')} type="text" placeholder="John Doe" className={inputClass(!!errors.name)} />
                </Field>
                <Field label="Email" icon={<Mail className="w-4 h-4" />} error={errors.email?.message}>
                  <input {...register('email')} type="email" placeholder="john@email.com" className={inputClass(!!errors.email)} />
                </Field>
                <Field label="Phone" icon={<Phone className="w-4 h-4" />} error={errors.phone?.message}>
                  <input {...register('phone')} type="tel" placeholder="+34 600 000 000" className={inputClass(!!errors.phone)} />
                </Field>
                <Field label="Number of people" icon={<Users className="w-4 h-4" />} error={errors.people?.message}>
                  <input {...register('people')} type="number" min={1} max={experience.maxGroupSize} className={inputClass(!!errors.people)} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Preferred date" icon={<Calendar className="w-4 h-4" />} error={errors.date?.message}>
                    <input {...register('date')} type="date" min={tomorrow()} className={inputClass(!!errors.date)} />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Special requests (optional)" icon={<MessageSquare className="w-4 h-4" />} error={errors.specialRequests?.message}>
                    <textarea {...register('specialRequests')} rows={3} placeholder="Allergies, accessibility needs, special occasions…" className={`${inputClass(!!errors.specialRequests)} resize-none`} />
                  </Field>
                </div>
              </div>
            </div>

            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{serverError}</div>
            )}

            <button type="submit" disabled={submitting}
              className="w-full bg-[#ff3399] hover:bg-[#e62e8a] active:bg-[#cc2979] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-base py-4 flex items-center justify-center gap-2 transition-colors min-h-[56px]"
            >
              {submitting ? (
                <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Redirecting to payment…</>
              ) : (
                <><ShoppingCart className="w-5 h-5" /> Pay €{total.toFixed(2)} securely</>
              )}
            </button>

            <p className="text-center text-xs text-[#aaa] flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Secure payment · PCI DSS Level 1 · Powered by PayComet
            </p>
          </form>

          {/* ── Right: order summary ── */}
          <div className="bg-white shadow-sm p-5 flex flex-col gap-4 lg:sticky lg:top-4">
            <h3 className="font-bold text-[#222] text-sm uppercase tracking-wide border-b border-gray-100 pb-3">Order Summary</h3>
            <div className="text-sm font-semibold text-[#333] leading-snug">{experience.title}</div>
            {tierLabel && <div className="text-xs text-[#888]">{tierLabel}</div>}
            <div className="flex flex-col gap-2 text-sm border-t border-gray-100 pt-3">
              <div className="flex justify-between text-[#666]"><span>Per person</span><span>€{tierPrice}</span></div>
              <div className="flex justify-between text-[#666]"><span>People</span><span>× {people}</span></div>
              <div className="flex justify-between font-extrabold text-[#ff3399] text-lg border-t border-gray-100 pt-2 mt-1">
                <span>Total</span><span>€{total.toFixed(2)}</span>
              </div>
            </div>
            <div className="bg-[#f5f5f5] px-3 py-2.5 text-xs text-[#666] leading-relaxed">
              ✓ Free cancellation up to 48h before<br />
              ✓ Confirmation within 2 hours<br />
              ✓ Safety equipment included
            </div>
            <div className="flex items-center gap-2 text-xs text-[#888]">
              <Lock className="w-3.5 h-3.5 text-[#3399ff] flex-shrink-0" />
              Your card details never touch our servers
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

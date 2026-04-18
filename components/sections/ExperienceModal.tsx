'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Clock, Users, ShoppingCart, Check, AlertCircle, Info } from 'lucide-react'
import type { Experience } from '@/types/experience'

interface ExperienceModalProps {
  experience: Experience | null
  onClose: () => void
}

export default function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
  useEffect(() => {
    if (experience) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [experience])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {experience && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative bg-ocean-800 border border-ocean-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-ocean-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-ocean-700 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Hero image */}
              <div className="relative aspect-[16/7] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={experience.image}
                  alt={experience.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <div className="absolute inset-0 bg-gradient-card" />
                {experience.badge && (
                  <div className="absolute top-4 left-4 bg-gradient-volcanic text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                    {experience.badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {experience.rating > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-trust-star text-trust-star" />
                      <span className="font-semibold text-white">{experience.rating}</span>
                      <span className="text-white/40 text-sm">({experience.reviewCount} reseñas)</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-white/60 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/60 text-sm">
                    <Users className="w-4 h-4" />
                    <span>Máx. {experience.maxGroupSize} personas</span>
                  </div>
                </div>

                <h2 className="font-display font-bold text-3xl text-white mb-2">{experience.title}</h2>
                <p className="text-volcanic-300 text-base mb-4">{experience.subtitle}</p>
                <p className="text-white/70 leading-relaxed mb-6">{experience.description}</p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Highlights */}
                  <div>
                    <h3 className="font-semibold text-white text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4 text-volcanic-400" /> Puntos destacados
                    </h3>
                    <ul className="space-y-2">
                      {experience.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/75">
                          <span className="text-volcanic-400 mt-0.5 flex-shrink-0">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Includes */}
                  {experience.includes && experience.includes.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-white text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-volcanic-400" /> Incluye
                      </h3>
                      <ul className="space-y-2">
                        {experience.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/75">
                            <span className="text-trust-green mt-0.5 flex-shrink-0">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Requirements */}
                {experience.requirements && experience.requirements.length > 0 && (
                  <div className="bg-ocean-900/50 border border-ocean-700 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-white/80 text-sm mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-volcanic-300" /> Requisitos
                    </h3>
                    <ul className="space-y-1">
                      {experience.requirements.map((req, i) => (
                        <li key={i} className="text-sm text-white/60">· {req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pricing tiers */}
                {experience.pricingTiers && experience.pricingTiers.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-white text-sm uppercase tracking-wide mb-3">Precios</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {experience.pricingTiers.map((tier, i) => (
                        <div key={i} className="bg-ocean-900/60 border border-ocean-700 rounded-xl p-3 text-center">
                          <p className="text-volcanic-300 font-display font-bold text-xl">€{tier.price}</p>
                          <p className="text-white/50 text-xs mt-0.5 leading-tight">{tier.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Urgency */}
                {experience.urgencyText && (
                  <div className="flex items-center gap-2 bg-volcanic-500/10 border border-volcanic-500/20 rounded-xl px-4 py-3 mb-6">
                    <AlertCircle className="w-4 h-4 text-volcanic-400 flex-shrink-0" />
                    <span className="text-volcanic-300 text-sm font-medium">{experience.urgencyText}</span>
                  </div>
                )}

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/checkout/${experience.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 bg-gradient-volcanic text-white font-bold text-lg rounded-xl shadow-cta hover:shadow-cta hover:scale-[1.02] transition-all duration-200"
                    onClick={onClose}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Comprar — {experience.priceLabel}
                  </Link>
                  <button
                    onClick={onClose}
                    className="sm:w-auto px-6 py-4 bg-ocean-700 border border-ocean-600 text-white/70 hover:text-white rounded-xl transition-colors text-sm font-medium"
                  >
                    Volver al catálogo
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

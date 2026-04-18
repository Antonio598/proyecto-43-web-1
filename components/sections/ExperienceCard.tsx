'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Clock, Users, ArrowRight, AlertCircle } from 'lucide-react'
import type { Experience } from '@/types/experience'
import { useSession } from '@/components/global/SessionProvider'
import { trackInteraction } from '@/lib/session'

interface ExperienceCardProps {
  experience: Experience
  index: number
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { sessionId } = useSession()

  function handleCTAClick() {
    trackInteraction({ type: 'cta_click', experienceId: experience.id })
  }

  const shortRef = sessionId ? sessionId.split('-')[0] : 'web'
  const whatsappUrl = `https://wa.me/17866741808?text=${encodeURIComponent(
    `¡Hola! Me interesa la experiencia "${experience.title}" (${experience.priceLabel}). ¿Hay disponibilidad? [Ref: ${shortRef}]`
  )}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col rounded-2xl overflow-hidden bg-ocean-800 border transition-all duration-300 ${
        isHovered ? 'shadow-card-hover -translate-y-2 border-volcanic-500/40' : 'border-ocean-700'
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.imageAlt}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-card" />

        {experience.badge && (
          <div className="absolute top-3 left-3 bg-gradient-volcanic text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
            {experience.badge}
          </div>
        )}

        <div className="absolute bottom-3 right-3 bg-ocean-900/90 backdrop-blur-sm text-volcanic-300 font-display font-bold text-xl px-3 py-1.5 rounded-xl">
          {experience.priceLabel}
          <span className="text-white/50 text-xs font-normal ml-1">/ persona</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">

        {/* Meta */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {experience.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-trust-star text-trust-star" />
              <span className="text-sm font-semibold text-white">{experience.rating}</span>
              <span className="text-xs text-white/40">({experience.reviewCount})</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-white/50 text-xs">
            <Clock className="w-3 h-3" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-white/50 text-xs">
            <Users className="w-3 h-3" />
            <span>Máx. {experience.maxGroupSize}</span>
          </div>
        </div>

        <h3 className="font-display font-bold text-xl text-white mb-1.5 leading-tight">
          {experience.title}
        </h3>

        <p className="text-white/60 text-sm mb-4 leading-relaxed">
          {experience.subtitle}
        </p>

        <ul className="space-y-1.5 mb-4 flex-1">
          {experience.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/75">
              <span className="text-volcanic-400 mt-0.5 flex-shrink-0">✓</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {experience.urgencyText && (
          <div className="flex items-center gap-2 bg-volcanic-500/10 border border-volcanic-500/20 rounded-lg px-3 py-2 mb-4">
            <AlertCircle className="w-3.5 h-3.5 text-volcanic-400 flex-shrink-0" />
            <span className="text-volcanic-300 text-xs font-medium">{experience.urgencyText}</span>
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCTAClick}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-gradient-volcanic text-white font-semibold rounded-xl hover:shadow-cta hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Reservar Ahora
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.article>
  )
}

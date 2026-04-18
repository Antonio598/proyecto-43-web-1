'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Clock, Users, ShoppingCart, Info, AlertCircle } from 'lucide-react'
import type { Experience } from '@/types/experience'
import { trackInteraction } from '@/lib/session'

interface ExperienceCardProps {
  experience: Experience
  index: number
  onOpenModal: (experience: Experience) => void
}

  const [isHovered, setIsHovered] = useState(false)

  function handleBuy() {
    trackInteraction({ type: 'cta_click', experienceId: experience.id })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 transition-all duration-300 ${
        isHovered ? 'shadow-xl -translate-y-2 border-trip-blue/20' : ''
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

        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-trip-blue font-display font-bold text-xl px-3 py-1.5 rounded-xl shadow-sm">
          {experience.priceLabel}
          <span className="text-trip-dark/50 text-xs font-normal ml-1">/ persona</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">

        {/* Meta */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {experience.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-trust-star text-trust-star" />
              <span className="text-sm font-semibold text-trip-dark">{experience.rating}</span>
              <span className="text-xs text-trip-dark/40">({experience.reviewCount})</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-trip-dark/60 text-xs">
            <Clock className="w-3 h-3" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-trip-dark/60 text-xs">
            <Users className="w-3 h-3" />
            <span>Máx. {experience.maxGroupSize}</span>
          </div>
        </div>

        <h3 className="font-display font-bold text-xl text-trip-dark mb-1.5 leading-tight">
          {experience.title}
        </h3>

        <p className="text-trip-dark/60 text-sm mb-4 leading-relaxed line-clamp-2">
          {experience.subtitle}
        </p>

        <ul className="space-y-1.5 mb-4 flex-1">
          {experience.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-trip-dark/75">
              <span className="text-trip-pink mt-0.5 flex-shrink-0">✓</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {experience.urgencyText && (
          <div className="flex items-center gap-2 bg-trip-blue/5 border border-trip-blue/20 rounded-lg px-3 py-2 mb-4">
            <AlertCircle className="w-3.5 h-3.5 text-trip-blue flex-shrink-0" />
            <span className="text-trip-blue text-xs font-medium">{experience.urgencyText}</span>
          </div>
        )}

        {/* Two CTAs */}
        <div className="flex gap-2 mt-auto">
          {/* Ver Detalles */}
          <Link
            href={`/experiencias/${experience.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 bg-white border border-gray-200 text-trip-dark/80 hover:text-trip-blue hover:border-trip-blue/30 font-medium text-sm rounded-xl transition-all duration-200 shadow-sm"
          >
            <Info className="w-4 h-4" />
            Ver Detalles
          </Link>

          {/* Comprar */}
          <Link
            href={`/checkout/${experience.slug}`}
            onClick={handleBuy}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 bg-gradient-to-r from-trip-pink to-trip-blue text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            Comprar
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

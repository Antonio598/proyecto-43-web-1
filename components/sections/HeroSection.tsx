'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, Shield, Clock, RotateCcw, Star } from 'lucide-react'
import { BUSINESS, WHATSAPP_CTA_URL } from '@/lib/constants'

const trustSignals = [
  { icon: Shield, text: 'Seguro de actividades incluido' },
  { icon: Clock, text: 'Confirmación en menos de 2 horas' },
  { icon: RotateCcw, text: 'Cancelación gratuita hasta 24h antes' },
]

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gray-50"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1920&q=85"
          alt="Amanecer sobre el Teide con el océano Atlántico al fondo, Tenerife"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ocean-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding container-max pt-28 md:pt-36">
        <div className="max-w-4xl">

          {/* Trust micro-badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-trust-star text-trust-star" />
              ))}
            </div>
            <span className="text-sm font-medium text-white/90">
              +{BUSINESS.totalReviews} viajeros satisfechos &middot; {BUSINESS.yearsExperience} años de experiencia
            </span>
          </motion.div>

          {/* H1 — identidad + contraste */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-white mb-6 leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
          >
            Tenerife No{' '}
            <span className="gradient-text">Se Visita.</span>
            <br />
            Se Vive.
          </motion.h1>

          {/* Subtítulo — aversión a la pérdida */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg sm:text-xl text-white/80 max-w-2xl mb-8 leading-relaxed"
          >
            Cada año, miles de turistas se van de Tenerife habiendo visto{' '}
            <em>solo la superficie</em>. Nosotros te llevamos donde los tours masivos
            no llegan: el volcán desde el aire, el océano a 30 metros, los valles de
            vino que nadie conoce. Con {BUSINESS.yearsExperience} años de experiencia y{' '}
            <strong className="text-white">{BUSINESS.averageRating}★ de valoración media</strong>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a
              href="#experiencias"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-trip-pink to-trip-blue text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Ver Experiencias
              <ChevronDown className="w-5 h-5" />
            </a>

            <a
              href={WHATSAPP_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg rounded-2xl hover:bg-white/20 transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.104 1.523 5.833L.057 23.077a.75.75 0 00.921.921l5.244-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.99 0-3.859-.553-5.455-1.516l-.39-.232-4.04 1.129 1.129-4.04-.232-.39A10.453 10.453 0 011.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5z"/>
              </svg>
              Consulta Gratuita
            </a>
          </motion.div>

          {/* Trust signals row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-x-6 gap-y-3"
          >
            {trustSignals.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/70 text-sm">
                <Icon className="w-4 h-4 text-volcanic-300 flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="text-white/40 text-xs uppercase tracking-widest">Descubre</span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-scroll-indicator" />
        </div>
      </div>
    </section>
  )
}

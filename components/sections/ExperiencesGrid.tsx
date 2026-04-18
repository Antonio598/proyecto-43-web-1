'use client'

import { useState } from 'react'
import { experiences, categories } from '@/lib/experiences'
import type { Experience } from '@/types/experience'
import ExperienceCard from './ExperienceCard'
import ExperienceModal from './ExperienceModal'

export default function ExperiencesGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)

  const filtered = activeCategory === 'all'
    ? experiences
    : experiences.filter(e => e.category === activeCategory)

  return (
    <>
      <section id="experiencias" className="section-padding container-max">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-volcanic-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Catálogo Completo
          </p>
          <h2
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
          >
            Lo Que No Encontrarás{' '}
            <span className="gradient-text">En Ningún Catálogo</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            {experiences.length} experiencias únicas en Tenerife. Grupos reducidos, guías expertos
            y acceso a lugares que los tours masivos no conocen.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-gradient-volcanic text-white shadow-cta'
                  : 'bg-ocean-800 border border-ocean-700 text-white/60 hover:text-white hover:border-volcanic-500/40'
              }`}
            >
              {cat.label}
              {cat.id !== 'all' && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({experiences.filter(e => e.category === cat.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
              onOpenModal={setSelectedExperience}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/40">
            <p className="text-lg">No hay experiencias en esta categoría.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-white/40 text-sm">
            ¿Buscas algo diferente?{' '}
            <a
              href="#"
              className="text-volcanic-400 hover:text-volcanic-300 underline underline-offset-2 transition-colors"
            >
              Contáctanos por WhatsApp
            </a>{' '}
            y creamos una experiencia a medida.
          </p>
        </div>
      </section>

      {/* Modal */}
      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </>
  )
}

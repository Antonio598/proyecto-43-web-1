'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Experience } from '@/types/experience'

interface ExperienceCardProps {
  experience: Experience
  index: number
  onOpenModal: (experience: Experience) => void
}

function StarRow({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {Array(5).fill(0).map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 fill-[#ffcc00]" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>
      <span className="text-[11px] text-[#888]">
        {rating > 0 ? rating.toFixed(2) : '5.00'} ({reviewCount})
      </span>
    </div>
  )
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="bg-white overflow-hidden shadow-sm active:shadow-md transition-shadow">

      {/* Mobile layout: stacked — Desktop layout: side by side */}
      <div className="flex flex-col sm:flex-row">

        {/* Image */}
        <div className="relative w-full sm:w-[38%] aspect-[16/9] sm:aspect-auto sm:min-h-[200px] flex-shrink-0">
          <Image
            src={experience.image}
            alt={experience.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 38vw"
          />
          {experience.badge && (
            <span className="absolute top-3 left-3 bg-[#f5920a] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wide rounded-sm shadow">
              🔥 Likely to Sell Out
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-4 sm:p-5 flex-1 min-w-0">

          {/* Top: title + subtitle + highlights */}
          <div>
            <h3 className="font-bold text-[#222] text-lg leading-snug mb-1.5">
              {experience.title}
            </h3>
            <p className="text-[#666] text-sm leading-relaxed mb-3 line-clamp-2">
              {experience.subtitle}
            </p>
            <ul className="hidden sm:flex flex-col gap-1 mb-3">
              {experience.highlights.slice(0, 3).map((h, i) => (
                <li key={i} className="text-[12px] text-[#555] flex items-start gap-1.5">
                  <span className="text-[#1a3a5c] mt-0.5 flex-shrink-0">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom: rating + price + button */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">

            {/* Left: stars + price */}
            <div className="flex flex-col gap-1 min-w-0">
              <StarRow rating={experience.rating} reviewCount={experience.reviewCount} />
              <div className="flex items-baseline gap-1">
                <span className="text-[11px] text-[#999]">From</span>
                <span className="text-[#f5920a] font-extrabold text-xl leading-none">{experience.priceLabel}</span>
              </div>
            </div>

            {/* Right: button */}
            <Link
              href={`/experiencias/${experience.slug}`}
              className="bg-[#f5920a] hover:bg-[#e07e08] active:bg-[#c96d07] text-white text-[12px] font-bold uppercase px-4 py-2.5 rounded-full transition-colors whitespace-nowrap flex-shrink-0 min-h-[44px] flex items-center"
            >
              View Tour →
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}

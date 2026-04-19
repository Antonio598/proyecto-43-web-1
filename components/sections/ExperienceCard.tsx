'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import type { Experience } from '@/types/experience'

interface ExperienceCardProps {
  experience: Experience
  index: number
  onOpenModal: (experience: Experience) => void
}

export default function ExperienceCard({ experience, index, onOpenModal }: ExperienceCardProps) {
  return (
    <article className="flex flex-col md:flex-row bg-white overflow-hidden shadow-sm mb-4">
      {/* Image Section */}
      <div className="w-full md:w-[35%] relative aspect-[4/3] md:aspect-auto">
        <Image
          src={experience.image}
          alt={experience.imageAlt}
          fill
          className="object-cover"
        />
        {experience.badge && (
          <div className="absolute top-0 left-0 bg-[#ff33cd] text-white text-[11px] font-bold px-8 py-1 -rotate-45 -translate-x-[30%] translate-y-[50%] shadow-sm">
            Likely to Sell Out
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="w-full md:w-[65%] p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-6">
        
        {/* Left Side: Info */}
        <div className="flex-1">
          <h3 className="font-bold text-[#333] text-xl mb-3">
            {experience.title}
          </h3>
          <p className="text-[#666] text-sm leading-relaxed mb-4">
            <span className="text-orange-400 mr-2">⛵</span>
            {experience.subtitle}
          </p>
          <div className="text-[#888] text-[13px] line-clamp-3">
            {experience.highlights.join(' - ')}
          </div>
        </div>

        {/* Right Side: Action & Price */}
        <div className="flex flex-col items-start sm:items-end sm:w-32 flex-shrink-0 justify-start pt-1 gap-3 border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-6 mt-4 sm:mt-0">
          
          <div className="flex flex-col items-start sm:items-end w-full">
            <div className="flex text-[#ffcc00] gap-0.5 mb-1">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} className="w-[14px] h-[14px] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              ))}
            </div>
            <span className="text-[11px] text-[#999]">{experience.rating > 0 ? experience.rating.toFixed(2) : '5.00'} / {experience.reviewCount} reviews</span>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:mt-4">
            <div className="text-[15px] text-[#333] mb-0 sm:mb-2 flex items-center gap-1">
              From <span className="text-[#ff3399] font-bold text-xl">{experience.priceLabel}</span>
            </div>
            <Link
              href={`/experiencias/${experience.slug}`}
              className="bg-[#ff33cd] hover:bg-[#e62eb8] text-white text-[12px] font-bold uppercase px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
            >
              View Tour
            </Link>
          </div>
        </div>
        
      </div>
    </article>
  )
}

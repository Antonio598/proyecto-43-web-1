'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { experiences } from '@/lib/experiences'
import { Star, Clock, Users, ShoppingCart, Check, AlertCircle, Info, ChevronLeft, X, ChevronRight } from 'lucide-react'

export default function ExperiencePage({ params }: { params: { slug: string } }) {
  const experience = experiences.find((e) => e.slug === params.slug)

  if (!experience) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] pb-16 pt-4 sm:pt-8">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4">

        {/* Back */}
        <Link
          href="/#experiencias"
          className="inline-flex items-center gap-1.5 text-[#3399ff] hover:text-[#ff3399] font-semibold mb-4 sm:mb-6 transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to activities
        </Link>

        {/* Hero card */}
        <div className="bg-white shadow-sm overflow-hidden mb-6">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Main image */}
            <div className="relative h-[260px] sm:h-[380px] lg:h-auto lg:min-h-[420px]">
              <Image
                src={experience.image}
                alt={experience.imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {experience.badge && (
                <span className="absolute top-4 left-4 bg-[#ff3399] text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wide shadow">
                  🔥 {experience.badge}
                </span>
              )}
            </div>

            {/* Info panel */}
            <div className="p-5 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Badges row */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {experience.rating > 0 && (
                    <div className="flex items-center gap-1 bg-[#fffbea] border border-[#ffcc00]/30 px-3 py-1.5 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-[#ffcc00] text-[#ffcc00]" />
                      <span className="font-bold text-[#333] text-sm">{experience.rating}</span>
                      <span className="text-[#888] text-xs">({experience.reviewCount})</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-[#3399ff]" />
                    <span className="text-[#555] text-sm font-medium">{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                    <Users className="w-3.5 h-3.5 text-[#3399ff]" />
                    <span className="text-[#555] text-sm font-medium">Max {experience.maxGroupSize}</span>
                  </div>
                </div>

                <h1 className="font-bold text-[#222] text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3">
                  {experience.title}
                </h1>
                <p className="text-[#3399ff] font-medium text-base sm:text-lg mb-5 leading-relaxed">
                  {experience.subtitle}
                </p>

                {experience.urgencyText && (
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-3 mb-5">
                    <AlertCircle className="w-4 h-4 text-[#3399ff] flex-shrink-0" />
                    <span className="text-[#3399ff] font-semibold text-sm">{experience.urgencyText}</span>
                  </div>
                )}
              </div>

              {/* Price + CTA */}
              <div className="pt-5 border-t border-gray-100">
                <p className="text-[#999] text-xs font-medium uppercase tracking-wide mb-1">Price from</p>
                <p className="text-[#ff3399] font-extrabold text-4xl mb-4">€{experience.price}</p>
                <Link
                  href={`/checkout/${experience.slug}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#ff3399] hover:bg-[#e62e8a] active:bg-[#cc2979] text-white font-bold text-base py-4 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery — only if gallery images exist */}
        {experience.gallery && experience.gallery.length > 1 && (
          <GallerySection images={experience.gallery} title={experience.title} />
        )}

        {/* Details grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">

          {/* Description + highlights + includes */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white shadow-sm p-5 sm:p-8">
              <h2 className="font-bold text-[#222] text-xl mb-4">About this activity</h2>
              <p className="text-[#555] leading-relaxed mb-6">{experience.description}</p>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Highlights */}
                <div>
                  <h3 className="font-bold text-[#333] text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 bg-[#ff3399]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#ff3399]" />
                    </span>
                    Highlights
                  </h3>
                  <ul className="space-y-3">
                    {experience.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[#555]">
                        <Check className="w-4 h-4 text-[#3399ff] mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-medium">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Includes */}
                {experience.includes && experience.includes.length > 0 && (
                  <div>
                    <h3 className="font-bold text-[#333] text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 bg-[#3399ff]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Info className="w-3 h-3 text-[#3399ff]" />
                      </span>
                      What&apos;s included
                    </h3>
                    <ul className="space-y-3">
                      {experience.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[#555]">
                          <Check className="w-4 h-4 text-[#00B67A] mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: requirements + pricing */}
          <div className="flex flex-col gap-6">
            {experience.requirements && experience.requirements.length > 0 && (
              <div className="bg-white shadow-sm p-5 sm:p-6">
                <h3 className="font-bold text-[#222] text-base mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#ff3399]" />
                  Requirements
                </h3>
                <ul className="space-y-2.5">
                  {experience.requirements.map((req, i) => (
                    <li key={i} className="text-[#555] text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff3399] mt-1.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {experience.pricingTiers && experience.pricingTiers.length > 0 && (
              <div className="bg-white shadow-sm p-5 sm:p-6">
                <h3 className="font-bold text-[#222] text-base mb-4">Prices & Options</h3>
                <div className="flex flex-col gap-2">
                  {experience.pricingTiers.map((tier, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 border border-gray-100 px-4 py-3">
                      <span className="text-[#555] text-sm font-medium">{tier.label}</span>
                      <span className="text-[#ff3399] font-bold text-base">€{tier.price}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/checkout/${experience.slug}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#ff3399] hover:bg-[#e62e8a] text-white font-bold text-sm py-3.5 mt-4 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Book Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

/* ── Gallery with lightbox ─────────────────────────────────────────── */
function GallerySection({ images, title }: { images: string[]; title: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = () => setLightbox((i) => (i! > 0 ? i! - 1 : images.length - 1))
  const next = () => setLightbox((i) => (i! < images.length - 1 ? i! + 1 : 0))

  return (
    <>
      <div className="bg-white shadow-sm p-5 sm:p-6">
        <h2 className="font-bold text-[#222] text-xl mb-4">Photo Gallery</h2>

        {/* Grid: first image large, rest smaller */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className={`relative overflow-hidden bg-gray-100 group ${
                i === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-square'
              }`}
            >
              <Image
                src={src}
                alt={`${title} — photo ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              {i === images.length - 1 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">+{images.length - 4}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            onClick={() => setLightbox(null)}
          >
            <X className="w-7 h-7" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-3 sm:left-6 text-white/80 hover:text-white p-2 z-10"
            onClick={(e) => { e.stopPropagation(); prev() }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-4xl mx-12 sm:mx-20 aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox]}
              alt={`${title} — photo ${lightbox + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-3 sm:right-6 text-white/80 hover:text-white p-2 z-10"
            onClick={(e) => { e.stopPropagation(); next() }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}

'use client'

import React from 'react'

export default function HeroSection() {
  return (
    <section className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/images/hero-teide.jpg')`,
          filter: 'brightness(0.72)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg tracking-tight leading-tight">
          Things to do in Tenerife
        </h1>
        <p className="text-base sm:text-lg md:text-2xl font-medium drop-shadow-md text-white/90">
          Tours, Attractions and Excursions
        </p>
      </div>
    </section>
  )
}

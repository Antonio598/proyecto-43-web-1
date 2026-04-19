'use client'

import React from 'react'

export default function HeroSection() {
  return (
    <section className="mt-[112px] relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558293963-8f0a071060eb?auto=format&fit=crop&q=80')`,
          filter: 'brightness(0.8)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-md tracking-tight">
          Things to do in Tenerife
        </h1>
        <p className="text-lg md:text-2xl font-medium drop-shadow-md">
          Tours, Attractions and Excursions
        </p>
      </div>
    </section>
  )
}

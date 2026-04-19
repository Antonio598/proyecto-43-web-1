'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function Sidebar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    const q = query.trim()
    if (q) {
      router.push(`/?q=${encodeURIComponent(q)}`)
    } else {
      router.push('/')
    }
  }

  return (
    <aside className="w-full flex flex-col gap-6">
      {/* Search Widget */}
      <div className="bg-[#3399ff] p-6 text-center text-white flex flex-col gap-3 shadow-sm">
        <h3 className="font-serif italic text-2xl mb-1 mt-2">Search for an activity</h3>
        <p className="text-sm mb-2">Find things to do!</p>

        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search Tour"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-white text-gray-800 px-4 py-3 rounded-none outline-none text-sm placeholder:text-gray-400"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
        </div>

        <button
          onClick={handleSearch}
          className="w-full bg-[#ff3399] hover:bg-[#e62e8a] transition-colors text-white font-bold text-sm tracking-wide uppercase py-3 mt-1"
        >
          Find Tours
        </button>
      </div>

      {/* Why Us Widget */}
      <div className="bg-white border border-gray-100 p-6 shadow-sm flex flex-col gap-4">
        <h3 className="text-[#333] font-bold uppercase tracking-wide border-b border-gray-100 pb-4 text-[15px]">
          Why TenerifeDreamsExcursion ?
        </h3>
        <div className="text-[#666] text-sm leading-relaxed">
          With more than 10 years of experience specializing in entertainment and excursions, we have carefully selected for you the most popular activities, tourist routes and points of interest in Tenerife. Our mission is that you have a great time, at the best prices.
        </div>
      </div>

      {/* Reviews Widget */}
      <div className="bg-white border border-gray-100 p-6 shadow-sm flex flex-col gap-4">
        <h3 className="text-[#333] font-bold uppercase tracking-wide border-b border-gray-100 pb-4 text-[15px] text-center">
          Last Reviews
        </h3>

        <div className="flex flex-col gap-6 mt-2">
          {/* Review 1 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  LH
                </div>
                <span className="text-[#333] text-sm font-semibold">Linda H</span>
              </div>
              <GoogleIcon className="w-4 h-4" />
            </div>
            <div className="flex text-[#ffcc00] gap-0.5 mt-1">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <p className="text-[#666] text-sm leading-relaxed">Excellent trip with an attentive and friendly guide, Captain Guy.</p>
          </div>

          {/* Review 2 */}
          <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  RM
                </div>
                <span className="text-[#333] text-sm font-semibold">Roger M</span>
              </div>
              <GoogleIcon className="w-4 h-4" />
            </div>
            <div className="flex text-[#ffcc00] gap-0.5 mt-1">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.461a1 1 0 00.951-.69l1.07-3.292z M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <p className="text-[#666] text-sm leading-relaxed">Brilliant boat trip. Highly recommended!</p>
          </div>

          {/* Review 3 */}
          <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ff3399] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  SA
                </div>
                <span className="text-[#333] text-sm font-semibold">Sarah A</span>
              </div>
              <GoogleIcon className="w-4 h-4" />
            </div>
            <div className="flex text-[#ffcc00] gap-0.5 mt-1">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <p className="text-[#666] text-sm leading-relaxed">Amazing quad experience on Teide. Unforgettable views!</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

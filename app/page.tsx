import { Suspense } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import ExperiencesGrid from '@/components/sections/ExperiencesGrid'
import Sidebar from '@/components/sections/Sidebar'

function CardSkeleton() {
  return (
    <div className="bg-white shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-[38%] aspect-[16/9] sm:aspect-auto sm:min-h-[200px] bg-gray-100 animate-pulse" />
        <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
          <div className="h-5 bg-gray-100 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
          <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center">
            <div className="h-6 bg-gray-100 rounded animate-pulse w-24" />
            <div className="h-10 bg-gray-100 rounded-full animate-pulse w-28" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <HeroSection />

      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 py-6 sm:py-8">

        {/* Mobile: search widget shown inline above grid */}
        <div className="lg:hidden mb-6">
          <MobileSearchWidget />
        </div>

        <div id="experiencias" className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* Left Column: Grid */}
          <div className="w-full lg:w-2/3 min-w-0">
            <Suspense fallback={
              <div className="flex flex-col gap-4">
                {Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)}
              </div>
            }>
              <ExperiencesGrid />
            </Suspense>
          </div>

          {/* Right Column: Sidebar — hidden on mobile (search shown above instead) */}
          <div className="hidden lg:block w-full lg:w-1/3 flex-shrink-0">
            <Sidebar />
          </div>

        </div>
      </div>
    </main>
  )
}

/* Inline mobile search — avoids importing the full Sidebar just for the search box */
function MobileSearchWidget() {
  return (
    <div className="bg-[#1a3a5c] p-4 text-white flex flex-col gap-3 shadow-sm rounded-sm">
      <div>
        <h3 className="font-serif italic text-xl font-medium">Search for an activity</h3>
        <p className="text-white/80 text-xs mt-0.5">Find things to do in Tenerife</p>
      </div>
      <form action="/" method="get" className="flex gap-2">
        <input
          type="text"
          name="q"
          placeholder="Quad, jet ski, diving…"
          className="flex-1 bg-white text-gray-800 px-4 py-3 outline-none text-sm placeholder:text-gray-400 min-w-0"
        />
        <button
          type="submit"
          className="bg-[#f5920a] hover:bg-[#e07e08] active:bg-[#c96d07] text-white font-bold text-sm px-5 py-3 transition-colors whitespace-nowrap flex-shrink-0"
        >
          Search
        </button>
      </form>
    </div>
  )
}

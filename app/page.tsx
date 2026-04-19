import HeroSection from '@/components/sections/HeroSection'
import ExperiencesGrid from '@/components/sections/ExperiencesGrid'
import Sidebar from '@/components/sections/Sidebar'

export default function Home() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <HeroSection />
      
      <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Grid */}
        <div className="w-full lg:w-2/3">
          <ExperiencesGrid />
        </div>
        
        {/* Right Column: Sidebar */}
        <div className="w-full lg:w-1/3">
          <Sidebar />
        </div>
        
      </div>
    </main>
  )
}

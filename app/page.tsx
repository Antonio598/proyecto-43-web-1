import HeroSection from '@/components/sections/HeroSection'
import TrustBar from '@/components/sections/TrustBar'
import ExperiencesGrid from '@/components/sections/ExperiencesGrid'
import WhyUs from '@/components/sections/WhyUs'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <ExperiencesGrid />
      <WhyUs />
      <Footer />
    </main>
  )
}

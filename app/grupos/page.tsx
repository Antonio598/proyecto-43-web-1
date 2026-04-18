import WhyUs from '@/components/sections/WhyUs'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Grupos | Tenerife Dreams Excursion',
  description: 'Planea el viaje perfecto para tu grupo. Descubre por qué tantos viajeros eligen Tenerife Dreams Excursion para sus viajes en grupo.',
}

export default function GruposPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-0">
      <div className="container-max px-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-trip-blue hover:text-trip-pink font-semibold mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver al inicio
        </Link>
      </div>

      {/* Reusing the updated WhyUs section component for groups */}
      <WhyUs />
    </main>
  )
}

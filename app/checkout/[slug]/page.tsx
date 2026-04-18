import Link from 'next/link'
import { ShoppingCart, Lock, ArrowLeft, Clock } from 'lucide-react'
import { experiences } from '@/lib/experiences'

interface CheckoutPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return experiences.map(e => ({ slug: e.slug }))
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const experience = experiences.find(e => e.slug === params.slug)

  return (
    <main className="min-h-screen bg-ocean-950 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">

        {/* Icon */}
        <div className="w-20 h-20 bg-gradient-volcanic rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-cta">
          <ShoppingCart className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
          Pasarela de Pago
        </h1>

        {experience && (
          <div className="bg-ocean-800 border border-volcanic-500/30 rounded-2xl px-6 py-4 mb-6 inline-block">
            <p className="text-volcanic-300 font-semibold">{experience.title}</p>
            <p className="text-white/60 text-sm mt-1">{experience.priceLabel} por persona</p>
          </div>
        )}

        <p className="text-white/60 text-lg leading-relaxed mb-8">
          La pasarela de pago está siendo configurada.
          <br />
          Estará disponible muy pronto.
        </p>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 bg-ocean-800 border border-ocean-700 rounded-full px-5 py-2.5 mb-10">
          <Clock className="w-4 h-4 text-volcanic-400" />
          <span className="text-white/70 text-sm font-medium">Configuración en proceso</span>
        </div>

        {/* Trust note */}
        <div className="flex items-center justify-center gap-2 text-white/40 text-xs mb-10">
          <Lock className="w-3.5 h-3.5" />
          <span>El pago se procesará con cifrado SSL de 256 bits</span>
        </div>

        {/* Back button */}
        <Link
          href="/#experiencias"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-800 border border-ocean-700 text-white/70 hover:text-white hover:border-volcanic-500/40 rounded-xl transition-all duration-200 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al catálogo
        </Link>
      </div>
    </main>
  )
}

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { experiences } from '@/lib/experiences'
import { Star, Clock, Users, ShoppingCart, Check, AlertCircle, Info, ChevronLeft, MapPin } from 'lucide-react'

export async function generateStaticParams() {
  return experiences.map((exp) => ({
    slug: exp.slug,
  }))
}

export default function ExperiencePage({ params }: { params: { slug: string } }) {
  const experience = experiences.find((e) => e.slug === params.slug)

  if (!experience) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-28">
      <div className="container-max px-4">
        {/* Back Button */}
        <Link 
          href="/#experiencias" 
          className="inline-flex items-center gap-2 text-trip-blue hover:text-trip-pink font-semibold mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver a experiencias
        </Link>

        {/* Top Header Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="grid lg:grid-cols-2 gap-0 relative">
            {/* Image */}
            <div className="relative h-[300px] lg:h-full min-h-[400px]">
              <Image
                src={experience.image}
                alt={experience.imageAlt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent lg:hidden" />
              {experience.badge && (
                <div className="absolute top-6 left-6 bg-gradient-to-r from-trip-pink to-trip-blue text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                  {experience.badge}
                </div>
              )}
            </div>

            {/* Content Sidebar */}
            <div className="p-8 lg:p-12 flex flex-col justify-center bg-white z-10">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {experience.rating > 0 && (
                  <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    <Star className="w-4 h-4 fill-trust-star text-trust-star" />
                    <span className="font-bold text-trip-dark">{experience.rating}</span>
                    <span className="text-trip-dark/60 text-sm">({experience.reviewCount} reseñas)</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-trip-dark/60 text-sm font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                  <Clock className="w-4 h-4 text-trip-blue" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-trip-dark/60 text-sm font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                  <Users className="w-4 h-4 text-trip-blue" />
                  <span>Máx. {experience.maxGroupSize} personas</span>
                </div>
              </div>

              <h1 className="font-display font-bold text-4xl lg:text-5xl text-trip-dark mb-4 leading-tight">
                {experience.title}
              </h1>
              <p className="text-trip-blue font-medium text-lg lg:text-xl mb-8 leading-relaxed">
                {experience.subtitle}
              </p>

              {experience.urgencyText && (
                <div className="flex items-center gap-3 bg-trip-blue/5 border border-trip-blue/20 rounded-2xl px-5 py-4 mb-8">
                  <AlertCircle className="w-5 h-5 text-trip-blue flex-shrink-0" />
                  <span className="text-trip-blue font-semibold">{experience.urgencyText}</span>
                </div>
              )}

              <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4 justify-between">
                <div>
                  <p className="text-trip-dark/50 text-sm mb-1 font-medium">Precio desde</p>
                  <p className="text-3xl font-display font-bold text-trip-pink">
                    €{experience.price}
                  </p>
                </div>
                <Link
                  href={`/checkout/${experience.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 bg-gradient-to-r from-trip-pink to-trip-blue text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Reservar Ahora
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* detailed section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-trip-dark mb-6 flex items-center gap-2">
                Experiencia
              </h2>
              <p className="text-trip-dark/70 text-lg leading-relaxed mb-8">
                {experience.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                {/* Highlights */}
                <div>
                  <h3 className="font-bold text-trip-dark text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-trip-pink p-0.5 bg-trip-pink/10 rounded-full" /> 
                    Lo Destacado
                  </h3>
                  <ul className="space-y-4">
                    {experience.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-trip-dark/75">
                        <Check className="w-5 h-5 text-trip-blue mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Includes */}
                {experience.includes && experience.includes.length > 0 && (
                  <div>
                    <h3 className="font-bold text-trip-dark text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-trip-blue p-0.5 bg-trip-blue/10 rounded-full" /> 
                      Qué incluye
                    </h3>
                    <ul className="space-y-4">
                      {experience.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-trip-dark/75">
                          <Check className="w-5 h-5 text-trust-green mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Requirements */}
            {experience.requirements && experience.requirements.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="font-bold text-trip-dark text-lg mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-trip-pink" /> 
                  Requisitos Importantes
                </h3>
                <ul className="space-y-3">
                  {experience.requirements.map((req, i) => (
                    <li key={i} className="text-trip-dark/70 font-medium flex items-start gap-2">
                      <span className="text-trip-pink mt-1.5 w-1.5 h-1.5 bg-trip-pink rounded-full flex-shrink-0"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pricing tiers */}
            {experience.pricingTiers && experience.pricingTiers.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="font-bold text-trip-dark text-lg mb-6">Opciones y Tarifas</h3>
                <div className="space-y-3">
                  {experience.pricingTiers.map((tier, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <span className="text-trip-dark/70 font-medium">{tier.label}</span>
                      <span className="text-trip-blue font-bold text-lg">€{tier.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

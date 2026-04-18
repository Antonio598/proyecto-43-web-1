import { BUSINESS } from '@/lib/constants'

const trustItems = [
  { value: `${BUSINESS.yearsExperience}+`, label: 'Años de Experiencia', accent: true },
  { value: `${BUSINESS.averageRating}★`, label: 'Valoración Media', accent: true },
  { value: `${BUSINESS.totalReviews}+`, label: 'Reseñas Verificadas', accent: false },
  { value: '6', label: 'Experiencias Exclusivas', accent: false },
  { value: '5', label: 'Idiomas Atendidos', accent: false },
]

const languages = [
  { flag: '🇪🇸', label: 'Español' },
  { flag: '🇬🇧', label: 'English' },
  { flag: '🇩🇪', label: 'Deutsch' },
  { flag: '🇫🇷', label: 'Français' },
  { flag: '🇮🇹', label: 'Italiano' },
]

export default function TrustBar() {
  return (
    <section className="bg-ocean-800 border-y border-ocean-700 py-8">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">

          {/* Trustpilot-style block */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-7 h-7 bg-trust-green flex items-center justify-center rounded-sm">
                  <span className="text-white text-xs font-bold">★</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Excelente</p>
              <p className="text-white/50 text-xs">Valorado en Trustpilot</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-10 bg-ocean-600" />

          {trustItems.map((item, i) => (
            <div key={i} className="text-center">
              <p className={`font-display font-bold text-2xl ${item.accent ? 'text-volcanic-400' : 'text-white'}`}>
                {item.value}
              </p>
              <p className="text-white/60 text-xs mt-0.5">{item.label}</p>
            </div>
          ))}

          <div className="hidden lg:block w-px h-10 bg-ocean-600" />

          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Atención en:</span>
            <div className="flex gap-1 text-xl">
              {languages.map(({ flag, label }) => (
                <span key={label} className="hover:scale-125 transition-transform cursor-default" title={label}>
                  {flag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

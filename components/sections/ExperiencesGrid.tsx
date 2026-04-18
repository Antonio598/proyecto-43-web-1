import { experiences } from '@/lib/experiences'
import ExperienceCard from './ExperienceCard'

export default function ExperiencesGrid() {
  return (
    <section id="experiencias" className="section-padding container-max">

      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-volcanic-400 font-semibold text-sm uppercase tracking-widest mb-3">
          Experiencias Exclusivas
        </p>
        <h2
          className="font-display font-bold text-white mb-4"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
        >
          Lo Que No Encontrarás{' '}
          <span className="gradient-text">En Ningún Catálogo</span>
        </h2>
        <p className="text-white/60 text-lg leading-relaxed">
          Estas no son excursiones de masas. Son experiencias con aforo máximo de 6-20 personas,
          guías expertos y acceso a lugares que los tours convencionales no conocen.
          Selecciona la tuya antes de que se agoten las plazas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.id} experience={exp} index={index} />
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-white/40 text-sm">
          ¿No encuentras lo que buscas?{' '}
          <a
            href="https://wa.me/17866741808"
            target="_blank"
            rel="noopener noreferrer"
            className="text-volcanic-400 hover:text-volcanic-300 underline underline-offset-2 transition-colors"
          >
            Escríbenos por WhatsApp
          </a>{' '}
          y diseñamos una experiencia a medida.
        </p>
      </div>
    </section>
  )
}

import { Shield, Clock, MapPin, HeartHandshake } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'

const benefits = [
  {
    icon: Clock,
    title: 'Confirmación en 2 Horas',
    description:
      'Sin esperar días. Escribes por WhatsApp, y en menos de 2 horas tienes tu reserva confirmada con todos los detalles. Así de simples son las cosas cuando llevas 15 años en esto.',
  },
  {
    icon: HeartHandshake,
    title: 'Asesoramiento Personalizado',
    description:
      'No te mandamos a un chatbot. Te atendemos personas reales que conocen cada ruta, cada horario, cada truco para que tu experiencia sea perfecta. En 5 idiomas.',
  },
  {
    icon: Shield,
    title: 'Seguridad Certificada',
    description:
      'Todos nuestros guías tienen certificación internacional y seguro de actividades incluido. Tu tranquilidad — y la de tu familia — no es negociable para nosotros.',
  },
  {
    icon: MapPin,
    title: 'En el Corazón de Tenerife',
    description: `Estamos en el ${BUSINESS.address.venue}, en ${BUSINESS.address.district}. Ven a vernos, pregunta en persona o simplemente pasa a saludar. Llevamos ${BUSINESS.yearsExperience} años aquí, y seguiremos.`,
  },
]

export default function WhyUs() {
  return (
    <section id="nosotros" className="section-padding bg-gray-50">
      <div className="container-max">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-trip-pink font-semibold text-sm uppercase tracking-widest mb-3">
            Por Qué Elegirnos
          </p>
          <h2
            className="font-display font-bold text-trip-dark mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
          >
            {BUSINESS.yearsExperience} Años No Mienten
          </h2>
          <p className="text-trip-dark/70 text-lg">
            No somos una plataforma de reservas. Somos un equipo local que vive en Tenerife,
            ama Tenerife y lleva {BUSINESS.yearsExperience} años compartiendo esa pasión con viajeros de todo el mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <div
                key={i}
                className="flex gap-5 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-trip-pink/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-trip-pink to-trip-blue flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-trip-dark mb-2">{b.title}</h3>
                  <p className="text-trip-dark/70 text-sm leading-relaxed">{b.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

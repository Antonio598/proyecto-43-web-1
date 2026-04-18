import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'
import { BUSINESS, WHATSAPP_CTA_URL } from '@/lib/constants'

const experienceLinks = [
  'Parapente Biplaza',
  'Submarino Safari',
  'Quad por el Teide',
  'Avistamiento Cetáceos',
  'Rutas del Vino',
  'Visita al Teide',
]

export default function Footer() {
  return (
    <footer id="contacto" className="bg-ocean-950 border-t border-ocean-800">
      <div className="section-padding container-max">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <h3 className="font-display font-bold text-2xl text-white mb-3">
              Tenerife Dreams<span className="gradient-text">Excursion</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              La agencia de experiencias más valorada del sur de Tenerife.
              {BUSINESS.yearsExperience} años creando recuerdos que duran toda la vida.
            </p>
            <a
              href={WHATSAPP_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp hover:bg-green-500 text-white font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.104 1.523 5.833L.057 23.077a.75.75 0 00.921.921l5.244-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.99 0-3.859-.553-5.455-1.516l-.39-.232-4.04 1.129 1.129-4.04-.232-.39A10.453 10.453 0 011.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5z"/>
              </svg>
              Escríbenos Ahora
            </a>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="font-semibold text-white mb-4">Experiencias</h4>
            <ul className="space-y-2">
              {experienceLinks.map((exp) => (
                <li key={exp}>
                  <a
                    href="#experiencias"
                    className="text-white/50 hover:text-volcanic-400 text-sm transition-colors"
                  >
                    {exp}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-volcanic-400 mt-0.5 flex-shrink-0" />
                <a
                  href={BUSINESS.address.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS.address.full}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Phone className="w-4 h-4 text-volcanic-400 flex-shrink-0" />
                <a href={BUSINESS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp: +1 786 674 1808
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Mail className="w-4 h-4 text-volcanic-400 flex-shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-white transition-colors">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>

            <div className="flex gap-4 mt-6">
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-volcanic-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={BUSINESS.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-volcanic-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-ocean-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Tenerife Dreams Excursion. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {[
              { label: 'Política de Privacidad', href: '/privacidad' },
              { label: 'Aviso Legal', href: '/legal' },
              { label: 'Cookies', href: '/cookies' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/30 hover:text-white/60 text-xs transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

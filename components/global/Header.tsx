'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Clock, Mail, ShoppingCart, Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full z-50 bg-white border-b border-gray-100">

      {/* Top Bar — hidden on xs, visible from sm */}
      <div className="hidden sm:block bg-[#f7f7f7] border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-1.5 flex justify-between items-center text-[12px] text-[#666]">
          <div className="flex items-center gap-1 truncate mr-4">
            <span className="font-semibold text-[#333] whitespace-nowrap">¿Sabías?</span>
            <span className="hidden md:inline">Puedes leer TenerifeDreamsExcursion en español.</span>
            <a href="#" className="text-[#0099ff] hover:underline whitespace-nowrap">Continuar en español. 🇪🇸</a>
          </div>
          <div className="flex items-center gap-4 text-[#888] flex-shrink-0">
            <a href="#" className="hover:text-[#25D366] transition-colors p-1"><WhatsAppIcon className="w-4 h-4" /></a>
            <a href="mailto:info@tenerifedreamsexcursion.com" className="hover:text-[#0099ff] transition-colors p-1"><Mail className="w-4 h-4" /></a>
            <Link href="/cart" className="hover:text-[#0099ff] transition-colors p-1"><ShoppingCart className="w-4 h-4" /></Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-[1200px] mx-auto px-4 py-2.5 flex justify-between items-center gap-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5 shrink-0" onClick={() => setMobileMenuOpen(false)}>
          <span className="font-sans font-extrabold text-[22px] sm:text-[26px] md:text-[30px] text-[#ff3399] leading-none tracking-tight">
            Tenerife
          </span>
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[#ff3399] text-[18px] sm:text-[20px] mx-0.5"
          >
            ✈
          </motion.span>
          <span className="font-sans font-extrabold text-[22px] sm:text-[26px] md:text-[30px] text-[#3399ff] leading-none tracking-tight">
            Dreams
          </span>
        </Link>

        {/* Desktop: phone + hours + nav */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          <a href="tel:+34822684504" className="flex items-center gap-1.5 text-[13px] text-[#0099ff] hover:text-[#0077cc] transition-colors font-medium whitespace-nowrap">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            +34 822 68 45 04
          </a>
          <div className="flex items-center gap-1.5 text-[13px] text-[#666] whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-[#0099ff] flex-shrink-0" />
            9h à 22h
          </div>
          <div className="w-px h-5 bg-gray-200" />
          {[
            { label: 'ACTIVITIES', href: '/#experiencias' },
            { label: 'GROUPS', href: '/grupos' },
            { label: 'CONTACT US', href: '#contacto' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-bold text-[#0099ff] hover:text-[#ff3399] transition-colors tracking-wide uppercase whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile right: icons + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <Link href="/cart" className="text-[#888] hover:text-[#0099ff] p-2 transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <a href="tel:+34822684504" className="text-[#0099ff] p-2">
            <Phone className="w-5 h-5" />
          </a>
          <button
            className="text-[#333] p-2 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-2xl"
          >
            {/* Quick info */}
            <div className="flex items-center justify-around px-4 py-3 bg-[#f7f7f7] border-b border-gray-100 text-[13px]">
              <a href="tel:+34822684504" className="flex items-center gap-2 text-[#0099ff] font-semibold">
                <Phone className="w-4 h-4" /> +34 822 68 45 04
              </a>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1.5 text-[#666]">
                <Clock className="w-4 h-4 text-[#0099ff]" /> 9h–22h
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-4 py-3 gap-2">
              {[
                { label: 'Activities', href: '/#experiencias', icon: '🏄' },
                { label: 'Groups', href: '/grupos', icon: '👥' },
                { label: 'My Account', href: '/account', icon: '👤' },
                { label: 'My Cart', href: '/cart', icon: '🛒' },
                { label: 'FAQ', href: '/faq', icon: '❓' },
                { label: 'Contact Us', href: '#contacto', icon: '📞' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3.5 text-[15px] font-semibold text-[#333] hover:text-[#ff3399] hover:bg-pink-50 rounded-xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-xl w-7 text-center">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mx-4 mb-4 mt-1">
              <a
                href="#"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold text-sm py-3.5 rounded-xl"
              >
                <WhatsAppIcon className="w-5 h-5" /> WhatsApp us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.104 1.523 5.833L.057 23.077a.75.75 0 00.921.921l5.244-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.99 0-3.859-.553-5.455-1.516l-.39-.232-4.04 1.129 1.129-4.04-.232-.39A10.453 10.453 0 011.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5z"/>
    </svg>
  )
}

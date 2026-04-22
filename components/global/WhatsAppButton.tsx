'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'
import { WHATSAPP_CTA_URL } from '@/lib/constants'
import { trackInteraction } from '@/lib/session'

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 8000)
    return () => clearTimeout(timer)
  }, [])

  function handleClick() {
    trackInteraction({ type: 'whatsapp_click' })
    setShowTooltip(false)
  }

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="relative bg-white text-ocean-900 rounded-2xl px-4 py-3 shadow-xl max-w-[220px] text-sm font-medium"
          >
            <button
              onClick={() => setDismissed(true)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-3 h-3 text-white" />
            </button>
            <p>¿Tienes dudas? 💬 Respondemos en menos de 10 minutos.</p>
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WHATSAPP_CTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center relative animate-float"
        aria-label="Contactar por WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8 text-white fill-white" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-ping" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
      </motion.a>
    </div>
  )
}

function WhatsAppIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.104 1.523 5.833L.057 23.077a.75.75 0 00.921.921l5.244-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.99 0-3.859-.553-5.455-1.516l-.39-.232-4.04 1.129 1.129-4.04-.232-.39A10.453 10.453 0 011.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5z"/>
    </svg>
  )
}

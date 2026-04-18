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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
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
        className="w-16 h-16 bg-whatsapp rounded-full shadow-2xl flex items-center justify-center relative animate-float"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-8 h-8 text-white fill-white" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-ocean-900 animate-ping" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-ocean-900" />
      </motion.a>
    </div>
  )
}

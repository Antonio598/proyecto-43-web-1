export interface PricingTier {
  label: string   // e.g. "Adulto", "Niño (2-14)"
  price: number
}

export interface Experience {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  price: number           // precio base (el más bajo)
  priceLabel: string      // e.g. "Desde €37"
  pricingTiers?: PricingTier[]
  rating: number
  reviewCount: number
  duration: string
  maxGroupSize: number
  image: string
  imageAlt: string
  badge?: string
  highlights: string[]
  includes?: string[]
  requirements?: string[]
  category: 'acuatica' | 'aerea' | 'tierra' | 'tour' | 'parque' | 'gastronomia'
  available: boolean
  urgencyText?: string
}

export interface BookingPayload {
  sessionId: string
  experienceId: string
  experienceTitle: string
  priceAtBooking: number
  timestamp: string
  source: 'landing_cta' | 'buy_button' | 'modal_form' | 'whatsapp_float'
  userLocale: string
  formData?: {
    name?: string
    email?: string
    phone?: string
    date?: string
    groupSize?: number
    message?: string
  }
}

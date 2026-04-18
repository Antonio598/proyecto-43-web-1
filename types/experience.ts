export interface Experience {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  price: number
  priceLabel: string
  rating: number
  reviewCount: number
  duration: string
  maxGroupSize: number
  image: string
  imageAlt: string
  badge?: string
  highlights: string[]
  category: 'aventura' | 'naturaleza' | 'cultura' | 'maritimo'
  available: boolean
  urgencyText?: string
}

export interface BookingPayload {
  sessionId: string
  experienceId: string
  experienceTitle: string
  priceAtBooking: number
  timestamp: string
  source: 'landing_cta' | 'modal_form' | 'whatsapp_float'
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

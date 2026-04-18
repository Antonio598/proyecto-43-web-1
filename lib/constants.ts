export const BUSINESS = {
  name: 'Trip Tenerife',
  tagline: 'La Isla. La Aventura. Tu Historia.',
  yearsExperience: 15,
  whatsappNumber: '17866741808',
  whatsappUrl: 'https://wa.me/17866741808',
  whatsappMessage: encodeURIComponent(
    '¡Hola! Me interesa una de vuestras experiencias en Tenerife. ¿Podéis darme más información?'
  ),
  address: {
    venue: 'Centro Comercial Siam Mall',
    district: 'Adeje',
    city: 'Tenerife',
    country: 'España',
    full: 'C.C. Siam Mall, Adeje, Tenerife',
    googleMaps: 'https://maps.google.com/?q=Siam+Mall+Adeje+Tenerife',
  },
  social: {
    instagram: 'https://instagram.com/trip_tenerife',
    facebook: 'https://facebook.com/TripTenerife',
    tripadvisor: 'https://www.tripadvisor.com',
  },
  totalReviews: 97,
  averageRating: 4.87,
  email: 'info@triptenerife.com',
  phone: '+34 822 68 45 04',
} as const

export const WHATSAPP_CTA_URL =
  `${BUSINESS.whatsappUrl}?text=${BUSINESS.whatsappMessage}`

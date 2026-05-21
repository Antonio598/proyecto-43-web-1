import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/global/SessionProvider'
import SiteChrome from '@/components/global/SiteChrome'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tenerife Dreams Excursion | Experiencias Únicas',
  description:
    'Las mejores aventuras en Tenerife: parapente biplaza, submarino safari, quad por el Teide y más. 15 años de experiencia. Reserva hoy con cancelación gratuita.',
  keywords: [
    'excursiones Tenerife', 'parapente Tenerife', 'submarino safari Tenerife',
    'quad Teide', 'avistamiento ballenas Tenerife', 'rutas del vino Tenerife',
    'visita Teide', 'actividades Tenerife', 'Siam Mall Adeje',
  ],
  openGraph: {
    title: 'Tenerife Dreams Excursion | Experiencias que Cambian tu Vida',
    description: 'Las aventuras más exclusivas de Tenerife. Reserva ahora y vive lo que no encontrarás en ningún otro lugar.',
    siteName: 'Tenerife Dreams Excursion',
    locale: 'es_ES',
    type: 'website',
  },
  icons: {
    icon: '/images/Icon.png',
    shortcut: '/images/Icon.png',
    apple: '/images/Icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <SessionProvider>
          <SiteChrome>
            {children}
          </SiteChrome>
        </SessionProvider>
      </body>
    </html>
  )
}

'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/global/Header'
import Footer from '@/components/sections/Footer'
import WhatsAppButton from '@/components/global/WhatsAppButton'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <>
      <Header />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  )
}

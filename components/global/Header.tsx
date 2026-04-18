'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Clock, Mail, ShoppingCart, Menu, X, Navigation } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
       {/* Top Bar */}
       <div className="bg-trip-blue/5 border-b border-trip-blue/10">
         <div className="container-max px-4 py-2 flex justify-between items-center text-xs sm:text-sm font-medium text-trip-dark/70">
           <div className="flex gap-4 sm:gap-6">
             <a href="tel:+34822684504" className="flex items-center gap-1.5 hover:text-trip-blue transition-colors">
               <Phone className="w-3.5 h-3.5" />
               <span className="hidden sm:inline text-trip-blue/80">+34 822 68 45 04</span>
             </a>
             <div className="flex items-center gap-1.5 text-trip-blue/80">
               <Clock className="w-3.5 h-3.5" />
               <span className="hidden sm:inline">9h a 22h</span>
             </div>
           </div>
           
           <div className="flex items-center gap-4">
             <span className="hidden lg:inline text-xs font-semibold bg-white border border-trip-blue/20 shadow-sm px-3 py-1 rounded-full text-trip-dark/80">
               ¿Sabías? Puedes leer TenerifeDreamsExcursion en <span className="text-trip-blue">español</span>.
             </span>
             
             <div className="flex items-center gap-3 text-trip-blue/70">
               <a href="#" className="hover:text-[#25D366] transition-colors"><WhatsAppIcon className="w-4 h-4"/></a>
               <a href="#" className="hover:text-trip-blue transition-colors"><Mail className="w-4 h-4" /></a>
               <a href="#" className="hover:text-trip-pink transition-colors relative">
                 <ShoppingCart className="w-4 h-4" />
                 <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-trip-pink rounded-full border-2 border-white"></span>
               </a>
             </div>
           </div>
         </div>
       </div>

       {/* Main Navigation */}
       <div className="container-max px-4 py-4 sm:py-5 flex justify-between items-center">
         {/* Logo */}
         <Link href="/" className="flex items-center gap-1 group">
           <span className="font-display font-bold text-xl sm:text-3xl text-trip-pink tracking-tight transition-transform origin-left">
             Tenerife Dreams
           </span>
           <span className="font-display font-bold text-xl sm:text-3xl text-trip-blue tracking-tight relative transition-transform origin-left whitespace-nowrap">
             Excursion
             <motion.div 
               animate={{ rotate: [45, 55, 45], y: [0, -2, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-1 sm:-top-2 -right-3"
             >
               <Navigation className="w-4 h-4 text-trip-pink fill-trip-pink" />
             </motion.div>
           </span>
         </Link>

         {/* Desktop Nav */}
         <nav className="hidden md:flex items-center gap-8">
           {[
             { label: 'ACTIVITIES', href: '/#experiencias' },
             { label: 'GROUPS', href: '/grupos' },
             { label: 'CONTACT US', href: '#contacto' }
           ].map((item) => (
             <Link 
               key={item.label} 
               href={item.href}
               className="text-[13px] font-bold text-trip-blue hover:text-trip-pink transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-trip-pink hover:after:w-full after:transition-all after:duration-300 tracking-wide"
             >
               {item.label}
             </Link>
           ))}
         </nav>

         {/* Mobile Menu Toggle */}
         <button 
           className="md:hidden text-trip-blue hover:text-trip-pink transition-colors"
           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
         >
           {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
         </button>
       </div>

       {/* Mobile Nav Dropdown */}
       <AnimatePresence>
         {mobileMenuOpen && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
           >
             <nav className="flex flex-col px-6 py-6 space-y-6">
               {[
                 { label: 'ACTIVITIES', href: '/#experiencias' },
                 { label: 'GROUPS', href: '/grupos' },
                 { label: 'CONTACT US', href: '#contacto' }
               ].map((item) => (
                 <Link 
                   key={item.label} 
                   href={item.href}
                   className="block text-center text-base sm:text-lg font-bold text-trip-blue hover:text-trip-pink transition-colors tracking-wide py-3 bg-trip-blue/5 rounded-xl"
                   onClick={() => setMobileMenuOpen(false)}
                 >
                   {item.label}
                 </Link>
               ))}
             </nav>
           </motion.div>
         )}
       </AnimatePresence>
    </header>
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

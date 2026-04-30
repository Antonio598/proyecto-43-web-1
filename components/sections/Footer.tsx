import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current text-[#ffcc00]" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#1a3a5c] text-white mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">

          {/* ABOUT US */}
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-base uppercase tracking-widest border-b border-white/20 pb-3">About Us</h4>
            <div className="text-sm leading-relaxed text-white/90">
              <p className="font-semibold">TenerifeDreamsExcursion.com</p>
              <p className="mt-1">Best Tenerife tours at the best price</p>
              <p className="mt-3 text-white/60 text-xs">Licence: I-0004273.1</p>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-wrap gap-2">
              {/* Visa */}
              <div className="h-8 px-3 bg-white rounded-md flex items-center justify-center shadow-sm">
                <span className="font-extrabold text-[#1a1f71] text-sm tracking-widest">VISA</span>
              </div>
              {/* Mastercard */}
              <div className="h-8 px-3 bg-white rounded-md flex items-center justify-center gap-0 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-[#eb001b]" />
                <div className="w-5 h-5 rounded-full bg-[#f79e1b] -ml-2.5" />
              </div>
              {/* PayPal */}
              <div className="h-8 px-3 bg-white rounded-md flex items-center justify-center shadow-sm">
                <span className="font-bold text-[12px]">
                  <span className="text-[#003087]">Pay</span><span className="text-[#1a3a5c]">Pal</span>
                </span>
              </div>
              {/* Google Pay */}
              <div className="h-8 px-3 bg-white rounded-md flex items-center justify-center shadow-sm">
                <span className="font-bold text-[12px] text-[#5f6368]">G</span>
                <span className="font-bold text-[12px] text-[#3c4043] ml-0.5">Pay</span>
              </div>
              {/* Apple Pay */}
              <div className="h-8 px-3 bg-white rounded-md flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 10" className="h-4 w-auto">
                  <text x="0" y="9" fontFamily="system-ui" fontWeight="700" fontSize="9" fill="#000"></text>
                </svg>
                <span className="font-bold text-[12px] text-black"> Pay</span>
              </div>
            </div>

            {/* Google Rating */}
            <div className="bg-white rounded-xl p-3 inline-flex items-center gap-3 max-w-full shadow-md">
              <GoogleIcon />
              <div className="flex flex-col">
                <span className="text-[#333] text-xs font-bold leading-tight">Google Rating</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[#333] text-sm font-extrabold">4.8</span>
                  <div className="flex gap-0.5">
                    {Array(5).fill(0).map((_, i) => <StarIcon key={i} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-base uppercase tracking-widest border-b border-white/20 pb-3">Links</h4>
            <ul className="space-y-1 text-sm text-white/90">
              <li>
                <Link href="/account" className="hover:text-white hover:underline transition-colors flex items-center gap-2 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white hover:underline transition-colors flex items-center gap-2 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                  My Cart
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white hover:underline transition-colors flex items-center gap-2 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                  FAQ
                </Link>
              </li>
              <li>
                <a href="https://www.instagram.com/trip_tenerife?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors flex items-center gap-2 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/TripTenerife/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors flex items-center gap-2 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT US */}
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-base uppercase tracking-widest border-b border-white/20 pb-3">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <a href="tel:+34822684504" className="hover:underline text-white/90">+34 822 68 45 04</a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <a href="mailto:info@tenerifedreamsexcursion.com" className="hover:underline text-white/90 text-xs sm:text-sm">
                  info@tenerifedreamsexcursion.com
                </a>
              </li>
              <li className="flex items-start gap-3 mt-2">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <span className="text-white/90 text-sm leading-relaxed">C.C. Siam Mall, Adeje<br />Tenerife, Spain</span>
              </li>
            </ul>

            {/* EU Funding */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-start gap-3">
                <div className="bg-[#003399] border-2 border-white/30 rounded p-1.5 flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 20 14" className="w-10 h-7">
                    <rect width="20" height="14" fill="#003399"/>
                    {/* EU stars ring */}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i * 30 - 90) * (Math.PI / 180)
                      const cx = 10 + 4.2 * Math.cos(angle)
                      const cy = 7 + 4.2 * Math.sin(angle)
                      return <polygon key={i} points={`${cx},${cy - 1.1} ${cx + 0.4},${cy - 0.3} ${cx + 1.1},${cy - 0.3} ${cx + 0.6},${cy + 0.3} ${cx + 0.8},${cy + 1.1} ${cx},${cy + 0.6} ${cx - 0.8},${cy + 1.1} ${cx - 0.6},${cy + 0.3} ${cx - 1.1},${cy - 0.3} ${cx - 0.4},${cy - 0.3}`} fill="#FFCC00"/>
                    })}
                  </svg>
                </div>
                <p className="text-[10px] text-white/70 leading-relaxed">
                  Proyecto cofinanciado por el Fondo Europeo de Desarrollo Regional (FEDER) como parte de la respuesta de la UE a la pandemia de COVID-19.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 bg-[#152d52]">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/70">
          <span>© {new Date().getFullYear()} TenerifeDreamsExcursion.com — All rights reserved</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Legal Notice</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

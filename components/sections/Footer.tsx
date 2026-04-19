import Link from 'next/link'
import { Phone, Mail, ShoppingCart } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#0099ff] text-white py-12 border-t mt-auto">
      <div className="container-max px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">

          {/* ABOUT US */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2">ABOUT US</h4>
            <div className="text-sm leading-relaxed">
              <p>TenerifeDreamsExcursion.com</p>
              <p>Best Tenerife&apos;s tours at the best price</p>
              <p className="mt-4">I-0004273.1</p>
            </div>
            
            {/* Payment Methods */}
            <div className="flex flex-wrap gap-2 mt-2">
              {/* PayPal */}
              <div className="h-7 px-2 bg-white rounded border border-white/20 flex items-center justify-center">
                <svg viewBox="0 0 60 16" className="h-4 w-auto"><text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="#003087">Pay</text><text x="22" y="13" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="#009cde">Pal</text></svg>
              </div>
              {/* Visa */}
              <div className="h-7 px-2 bg-white rounded border border-white/20 flex items-center justify-center">
                <svg viewBox="0 0 48 16" className="h-4 w-auto"><text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#1a1f71">VISA</text></svg>
              </div>
              {/* Mastercard */}
              <div className="h-7 px-2 bg-white rounded border border-white/20 flex items-center justify-center gap-0.5">
                <div className="w-4 h-4 rounded-full bg-[#eb001b]" />
                <div className="w-4 h-4 rounded-full bg-[#f79e1b] -ml-2 opacity-90" />
              </div>
              {/* Google Pay */}
              <div className="h-7 px-2 bg-white rounded border border-white/20 flex items-center justify-center">
                <svg viewBox="0 0 50 16" className="h-4 w-auto"><text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#5f6368">G</text><text x="9" y="13" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#3c4043">Pay</text></svg>
              </div>
              {/* Apple Pay */}
              <div className="h-7 px-2 bg-white rounded border border-white/20 flex items-center justify-center">
                <svg viewBox="0 0 55 16" className="h-4 w-auto"><text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#000"> Pay</text></svg>
              </div>
            </div>

            {/* Google Rating */}
            <div className="bg-white rounded-lg p-3 inline-flex items-center gap-3 mt-4 w-max shadow-sm">
               <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
               </svg>
               <div className="flex flex-col">
                 <span className="text-[#333] text-sm font-semibold leading-tight">Google rating</span>
                 <div className="flex items-center gap-1">
                   <span className="text-[#333] text-sm font-bold">4.8</span>
                   <div className="flex text-[#ffcc00] gap-0.5">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    ))}
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2">LINKS</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:underline">My Account</Link></li>
              <li>
                <Link href="#" className="hover:underline flex items-center gap-1">
                  My Cart <ShoppingCart className="w-4 h-4 ml-1" />
                </Link>
              </li>
              <li><Link href="#" className="hover:underline">FAQ</Link></li>
              <li><Link href="#" className="hover:underline">Instagram</Link></li>
              <li><Link href="#" className="hover:underline">Facebook</Link></li>
            </ul>
          </div>

          {/* BLOG */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2">BLOG</h4>
            <div className="flex flex-col gap-6 text-sm font-semibold">
              <Link href="#" className="hover:underline block">La Gomera, the magic island.</Link>
              <div className="w-full h-px bg-white/20 border-dotted border-b"></div>
              <Link href="#" className="hover:underline block">Masca: a beautiful village and a magical trekking</Link>
              <div className="w-full h-px bg-white/20 border-dotted border-b"></div>
              <Link href="#" className="hover:underline block">Visit La Laguna in the north of Tenerife</Link>
            </div>
          </div>

          {/* CONTACT US */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2">CONTACT US</h4>
            <ul className="space-y-4 text-sm mt-1">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                   <Phone className="w-4 h-4 text-[#0099ff]" />
                </div>
                <span>+34 822 68 45 04</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                   <Mail className="w-4 h-4 text-[#0099ff]" />
                </div>
                <span>info@tenerifedreamsexcursion.com</span>
              </li>
            </ul>

            <div className="mt-6 text-[10px] leading-tight text-white/80">
              <p className="mb-2">Proyecto cofinanciado por el Fondo Europeo de Desarrollo Regional como parte de la respuesta de la Unión a la pandemia de COVID-19. Subvenciones dirigidas al mantenimiento de la actividad de personas trabajadoras autónomas y pequeñas y medianas empresas, de los sectores más afectados por la crisis derivada de la COVID-19.</p>
              
              <div className="flex gap-2 mt-4 items-center">
                 <div className="bg-[#003399] p-1 rounded flex items-center justify-center w-10 h-7">
                   <span className="text-[10px] leading-none text-center">🇪🇺</span>
                 </div>
                 <span className="font-bold">Unión Europea</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

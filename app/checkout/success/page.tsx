import Link from 'next/link'
import { CheckCircle, Phone, MessageCircle } from 'lucide-react'

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { order?: string; slug?: string }
}) {
  const order = searchParams.order ?? '—'

  return (
    <main className="bg-[#f5f5f5] min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">

        {/* Card */}
        <div className="bg-white shadow-sm p-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-green-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[#222] mb-2">Booking Confirmed!</h1>
          <p className="text-[#666] text-sm mb-6 leading-relaxed">
            Thank you for your booking. You will receive a confirmation email shortly with all the details.
          </p>

          <div className="bg-[#f5f5f5] rounded px-4 py-3 mb-6 text-sm">
            <span className="text-[#888] font-medium">Order reference: </span>
            <span className="font-bold text-[#333] tracking-wide">{order}</span>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="tel:+34822684504"
              className="flex items-center justify-center gap-2 w-full border border-[#1a3a5c] text-[#1a3a5c] font-semibold text-sm py-3 hover:bg-blue-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              +34 822 68 45 04
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm py-3 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Contact us on WhatsApp
            </a>
            <Link
              href="/"
              className="text-[#1a3a5c] hover:underline text-sm font-medium mt-1"
            >
              ← Browse more activities
            </Link>
          </div>
        </div>

        {/* Trust */}
        <p className="text-center text-xs text-[#aaa] mt-4">
          🔒 Secure payment powered by PayComet · PCI DSS Level 1
        </p>
      </div>
    </main>
  )
}

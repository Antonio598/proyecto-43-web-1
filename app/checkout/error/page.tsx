import Link from 'next/link'
import { XCircle, MessageCircle, RotateCcw } from 'lucide-react'

export default function CheckoutErrorPage({
  searchParams,
}: {
  searchParams: { order?: string; slug?: string }
}) {
  const slug = searchParams.slug
  const order = searchParams.order ?? '—'

  return (
    <main className="bg-[#f5f5f5] min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">

        {/* Card */}
        <div className="bg-white shadow-sm p-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <XCircle className="w-9 h-9 text-red-400" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[#222] mb-2">Payment Not Completed</h1>
          <p className="text-[#666] text-sm mb-3 leading-relaxed">
            Your card has <strong>not been charged</strong>. You can try again or contact us and we will help you complete your booking.
          </p>

          {order !== '—' && (
            <div className="bg-[#f5f5f5] rounded px-4 py-2 mb-6 text-xs text-[#888]">
              Reference: <span className="font-mono text-[#555]">{order}</span>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {slug && (
              <Link
                href={`/checkout/${slug}`}
                className="flex items-center justify-center gap-2 w-full bg-[#f5920a] hover:bg-[#e07e08] text-white font-bold text-sm py-3.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Link>
            )}
            <a
              href="#"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm py-3 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Get help on WhatsApp
            </a>
            <Link href="/" className="text-[#1a3a5c] hover:underline text-sm font-medium mt-1">
              ← Back to activities
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-[#aaa] mt-4">
          🔒 Secure payment powered by PayComet · PCI DSS Level 1
        </p>
      </div>
    </main>
  )
}

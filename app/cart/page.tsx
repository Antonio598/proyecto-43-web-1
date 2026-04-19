import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function CartPage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#333] mb-6 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-[#3399ff]" />
          My Cart
        </h1>

        {/* Cart table header */}
        <div className="bg-white shadow-sm">
          <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-gray-100 text-xs font-bold uppercase text-[#999] tracking-wide">
            <span>Activity</span>
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Subtotal</span>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <ShoppingCart className="w-12 h-12 text-gray-200" />
            <p className="text-[#999] text-sm">Your cart is empty</p>
            <Link
              href="/"
              className="bg-[#ff3399] hover:bg-[#e62e8a] text-white font-bold text-sm uppercase tracking-wide px-6 py-3 transition-colors"
            >
              Browse Activities
            </Link>
          </div>
        </div>

        {/* Totals section */}
        <div className="flex justify-end mt-6">
          <div className="bg-white shadow-sm p-6 w-full sm:w-72 flex flex-col gap-3">
            <h3 className="font-bold text-[#333] text-sm uppercase tracking-wide border-b border-gray-100 pb-3">
              Cart Total
            </h3>
            <div className="flex justify-between text-sm text-[#666]">
              <span>Subtotal</span>
              <span>€0.00</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#333] border-t border-gray-100 pt-3">
              <span>Total</span>
              <span>€0.00</span>
            </div>
            <button disabled className="w-full bg-gray-200 text-gray-400 font-bold text-sm uppercase tracking-wide py-3 mt-1 cursor-not-allowed">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

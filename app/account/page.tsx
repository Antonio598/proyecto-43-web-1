'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AccountPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login')

  return (
    <main className="bg-[#f5f5f5] min-h-screen py-12">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#333] mb-6 text-center">My Account</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
              tab === 'login'
                ? 'text-[#ff3399] border-b-2 border-[#ff3399]'
                : 'text-[#999] hover:text-[#333]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
              tab === 'register'
                ? 'text-[#ff3399] border-b-2 border-[#ff3399]'
                : 'text-[#999] hover:text-[#333]'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="bg-white shadow-sm p-6 flex flex-col gap-4">
          {tab === 'login' ? (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-[#666] tracking-wide">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#3399ff] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-[#666] tracking-wide">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#3399ff] transition-colors"
                />
              </div>
              <button className="w-full bg-[#ff3399] hover:bg-[#e62e8a] text-white font-bold text-sm uppercase tracking-wide py-3 transition-colors mt-2">
                Sign In
              </button>
              <a href="#" className="text-center text-xs text-[#3399ff] hover:underline">
                Forgot your password?
              </a>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-[#666] tracking-wide">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#3399ff] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-[#666] tracking-wide">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#3399ff] transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-[#666] tracking-wide">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#3399ff] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-[#666] tracking-wide">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#3399ff] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-[#666] tracking-wide">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#3399ff] transition-colors"
                />
              </div>
              <button className="w-full bg-[#ff3399] hover:bg-[#e62e8a] text-white font-bold text-sm uppercase tracking-wide py-3 transition-colors mt-2">
                Create Account
              </button>
            </>
          )}
        </div>

        <p className="text-center text-xs text-[#999] mt-4">
          <Link href="/" className="text-[#3399ff] hover:underline">← Back to activities</Link>
        </p>
      </div>
    </main>
  )
}

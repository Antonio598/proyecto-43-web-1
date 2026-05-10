'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, CalendarDays, CalendarX2, LogOut, Menu, X,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Bookings', href: '/admin/bookings', icon: CalendarDays, exact: false },
  { label: 'Calendar', href: '/admin/calendar', icon: CalendarX2, exact: false },
]

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-[#1a3a5c] w-56">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <Link href="/admin" onClick={onClose} className="flex items-center gap-0.5">
          <span className="font-extrabold text-[18px] text-[#f5920a] leading-none">Tenerife</span>
          <span className="text-[#f5920a] text-[14px] mx-0.5">✈</span>
          <span className="font-extrabold text-[18px] text-white leading-none">Dreams</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-white/60 hover:text-white md:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Admin badge */}
      <div className="px-5 py-3 border-b border-white/10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Admin Panel</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
        {navItems.map(({ label, href, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname?.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/10 border-l-2 border-[#f5920a] text-white pl-[10px]'
                  : 'text-white/65 hover:bg-white/5 hover:text-white border-l-2 border-transparent pl-[10px]'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-white/60 hover:text-white hover:bg-white/5 rounded text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Sign out
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 w-full text-white/40 hover:text-white/70 text-xs mt-1 transition-colors"
        >
          ← Back to website
        </Link>
      </div>
    </div>
  )
}

function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname()
  const title = pathname === '/admin'
    ? 'Dashboard'
    : pathname?.startsWith('/admin/bookings')
      ? 'Bookings'
      : pathname?.startsWith('/admin/calendar')
        ? 'Calendar'
        : 'Admin'

  return (
    <div className="h-14 bg-white border-b border-gray-100 flex items-center px-4 gap-4 flex-shrink-0">
      <button
        onClick={onMenuClick}
        className="md:hidden text-[#555] hover:text-[#1a3a5c] p-1.5"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>
      <h1 className="font-bold text-[#222] text-base">{title}</h1>
    </div>
  )
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-[#f5f5f5]">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-56 h-full">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

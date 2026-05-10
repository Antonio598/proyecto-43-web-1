'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, User, Eye, EyeOff } from 'lucide-react'

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})
type FormData = z.infer<typeof schema>

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setAuthError(null)
    const result = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    })
    if (result?.error) {
      setAuthError('Invalid username or password.')
    } else if (result?.ok) {
      router.push('/admin')
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-0.5 mb-2">
            <span className="font-extrabold text-[24px] text-[#f5920a] leading-none">Tenerife</span>
            <span className="text-[#f5920a] text-[18px] mx-0.5">✈</span>
            <span className="font-extrabold text-[24px] text-[#1a3a5c] leading-none">Dreams</span>
          </div>
          <p className="text-[#888] text-sm font-medium">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white shadow-sm p-7">
          <h1 className="font-bold text-[#222] text-lg mb-6 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#1a3a5c]" />
            Sign in
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-wide text-[#555] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#1a3a5c]" /> Username
              </label>
              <input
                {...register('username')}
                type="text"
                autoComplete="username"
                placeholder="admin"
                className={`w-full border ${errors.username ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'} px-3 py-3 text-sm text-[#333] outline-none focus:border-[#1a3a5c] transition-colors`}
              />
              {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-wide text-[#555] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#1a3a5c]" /> Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`w-full border ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'} px-3 py-3 pr-10 text-sm text-[#333] outline-none focus:border-[#1a3a5c] transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#555]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#f5920a] hover:bg-[#e07e08] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-sm py-3.5 flex items-center justify-center gap-2 transition-colors mt-1"
            >
              {isSubmitting ? (
                <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Signing in…</>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#aaa] mt-5 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" /> Secure admin access
        </p>
      </div>
    </main>
  )
}

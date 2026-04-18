'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInEmail, signInGoogle } from '@/lib/auth'
import { useAuth } from '@/hooks/useAuth'

export default function AdminLoginPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) router.replace('/admin')
  }, [user, loading, router])

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signInEmail(email, password)
      router.replace('/admin')
    } catch {
      setError('Email o password non corretti.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogleLogin() {
    setError('')
    try {
      await signInGoogle()
      router.replace('/admin')
    } catch {
      setError('Accesso Google non riuscito.')
    }
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-viola-profondo flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" className="mx-auto mb-4" aria-hidden="true">
            <rect x="9" y="2" width="2" height="16" fill="#F8F4FF"/>
            <rect x="4" y="7" width="12" height="2" fill="#F8F4FF"/>
          </svg>
          <h1 className="font-sans font-black text-ghiaccio uppercase tracking-[4px] text-sm">
            SOGLIA Admin
          </h1>
        </div>

        <form onSubmit={handleEmailLogin} className="flex flex-col gap-5 mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="bg-transparent border-b border-ghiaccio/20 py-3 font-serif text-ghiaccio placeholder-ghiaccio/30 focus:outline-none focus:border-oro transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="bg-transparent border-b border-ghiaccio/20 py-3 font-serif text-ghiaccio placeholder-ghiaccio/30 focus:outline-none focus:border-oro transition-colors"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-oro text-viola-notte font-sans font-bold text-xs uppercase tracking-widest py-4 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? 'Accesso…' : 'Accedi'}
          </button>
        </form>

        <div className="relative text-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ghiaccio/10" />
          </div>
          <span className="relative bg-viola-profondo px-4 font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/30">
            oppure
          </span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-ghiaccio/20 text-ghiaccio font-sans text-xs uppercase tracking-widest py-4 hover:border-ghiaccio/40 transition-colors"
        >
          Accedi con Google
        </button>

        {error && (
          <p className="mt-6 font-serif text-sm italic text-red-400 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

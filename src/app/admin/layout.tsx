'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/lib/auth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.replace('/admin/login')
    }
  }, [user, loading, pathname, router])

  if (loading) return null
  if (!user && pathname !== '/admin/login') return null

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="min-h-screen bg-viola-profondo">
      <nav className="bg-viola-notte border-b border-viola-vivace/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-sans font-black text-ghiaccio uppercase tracking-[4px] text-xs">
            SOGLIA Admin
          </span>
          <Link href="/admin" className="font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/50 hover:text-oro transition-colors">
            Articoli
          </Link>
          <Link href="/admin/commenti" className="font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/50 hover:text-oro transition-colors">
            Commenti
          </Link>
          <Link href="/admin/config" className="font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/50 hover:text-oro transition-colors">
            Config
          </Link>
        </div>
        <button
          onClick={async () => { await signOut(); router.replace('/admin/login') }}
          className="font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/40 hover:text-ghiaccio transition-colors"
        >
          Esci
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {children}
      </main>
    </div>
  )
}

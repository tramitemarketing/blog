'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Articoli',  href: '/articoli' },
  { label: 'Biografia', href: '/biografia' },
]

export default function MobileNavbar() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current && currentY > 60) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      aria-label="Navigazione mobile"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.28s cubic-bezier(0.16,1,0.3,1)',
        background: 'rgba(255,255,255,0.68)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(17,41,107,.10)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 22px',
      }}
    >
      {/* Brand */}
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 16,
          letterSpacing: 5,
          color: '#11296b',
          textDecoration: 'none',
        }}
      >
        SOGLIA
      </Link>

      {/* Links + Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {LINKS.filter(l => l.href !== '/').map(({ label, href }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontWeight: 600,
                color: isActive ? '#11296b' : 'rgba(17,41,107,.55)',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid #ffcb05' : '2px solid transparent',
                paddingBottom: 2,
              }}
            >
              {label}
            </Link>
          )
        })}

        <button
          onClick={() => {
            if (navigator.vibrate) navigator.vibrate(8)
            window.dispatchEvent(new Event('soglia:open-search'))
          }}
          aria-label="Cerca"
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: '#11296b',
            color: '#ffdb57',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

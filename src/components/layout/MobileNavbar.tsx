'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  {
    label: 'Home',
    href: '/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="9" y="2" width="2" height="16" fill="#F0F9FF" />
        <rect x="4" y="7" width="12" height="2" fill="#F0F9FF" />
      </svg>
    ),
  },
  {
    label: 'Articoli',
    href: '/articoli',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#BAE6FD" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="13" y2="11" />
      </svg>
    ),
  },
  {
    label: 'Cerca',
    action: () => {
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10)
      window.dispatchEvent(new Event('soglia:open-search'))
    },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#7DD3FC" strokeWidth="1.8" strokeLinecap="round"
        aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    label: 'Biografia',
    href: '/biografia',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#E0F2FE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
  },
]

export default function MobileNavbar() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const prevY = lastScrollY.current
      lastScrollY.current = currentY
      if (currentY > prevY && currentY > 80) {
        setHidden(true)
      } else if (currentY < prevY) {
        setHidden(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      aria-label="Navigazione mobile"
      className="enter"
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: hidden
          ? 'translateX(-50%) translateY(calc(100% + 28px))'
          : 'translateX(-50%) translateY(0)',
        transition: 'transform 0.3s ease',
        zIndex: 50,
        display: 'inline-flex',
        alignItems: 'center',
        background: 'rgba(200,230,255,.09)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid rgba(255,255,255,.22)',
        borderRadius: 40,
        padding: '10px 20px',
        gap: 8,
        boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,.18), 0 4px 16px rgba(0,0,0,.2)',
      }}
    >
      {ITEMS.map((item) => {
        const isActive = item.href
          ? item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href)
          : false

        const content = (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {item.icon}
            <span style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: isActive ? '#FFFFFF' : 'rgba(240,249,255,.7)',
            }}>
              {item.label}
            </span>
            <div style={{
              width: isActive ? 14 : 3,
              height: 2,
              borderRadius: 2,
              background: 'rgba(255,255,255,.7)',
              opacity: isActive ? 1 : 0,
              transition: 'width 0.22s ease, opacity 0.18s ease',
            }} />
          </div>
        )

        const sharedStyle: React.CSSProperties = {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px 12px',
          borderRadius: 24,
          background: isActive ? 'rgba(255,255,255,.12)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'none',
        }

        if (item.action) {
          return (
            <button key={item.label} style={sharedStyle} onClick={item.action} aria-label={item.label}>
              {content}
            </button>
          )
        }
        return (
          <Link key={item.label} href={item.href!} style={sharedStyle} aria-label={item.label}>
            {content}
          </Link>
        )
      })}
    </nav>
  )
}

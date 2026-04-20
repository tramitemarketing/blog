'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface NavItem {
  label: string
  icon: ReactNode
  href?: string
  action?: () => void
}

const ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
        <rect x="9" y="2" width="2" height="16" fill="#F0F9FF" />
        <rect x="4" y="7" width="12" height="2" fill="#F0F9FF" />
      </svg>
    ),
  },
  {
    label: 'Articoli',
    href: '/articoli',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#BAE6FD" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="13" y2="11" />
      </svg>
    ),
  },
  {
    label: 'Cerca',
    action: () => window.dispatchEvent(new Event('soglia:open-search')),
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#7DD3FC" strokeWidth="1.8" strokeLinecap="round"
        aria-hidden="true" style={{ flexShrink: 0 }}>
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    label: 'Biografia',
    href: '/biografia',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#E0F2FE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
  },
]

const EASE = '0.38s cubic-bezier(0.34, 1.2, 0.64, 1)'

const itemStyle = (isActive: boolean) => ({
  display: 'flex' as const,
  flexDirection: 'column' as const,
  alignItems: 'center' as const,
  gap: 3,
  padding: '5px 10px',
  borderRadius: 24,
  textDecoration: 'none',
  background: isActive ? 'rgba(255,255,255,.12)' : 'transparent',
  boxShadow: isActive
    ? 'inset 0 1px 0 rgba(255,255,255,.2), inset 0 -1px 0 rgba(56,189,248,.1)'
    : 'none',
  transition: 'background 0.18s ease, box-shadow 0.18s ease',
  border: 'none',
  cursor: 'pointer',
})

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  return (
    <nav className="navbar sticky top-0 z-50 flex justify-center py-4 px-6">
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => { setOpen(false); setActive(null) }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          /* Liquid glass — saturate esalta i colori sottostanti come un vero vetro */
          background: open
            ? 'rgba(200,230,255,.13)'
            : 'rgba(200,230,255,.09)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: '1px solid rgba(255,255,255,.22)',
          borderRadius: 40,
          padding: '8px 18px',
          gap: 4,
          /* Specular highlight in cima — simula la luce che colpisce il vetro dall'alto */
          boxShadow: open
            ? 'inset 0 1.5px 0 rgba(255,255,255,.28), inset 0 -1px 0 rgba(56,189,248,.1), 0 8px 32px rgba(0,0,0,.25)'
            : 'inset 0 1.5px 0 rgba(255,255,255,.18), 0 4px 16px rgba(0,0,0,.2)',
          transition: `background ${EASE}, box-shadow ${EASE}`,
        }}
      >
        {ITEMS.map((item, i) => {
          const isActive = active === i
          const sharedProps = {
            'aria-label': item.label,
            onMouseEnter: () => setActive(i),
            onMouseLeave: () => setActive(null),
            style: itemStyle(isActive),
          }
          const inner = (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: open ? 7 : 0,
                transition: `gap ${EASE}`,
              }}>
                {item.icon}
                <span style={{
                  maxWidth: open ? 80 : 0,
                  opacity: open ? 1 : 0,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  /* Contrasto aumentato: bianco puro su hover, bianco/80 a riposo */
                  color: isActive ? '#FFFFFF' : 'rgba(240,249,255,.82)',
                  transition: `max-width ${EASE}, opacity 0.22s ease, color 0.15s ease`,
                }}>
                  {item.label}
                </span>
              </div>
              {/* Dot indicator */}
              <div style={{
                width: isActive && open ? 16 : 3,
                height: 2,
                borderRadius: 2,
                background: 'rgba(255,255,255,.7)',
                opacity: isActive && open ? 1 : 0,
                transition: 'width 0.22s ease, opacity 0.18s ease',
              }} />
            </>
          )

          return (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center' }}>
              {i === 1 && (
                <div style={{
                  width: 1,
                  height: 14,
                  background: 'rgba(255,255,255,.15)',
                  marginRight: 4,
                  flexShrink: 0,
                }} />
              )}
              {item.action ? (
                <button {...sharedProps} onClick={item.action}>{inner}</button>
              ) : (
                <Link {...sharedProps} href={item.href!}>{inner}</Link>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

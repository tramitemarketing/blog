'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface NavItem {
  label: string
  href: string
  icon: ReactNode
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
        stroke="#7DD3FC" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
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
    href: '/articoli',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round"
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
        stroke="#BAE6FD" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
  },
]

const TRANSITION = '0.38s cubic-bezier(0.34, 1.2, 0.64, 1)'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 flex justify-center py-4 px-6">
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: open ? 'rgba(255,255,255,.09)' : 'rgba(255,255,255,.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${open ? 'rgba(56,189,248,.32)' : 'rgba(56,189,248,.18)'}`,
          borderRadius: 40,
          padding: '8px 18px',
          gap: 4,
          transition: `background ${TRANSITION}, border-color ${TRANSITION}`,
          boxShadow: open ? '0 8px 32px rgba(56,189,248,.1)' : 'none',
        }}
      >
        {ITEMS.map((item, i) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center' }}>

            {/* Separatore verticale tra Home e il resto */}
            {i === 1 && (
              <div style={{
                width: 1,
                height: 14,
                background: 'rgba(56,189,248,.2)',
                marginRight: 4,
                flexShrink: 0,
              }} />
            )}

            <Link
              href={item.href}
              aria-label={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: open ? 7 : 0,
                padding: '4px 8px',
                borderRadius: 24,
                textDecoration: 'none',
                transition: `gap ${TRANSITION}`,
              }}
            >
              {item.icon}

              {/* Label — si espande inline */}
              <span style={{
                maxWidth: open ? 72 : 0,
                opacity: open ? 1 : 0,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                fontFamily: 'system-ui, sans-serif',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: '#BAE6FD',
                transition: `max-width ${TRANSITION}, opacity 0.22s ease`,
              }}>
                {item.label}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  )
}

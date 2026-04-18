'use client'
import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'

interface DockItem {
  label: string
  href: string
  icon: ReactNode
}

function scaleFor(index: number, hovered: number | null): number {
  if (hovered === null) return 1
  const d = Math.abs(index - hovered)
  if (d === 0) return 1.45
  if (d === 1) return 1.22
  if (d === 2) return 1.08
  return 1
}

function translateFor(index: number, hovered: number | null): string {
  if (hovered === null) return 'translateY(0)'
  const d = Math.abs(index - hovered)
  if (d === 0) return 'translateY(-9px)'
  if (d === 1) return 'translateY(-4px)'
  if (d === 2) return 'translateY(-1px)'
  return 'translateY(0)'
}

const SPRING = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'

const ITEMS: DockItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="9" y="2" width="2" height="16" fill="#F0F9FF" />
        <rect x="4" y="7" width="12" height="2" fill="#F0F9FF" />
      </svg>
    ),
  },
  {
    label: 'Articoli',
    href: '/articoli',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#7DD3FC" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
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
    href: '/articoli',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round"
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#BAE6FD" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
  },
]

export default function Navbar() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <nav className="sticky top-0 z-50 flex justify-center py-3 px-6">
      <div
        className="flex items-center rounded-full"
        style={{
          background: 'rgba(255,255,255,.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(56,189,248,.18)',
          padding: '8px 20px',
          gap: 0,
        }}
        onMouseLeave={() => setHovered(null)}
      >
        {ITEMS.map((item, i) => (
          <div key={item.label} className="flex items-center">
            {/* Separatore dopo Home */}
            {i === 1 && (
              <div
                style={{
                  width: 1,
                  height: 14,
                  background: 'rgba(56,189,248,.2)',
                  margin: '0 8px',
                  flexShrink: 0,
                }}
              />
            )}
            <Link
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className="relative flex items-center justify-center"
              style={{
                width: 36,
                height: 36,
                transform: `${translateFor(i, hovered)} scale(${scaleFor(i, hovered)})`,
                transition: SPRING,
                transformOrigin: 'bottom center',
              }}
              onMouseEnter={() => setHovered(i)}
            >
              {item.icon}
              {/* Tooltip */}
              {hovered === i && (
                <span
                  className="absolute pointer-events-none"
                  style={{
                    top: -30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(4,8,16,.92)',
                    border: '1px solid rgba(56,189,248,.2)',
                    color: '#BAE6FD',
                    fontSize: 8,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    padding: '3px 9px',
                    borderRadius: 20,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </span>
              )}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  )
}

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Articoli',  href: '/articoli' },
  { label: 'Biografia', href: '/biografia' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav
      className="navbar"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        background: 'rgba(8,18,52,.42)',
        backdropFilter: 'blur(28px) saturate(160%)',
        WebkitBackdropFilter: 'blur(28px) saturate(160%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 56px',
      }}
    >
      {/* Linea oro sfumata in fondo */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,219,87,.45) 25%, rgba(255,219,87,.45) 75%, transparent)',
      }} />

      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: 6,
          color: '#ffdb57',
          textDecoration: 'none',
        }}>
          SOGLIA
        </Link>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 9,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: 'rgba(255,219,87,.5)',
          fontWeight: 600,
        }}>
          Riflessioni di un sacerdote
        </span>
      </div>

      {/* Links + Search */}
      <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
        {LINKS.map(({ label, href }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                letterSpacing: 3,
                textTransform: 'uppercase',
                fontWeight: 600,
                color: isActive ? '#ffdb57' : 'rgba(255,255,255,.78)',
                textDecoration: 'none',
                position: 'relative',
                padding: '4px 0',
                transition: 'color 0.2s ease',
              }}
            >
              {label}
              {isActive && (
                <span style={{
                  position: 'absolute',
                  left: 0, right: 0, bottom: -2,
                  height: 2,
                  background: '#ffdb57',
                }} />
              )}
            </Link>
          )
        })}

        {/* Search — glass pill */}
        <button
          onClick={() => window.dispatchEvent(new Event('soglia:open-search'))}
          aria-label="Cerca"
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'rgba(255,255,255,.10)',
            color: '#ffdb57',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,219,87,.38)',
            cursor: 'pointer',
            flexShrink: 0,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            transition: 'background 0.2s ease',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

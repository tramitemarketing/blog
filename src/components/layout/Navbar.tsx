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
        background: '#0a1230',
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
              className={`nav-link${isActive ? ' nav-link--active' : ''}`}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                letterSpacing: 3,
                textTransform: 'uppercase',
                fontWeight: 600,
                color: isActive ? '#ffdb57' : 'rgba(255,255,255,.78)',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          )
        })}

        {/* Search — glass pill */}
        <button
          onClick={() => window.dispatchEvent(new Event('soglia:open-search'))}
          aria-label="Cerca"
          className="nav-search-btn"
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'rgba(255,255,255,.08)',
            color: '#ffdb57',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,219,87,.35)',
            cursor: 'pointer',
            flexShrink: 0,
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

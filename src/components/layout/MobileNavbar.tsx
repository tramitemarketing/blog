'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { label: 'Home',      href: '/',         num: '01' },
  { label: 'Articoli',  href: '/articoli', num: '02' },
  { label: 'Biografia', href: '/biografia', num: '03' },
]

export default function MobileNavbar() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const lastScrollY = useRef(0)

  // Scroll-hide — disattivato mentre il menu è aperto
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) return
      const currentY = window.scrollY
      setHidden(currentY > lastScrollY.current && currentY > 60)
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  // Animazione apertura / chiusura overlay
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      // double rAF per garantire che il paint avvenga prima della transizione
      requestAnimationFrame(() => requestAnimationFrame(() => setMenuVisible(true)))
    } else {
      setMenuVisible(false)
      const t = setTimeout(() => { document.body.style.overflow = '' }, 400)
      return () => clearTimeout(t)
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Chiudi menu al cambio di pagina
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const barStyle = (isTop: boolean): React.CSSProperties => ({
    display: 'block',
    width: 22,
    height: 1.5,
    background: '#ffdb57',
    borderRadius: 2,
    transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1), opacity 0.24s ease',
    transform: menuOpen
      ? isTop
        ? 'translateY(3.75px) rotate(45deg)'
        : 'translateY(-3.75px) rotate(-45deg)'
      : 'none',
  })

  return (
    <>
      {/* ── Top bar ─────────────────────────────────── */}
      <nav
        aria-label="Navigazione mobile"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 22px',
          height: 56,
          background: menuOpen
            ? '#11296b'
            : 'rgba(8,18,52,.88)',
          backdropFilter: menuOpen ? 'none' : 'blur(22px) saturate(180%)',
          WebkitBackdropFilter: menuOpen ? 'none' : 'blur(22px) saturate(180%)',
          borderBottom: '1px solid rgba(255,219,87,.2)',
          transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
          transition: [
            'transform 0.28s cubic-bezier(0.16,1,0.3,1)',
            'background 0.35s ease',
          ].join(', '),
        }}
      >
        {/* Linea oro sfumata in fondo */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0, bottom: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,219,87,.4) 30%, rgba(255,219,87,.4) 70%, transparent)',
          pointerEvents: 'none',
        }} />

        {/* Brand */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: 6,
            color: '#ffdb57',
            textDecoration: 'none',
          }}
        >
          SOGLIA
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
          style={{
            width: 40, height: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            marginRight: -8,
          }}
        >
          <span style={barStyle(true)} />
          <span style={barStyle(false)} />
        </button>
      </nav>

      {/* ── Menu overlay ────────────────────────────── */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: '#11296b',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px 28px 40px',
          overflow: 'hidden',
          pointerEvents: menuOpen ? 'auto' : 'none',
          opacity: menuVisible ? 1 : 0,
          transform: menuVisible ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Watermark decorativo */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: 40, right: -16,
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(100px, 38vw, 180px)',
          fontWeight: 600,
          lineHeight: 1,
          color: 'rgba(255,219,87,.04)',
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-.04em',
        }}>
          SOGLIA
        </div>

        {/* Cerchi concentrici decorativi */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          right: -180, bottom: -180,
          width: 480, height: 480,
          borderRadius: '50%',
          background: `radial-gradient(circle,
            transparent 0 70px,
            rgba(255,219,87,.07) 70px 72px, transparent 72px 140px,
            rgba(255,219,87,.05) 140px 142px, transparent 142px 220px,
            rgba(255,219,87,.03) 220px 222px, transparent 222px)`,
          pointerEvents: 'none',
        }} />

        {/* Linea accent orizzontale */}
        <div style={{
          width: 48, height: 1,
          background: '#ffdb57',
          marginBottom: 44,
          opacity: menuVisible ? 0.6 : 0,
          transform: menuVisible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.08s, opacity 0.4s ease 0.08s',
        }} />

        {/* Links */}
        <nav aria-label="Menu principale">
          {LINKS.map(({ label, href, num }, i) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 14,
                  padding: '18px 0',
                  borderBottom: '1px solid rgba(255,219,87,.1)',
                  textDecoration: 'none',
                  opacity: menuVisible ? 1 : 0,
                  transform: menuVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: [
                    `opacity 0.45s ease ${0.14 + i * 0.07}s`,
                    `transform 0.55s cubic-bezier(0.16,1,0.3,1) ${0.14 + i * 0.07}s`,
                  ].join(', '),
                }}
              >
                {/* Numero */}
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: isActive ? '#ffdb57' : 'rgba(255,219,87,.3)',
                  userSelect: 'none',
                }}>
                  {num}
                </span>

                {/* Label */}
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: isActive ? 'italic' : 'normal',
                  fontWeight: isActive ? 400 : 500,
                  fontSize: 'clamp(44px, 14vw, 58px)',
                  letterSpacing: '-.025em',
                  lineHeight: 1,
                  color: isActive ? '#ffdb57' : 'rgba(255,255,255,.92)',
                }}>
                  {label}
                </span>

                {/* Indicatore pagina attiva */}
                {isActive && (
                  <span style={{
                    marginLeft: 'auto',
                    alignSelf: 'center',
                    width: 6, height: 6,
                    borderRadius: '50%',
                    background: '#ffdb57',
                    flexShrink: 0,
                  }} />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Search button */}
        <button
          onClick={() => {
            setMenuOpen(false)
            setTimeout(() => window.dispatchEvent(new Event('soglia:open-search')), 320)
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginTop: 36,
            width: '100%',
            background: 'rgba(255,219,87,.06)',
            border: '1px solid rgba(255,219,87,.22)',
            color: '#ffdb57',
            padding: '18px 20px',
            cursor: 'pointer',
            textAlign: 'left',
            opacity: menuVisible ? 1 : 0,
            transform: menuVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: [
              'opacity 0.45s ease 0.38s',
              'transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.38s',
              'background 0.2s ease',
            ].join(', '),
          }}
          onMouseDown={e => (e.currentTarget.style.background = 'rgba(255,219,87,.12)')}
          onMouseUp={e => (e.currentTarget.style.background = 'rgba(255,219,87,.06)')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontWeight: 700,
          }}>
            Cerca articoli
          </span>
        </button>
      </div>
    </>
  )
}

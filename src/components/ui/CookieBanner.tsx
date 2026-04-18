'use client'
import { useEffect, useState } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export default function CookieBanner() {
  const { consented, accept, reject } = useCookieConsent()
  const [visible, setVisible] = useState(false)

  // Piccolo delay per far partire l'animazione dopo il mount
  useEffect(() => {
    if (consented === null) {
      const t = setTimeout(() => setVisible(true), 120)
      return () => clearTimeout(t)
    }
  }, [consented])

  if (consented !== null) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 16,
        backdropFilter: visible ? 'blur(6px)' : 'blur(0px)',
        WebkitBackdropFilter: visible ? 'blur(6px)' : 'blur(0px)',
        background: visible ? 'rgba(5,12,24,.55)' : 'rgba(5,12,24,0)',
        transition: 'backdrop-filter 0.4s ease, background 0.4s ease',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: '100%',
          background: 'rgba(255,255,255,.08)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(56,189,248,.22)',
          borderRadius: 16,
          padding: '28px 28px 24px',
          boxShadow: '0 24px 64px rgba(0,0,0,.45)',
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.42s cubic-bezier(0.34,1.2,0.64,1), opacity 0.32s ease',
        }}
      >
        <h2
          className="font-sans font-black text-ghiaccio uppercase mb-3"
          style={{ fontSize: 11, letterSpacing: '3px' }}
        >
          Cookie & Privacy
        </h2>
        <p className="font-serif text-ghiaccio/70 text-sm leading-relaxed mb-6">
          Questo sito usa Google Analytics per misurare le visite. I cookie
          analytics vengono attivati solo con il tuo consenso, in conformità
          al GDPR e alla normativa italiana sulla privacy.
        </p>
        <div className="flex gap-3">
          <button
            onClick={accept}
            style={{
              flex: 1,
              background: '#38BDF8',
              color: '#050C18',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 700,
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              padding: '10px 0',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Accetto
          </button>
          <button
            onClick={reject}
            style={{
              flex: 1,
              background: 'transparent',
              color: 'rgba(240,249,255,.5)',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              padding: '10px 0',
              borderRadius: 8,
              border: '1px solid rgba(240,249,255,.15)',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(240,249,255,.35)'
              e.currentTarget.style.color = 'rgba(240,249,255,.8)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(240,249,255,.15)'
              e.currentTarget.style.color = 'rgba(240,249,255,.5)'
            }}
          >
            Rifiuto
          </button>
        </div>
      </div>
    </div>
  )
}

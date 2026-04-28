export default function Footer() {
  return (
    <footer
      style={{
        background: '#0a1a47',
        color: 'rgba(255,255,255,.7)',
        padding: '34px 56px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,219,87,.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: 'var(--font-sans)',
          fontSize: 10,
          letterSpacing: 4,
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            background: '#ffdb57',
            borderRadius: '50%',
            flexShrink: 0,
          }}
        />
        SOGLIA · Riflessioni di un sacerdote · © {new Date().getFullYear()}
      </div>

      <a
        href="https://tramite-marketing.pages.dev"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
          opacity: .7,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#E8333A',
            flexShrink: 0,
          }}
        >
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'rgba(255,255,255,.7)',
          }}
        >
          Made by Tramite
        </span>
      </a>
    </footer>
  )
}

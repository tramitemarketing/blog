export default function Footer() {
  return (
    <footer className="bg-blu-marino border-t border-blu-accento/10 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/40">
          SOGLIA · Riflessioni di un sacerdote
        </p>

        <a
          href="https://tramite-marketing.pages.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 hover:opacity-100 transition-opacity duration-150"
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
        >
          {/* Bollino rosso con freccia bianca — logo Tramite */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#E8333A',
            flexShrink: 0,
          }}>
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>

          <span
            className="font-sans uppercase"
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '3px',
              color: 'rgba(240,249,255,.75)',
            }}
          >
            Made by Tramite
          </span>
        </a>
      </div>
    </footer>
  )
}

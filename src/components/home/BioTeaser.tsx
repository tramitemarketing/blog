import Link from 'next/link'

export default function BioTeaser() {
  return (
    <section
      className="bio-teaser"
      style={{
        background: '#0a1a47',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent bar sinistra */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 6,
          background: '#ffcb05',
        }}
      />

      {/* Colonna 1 — etichetta */}
      <div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#ffdb57',
          }}
        >
          Il sacerdote
        </p>
        <p
          style={{
            marginTop: 10,
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 24,
            color: 'rgba(255,255,255,.4)',
            letterSpacing: 0,
          }}
        >
          03 · Chi scrive
        </p>
      </div>

      {/* Colonna 2 — testo */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 30,
          lineHeight: 1.35,
          color: 'rgba(255,255,255,.92)',
        }}
      >
        Prete dal dicembre dell&rsquo;88, pellegrino in grandi comunità parrocchiali,
        oggi parroco in una piccolissima parrocchia tra i calanchi delle colline.
        Da più di 30 anni insegno religione al Liceo Rosetti — e scrivo queste
        riflessioni come{' '}
        <em
          style={{
            fontStyle: 'normal',
            color: '#ffdb57',
            background: 'linear-gradient(180deg, transparent 60%, rgba(255,219,87,.2) 60%)',
            padding: '0 4px',
          }}
        >
          tentativo di immaginare e vivere con bellezza la vita
        </em>
        .
      </p>

      {/* Colonna 3 — riquadro con bottone */}
      <div
        className="bio-teaser-divider"
        style={{
          border: '1px solid rgba(255,219,87,.22)',
          padding: '28px 24px',
          position: 'relative',
          background: 'rgba(255,255,255,.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {/* Angolo decorativo */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: 0, right: 0,
          width: 18, height: 18,
          borderBottom: '1px solid rgba(255,219,87,.22)',
          borderLeft: '1px solid rgba(255,219,87,.22)',
          background: '#0a1a47',
        }} />

        <Link
          href="/biografia"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#0a1a47',
            background: '#ffdb57',
            padding: '14px 22px',
            textDecoration: 'none',
            width: 'fit-content',
          }}
        >
          Leggi la biografia →
        </Link>
      </div>
    </section>
  )
}

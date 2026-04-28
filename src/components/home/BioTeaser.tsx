import Link from 'next/link'

export default function BioTeaser() {
  return (
    <section
      style={{
        background: '#0a1a47',
        color: '#fff',
        padding: '96px 56px',
        display: 'grid',
        gridTemplateColumns: '220px 1fr 280px',
        gap: 64,
        alignItems: 'start',
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
          03 — Chi scrive
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
        Sacerdote da diciassette anni, insegnante di religione e di filosofia in un
        liceo di provincia. Scrivo queste riflessioni come{' '}
        <em
          style={{
            fontStyle: 'normal',
            color: '#ffdb57',
            background: 'linear-gradient(180deg, transparent 60%, rgba(255,219,87,.2) 60%)',
            padding: '0 4px',
          }}
        >
          tentativo di pensare ad alta voce
        </em>{' '}
        — perché la fede, quando non si lascia interrogare, finisce per diventare
        un&rsquo;abitudine elegante.
      </p>

      {/* Colonna 3 — meta + link */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          borderLeft: '1px solid rgba(255,219,87,.3)',
          paddingLeft: 24,
        }}
      >
        {[
          { label: 'Ordinato',  value: '2009 · Diocesi di —' },
          { label: 'Studi',     value: 'Teologia fondamentale, Roma' },
          { label: 'Insegna',   value: 'Religione, filosofia teoretica' },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <b
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                fontWeight: 700,
                color: '#ffdb57',
              }}
            >
              {label}
            </b>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 400,
                color: '#fff',
              }}
            >
              {value}
            </span>
          </div>
        ))}

        <Link
          href="/biografia"
          style={{
            marginTop: 8,
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

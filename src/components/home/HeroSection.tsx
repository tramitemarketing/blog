import type { Article, Citazione } from '@/types'

interface HeroSectionProps {
  featuredArticle: Article | null
  citazione: Citazione | null
}

const FALLBACK_CITAZIONE = {
  text: 'Vivi ciò che vedi. Immagina ciò che ami e sogni.',
  reference: 'Luigi Verdi',
}

export default function HeroSection({ citazione }: HeroSectionProps) {
  const displayCitazione = citazione ?? FALLBACK_CITAZIONE
  return (
    <section className="hero-section">
      {/* Cerchi concentrici decorativi */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: -260,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: `radial-gradient(circle,
            transparent 0 92px,
            rgba(255,219,87,.12) 92px 94px, transparent 94px 184px,
            rgba(255,219,87,.08) 184px 186px, transparent 186px 280px,
            rgba(255,219,87,.06) 280px 282px, transparent 282px 380px,
            rgba(255,219,87,.04) 380px 382px, transparent 382px 488px,
            rgba(255,219,87,.03) 488px 490px, transparent 490px)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Linea inferiore */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0, right: 0, bottom: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,219,87,.4) 30%, rgba(255,219,87,.4) 70%, transparent)',
        }}
      />

      <div className="hero-grid">
        {/* Colonna sinistra */}
        <div>
          {/* Eyebrow */}
          <div
            className="hero-anim-eyebrow"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 28,
              fontSize: 10,
              letterSpacing: 6,
              textTransform: 'uppercase',
              fontWeight: 700,
              color: '#ffdb57',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <span style={{ flexShrink: 0, width: 56, height: 1, background: '#ffdb57', opacity: .7 }} />
            <span>Riflessioni di un sacerdote</span>
          </div>

          {/* Display tipografico */}
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, lineHeight: .86, letterSpacing: '-.04em' }}>
            <span className="hero-l1 hero-anim-l1" style={{ display: 'block', color: '#ffdb57', fontWeight: 600 }}>
              Immaginare
            </span>
            <span
              className="hero-l2 hero-anim-l2"
              style={{
                display: 'block',
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#fff',
                marginTop: '-.06em',
                marginLeft: '.4em',
              }}
            >
              riflessioni
            </span>
            <span
              className="hero-l3 hero-anim-l3"
              style={{
                display: 'block',
                color: 'transparent',
                WebkitTextStroke: '1.5px #ffdb57',
                fontWeight: 600,
                marginTop: '-.04em',
              }}
            >
              DI UN SACERDOTE
            </span>
          </div>

          {/* Sottotitolo */}
          <p
            className="hero-anim-subtitle"
            style={{
              marginTop: 32,
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(16px, 2vw, 24px)',
              lineHeight: 1.4,
              color: 'rgba(255,255,255,.85)',
              maxWidth: 540,
              borderLeft: '3px solid #ffdb57',
              paddingLeft: 18,
            }}
          >
            Pensare ad alta voce la fede — in dialogo con la filosofia, la teologia
            e l&rsquo;esperienza quotidiana, sul confine tra ciò che si crede e ciò
            che si interroga.
          </p>
        </div>
      </div>

      {/* Citazione del giorno — barra orizzontale a tutta larghezza */}
      <aside
        className="hero-anim-quote"
        style={{
          marginTop: 48,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          background: 'rgba(255,255,255,.04)',
          border: '1px solid rgba(255,219,87,.25)',
          padding: '22px 36px',
        }}
      >
        {/* Virgoletta decorativa */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -28,
            left: 28,
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: 100,
            lineHeight: 1,
            color: '#ffdb57',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          &ldquo;
        </span>

        {/* Label */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 9,
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#ffdb57',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <span style={{ width: 6, height: 6, background: '#ffdb57', borderRadius: '50%', flexShrink: 0 }} />
          Citazione<br />del giorno
        </div>

        {/* Linea separatrice */}
        <div style={{ flexShrink: 0, width: 1, alignSelf: 'stretch', background: 'rgba(255,219,87,.2)' }} />

        {/* Testo citazione */}
        <p
          style={{
            flex: 1,
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.6vw, 21px)',
            lineHeight: 1.4,
            color: '#fff',
          }}
        >
          {displayCitazione.text}
        </p>

        {/* Riferimento */}
        <p
          style={{
            flexShrink: 0,
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'rgba(255,219,87,.7)',
            textAlign: 'right',
          }}
        >
          — {displayCitazione.reference}
        </p>
      </aside>
    </section>
  )
}

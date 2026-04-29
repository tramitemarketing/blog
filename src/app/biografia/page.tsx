'use client'
import { useState, useEffect } from 'react'
import { getBiografia } from '@/lib/firestore'
import type { Biografia } from '@/types'

export default function BiografiaPage() {
  const [bio, setBio] = useState<Biografia | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBiografia()
      .then(setBio)
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {/* Header sezione — stile A1-audace */}
      <header
        style={{
          background: '#0a1a47',
          padding: 'clamp(48px, 8vw, 80px) clamp(22px, 5vw, 56px) clamp(40px, 6vw, 64px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent bar sinistra */}
        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 6, background: '#ffcb05',
        }} />

        {/* Cerchi decorativi */}
        <div aria-hidden="true" style={{
          position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)',
          width: 460, height: 460, borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          background: `radial-gradient(circle,
            transparent 0 55px,
            rgba(255,219,87,.1) 55px 57px, transparent 57px 110px,
            rgba(255,219,87,.06) 110px 112px, transparent 112px 175px,
            rgba(255,219,87,.04) 175px 177px, transparent 177px)`,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 6,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'rgba(255,219,87,.7)',
            marginBottom: 16,
          }}>
            — Il sacerdote
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(64px, 10vw, 140px)',
            lineHeight: .86,
            letterSpacing: '-.04em',
            color: '#ffdb57',
            margin: 0,
          }}>
            Biografia
          </h1>
        </div>
      </header>

      {/* Corpo — contenuto su carta */}
      <div style={{
        maxWidth: 740,
        margin: '0 auto',
        padding: 'clamp(48px, 7vw, 80px) clamp(22px, 5vw, 56px)',
      }}>
        {loading ? (
          <BioSkeleton />
        ) : bio?.content ? (
          <div
            className="article-body"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 19,
              lineHeight: 1.75,
              color: '#0a0f24',
            }}
            dangerouslySetInnerHTML={{ __html: bio.content }}
          />
        ) : (
          <PlaceholderBio />
        )}
      </div>
    </>
  )
}

function PlaceholderBio() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontWeight: 300,
        fontSize: 22,
        lineHeight: 1.6,
        color: 'rgba(10,15,36,.75)',
      }}>
        Sacerdote e insegnante di religione, scrivo queste riflessioni come
        un tentativo di pensare ad alta voce la fede — in dialogo con la
        filosofia, la teologia e l&apos;esperienza quotidiana.
      </p>

      <blockquote style={{
        borderLeft: '4px solid #ffcb05',
        paddingLeft: 24,
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 22,
        lineHeight: 1.45,
        color: '#11296b',
      }}>
        &ldquo;Il confine tra il sacro e il quotidiano è sottile — e spesso
        è proprio lì che accade qualcosa di vero.&rdquo;
      </blockquote>

      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 10,
        letterSpacing: 4,
        textTransform: 'uppercase',
        color: 'rgba(17,41,107,.35)',
      }}>
        [Placeholder — da completare tramite il pannello admin]
      </p>
    </div>
  )
}

function BioSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[100, 85, 92, 78, 88, 60].map((w, i) => (
        <div key={i} style={{
          height: i === 0 ? 24 : 18,
          width: `${w}%`,
          borderRadius: 4,
          background: 'rgba(17,41,107,.07)',
        }} />
      ))}
    </div>
  )
}

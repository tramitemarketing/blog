'use client'
import { useState } from 'react'

export default function BrevoWidget() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (res.ok) {
        setStatus('done')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      className="brevo-widget"
      style={{
        background: '#ededed',
      }}
    >
      {/* Colonna sinistra — testo */}
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(52px, 6vw, 80px)',
            lineHeight: .95,
            color: '#11296b',
            letterSpacing: '-.03em',
            margin: 0,
          }}
        >
          Una riflessione,{' '}
          <em
            style={{
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#00509d',
            }}
          >
            quando viene il momento
          </em>
          , nella tua casella.
        </h2>

        <p
          style={{
            marginTop: 24,
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 22,
            lineHeight: 1.45,
            color: 'rgba(17,41,107,.7)',
            maxWidth: 520,
          }}
        >
          Niente algoritmi, niente notifiche. Solo un articolo scritto a sentimento,
          senza cadenza fissa: perché certi pensieri non seguono il calendario.
        </p>
      </div>

      {/* Colonna destra — form Brevo */}
      <div
        style={{
          background: '#fff',
          padding: 36,
          border: '1px solid rgba(17,41,107,.1)',
          boxShadow: '8px 8px 0 #ffcb05',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#11296b',
            marginBottom: 16,
          }}
        >
          Iscriviti alla newsletter
        </p>

        {status === 'done' ? (
          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 22,
            color: '#11296b',
            lineHeight: 1.4,
          }}>
            Grazie. Ti scriverò quando avrò qualcosa da dire.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{
              borderBottom: '2px solid #11296b',
              padding: '8px 2px',
              marginBottom: 18,
              display: 'flex',
              alignItems: 'center',
            }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="il-tuo-nome@esempio.it"
                required
                style={{
                  border: 0,
                  outline: 0,
                  background: 'transparent',
                  flex: 1,
                  fontFamily: 'var(--font-display)',
                  fontSize: 24,
                  fontWeight: 400,
                  color: '#11296b',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                letterSpacing: 3,
                textTransform: 'uppercase',
                fontWeight: 700,
                color: '#0a1a47',
                background: '#ffdb57',
                padding: '14px 28px',
                border: 'none',
                cursor: status === 'sending' ? 'wait' : 'pointer',
                opacity: status === 'sending' ? 0.7 : 1,
                width: '100%',
              }}
            >
              {status === 'sending' ? 'Iscrizione…' : 'Iscriviti →'}
            </button>

            {status === 'error' && (
              <p style={{
                marginTop: 12,
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                color: '#c0392b',
              }}>
                Qualcosa è andato storto. Riprova.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}

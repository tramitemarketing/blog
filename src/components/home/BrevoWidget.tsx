export default function BrevoWidget() {
  return (
    <section
      style={{
        background: '#ededed',
        padding: '96px 56px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 72,
        alignItems: 'center',
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

        {/*
          BREVO EMBED: incolla qui il codice embed dal tuo account Brevo.
          Brevo → Contatti → Form → Crea form → Ottieni codice embed
          Sostituisci il div placeholder con il tag <script> o <iframe> di Brevo.
        */}
        <div
          style={{
            borderBottom: '2px solid #11296b',
            padding: '8px 2px',
            marginBottom: 18,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <input
            type="email"
            placeholder="il-tuo-nome@esempio.it"
            disabled
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

        <div
          style={{
            background: 'rgba(17,41,107,.05)',
            border: '1px dashed rgba(17,41,107,.2)',
            padding: '18px 24px',
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: 'rgba(17,41,107,.4)',
            textAlign: 'center',
          }}
        >
          [Widget Brevo — incolla qui il codice embed]
        </div>
      </div>
    </section>
  )
}

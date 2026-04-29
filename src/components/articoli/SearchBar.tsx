interface SearchBarProps {
  value: string
  onChange: (val: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ position: 'relative', marginBottom: 48 }}>
      <input
        type="text"
        placeholder="Cerca tra gli articoli…"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Cerca articoli"
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: '2px solid rgba(17,41,107,.2)',
          padding: '10px 40px 10px 0',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 22,
          fontWeight: 300,
          color: '#11296b',
          outline: 'none',
          transition: 'border-color 0.2s ease',
          boxSizing: 'border-box',
        }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = '#11296b')}
        onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(17,41,107,.2)')}
      />
      {/* Icona search */}
      <svg
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'rgba(17,41,107,.35)',
        }}
        width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
      >
        <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Cancella ricerca"
          style={{
            position: 'absolute',
            right: 28,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            color: 'rgba(17,41,107,.4)',
            padding: '0 4px',
          }}
        >
          ✕
        </button>
      )}
    </div>
  )
}

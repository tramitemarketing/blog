interface SearchBarProps {
  value: string
  onChange: (val: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mb-12">
      <input
        type="text"
        placeholder="Cerca tra gli articoli…"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-ghiaccio/20 py-3 pr-10 font-serif text-ghiaccio placeholder-ghiaccio/30 focus:outline-none focus:border-blu-accento transition-colors text-lg"
        aria-label="Cerca articoli"
      />
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 text-ghiaccio/30"
        width="18" height="18" viewBox="0 0 18 18" fill="none"
        aria-hidden="true"
      >
        <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

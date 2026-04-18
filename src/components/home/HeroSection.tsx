import Link from 'next/link'
import type { Article, Citazione } from '@/types'

interface HeroSectionProps {
  featuredArticle: Article | null
  citazione: Citazione | null
}

export default function HeroSection({ featuredArticle, citazione }: HeroSectionProps) {
  return (
    <section className="relative border-b border-blu-accento/10">
      {/* Linea verticale azzurra — firma visiva */}
      <div
        className="absolute left-7 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #38BDF8 0%, rgba(56,189,248,0) 100%)' }}
      />

      <div
        className="grid pl-14 pr-8 py-10"
        style={{ gridTemplateColumns: '3fr 2fr', gap: '24px' }}
      >
        {/* Colonna sinistra — titolo manifesto */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-[5px] text-blu-accento/40 mb-4">
              Riflessioni di un sacerdote
            </p>

            {/* Titolo 3 livelli */}
            <div
              className="font-sans font-black leading-none"
              style={{ letterSpacing: '-3px' }}
            >
              <span
                className="block text-ghiaccio"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 3.5rem)' }}
              >
                PENSIERI
              </span>
              <span
                className="block"
                style={{
                  fontSize: 'clamp(2.8rem, 6vw, 3.5rem)',
                  WebkitTextStroke: '1px rgba(56,189,248,.35)',
                  color: 'transparent',
                }}
              >
                ALLA
              </span>
              <span
                className="block font-serif font-light italic text-ghiaccio/30"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                  letterSpacing: '-1px',
                }}
              >
                soglia del tempo
              </span>
            </div>
          </div>

          {/* Articolo in evidenza — link sotto il titolo */}
          {featuredArticle && (
            <div className="flex flex-col gap-2 max-w-sm">
              <p className="font-sans text-[7px] uppercase tracking-[3px] text-blu-accento/50">
                ↗ In evidenza
              </p>
              <p className="font-sans font-bold text-ghiaccio text-sm leading-snug">
                {featuredArticle.title}
              </p>
              <Link
                href={`/articoli/${featuredArticle.id}`}
                className="font-sans text-[9px] uppercase tracking-[3px] text-blu-accento hover:opacity-70 transition-opacity w-fit"
              >
                Leggi →
              </Link>
            </div>
          )}
        </div>

        {/* Colonna destra — citazione */}
        <div
          className="flex flex-col justify-center gap-3 pl-6"
          style={{ borderLeft: '2px solid rgba(56,189,248,.2)' }}
        >
          {citazione ? (
            <>
              <blockquote
                className="font-serif italic text-ghiaccio/60 leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
              >
                &ldquo;{citazione.text}&rdquo;
              </blockquote>
              <p className="font-sans text-[8px] uppercase tracking-[3px] text-blu-accento/40">
                {citazione.reference}
              </p>
            </>
          ) : (
            <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/20 italic">
              Nessuna citazione.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

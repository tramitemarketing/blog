import Link from 'next/link'
import type { Article } from '@/types'

interface LatestArticlesProps {
  articles: Article[]
  searchQuery?: string
}

export default function LatestArticles({ articles, searchQuery }: LatestArticlesProps) {
  if (articles.length === 0) {
    return (
      <section className="px-14 py-12">
        <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/20">
          {searchQuery ? 'Nessun articolo trovato.' : 'Nessun articolo pubblicato.'}
        </p>
      </section>
    )
  }

  const [featured, ...rest] = articles

  return (
    <section className="border-b border-blu-accento/08">
      {searchQuery && (
        <p className="px-14 pt-6 font-sans text-[8px] uppercase tracking-[4px] text-blu-accento/40">
          Risultati per &ldquo;{searchQuery}&rdquo;
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gridTemplateRows: 'auto auto',
        }}
      >
        {/* Card featured — span 2 righe */}
        <ArticleCardFeatured article={featured} />

        {/* Card compatte — fino a 4 slot */}
        {[0, 1, 2, 3].map(slot => {
          const article = rest[slot]
          if (!article) {
            return <div key={`empty-${slot}`} className="border-l border-t border-blu-accento/06" />
          }
          return <ArticleCardSmall key={article.id} article={article} index={slot + 2} />
        })}

        {/* Ultima cella: link archivio */}
        <div
          className="border-l border-t border-blu-accento/06 flex items-end p-5"
          style={{ background: 'rgba(56,189,248,.02)' }}
        >
          <div>
            <p className="font-sans text-[7px] uppercase tracking-[3px] text-blu-accento/40 mb-2">
              Tutti gli articoli
            </p>
            <Link
              href="/articoli"
              className="font-sans text-[11px] font-bold text-blu-accento hover:opacity-70 transition-opacity"
            >
              → Archivio completo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArticleCardFeatured({ article }: { article: Article }) {
  const readingTime = Math.max(1, Math.ceil(article.wordCount / 200))

  return (
    <div
      className="relative p-8 border-r border-t border-blu-accento/08 flex flex-col justify-between"
      style={{
        gridRow: 'span 2',
        background: 'rgba(56,189,248,.04)',
        borderColor: 'rgba(56,189,248,.1)',
        minHeight: 280,
      }}
    >
      {/* Numero watermark */}
      <span
        className="absolute pointer-events-none select-none font-black"
        style={{
          right: -8,
          bottom: -10,
          fontSize: 100,
          letterSpacing: -6,
          lineHeight: 1,
          color: 'rgba(56,189,248,.04)',
        }}
      >
        01
      </span>

      <div>
        <p className="font-sans text-[7px] uppercase tracking-[4px] text-blu-accento/60 mb-4">
          ↗ In evidenza
        </p>
        <h2
          className="font-sans font-black text-ghiaccio leading-tight mb-4"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '-0.5px' }}
        >
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="font-serif text-ghiaccio/50 text-sm leading-relaxed mb-6">
            {article.excerpt}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Link
          href={`/articoli/${article.id}`}
          className="font-sans text-[9px] uppercase tracking-[3px] text-blu-accento hover:opacity-70 transition-opacity"
        >
          Leggi l&apos;articolo →
        </Link>
        <span className="font-sans text-[8px] uppercase tracking-[2px] text-ghiaccio/20">
          {readingTime} min
        </span>
      </div>
    </div>
  )
}

function ArticleCardSmall({ article, index }: { article: Article; index: number }) {
  return (
    <div className="relative p-5 border-l border-t border-blu-accento/06 flex flex-col justify-between overflow-hidden">
      {/* Numero watermark */}
      <span
        className="absolute pointer-events-none select-none font-black"
        style={{
          right: -4,
          bottom: -8,
          fontSize: 56,
          letterSpacing: -3,
          lineHeight: 1,
          color: 'rgba(56,189,248,.04)',
        }}
      >
        {String(index).padStart(2, '0')}
      </span>

      <div>
        <p className="font-sans text-[7px] uppercase tracking-[3px] text-blu-accento/40 mb-2">
          {article.publishedAt.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </p>
        <h3 className="font-sans font-bold text-ghiaccio text-sm leading-snug mb-2">
          {article.title}
        </h3>
      </div>

      <Link
        href={`/articoli/${article.id}`}
        className="font-sans text-[8px] uppercase tracking-[2px] text-blu-accento/60 hover:text-blu-accento transition-colors"
      >
        Leggi →
      </Link>
    </div>
  )
}

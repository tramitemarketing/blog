import { getReadingTime } from '@/lib/utils'
import type { Article } from '@/types'

interface ArticleCardProps {
  article: Article
  index: number
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const readingTime = getReadingTime(article.wordCount)

  return (
    <article
      style={{
        display: 'grid',
        gridTemplateColumns: '4rem 1fr',
        gap: 24,
        padding: '36px 0',
        borderBottom: '1px solid rgba(17,41,107,.1)',
      }}
    >
      {/* Numero */}
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 40,
          lineHeight: 1,
          color: 'rgba(17,41,107,.18)',
          letterSpacing: '-.03em',
          userSelect: 'none',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Contenuto */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'rgba(17,41,107,.45)',
          }}>
            {article.publishedAt.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
          <span style={{ color: 'rgba(17,41,107,.2)', fontSize: 10 }}>·</span>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'rgba(17,41,107,.35)',
          }}>
            {readingTime} min
          </p>
        </div>

        {/* Titolo */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          lineHeight: 1.05,
          letterSpacing: '-.01em',
          color: '#11296b',
          margin: 0,
        }}>
          {article.title}
        </h2>

        {/* Excerpt */}
        {article.excerpt && (
          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 17,
            lineHeight: 1.5,
            color: 'rgba(17,41,107,.6)',
          }}>
            {article.excerpt}
          </p>
        )}

        {/* Link */}
        <a
          href={`/articoli/${article.id}/`}
          style={{
            marginTop: 4,
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#11296b',
            textDecoration: 'none',
            borderBottom: '2px solid #ffcb05',
            paddingBottom: 3,
            width: 'fit-content',
          }}
        >
          Leggi →
        </a>
      </div>
    </article>
  )
}

import Link from 'next/link'
import { getReadingTime } from '@/lib/utils'
import type { Article } from '@/types'

interface LatestArticlesProps {
  articles: Article[]
  loading?: boolean
}

export default function LatestArticles({ articles, loading }: LatestArticlesProps) {
  return (
    <section style={{ background: '#fbfbf7' }}>
      {/* Section header */}
      <header
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 32,
          alignItems: 'end',
          padding: '64px 56px 32px',
          borderBottom: '1px solid rgba(17,41,107,.1)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 96,
            lineHeight: .8,
            color: '#11296b',
            letterSpacing: '-.04em',
          }}
        >
          <small
            style={{
              display: 'block',
              fontSize: 14,
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: 2,
              color: 'rgba(17,41,107,.4)',
              marginBottom: 6,
            }}
          >
            — Sezione 01
          </small>
          02
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 48,
            lineHeight: 1,
            color: '#11296b',
            borderBottom: '1px solid rgba(17,41,107,.15)',
            paddingBottom: 14,
            margin: 0,
          }}
        >
          Riflessioni recenti
        </h2>

        <Link
          href="/articoli"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#11296b',
            textDecoration: 'none',
            borderBottom: '2px solid #ffcb05',
            paddingBottom: 6,
            alignSelf: 'end',
          }}
        >
          Archivio completo →
        </Link>
      </header>

      {/* Grid articoli */}
      {loading ? (
        <ArticlesSkeleton />
      ) : articles.length === 0 ? (
        <p
          style={{
            padding: '48px 56px',
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'rgba(17,41,107,.3)',
          }}
        >
          Nessun articolo pubblicato.
        </p>
      ) : (
        <ArticlesGrid articles={articles} />
      )}
    </section>
  )
}

function ArticlesGrid({ articles }: { articles: Article[] }) {
  const [featured, ...rest] = articles

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr 1fr',
        borderTop: '1px solid rgba(17,41,107,.1)',
      }}
    >
      {/* Card featured — span 2 righe */}
      <FeaturedCard article={featured} />

      {/* Card compatte — slot 0-3 */}
      {[0, 1, 2, 3].map(slot => {
        const article = rest[slot]
        if (!article) {
          return (
            <div
              key={`empty-${slot}`}
              style={{
                borderLeft: '1px solid rgba(17,41,107,.1)',
                borderTop: slot >= 2 ? '1px solid rgba(17,41,107,.1)' : undefined,
              }}
            />
          )
        }
        return (
          <SmallCard
            key={article.id}
            article={article}
            index={slot + 2}
            isSecondRow={slot >= 2}
          />
        )
      })}
    </div>
  )
}

function FeaturedCard({ article }: { article: Article }) {
  const readingTime = getReadingTime(article.wordCount)

  return (
    <div
      style={{
        gridRow: 'span 2',
        background: '#11296b',
        color: '#fff',
        padding: 36,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 380,
      }}
    >
      {/* Accent bar */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 6,
          height: 64,
          background: '#ffcb05',
        }}
      />

      {/* Numero watermark */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 28,
          top: 28,
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 64,
          color: 'rgba(255,219,87,.25)',
          letterSpacing: -1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        01
      </span>

      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#ffdb57',
            marginBottom: 18,
            fontFamily: 'var(--font-sans)',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '3px 10px',
              background: '#ffdb57',
              color: '#11296b',
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            In evidenza
          </span>
          <span>
            {article.publishedAt.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 3.5vw, 54px)',
            lineHeight: 1.05,
            letterSpacing: '-.01em',
            color: '#fff',
            marginBottom: 14,
            margin: '0 0 14px',
          }}
        >
          {article.title}
        </h2>

        {article.excerpt && (
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 19,
              lineHeight: 1.5,
              color: 'rgba(255,255,255,.75)',
              marginTop: 14,
            }}
          >
            {article.excerpt}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24 }}>
        <a
          href={`/articoli/${article.id}/`}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#ffdb57',
            textDecoration: 'none',
            borderBottom: '2px solid #ffdb57',
            paddingBottom: 4,
          }}
        >
          Leggi l&rsquo;articolo →
        </a>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 9,
            letterSpacing: 2,
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'rgba(255,219,87,.5)',
          }}
        >
          {readingTime} min
        </span>
      </div>
    </div>
  )
}

function SmallCard({ article, index, isSecondRow }: { article: Article; index: number; isSecondRow: boolean }) {
  const readingTime = getReadingTime(article.wordCount)

  return (
    <div
      style={{
        padding: '36px 32px',
        borderLeft: '1px solid rgba(17,41,107,.1)',
        borderTop: isSecondRow ? '1px solid rgba(17,41,107,.1)' : undefined,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 190,
        background: '#fbfbf7',
      }}
    >
      {/* Numero watermark */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 18,
          top: 24,
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 32,
          color: 'rgba(17,41,107,.18)',
          letterSpacing: -1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {String(index).padStart(2, '0')}
      </span>

      <div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'rgba(17,41,107,.55)',
            marginBottom: 18,
          }}
        >
          {article.publishedAt.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
        </p>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 28,
            lineHeight: 1.05,
            letterSpacing: '-.01em',
            color: '#11296b',
            marginBottom: 14,
          }}
        >
          {article.title}
        </h3>

        {article.excerpt && (
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.5,
              color: 'rgba(17,41,107,.65)',
            }}
          >
            {article.excerpt}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24 }}>
        <a
          href={`/articoli/${article.id}/`}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#11296b',
            textDecoration: 'none',
            borderBottom: '2px solid #ffcb05',
            paddingBottom: 4,
          }}
        >
          Leggi →
        </a>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 9,
            letterSpacing: 2,
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'rgba(17,41,107,.4)',
          }}
        >
          {readingTime} min
        </span>
      </div>
    </div>
  )
}

function ArticlesSkeleton() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr 1fr',
        borderTop: '1px solid rgba(17,41,107,.1)',
      }}
    >
      {/* Featured skeleton */}
      <div
        style={{
          gridRow: 'span 2',
          background: 'rgba(17,41,107,.04)',
          padding: 36,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          minHeight: 380,
        }}
      >
        <div style={{ height: 8, width: 80, borderRadius: 4, background: 'rgba(17,41,107,.1)' }} />
        <div style={{ height: 40, width: '80%', borderRadius: 4, background: 'rgba(17,41,107,.08)' }} />
        <div style={{ height: 16, borderRadius: 4, background: 'rgba(17,41,107,.06)' }} />
        <div style={{ height: 16, width: '90%', borderRadius: 4, background: 'rgba(17,41,107,.06)' }} />
      </div>

      {[0, 1, 2, 3].map(i => (
        <div
          key={i}
          style={{
            padding: '36px 32px',
            borderLeft: '1px solid rgba(17,41,107,.1)',
            borderTop: i >= 2 ? '1px solid rgba(17,41,107,.1)' : undefined,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ height: 8, width: 64, borderRadius: 4, background: 'rgba(17,41,107,.1)' }} />
          <div style={{ height: 24, width: '85%', borderRadius: 4, background: 'rgba(17,41,107,.08)' }} />
          <div style={{ height: 8, width: 48, borderRadius: 4, background: 'rgba(17,41,107,.06)', marginTop: 'auto' }} />
        </div>
      ))}
    </div>
  )
}

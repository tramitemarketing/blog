'use client'
import { useState, useEffect, useMemo } from 'react'
import ArticleCard from '@/components/articoli/ArticleCard'
import SearchBar from '@/components/articoli/SearchBar'
import { getPublishedArticles } from '@/lib/firestore'
import type { Article } from '@/types'

export default function ArticoliPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPublishedArticles()
      .then(setArticles)
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return articles
    const q = query.toLowerCase()
    return articles.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q)
    )
  }, [articles, query])

  return (
    <>
      {/* Header sezione — stile A1-audace */}
      <header
        style={{
          background: '#11296b',
          padding: 'clamp(48px, 8vw, 80px) clamp(22px, 5vw, 56px) clamp(40px, 6vw, 64px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Cerchi decorativi */}
        <div aria-hidden="true" style={{
          position: 'absolute', right: -120, top: '50%', transform: 'translateY(-50%)',
          width: 500, height: 500, borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          background: `radial-gradient(circle,
            transparent 0 60px,
            rgba(255,219,87,.1) 60px 62px, transparent 62px 120px,
            rgba(255,219,87,.07) 120px 122px, transparent 122px 190px,
            rgba(255,219,87,.04) 190px 192px, transparent 192px)`,
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
            — Archivio
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
            Articoli
          </h1>
        </div>
      </header>

      {/* Corpo pagina */}
      <div style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 64px) clamp(22px, 5vw, 56px)',
      }}>
        <SearchBar value={query} onChange={setQuery} />

        {loading ? (
          <ArticlesSkeleton />
        ) : filtered.length === 0 ? (
          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 20,
            color: 'rgba(17,41,107,.4)',
          }}>
            Nessun articolo trovato.
          </p>
        ) : (
          <div>
            {filtered.map((article, idx) => (
              <ArticleCard key={article.id} article={article} index={idx} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function ArticlesSkeleton() {
  return (
    <div>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '4rem 1fr', gap: 24,
          padding: '36px 0', borderBottom: '1px solid rgba(17,41,107,.1)',
        }}>
          <div style={{ height: 40, width: 48, borderRadius: 4, background: 'rgba(17,41,107,.08)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ height: 8, width: 120, borderRadius: 4, background: 'rgba(17,41,107,.08)' }} />
            <div style={{ height: 20, width: '70%', borderRadius: 4, background: 'rgba(17,41,107,.1)' }} />
            <div style={{ height: 14, borderRadius: 4, background: 'rgba(17,41,107,.06)' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

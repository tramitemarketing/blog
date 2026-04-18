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
    <div className="max-w-4xl mx-auto px-6 py-20">
      <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/30 mb-4">
        Archivio
      </p>
      <h1
        className="font-sans font-black text-ghiaccio uppercase mb-12"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-2px' }}
      >
        Articoli
      </h1>

      <SearchBar value={query} onChange={setQuery} />

      {loading ? (
        <p className="font-sans text-[11px] uppercase tracking-[4px] text-ghiaccio/30 animate-pulse">
          Caricamento…
        </p>
      ) : filtered.length === 0 ? (
        <p className="font-serif text-ghiaccio/40 italic">Nessun articolo trovato.</p>
      ) : (
        <div>
          {filtered.map((article, idx) => (
            <ArticleCard key={article.id} article={article} index={idx} />
          ))}
        </div>
      )}
    </div>
  )
}

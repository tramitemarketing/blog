'use client'
import { useState, useEffect } from 'react'
import HeroSection from '@/components/home/HeroSection'
import LatestArticles from '@/components/home/LatestArticles'
import BioTeaser from '@/components/home/BioTeaser'
import BrevoWidget from '@/components/home/BrevoWidget'
import { getPublishedArticles, getCitazione } from '@/lib/firestore'
import type { Article, Citazione } from '@/types'
import ArticleCarousel from '@/components/home/ArticleCarousel'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [citazione, setCitazione] = useState<Citazione | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const isMobile = useIsMobile()

  useEffect(() => {
    Promise.all([getPublishedArticles(), getCitazione()])
      .then(([arts, cit]) => {
        setArticles(arts)
        setCitazione(cit)
      })
      .finally(() => setLoading(false))
  }, [])

  const pool = articles.slice(0, 5)
  const filtered = searchQuery.trim()
    ? pool.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pool

  return (
    <>
      <HeroSection featuredArticle={articles[0] ?? null} citazione={citazione} />

      {isMobile ? (
        <ArticleCarousel articles={articles} loading={loading} />
      ) : (
        <>
          {/* Search Band */}
          <div
            className="flex items-center gap-3 px-14 py-3 border-b border-blu-accento/10"
            style={{ background: 'rgba(56,189,248,.03)' }}
          >
            <svg
              width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round"
              aria-hidden="true"
              style={{ flexShrink: 0, opacity: 0.5 }}
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            <input
              type="text"
              placeholder="Cerca tra gli articoli…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Cerca articoli"
              className="flex-1 bg-transparent font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio placeholder-ghiaccio/25 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="font-sans text-[9px] uppercase tracking-[2px] text-blu-accento/50 hover:text-blu-accento transition-colors"
                aria-label="Cancella ricerca"
              >
                ✕
              </button>
            )}
            <span
              className="font-sans text-[8px] tracking-[1px] text-ghiaccio/20"
              style={{
                background: 'rgba(56,189,248,.08)',
                border: '1px solid rgba(56,189,248,.18)',
                borderRadius: 4,
                padding: '2px 7px',
              }}
            >
              ⌘K
            </span>
          </div>

          <LatestArticles articles={filtered} searchQuery={searchQuery} loading={loading} />
        </>
      )}
      <BioTeaser />
      <BrevoWidget />
    </>
  )
}

'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { getReadingTime } from '@/lib/utils'
import type { Article } from '@/types'

interface ArticleCarouselProps {
  articles: Article[]
  loading?: boolean
}

export default function ArticleCarousel({ articles, loading }: ArticleCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const displayArticles = articles.slice(0, 6)

  function getCardWidth(): number {
    return window.innerWidth * 0.85 + 12
  }

  function startAutoRotate() {
    intervalRef.current = setInterval(() => {
      const el = containerRef.current
      if (!el || displayArticles.length === 0) return
      const cardWidth = getCardWidth()
      const currentIndex = Math.round(el.scrollLeft / cardWidth)
      const next = currentIndex + 1 >= displayArticles.length ? 0 : currentIndex + 1
      el.scrollTo({ left: next * cardWidth, behavior: 'smooth' })
    }, 3500)
  }

  function stopAutoRotate() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  function handleTouch() {
    stopAutoRotate()
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    pauseTimeoutRef.current = setTimeout(startAutoRotate, 20000)
  }

  useEffect(() => {
    if (loading || displayArticles.length === 0) return
    startAutoRotate()
    return () => {
      stopAutoRotate()
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    }
  }, [loading, displayArticles.length])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleScroll = () => {
      const cardWidth = getCardWidth()
      const index = Math.round(el.scrollLeft / cardWidth)
      setActiveIndex(Math.min(index, displayArticles.length - 1))
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [displayArticles.length])

  if (loading) {
    return (
      <section style={{ padding: '24px 0 40px' }}>
        <div style={{ display: 'flex', gap: 12, padding: '0 20px', overflow: 'hidden' }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              flexShrink: 0,
              width: '85vw',
              height: 280,
              borderRadius: 16,
              background: 'rgba(56,189,248,.04)',
              border: '1px solid rgba(56,189,248,.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              padding: 24,
            }}>
              <div style={{ height: 8, width: 60, borderRadius: 4, background: 'rgba(56,189,248,.1)' }} />
              <div style={{ height: 20, width: '75%', borderRadius: 4, background: 'rgba(240,249,255,.08)' }} />
              <div style={{ height: 14, width: '100%', borderRadius: 4, background: 'rgba(240,249,255,.05)' }} />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section style={{ padding: '24px 0 40px' }}>
      <div
        ref={containerRef}
        onTouchStart={handleTouch}
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          padding: '0 20px',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        {displayArticles.map((article, i) => (
          <CarouselCard key={article.id} article={article} index={i} />
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
        {displayArticles.map((_, i) => (
          <div key={i} style={{
            height: 3,
            width: activeIndex === i ? 18 : 5,
            borderRadius: 3,
            background: activeIndex === i ? 'rgba(56,189,248,.8)' : 'rgba(255,255,255,.2)',
            transition: 'width 0.22s ease, background 0.22s ease',
          }} />
        ))}
      </div>
    </section>
  )
}

function CarouselCard({ article, index }: { article: Article; index: number }) {
  const readingTime = getReadingTime(article.wordCount)
  const excerpt = article.excerpt
    ? article.excerpt.slice(0, 100) + (article.excerpt.length > 100 ? '…' : '')
    : ''

  return (
    <div style={{
      flexShrink: 0,
      width: '85vw',
      scrollSnapAlign: 'start',
      height: 280,
      borderRadius: 16,
      background: index === 0 ? 'rgba(56,189,248,.06)' : 'rgba(255,255,255,.04)',
      border: '1px solid rgba(56,189,248,.15)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Watermark */}
      <span style={{
        position: 'absolute',
        right: -6,
        bottom: -10,
        fontFamily: 'system-ui, sans-serif',
        fontWeight: 900,
        fontSize: 80,
        letterSpacing: -4,
        lineHeight: 1,
        color: 'rgba(56,189,248,.05)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <div>
        <p style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: 8,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          color: 'rgba(56,189,248,.6)',
          marginBottom: 12,
        }}>
          {index === 0
            ? '↗ In evidenza'
            : article.publishedAt.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
        </p>
        <h2 style={{
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: '-0.4px',
          color: '#F0F9FF',
          lineHeight: 1.3,
          marginBottom: 10,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        } as React.CSSProperties}>
          {article.title}
        </h2>
        {excerpt && (
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: 13,
            color: 'rgba(240,249,255,.45)',
            lineHeight: 1.55,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          } as React.CSSProperties}>
            {excerpt}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a
          href={`/articoli/${article.id}/`}
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: 9,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: '#38BDF8',
            textDecoration: 'none',
          }}
        >
          Leggi →
        </a>
        <span style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: 8,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: 'rgba(240,249,255,.2)',
        }}>
          {readingTime} min
        </span>
      </div>
    </div>
  )
}

'use client'
import { useRef, useEffect, useState } from 'react'
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
      <section style={{ padding: '32px 0 48px', background: '#fbfbf7' }}>
        {/* Section label skeleton */}
        <div style={{ padding: '0 22px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ height: 24, width: 140, borderRadius: 4, background: 'rgba(17,41,107,.08)' }} />
          <div style={{ height: 10, width: 60, borderRadius: 4, background: 'rgba(17,41,107,.06)' }} />
        </div>
        <div style={{ display: 'flex', gap: 12, padding: '0 22px', overflow: 'hidden' }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              flexShrink: 0, width: '85vw', height: 260,
              background: i === 0 ? 'rgba(17,41,107,.06)' : 'rgba(17,41,107,.03)',
              border: '1px solid rgba(17,41,107,.08)',
              display: 'flex', flexDirection: 'column', gap: 14, padding: 22,
            }}>
              <div style={{ height: 8, width: 60, borderRadius: 4, background: 'rgba(17,41,107,.1)' }} />
              <div style={{ height: 20, width: '75%', borderRadius: 4, background: 'rgba(17,41,107,.08)' }} />
              <div style={{ height: 14, borderRadius: 4, background: 'rgba(17,41,107,.06)' }} />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section style={{ padding: '32px 0 48px', background: '#fbfbf7' }}>
      {/* Section label */}
      <div style={{ padding: '0 22px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: 28,
          color: '#11296b',
          letterSpacing: '-.01em',
          margin: 0,
        }}>
          Riflessioni recenti
        </h2>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 9,
          letterSpacing: 3,
          textTransform: 'uppercase',
          fontWeight: 700,
          color: 'rgba(17,41,107,.4)',
        }}>
          {activeIndex + 1} / {displayArticles.length}
        </span>
      </div>

      {/* Track */}
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
          padding: '0 22px',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        {displayArticles.map((article, i) => (
          <CarouselCard key={article.id} article={article} index={i} />
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 18 }}>
        {displayArticles.map((_, i) => (
          <div key={i} style={{
            height: 3,
            width: activeIndex === i ? 20 : 5,
            borderRadius: 3,
            background: activeIndex === i ? '#11296b' : 'rgba(17,41,107,.18)',
            transition: 'width 0.22s ease, background 0.22s ease',
          }} />
        ))}
      </div>
    </section>
  )
}

function CarouselCard({ article, index }: { article: Article; index: number }) {
  const readingTime = getReadingTime(article.wordCount)
  const isFeatured = index === 0
  const excerpt = article.excerpt
    ? article.excerpt.slice(0, 100) + (article.excerpt.length > 100 ? '…' : '')
    : ''

  return (
    <div style={{
      flexShrink: 0,
      width: '85vw',
      scrollSnapAlign: 'start',
      minHeight: 260,
      background: isFeatured ? '#11296b' : '#fbfbf7',
      border: isFeatured ? 'none' : '1px solid rgba(17,41,107,.12)',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Accent bar su featured */}
      {isFeatured && (
        <span style={{ position: 'absolute', top: 0, left: 0, width: 4, height: 48, background: '#ffcb05' }} />
      )}

      {/* Numero watermark */}
      <span aria-hidden="true" style={{
        position: 'absolute',
        right: -4, bottom: -12,
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontWeight: 500,
        fontSize: 80,
        lineHeight: 1,
        color: isFeatured ? 'rgba(255,219,87,.15)' : 'rgba(17,41,107,.06)',
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '-.04em',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
        }}>
          {isFeatured && (
            <span style={{
              display: 'inline-block',
              padding: '2px 8px',
              background: '#ffdb57',
              color: '#11296b',
              fontFamily: 'var(--font-sans)',
              fontSize: 8,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontWeight: 800,
            }}>
              In evidenza
            </span>
          )}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 8,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: isFeatured ? 'rgba(255,219,87,.8)' : 'rgba(17,41,107,.45)',
          }}>
            {isFeatured
              ? ''
              : article.publishedAt.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 22,
          letterSpacing: '-.01em',
          color: isFeatured ? '#fff' : '#11296b',
          lineHeight: 1.1,
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
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 14,
            color: isFeatured ? 'rgba(255,255,255,.7)' : 'rgba(17,41,107,.6)',
            lineHeight: 1.45,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          } as React.CSSProperties}>
            {excerpt}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16 }}>
        <a
          href={`/articoli/${article.id}/`}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 9,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: isFeatured ? '#ffdb57' : '#11296b',
            textDecoration: 'none',
            borderBottom: isFeatured ? '1px solid #ffdb57' : '1px solid #ffcb05',
            paddingBottom: 2,
            fontWeight: 700,
          }}
        >
          Leggi →
        </a>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 8,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: isFeatured ? 'rgba(255,219,87,.5)' : 'rgba(17,41,107,.35)',
          fontWeight: 600,
        }}>
          {readingTime} min
        </span>
      </div>
    </div>
  )
}

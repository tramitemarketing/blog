'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getPublishedArticles } from '@/lib/firestore'
import { getReadingTime } from '@/lib/utils'
import type { Article } from '@/types'

const SPRING = '0.42s cubic-bezier(0.34, 1.2, 0.64, 1)'

export default function MobileSearchSheet() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [query, setQuery] = useState('')
  const [articles, setArticles] = useState<Article[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    getPublishedArticles().then(setArticles).catch(() => {})
  }, [])

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('soglia:open-search', handler)
    return () => window.removeEventListener('soglia:open-search', handler)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
      setTimeout(() => inputRef.current?.focus(), 80)
    } else {
      setVisible(false)
    }
  }, [open])

  const filtered = query.trim()
    ? articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : articles.slice(0, 8)

  function navigate(id: string) {
    setOpen(false)
    router.push(`/articoli/${id}`)
  }

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: visible ? 'rgba(5,12,24,.7)' : 'rgba(5,12,24,0)',
        transition: 'background 0.3s ease',
        display: 'flex',
        alignItems: 'flex-end',
      }}
      onClick={() => setOpen(false)}
    >
      <div
        style={{
          width: '100%',
          background: 'rgba(255,255,255,.08)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(56,189,248,.22)',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -16px 48px rgba(0,0,0,.4)',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: `transform ${SPRING}`,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 4, background: 'rgba(255,255,255,.2)' }} />
        </div>

        {/* Input row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 18px 14px',
          borderBottom: '1px solid rgba(56,189,248,.1)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round"
            aria-hidden="true" style={{ flexShrink: 0, opacity: 0.6 }}>
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cerca un articolo…"
            aria-label="Cerca articoli"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 16,
              color: '#F0F9FF',
              letterSpacing: '0.3px',
            }}
          />
          <button
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 9,
              letterSpacing: '1px',
              color: 'rgba(240,249,255,.3)',
              background: 'rgba(56,189,248,.08)',
              border: '1px solid rgba(56,189,248,.18)',
              borderRadius: 5,
              padding: '3px 7px',
              cursor: 'pointer',
            }}
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {filtered.map((article, i) => {
            const readingTime = getReadingTime(article.wordCount)
            const excerpt = article.excerpt
              ? article.excerpt.slice(0, 80) + (article.excerpt.length > 80 ? '…' : '')
              : ''
            return (
              <button
                key={article.id}
                onClick={() => navigate(article.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 18px',
                  background: 'transparent',
                  borderBottom: '1px solid rgba(56,189,248,.05)',
                  borderLeft: '2px solid transparent',
                  cursor: 'pointer',
                }}
              >
                <span style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 900,
                  fontSize: 10,
                  color: 'rgba(56,189,248,.25)',
                  letterSpacing: '-0.5px',
                  paddingTop: 3,
                  flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: 13,
                    color: 'rgba(240,249,255,.85)',
                    letterSpacing: '-0.2px',
                    marginBottom: 3,
                  }}>
                    {article.title}
                  </p>
                  {excerpt && (
                    <p style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 11,
                      color: 'rgba(240,249,255,.35)',
                      lineHeight: 1.5,
                    }}>
                      {excerpt}
                    </p>
                  )}
                </div>
                <span style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: 8,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  color: 'rgba(56,189,248,.35)',
                  flexShrink: 0,
                  paddingTop: 4,
                }}>
                  {readingTime} min
                </span>
              </button>
            )
          })}

          {query.trim() && filtered.length === 0 && (
            <div style={{
              padding: '24px 18px',
              fontFamily: 'Georgia, serif',
              fontSize: 12,
              fontStyle: 'italic',
              color: 'rgba(240,249,255,.25)',
            }}>
              Nessun articolo trovato per &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

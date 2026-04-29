'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getPublishedArticles } from '@/lib/firestore'
import { getReadingTime } from '@/lib/utils'
import type { Article } from '@/types'

const EASE = '0.32s cubic-bezier(0.34, 1.2, 0.64, 1)'

export default function SearchOverlay() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [articles, setArticles] = useState<Article[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Prefetch articles on mount (usa cache se già caricati)
  useEffect(() => {
    getPublishedArticles().then(setArticles).catch(() => {})
  }, [])

  // Ascolta evento dalla navbar
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('soglia:open-search', handler)
    return () => window.removeEventListener('soglia:open-search', handler)
  }, [])

  // ⌘K / Ctrl+K e ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(v => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Focus input all'apertura
  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 40)
    }
  }, [open])

  const filtered = query.trim()
    ? articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : articles.slice(0, 6)

  // Navigazione con frecce
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[activeIndex]) {
      navigate(filtered[activeIndex].id)
    }
  }

  const navigate = (id: string) => {
    setOpen(false)
    window.location.href = `/articoli/${id}/`
  }

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(245,240,230,.18)',
        backdropFilter: 'blur(32px) saturate(120%)',
        WebkitBackdropFilter: 'blur(32px) saturate(120%)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '14vh',
      }}
      onClick={() => setOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 580,
          margin: '0 16px',
          background: 'rgba(253,250,243,.96)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(17,41,107,.12)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,.35), 6px 6px 0 #ffcb05',
          transition: `box-shadow ${EASE}`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Riga input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 18px',
          borderBottom: filtered.length > 0 ? '1px solid rgba(17,41,107,.1)' : 'none',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#11296b" strokeWidth="2.2" strokeLinecap="round"
            aria-hidden="true" style={{ flexShrink: 0, opacity: 0.5 }}>
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIndex(0) }}
            onKeyDown={handleKeyDown}
            placeholder="Cerca un articolo…"
            aria-label="Cerca articoli"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 15,
              color: '#11296b',
              letterSpacing: '0.3px',
            }}
          />

          <kbd
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 9,
              letterSpacing: '1px',
              color: 'rgba(17,41,107,.4)',
              background: 'rgba(17,41,107,.06)',
              border: '1px solid rgba(17,41,107,.18)',
              borderRadius: 5,
              padding: '3px 7px',
              cursor: 'pointer',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Risultati */}
        {filtered.length > 0 && (
          <div style={{ maxHeight: 380, overflowY: 'auto' }}>
            {filtered.map((article, i) => {
              const isActive = i === activeIndex
              const readingTime = getReadingTime(article.wordCount)
              const excerptWords = article.excerpt
                ? article.excerpt.slice(0, 90) + (article.excerpt.length > 90 ? '…' : '')
                : ''

              return (
                <button
                  key={article.id}
                  onClick={() => navigate(article.id)}
                  onMouseEnter={() => setActiveIndex(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 18px',
                    background: isActive ? 'rgba(255,203,5,.12)' : 'transparent',
                    borderBottom: '1px solid rgba(17,41,107,.06)',
                    borderLeft: isActive ? '2px solid #ffcb05' : '2px solid transparent',
                    transition: 'background 0.14s ease, border-color 0.14s ease',
                    cursor: 'pointer',
                  }}
                >
                  {/* Numero watermark */}
                  <span style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontWeight: 900,
                    fontSize: 10,
                    color: 'rgba(17,41,107,.22)',
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
                      color: isActive ? '#0a1a47' : 'rgba(17,41,107,.8)',
                      letterSpacing: '-0.2px',
                      marginBottom: 3,
                      transition: 'color 0.14s ease',
                    }}>
                      {article.title}
                    </p>
                    {excerptWords && (
                      <p style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: 11,
                        color: 'rgba(17,41,107,.45)',
                        lineHeight: 1.5,
                      }}>
                        {excerptWords}
                      </p>
                    )}
                  </div>

                  <span style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: 8,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: 'rgba(17,41,107,.35)',
                    flexShrink: 0,
                    paddingTop: 4,
                  }}>
                    {readingTime} min
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {/* Empty state con query */}
        {query.trim() && filtered.length === 0 && (
          <div style={{
            padding: '24px 18px',
            fontFamily: 'Georgia, serif',
            fontSize: 12,
            fontStyle: 'italic',
            color: 'rgba(17,41,107,.35)',
          }}>
            Nessun articolo trovato per &ldquo;{query}&rdquo;
          </div>
        )}

        {/* Footer hint */}
        <div style={{
          display: 'flex',
          gap: 16,
          padding: '8px 18px',
          borderTop: '1px solid rgba(17,41,107,.08)',
        }}>
          {[['↑↓', 'naviga'], ['↵', 'apri'], ['esc', 'chiudi']].map(([key, label]) => (
            <span key={key} style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 8,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'rgba(17,41,107,.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}>
              <kbd style={{
                background: 'rgba(17,41,107,.05)',
                border: '1px solid rgba(17,41,107,.14)',
                borderRadius: 3,
                padding: '1px 5px',
                fontSize: 8,
              }}>
                {key}
              </kbd>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

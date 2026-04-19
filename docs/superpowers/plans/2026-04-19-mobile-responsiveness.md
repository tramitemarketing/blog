# Mobile Responsiveness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the SOGLIA blog fully functional on phones (< 768px) with a hide-on-scroll bottom navbar, horizontal article carousel with auto-rotate, an iOS-style search bottom sheet, and a sticky article header — all without touching any existing desktop component.

**Architecture:** Separate mobile components mounted via `useIsMobile()` hook. `layout.tsx` stays a Server Component — two thin client wrappers (`NavbarWrapper`, `SearchWrapper`) handle the conditional rendering. Desktop files are untouched.

**Tech Stack:** Next.js App Router (static export), React 19 hooks, Tailwind CSS v4, no new external libraries.

---

## File Map

**Create:**
- `src/hooks/useIsMobile.ts` — shared hook, `window.innerWidth < 768`, updates on resize
- `src/components/layout/MobileNavbar.tsx` — fixed bottom pill, hide-on-scroll, labels under icons, vibrate on search tap
- `src/components/layout/NavbarWrapper.tsx` — `'use client'` wrapper: renders `MobileNavbar` or `Navbar`
- `src/components/layout/MobileSearchSheet.tsx` — bottom sheet, spring animation, same cached fetch as desktop
- `src/components/layout/SearchWrapper.tsx` — `'use client'` wrapper: renders `MobileSearchSheet` or `SearchOverlay`
- `src/components/home/ArticleCarousel.tsx` — scroll-snap carousel, auto-rotate every 3.5s, pause 20s on touch
- `src/components/articoli/MobileArticleHeader.tsx` — sticky top bar, fades in after 120px scroll

**Modify:**
- `src/app/layout.tsx` — swap `<Navbar>` + `<SearchOverlay>` for `<NavbarWrapper>` + `<SearchWrapper>`, add `pb-24 md:pb-0` to `<main>` for bottom nav clearance
- `src/app/page.tsx` — use `useIsMobile()` to mount `ArticleCarousel` or `LatestArticles + search band`
- `src/app/articoli/[slug]/ArticolePageClient.tsx` — add `MobileArticleHeader` when on mobile

---

## Task 1: `useIsMobile` hook

**Files:**
- Create: `src/hooks/useIsMobile.ts`

- [ ] **Step 1: Create the hook**

```ts
'use client'
import { useState, useEffect } from 'react'

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useIsMobile.ts
git commit -m "feat: add useIsMobile hook (< 768px breakpoint)"
```

---

## Task 2: `MobileNavbar`

**Files:**
- Create: `src/components/layout/MobileNavbar.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  {
    label: 'Home',
    href: '/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="9" y="2" width="2" height="16" fill="#F0F9FF" />
        <rect x="4" y="7" width="12" height="2" fill="#F0F9FF" />
      </svg>
    ),
  },
  {
    label: 'Articoli',
    href: '/articoli',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#BAE6FD" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="13" y2="11" />
      </svg>
    ),
  },
  {
    label: 'Cerca',
    action: () => {
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10)
      window.dispatchEvent(new Event('soglia:open-search'))
    },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#7DD3FC" strokeWidth="1.8" strokeLinecap="round"
        aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    label: 'Biografia',
    href: '/biografia',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#E0F2FE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
  },
]

export default function MobileNavbar() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const prevY = lastScrollY.current
      lastScrollY.current = currentY
      if (currentY > prevY && currentY > 80) {
        setHidden(true)
      } else if (currentY < prevY) {
        setHidden(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      aria-label="Navigazione mobile"
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: hidden
          ? 'translateX(-50%) translateY(calc(100% + 28px))'
          : 'translateX(-50%) translateY(0)',
        transition: 'transform 0.3s ease',
        zIndex: 50,
        display: 'inline-flex',
        alignItems: 'center',
        background: 'rgba(200,230,255,.09)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid rgba(255,255,255,.22)',
        borderRadius: 40,
        padding: '10px 20px',
        gap: 8,
        boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,.18), 0 4px 16px rgba(0,0,0,.2)',
      }}
    >
      {ITEMS.map((item) => {
        const isActive = item.href
          ? item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href)
          : false

        const content = (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {item.icon}
            <span style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: isActive ? '#FFFFFF' : 'rgba(240,249,255,.7)',
            }}>
              {item.label}
            </span>
            <div style={{
              width: isActive ? 14 : 3,
              height: 2,
              borderRadius: 2,
              background: 'rgba(255,255,255,.7)',
              opacity: isActive ? 1 : 0,
              transition: 'width 0.22s ease, opacity 0.18s ease',
            }} />
          </div>
        )

        const sharedStyle: React.CSSProperties = {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px 12px',
          borderRadius: 24,
          background: isActive ? 'rgba(255,255,255,.12)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'none',
        }

        if (item.action) {
          return (
            <button key={item.label} style={sharedStyle} onClick={item.action} aria-label={item.label}>
              {content}
            </button>
          )
        }
        return (
          <Link key={item.label} href={item.href!} style={sharedStyle} aria-label={item.label}>
            {content}
          </Link>
        )
      })}
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/MobileNavbar.tsx
git commit -m "feat: add MobileNavbar with hide-on-scroll and vibrate on search"
```

---

## Task 3: `NavbarWrapper`

**Files:**
- Create: `src/components/layout/NavbarWrapper.tsx`

- [ ] **Step 1: Create the wrapper**

```tsx
'use client'
import { useIsMobile } from '@/hooks/useIsMobile'
import Navbar from './Navbar'
import MobileNavbar from './MobileNavbar'

export default function NavbarWrapper() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileNavbar /> : <Navbar />
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/NavbarWrapper.tsx
git commit -m "feat: add NavbarWrapper client wrapper for mobile/desktop nav"
```

---

## Task 4: `MobileSearchSheet`

**Files:**
- Create: `src/components/layout/MobileSearchSheet.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/MobileSearchSheet.tsx
git commit -m "feat: add MobileSearchSheet bottom sheet with spring animation"
```

---

## Task 5: `SearchWrapper`

**Files:**
- Create: `src/components/layout/SearchWrapper.tsx`

- [ ] **Step 1: Create the wrapper**

```tsx
'use client'
import { useIsMobile } from '@/hooks/useIsMobile'
import SearchOverlay from './SearchOverlay'
import MobileSearchSheet from './MobileSearchSheet'

export default function SearchWrapper() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileSearchSheet /> : <SearchOverlay />
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/SearchWrapper.tsx
git commit -m "feat: add SearchWrapper client wrapper for mobile/desktop search"
```

---

## Task 6: Wire up `layout.tsx`

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace Navbar + SearchOverlay imports and usage**

Current `src/app/layout.tsx`:
```tsx
import Navbar from '@/components/layout/Navbar'
import SearchOverlay from '@/components/layout/SearchOverlay'
```

Replace those two imports with:
```tsx
import NavbarWrapper from '@/components/layout/NavbarWrapper'
import SearchWrapper from '@/components/layout/SearchWrapper'
```

Then in the JSX, replace:
```tsx
<Navbar />
<SearchOverlay />
```
with:
```tsx
<NavbarWrapper />
<SearchWrapper />
```

Also update the `<main>` tag to add bottom padding for the mobile fixed navbar:
```tsx
<main className="flex-1 pb-24 md:pb-0">{children}</main>
```

The final `layout.tsx` should look like:
```tsx
import type { Metadata } from 'next'
import './globals.css'
import NavbarWrapper from '@/components/layout/NavbarWrapper'
import Footer from '@/components/layout/Footer'
import SearchWrapper from '@/components/layout/SearchWrapper'
import CookieBanner from '@/components/ui/CookieBanner'
import ConditionalGA from '@/components/ui/ConditionalGA'

export const metadata: Metadata = {
  title: 'SOGLIA — Riflessioni di un sacerdote',
  description:
    'Un blog di riflessioni filosofiche, teologiche ed esistenziali scritto da un sacerdote.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className="bg-blu-notte text-ghiaccio min-h-screen flex flex-col">
        <CookieBanner />
        <ConditionalGA measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''} />
        <NavbarWrapper />
        <SearchWrapper />
        <main className="flex-1 pb-24 md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: wire NavbarWrapper and SearchWrapper into root layout"
```

---

## Task 7: `ArticleCarousel`

**Files:**
- Create: `src/components/home/ArticleCarousel.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
              <div style={{ height: 8, width: 60, borderRadius: 4, background: 'rgba(56,189,248,.1)', animation: 'pulse 1.5s infinite' }} />
              <div style={{ height: 20, width: '75%', borderRadius: 4, background: 'rgba(240,249,255,.08)', animation: 'pulse 1.5s infinite' }} />
              <div style={{ height: 14, width: '100%', borderRadius: 4, background: 'rgba(240,249,255,.05)', animation: 'pulse 1.5s infinite' }} />
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
        <Link
          href={`/articoli/${article.id}`}
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
        </Link>
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/ArticleCarousel.tsx
git commit -m "feat: add ArticleCarousel with scroll-snap and auto-rotate"
```

---

## Task 8: Wire up `page.tsx`

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Import `useIsMobile` and `ArticleCarousel`**

At the top of `src/app/page.tsx`, add:
```tsx
import { useIsMobile } from '@/hooks/useIsMobile'
import ArticleCarousel from '@/components/home/ArticleCarousel'
```

- [ ] **Step 2: Use the hook and conditionally render**

Add `const isMobile = useIsMobile()` after the state declarations.

Then replace the search band + `<LatestArticles>` block:

```tsx
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
```

The complete updated `page.tsx`:
```tsx
'use client'
import { useState, useEffect } from 'react'
import HeroSection from '@/components/home/HeroSection'
import LatestArticles from '@/components/home/LatestArticles'
import ArticleCarousel from '@/components/home/ArticleCarousel'
import BioTeaser from '@/components/home/BioTeaser'
import BrevoWidget from '@/components/home/BrevoWidget'
import { getPublishedArticles, getCitazione } from '@/lib/firestore'
import { useIsMobile } from '@/hooks/useIsMobile'
import type { Article, Citazione } from '@/types'

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
```

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: show ArticleCarousel on mobile, desktop grid unchanged"
```

---

## Task 9: `MobileArticleHeader`

**Files:**
- Create: `src/components/articoli/MobileArticleHeader.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'
import { useState, useEffect } from 'react'

interface MobileArticleHeaderProps {
  title: string
  readingTime: number
}

export default function MobileArticleHeader({ title, readingTime }: MobileArticleHeaderProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 120)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(255,255,255,.07)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(56,189,248,.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <p style={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: 'rgba(240,249,255,.7)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        marginRight: 12,
      }}>
        {title}
      </p>
      <span style={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: 9,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: 'rgba(56,189,248,.5)',
        flexShrink: 0,
      }}>
        {readingTime} min
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/articoli/MobileArticleHeader.tsx
git commit -m "feat: add MobileArticleHeader sticky bar for article pages"
```

---

## Task 10: Wire up `ArticolePageClient.tsx`

**Files:**
- Modify: `src/app/articoli/[slug]/ArticolePageClient.tsx`

- [ ] **Step 1: Add imports**

Add at the top:
```tsx
import { useIsMobile } from '@/hooks/useIsMobile'
import MobileArticleHeader from '@/components/articoli/MobileArticleHeader'
```

- [ ] **Step 2: Use the hook and render the header**

Add `const isMobile = useIsMobile()` inside `ArticolePage()`, after the existing `const readingTime = ...` line.

Then insert `<MobileArticleHeader>` as the first child of the returned JSX, just before the `<div className="max-w-2xl ...">`:

```tsx
  return (
    <>
      {isMobile && (
        <MobileArticleHeader title={article.title} readingTime={readingTime} />
      )}
      <div className="max-w-2xl mx-auto px-6 py-20">
        {/* ... rest unchanged ... */}
      </div>
    </>
  )
```

The complete updated `ArticolePageClient.tsx`:
```tsx
'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ArticleBody from '@/components/article/ArticleBody'
import ShareButton from '@/components/article/ShareButton'
import CommentsSection from '@/components/article/CommentsSection'
import { getArticleBySlug } from '@/lib/firestore'
import { getReadingTime } from '@/lib/utils'
import { useIsMobile } from '@/hooks/useIsMobile'
import MobileArticleHeader from '@/components/articoli/MobileArticleHeader'
import type { Article } from '@/types'

export default function ArticolePage() {
  const params = useParams<{ slug: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!params.slug) return
    getArticleBySlug(params.slug)
      .then(setArticle)
      .finally(() => setLoading(false))
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-sans text-[11px] uppercase tracking-[4px] text-ghiaccio/30 animate-pulse">
          Caricamento…
        </p>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="font-serif text-ghiaccio/40 italic">Articolo non trovato.</p>
      </div>
    )
  }

  const readingTime = getReadingTime(article.wordCount)
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      {isMobile && (
        <MobileArticleHeader title={article.title} readingTime={readingTime} />
      )}
      <div className="max-w-2xl mx-auto px-6 py-20">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-8">
          <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/30">
            {article.publishedAt.toLocaleDateString('it-IT', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <span className="text-ghiaccio/20">·</span>
          <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/30">
            {readingTime} min di lettura
          </p>
        </div>

        {/* Title */}
        <h1 className="font-serif text-ghiaccio leading-tight mb-8"
          style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
          {article.title}
        </h1>

        {/* Cover image (optional) */}
        {article.coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.coverImageUrl}
            alt=""
            className="w-full aspect-video object-cover mb-12"
          />
        )}

        {/* Body */}
        <ArticleBody html={article.content} />

        {/* Share */}
        <div className="mt-16 pt-8 border-t border-ghiaccio/10">
          <ShareButton title={article.title} url={pageUrl} />
        </div>

        {/* Comments */}
        <CommentsSection articleId={article.id} />
      </div>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/articoli/[slug]/ArticolePageClient.tsx
git commit -m "feat: add MobileArticleHeader to article page on mobile"
```

---

## Task 11: Build check

- [ ] **Step 1: Run the build**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
npm run build
```

Expected: build completes with no TypeScript errors. Any type errors must be fixed before proceeding.

- [ ] **Step 2: If build passes, push to GitHub**

```bash
git push
```

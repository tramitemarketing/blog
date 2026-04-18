# SOGLIA Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ridisegnare il frontend di SOGLIA con palette blu marina, navbar pillola dock-style animata, e homepage layout Manifesto Tipografico con search band e grid asimmetrico.

**Architecture:** Modifiche CSS-first alla palette globale, poi componenti React aggiornati uno per uno partendo dal basso (globals → layout → navbar → hero → homepage). Nessun nuovo file: tutto è modifica di esistenti.

**Tech Stack:** Next.js 16.2.4, React 19, Tailwind CSS v4 (`@theme` block), TypeScript, Firebase (non toccato)

---

## File Map

| File | Modifica |
|---|---|
| `src/app/globals.css` | Nuovi token blu, rimozione viola/oro, aggiornamento article-body |
| `src/app/layout.tsx` | Classe body: `bg-viola-notte` → `bg-blu-notte` |
| `src/components/layout/Navbar.tsx` | Pillola dock `'use client'` con animazione spring |
| `src/components/layout/Footer.tsx` | Token `viola-profondo` → `blu-marino`, `petrolio` → `blu-chiaro` |
| `src/components/home/HeroSection.tsx` | Layout manifesto tipografico compatto |
| `src/app/page.tsx` | State `searchQuery`, passa 4 articoli (non 3) a LatestArticles |
| `src/components/home/LatestArticles.tsx` | Props `searchQuery`, grid asimmetrico 2fr/1fr/1fr |

---

## Task 1: Palette — globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Sostituisci il blocco `@theme` con la nuova palette blu**

Apri `src/app/globals.css`. Sostituisci l'intero contenuto con:

```css
@import "tailwindcss";

@theme {
  /* Blu Marina palette */
  --color-blu-notte:    #050C18;
  --color-blu-marino:   #0C1B33;
  --color-blu-profondo: #040810;
  --color-blu-accento:  #38BDF8;
  --color-blu-chiaro:   #7DD3FC;
  --color-ghiaccio:     #F0F9FF;
  --color-ghiaccio-soft: #BAE6FD;

  /* Typography */
  --font-sans: system-ui, Arial, sans-serif;
  --font-serif: Georgia, serif;

  --letter-spacing-widest: 4px;
  --line-height-relaxed: 1.85;
}

:root {
  --background: #050C18;
  --foreground: #F0F9FF;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
}

/* Tiptap article body styles */
.article-body h2 {
  font-family: Georgia, serif;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 2rem 0 0.75rem;
  color: #F0F9FF;
}

.article-body h3 {
  font-family: Georgia, serif;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 1.5rem 0 0.5rem;
  color: #F0F9FF;
}

.article-body p {
  margin-bottom: 1.25rem;
}

.article-body strong {
  color: #38BDF8;
}

.article-body em {
  font-style: italic;
}

.article-body blockquote {
  border-left: 3px solid #38BDF8;
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  font-style: italic;
  font-size: 1.125rem;
  color: #F0F9FF;
}

.article-body a {
  color: #38BDF8;
  text-decoration: underline;
}

.article-body a:hover {
  color: #38BDF8;
  opacity: 0.8;
}

.article-body img {
  max-width: 100%;
  border-radius: 4px;
  margin: 1.5rem 0;
}
```

- [ ] **Step 2: Verifica build**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
npm run build 2>&1 | tail -20
```

Atteso: nessun errore TypeScript. Eventuali warning su classi Tailwind inesistenti (viola-notte ecc.) sono normali — le correggiamo nei prossimi task.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
git add src/app/globals.css
git commit -m "feat: sostituisce palette viola/oro con blu marina"
```

---

## Task 2: Layout body + Footer

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Aggiorna classe body in layout.tsx**

In `src/app/layout.tsx` riga 22, cambia:
```tsx
// DA:
<body className="bg-viola-notte text-ghiaccio min-h-screen flex flex-col">
// A:
<body className="bg-blu-notte text-ghiaccio min-h-screen flex flex-col">
```

- [ ] **Step 2: Aggiorna Footer.tsx**

Sostituisci l'intero contenuto di `src/components/layout/Footer.tsx`:

```tsx
export default function Footer() {
  return (
    <footer className="bg-blu-marino border-t border-blu-accento/10 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/40">
          SOGLIA · Riflessioni di un sacerdote
        </p>
        <a
          href="https://tramite-marketing.pages.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[10px] uppercase tracking-[4px] text-blu-chiaro/50 hover:text-blu-chiaro transition-colors"
        >
          TramiteMarketing
        </a>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Verifica build**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
npm run build 2>&1 | tail -20
```

Atteso: nessun errore TypeScript.

- [ ] **Step 4: Commit**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
git add src/app/layout.tsx src/components/layout/Footer.tsx
git commit -m "feat: aggiorna layout e footer con palette blu"
```

---

## Task 3: Navbar — Pillola Dock Animata

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Riscrivi Navbar.tsx con animazione dock**

Sostituisci l'intero contenuto di `src/components/layout/Navbar.tsx`:

```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

interface DockItem {
  label: string
  href: string
  icon: React.ReactNode
}

function scaleFor(index: number, hovered: number | null): number {
  if (hovered === null) return 1
  const d = Math.abs(index - hovered)
  if (d === 0) return 1.45
  if (d === 1) return 1.22
  if (d === 2) return 1.08
  return 1
}

function translateFor(index: number, hovered: number | null): string {
  if (hovered === null) return 'translateY(0)'
  const d = Math.abs(index - hovered)
  if (d === 0) return 'translateY(-9px)'
  if (d === 1) return 'translateY(-4px)'
  if (d === 2) return 'translateY(-1px)'
  return 'translateY(0)'
}

const SPRING = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'

const ITEMS: DockItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="9" y="2" width="2" height="16" fill="#F0F9FF" />
        <rect x="4" y="7" width="12" height="2" fill="#F0F9FF" />
      </svg>
    ),
  },
  {
    label: 'Articoli',
    href: '/articoli',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#7DD3FC" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
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
    href: '/articoli',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round"
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#BAE6FD" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
  },
]

export default function Navbar() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <nav className="sticky top-0 z-50 flex justify-center py-3 px-6">
      <div
        className="flex items-center rounded-full"
        style={{
          background: 'rgba(255,255,255,.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(56,189,248,.18)',
          padding: '8px 20px',
          gap: 0,
        }}
        onMouseLeave={() => setHovered(null)}
      >
        {ITEMS.map((item, i) => (
          <div key={item.label} className="flex items-center">
            {/* Separatore dopo Home */}
            {i === 1 && (
              <div
                style={{
                  width: 1,
                  height: 14,
                  background: 'rgba(56,189,248,.2)',
                  margin: '0 8px',
                  flexShrink: 0,
                }}
              />
            )}
            <Link
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className="relative flex items-center justify-center"
              style={{
                width: 36,
                height: 36,
                transform: `${translateFor(i, hovered)} scale(${scaleFor(i, hovered)})`,
                transition: SPRING,
                transformOrigin: 'bottom center',
              }}
              onMouseEnter={() => setHovered(i)}
            >
              {item.icon}
              {/* Tooltip */}
              {hovered === i && (
                <span
                  className="absolute pointer-events-none"
                  style={{
                    top: -30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(4,8,16,.92)',
                    border: '1px solid rgba(56,189,248,.2)',
                    color: '#BAE6FD',
                    fontSize: 8,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    padding: '3px 9px',
                    borderRadius: 20,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </span>
              )}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Verifica build TypeScript**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
npm run build 2>&1 | tail -30
```

Atteso: nessun errore TypeScript. Se compare errore su `React.ReactNode` senza import, aggiungi in cima: `import type { ReactNode } from 'react'` e cambia il tipo a `ReactNode`.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
git add src/components/layout/Navbar.tsx
git commit -m "feat: navbar pillola dock con animazione spring"
```

---

## Task 4: HeroSection — Manifesto Tipografico

**Files:**
- Modify: `src/components/home/HeroSection.tsx`

- [ ] **Step 1: Riscrivi HeroSection.tsx con layout manifesto**

Sostituisci l'intero contenuto di `src/components/home/HeroSection.tsx`:

```tsx
import Link from 'next/link'
import type { Article, Citazione } from '@/types'

interface HeroSectionProps {
  featuredArticle: Article | null
  citazione: Citazione | null
}

export default function HeroSection({ featuredArticle, citazione }: HeroSectionProps) {
  return (
    <section className="relative border-b border-blu-accento/10">
      {/* Linea verticale azzurra — firma visiva */}
      <div
        className="absolute left-7 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #38BDF8 0%, rgba(56,189,248,0) 100%)' }}
      />

      <div
        className="grid pl-14 pr-8 py-10"
        style={{ gridTemplateColumns: '3fr 2fr', gap: '24px' }}
      >
        {/* Colonna sinistra — titolo manifesto */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-[5px] text-blu-accento/40 mb-4">
              Riflessioni di un sacerdote
            </p>

            {/* Titolo 3 livelli */}
            <div
              className="font-sans font-black leading-none"
              style={{ letterSpacing: '-3px' }}
            >
              <span
                className="block text-ghiaccio"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 3.5rem)' }}
              >
                PENSIERI
              </span>
              <span
                className="block"
                style={{
                  fontSize: 'clamp(2.8rem, 6vw, 3.5rem)',
                  WebkitTextStroke: '1px rgba(56,189,248,.35)',
                  color: 'transparent',
                }}
              >
                ALLA
              </span>
              <span
                className="block font-serif font-light italic text-ghiaccio/30"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                  letterSpacing: '-1px',
                }}
              >
                soglia del tempo
              </span>
            </div>
          </div>

          {/* Articolo in evidenza — link sotto il titolo */}
          {featuredArticle && (
            <div className="flex flex-col gap-2 max-w-sm">
              <p className="font-sans text-[7px] uppercase tracking-[3px] text-blu-accento/50">
                ↗ In evidenza
              </p>
              <p className="font-sans font-bold text-ghiaccio text-sm leading-snug">
                {featuredArticle.title}
              </p>
              <Link
                href={`/articoli/${featuredArticle.id}`}
                className="font-sans text-[9px] uppercase tracking-[3px] text-blu-accento hover:opacity-70 transition-opacity w-fit"
              >
                Leggi →
              </Link>
            </div>
          )}
        </div>

        {/* Colonna destra — citazione */}
        <div
          className="flex flex-col justify-center gap-3 pl-6"
          style={{ borderLeft: '2px solid rgba(56,189,248,.2)' }}
        >
          {citazione ? (
            <>
              <blockquote
                className="font-serif italic text-ghiaccio/60 leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
              >
                &ldquo;{citazione.text}&rdquo;
              </blockquote>
              <p className="font-sans text-[8px] uppercase tracking-[3px] text-blu-accento/40">
                {citazione.reference}
              </p>
            </>
          ) : (
            <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/20 italic">
              Nessuna citazione.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verifica build**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
npm run build 2>&1 | tail -20
```

Atteso: nessun errore TypeScript.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
git add src/components/home/HeroSection.tsx
git commit -m "feat: hero manifesto tipografico compatto con linea verticale"
```

---

## Task 5: Search Band + page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Riscrivi page.tsx con searchQuery state e search band**

Sostituisci l'intero contenuto di `src/app/page.tsx`:

```tsx
'use client'
import { useState, useEffect } from 'react'
import HeroSection from '@/components/home/HeroSection'
import LatestArticles from '@/components/home/LatestArticles'
import BioTeaser from '@/components/home/BioTeaser'
import BrevoWidget from '@/components/home/BrevoWidget'
import { getPublishedArticles, getCitazione } from '@/lib/firestore'
import type { Article, Citazione } from '@/types'

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [citazione, setCitazione] = useState<Citazione | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    Promise.all([getPublishedArticles(), getCitazione()])
      .then(([arts, cit]) => {
        setArticles(arts)
        setCitazione(cit)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-sans text-[11px] uppercase tracking-[4px] text-ghiaccio/30 animate-pulse">
          Caricamento…
        </div>
      </div>
    )
  }

  const featured = articles[0] ?? null
  const pool = articles.slice(0, 5)

  const filtered = searchQuery.trim()
    ? pool.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.excerpt ?? '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pool

  return (
    <>
      <HeroSection featuredArticle={featured} citazione={citazione} />

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

      {filtered.length > 0 && (
        <LatestArticles articles={filtered} searchQuery={searchQuery} />
      )}
      <BioTeaser />
      <BrevoWidget />
    </>
  )
}
```

- [ ] **Step 2: Verifica build**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
npm run build 2>&1 | tail -20
```

Se compare errore su `searchQuery` prop non riconosciuta in `LatestArticles` — è atteso, viene risolto nel Task 6.

- [ ] **Step 3: Commit (dopo Task 6 se il build fallisce)**

Se il build passa: commit ora. Se fallisce per la prop: aspetta Task 6 e committa insieme.

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
git add src/app/page.tsx
git commit -m "feat: search band homepage con filtro articoli"
```

---

## Task 6: LatestArticles — Grid Manifesto Asimmetrico

**Files:**
- Modify: `src/components/home/LatestArticles.tsx`

- [ ] **Step 1: Riscrivi LatestArticles.tsx con grid 2fr/1fr/1fr**

Sostituisci l'intero contenuto di `src/components/home/LatestArticles.tsx`:

```tsx
import Link from 'next/link'
import type { Article } from '@/types'

interface LatestArticlesProps {
  articles: Article[]
  searchQuery?: string
}

export default function LatestArticles({ articles, searchQuery }: LatestArticlesProps) {
  if (articles.length === 0) {
    return (
      <section className="px-14 py-12">
        <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/20">
          {searchQuery ? 'Nessun articolo trovato.' : 'Nessun articolo pubblicato.'}
        </p>
      </section>
    )
  }

  const [featured, ...rest] = articles

  return (
    <section className="border-b border-blu-accento/08">
      {searchQuery && (
        <p className="px-14 pt-6 font-sans text-[8px] uppercase tracking-[4px] text-blu-accento/40">
          Risultati per &ldquo;{searchQuery}&rdquo;
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gridTemplateRows: 'auto auto',
        }}
      >
        {/* Card featured — span 2 righe */}
        <ArticleCardFeatured article={featured} />

        {/* Card compatte — fino a 4 slot */}
        {[0, 1, 2, 3].map(slot => {
          const article = rest[slot]
          if (!article) {
            // Slot vuoto — riempie la griglia
            return <div key={`empty-${slot}`} className="border-l border-t border-blu-accento/06" />
          }
          return <ArticleCardSmall key={article.id} article={article} index={slot + 2} />
        })}

        {/* Ultima cella: link archivio */}
        <div
          className="border-l border-t border-blu-accento/06 flex items-end p-5"
          style={{ background: 'rgba(56,189,248,.02)' }}
        >
          <div>
            <p className="font-sans text-[7px] uppercase tracking-[3px] text-blu-accento/40 mb-2">
              Tutti gli articoli
            </p>
            <Link
              href="/articoli"
              className="font-sans text-[11px] font-bold text-blu-accento hover:opacity-70 transition-opacity"
            >
              → Archivio completo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArticleCardFeatured({ article }: { article: Article }) {
  const readingTime = Math.max(1, Math.ceil((article.wordCount ?? 0) / 200))

  return (
    <div
      className="relative p-8 border-r border-t border-blu-accento/08 flex flex-col justify-between"
      style={{
        gridRow: 'span 2',
        background: 'rgba(56,189,248,.04)',
        borderColor: 'rgba(56,189,248,.1)',
        minHeight: 280,
      }}
    >
      {/* Numero watermark */}
      <span
        className="absolute pointer-events-none select-none font-black"
        style={{
          right: -8,
          bottom: -10,
          fontSize: 100,
          letterSpacing: -6,
          lineHeight: 1,
          color: 'rgba(56,189,248,.04)',
        }}
      >
        01
      </span>

      <div>
        <p className="font-sans text-[7px] uppercase tracking-[4px] text-blu-accento/60 mb-4">
          ↗ In evidenza
        </p>
        <h2
          className="font-sans font-black text-ghiaccio leading-tight mb-4"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '-0.5px' }}
        >
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="font-serif text-ghiaccio/50 text-sm leading-relaxed mb-6">
            {article.excerpt}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Link
          href={`/articoli/${article.id}`}
          className="font-sans text-[9px] uppercase tracking-[3px] text-blu-accento hover:opacity-70 transition-opacity"
        >
          Leggi l&apos;articolo →
        </Link>
        <span className="font-sans text-[8px] uppercase tracking-[2px] text-ghiaccio/20">
          {readingTime} min
        </span>
      </div>
    </div>
  )
}

function ArticleCardSmall({ article, index }: { article: Article; index: number }) {
  return (
    <div className="relative p-5 border-l border-t border-blu-accento/06 flex flex-col justify-between overflow-hidden">
      {/* Numero watermark */}
      <span
        className="absolute pointer-events-none select-none font-black"
        style={{
          right: -4,
          bottom: -8,
          fontSize: 56,
          letterSpacing: -3,
          lineHeight: 1,
          color: 'rgba(56,189,248,.04)',
        }}
      >
        {String(index).padStart(2, '0')}
      </span>

      <div>
        <p className="font-sans text-[7px] uppercase tracking-[3px] text-blu-accento/40 mb-2">
          {article.publishedAt.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </p>
        <h3 className="font-sans font-bold text-ghiaccio text-sm leading-snug mb-2">
          {article.title}
        </h3>
      </div>

      <Link
        href={`/articoli/${article.id}`}
        className="font-sans text-[8px] uppercase tracking-[2px] text-blu-accento/60 hover:text-blu-accento transition-colors"
      >
        Leggi →
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Verifica build**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
npm run build 2>&1 | tail -30
```

Atteso: build green, nessun errore TypeScript.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
git add src/components/home/LatestArticles.tsx src/app/page.tsx
git commit -m "feat: grid asimmetrico manifesto con search e archivio"
```

---

## Task 7: BioTeaser — Aggiornamento Palette

**Files:**
- Modify: `src/components/home/BioTeaser.tsx`

- [ ] **Step 1: Aggiorna token colore in BioTeaser.tsx**

Sostituisci l'intero contenuto di `src/components/home/BioTeaser.tsx`:

```tsx
import Link from 'next/link'

export default function BioTeaser() {
  return (
    <section className="bg-blu-marino py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1">
          <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/30 mb-6">
            Il sacerdote
          </p>
          <p className="font-serif text-ghiaccio/70 text-lg leading-relaxed mb-8">
            Sacerdote e insegnante di religione, scrivo queste riflessioni come
            un tentativo di pensare ad alta voce la fede — in dialogo con la
            filosofia, la teologia e l&apos;esperienza quotidiana.
          </p>
          <Link
            href="/biografia"
            className="font-sans text-[11px] uppercase tracking-[4px] text-blu-accento border-b border-blu-accento pb-1 hover:opacity-70 transition-opacity"
          >
            Leggi la biografia →
          </Link>
        </div>
        <div className="w-full lg:w-64 h-px lg:h-32 bg-blu-accento/15" />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verifica build finale**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
npm run build 2>&1 | tail -30
```

Atteso: build completamente green. Se rimangono warning su classi Tailwind inesistenti (es. `border-blu-accento/08`) — Tailwind v4 supporta slash opacity su classi custom: verifica che il token `--color-blu-accento` sia definito in `@theme`. Se il warning persiste, usa `border-[rgba(56,189,248,.08)]` inline come fallback.

- [ ] **Step 3: Commit finale**

```bash
cd "C:/Users/gioff/Desktop/CLAUDE CODE/blog-master/blog-master"
git add src/components/home/BioTeaser.tsx
git commit -m "feat: bioteaser con palette blu marina"
```

---

## Checklist Finale

- [ ] `npm run build` passa senza errori
- [ ] Token `viola-*`, `oro`, `petrolio` non appaiono in nessun file modificato: `grep -r "viola\|petrolio\|oro" src/app src/components/home src/components/layout`
- [ ] La navbar è sticky e centrata su mobile e desktop
- [ ] La search band filtra correttamente i titoli degli articoli
- [ ] Il grid LatestArticles degrada bene con 1, 2, 3 articoli (slot vuoti riempiti)

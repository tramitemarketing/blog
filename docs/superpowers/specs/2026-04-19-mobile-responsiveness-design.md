---
title: Mobile Responsiveness — SOGLIA Blog
date: 2026-04-19
status: approved
---

# Mobile Responsiveness Design

## Overview

Make the SOGLIA blog fully functional on phones and small tablets (< 768px). The admin panel stays desktop-only. The goal is a reading-first mobile experience that stays visually coherent with the desktop version — same glass aesthetic, same color tokens, same motion language.

## Architecture

### Approach: Separate Mobile Components

Desktop components remain **untouched**. New mobile-specific components are mounted conditionally via a shared `useIsMobile()` hook.

```tsx
// In layout/page files — the only conditional
const isMobile = useIsMobile()
return isMobile ? <MobileNavbar /> : <Navbar />
```

**Breakpoint:** `< 768px` (covers phones + small tablets)

**Hook:** `src/hooks/useIsMobile.ts`
- Reads `window.innerWidth < 768` on mount
- Updates on `resize` via `addEventListener`
- Returns a boolean

### New Components

| Component | Path | Replaces on mobile |
|---|---|---|
| `MobileNavbar` | `src/components/layout/MobileNavbar.tsx` | `Navbar` |
| `ArticleCarousel` | `src/components/home/ArticleCarousel.tsx` | `LatestArticles` grid |
| `MobileSearchSheet` | `src/components/layout/MobileSearchSheet.tsx` | `SearchOverlay` |
| `MobileArticleHeader` | `src/components/articoli/MobileArticleHeader.tsx` | inline title on article page |

---

## Component Designs

### 1. MobileNavbar

**Position:** `position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%)`  
**Layout:** Pill centered at bottom — same glass pill as desktop

**Visual structure:**
```
[ 🏠      📖      🔍      ✏️  ]
  Home   Art.   Cerca   Bio
```
- Icons same SVGs as desktop
- Labels: 8px, uppercase, letterSpacing 2.5px, always visible below each icon
- Active item: dot indicator (same expanding dot pattern as desktop navbar)
- Glass style: `backdrop-filter: blur(32px) saturate(180%)`, same border and boxShadow as desktop

**Hide-on-scroll behavior:**
- Listens to `window.scroll` via passive event listener
- Stores previous `scrollY` in `useRef` (no re-render per pixel)
- Scrolling **down** > 40px delta → `translateY(calc(100% + 28px))` with `transition: 0.3s ease`
- Scrolling **up** → `translateY(0)`

**Search tap interaction:**
- `navigator.vibrate(10)` on tap (haptic feedback, 10ms pulse)
- Opens `MobileSearchSheet`
- Uses same `soglia:open-search` custom event pattern for consistency

---

### 2. ArticleCarousel

**Replaces:** the `2fr 1fr 1fr` asymmetric grid on homepage

**CSS scroll snap (no library):**
```css
display: flex;
overflow-x: auto;
scroll-snap-type: x mandatory;
scroll-behavior: smooth;
-webkit-overflow-scrolling: touch;
scrollbar-width: none; /* hidden scrollbar */
```

Each card:
```css
flex-shrink: 0;
width: 85vw;
scroll-snap-align: start;
```
The 15vw gap reveals the next card's edge — natural affordance for swiping.

**Auto-rotate:**
- Advances one card every 3.5 seconds via `setInterval` stored in `useRef`
- On last card, resets to first (loop)
- Uses `scrollLeft` manipulation on the container ref

**Pause on touch:**
- `touchstart` → clears interval, starts a 20-second `setTimeout`
- After 20 seconds of no touch → resumes auto-rotate
- Both stored in `useRef` to avoid stale closures

**Dot indicators:**
- One dot per article, below the carousel
- Active dot expands to a short line (same pattern as navbar dot indicator)
- Updates via `scroll` event on the container (IntersectionObserver not needed — simple `scrollLeft / cardWidth` math)

**Card style:**
- Same glass border and backdrop-filter as desktop cards
- Title (2 lines max), excerpt (2 lines max, `line-clamp-2`), reading time badge
- Height: ~280px

---

### 3. MobileSearchSheet

**Trigger:** `soglia:open-search` event (same as desktop) + tap on MobileNavbar search icon

**Animation:**
- Sheet enters from bottom: `translateY(100%) → translateY(0)`
- Easing: `cubic-bezier(0.34, 1.2, 0.64, 1)` (same spring used throughout site)
- Backdrop: `rgba(5,12,24,.7)` behind the sheet

**Sheet structure (top → bottom):**
1. **Handle**: centered gray pill `4px × 32px`, `background: rgba(255,255,255,.2)` — signals swipe-to-close
2. **Input row**: magnifier icon + text input + ESC kbd button
3. **Results list**: scrollable, `max-height: 60vh` (leaves space above keyboard)

**Closing:**
- Tap outside the sheet
- Swipe down on handle (touch delta > 60px → close)
- ESC key

**Style:**
- `background: rgba(255,255,255,.08)`
- `backdropFilter: blur(24px)`
- `border-top: 1px solid rgba(56,189,248,.22)`
- `border-radius: 20px 20px 0 0`
- Same result row style as desktop `SearchOverlay`

**Results:** reuses same `getPublishedArticles()` cached fetch — no duplicate network call.

---

### 4. MobileArticleHeader

**Position:** `position: sticky; top: 0; z-index: 40`

**Content:**
- Article title (truncated, 1 line, `text-overflow: ellipsis`)
- Reading time (`X min`) right-aligned

**Behavior:**
- Starts at `opacity: 0`
- Becomes `opacity: 1` after ~120px of scroll (when original title has left viewport)
- `transition: opacity 0.25s ease`
- Implemented via `useEffect` + `window.addEventListener('scroll', ...)` with passive flag

**Style:**
- Glass: `background: rgba(255,255,255,.07)`, `backdropFilter: blur(20px)`, `border-bottom: 1px solid rgba(56,189,248,.12)`
- Font: 11px uppercase, letterSpacing 2px — consistent with site typography

---

## Files to Create

```
src/hooks/useIsMobile.ts
src/components/layout/MobileNavbar.tsx
src/components/layout/MobileSearchSheet.tsx
src/components/home/ArticleCarousel.tsx
src/components/articoli/MobileArticleHeader.tsx
```

## Files to Modify

```
src/app/layout.tsx              — mount MobileNavbar / Navbar conditionally
src/app/page.tsx                — mount ArticleCarousel / LatestArticles conditionally
src/app/articoli/[slug]/ArticolePageClient.tsx — add MobileArticleHeader
```

## Non-Goals

- Admin panel mobile support — stays desktop-only
- Changes to any existing desktop component
- New routes or pages
- Tablet-specific layouts (tablet gets desktop layout above 768px)

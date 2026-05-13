# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project: SOGLIA

Personal blog ("Soglia — riflessioni di un sacerdote") built with Next.js 16 + Firebase, deployed as a static export to Firebase Hosting.

**Stack:** Next.js 16.2.4 (static export), React 19, TypeScript, Tailwind CSS v4, Firebase (Firestore + Auth + Hosting), Tiptap v3 rich-text editor.

## Commands

```bash
npm run dev       # Dev server → http://localhost:3000
npm run build     # Static export to out/
npm run deploy    # build + firebase deploy --only hosting
```

No test runner is configured. Type-check only: `npx tsc --noEmit`.

Deploy Firestore rules independently: `firebase deploy --only firestore:rules`

## Architecture

### Static export + Firebase rewrite pattern

`next.config.ts` sets `output: 'export'` — every page becomes a static HTML file in `out/`. For dynamic article slugs, `generateStaticParams` in `src/app/articoli/[slug]/page.tsx` pre-renders every published article at build time and always includes a fallback `articolo` slug. Firebase Hosting rewrites (`firebase.json`) serve the fallback shell for articles published after the last build.

### Data layer (`src/lib/`)

- `firebase.ts` — initialises Firebase app once (singleton guard). Logs warnings for missing env vars instead of throwing, so the build doesn't break without `.env.local`.
- `firestore.ts` — all Firestore reads/writes. Exposes typed functions for articles, comments, `citazione` (quote of the day), and `biografia`. Has a module-level `publishedArticlesCache` that `generateStaticParams` benefits from at build time.
- `auth.ts` — lazy `getAuth()` wrapper (avoids calling `getAuth` at module evaluation time, which breaks static export).

### Firestore collections

| Collection | Purpose |
|---|---|
| `articles` | Blog posts — keyed by slug (`id` === document id) |
| `comments` | Reader comments — moderated (status: `pending` / `approved` / `rejected`) |
| `config/citazione` | Single-document: quote of the day |
| `config/biografia` | Single-document: biography HTML content |

### Auth & admin

Auth uses Firebase Email/Password + Google. The `useAuth` hook (`src/hooks/useAuth.ts`) subscribes to `onAuthStateChanged`. `src/app/admin/layout.tsx` is a Client Component that redirects unauthenticated users to `/admin/login`. Admin routes: `/admin` (article list), `/admin/articoli/nuovo`, `/admin/articoli/[id]`, `/admin/commenti`, `/admin/config`.

### Routing structure

| Route | Notes |
|---|---|
| `/` | Home — HeroSection, ArticleCarousel, BioTeaser, BrevoWidget |
| `/articoli` | Article list with search |
| `/articoli/[slug]` | Article page — static + fallback shell |
| `/biografia` | Biography page |
| `/admin/*` | Protected admin panel (dark violet theme) |

### Component organisation

Components are split by domain: `src/components/layout/` (Navbar, Footer, Search), `src/components/home/`, `src/components/articoli/`, `src/components/article/` (single article view), `src/components/admin/`.

The Navbar is split into `Navbar.tsx` (desktop) + `MobileNavbar.tsx`, wrapped by `NavbarWrapper.tsx` (Client Component that decides which to render). Search is handled by `SearchWrapper.tsx` + `SearchOverlay.tsx` (desktop) / `MobileSearchSheet.tsx`.

### Styling

Tailwind CSS v4 with custom design tokens defined in `src/app/globals.css` under `@theme`. Two visual identities coexist:
- **Public site (A1 Audace):** imperial blue (`#11296b`) + mustard (`#ffdb57`) palette, `paper`/`ink` backgrounds, fonts: Cormorant Garamond + Inter.
- **Admin panel (legacy dark):** violet-night palette (`viola-profondo`, `viola-notte`, `oro`, `ghiaccio`).

Article body HTML (rendered from Tiptap) is styled via the `.article-body` class in `globals.css` — not Tailwind utilities, since the content is dynamic HTML.

### Rich-text editor

Tiptap v3 (`src/components/admin/TiptapEditor.tsx`) is used in the admin article editor. Content is stored as HTML strings in Firestore and rendered via `dangerouslySetInnerHTML` in `ArticleBody.tsx`.

### Environment variables

All Firebase config values are `NEXT_PUBLIC_FIREBASE_*`. Optional: `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Copy `.env.local.example` → `.env.local` to develop locally.

# SOGLIA — Redesign Visivo

**Data:** 2026-04-18  
**Stato:** Approvato

---

## Obiettivo

Ridisegnare il frontend del blog SOGLIA con: palette blu (sostituzione viola/oro), navbar pill dock-style animata, hero compatto con layout Manifesto Tipografico, search integrata in homepage, card articoli in grid asimmetrico.

---

## 1. Palette Colori

| Token CSS | Valore | Uso |
|---|---|---|
| `--color-blu-notte` | `#050C18` | Background principale (sostituisce `viola-notte`) |
| `--color-blu-marino` | `#0C1B33` | Sezioni alternate (sostituisce `viola-profondo`) |
| `--color-blu-accento` | `#38BDF8` | Accenti, CTA, icone attive (sostituisce `oro`) |
| `--color-blu-chiaro` | `#7DD3FC` | Icone secondarie (sostituisce `viola-vivace`) |
| `--color-ghiaccio` | `#F0F9FF` | Testo principale (invariato) |

Rimozione completa di: `viola-notte`, `viola-profondo`, `viola-vivace`, `oro`, `petrolio`.  
Aggiornare anche `globals.css`: `--background`, `--foreground`, `.article-body` styles.

---

## 2. Navbar — Pillola Fluttuante Dock

**Struttura:**
- Pill centrata, `backdrop-filter: blur(20px)`, border `rgba(56,189,248,.18)`
- 4 dock items in singola riga (`align-items: center`), nessun height fisso
- Separator verticale tra logo e icone nav

**Icone (SVG inline):**
1. ✛ Croce → Home (`/`)
2. Libro → Articoli (`/articoli`)
3. Lente → Cerca (focus search homepage o `/articoli`)
4. Penna/piuma → Biografia (`/biografia`)

**Animazione dock (JS):**
- `mouseenter` su item → applica classi CSS: `.scale-xl` (1.45×), `.scale-lg` (1.22×), `.scale-md` (1.08×) agli indici vicini
- `mouseleave` su pill → rimuove tutte le classi
- Transition: `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring/overshoot)
- Tooltip con nome sopra l'item attivo

**Comportamento:**
- `sticky top-0 z-50`
- Pill centrata con `mx-auto`

---

## 3. Homepage — Manifesto Tipografico

### Hero (compatto)

- Nessun `min-h-[80vh]` — altezza naturale ~200px
- Linea verticale azzurra assoluta sul lato sinistro (`width: 2px`, gradient blu → trasparente)
- Layout: `grid-template-columns: 3fr 2fr`

**Colonna sinistra:**
- Eyebrow: `RIFLESSIONI DI UN SACERDOTE` (uppercase, tracking, blu-accento opaco)
- Titolo 3 righe:
  - `PENSIERI` — font-weight 900, bianco, font-size ~52px, letter-spacing -3px
  - `ALLA` — solo outline (`-webkit-text-stroke: 1px rgba(56,189,248,.35)`), testo trasparente
  - `soglia` — Georgia italic, font-weight 300, opacità ~35%

**Colonna destra:**
- Citazione del giorno in Georgia italic
- Border-right `2px rgba(56,189,248,.25)`
- Ref citazione sotto in uppercase tracking

### Search Band

- Full-width sotto l'hero, border-top e border-bottom
- Background `rgba(56,189,248,.04)`
- Icona lente + placeholder + shortcut `⌘K`
- Funzionale: `useState` per query → filtra `articles` passato a `LatestArticles`

### Grid Articoli (LatestArticles)

```
grid-template-columns: 2fr 1fr 1fr
grid-template-rows: auto auto
```

- Card featured: `grid-row: span 2`, background `rgba(56,189,248,.05)`, border accento
- Card 2-3 (riga 1 destra): compatte
- Card 4-5 (riga 2 destra): compatte  
- Ultima cella: link "→ Archivio completo" sfondo tenue
- Ogni card: numero watermark assoluto in basso destra (`rgba(56,189,248,.04)`, font-size 80px)

---

## 4. File da Modificare

| File | Tipo modifica |
|---|---|
| `src/app/globals.css` | Nuovi token colore blu, rimozione viola/oro, aggiornamento article-body |
| `src/components/layout/Navbar.tsx` | Pillola dock con `useRef`, `useState`, animazione JS |
| `src/components/home/HeroSection.tsx` | Layout manifesto tipografico |
| `src/components/home/LatestArticles.tsx` | Grid asimmetrico 2fr/1fr/1fr |
| `src/app/page.tsx` | `searchQuery` state, passa a LatestArticles |
| `src/app/layout.tsx` | Update classe `body` (bg token nuovo) |

---

## 5. Fuori Scope

- Pagina `/articoli` — non toccata
- Admin — non toccato
- Pagina `/biografia` — non toccata
- Pagina articolo singolo — non toccata
- Firebase / Firestore — nessuna modifica

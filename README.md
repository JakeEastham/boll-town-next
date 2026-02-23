# Bollington Town FC — Official Website

Official website for **Bollington Town FC**, a community football club based in Bollington, Macclesfield, Cheshire. Founded 2021, competing in the Cheshire Football League.

**Live site:** [bollingtontownfc.co.uk](https://bollingtontownfc.co.uk)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router, static export) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| CMS | Sanity v5 |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| Dates | date-fns 4 |
| Rich Text | Portable Text (`@portabletext/react`) |
| Hosting | IONOS shared hosting (Apache) |
| Deployment | GitHub Actions → SFTP |

---

## Architecture Overview

The site is a **fully static Next.js export**. All pages are pre-rendered at build time by fetching content from Sanity CMS. There is no Node.js server at runtime — the `out/` directory is a plain static site served by Apache.

```
Sanity CMS  →  next build (fetch + render)  →  out/  →  IONOS via SFTP
```

**Key implications:**
- Content changes in Sanity require a new build to go live
- No `searchParams` at runtime — all filtering is client-side
- `generateStaticParams()` must return at least one item (use `_placeholder` if Sanity has no content yet — returning `[]` causes a Next.js 16 static export error)
- `robots.ts` and `sitemap.ts` require `export const dynamic = "force-static"`

---

## Project Structure

```
bolly-town-fc-next/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD: build → SFTP deploy to IONOS
├── public/
│   ├── .htaccess               # Apache: HTTPS redirect, cache headers, SPA fallback
│   ├── images/                 # Static images (logo, OG image)
│   └── pdfs/                   # Club documents
├── sanity/
│   ├── sanity.config.ts        # Sanity Studio configuration
│   └── schemas/
│       ├── documents/          # Content types (match, player, news, etc.)
│       └── objects/            # Reusable field objects (lineup, events, etc.)
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout (fonts, metadata, JSON-LD)
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── robots.ts           # robots.txt
│   │   ├── sitemap.ts          # sitemap.xml
│   │   ├── matches/
│   │   │   ├── page.tsx        # Match listing
│   │   │   └── [id]/page.tsx   # Individual match report
│   │   ├── news/
│   │   │   ├── page.tsx        # News listing
│   │   │   └── [slug]/page.tsx # Individual article
│   │   ├── squad/
│   │   │   ├── page.tsx        # Squad listing
│   │   │   └── [slug]/page.tsx # Player profile
│   │   ├── get-involved/       # Join/sponsor/contact page
│   │   ├── club-documents/     # Policies and constitution
│   │   ├── club-history/       # Club history and all-time stats
│   │   └── studio/             # Sanity Studio (SPA, separate from static export)
│   ├── components/
│   │   ├── layout/             # Header, Footer, Navigation, MobileMenu
│   │   ├── sections/           # Page-level feature components
│   │   └── ui/                 # Reusable primitives (Button, Card, Badge, etc.)
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts       # Sanity client + urlFor image builder
│   │   │   ├── queries.ts      # All GROQ queries
│   │   │   └── index.ts
│   │   └── utils/              # cn() and other helpers
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces for all Sanity types
│   └── data/
│       └── playerStats.ts      # Hardcoded all-time player statistics
└── next.config.ts              # output: 'export', trailingSlash: true
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/your-org/bolly-town-fc-next.git
cd bolly-town-fc-next
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=m8shvxfm
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

The Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

### Build

```bash
npm run build
```

Generates the static export in `out/`. This can be served locally with any static server:

```bash
npx serve out
```

---

## Sanity CMS

### Project Details

- **Project ID:** `m8shvxfm`
- **Dataset:** `production`
- **Studio URL (local):** `http://localhost:3000/studio`
- **Studio URL (production):** `https://bollingtontownfc.co.uk/studio`

### Document Types

| Type | Purpose |
|---|---|
| `match` | Match reports — scorelines, events, lineups, Veo highlights |
| `player` | Squad profiles — bio, position, squad number, stats |
| `newsArticle` | News and updates with rich text content |
| `team` | Team definitions with FA Full-Time integration IDs |
| `competition` | League and cup definitions |
| `sponsor` | Sponsorship partners with tier and logo |
| `staffMember` | Board, coaching, and operations staff |
| `clubDocument` | Constitution, policies, codes of conduct (PDF) |
| `siteSettings` | Global config — hero slides, social links, contact info |

### Object Types

| Type | Purpose |
|---|---|
| `lineupPlayer` | Lineup entry with up to two event badges (goal, sub, yellow/red) |
| `matchReportEvent` | Timeline event in a match report (goal, chance, save) |
| `matchStat` | A statistic row (e.g. "Possession — 67%") |
| `blockContent` | Portable Text rich text with headings, links, images |
| `heroSlide` | A single image slide for the homepage carousel |
| `socialLink` | A social media platform + URL pair |
| `seo` | Meta title, description, and OG image override |

### Sponsor Tiers

| Value | Use |
|---|---|
| `main` | Primary partner — displayed prominently |
| `kit` | Kit sponsor — displayed prominently |
| `partner` | Official partner |
| `community` | Community partner |
| `video` | Video sponsor — logo shown below all Veo highlights |

### Match Lineup Badges

Each player in a lineup can have up to **two badges** (e.g. yellow card + substituted off):

| Badge | Display |
|---|---|
| `goal` | Goal with minute(s) |
| `sub` | Substituted off |
| `sub-on` | Substituted on |
| `yellow` | Yellow card with minute |
| `red` | Red card with minute |

---

## Key Components

### Sections

| Component | Description |
|---|---|
| `HeroSlider` | Full-screen image carousel from site settings hero slides |
| `MatchWidget` | Next upcoming match preview card |
| `LatestMatchReport` | Featured card for the most recent match report |
| `MatchHighlights` | Veo video player with video sponsor branding |
| `MatchReport` | Full match report — timeline, stats, lineups, Veo embed |
| `NewsGrid` | Responsive news article grid |
| `PlayerGrid` | Squad grid grouped by position |
| `FAFullTimeWidget` | Lazy-loaded FA Full-Time league table embed |
| `SponsorCarousel` | Sponsor logo carousel/marquee (also `SponsorBanner`, `SponsorStrip`) |

### UI Primitives

| Component | Description |
|---|---|
| `Button` | Primary and outline CTA button |
| `Card` | Various card types (News, Player, Match, Document, Staff) |
| `Badge` | Status indicators (position, match event) |
| `ScrollToHash` | Client-side smooth scroll to `#anchor` links after navigation |

### FA Full-Time Widget

The `FAFullTimeWidget` embeds the FA's league table by injecting their `cs1.js` script. It uses an `IntersectionObserver` to defer loading until the widget is 200px from the viewport, preventing the third-party script from blocking the initial page load.

Pre-configured variants: `LeagueTable`, `TeamFixturesResults`, `ClubFixtures`, `ClubResults`.

---

## Deployment

### Automatic (GitHub Actions)

Every push to `main` triggers the deployment workflow:

1. Install dependencies (`npm ci`)
2. Build static export (`npm run build`)
3. Upload `out/` to IONOS via SFTP

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `IONOS_FTP_SERVER` | SFTP hostname |
| `IONOS_FTP_USERNAME` | SFTP username |
| `IONOS_FTP_PASSWORD` | SFTP password |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name |
| `NEXT_PUBLIC_SITE_URL` | Production URL (`https://bollingtontownfc.co.uk`) |

### Manual Deploy

Trigger the workflow from the **Actions** tab in GitHub, or build and upload manually:

```bash
npm run build
# Upload contents of out/ to IONOS webspace root via SFTP
```

### Apache Configuration

The `.htaccess` in `public/` handles:

- **HTTPS redirect** — all HTTP → HTTPS
- **www redirect** — `www.bollingtontownfc.co.uk` → `bollingtontownfc.co.uk`
- **Gzip compression** — HTML, CSS, JS, JSON, SVG
- **Cache headers** — `_next/static/` assets cached for 1 year (immutable), images for 1 month, HTML no-cache
- **Studio SPA fallback** — `/studio/*` → `/studio/index.html`
- **Custom 404** — `/404.html`

---

## Fonts

| Font | Variable | Use | Weights loaded |
|---|---|---|---|
| Oswald | `--font-oswald` | Display / headings | 500, 700 |
| Roboto Condensed | `--font-roboto-condensed` | Body text | 400, 600, 700 |

Both fonts are self-hosted by Next.js from Google Fonts at build time — no runtime network request.

---

## Performance Notes

- `urlFor()` appends `.auto('format')` — Sanity CDN serves **WebP** to supporting browsers automatically
- `logo.png` optimised to 512×512px (was 3509×3509px)
- Hero image uses `priority` and `fetchPriority="high"` for LCP optimisation
- FA Full-Time widget is lazy-loaded via `IntersectionObserver` (200px root margin)
- `browserslist` targets modern browsers only to reduce polyfill bundle size

---

## SEO

- Structured data (JSON-LD) on every page — `SportsTeam` schema in root layout
- Per-match `SportsEvent` schema on match report pages
- Per-article `NewsArticle` schema on news pages
- `sitemap.xml` and `robots.txt` auto-generated at build time
- Open Graph and Twitter card metadata on all pages

---

## Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build static export → out/
npm run lint     # Run ESLint
```

---

## Common Gotchas

**`generateStaticParams()` must not return `[]`**
Next.js 16 with `output: 'export'` throws a "missing generateStaticParams" error if the array is empty. Always return a `_placeholder` fallback:
```ts
if (!items || items.length === 0) return [{ id: "_placeholder" }];
```

**No `searchParams` in static pages**
Remove `searchParams` from page props entirely — handle all filtering with client-side state (`useState`).

**Sanity Studio is a separate SPA**
The `/studio` route is not pre-rendered. It relies on the `.htaccess` rewrite rule `studio/.+ → /studio/index.html`. The studio page must export `generateStaticParams` from the server component and import the actual Studio as a client component.

**Content changes require a rebuild**
The site is fully static. After publishing content in Sanity, push to `main` or manually trigger the GitHub Actions workflow to redeploy.

**Image optimisation is disabled**
`images: { unoptimized: true }` is set in `next.config.ts` because Next.js image optimisation requires a server. Images from Sanity are handled via the `@sanity/image-url` builder with explicit dimensions and `.auto('format')` for WebP delivery.

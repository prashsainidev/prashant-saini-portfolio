# V2 Portfolio — Progress Tracker
# MANDATORY: AI agent reads this at the START of every session.
# MANDATORY: AI agent updates this at the END of every session.
# Last Updated: 2026-07-18

---

## 🎯 PROJECT GOAL
Build an award-winning, Japanese Cinematic / Editorial aesthetic personal portfolio for Prashant Saini.
Target: Awwwards / FWA level quality. Theme: Japanese manga scroll-telling experience.
Reference sites: slamdunk-five.vercel.app, bruno-simon.com, aristidebenoist.com

---

## 📍 CURRENT STATUS: PHASE 3 — BUILDING SECTIONS (Act I & Act II Complete)

**Live dev server:** `npm run dev` at `http://localhost:3000`
**Project path:** `E:\git-workspace\git-workspace-2026-onwards\v2-portfolio`

---

## ✅ COMPLETED TASKS

### Phase 1 — Foundation
- [x] Initialized Next.js 14 + TypeScript + Tailwind CSS
- [x] Setup Zustand, GSAP, Framer Motion, Lenis, Lucide React
- [x] Pre-commit hooks configured (Husky + lint-staged + Prettier/ESLint)
- [x] Implemented Day/Night mode CSS variable system in `globals.css`
- [x] Created full documentation (ARCHITECTURE, DESIGN_SYSTEM, SECTION_FLOW, PROGRESS)

### Phase 2 — Reusable UI Components
- [x] `CustomCursor.tsx` — Ink-drop cursor + canvas trail + drag state
- [x] `ChapterLabel.tsx` — "[ 01 ] ——— SECTION / 日本語"
- [x] `KanjiAccent.tsx` — Ghost Kanji watermark
- [x] `InkStamp.tsx` — Red Japanese seal accent
- [x] `MangaPanel.tsx` — Comic panel border wrapper
- [x] `CurvyArrow.tsx` — GSAP draw-on-scroll SVG arrows
- [x] `ThemeToggle.tsx` — Day/Night toggle
- [x] `MangaWarpCanvas.tsx` — Canvas shader background
- [x] `AbstractWireframe.tsx` — 3D wireframe decorator (Three.js)
- [x] `JpTooltip.tsx` — Cinematic JP translation tooltip (React Portal)

### Phase 3 — Data Layer & Layout
- [x] Modular data files in `src/data/` (`hero.ts`, `about.ts`, `skills.ts`, etc.)
- [x] `siteConfig.ts` & `sections.ts` — Master 5-Act toggle and registry
- [x] `src/app/page.tsx` — Dynamic section renderer
- [x] `Navbar.tsx` — Dynamic nav linked to active sections

### Phase 3 — Sections Built (Act I & Act II)
- [x] **HeroSection** `[ 00 ]` — Parallax character, 5-layer mouse-reactive, scroll reveal
- [x] **AboutSection** `[ 01 ]` — MangaWarpCanvas bg, AbstractWireframe 3D, trait cards
- [x] **SkillsSection** `[ 02 ]` — GSAP physics mouse repulsion, category tabs
- [x] **ProjectsSection** `[ 03 ]` — Horizontal cinematic scroll, GSAP velocity skew, DRAG cursor
- [x] **FreelanceSection** `[ 04 ]` — Responsive manga grid, client work showcase
- [x] **ExperienceSection** `[ 05 ]` — Vertical GSAP timeline, pulsing Hanko Seal

---

## 🔄 IN PROGRESS
- [ ] Planning Act III (The Voice) components — BlogsSection is next.

---

## ✅ AUDIT FIXES COMPLETED (2026-07-18)
- [x] **Security** — Added `rel="noopener noreferrer"` to ALL `target="_blank"` links across 3 section files (OpenSource, AIProjects, Freelance) — tabnapping vulnerability closed
- [x] **Bug** — Added missing `roleJP` field to `hero.ts` — hero vertical JP text now renders correctly
- [x] **Bug** — Removed nuclear `ScrollTrigger.getAll().kill()` from HeroSection cleanup — other sections' scroll animations no longer get nuked on hot reload
- [x] **Performance** — Replaced raw `<img>` with Next.js `<Image priority>` in HeroSection — optimized WebP serving + above-fold priority loading
- [x] **Performance** — Memoized `getActiveSections()` in Navbar — computed once, used for both desktop/mobile nav
- [x] **Performance** — Scoped global CSS `transition` to exclude `canvas` and `svg` — prevents GSAP animation jitter on theme toggle
- [x] **Architecture** — Refactored `page.tsx` if-chain → `SECTION_MAP` Record pattern — future sections are now a 1-line addition
- [x] **Docs** — Updated `ARCHITECTURE.md` with OpenSourceSection + corrected date
- [x] **Lenis** — Initialized Lenis v1.3.25 via `SmoothScroll.tsx` (ReactLenis root) in `layout.tsx` — cinematic smooth scroll now active with GSAP ScrollTrigger sync
- [x] **OpenGraph** — Created and added `og-image.png` to `public/images/og/` — social share previews now show the Japanese editorial card
- [x] **BlogsSection** — Act III [ 08 ] 記事 — Japanese Editorial Broadsheet: Featured Dispatch + asymmetric editorial grid + 5 article data + Hashnode CTA

## 📋 PENDING SECTIONS (IN ORDER — see docs/SECTION_FLOW.md for full spec)

### Act II — 証明 (The Evidence)
- [x] **AIProjectsSection** (`aiProjects`)
- [x] **OpenSourceSection** (`openSource`)

### Act III — 声 (The Voice)
- [x] **BlogsSection** (`blogs`) — Japanese Editorial Broadsheet layout: Featured Dispatch strip + asymmetric editorial grid + per-article ghost kanji + Hashnode CTA card
- [ ] **TalksSection** (`talks`) — Speaking events timeline
- [ ] **PodcastSection** (`podcast`) — Audio episodes embed
- [ ] **TwitterSection** (`twitter`) — X/Twitter feed embed

### Act IV — 資格 (The Credentials)
- [ ] **EducationSection** (`education`) — Academic timeline cards
- [ ] **CertificationsSection** (`certifications`) — Certification grid
- [ ] **VolunteerSection** (`volunteer`) — Community service entries
- [ ] **TestimonialsSection** (`testimonials`) — Quote cards with avatars

### Act V — 繋がり (The Connection)
- [ ] **NewsletterSection** (`newsletter`) — Subscribe CTA
- [ ] **ContactSection** (`contact`) — Final editorial form/links

### Phase 4 — Polish (After All Sections)
- [ ] Page loading screen animation
- [ ] Mobile responsive pass (375px → 768px → 1440px)
- [ ] SEO meta tags, OpenGraph, sitemap
- [ ] Performance audit (Lighthouse 90+)
- [ ] Deploy to Vercel

---

## 📝 IMPORTANT DECISIONS LOG
| Date | Decision | Reason |
|------|----------|--------|
| 2026-07-08 | Japanese Manga/Editorial aesthetic | Prashant's dream style |
| 2026-07-08 | GSAP + Lenis over pure Framer | Better scroll control for cinematic effects |
| 2026-07-09 | JpTooltip uses React Portal | Escapes overflow:hidden, viewport-safe |
| 2026-07-09 | ProjectsSection is pure Typography | Hover images rejected to maintain clean editorial look |
| 2026-07-11 | **Day/Night Mode via Zustand** | Replaced "pure black only" rule to support dual themes (`themeStore`) |
| 2026-07-11 | **Three.js Integration** | Added `@react-three/fiber` for premium 3D decorations (`AbstractWireframe.tsx`) |
| 2026-07-11 | **Data Modularization** | Split monolithic files into `hero.ts`, `about.ts`, `twitter.ts`, etc. for scalability |
| 2026-07-11 | **AIProjectsSection Design** | Created "Manga Tech-Grid" with Hanko-stamped models and vertical Japanese numerals to distinguish from standard projects |
| 2026-07-11 | **OpenSource Redesign** | Git Commit Log / Terminal aesthetic replacing previous Experience clone for unique section identity |
| 2026-07-18 | **Audit Fix: rel attribute** | All `target="_blank"` links now use `rel="noopener noreferrer"` — closes tabnapping vulnerability |
| 2026-07-18 | **Audit Fix: page.tsx Map** | Replaced if-chain with SECTION_MAP Record — adding future sections is now a 1-liner |
| 2026-07-18 | **Audit Fix: ScrollTrigger** | HeroSection cleanup no longer calls `getAll().kill()` — scoped cleanup only |
| 2026-07-18 | **Audit Fix: Image component** | Hero character now uses Next.js `<Image priority>` — WebP optimization + no layout shift |

---

## ⚠️ KNOWN ISSUES / BLOCKERS
- None currently. All audit vulnerabilities resolved on 2026-07-18.

---

## 🔑 KEY FILE LOCATIONS
| File | Purpose |
|------|---------|
| `.agents/AGENTS.md` | AI memory + Rules — READ EVERY SESSION |
| `docs/PROGRESS.md` | This file — session status tracker |
| `docs/SECTION_FLOW.md` | Complete 5-Act section order + JP labels |
| `docs/DESIGN_SYSTEM.md` | Design bible (Colors, Types, Animations) |
| `docs/ARCHITECTURE.md` | Folder structure + Tech Stack details |
| `src/data/siteConfig.ts` | Master on/off toggle — edit here to show/hide sections |
| `src/data/sections.ts` | Section registry — edit for order/JP labels |

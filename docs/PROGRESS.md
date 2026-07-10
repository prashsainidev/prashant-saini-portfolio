# V2 Portfolio — Progress Tracker
# MANDATORY: AI agent reads this at the START of every session.
# MANDATORY: AI agent updates this at the END of every session.
# Last Updated: 2026-07-09

---

## 🎯 PROJECT GOAL
Build an award-winning, Japanese Cinematic / Editorial aesthetic personal portfolio for Prashant Saini.
Target: Awwwards / FWA level quality. Theme: Japanese manga scroll-telling experience.
Reference sites: slamdunk-five.vercel.app, bruno-simon.com, aristidebenoist.com

---

## 📍 CURRENT STATUS: PHASE 3 — BUILDING SECTIONS (Act I Complete)

**Live dev server:** `npm run dev` at `http://localhost:3000`
**Project path:** `E:\git-workspace\git-workspace-2026-onwards\v2-portfolio`
**Old portfolio (READ-ONLY reference):** `E:\git-workspace\git-workspace-2026-onwards\portfolio`

---

## ✅ COMPLETED TASKS

### Session 1 — 2026-07-08
- [x] Created project folder: `v2-portfolio`
- [x] Created `.agents/AGENTS.md` — AI memory/rules file
- [x] Created `docs/PROGRESS.md`, `docs/DESIGN_SYSTEM.md`, `docs/ARCHITECTURE.md`
- [x] Initialized Next.js 14 + TypeScript + Tailwind CSS
- [x] Installed all dependencies: gsap, framer-motion, lenis, lucide-react, clsx, tailwind-merge, zustand
- [x] Created full folder structure
- [x] Setup `tailwind.config.ts`, `globals.css`, `layout.tsx`
- [x] Created all TypeScript interfaces in `src/types/index.ts`
- [x] Created utility functions in `src/lib/utils.ts`
- [x] Created Zustand theme store in `src/lib/themeStore.ts`

### Phase 2 — Reusable UI Components ✅ COMPLETE
- [x] `CustomCursor.tsx` — Ink-drop cursor + canvas trail
- [x] `ChapterLabel.tsx` — "[ 01 ] ——— SECTION / 日本語" (with JpTooltip integration)
- [x] `KanjiAccent.tsx` — Ghost Kanji watermark
- [x] `InkStamp.tsx` — Red Japanese seal accent
- [x] `MangaPanel.tsx` — Comic panel border wrapper
- [x] `CurvyArrow.tsx` — GSAP draw-on-scroll SVG arrows
- [x] `ThemeToggle.tsx` — Day/Night toggle
- [x] `MangaWarpCanvas.tsx` — Canvas shader background
- [x] `AbstractWireframe.tsx` — 3D wireframe decorator
- [x] **`JpTooltip.tsx`** — ✨ NEW: Cinematic JP translation tooltip (portal-based, viewport-safe)
- [x] `src/components/ui/index.ts` — Barrel export

### Phase 3 — Data Layer ✅ COMPLETE
- [x] Migrated & restructured all data from old portfolio
- [x] `src/data/hero.ts` — Hero section data (name, role, kanji, socials, resume)
- [x] `src/data/about.ts` — About section data (bio, stats, traits)
- [x] `src/data/skills.ts` — Skills by category
- [x] `src/data/projects.ts` — Project entries
- [x] `src/data/experience.ts` — Work history
- [x] `src/data/education.ts` — Academic history
- [x] `src/data/certifications.ts` — Certifications
- [x] `src/data/blogs.ts` — Blog articles list
- [x] `src/data/media.ts` — Talks, Podcast, Volunteer, Twitter, Testimonials, AI Projects, Newsletter, Open Source
- [x] `src/data/siteConfig.ts` — Master on/off toggle for ALL 17 sections
- [x] `src/data/sections.ts` — **Complete 5-Act registry** with JP labels + translations

### Phase 3 — Layout & Architecture ✅ COMPLETE
- [x] `src/app/layout.tsx` — Fixed theme script, 4 Google Fonts loaded
- [x] `src/app/page.tsx` — Dynamic section renderer using `getActiveSections()`
- [x] `src/components/layout/Navbar.tsx` — Dynamic nav with JP labels (no tooltip — English already shown)

### Phase 3 — Sections Built ✅ ACT I COMPLETE
- [x] **HeroSection** `[ 00 ]` — Parallax character, 5-layer mouse-reactive, scroll reveal, JpTooltip on all JP text
- [x] **AboutSection** `[ 01 ]` — MangaWarpCanvas bg, AbstractWireframe 3D, trait cards, JpTooltip
- [x] **SkillsSection** `[ 02 ]` — GSAP physics mouse repulsion, category tabs, AnimatePresence, JpTooltip

### Phase 3 — Act II Built
- [x] **ProjectsSection** `[ 03 ]` — Horizontal cinematic scroll, GSAP velocity skew, dynamic glow, magnetic DRAG cursor, typography-focused UI
- [x] **FreelanceSection** `[ 04 ]` — ✨ NEW: Dedicated client work showcase, auto-sorting dates, responsive manga grid
- [x] **ExperienceSection** `[ 05 ]` — Manga Chapter Layout, pulsing Hanko Seal, bug fixes for overlapping watermarks, proper alternating background sequence

---

## 🔄 IN PROGRESS
- [ ] Updating docs and `.agents/AGENTS.md` before git push

---

## 📋 PENDING SECTIONS (IN ORDER — see docs/SECTION_FLOW.md for full spec)

### Act II — 証明 (The Evidence)
- [x] **ProjectsSection** `[ 03 ]` — Complete
- [ ] **AIProjectsSection** `[ 04 ]` — AI-specific projects (display: false by default)
- [ ] **WorkSection** `[ 05 ]` — Vertical GSAP timeline, career journey
- [ ] **OpenSourceSection** `[ 06 ]` — Community contributions (display: false by default)

### Act III — 声 (The Voice)
- [ ] **BlogsSection** `[ 07 ]` — Compact editorial article list
- [ ] **TalksSection** `[ 08 ]` — Speaking events timeline
- [ ] **PodcastSection** `[ 09 ]` — Audio episodes embed
- [ ] **TwitterSection** `[ 10 ]` — X/Twitter feed embed

### Act IV — 資格 (The Credentials)
- [ ] **EducationSection** `[ 11 ]` — Academic timeline cards
- [ ] **CertificationsSection** `[ 12 ]` — Certification grid
- [ ] **VolunteerSection** `[ 13 ]` — Community service entries
- [ ] **TestimonialsSection** `[ 14 ]` — Quote cards with avatars

### Act V — 繋がり (The Connection)
- [ ] **NewsletterSection** `[ 15 ]` — Subscribe CTA
- [ ] **ContactSection** `[ 16 ]` — Final editorial form/links

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
| 2026-07-08 | New project in separate directory | Don't break existing portfolio |
| 2026-07-08 | Japanese Manga/Editorial aesthetic | Prashant's dream style |
| 2026-07-08 | GSAP + Lenis over pure Framer Motion | Better scroll control for cinematic effects |
| 2026-07-08 | Vermillion Red accent (#E63946) | Authentic Japanese ink stamp color |
| 2026-07-09 | Background changed to pure #000000 | User preferred pitch black (updated from warm charcoal) |
| 2026-07-09 | Section order = Japanese narrative arc | NOT copied from old space portfolio — thematic flow |
| 2026-07-09 | JpTooltip uses React Portal | Escapes overflow:hidden, anchors to element center, viewport-safe |
| 2026-07-09 | No JpTooltip in Navbar | English label already visible — tooltip would be redundant |
| 2026-07-09 | personal.ts → split into hero.ts + about.ts | One data file per section (no cross-section imports) |
| 2026-07-09 | ProjectsSection is pure Typography | Hover images rejected to maintain clean, text-heavy editorial look |
| 2026-07-09 | ProjectsSection Custom DRAG Cursor | Added Cuberto-style magnetic DRAG cursor for horizontal scroll |

---

## ⚠️ KNOWN ISSUES / BLOCKERS
- None currently

---

## 🔑 KEY FILE LOCATIONS
| File | Purpose |
|------|---------|
| `.agents/AGENTS.md` | AI memory — READ EVERY SESSION |
| `docs/PROGRESS.md` | This file — session status tracker |
| `docs/SECTION_FLOW.md` | **NEW** — Complete 5-Act section order + JP labels |
| `docs/DESIGN_SYSTEM.md` | Design bible — read before any CSS |
| `docs/ARCHITECTURE.md` | Folder structure + naming rules |
| `src/data/siteConfig.ts` | Master on/off toggle — edit here to show/hide sections |
| `src/data/sections.ts` | Section registry — edit for order/JP labels |
| `src/app/page.tsx` | Dynamic section renderer — add new sections here |

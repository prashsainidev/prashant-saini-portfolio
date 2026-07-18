# V2 Portfolio — Technical Architecture
# READ THIS before creating any new files or folders.
# Last Updated: 2026-07-18

---

## 🗂️ COMPLETE FOLDER STRUCTURE

```
v2-portfolio/
├── .agents/
│   └── AGENTS.md                    ← AI rules (read every session)
│
├── docs/
│   ├── PROGRESS.md                  ← Session tracker (read & update every session)
│   ├── DESIGN_SYSTEM.md             ← Design bible (read before any styling)
│   ├── SECTION_FLOW.md              ← 5-Act narrative architecture & registry
│   └── ARCHITECTURE.md              ← This file
│
├── public/
│   ├── fonts/                       ← Local font files if needed
│   ├── images/
│   │   ├── illustrations/           ← SVG illustrations
│   │   └── og/                      ← OpenGraph images
│   └── favicon.ico
│
├── src/
│   ├── app/                         ← Next.js App Router
│   │   ├── layout.tsx               ← Root layout (Lenis, fonts, metadata, cursor)
│   │   ├── page.tsx                 ← Home page (assembles all sections dynamically)
│   │   └── globals.css              ← Base CSS reset + CSS Day/Night custom properties
│   │
│   ├── components/
│   │   ├── layout/                  ← Layout-level components
│   │   │   └── Navbar.tsx           ← Navigation bar (dynamic based on sections)
│   │   │
│   │   ├── ui/                      ← Reusable UI primitives
│   │   │   ├── AbstractWireframe.tsx← 3D wireframe decorator (Three.js)
│   │   │   ├── ChapterLabel.tsx     ← "01 / EXPERIENCE" style labels
│   │   │   ├── CurvyArrow.tsx       ← GSAP-drawn SVG connecting arrows
│   │   │   ├── CustomCursor.tsx     ← Ink-drop cursor with canvas trail
│   │   │   ├── InkStamp.tsx         ← Red stamp accent element
│   │   │   ├── JpTooltip.tsx        ← Cinematic JP translation tooltip (Portal)
│   │   │   ├── KanjiAccent.tsx      ← Reusable Kanji text component
│   │   │   ├── MangaPanel.tsx       ← Comic panel grid layout component
│   │   │   ├── MangaWarpCanvas.tsx  ← Canvas shader background
│   │   │   ├── SmoothScroll.tsx     ← Lenis root provider (ReactLenis + GSAP ScrollTrigger sync)
│   │   │   ├── ThemeToggle.tsx      ← Day/Night toggle
│   │   │   └── index.ts             ← Barrel export
│   │   │
│   │   └── sections/                ← Each portfolio section
│   │       ├── AboutSection.tsx     ← Section 01: Comic panel bio
│   │       ├── AIProjectsSection.tsx← Section 05: Manga Tech-Grid for AI
│   │       ├── BlogsSection.tsx     ← Section 08: Japanese Editorial Broadsheet
│   │       ├── ExperienceSection.tsx← Section 06: GSAP vertical timeline
│   │       ├── FreelanceSection.tsx ← Section 04: Client work showcase
│   │       ├── HeroSection.tsx      ← Section 00: Manga title splash
│   │       ├── OpenSourceSection.tsx← Section 07: Git commit log / terminal aesthetic
│   │       ├── ProjectsSection.tsx  ← Section 03: Horizontal scroll gallery
│   │       └── SkillsSection.tsx    ← Section 02: Editorial tech grid
│   │
│   ├── data/                        ← ALL CONTENT DATA (never hardcode in components)
│   │   ├── about.ts                 ← Bio, stats, traits
│   │   ├── aiProjects.ts            ← AI-specific projects
│   │   ├── blogs.ts                 ← Blog/article list
│   │   ├── certifications.ts        ← Certificates with images/links
│   │   ├── contact.ts               ← Contact info
│   │   ├── education.ts             ← Degrees and academic info
│   │   ├── experience.ts            ← Work history with timeline data
│   │   ├── freelance.ts             ← Client work entries
│   │   ├── hero.ts                  ← Hero data (name, role, resume)
│   │   ├── newsletter.ts            ← Newsletter CTA data
│   │   ├── openSource.ts            ← OSS contributions
│   │   ├── podcast.ts               ← Podcast episodes
│   │   ├── projects.ts              ← All projects with full details
│   │   ├── sections.ts              ← 5-Act Registry (Order, JP labels, Config keys)
│   │   ├── siteConfig.ts            ← Master on/off display toggles for sections
│   │   ├── skills.ts                ← Tech stack organized by category
│   │   ├── talks.ts                 ← Speaking events
│   │   ├── testimonials.ts          ← Endorsements
│   │   ├── twitter.ts               ← Social feed data
│   │   └── volunteer.ts             ← Community service
│   │
│   ├── hooks/                       ← Custom React hooks (empty if using pure libs)
│   │
│   ├── lib/                         ← Utilities and State Stores
│   │   ├── fetchBlogs.ts            ← Hashnode/Dev.to API fetcher
│   │   ├── navStore.ts              ← Zustand store for mobile menu state
│   │   ├── themeStore.ts            ← Zustand store for Day/Night mode state
│   │   └── utils.ts                 ← General utility functions (cn, clamp, etc.)
│   │
│   └── types/                       ← TypeScript interfaces
│       └── index.ts                 ← All shared types
│
├── .cursorrules                     ← IDE AI Rules
├── .husky/                          ← Git hooks
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 📏 NAMING CONVENTIONS

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `HeroSection.tsx` |
| Hooks | camelCase with `use` prefix | `useLenis.ts` |
| Data files | camelCase | `experience.ts` |
| CSS classes | kebab-case | `section-wrapper` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_WIDTH` |
| TypeScript interfaces | PascalCase with `I` prefix | `IProject` |
| TypeScript types | PascalCase with `T` prefix | `TSkillCategory` |

---

## 🔧 KEY TECHNICAL PATTERNS

### 1. Data → Component Pattern (MANDATORY)
```typescript
// ✅ CORRECT: Data from src/data/, passed as props or imported directly
import { experienceData } from '@/data/experience';
<ExperienceSection data={experienceData} />

// ❌ WRONG: Hardcoded content inside component
const ExperienceSection = () => (
  <div>FlyRank AI — AI Engineer Intern 2025</div>
)
```

### 2. State Management (Zustand)
Global state is managed via lightweight Zustand stores in `src/lib/`.
- `themeStore.ts`: Manages Day/Night mode. Toggles the `.dark` class on `<html>`.
- `navStore.ts`: Manages mobile menu open/close state.

### 3. GSAP ScrollTrigger Pattern
```typescript
// Always use useGSAP hook from @gsap/react for cleanup safety
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

useGSAP(() => {
  gsap.from('.target', {
    opacity: 0, y: 60,
    scrollTrigger: { trigger: '.target', start: 'top 80%' }
  });
}, []);
```

### 4. Tailwind + Custom CSS Variables (Day/Night Mode)
```
- Use Tailwind for: spacing, flex/grid, responsive breakpoints, structural colors.
- Use Custom CSS (globals.css) for: Day/Night mode tokens (`var(--bg-primary)`), complex animations, clip-paths, writing-mode (vertical Japanese text).
```

---

## 🚀 DEPENDENCIES LIST

### Core
- `next` (14+) — Framework
- `react` + `react-dom` — UI library
- `typescript` — Type safety

### Styling
- `tailwindcss` — Utility CSS
- `clsx` + `tailwind-merge` — Conditional class names

### Animation & 3D
- `gsap` — Core animation engine
- `@gsap/react` — React GSAP hooks (useGSAP)
- `framer-motion` — Micro-animations
- `lenis` — Smooth scroll
- `three` + `@react-three/fiber` + `@react-three/drei` — WebGL & 3D components

### UI
- `lucide-react` — Icon library

### State & Utils
- `zustand` — Global state management

### CI/CD & Formatting
- `husky` — Pre-commit git hooks
- `lint-staged` — Run linters on staged files
- `eslint` + `prettier` — Code quality & formatting

---

## ⚡ PERFORMANCE RULES

1. All images: use Next.js `<Image>` component — NEVER `<img>` tag
2. Fonts: use Next.js `next/font/google` — NEVER link tags in HTML
3. GSAP: always cleanup animations in `useGSAP` — prevent memory leaks
4. Lenis: single instance only, created in root layout
5. Heavy sections (Projects, Hero): lazy-load with `React.lazy` + `Suspense` (if performance degrades)
6. Kanji background watermarks: CSS `content` property or `aria-hidden` spans — NOT real DOM text for screen readers

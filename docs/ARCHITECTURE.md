# V2 Portfolio — Technical Architecture
# READ THIS before creating any new files or folders.
# Last Updated: 2026-07-08

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
│   │   ├── layout.tsx               ← Root layout (Lenis, fonts, metadata)
│   │   ├── page.tsx                 ← Home page (assembles all sections)
│   │   └── globals.css              ← Base CSS reset + CSS custom properties
│   │
│   ├── components/
│   │   ├── layout/                  ← Layout-level components
│   │   │   ├── Navbar.tsx           ← Navigation bar
│   │   │   └── Footer.tsx           ← Site footer
│   │   │
│   │   ├── ui/                      ← Reusable UI primitives
│   │   │   ├── CustomCursor.tsx     ← Ink-drop cursor with canvas trail
│   │   │   ├── CurvyArrow.tsx       ← GSAP-drawn SVG connecting arrows
│   │   │   ├── KanjiAccent.tsx      ← Reusable Kanji text component
│   │   │   ├── ChapterLabel.tsx     ← "01 / EXPERIENCE" style labels
│   │   │   ├── SectionWrapper.tsx   ← Handles scroll reveal animations
│   │   │   ├── MangaPanel.tsx       ← Comic panel grid layout component
│   │   │   └── InkStamp.tsx         ← Red stamp accent element
│   │   │
│   │   └── sections/                ← Each portfolio section
│   │       ├── HeroSection.tsx      ← Section 01: Manga title splash
│   │       ├── AboutSection.tsx     ← Section 02: Comic panel bio
│   │       ├── ExperienceSection.tsx← Section 03: GSAP vertical timeline
│   │       ├── ProjectsSection.tsx  ← Section 04: Horizontal scroll gallery
│   │       ├── SkillsSection.tsx    ← Section 05: Editorial tech grid
│   │       ├── EducationSection.tsx ← Section 06: Academic cards
│   │       ├── CertSection.tsx      ← Section 07: Certificate masonry
│   │       ├── BlogsSection.tsx     ← Section 08: Compact editorial list
│   │       ├── ContactSection.tsx   ← Section 09: Layered editorial form
│   │       └── LoadingScreen.tsx    ← Initial loading animation
│   │
│   ├── data/                        ← ALL CONTENT DATA (never hardcode in components)
│   │   ├── personal.ts              ← Bio, socials, resume, contact
│   │   ├── experience.ts            ← Work history with timeline data
│   │   ├── projects.ts              ← All projects with full details
│   │   ├── skills.ts                ← Tech stack organized by category
│   │   ├── education.ts             ← Degrees and academic info
│   │   ├── certifications.ts        ← Certificates with images/links
│   │   ├── blogs.ts                 ← Blog/article list
│   │   └── siteConfig.ts            ← Nav links, metadata, site-wide config
│   │
│   ├── hooks/                       ← Custom React hooks
│   │   ├── useLenis.ts              ← Lenis smooth scroll instance
│   │   ├── useGSAP.ts               ← GSAP context hook
│   │   └── useMousePosition.ts      ← For custom cursor tracking
│   │
│   ├── lib/                         ← Utilities and helpers
│   │   ├── gsap.ts                  ← GSAP + plugins initialization
│   │   └── utils.ts                 ← General utility functions (cn, clamp, etc.)
│   │
│   └── types/                       ← TypeScript interfaces
│       └── index.ts                 ← All shared types
│
├── .cursorrules                     ← Cursor IDE rules
├── .gitignore
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
// ✅ CORRECT: Data from src/data/, passed as props
import { experienceData } from '@/data/experience';
<ExperienceSection data={experienceData} />

// ❌ WRONG: Hardcoded content inside component
const ExperienceSection = () => (
  <div>FlyRank AI — AI Engineer Intern 2025</div>
)
```

### 2. GSAP ScrollTrigger Pattern
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

### 3. Lenis + GSAP Integration
```typescript
// In layout.tsx — Lenis must tick GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
```

### 4. Tailwind + Custom CSS Pattern
```
- Use Tailwind for: spacing, flex/grid, responsive breakpoints, basic colors
- Use Custom CSS (globals.css) for: complex animations, CSS custom properties,
  clip-paths, writing-mode (vertical Japanese text), complex pseudo-elements
```

---

## 🚀 DEPENDENCIES LIST

### Core
- `next` — Framework
- `react` + `react-dom` — UI library
- `typescript` — Type safety

### Styling
- `tailwindcss` — Utility CSS
- `clsx` + `tailwind-merge` — Conditional class names

### Animation
- `gsap` — Core animation engine
- `@gsap/react` — React GSAP hooks (useGSAP)
- `framer-motion` — Micro-animations
- `lenis` — Smooth scroll

### UI
- `lucide-react` — Icon library

### Utils
- `zustand` — State management (if needed)

---

## ⚡ PERFORMANCE RULES

1. All images: use Next.js `<Image>` component — NEVER `<img>` tag
2. Fonts: use Next.js `next/font/google` — NEVER link tags in HTML
3. GSAP: always cleanup animations in `useGSAP` — prevent memory leaks
4. Lenis: single instance only, created in root layout
5. Heavy sections (Projects, Hero): lazy-load with `React.lazy` + `Suspense`
6. Kanji background watermarks: CSS `content` property or `aria-hidden` spans — NOT real DOM text for screen readers

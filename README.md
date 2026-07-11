# Prashant Saini — V2 Portfolio

An award-winning, Japanese Manga / Editorial aesthetic personal portfolio built for performance, cinematic scroll-telling, and premium UI/UX.

## 🚀 Tech Stack

- **Framework:** Next.js 14+ (App Router) + TypeScript
- **Styling:** Tailwind CSS + Custom CSS (Day/Night mode via CSS vars)
- **Animations:** GSAP + ScrollTrigger + Framer Motion
- **3D / Canvas:** Three.js + React Three Fiber
- **State Management:** Zustand
- **Smooth Scroll:** Lenis
- **Code Quality:** ESLint, Prettier, Husky, lint-staged

## 🛠️ Development Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3. **Pre-commit Hooks:**
   This project uses Husky to automatically run ESLint and Prettier on staged files before every commit. You do not need to format manually.

## 📁 Architecture Overview

- `src/components/sections/`: Core portfolio sections (Hero, About, Experience, etc.)
- `src/components/ui/`: Reusable primitives (CustomCursor, MangaWarpCanvas, ThemeToggle, etc.)
- `src/data/`: All content data. **No content is hardcoded in components.**
- `docs/`: Extensive project documentation.

## 📖 Documentation

Before contributing or using AI assistants on this repository, you **must** read the documentation in this order:

1. `docs/PROGRESS.md`
2. `docs/SECTION_FLOW.md`
3. `docs/DESIGN_SYSTEM.md`
4. `docs/ARCHITECTURE.md`

## 🚀 Deployment

Deployable to Vercel with zero configuration required. The build script automatically handles static page generation.

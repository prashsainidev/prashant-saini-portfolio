# V2 Portfolio — Agent Instructions (AI Memory File)
# Antigravity AI reads this automatically at the start of every session.
# Last Updated: 2026-07-11

---

## WHO IS PRASHANT?
- Full-stack developer: React.js, Node.js, JavaScript, TypeScript
- Location: Aligarh, India
- Vision: Build an AWARD-WINNING personal portfolio with Japanese Cinematic aesthetic
- Current project: `E:\git-workspace\git-workspace-2026-onwards\v2-portfolio`
- Old portfolio (READ-ONLY reference): `E:\git-workspace\git-workspace-2026-onwards\portfolio`

---

## PRASHANT'S PERSONALITY & PREFERENCES
- Loves Japanese culture (manga, anime aesthetic, Kanji typography)
- Wants a "cinematic scroll-telling" experience — NOT boring static pages
- Wants: each section to feel like a unique manga chapter
- Hates: eye strain, poor alignment, oversized UI, copying old designs
- Career goal: Get selected at top companies — portfolio must reflect senior-level craft

---

## THE GOLDEN RULES (NEVER BREAK THESE)
1. NEVER make major decisions independently — always present options and ask Prashant.
2. NEVER hardcode content in UI components — always use `src/data/` files.
3. NEVER copy old portfolio UI/UX — use old data as reference ONLY.
4. ALWAYS read `docs/PROGRESS.md` before starting any work to understand recent decisions and pending tasks.
5. ALWAYS read `docs/SECTION_FLOW.md` to understand section architecture before building.
6. ALWAYS read `docs/DESIGN_SYSTEM.md` before writing any CSS. ALL UI must use existing tokens.
7. ALWAYS read `docs/ARCHITECTURE.md` before creating new files to understand the tree and state management.
8. NEVER install a library without explaining its purpose and trade-offs.
9. ALWAYS consider long-term maintainability in every architectural decision.
10. ALWAYS write Mobile-First CSS — design for 375px first, enhance upward.
11. NEVER create boring, generic, or minimum-viable-product designs.
12. ALWAYS wrap standalone Japanese text (with no nearby English) in `<JpTooltip>`.

---

## TECH STACK (FINAL — DO NOT DEVIATE)
| Layer             | Technology                                      |
|-------------------|-------------------------------------------------|
| Framework         | Next.js 14+ (App Router) + TypeScript           |
| Styling           | Tailwind CSS + Custom CSS (`globals.css`)       |
| Scroll Animation  | GSAP + ScrollTrigger                            |
| Smooth Scroll     | Lenis                                           |
| Micro-animations  | Framer Motion + AnimatePresence                 |
| 3D / Canvas       | Three.js + React Three Fiber + Drei             |
| Icons             | Lucide React                                    |
| State             | Zustand (`themeStore`, `navStore`)              |
| Data              | Modular TypeScript files in `src/data/`         |
| CI/CD & Linting   | Husky + Lint-Staged + ESLint + Prettier         |

---

## DESIGN DIRECTION (FINAL — DO NOT DEVIATE)
- Style: Cinematic Japanese Editorial Portfolio
- Theme System: Day/Night Mode via Zustand (`themeStore`) and `.dark` class toggling.
- Primary Accent: Vermillion Red (`#E63946`) — traditional Japanese ink stamp
- Secondary: Gold/Cream (`#F5E6C8`) — aged parchment
- Typography: Massive bold condensed headlines + Noto Sans JP (Kanji)
- Layout: Manga panel composition — structured asymmetry
- Cursor: Custom ink-drop cursor with canvas trail
- Sections flow like a manga story arc — not isolated pages
- Ghost typography (massive faded words) + Kanji watermarks in every section

---

## JAPANESE TOOLTIP SYSTEM (JpTooltip)
- Component: `src/components/ui/JpTooltip.tsx`
- Uses React Portal (renders in document.body) — escapes ALL overflow:hidden
- Anchors to CENTER of the element — does NOT follow mouse cursor
- Auto-flips BELOW element if near top of viewport
- Left/right clamped to viewport — never goes off-screen
- Shows: "JP → EN" label + translation + optional hint
- **Rule: ONLY use on standalone Japanese text. If English is already visible, NO tooltip.**

---

## COMMENTING GUIDELINES (HUMAN-CENTRIC)
1. **Explain the WHY, not the WHAT**: Don't write `// Maps over projects`. Write `// Rendering horizontally to create a cinematic film-strip effect.`
2. **Avoid AI Robotic Tone**: Never use generic comments like "This function handles the logic for...". 
3. **Use Developer Pragmatism**: Write comments like a senior developer leaving breadcrumbs for a junior: `// Hack: GSAP ScrollTrigger breaks if we don't pin the container here.`
4. **No Over-commenting**: Don't comment obvious React/Tailwind code. Only comment complex logic, math, refs, or CSS hacks.
5. **Section Dividers**: Use clean, ASCII-style dividers for major sections, e.g., `/* ── GSAP Animations ── */`

---

## SECTION ARCHITECTURE (5-ACT JAPANESE NARRATIVE)
See `docs/SECTION_FLOW.md` for complete spec. Act I and Act II are currently mostly built.

---

## DATA STRUCTURE
`src/data/` is strictly modular. ONE concept = ONE file.
(e.g., `hero.ts`, `about.ts`, `projects.ts`, `skills.ts`, `blogs.ts`, `siteConfig.ts`, `sections.ts`).
Never mix imports (e.g., don't import `hero.ts` into the About component).

---

## SECTION DESIGN CONSISTENCY RULES (Every Section Must Follow)
1. `<ChapterLabel>` at top with `labelJP` + `labelTranslation` props
2. Ghost chapter number (right-aligned, massive, opacity 0.03)
3. Ghost word + Kanji watermark in background (unique per section)
4. `1px solid var(--border)` top divider
5. Animated `scaleX` bottom divider
6. `padding: clamp(3rem, 6vh, 6rem) clamp(1.5rem, 5vw, 6rem)`
7. `useInView` + Framer Motion `staggerChildren` for reveal animations
8. `<JpTooltip>` on ALL standalone Japanese text

---

## 🛑 SESSION END PROTOCOL
Before finishing any work session, you MUST execute the following steps:
1. **Verify**: Ensure the development server (`npm run dev`) builds and runs without errors. Check for TS, ESLint, or runtime hydration issues.
2. **Sync documentation**:
   a. `docs/PROGRESS.md` — check off completed sections, update the "In Progress" list, log any major decisions in the Decisions Log.
   b. `docs/ARCHITECTURE.md` — if any file, component, hook, or data file was added, removed, or renamed this session, update the folder tree to match exactly.
   c. `docs/DESIGN_SYSTEM.md` — if any color, spacing, or token value was changed or added this session, update it here.
3. **Commit & Push (if requested)**: If the user approves, stage files, run standard commit messages, and push to GitHub. Husky will automatically run Prettier and ESLint.
4. **Summarize**: Give the user a clear, non-robotic summary of what was completed and ask for the next direction.

Never tell the user a task is complete without doing the above checks first — doc updates are part of the task, not a separate step.

---

## PROJECT STATUS
→ ALWAYS read `docs/PROGRESS.md` for current session state before proceeding.

# V2 Portfolio — Agent Instructions (AI Memory File)
# Antigravity AI reads this automatically at the start of every session.
# Last Updated: 2026-07-09

---

## WHO IS PRASHANT?
- Full-stack developer: React.js, Node.js, JavaScript, TypeScript
- Location: Aligarh, India
- Vision: Build an AWARD-WINNING personal portfolio with Japanese Cinematic aesthetic
- Current project: `E:\git-workspace\git-workspace-2026-onwards\v2-portfolio`
- Old portfolio (READ-ONLY reference): `E:\git-workspace\git-workspace-2026-onwards\portfolio`
- Data source reference: `E:\git-workspace\git-workspace-till-2025\my-all-projects\latest-portfolio\src\portfolio.js`

---

## PRASHANT'S PERSONALITY & PREFERENCES
- Loves Japanese culture (manga, anime aesthetic, Kanji typography)
- Wants a "cinematic scroll-telling" experience — NOT boring static pages
- Wants: each section to feel like a unique manga chapter
- Hates: eye strain, poor alignment, oversized UI, copying old designs
- Background: pure pitch black `#000000`
- Career goal: Get selected at top companies — portfolio must reflect senior-level craft

---

## THE GOLDEN RULES (NEVER BREAK THESE)
1. NEVER make major decisions independently — always present options and ask Prashant
2. NEVER hardcode content in UI components — always use `src/data/` files
3. NEVER copy old portfolio UI/UX — use old data as reference ONLY
4. ALWAYS read `docs/PROGRESS.md` before starting any work in a new session
5. ALWAYS update `docs/PROGRESS.md` after completing any task
6. ALWAYS think and act like a 20-year senior UI/UX + Product Engineer
7. NEVER install a library without explaining its purpose and trade-offs
8. ALWAYS consider long-term maintainability in every architectural decision
9. ALWAYS write Mobile-First CSS — design for 375px first, enhance upward
10. NEVER create boring, generic, or minimum-viable-product designs
11. ALWAYS read `docs/DESIGN_SYSTEM.md` before writing any CSS/Tailwind
12. ALWAYS read `docs/SECTION_FLOW.md` to understand section order before building
13. ALWAYS wrap standalone Japanese text (with no nearby English) in `<JpTooltip>`
14. NEVER add JpTooltip where English label is already visible (e.g., Navbar links)

---

## TECH STACK (FINAL — DO NOT DEVIATE)
| Layer             | Technology                                      |
|-------------------|-------------------------------------------------|
| Framework         | Next.js 14+ (App Router) + TypeScript           |
| Styling           | Tailwind CSS + Custom CSS                       |
| Scroll Animation  | GSAP + ScrollTrigger                            |
| Smooth Scroll     | Lenis                                           |
| Micro-animations  | Framer Motion + AnimatePresence                 |
| Canvas Effects    | HTML5 Canvas (custom cursor, ink-trail)         |
| Icons             | Lucide React                                    |
| State             | Zustand                                         |
| Data              | Modular TypeScript files in `src/data/`         |

---

## DESIGN DIRECTION (FINAL — DO NOT DEVIATE)
- Style: Cinematic Japanese Editorial Portfolio
- Background: Pure pitch black `#000000`
- Accent: Vermillion Red (`#E63946`) — traditional Japanese ink stamp
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
See `docs/SECTION_FLOW.md` for complete spec.

### Quick Reference:
```
[ 00 ] HERO          — Curtain opens
[ 01 ] ABOUT         — The Origin Story          ✅ BUILT
[ 02 ] SKILLS        — The Arsenal               ✅ BUILT
[ 03 ] PROJECTS      — The Evidence              ← NEXT
[ 04 ] AI PROJECTS   — AI & Automations
[ 05 ] WORK          — Career Journey
[ 06 ] OPEN SOURCE   — Community Code
[ 07 ] BLOGS         — Writings
[ 08 ] TALKS         — Speaking Events
[ 09 ] PODCAST       — Audio
[ 10 ] TWITTER       — Live Feed
[ 11 ] EDUCATION     — Academic Roots
[ 12 ] CERTIFICATIONS— Formal Seals
[ 13 ] VOLUNTEER     — Community Service
[ 14 ] TESTIMONIALS  — Social Proof
[ 15 ] NEWSLETTER    — Stay Updated
[ 16 ] CONTACT       — The Portal
```

---

## DATA STRUCTURE
```
src/data/
├── hero.ts           ← Hero section data ONLY
├── about.ts          ← About section data ONLY
├── skills.ts         ← Skills by category
├── projects.ts       ← All projects
├── experience.ts     ← Work history
├── education.ts      ← Academic background
├── certifications.ts ← Certificates
├── blogs.ts          ← Articles list
├── media.ts          ← Talks, Podcast, Volunteer, Twitter, Testimonials, AI Projects, Newsletter, Open Source
├── siteConfig.ts     ← Master on/off toggle for ALL sections
└── sections.ts       ← Registry: order, JP labels, translations, configKeys
```

**RULE: ONE data file per section concept. Never import hero.ts data into about component.**

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

## PROJECT STATUS
→ ALWAYS read `docs/PROGRESS.md` for current session state before proceeding.
→ ALWAYS update `docs/PROGRESS.md` after completing any session work.
→ ALWAYS read `docs/SECTION_FLOW.md` before building any new section.

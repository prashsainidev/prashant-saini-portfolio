# V2 Portfolio — Design System Bible
# READ THIS before writing any CSS, Tailwind class, or component styling.
# Last Updated: 2026-07-11

---

## 🎨 AESTHETIC PHILOSOPHY

This portfolio is designed like a **premium Japanese manga art book** that is also a developer portfolio.

Core principles:
1. **Ma (間)** — Japanese concept of negative space. Every section breathes. Never crowd.
2. **Wabi-sabi** — Embrace structured asymmetry. Not everything is centered. Grids are intentional.
3. **Cinematic Scroll-Telling** — The user is reading a manga story arc, not visiting a website.
4. **Typography IS the design** — Massive headlines are the primary visual element.
5. **Ink on paper** — Warm dark backgrounds in Night mode, warm paper in Day mode.

---

## 🎨 COLOR PALETTE (DAY/NIGHT THEME)

The portfolio supports Day and Night modes toggled via `ThemeToggle.tsx` which manages the `.dark` class on the `<html>` element. **Never hardcode hex values for backgrounds/text**. Always use CSS variables.

### CSS Variables (from `globals.css`)
```css
/* BACKGROUNDS */
--bg-primary:      /* Day: #f5f0e8 (warm paper) | Night: #0d0d0b (warm ink black) */
--bg-secondary:    /* Day: #ede8de (slightly darker paper) | Night: #141412 (slightly lighter ink) */
--bg-card:         /* Day: #fdfaf5 | Night: #1a1a17 */
--bg-overlay:      /* Day: rgba(245, 240, 232, 0.92) | Night: rgba(13, 13, 11, 0.92) */

/* TEXT */
--text-primary:    /* Day: #1a1512 | Night: #f0ebe0 */
--text-secondary:  /* Day: #5c4f42 | Night: #a89880 */
--text-dim:        /* Day: #9c8e82 | Night: #5c5449 */

/* ACCENT COLORS (Identical across both themes) */
--accent-red:      #e63946   /* Vermillion Red — primary accent (Japanese ink stamp) */
--accent-gold:     #c9a96e   /* Aged parchment gold — secondary accent */
--accent-blue:     #4a90d9   /* Tech blue */

/* KANJI / DECORATIVE */
--kanji-ghost:     rgba(var(--text-primary-rgb), 0.03) /* Ghost kanji background text */
```

### Tailwind Configuration (`tailwind.config.ts`)
While CSS variables handle the dynamic Day/Night switching, the static token palettes are available in Tailwind if needed for specific static elements:
```js
colors: {
  ink: { black: '#0D0D0B', dark: '#141412', card: '#1A1A17' },
  parchment: { primary: '#F0EBE0', secondary: '#A89880', dim: '#5C5449' },
  vermillion: { DEFAULT: '#E63946', dark: '#C1121F', light: '#FF6B6B' },
  gold: { DEFAULT: '#F5E6C8', dark: '#C9A96E' }
}
```

---

## 🔤 TYPOGRAPHY

### Font Stack
| Usage | Font | Weight | Import |
|-------|------|--------|--------|
| Hero headlines | Space Grotesk | 700, 800 | Google Fonts |
| Body text | Space Grotesk | 300, 400 | Google Fonts |
| Japanese Kanji | Noto Sans JP | 300, 700, 900 | Google Fonts |
| Decorative cursive | Dancing Script or Kaushan Script | 400, 600 | Google Fonts |
| Code snippets | JetBrains Mono | 400 | Google Fonts |

### Type Scale
```css
/* Hero title — MASSIVE. Typography IS the design */
.text-hero:     font-size: clamp(4rem, 12vw, 14rem);  font-weight: 800;
.text-section:  font-size: clamp(2.5rem, 6vw, 7rem);  font-weight: 700;
.text-card:     font-size: clamp(1.25rem, 2vw, 1.75rem); font-weight: 600;
.text-body:     font-size: clamp(0.9rem, 1.2vw, 1.1rem); font-weight: 300;
.text-caption:  font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase;
.text-kanji:    font-family: 'Noto Sans JP'; font-size: clamp(4rem, 10vw, 12rem);
```

### Typography Rules
- Section titles ALWAYS start with a chapter number (e.g., "01 / EXPERIENCE")
- Japanese labels ALWAYS appear alongside English text (translation or related concept)
- Kanji are used as LARGE background watermarks (low opacity) AND as small accent labels
- NEVER use default browser fonts
- Letter spacing on uppercase labels: 0.2em minimum

---

## 🎬 ANIMATION PRINCIPLES

### GSAP Rules
- **Easing**: Use `power3.out` for entrances, `power2.inOut` for transitions
- **Duration**: 0.6s for micro-interactions, 1.2s for section reveals, 2s for hero animations
- **Stagger**: 0.1s between sibling elements in lists
- **ScrollTrigger**: Always use `start: "top 80%"` for reveal triggers
- **Curvy Arrows**: Use SVG `<path>` with GSAP's `drawSVG` plugin — draws on scroll

### Framer Motion Rules
- **Hover effects**: Scale 1.02, subtle translateY -4px
- **Click effects**: Scale 0.98
- **Page transitions**: Opacity 0→1, translateY 20px→0px
- **Card hover**: Subtle border color shift + soft glow

### Lenis Configuration
```js
{
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
}
```

---

## 📐 SPACING & LAYOUT

### Section Anatomy
```
[CHAPTER LABEL]     "01 / 経験"           ← Top-left, small uppercase
[KANJI WATERMARK]   Large ghost kanji     ← Background, 3-5% opacity
[SECTION TITLE]     EXPERIENCE            ← Massive bold headline
[CONTENT AREA]      Comic panel layout    ← The actual content
[CURVY ARROW]       GSAP-drawn SVG        ← Connecting to next section
```

### Grid System
- Use CSS Grid and Flexbox — NOT just Tailwind `flex` classes
- Main content max-width: 1440px, centered
- Horizontal padding: clamp(1.5rem, 5vw, 6rem)
- Section padding: clamp(4rem, 10vh, 8rem) top and bottom

### Comic Panel Layouts
- Asymmetric grids (e.g., 60/40, 70/30) are preferred over 50/50
- Panels can overlap slightly for the manga "layered" feel
- Use thick border lines (2-3px) to define panel edges in editorial sections

---

## 🖱️ CUSTOM CURSOR (INK DROP)

The cursor replaces the default browser cursor:
- **Default state**: Small circle (12px), filled vermillion
- **Hover on links/buttons**: Expands to 40px ring with vermillion border
- **Click**: Ink-drop splash animation (canvas particle burst)
- **Trail**: Subtle ink-drop particles that follow and fade
- **Drag**: Horizontal resize indicator for scrollable sections like Projects.

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile:  375px  — design starts here (mobile-first)
Tablet:  768px  — md: breakpoint
Desktop: 1024px — lg: breakpoint
Wide:    1440px — xl: breakpoint (max-width container)
```

### Mobile Rules
- Kanji watermarks: reduce opacity to 0 on mobile (performance)
- Hero text: scaled down but still impactful
- Horizontal scroll sections: convert to vertical on mobile
- Comic panel grids: stack to single column on mobile

---

## ✨ SIGNATURE ELEMENTS (MAKE THESE PERFECT)

### 1. Curvy Manga Arrows
- SVG `<path>` with bezier curves connecting sections
- GSAP `drawSVG` plugin draws them as user scrolls
- Color: vermillion (#E63946) with 60% opacity
- Stroke width: 2px with a small arrowhead at the end

### 2. Chapter Markers
- Format: `[ 01 ] ——— SECTION NAME / 日本語`
- Font: uppercase, 0.75rem, letter-spacing 0.25em
- Always positioned top-left or top-right of section

### 3. Ghost Kanji Watermarks
- Massive Japanese characters behind section content
- Opacity: 3-5% — barely visible, textural
- Related to section theme (e.g., 経験 for Experience, 仕事 for Projects)

### 4. Ink Stamp Accents
- Small circular/rectangular red stamps on cards
- Contains a single Kanji character relevant to the item
- Acts as a visual "seal of authenticity"

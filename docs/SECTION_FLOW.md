# SECTION_FLOW.md — The Grand Cinematic Sequence
# This is the FINAL, AUTHORITATIVE section order for the Japanese-theme portfolio.
# It is NOT copied from the old space portfolio — it is a FRESH, THEMATIC narrative.
# Old portfolio was only referenced to know WHAT sections exist — not their order.
# Last Updated: 2026-07-09

---

## 🎬 The 5-Act Cinematic Structure

The portfolio reads like a Japanese manga story arc. Each "Act" is a chapter.
Every section has:
- A unique `id` (maps to `<section id="">` in the DOM)
- A `siteConfig` key to toggle it on/off
- A JP label with English translation (for `JpTooltip`)
- An auto-calculated chapter number from `getActiveSections()`

---

## Act I — 序幕 (The Prologue / Foundation)
*Who are you? Set the stage.*

| # | ID | Label | JP | Translation | configKey |
|---|---|---|---|---|---|
| 00 | `hero` | Hero | ポートフォリオ | Portfolio | `hero` |
| 01 | `about` | About | 私について | About Me | `about` |
| 02 | `skills` | Skills | 武器 | Weapons / Skills | `skills` |

---

## Act II — 証明 (The Evidence / Proof of Craft)
*Show your work. Prove your capabilities.*

| # | ID | Label | JP | Translation | configKey |
|---|---|---|---|---|---|
| 03 | `projects` | Projects | 作品 | Projects / Works | `projects` |
| 04 | `aiProjects` | AI Projects | 人工知能 | AI & Automations | `aiProjects` |
| 05 | `work` | Experience | 経験 | Work Experience | `work` |
| 06 | `openSource` | Open Source | 共有 | Community Code | `openSource` |

---

## Act III — 声 (The Voice / Public Presence)
*How do you contribute beyond code? Your intellectual output.*

| # | ID | Label | JP | Translation | configKey |
|---|---|---|---|---|---|
| 07 | `blogs` | Articles | 記事 | Writings / Blogs | `blogs` |
| 08 | `talks` | Talks | 登壇 | Speaking / Events | `talks` |
| 09 | `podcast` | Podcast | 音声 | Audio / Podcasts | `podcast` |
| 10 | `twitter` | Social | 発信 | Twitter / X Feed | `twitter` |

---

## Act IV — 資格 (The Credentials / Formal Recognition)
*Where did you learn? What do you hold?*

| # | ID | Label | JP | Translation | configKey |
|---|---|---|---|---|---|
| 11 | `education` | Education | 学歴 | Academic History | `education` |
| 12 | `certifications` | Certifications | 資格 | Certifications | `certifications` |
| 13 | `volunteer` | Community | 奉仕 | Community Service | `volunteer` |
| 14 | `testimonials` | Testimonials | 推薦 | Endorsements | `testimonials` |

---

## Act V — 繋がり (The Connection / Closing)
*How can we connect? The final call to action.*

| # | ID | Label | JP | Translation | configKey |
|---|---|---|---|---|---|
| 15 | `newsletter` | Newsletter | 購読 | Stay Updated | `newsletter` |
| 16 | `contact` | Contact | 連絡 | Get In Touch | `contact` |

---

## 📊 Full Count
- Hero (00) = 1
- Navigable sections (01–16) = 16
- **Total = 17 sections** (matches the 17 section files in old portfolio, excluding BlogsClient which is a helper)

---

## ⚙️ How Dynamic Numbering Works
- `src/data/siteConfig.ts` — controls which sections are `display: true/false`
- `src/data/sections.ts` — the REGISTRY with above sequence
- `getActiveSections()` — auto-calculates numbers: if "aiProjects" is off, "work" becomes `04` instead of `05`
- `page.tsx` — maps over `getActiveSections()` and renders correct component
- **ZERO hardcoded numbers anywhere in the UI**

---

## 🔴 Rules for Adding New Sections
1. Add the section entry to `SECTION_REGISTRY` in `sections.ts` in the correct Act position
2. Add the `configKey` to `siteConfig.ts` with `display: false` by default
3. Create the section component in `src/components/sections/`
4. Import and register the component in `src/app/page.tsx`
5. Create/update the data file in `src/data/`

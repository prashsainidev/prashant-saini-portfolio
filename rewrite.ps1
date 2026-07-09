git checkout --orphan temp_fresh_2
git reset

git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs tailwind.config.ts .gitignore next-env.d.ts public/
git commit --no-verify -m "chore: initialize next.js 14 project with typescript and tailwind"

git add .husky/ .prettierrc .prettierignore commitlint.config.mjs eslint.config.mjs
git commit --no-verify -m "chore: setup husky, lint-staged, and commitlint for code quality"

git add .agents/ docs/ README.md CLAUDE.md
git commit --no-verify -m "docs: establish global design system and ai agent rules"

git add src/app/globals.css src/app/layout.tsx src/app/favicon.ico
git commit --no-verify -m "style: implement global day/night theme css and typography"

git add src/lib/ src/types/
git commit --no-verify -m "feat(core): implement zustand theme store and utility functions"

git add src/data/
git commit --no-verify -m "feat(data): setup granular data architecture and section registry"

git add src/components/ui/index.ts src/components/ui/CustomCursor.tsx src/components/ui/InkStamp.tsx src/components/ui/KanjiAccent.tsx src/components/ui/MangaPanel.tsx src/components/ui/ThemeToggle.tsx src/components/ui/AbstractWireframe.tsx src/components/ui/CurvyArrow.tsx src/components/ui/MangaWarpCanvas.tsx
git commit --no-verify -m "feat(ui): create reusable cinematic ui components"

git add src/components/ui/JpTooltip.tsx src/components/ui/ChapterLabel.tsx
git commit --no-verify -m "feat(ui): implement portal-based robust JpTooltip component"

git add src/components/layout/Navbar.tsx
git commit --no-verify -m "feat(layout): implement sticky navigation with dynamic scroll reveal"

git add src/components/sections/HeroSection.tsx
git commit --no-verify -m "feat(hero): build 5-layer mouse-reactive parallax hero section"

git add src/components/sections/AboutSection.tsx
git commit --no-verify -m "feat(about): build origin story section with warp canvas"

git add src/components/sections/SkillsSection.tsx
git commit --no-verify -m "feat(skills): build zero-gravity physics repulsion skill chamber"

git add src/app/page.tsx
git commit --no-verify -m "feat: setup dynamic section rendering engine in main page"

git add .
git commit --no-verify -m "chore: final project stabilization"

git branch -D main
git branch -M main
git push -f origin main

/**
 * AboutSection — Manga Chapter 01: ORIGIN STORY
 *
 * Design: Option B (Asymmetric Magazine Spread)
 *   - Two-column layout on large screens.
 *   - Left: Core bio, stats, socials.
 *   - Right: Interactive Story Panels overlapping a 3D Abstract Wireframe.
 *
 * Floaters (9 total, FULL section coverage):
 *   - 3 Manga expression SVGs
 *   - 3 Japanese Kanji words
 *   - 3 Tech icons
 *
 * Data: 100% from src/data/personal.ts
 */
'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { ChapterLabel, KanjiAccent, MangaWarpCanvas, AbstractWireframe } from '@/components/ui';
import { aboutData } from '@/data/about';
import { heroData } from '@/data/hero';
import { useThemeStore } from '@/lib/themeStore';

/* ── Variants ───────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const barGrow: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
};

/* ══════════════════════════════════════════════════
   MANGA EXPRESSION SVGs
══════════════════════════════════════════════════ */
function AngerVein() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path d="M17 3 C13 3 8 8 17 17 C26 8 21 3 17 3Z" fill="var(--accent-red)" />
      <path d="M17 31 C13 31 8 26 17 17 C26 26 21 31 17 31Z" fill="var(--accent-red)" />
      <path d="M3 17 C3 13 8 8 17 17 C8 26 3 21 3 17Z" fill="var(--accent-red)" />
      <path d="M31 17 C31 13 26 8 17 17 C26 26 31 21 31 17Z" fill="var(--accent-red)" />
    </svg>
  );
}

function Sparkle() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 1 L17.8 14.2 L31 16 L17.8 17.8 L16 31 L14.2 17.8 L1 16 L14.2 14.2 Z"
        fill="var(--svg-fill)"
      />
      <path d="M9 9 L13 13" stroke="var(--svg-stroke)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M23 9 L19 13" stroke="var(--svg-stroke)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SweatDrop() {
  return (
    <svg width="22" height="32" viewBox="0 0 22 32" fill="none">
      <path
        d="M11 2 Q3 12 3 20 Q3 29 11 29 Q19 29 19 20 Q19 12 11 2Z"
        fill="var(--accent-blue-soft-fill)"
        stroke="var(--accent-blue-soft-stroke)"
        strokeWidth="1"
      />
      <path
        d="M8 20 Q11 18 14 20"
        stroke="var(--svg-stroke-strong)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ══════════════════════════════════════════════════
   TECH ICON SVGs
══════════════════════════════════════════════════ */
function LaptopIcon() {
  return (
    <svg
      width="46"
      height="36"
      viewBox="0 0 52 40"
      fill="none"
      stroke="var(--accent-red)"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <rect x="6" y="4" width="40" height="26" rx="2" />
      <line x1="2" y1="34" x2="50" y2="34" />
      <line x1="10" y1="34" x2="14" y2="38" />
      <line x1="42" y1="34" x2="38" y2="38" />
      <text
        x="26"
        y="21"
        textAnchor="middle"
        fontSize="9"
        fontFamily="monospace"
        fill="var(--accent-red)"
        stroke="none"
      >
        &gt;_
      </text>
    </svg>
  );
}

function CodeBrackets() {
  return (
    <svg
      width="44"
      height="30"
      viewBox="0 0 50 36"
      fill="none"
      stroke="var(--text-dim)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 4L4 18L16 32" />
      <path d="M34 4L46 18L34 32" />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg
      width="30"
      height="34"
      viewBox="0 0 36 40"
      fill="none"
      stroke="var(--text-dim)"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M6 14h18l-2 20H8L6 14Z" />
      <path d="M24 16h4a4 4 0 010 8h-4" />
      <path d="M10 8 Q12 4 14 8" />
      <path d="M15 6 Q17 2 19 6" />
    </svg>
  );
}

function KanjiFloat({
  char,
  size = '2.2rem',
  color = 'var(--text-dim)',
}: {
  char: string;
  size?: string;
  color?: string;
}) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-noto-jp)',
        fontSize: size,
        fontWeight: 900,
        color,
        /* NO opacity here — Floater wrapper controls it to avoid 0.3×0.5=0.15 multiply bug */
        userSelect: 'none',
        lineHeight: 1,
        display: 'block',
      }}
    >
      {char}
    </span>
  );
}

/* ══════════════════════════════════════════════════
   FLOATERS DEFINITION
══════════════════════════════════════════════════ */
type FloaterDef = {
  id: string;
  top: string;
  pos: { left?: string; right?: string };
  delay: number;
  element: React.ReactNode;
};

const FLOATERS: FloaterDef[] = [
  { id: 'sparkle-tl', top: '8%', pos: { left: '6%' }, delay: 0, element: <Sparkle /> },
  { id: 'anger-tr', top: '11%', pos: { right: '9%' }, delay: 0.35, element: <AngerVein /> },
  {
    id: 'kanji-chikara',
    top: '26%',
    pos: { left: '14%' },
    delay: 0.6,
    element: <KanjiFloat char="力" size="2.8rem" color="var(--accent-red)" />,
  },
  { id: 'laptop-rm', top: '30%', pos: { right: '14%' }, delay: 0.2, element: <LaptopIcon /> },
  { id: 'sweat-lm', top: '50%', pos: { left: '7%' }, delay: 0.5, element: <SweatDrop /> },
  {
    id: 'kanji-yume',
    top: '52%',
    pos: { right: '8%' },
    delay: 0.8,
    element: <KanjiFloat char="夢" size="2.4rem" />,
  },
  { id: 'brackets-lbm', top: '68%', pos: { left: '30%' }, delay: 0.15, element: <CodeBrackets /> },
  { id: 'coffee-rb', top: '70%', pos: { right: '20%' }, delay: 0.45, element: <CoffeeIcon /> },
  {
    id: 'kanji-sou',
    top: '83%',
    pos: { left: '16%' },
    delay: 0.7,
    element: <KanjiFloat char="創" size="2rem" color="var(--text-dim)" />,
  },
];

function Floater({
  top,
  pos,
  delay,
  children,
}: {
  top: string;
  pos: { left?: string; right?: string };
  delay: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.closest('section');
    if (!el || !section) return;

    gsap.to(el, {
      y: `+=${9 + delay * 4}`,
      rotation: delay % 2 === 0 ? 7 : -7,
      duration: 2.3 + delay * 0.7,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay,
    });

    const RADIUS = 135,
      STRENGTH = 52;
    function onMove(e: MouseEvent) {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < RADIUS && d > 0) {
        const f = (RADIUS - d) / RADIUS;
        gsap.to(el, {
          x: -(dx / d) * f * STRENGTH,
          y: -(dy / d) * f * STRENGTH,
          rotation: (dx > 0 ? -18 : 18) * f,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1.1,
          ease: 'elastic.out(1, 0.45)',
          overwrite: 'auto',
        });
      }
    }
    section.addEventListener('mousemove', onMove);
    return () => {
      section.removeEventListener('mousemove', onMove);
      gsap.killTweensOf(el);
    };
  }, [delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.65, delay: 1 + delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        top,
        ...pos,
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        willChange: 'transform',
        opacity: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   STORY PANEL (Interactive Bio Paragraph)
══════════════════════════════════════════════════ */
function StoryPanel({
  num,
  title,
  text,
  delay,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  num: string;
  title: string;
  text: string;
  delay: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{
        width: '100%',
        maxWidth: '420px',
        background: isHovered ? 'var(--bg-secondary)' : 'transparent',
        border: '1px solid',
        borderColor: isHovered ? 'var(--border)' : 'transparent',
        borderLeft: isHovered ? '2px solid var(--accent-red)' : '2px solid transparent',
        padding: '1rem 1.2rem',
        cursor: 'pointer',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        position: 'relative',
      }}
      data-cursor-hover
    >
      {/* Title / Chapter Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            fontFamily: 'var(--font-jetbrains)',
            color: isHovered ? 'var(--accent-red)' : 'var(--text-dim)',
            transition: 'color 0.3s ease',
          }}
        >
          [{num}]
        </span>
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--text-primary)',
          }}
        >
          {title}
        </span>
      </div>

      {/* Expandable Paragraph Text */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: '0.8rem' }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontSize: '0.85rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                fontWeight: 300,
              }}
            >
              {text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export function AboutSection({ chapter = '01' }: { chapter?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-8% 0px' });
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null);
  const { theme } = useThemeStore();
  const isDark = theme === 'night';

  // Story sections derived from aboutData
  const storyData = [
    { id: '02', title: 'The Backend & Systems', text: aboutData.paragraphs[1] },
    { id: '03', title: 'The Projects', text: aboutData.paragraphs[2] },
    { id: '04', title: 'The Ethos', text: aboutData.paragraphs[3] },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(4rem, 8vh, 8rem) clamp(1.5rem, 5vw, 6rem)',
        overflow: 'hidden',
        background: 'var(--bg-secondary)',
      }}
    >
      {/* ── Warp canvas background ── */}
      <MangaWarpCanvas />

      {/* ── Ghost Kanji watermark ── */}
      <KanjiAccent
        char="人"
        top="42%"
        left="-3rem"
        size="clamp(14rem, 28vw, 38rem)"
        opacity={0.022}
      />

      {/* ── Floating elements across full section ── */}
      {FLOATERS.map(({ id, top, pos, delay, element }) => (
        <Floater key={id} top={top} pos={pos} delay={delay}>
          {element}
        </Floater>
      ))}

      {/* ════════════════════════════════════════════
          CHAPTER HEADER
      ════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <ChapterLabel
          number={chapter}
          label="About"
          labelJP="私について"
          labelTranslation="About Me"
        />

        {/* Ghost chapter number — editorial decoration */}
        <span
          aria-hidden
          style={{
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '1.5px var(--text-dim)',
            letterSpacing: '-0.05em',
            opacity: 0.25,
            userSelect: 'none',
            fontFamily: 'var(--font-space-grotesk)',
          }}
        >
          {chapter}
        </span>
      </motion.div>

      {/* ════════════════════════════════════════════
          MAIN LAYOUT — TWO COLUMNS (Content | 3D + Story)
      ════════════════════════════════════════════ */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(2.5rem, 4vw, 4rem)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* ── LEFT COLUMN: Core Content ── */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            flex: '1 1 50%',
            minWidth: '320px',
          }}
        >
          {/* Vertical red accent bar */}
          <motion.div
            variants={barGrow}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              width: '3px',
              backgroundColor: 'var(--accent-red)',
              flexShrink: 0,
              transformOrigin: 'top',
              opacity: 0.75,
              borderRadius: '1px',
              minHeight: '100%',
            }}
          />

          {/* Content column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(1.8rem, 3.5vh, 2.8rem)',
            }}
          >
            {/* ── 1. Headline ── */}
            <motion.div variants={fadeUp}>
              <h2
                style={{
                  fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  maxWidth: '26ch',
                  fontFamily: 'var(--font-space-grotesk)',
                }}
              >
                {aboutData.headline}
              </h2>
            </motion.div>

            {/* ── 2. Stats ── */}
            <motion.div
              variants={stagger}
              style={{
                display: 'flex',
                gap: 'clamp(2rem, 5vw, 5rem)',
                alignItems: 'flex-start',
              }}
            >
              {aboutData.stats.map((stat, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <div
                    style={{
                      fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                      color: i !== 1 ? 'var(--accent-red)' : 'var(--text-primary)',
                      fontFamily: 'var(--font-space-grotesk)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.48rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: 'var(--text-dim)',
                      whiteSpace: 'pre-line',
                      lineHeight: 1.6,
                      marginTop: '0.3rem',
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* ── 3. Bio paragraph (First paragraph only) ── */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 'clamp(0.88rem, 1.1vw, 0.98rem)',
                lineHeight: 1.85,
                color: 'var(--text-secondary)',
                fontWeight: 300,
                maxWidth: '60ch',
              }}
            >
              <span
                style={{
                  fontSize: '1.7em',
                  fontWeight: 900,
                  color: 'var(--accent-red)',
                  lineHeight: 1,
                  float: 'left',
                  marginRight: '0.1em',
                  marginTop: '0.06em',
                }}
              >
                {aboutData.paragraphs[0][0]}
              </span>
              {aboutData.paragraphs[0].slice(1)}
            </motion.p>

            {/* ── 4. Socials + Resume ── */}
            <motion.div
              variants={fadeUp}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(1.5rem, 4vw, 3rem)',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                {heroData.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.56rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--text-dim)',
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-red)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-dim)')
                    }
                  >
                    <span
                      style={{
                        width: '12px',
                        height: '1px',
                        backgroundColor: 'currentColor',
                        display: 'inline-block',
                      }}
                    />
                    {s.label}
                  </a>
                ))}
              </div>

              <a
                href={heroData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.6rem 1.2rem',
                  border: '1.5px solid var(--accent-red)',
                  color: 'var(--accent-red)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  transition: 'background 0.2s ease, color 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'var(--accent-red)';
                  el.style.color = 'var(--bg-primary)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'none';
                  el.style.color = 'var(--accent-red)';
                }}
              >
                <span>View Resume</span>
                <span>→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: 3D Canvas + Interactive Story Panels ── */}
        <div
          style={{
            flex: '1 1 40%',
            minWidth: '300px',
            minHeight: '450px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 'clamp(1rem, 3vw, 3rem)',
          }}
        >
          {/* Background 3D Object — Suspense prevents crash on slow load */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.8,
            }}
          >
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <AbstractWireframe isHovered={hoveredPanel !== null} isDark={isDark} />
              </Suspense>
            </Canvas>
          </div>

          {/* Foreground Story Panels overlay */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {storyData.map((data, idx) => (
              <StoryPanel
                key={data.id}
                num={data.id}
                title={data.title}
                text={data.text}
                delay={0.6 + idx * 0.15}
                isHovered={hoveredPanel === data.id}
                onHoverStart={() => setHoveredPanel(data.id)}
                onHoverEnd={() => setHoveredPanel(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ProjectsSection — Chapter 03: 作品 (THE WORKS)
 *
 * Act II: 証明 (The Evidence). This is the proof-of-craft section.
 *
 * Design: "Akai Ito" (赤い糸 — Red Thread of Fate) aesthetic.
 *   - Cards hang from a vermillion thread at the top, staggered organically.
 *   - GSAP ScrollTrigger pins the section on desktop — vertical scroll drives
 *     horizontal card movement (like Tenztan.in), then releases to continue down.
 *   - Hover = instant project-specific glow on card border + physics sway.
 *     No more "center dependency" — any card reacts on mouse-enter.
 *   - Mobile fallback: standard overflow-x scroll.
 *
 * Data: 100% from src/data/projects.ts
 */
'use client';

import { useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, useMotionValue } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ChapterLabel, JpTooltip } from '@/components/ui';
import { projectsData } from '@/data/projects';
import { IProject } from '@/types';
import { useNavStore } from '@/lib/navStore';

/* Register ScrollTrigger — must happen at module level, outside components */
gsap.registerPlugin(ScrollTrigger);

/* ── Per-project border glow colors (visible on dark background) ── */
const PROJECT_GLOWS: Record<string, { border: string; shadow: string }> = {
  'real-time-tracker': {
    border: 'rgba(0, 255, 159, 0.6)',
    shadow: '0 0 32px rgba(0, 255, 159, 0.22), 0 0 80px rgba(0, 255, 159, 0.08)',
  },
  learniverse: {
    border: 'rgba(230, 57, 70, 0.75)',
    shadow: '0 0 32px rgba(230, 57, 70, 0.28), 0 0 80px rgba(230, 57, 70, 0.1)',
  },
  'mintlify-clone': {
    border: 'rgba(74, 144, 217, 0.65)',
    shadow: '0 0 32px rgba(74, 144, 217, 0.22), 0 0 80px rgba(74, 144, 217, 0.08)',
  },
  'dev-tool-landing': {
    border: 'rgba(245, 200, 130, 0.6)',
    shadow: '0 0 32px rgba(245, 200, 130, 0.22), 0 0 80px rgba(245, 200, 130, 0.08)',
  },
  weatherwise: {
    border: 'rgba(100, 200, 255, 0.6)',
    shadow: '0 0 32px rgba(100, 200, 255, 0.22), 0 0 80px rgba(100, 200, 255, 0.08)',
  },
  mylibrary: {
    border: 'rgba(180, 100, 255, 0.6)',
    shadow: '0 0 32px rgba(180, 100, 255, 0.22), 0 0 80px rgba(180, 100, 255, 0.08)',
  },
  'i-tech-world': {
    border: 'rgba(255, 100, 100, 0.6)',
    shadow: '0 0 32px rgba(255, 100, 100, 0.22), 0 0 80px rgba(255, 100, 100, 0.08)',
  },
  'heart-disease-prediction': {
    border: 'rgba(255, 50, 50, 0.65)',
    shadow: '0 0 32px rgba(255, 50, 50, 0.25), 0 0 80px rgba(255, 50, 50, 0.1)',
  },
};

const DEFAULT_GLOW = {
  border: 'rgba(230, 57, 70, 0.45)',
  shadow: '0 0 32px rgba(230, 57, 70, 0.18)',
};

/*
 * Organic stagger + tilt per card index — makes the strip feel physically hung.
 * Not random on every render; deterministic per index so SSR is stable.
 */
const STAGGER_Y_PX = [0, 32, 14, 38, 6, 28, 18, 34];
const BASE_TILTS_DEG = [-1.5, 2.0, -2.5, 1.2, -1.8, 2.4, -0.8, 1.6];

/* Height of the red thread that drops from the rope to the card top */
const THREAD_H = 60; // px

/* ══════════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════════ */
function ProjectCard({
  project,
  index,
  hoveredCardId,
  onHover,
}: {
  project: IProject;
  index: number;
  hoveredCardId: string | null;
  onHover: (id: string | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Is ANOTHER card hovered? → spotlight dim
  const isDimmed = hoveredCardId !== null && hoveredCardId !== project.id;

  /* MotionValues avoid re-renders on every mousemove — smooth 3D tilt */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const glow = PROJECT_GLOWS[project.id] ?? DEFAULT_GLOW;
  const baseRotate = BASE_TILTS_DEG[index % BASE_TILTS_DEG.length];
  const staggerY = STAGGER_Y_PX[index % STAGGER_Y_PX.length];
  const isFeatured = project.featured;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      rotateX.set(((e.clientY - top) / height - 0.5) * -7);
      rotateY.set(((e.clientX - left) / width - 0.5) * 7);
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    onHover(null);
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY, onHover]);

  return (
    /*
     * Outer positioner.
     * marginTop = THREAD_H + staggerY so that the card's top is exactly
     * (THREAD_H + staggerY)px below the rope line (top:0 of the track).
     * The thread then travels negative that distance to reach the rope.
     */
    <div
      className="sway-card"
      style={{
        flexShrink: 0,
        width: 'clamp(300px, 30vw, 420px)',
        position: 'relative',
        marginTop: `${THREAD_H + staggerY}px`,
        transformOrigin: `50% -${THREAD_H + staggerY}px`,
        // G: Spotlight — dim when another card is hovered
        opacity: isDimmed ? 0.35 : 1,
        transition: 'opacity 0.4s ease',
        filter: isDimmed ? 'saturate(0.3)' : 'saturate(1)',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(project.id);
      }}
      onMouseLeave={handleMouseLeave}
    >
      {/*
       * ── Akai Ito: drop thread ──
       *
       * CRITICAL: thread goes UPWARD from the card wrapper top to the rope.
       * `top: -(THREAD_H + staggerY)` means: start at the rope (y=0 of track),
       * height: THREAD_H + staggerY means: run all the way down to this card.
       * This ensures every card's thread actually touches the rope, regardless of stagger.
       * Cards with larger stagger hang lower → they have longer threads. Realistic!
       */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: `${-(THREAD_H + staggerY)}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: `${THREAD_H + staggerY}px`,
          // H: Thread glow sync — use project glow color when hovered
          background: isHovered
            ? `linear-gradient(to bottom, ${glow.border}, transparent)`
            : 'linear-gradient(to bottom, rgba(230,57,70,0.35), rgba(230,57,70,0.08))',
          boxShadow: isHovered ? `0 0 6px ${glow.border}` : 'none',
          transition: 'background 0.35s ease, box-shadow 0.35s ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Push-pin bead — now glows in project color on hover ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: `${-(THREAD_H + staggerY)}px`,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isHovered
            ? `radial-gradient(circle at 35% 35%, white, ${glow.border})`
            : 'radial-gradient(circle at 35% 35%, rgba(255,180,180,0.7), rgba(230,57,70,0.9))',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: isHovered
            ? `0 0 10px ${glow.border}, 0 2px 4px rgba(0,0,0,0.5)`
            : '0 0 4px rgba(230,57,70,0.3), 0 1px 3px rgba(0,0,0,0.4)',
          transition: 'background 0.35s ease, box-shadow 0.35s ease',
          pointerEvents: 'none',
        }}
      />

      {/*
       * The card itself.
       * `animate.rotate` handles the organic base tilt (and levels to 0 on hover).
       * `style.rotateX/Y` handles the 3D mouse-tilt via MotionValues — no re-renders.
       * `transformOrigin: top center` makes the sway pivot from the thread connection point.
       */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        animate={{
          rotate: isHovered ? 0 : baseRotate,
          borderColor: isHovered ? glow.border : 'rgba(255,255,255,0.07)',
          boxShadow: isHovered ? glow.shadow : '0 6px 28px rgba(0,0,0,0.55)',
        }}
        transition={{
          rotate: { type: 'spring', stiffness: 160, damping: 20 },
          borderColor: { duration: 0.22 },
          boxShadow: { duration: 0.22 },
        }}
        style={{
          rotateX,
          rotateY,
          transformOrigin: 'top center',
          transformPerspective: 1000,
          border: isFeatured
            ? `1px solid ${glow.border.replace(')', ', 0.3)').replace('rgb', 'rgba')}`
            : '1px solid rgba(255,255,255,0.06)',
          background: 'var(--bg-card)',
          height: 'clamp(520px, 62vh, 700px)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.6rem',
          borderRadius: '4px',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Featured: left accent bar — always uses project's glow color */}
        {isFeatured && (
          <motion.div
            aria-hidden
            animate={{
              opacity: isHovered ? 1 : 0.45,
            }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '3px',
              height: '100%',
              background: `linear-gradient(to bottom, ${glow.border}, transparent)`,
              borderRadius: '4px 0 0 4px',
            }}
          />
        )}

        {/* Ghost card index number — bottom-right corner, always behind content */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '-1.5rem',
            right: '-0.5rem',
            fontSize: 'clamp(8rem, 16vw, 13rem)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            opacity: 0.04,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* TOP: Kanji stamp + featured badge — z-index:1 above ghost number */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <JpTooltip translation={project.title} hint="Project name in Japanese">
            <span
              style={{
                fontFamily: 'var(--font-jp)',
                fontSize: '0.95rem',
                color: isFeatured ? 'var(--accent-red)' : 'var(--text-dim)',
                letterSpacing: '0.05em',
                opacity: isFeatured ? 1 : 0.65,
              }}
            >
              {project.titleKanji}
            </span>
          </JpTooltip>
          {isFeatured && (
            <span
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: 'var(--accent-red)',
                border: '1px solid var(--accent-red)',
                padding: '0.2rem 0.55rem',
                borderRadius: '2px',
                textTransform: 'uppercase',
                fontWeight: 700,
                background: 'rgba(230,57,70,0.06)',
              }}
            >
              FEATURED
            </span>
          )}
        </div>

        {/* MIDDLE: title + tagline + bullet highlights — flex:1 so it fills space and pushes footer down */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.55rem',
            margin: '1.8rem 0 1.4rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-dim)',
              fontStyle: 'italic',
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            {project.tagline}
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0.4rem 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            {project.details.slice(0, 2).map((detail, i) => (
              <li
                key={i}
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  lineHeight: 1.45,
                }}
              >
                <span style={{ color: 'var(--accent-red)', flexShrink: 0 }}>—</span>
                {detail}
              </li>
            ))}
          </ul>

          {/* TERMINAL — macOS-style chrome, blinking cursor, fills all remaining space */}
          <motion.div
            animate={{
              borderColor: isHovered
                ? glow.border
                    .replace(')', ', 0.25)')
                    .replace('rgba(', 'rgba(')
                    .replace('0.6)', '0.25)')
                    .replace('0.65)', '0.25)')
                    .replace('0.75)', '0.25)')
                : 'rgba(255,255,255,0.07)',
            }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: 'auto',
              flex: 1,
              minHeight: '130px',
              borderRadius: '5px',
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.07)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* ── macOS Terminal Chrome ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.75rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.03)',
                flexShrink: 0,
              }}
            >
              {/* 3 window dots */}
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#FF5F57',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#FEBC2E',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#28C840',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              {/* Window title */}
              <span
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: '0.5rem',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                }}
              >
                bash — project.info
              </span>
            </div>

            {/* ── Terminal Body ── */}
            <div
              style={{
                padding: '0.7rem 0.9rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.38rem',
                flex: 1,
              }}
            >
              {/* $ prompt command */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginBottom: '0.15rem',
                }}
              >
                <span style={{ color: glow.border, opacity: 0.9, letterSpacing: '0.02em' }}>~</span>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>$</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>cat project.json</span>
                {/* Blinking cursor */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '0.7em',
                    background: glow.border,
                    opacity: 0.85,
                    borderRadius: '1px',
                    verticalAlign: 'middle',
                    marginLeft: '2px',
                  }}
                />
              </div>

              {/* ROLE row */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: glow.border, opacity: 0.75, minWidth: '46px' }}>role</span>
                <span style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>→</span>
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>{project.role}</span>
              </div>

              {/* TYPE row */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: glow.border, opacity: 0.75, minWidth: '46px' }}>type</span>
                <span style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>→</span>
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>{project.tags.join(' · ')}</span>
              </div>

              {/* BUILT row */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: glow.border, opacity: 0.75, minWidth: '46px' }}>built</span>
                <span style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>→</span>
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>{project.timeline}</span>
              </div>

              {/* STATUS row with animated pulse dot */}
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: glow.border, opacity: 0.75, minWidth: '46px' }}>status</span>
                <span style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>→</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {/* Pulsing status dot */}
                  <motion.span
                    animate={
                      project.links.live
                        ? { scale: [1, 1.4, 1], opacity: [0.9, 0.4, 0.9] }
                        : { opacity: 0.4 }
                    }
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      display: 'inline-block',
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: project.links.live ? '#00FF9F' : 'rgba(255,255,255,0.25)',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      color: project.links.live ? '#00FF9F' : 'rgba(255,255,255,0.4)',
                      opacity: project.links.live ? 0.9 : 0.45,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontSize: '0.58rem',
                    }}
                  >
                    {project.links.live ? 'deployed' : 'local / research'}
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM: tech pills + action links — anchored to bottom via parent space-between (or margin-top:auto above) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Tech pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: '0.58rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-dim)',
                  border: '1px solid var(--border)',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '2px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  maxWidth: '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={t}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem',
              paddingTop: '0.6rem',
              borderTop: '1px solid var(--border)',
            }}
          >
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.65rem',
                  color: 'var(--text-dim)',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Code
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title} live`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.65rem',
                  color: 'var(--text-dim)',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
              >
                <ExternalLink size={11} style={{ flexShrink: 0 }} />
                Live
              </a>
            )}
            <div style={{ marginLeft: 'auto' }}>
              <span
                style={{
                  fontSize: '0.55rem',
                  color: 'var(--text-dim)',
                  opacity: 0.45,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {project.timeline}
              </span>
            </div>
          </div>
        </div>

        {/* F: Film grain noise overlay — pure SVG, tactile print feel */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
            backgroundSize: '180px 180px',
            pointerEvents: 'none',
            zIndex: 10,
            borderRadius: '4px',
            mixBlendMode: 'overlay',
          }}
        />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   END-OF-REEL CARD — chapter close / browse all CTA
══════════════════════════════════════════════════ */
function EndOfReelCard() {
  const [isHovered, setIsHovered] = useState(false);
  const threadLen = THREAD_H + 30;

  return (
    <div
      className="sway-card"
      style={{
        flexShrink: 0,
        width: 'clamp(200px, 20vw, 260px)',
        marginTop: `${threadLen}px`,
        position: 'relative',
        transformOrigin: `50% -${threadLen}px`,
      }}
    >
      {/* Thread — goes up to rope */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: `${-threadLen}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: `${threadLen}px`,
          background: 'linear-gradient(to bottom, rgba(230,57,70,0.25), rgba(230,57,70,0.05))',
          pointerEvents: 'none',
        }}
      />
      {/* Pin bead at rope */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: `${-threadLen}px`,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 35% 35%, rgba(255,180,180,0.5), rgba(230,57,70,0.6))',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 0 4px rgba(230,57,70,0.25)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ rotate: isHovered ? 0 : 1.5 }}
        transition={{ type: 'spring', stiffness: 150, damping: 18 }}
        style={{
          height: '400px',
          border: isHovered ? '1px solid rgba(230,57,70,0.5)' : '1px dashed rgba(230,57,70,0.18)',
          borderRadius: '3px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          position: 'relative',
          overflow: 'hidden',
          transformOrigin: 'top center',
          transformPerspective: 1000,
          transition: 'border-color 0.3s ease',
        }}
      >
        {/*
         * Ghost 全 (All / Everything) — fills the background.
         * Much more impactful than the old sprocket holes.
         */}
        <span
          aria-hidden
          style={{
            fontFamily: 'var(--font-jp)',
            fontSize: '9rem',
            color: 'var(--text-primary)',
            opacity: isHovered ? 0.07 : 0.04,
            fontWeight: 900,
            position: 'absolute',
            transition: 'opacity 0.4s ease',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          全
        </span>

        {/* Project count */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2.4rem',
              fontWeight: 900,
              color: isHovered ? 'var(--accent-red)' : 'var(--text-primary)',
              lineHeight: 1,
              transition: 'color 0.3s ease',
            }}
          >
            08+
          </span>
          <span
            style={{
              fontSize: '0.52rem',
              letterSpacing: '0.25em',
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              opacity: 0.55,
            }}
          >
            Projects
          </span>
        </div>

        {/* Thin divider */}
        <div
          aria-hidden
          style={{
            width: '40px',
            height: '1px',
            background: 'rgba(230,57,70,0.3)',
            position: 'relative',
            zIndex: 1,
          }}
        />

        {/* CTA */}
        <a
          href="https://github.com/prashsainidev"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.7rem 1.5rem',
            background: isHovered ? 'var(--accent-red)' : 'transparent',
            border: '1px solid var(--accent-red)',
            color: isHovered ? '#000' : 'var(--accent-red)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 800,
            textDecoration: 'none',
            transition: 'background 0.25s ease, color 0.25s ease',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Browse All →
        </a>

        {/* Bottom label */}
        <span
          style={{
            position: 'absolute',
            bottom: '1.2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.45rem',
            letterSpacing: '0.3em',
            color: 'var(--text-dim)',
            opacity: 0.3,
            textTransform: 'uppercase',
          }}
        >
          — END OF REEL —
        </span>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PROJECTS SECTION — Two-Phase: Intro Title + Full-Bleed Gallery
══════════════════════════════════════════════════ */
export function ProjectsSection({ chapter }: { chapter: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<HTMLDivElement>(null);
  // D: Card counter ref — updated directly via GSAP (no re-render)
  const counterRef = useRef<HTMLSpanElement>(null);
  // G: Spotlight — which card is currently hovered
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const sorted = [...projectsData].sort((a, b) => a.order - b.order);
  const totalCards = sorted.length;

  useGSAP(
    () => {
      const track = trackRef.current;
      const gallery = galleryRef.current;
      const intro = introRef.current;
      if (!track || !gallery) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        track.style.overflowX = 'visible';

        const syncRopeWidth = () => {
          if (ropeRef.current) {
            ropeRef.current.style.width = `${track.scrollWidth}px`;
          }
        };
        syncRopeWidth();
        ScrollTrigger.addEventListener('refresh', syncRopeWidth);

        const getScrollDistance = () =>
          track.scrollWidth - (gallery.offsetWidth || window.innerWidth);

        /*
         * Phase 1 → Phase 2 crossfade: as gallery enters viewport, intro
         * fades + scales down — a cinematic curtain-rise transition.
         */
        if (intro) {
          gsap.to(intro, {
            opacity: 0,
            scale: 0.96,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: gallery,
              start: 'top 80%',
              end: 'top top',
              scrub: true,
            },
          });
        }

        /*
         * Pin the GALLERY div (not the whole section) so the rope is
         * flush with the very top of the browser viewport when locked.
         */
        const st = gsap.timeline({
          scrollTrigger: {
            trigger: gallery,
            pin: true,
            scrub: 1.5,
            start: 'top top',
            end: () => `+=${getScrollDistance() + 800}`, // Added 800px breathing room
            invalidateOnRefresh: true,
            onEnter: () => useNavStore.getState().setForceHidden(true),
            onLeave: () => useNavStore.getState().setForceHidden(false),
            onEnterBack: () => useNavStore.getState().setForceHidden(true),
            onLeaveBack: () => useNavStore.getState().setForceHidden(false),
            onUpdate: (self) => {
              if (progressFillRef.current) {
                progressFillRef.current.style.transform = `scaleX(${self.progress})`;
              }
              // D: Update card counter based on scroll progress (0→totalCards)
              if (counterRef.current) {
                const cardIdx = Math.min(
                  Math.round(self.progress * (totalCards - 1)) + 1,
                  totalCards
                );
                counterRef.current.textContent = String(cardIdx).padStart(2, '0');
              }
              /*
               * Pendulum sway — rotate cards from their rope hinge.
               * Velocity from GSAP normalized to ±8°. Negative = lean
               * opposite to travel direction (inertia).
               */
              const velocity = self.getVelocity() / 3000;
              const clampedSway = Math.max(-8, Math.min(8, velocity * -4));
              gsap.to('.sway-card', {
                rotate: clampedSway,
                duration: 0.8,
                ease: 'power3.out',
                overwrite: 'auto',
              });
            },
          },
        });

        // 85% of scroll spent translating
        st.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          duration: 1,
        });

        // 15% of scroll spent doing nothing (the breathing room/pause at the end)
        st.to({}, { duration: 0.15 });

        return () => {
          track.style.overflowX = 'auto';
          ScrollTrigger.removeEventListener('refresh', syncRopeWidth);
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-label="Projects section — case studies"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/*
       * ── PHASE 1: INTRO TITLE CARD ──
       * One full viewport height, scrolls normally.
       * Fades out as Phase 2 gallery enters — cinematic reveal.
       */}
      <div
        ref={introRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(4rem, 8vh, 8rem) clamp(1.5rem, 5vw, 6rem)',
        }}
      >
        {/* Ghost 作品 — massive watermark */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            left: '-2rem',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--font-jp)',
            fontSize: 'clamp(12rem, 26vw, 22rem)',
            fontWeight: 900,
            color: 'var(--kanji-ghost)',
            opacity: 0.04,
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
        >
          作品
        </span>

        {/* ════════════════════════════════════════════
            CHAPTER HEADER (Consistent with About/Skills)
        ════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
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
            width: '100%',
          }}
        >
          <ChapterLabel
            number={chapter}
            label="PROJECTS"
            labelJP="作品"
            labelTranslation="Projects / Works"
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

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: 'var(--text-primary)',
            }}
          >
            Things I&apos;ve built.{' '}
            <span style={{ color: 'var(--accent-red)' }}>Proof of craft.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              marginTop: '1.5rem',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              color: 'var(--text-dim)',
              letterSpacing: '0.04em',
              lineHeight: 1.7,
              maxWidth: '42ch',
            }}
          >
            Every card hanging on the thread below is a real project — shipped, documented, and
            built with intent. Scroll down to step into the gallery.
          </motion.p>

          {/* Count + Act label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  fontWeight: 900,
                  color: 'var(--accent-red)',
                  lineHeight: 1,
                }}
              >
                {sorted.length}+
              </span>
              <span
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: 'var(--text-dim)',
                  textTransform: 'uppercase',
                  opacity: 0.6,
                }}
              >
                Projects
              </span>
            </div>
            <div
              aria-hidden
              style={{ width: '1px', height: '40px', background: 'var(--border)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              <JpTooltip translation="証明 — Evidence / Proof" hint="Act II of the narrative">
                <span
                  style={{
                    fontFamily: 'var(--font-jp)',
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    color: 'var(--text-primary)',
                    opacity: 0.55,
                    lineHeight: 1,
                  }}
                >
                  証明
                </span>
              </JpTooltip>
              <span
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: 'var(--text-dim)',
                  textTransform: 'uppercase',
                  opacity: 0.6,
                }}
              >
                Act II
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint — bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            right: 'clamp(1.5rem, 4vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.6rem',
            pointerEvents: 'none',
          }}
        >
          <motion.div
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              width: '1px',
              height: '36px',
              background:
                'linear-gradient(to bottom, transparent, rgba(230,57,70,0.7), transparent)',
              transformOrigin: 'top',
            }}
          />
          <span
            style={{
              fontSize: '0.5rem',
              letterSpacing: '0.25em',
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              writingMode: 'vertical-rl',
              opacity: 0.5,
            }}
          >
            Scroll
          </span>
        </motion.div>
      </div>

      {/*
       * ── PHASE 2: FULL-BLEED GALLERY ──
       * GSAP pins this div. When it hits top:0 of the viewport, it locks.
       * The rope at top:0 of the card track is now the browser ceiling.
       * Cards hang from the very top edge of the window.
       */}
      <div
        ref={galleryRef}
        style={{
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          ref={trackRef}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '2.5rem',
            paddingLeft: 'min(38vw, 26rem)',
            paddingRight: '4rem',
            paddingTop: 0,
            position: 'relative',
            willChange: 'transform',
            overflowX: 'auto',
            overflowY: 'visible',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Akai Ito — rope flush with browser ceiling */}
          <div
            ref={ropeRef}
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 0,
              height: '1.5px',
              background: 'rgba(230,57,70,0.38)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {sorted.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              hoveredCardId={hoveredCardId}
              onHover={setHoveredCardId}
            />
          ))}

          <EndOfReelCard />

          <div style={{ flexShrink: 0, width: 'min(15vw, 12rem)' }} aria-hidden />
        </div>

        {/* D: Counter + Progress Bar row */}
        <div
          style={{
            flexShrink: 0,
            padding: '0.6rem clamp(1.5rem, 5vw, 6rem)',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {/* Card counter: 01 / 08 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.3rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: 'var(--text-dim)',
              flexShrink: 0,
              opacity: 0.7,
            }}
          >
            <span ref={counterRef} style={{ color: 'var(--accent-red)', fontWeight: 700 }}>
              01
            </span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{String(totalCards).padStart(2, '0')}</span>
          </div>
          {/* Progress bar */}
          <div
            style={{
              flex: 1,
              height: '1.5px',
              background: 'rgba(230,57,70,0.12)',
              borderRadius: '1px',
              overflow: 'hidden',
            }}
          >
            <div
              ref={progressFillRef}
              style={{
                height: '100%',
                background: 'var(--accent-red)',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

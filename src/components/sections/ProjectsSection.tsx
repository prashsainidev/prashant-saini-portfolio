/**
 * ProjectsSection — Chapter 03: 作品 (THE WORKS)
 *
 * Act II: 証明 (The Evidence). This is the proof-of-craft section.
 * Design: Horizontal scroll film reel with 3D tilt cards.
 *
 * Data: 100% from src/data/projects.ts
 */
'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { ChapterLabel, JpTooltip } from '@/components/ui';
import { projectsData } from '@/data/projects';
import { IProject } from '@/types';

/* ── Dynamic Glow Colors for each project ── */
const PROJECT_GLOWS: Record<string, string> = {
  'real-time-tracker': 'rgba(0, 255, 159, 0.08)',
  learniverse: 'rgba(230, 57, 70, 0.08)',
  'mintlify-clone': 'rgba(74, 144, 217, 0.08)',
  'dev-tool-landing': 'rgba(245, 230, 200, 0.08)',
  weatherwise: 'rgba(100, 200, 255, 0.08)',
  mylibrary: 'rgba(180, 100, 255, 0.08)',
  'i-tech-world': 'rgba(255, 100, 100, 0.08)',
  'heart-disease-prediction': 'rgba(255, 50, 50, 0.08)',
};

/* ── 3D tilt constants — small enough to feel premium, not gimmicky ── */
const MAX_TILT = 8; // degrees

/* ══════════════════════════════════════════════════
   PROJECT CARD (individual case study tile)
══════════════════════════════════════════════════ */
function ProjectCard({
  project,
  index,
  isVisible,
  skew,
  setActiveId,
  containerRef,
}: {
  project: IProject;
  index: number;
  isVisible: boolean;
  skew: MotionValue<number>;
  setActiveId: (id: string) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  /* Determine if this card is in the center of the scroll container */
  const isCentered = useInView(cardRef, { root: containerRef, margin: '0px -40% 0px -40%' });

  useEffect(() => {
    if (isCentered) {
      setActiveId(project.id);
    }
  }, [isCentered, project.id, setActiveId]);

  /* Mouse move → compute tilt relative to card center */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const relX = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
    const relY = (e.clientY - top) / height - 0.5;
    setTilt({ x: relY * -MAX_TILT, y: relX * MAX_TILT });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const isFeatured = project.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={
        isVisible
          ? {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 80,
                damping: 20,
                delay: index * 0.12,
              },
            }
          : {}
      }
      style={{
        perspective: '1200px',
        flexShrink: 0,
        /* All cards must have the exact same width for a smooth film-strip rhythm */
        width: 'clamp(320px, 32vw, 420px)',
        scrollSnapAlign: 'start',
        skewX: skew,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          height: '520px',
          borderRadius: '4px',
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          padding: '2rem 1.8rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
          transition:
            'transform 0.15s ease, box-shadow 0.2s ease, border-color 0.4s ease, background-color 0.4s ease',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          boxShadow: tilt.x !== 0 || tilt.y !== 0 ? 'var(--shadow-lg)' : 'var(--shadow-md)',
        }}
      >
        {/* Ghost index number — decorative backdrop */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '-10px',
            right: '-5px',
            fontSize: 'clamp(7rem, 12vw, 10rem)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 900,
            color: 'var(--kanji-ghost)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* — Top: Kanji stamp + featured tag — */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <JpTooltip translation={project.title} hint="Project name in Japanese">
            <span
              style={{
                fontFamily: 'var(--font-jp)',
                fontSize: '1rem',
                color: isFeatured ? 'var(--accent-red)' : 'var(--text-dim)',
                letterSpacing: '0.05em',
              }}
            >
              {project.titleKanji}
            </span>
          </JpTooltip>

          {isFeatured && (
            <span
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                color: 'var(--accent-red)',
                border: '1px solid var(--accent-red)',
                padding: '0.2rem 0.5rem',
                borderRadius: '2px',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              FEATURED
            </span>
          )}
        </div>

        {/* — Middle: Title + tagline — */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0.6rem',
            margin: '1.5rem 0',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-dim)',
              fontStyle: 'italic',
              lineHeight: 1.5,
            }}
          >
            {project.tagline}
          </p>

          {/* Architecture highlights — compact bullet list */}
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0.8rem 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            {project.details.slice(0, 2).map((detail, i) => (
              <li
                key={i}
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-dim)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  lineHeight: 1.4,
                }}
              >
                <span style={{ color: 'var(--accent-red)', marginTop: '2px', flexShrink: 0 }}>
                  —
                </span>
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* — Bottom: Tech pills + links — */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Tech stack */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-dim)',
                  border: '1px solid var(--border)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '2px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '0.5rem',
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
                  fontSize: '0.72rem',
                  color: 'var(--text-dim)',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
              >
                {/* GitHub icon inline — lucide-react doesn't export Github */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
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
                aria-label={`Visit ${project.title} live site`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.72rem',
                  color: 'var(--text-dim)',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
              >
                <ExternalLink size={13} />
                Live
              </a>
            )}

            {/* Role / timeline — right-aligned metadata */}
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div
                style={{
                  fontSize: '0.6rem',
                  color: 'var(--text-dim)',
                  opacity: 0.6,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {project.timeline}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   PROJECTS SECTION
══════════════════════════════════════════════════ */
export function ProjectsSection({ chapter }: { chapter: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(sectionRef, { once: true, margin: '-10%' });

  /* Dynamic Glow State */
  const [activeId, setActiveId] = useState<string>(projectsData[0].id);
  const activeGlow = PROJECT_GLOWS[activeId] || 'transparent';

  /* Scroll Velocity Skew Logic */
  const { scrollX } = useScroll({ container: scrollRef });
  const scrollVelocity = useVelocity(scrollX);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skew = useTransform(smoothVelocity, [-1000, 1000], [3, -3]);

  /* Keyboard arrow key scrolling for accessibility */
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') scroller.scrollBy({ left: 320, behavior: 'smooth' });
      if (e.key === 'ArrowLeft') scroller.scrollBy({ left: -320, behavior: 'smooth' });
    };

    scroller.addEventListener('keydown', handleKey);
    return () => scroller.removeEventListener('keydown', handleKey);
  }, []);

  const sorted = [...projectsData].sort((a, b) => a.order - b.order);

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-label="Projects section — case studies"
      style={{
        padding: 'clamp(5rem, 10vh, 8rem) 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Dynamic Background Glow based on active centered card */}
      <motion.div
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${activeGlow} 0%, transparent 60%)`,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Ghost kanji watermark — 作品 */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-jp)',
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          color: 'var(--kanji-ghost)',
          fontWeight: 900,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
      >
        作品
      </span>

      {/* — Section header — */}
      <div
        style={{
          paddingLeft: 'clamp(1.5rem, 6vw, 6rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 6rem)',
          marginBottom: '3rem',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <ChapterLabel number={chapter} label="PROJECTS" labelJP="作品" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              isVisible ? { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } } : {}
            }
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              marginTop: '0.8rem',
              maxWidth: '28ch',
            }}
          >
            Things I&apos;ve built.{' '}
            <span style={{ color: 'var(--accent-red)', WebkitTextStroke: '0px' }}>
              Proof of craft.
            </span>
          </motion.h2>
        </div>

        {/* Scroll hint — only visible on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1, transition: { delay: 0.6 } } : {}}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <ArrowRight size={12} />
          Scroll to explore
        </motion.div>
      </div>

      {/* — Horizontal scroll film strip — */}
      <div
        ref={scrollRef}
        tabIndex={0}
        data-cursor-drag
        aria-label="Projects list — use arrow keys to navigate"
        style={{
          display: 'flex',
          gap: '1.5rem',
          overflowX: 'auto',
          overflowY: 'visible',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          paddingLeft: 'clamp(1.5rem, 6vw, 6rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 6rem)',
          paddingBottom: '2rem',
          /* Hide scrollbar — the horizontal scroll UX is implied by the layout */
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {sorted.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            isVisible={isVisible}
            skew={skew}
            setActiveId={setActiveId}
            containerRef={scrollRef}
          />
        ))}

        {/* End-of-reel spacer */}
        <div style={{ flexShrink: 0, width: 'clamp(1.5rem, 6vw, 6rem)' }} />
      </div>

      {/* Gradient fade edges — left and right — hints at scrollability */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '80px',
          height: '100%',
          background: 'linear-gradient(to right, var(--bg), transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '80px',
          height: '100%',
          background: 'linear-gradient(to left, var(--bg), transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </section>
  );
}

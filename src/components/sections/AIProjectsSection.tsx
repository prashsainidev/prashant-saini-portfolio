'use client';

/**
 * AIProjectsSection — Chapter 05 : 人工知能 (AI PROJECTS)
 *
 * Design: "Film Production Slate" aesthetic.
 *   - Editorial intro block with giant headline (mirrors Experience/OpenSource).
 *   - First project gets full-width "hero" treatment — establishes visual hierarchy.
 *   - Remaining projects in 2-column grid with "film slate" top bars.
 *   - Ghost Kanji 知 (Knowledge) anchored to bottom-right, never overlapping text.
 *   - Left-border hover reveal: --border → 3px --accent-red (ink stroke effect).
 *
 * Data: 100% from src/data/aiProjects.ts — no hardcoding.
 */

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { ExternalLink, GitBranch } from 'lucide-react';
import { ChapterLabel, KanjiAccent } from '@/components/ui';
import { JpTooltip } from '@/components/ui/JpTooltip';
import { aiProjectsData } from '@/data/aiProjects';

/* ── Animation Variants ─────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* ── JP Numerals ── */
const JP_NUMERALS = ['壱', '弐', '参', '四', '五', '六', '七', '八', '九'];

/* ══════════════════════════════════════════════════
   FILM SLATE BAR — Top of each project card
   Uses inset box-shadow for red left accent — no layout shift on hover.
   (borderLeft width changes shift content; box-shadow does not.)
══════════════════════════════════════════════════ */
function FilmSlateBar({ model, idx }: { model: string; idx: number }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.7rem 1.25rem',
        background: 'rgba(230, 57, 70, 0.06)',
        borderTop: '1px solid rgba(230, 57, 70, 0.15)',
        borderBottom: '1px solid rgba(230, 57, 70, 0.15)',
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Red left accent — absolutely positioned so it never shifts layout */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: 'var(--accent-red)',
        }}
      />

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.25em',
          color: 'var(--accent-red)',
          opacity: 0.85,
          flexShrink: 0,
          paddingLeft: '0.25rem',
        }}
      >
        AI. {String(idx + 1).padStart(2, '0')}
      </span>

      <span style={{ color: 'rgba(230,57,70,0.3)', fontSize: '0.45rem' }}>◆</span>

      <JpTooltip translation="AI Model Used" hint="搭載モデル">
        <span
          style={{
            fontFamily: 'var(--font-noto-jp)',
            fontSize: '0.68rem',
            color: 'var(--text-secondary)',
            cursor: 'help',
          }}
        >
          搭載
        </span>
      </JpTooltip>

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.12em',
          color: 'var(--text-dim)',
          marginLeft: 'auto',
        }}
      >
        {model}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PROJECT CARD — Standard grid card
══════════════════════════════════════════════════ */
function ProjectCard({
  project,
  idx,
  variants,
}: {
  project: (typeof aiProjectsData.list)[0];
  idx: number;
  variants: Variants;
}) {
  const jpNumeral = JP_NUMERALS[idx % JP_NUMERALS.length];

  return (
    <motion.div
      variants={variants}
      style={{
        /* Cards use --bg-primary so they pop against --bg-secondary section bg */
        background: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        /* Use box-shadow for left accent — zero layout shift on hover */
        boxShadow: 'inset 3px 0 0 transparent',
        transition: 'box-shadow 0.3s ease',
      }}
      whileHover={{ boxShadow: 'inset 3px 0 0 var(--accent-red)' }}
    >
      <FilmSlateBar model={project.model} idx={idx} />

      <div
        style={{
          padding: '0 1.75rem 1.75rem 1.75rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '3.5rem',
            right: '1.25rem',
            fontFamily: 'var(--font-noto-jp)',
            fontSize: '4rem',
            fontWeight: 900,
            color: 'var(--text-primary)',
            opacity: 0.04,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {jpNumeral}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-space)',
            fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            margin: '0 0 0.75rem 0',
          }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-space)',
            fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            fontWeight: 300,
            marginBottom: '1.5rem',
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Bottom Bar: Stack + Links — pinned to card bottom */}
      <div
        style={{
          marginTop: 'auto',
          borderTop: '1px solid var(--border)',
          padding: '1rem 1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        {/* Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1rem' }}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          {project.links.map((link) => {
            const isGit = link.name.toLowerCase().includes('git');
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-view
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-red)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)')
                }
              >
                {isGit ? <GitBranch size={13} /> : <ExternalLink size={13} />}
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   HERO PROJECT CARD — First project, full width
══════════════════════════════════════════════════ */
function HeroProjectCard({ project }: { project: (typeof aiProjectsData.list)[0] }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        background: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        position: 'relative',
        /* No overflow:hidden — was clipping the FEATURED vertical label */
        boxShadow: 'inset 3px 0 0 transparent',
        transition: 'box-shadow 0.3s ease',
      }}
      whileHover={{ boxShadow: 'inset 3px 0 0 var(--accent-red)' }}
    >
      <FilmSlateBar model={project.model} idx={0} />

      {/* Large ghost numeral inside hero card */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '2rem',
          fontFamily: 'var(--font-noto-jp)',
          fontSize: 'clamp(8rem, 18vw, 16rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          opacity: 0.03,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        壱
      </span>

      <div
        style={{
          padding: '0 1.75rem 1.75rem 1.75rem',
        }}
      >
        {/* Sleek inline FEATURED badge above title */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.35rem 0.75rem',
              background: 'rgba(230, 57, 70, 0.06)',
              border: '1px solid rgba(230, 57, 70, 0.15)',
              color: 'var(--accent-red)',
              fontSize: '0.5rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '4px',
                height: '4px',
                background: 'var(--accent-red)',
                borderRadius: '50%',
                marginRight: '0.6rem',
                boxShadow: '0 0 6px var(--accent-red)',
              }}
            ></span>
            Featured Project
          </span>
        </div>

        <div>
          <h3
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              margin: '0 0 1rem 0',
            }}
          >
            {project.name}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(0.88rem, 1.3vw, 1rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: '640px',
              marginBottom: '1.5rem',
            }}
          >
            {project.description}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem 1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {project.links.map((link) => {
              const isGit = link.name.toLowerCase().includes('git');
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-view
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '3px',
                    textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = 'var(--accent-red)';
                    el.style.borderColor = 'var(--accent-red)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = 'var(--text-primary)';
                    el.style.borderColor = 'var(--border)';
                  }}
                >
                  {isGit ? <GitBranch size={14} /> : <ExternalLink size={14} />}
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   AI PROJECTS SECTION
══════════════════════════════════════════════════ */
export function AIProjectsSection({ chapter = '05' }: { chapter?: string }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-5%' });
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: '-5%' });

  if (aiProjectsData.list.length === 0) return null;

  const [featuredProject, ...restProjects] = aiProjectsData.list;

  return (
    <section
      id="aiProjects"
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 8vh, 8rem) clamp(1.5rem, 5vw, 6rem)',
        overflow: 'hidden',
        /* Alternating bg: 05 = secondary */
        background: 'var(--bg-secondary)',
        minHeight: '100svh',
      }}
    >
      {/* ── Ghost Kanji: 知 (Knowledge) — far bottom-right, zero text overlap ── */}
      <KanjiAccent
        char="知"
        bottom="-8%"
        right="-4%"
        size="clamp(14rem, 30vw, 38rem)"
        opacity={0.018}
      />

      {/* ════════════════════════════════════════════
          CHAPTER HEADER
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
        }}
      >
        <ChapterLabel
          number={chapter}
          label="AI PROJECTS"
          labelJP="人工知能"
          labelTranslation="Artificial Intelligence"
        />
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

      {/* ── Editorial Intro Block ── */}
      <div ref={headerRef}>
        <motion.div
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          variants={stagger}
          style={{ marginBottom: 'clamp(3rem, 6vh, 5rem)', position: 'relative', zIndex: 2 }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            <JpTooltip translation="Artificial Intelligence" hint="AI & Machine Learning">
              <span style={{ color: 'var(--accent-red)', cursor: 'help' }}>人工知能</span>
            </JpTooltip>
            {' / '}MACHINE INTELLIGENCE
          </motion.p>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              margin: '0 0 1.25rem 0',
            }}
          >
            BUILDING
            <br />
            <span style={{ WebkitTextStroke: '1px var(--accent-red)', color: 'transparent' }}>
              WITH
            </span>{' '}
            AI
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
              color: 'var(--text-secondary)',
              maxWidth: '480px',
              lineHeight: 1.65,
              fontWeight: 300,
            }}
          >
            {aiProjectsData.subtitle}
          </motion.p>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════
          FEATURED PROJECT — Full width hero card
      ════════════════════════════════════════════ */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-5%' }}
        variants={stagger}
        style={{ position: 'relative', zIndex: 2, marginBottom: '1.5rem' }}
      >
        <HeroProjectCard project={featuredProject} />
      </motion.div>

      {/* ════════════════════════════════════════════
          GRID — Remaining projects (2-column)
      ════════════════════════════════════════════ */}
      {restProjects.length > 0 && (
        <div ref={gridRef}>
          <motion.div
            initial="hidden"
            animate={isGridInView ? 'visible' : 'hidden'}
            variants={stagger}
            style={{
              display: 'grid',
              /* Hard 2-column grid — auto-fit was creating 3 cols on wide screens */
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {restProjects.map((project, idx) => (
              <ProjectCard key={project.name} project={project} idx={idx + 1} variants={fadeUp} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}

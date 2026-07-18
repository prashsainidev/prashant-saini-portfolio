'use client';

/**
 * FreelanceSection — Chapter 04 : 委託 (FREELANCE / CLIENT WORK)
 *
 * Design: "Client Dossier" aesthetic — each project reads like a
 * classified brief / agency dossier, not a plain card.
 *   - Editorial intro block (mirrors Experience / AI Projects).
 *   - Film-slate chapter bar per project (same as AIProjectsSection).
 *   - Details rendered in ExperienceSection's manga-panel grid.
 *   - Ghost Kanji 委 (Entrust) anchored bottom-left, never overlapping.
 *   - Left-border hover ink stroke: --border → 3px --accent-red.
 *   - titleKanji shown with JpTooltip — not hardcoded anywhere.
 *
 * Data: 100% from src/data/freelance.ts — no hardcoding.
 */

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { ExternalLink, GitBranch } from 'lucide-react';
import { ChapterLabel } from '@/components/ui';
import { JpTooltip } from '@/components/ui/JpTooltip';
import { getSortedFreelanceProjects } from '@/data/freelance';
import { IFreelanceProject } from '@/types';

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

/* ── Helpers ── */
function formatDate(dateStr: string): string {
  // Data can be 'YYYY-MM-DD' or 'YYYY-MM' — parse manually to avoid locale issues
  const [year, month] = dateStr.split('-');
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

/* ══════════════════════════════════════════════════
   PROJECT ENTRY — Full editorial layout per project
══════════════════════════════════════════════════ */
function FreelanceEntry({ project, index }: { project: IFreelanceProject; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px -8% 0px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger}
      style={{ position: 'relative' }}
    >
      {/* ── Chapter Opening Bar (mirrors AIProjectsSection film slate) ── */}
      <motion.div
        variants={fadeLeft}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          padding: '0.85rem 1.5rem',
          background: 'rgba(230, 57, 70, 0.06)',
          borderLeft: '3px solid var(--accent-red)',
          borderRight: '1px solid rgba(230, 57, 70, 0.2)',
          borderTop: '1px solid rgba(230, 57, 70, 0.2)',
          borderBottom: '1px solid rgba(230, 57, 70, 0.2)',
          marginBottom: '2rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.25em',
            color: 'var(--accent-red)',
            opacity: 0.85,
            flexShrink: 0,
          }}
        >
          CL. {String(index + 1).padStart(2, '0')}
        </span>

        <span style={{ color: 'rgba(230,57,70,0.3)', fontSize: '0.5rem' }}>◆</span>

        {/* Kanji title with tooltip — the ONLY place it appears */}
        <JpTooltip translation={project.title} hint="Project (Japanese)">
          <span
            style={{
              fontFamily: 'var(--font-noto-jp)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              cursor: 'help',
            }}
          >
            {project.titleKanji}
          </span>
        </JpTooltip>

        <span style={{ color: 'rgba(230,57,70,0.3)', fontSize: '0.5rem' }}>◆</span>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.1em',
          }}
        >
          CLIENT: {project.client.toUpperCase()}
        </span>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
            color: 'var(--text-dim)',
            marginLeft: 'auto',
          }}
        >
          {formatDate(project.date)}
        </span>
      </motion.div>

      {/* ── Main Content: Title | Tagline | Links ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '1.5rem',
          alignItems: 'flex-start',
          marginBottom: '2rem',
        }}
      >
        <div>
          {/* Project Title — massive editorial */}
          <motion.h3
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              margin: '0 0 0.75rem 0',
            }}
          >
            {project.title}
          </motion.h3>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(0.88rem, 1.3vw, 1rem)',
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
              fontWeight: 300,
              marginBottom: '1rem',
            }}
          >
            {project.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: '680px',
            }}
          >
            {project.description}
          </motion.p>
        </div>

        {/* Links — right column, vertically centered */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'flex-end',
            paddingTop: '0.25rem',
            flexShrink: 0,
          }}
        >
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-view
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                padding: '0.5rem 1rem',
                border: '1px solid var(--text-primary)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 0.25s, color 0.25s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'var(--text-primary)';
                el.style.color = 'var(--bg-primary)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'transparent';
                el.style.color = 'var(--text-primary)';
              }}
            >
              <ExternalLink size={13} /> Live Site
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-view
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'color 0.25s',
                borderBottom: '1px solid transparent',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'var(--accent-red)';
                el.style.borderBottomColor = 'var(--accent-red)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'var(--text-dim)';
                el.style.borderBottomColor = 'transparent';
              }}
            >
              <GitBranch size={13} /> GitHub
            </a>
          )}
        </motion.div>
      </div>

      {/* Manga Panel Grid: uses gap+background trick to create 1px borders correctly */}
      <motion.div variants={stagger} style={{ marginBottom: '2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
          }}
        >
          {project.details.map((detail, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                padding: '1.1rem 1.4rem',
                position: 'relative',
                /* Each cell has its own bg — the gap+bg trick creates border lines */
                background: 'var(--bg-primary)',
                zIndex: 2,
              }}
            >
              {/* Panel number — top right ghost */}
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  color: 'var(--text-primary)',
                  opacity: 0.08,
                  letterSpacing: '0.1em',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Red dash bullet */}
              <span
                aria-hidden
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  background: 'var(--accent-red)',
                  opacity: 0.7,
                  marginBottom: '0.6rem',
                }}
              />

              <p
                style={{
                  fontFamily: 'var(--font-space)',
                  fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                {detail}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Tech Stack ── */}
      <motion.div
        variants={stagger}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        {project.tech.map((t) => (
          <motion.span
            key={t}
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.14em',
              padding: '3px 10px',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              background: 'rgba(240,235,224,0.03)',
              textTransform: 'uppercase',
            }}
          >
            {t}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ── Ink Dot Separator — between entries ── */
function InkDotSeparator() {
  return (
    <div
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: 'clamp(2rem, 4vw, 3.5rem) 0',
      }}
    >
      <div style={{ flex: 1, height: '1px', background: 'var(--border)', opacity: 0.4 }} />
      <span
        style={{
          fontFamily: 'var(--font-noto-jp)',
          fontSize: '0.9rem',
          color: 'var(--accent-red)',
          opacity: 0.5,
        }}
      >
        ✦
      </span>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)', opacity: 0.4 }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   FREELANCE SECTION
══════════════════════════════════════════════════ */
export function FreelanceSection({ chapter }: { chapter: string }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-5% 0px' });
  const projects = getSortedFreelanceProjects();

  return (
    <section
      id="freelance"
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 8vh, 8rem) clamp(1.5rem, 5vw, 6rem)',
        overflow: 'hidden',
        /* Alternating bg: 04 = primary */
        background: 'var(--bg-primary)',
        minHeight: '100svh',
      }}
    >
      {/* ── Ghost Kanji: 委 (Entrust) — bottom-left, zero text overlap ── */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-8%',
          left: '-4%',
          fontFamily: 'var(--font-noto-jp)',
          fontSize: 'clamp(14rem, 30vw, 38rem)',
          color: 'var(--text-primary)',
          opacity: 0.018,
          fontWeight: 900,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        委
      </span>

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
          label="FREELANCE"
          labelJP="業務委託"
          labelTranslation="Client Work"
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
            <JpTooltip translation="Entrust / Contract Work" hint="Freelance">
              <span style={{ color: 'var(--accent-red)', cursor: 'help' }}>業務委託</span>
            </JpTooltip>
            {' / '}CLIENT WORK
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
            CRAFTING
            <br />
            <span style={{ WebkitTextStroke: '1px var(--accent-red)', color: 'transparent' }}>
              REAL
            </span>{' '}
            PRODUCTS
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
            Client projects where design precision and engineering quality are non-negotiable.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Freelance Entries ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {projects.map((project, i) => (
          <div key={project.id}>
            <FreelanceEntry project={project} index={i} />
            {i < projects.length - 1 && <InkDotSeparator />}
          </div>
        ))}
      </div>
    </section>
  );
}

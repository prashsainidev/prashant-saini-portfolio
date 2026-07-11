/**
 * ExperienceSection — Manga Chapter [ 05 ] : 経験 (EXPERIENCE)
 *
 * Design: Manga Chapter Break Layout + Hanko Seal System
 *   - Each company = a new Manga Chapter opening page (full-width red accent bar).
 *   - Ghost Kanji "経" (Experience) watermarks the entire section background.
 *   - "PRESENT" role gets a glowing red Hanko seal — Japanese ink stamp style.
 *   - Achievements displayed in 2-column manga panel grid.
 *   - Ink dot (✦) separators between entries — no boring timeline line.
 *   - Chapter number fixed top-left, Kanji watermark bottom-right — no overlap.
 *
 * Data: 100% from src/data/experience.ts — no hardcoding.
 */
'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { ChapterLabel } from '@/components/ui';
import { JpTooltip } from '@/components/ui/JpTooltip';
import { experienceData } from '@/data/experience';
import { IExperience } from '@/types';

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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
};

/* ── Helpers ─────────────────────────────────────── */
function formatDate(dateStr: string): string {
  if (dateStr === 'present') return 'PRESENT';
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
  return `${months[parseInt(month) - 1]} ${year}`;
}

function getDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate + '-01');
  const end = endDate === 'present' ? new Date() : new Date(endDate + '-01');
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (months < 1) return '< 1 mo';
  if (months < 12) return `${months} mo`;
  const yrs = Math.floor(months / 12);
  const mo = months % 12;
  return mo > 0 ? `${yrs}yr ${mo}mo` : `${yrs} yr`;
}

/* ── Type badge labels ─────────────────────────────── */
const TYPE_LABELS: Record<IExperience['type'], { label: string; jp: string }> = {
  'full-time': { label: 'Full-Time', jp: '正社員' },
  internship: { label: 'Internship', jp: 'インターン' },
  freelance: { label: 'Freelance', jp: 'フリーランス' },
  contract: { label: 'Contract', jp: '契約' },
};

/* ══════════════════════════════════════════════════
   HANKO SEAL — Japanese ink stamp for PRESENT role
══════════════════════════════════════════════════ */
function HankoSeal({ text }: { text: string }) {
  return (
    <motion.div
      variants={scaleIn}
      style={{
        position: 'relative',
        width: 72,
        height: 72,
        flexShrink: 0,
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2.5px solid var(--accent-red)',
          boxShadow: '0 0 18px rgba(230,57,70,0.4), inset 0 0 12px rgba(230,57,70,0.08)',
          animation: 'hanko-pulse 2.5s ease-in-out infinite',
        }}
      />
      {/* Inner ring */}
      <div
        style={{
          position: 'absolute',
          inset: 6,
          borderRadius: '50%',
          border: '1px solid rgba(230,57,70,0.35)',
        }}
      />
      {/* Center text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-noto-jp)',
            fontSize: '0.5rem',
            color: 'var(--accent-red)',
            letterSpacing: '0.1em',
            lineHeight: 1,
          }}
        >
          現在
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.42rem',
            color: 'var(--accent-red)',
            letterSpacing: '0.15em',
            opacity: 0.8,
          }}
        >
          {text}
        </span>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   EXPERIENCE ENTRY — Full Manga Chapter Layout
══════════════════════════════════════════════════ */
function ExperienceEntry({ exp, index }: { exp: IExperience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px -8% 0px' });
  const isPresent = exp.endDate === 'present';
  const typeInfo = TYPE_LABELS[exp.type];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger}
      style={{ position: 'relative' }}
    >
      {/* ── Chapter Opening Bar (full-width red film-slate) ── */}
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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Chapter stamp — left */}
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
          CH. {exp.chapter.padStart(2, '0')}
        </span>

        {/* Divider dot */}
        <span style={{ color: 'rgba(230,57,70,0.3)', fontSize: '0.5rem' }}>◆</span>

        {/* Type badge (JP) */}
        <JpTooltip translation={typeInfo.label} hint="Work Type">
          <span
            style={{
              fontFamily: 'var(--font-noto-jp)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
            }}
          >
            {typeInfo.jp}
          </span>
        </JpTooltip>

        {/* Date range */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
            color: 'var(--text-dim)',
            marginLeft: 'auto',
          }}
        >
          {formatDate(exp.startDate)} → {formatDate(exp.endDate)}
        </span>

        {/* Duration */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--accent-red)',
            opacity: 0.65,
            letterSpacing: '0.08em',
          }}
        >
          {getDuration(exp.startDate, exp.endDate)}
        </span>

        {/* Decorative slash — top right corner */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, rgba(230,57,70,0.5), transparent)',
          }}
        />
      </motion.div>

      {/* ── Main Content: Company | Role | Hanko ── */}
      <div
        style={{
          padding: '0',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '1.5rem',
          alignItems: 'flex-start',
          marginBottom: '2rem',
        }}
      >
        {/* Left: Company name + role */}
        <div>
          {/* Company Name — massive editorial */}
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
              margin: '0 0 0.5rem 0',
            }}
          >
            {exp.company}
          </motion.h3>

          {/* JP Company Kanji — red accent */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}
          >
            <JpTooltip translation={exp.company} hint="Company (Japanese)">
              <span
                style={{
                  fontFamily: 'var(--font-noto-jp)',
                  fontSize: '1rem',
                  color: 'var(--accent-red)',
                  fontWeight: 700,
                  opacity: 0.7,
                }}
              >
                {exp.companyKanji}
              </span>
            </JpTooltip>
            <span
              style={{
                width: 40,
                height: 1,
                background: 'rgba(230,57,70,0.3)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {exp.location}
            </span>
          </motion.div>

          {/* Role — clean editorial */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)',
              color: 'var(--text-secondary)',
              fontWeight: 300,
              margin: 0,
              letterSpacing: '0.04em',
              fontStyle: 'italic',
            }}
          >
            {exp.role}
          </motion.p>
        </div>

        {/* Right: Hanko Seal (PRESENT only) or index number */}
        <motion.div variants={scaleIn}>
          {isPresent ? (
            <HankoSeal text="NOW" />
          ) : (
            /* Past entry — ghost chapter number as seal */
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: '1.5px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-space)',
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  opacity: 0.2,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Manga Panel Grid: Achievements ── */}
      <motion.div
        variants={stagger}
        style={{
          padding: '0',
          marginBottom: '2rem',
        }}
      >
        {/* Panel grid — 2 cols on desktop */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1px',
            border: '1px solid var(--border)',
          }}
        >
          {exp.description.map((bullet, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                padding: '1.1rem 1.4rem',
                borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                borderBottom: i < exp.description.length - 2 ? '1px solid var(--border)' : 'none',
                position: 'relative',
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
                {bullet}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Tech Stack ── */}
      <motion.div
        variants={stagger}
        style={{
          padding: '0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '0.5rem',
        }}
      >
        {exp.tech.map((t) => (
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

/* ══════════════════════════════════════════════════
   INK DOT SEPARATOR — between entries
══════════════════════════════════════════════════ */
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
   EXPERIENCE SECTION
══════════════════════════════════════════════════ */
export function ExperienceSection({ chapter }: { chapter: string }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-5% 0px' });

  /* Sort: newest first (present entries at top) */
  const sorted = [...experienceData].sort((a, b) => {
    if (a.endDate === 'present') return -1;
    if (b.endDate === 'present') return 1;
    return b.startDate.localeCompare(a.startDate);
  });

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 8vh, 8rem) clamp(1.5rem, 5vw, 6rem)',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Removed Kanji watermarks to maintain a clean, readable layout for the dense Experience section */}

      {/* ════════════════════════════════════════════
          CHAPTER HEADER (Consistent with About/Skills/Projects)
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
          label="EXPERIENCE"
          labelJP="経験"
          labelTranslation="Work Experience"
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

      {/* ── Section Intro ── */}
      <div ref={headerRef}>
        <motion.div
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          variants={stagger}
          style={{ marginBottom: 'clamp(3rem, 6vh, 5rem)' }}
        >
          {/* Ghost word */}
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
            <JpTooltip translation="The Path / Career Path" hint="Journey">
              <span style={{ color: 'var(--accent-red)', cursor: 'help' }}>仕方の道</span>
            </JpTooltip>
            {' / '}CAREER PATH
          </motion.p>

          {/* Main headline */}
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              margin: '0 0 1.25rem 0',
            }}
          >
            THE
            <br />
            <span style={{ WebkitTextStroke: '1px var(--accent-red)', color: 'transparent' }}>
              JOURNEY
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              color: 'var(--text-secondary)',
              maxWidth: '480px',
              lineHeight: 1.65,
              fontWeight: 300,
            }}
          >
            Every line of code is a step forward. Here is where ideas became real systems.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Experience Entries ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {sorted.map((exp, i) => (
          <div key={exp.id}>
            <ExperienceEntry exp={exp} index={i} />
            {/* Ink dot separator between entries, not after the last one */}
            {i < sorted.length - 1 && <InkDotSeparator />}
          </div>
        ))}
      </div>
    </section>
  );
}

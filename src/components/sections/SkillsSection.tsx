/**
 * SkillsSection — Chapter 02: THE ARSENAL
 *
 * Design: Zero-Gravity Physics Chamber
 * - Skill pills fall from top with staggered timing (GSAP-powered gravity)
 * - Mouse repulsion: pills scatter away from cursor
 * - 3 category tabs to filter pills mid-animation
 * - Massive ghost text "ARSENAL" in background
 * - Cinematic chapter header with ChapterLabel
 *
 * Data: 100% from src/data/skills.ts
 */
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ChapterLabel } from '@/components/ui';
import { skillsData } from '@/data/skills';
import { ISkill } from '@/types';

/* ── Level color map ─────────────────────────── */
const LEVEL_CONFIG = {
  expert: { label: 'EXPERT', color: 'var(--accent-red)', glow: 'rgba(200,40,40,0.35)' },
  proficient: { label: 'PROFICIENT', color: 'var(--text-primary)', glow: 'rgba(255,255,255,0.12)' },
  learning: { label: 'LEARNING', color: 'var(--text-dim)', glow: 'rgba(120,120,120,0.1)' },
};

/* ── Flatten all skills with category metadata ── */
interface FlatSkill extends ISkill {
  categoryId: string;
  categoryLabel: string;
  kanjiChar: string;
  index: number;
}

const ALL_SKILLS: FlatSkill[] = skillsData.flatMap((cat) =>
  cat.skills.map((s, i) => ({
    ...s,
    categoryId: cat.id,
    categoryLabel: cat.label,
    kanjiChar: cat.kanjiChar,
    index: i,
  }))
);

/**
 * Deterministic rotation based on skill name — same value on server AND client.
 * Replaces Math.random() to prevent SSR hydration mismatch.
 */
function seededRotation(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  }
  // Map hash to range -14 to +14 degrees
  return (hash % 280) / 10 - 14;
}

/* ══════════════════════════════════════════════════
   SKILL PILL (individual card)
══════════════════════════════════════════════════ */
function SkillPill({
  skill,
  delay,
  isVisible,
  pillRef,
}: {
  skill: FlatSkill;
  delay: number;
  isVisible: boolean;
  pillRef: (el: HTMLDivElement | null) => void;
}) {
  const cfg = LEVEL_CONFIG[skill.level];

  return (
    <motion.div
      ref={pillRef}
      initial={{ opacity: 0, y: -120, rotate: seededRotation(skill.name) }}
      animate={
        isVisible
          ? {
              opacity: 1,
              y: 0,
              rotate: 0,
              transition: {
                type: 'spring',
                stiffness: 120,
                damping: 14,
                delay,
              },
            }
          : { opacity: 0, y: -120 }
      }
      whileHover={{ scale: 1.08, zIndex: 10 }}
      data-cursor-hover
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.55rem 1.1rem',
        border: `1px solid ${cfg.color}`,
        borderRadius: '3px',
        background: `radial-gradient(ellipse at 50% 0%, ${cfg.glow} 0%, transparent 70%)`,
        cursor: 'default',
        userSelect: 'none',
        position: 'relative',
        backdropFilter: 'blur(4px)',
        willChange: 'transform',
        flexShrink: 0,
      }}
    >
      {/* Level dot */}
      <span
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: cfg.color,
          flexShrink: 0,
          boxShadow: `0 0 6px ${cfg.color}`,
        }}
      />

      {/* Skill name */}
      <span
        style={{
          fontSize: '0.72rem',
          letterSpacing: '0.12em',
          fontWeight: 600,
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
          whiteSpace: 'nowrap',
        }}
      >
        {skill.name}
      </span>

      {/* Level label */}
      <span
        style={{
          fontSize: '0.44rem',
          letterSpacing: '0.2em',
          color: cfg.color,
          fontWeight: 700,
          textTransform: 'uppercase',
          opacity: 0.75,
        }}
      >
        {cfg.label}
      </span>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   CATEGORY TAB
══════════════════════════════════════════════════ */
function CategoryTab({
  label,
  labelJP,
  kanjiChar,
  isActive,
  count,
  onClick,
}: {
  label: string;
  labelJP: string;
  kanjiChar: string;
  isActive: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor-hover
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '3px',
        padding: '0.75rem 1.2rem',
        border: '1px solid',
        borderColor: isActive ? 'var(--accent-red)' : 'var(--border)',
        background: isActive
          ? 'radial-gradient(ellipse at 0% 0%, rgba(200,40,40,0.12) 0%, transparent 70%)'
          : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        minWidth: '120px',
      }}
    >
      {/* Kanji stamp */}
      <span
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-noto-jp)',
          fontSize: '2.5rem',
          fontWeight: 900,
          color: isActive ? 'var(--accent-red)' : 'var(--text-dim)',
          opacity: 0.08,
          userSelect: 'none',
          lineHeight: 1,
          transition: 'color 0.3s ease, opacity 0.3s ease',
        }}
      >
        {kanjiChar}
      </span>

      <span
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: isActive ? 'var(--accent-red)' : 'var(--text-dim)',
          fontWeight: 700,
          transition: 'color 0.3s ease',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-noto-jp)',
          fontSize: '0.55rem',
          color: 'var(--text-dim)',
          opacity: 0.55,
          letterSpacing: '0.05em',
        }}
      >
        {labelJP}
      </span>
      <span
        style={{
          fontSize: '0.48rem',
          letterSpacing: '0.15em',
          color: 'var(--text-dim)',
          opacity: 0.4,
          marginTop: '1px',
        }}
      >
        {count} TOOLS
      </span>
    </button>
  );
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export function SkillsSection({ chapter = '02' }: { chapter?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Collect pill refs for mouse repulsion
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredSkills =
    activeCategory === 'all'
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.categoryId === activeCategory);

  /* ── Mouse Repulsion Effect ── */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const RADIUS = 100;
    const STRENGTH = 60;

    pillRefs.current.forEach((pill) => {
      if (!pill) return;
      const rect = pill.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < RADIUS && dist > 0) {
        const force = (RADIUS - dist) / RADIUS;
        gsap.to(pill, {
          x: -(dx / dist) * force * STRENGTH,
          y: -(dy / dist) * force * STRENGTH,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(pill, {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          overwrite: 'auto',
        });
      }
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Reset pill refs on category change
  useEffect(() => {
    pillRefs.current = [];
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(3rem, 6vh, 6rem) clamp(1.5rem, 5vw, 6rem)',
        overflow: 'hidden',
      }}
    >
      {/* ── Ghost background text ── */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(6rem, 22vw, 22rem)',
          fontWeight: 900,
          letterSpacing: '-0.06em',
          color: 'transparent',
          WebkitTextStroke: '1px var(--border)',
          whiteSpace: 'nowrap',
          opacity: 0.07,
          userSelect: 'none',
          pointerEvents: 'none',
          fontFamily: 'var(--font-space-grotesk)',
          zIndex: 0,
        }}
      >
        ARSENAL
      </span>

      {/* ── Ghost Kanji ── */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-2rem',
          right: '-1rem',
          fontFamily: 'var(--font-noto-jp)',
          fontSize: 'clamp(10rem, 20vw, 22rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          opacity: 0.025,
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        武
      </span>

      {/* ════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'clamp(2rem, 4vh, 3.5rem)',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <ChapterLabel
          number={chapter}
          label="The Arsenal"
          labelJP="武器"
          labelTranslation="Weapons / Skills"
        />

        <span
          aria-hidden
          style={{
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '1px var(--border)',
            letterSpacing: '-0.05em',
            opacity: 0.18,
            userSelect: 'none',
            fontFamily: 'var(--font-space-grotesk)',
          }}
        >
          {chapter}
        </span>
      </motion.div>

      {/* ════════════════════════════════════════════
          SECTION HEADLINE
      ════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        style={{ marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)', position: 'relative', zIndex: 2 }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            maxWidth: '28ch',
          }}
        >
          Tools I&apos;ve mastered.{' '}
          <span style={{ color: 'var(--accent-red)', WebkitTextStroke: '0px' }}>
            Weapons I deploy.
          </span>
        </h2>
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
            marginTop: '0.6rem',
            letterSpacing: '0.05em',
            fontStyle: 'italic',
          }}
        >
          Move your cursor — watch them scatter.
        </p>
      </motion.div>

      {/* ════════════════════════════════════════════
          CATEGORY TABS
      ════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.25 }}
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* All tab */}
        <CategoryTab
          label="All"
          labelJP="全て"
          kanjiChar="全"
          isActive={activeCategory === 'all'}
          count={ALL_SKILLS.length}
          onClick={() => setActiveCategory('all')}
        />
        {skillsData.map((cat) => (
          <CategoryTab
            key={cat.id}
            label={cat.label}
            labelJP={cat.labelJP}
            kanjiChar={cat.kanjiChar}
            isActive={activeCategory === cat.id}
            count={cat.skills.length}
            onClick={() => setActiveCategory(cat.id)}
          />
        ))}
      </motion.div>

      {/* ════════════════════════════════════════════
          PILLS — PHYSICS CHAMBER
      ════════════════════════════════════════════ */}
      <div
        ref={pillsContainerRef}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          alignContent: 'flex-start',
          minHeight: '200px',
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, i) => (
            <SkillPill
              key={`${skill.categoryId}-${skill.name}`}
              skill={skill}
              delay={isInView ? 0.3 + i * 0.06 : 0}
              isVisible={isInView}
              pillRef={(el) => {
                pillRefs.current[i] = el;
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* ── Legend ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
        style={{
          display: 'flex',
          gap: '2rem',
          marginTop: 'clamp(1.5rem, 3vh, 2.5rem)',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 2,
          paddingTop: '1rem',
          borderTop: '1px solid var(--border)',
        }}
      >
        {Object.entries(LEVEL_CONFIG).map(([key, cfg]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: cfg.color,
                boxShadow: `0 0 8px ${cfg.color}`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '0.5rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                fontWeight: 600,
              }}
            >
              {cfg.label}
            </span>
          </div>
        ))}

        {/* Scroll hint */}
        <span
          style={{
            marginLeft: 'auto',
            fontSize: '0.48rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-dim)',
            opacity: 0.4,
            fontFamily: 'var(--font-noto-jp)',
          }}
        >
          武器庫
        </span>
      </motion.div>

      {/* ── Bottom border ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: '1px',
          backgroundColor: 'var(--border)',
          transformOrigin: 'left',
          marginTop: 'clamp(2rem, 5vh, 4rem)',
          position: 'relative',
          zIndex: 2,
        }}
      />
    </section>
  );
}

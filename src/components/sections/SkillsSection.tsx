/**
 * SkillsSection — Chapter 02: THE ARSENAL
 *
 * Design: RPG Weapon Loadout Chamber
 * - 3-tier visual hierarchy: Expert > Proficient > Learning
 * - Expert: pulse glow, hanko stamp (極), thicker red border, larger size
 * - Proficient: solid border, clean baseline
 * - Learning: dashed border, muted opacity, solidifies on hover
 * - Cross-fade tier label ↔ SINCE stat on hover (zero CLS)
 * - Mouse repulsion scatter with rotation (GSAP on wrapper, Framer on inner)
 * - Category tabs styled as loadout slots with EQUIPPED badge
 *
 * Data: 100% from src/data/skills.ts
 */
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ChapterLabel, JpTooltip } from '@/components/ui';
import { skillsData } from '@/data/skills';
import { ISkill } from '@/types';

/* ══════════════════════════════════════════════════
   TIER CONFIG
══════════════════════════════════════════════════ */
const TIER_CONFIG = {
  expert: {
    label: 'EXPERT',
    dotColor: 'var(--accent-red)',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: 'var(--accent-red)',
    fontSize: '0.76rem',
    padding: '0.65rem 1.2rem',
    cardOpacity: 1,
    animation: 'expertPulse 2.8s ease-in-out infinite',
    stampChar: '極',
    background: 'radial-gradient(ellipse at 50% 0%, var(--expert-glow-color) 0%, transparent 70%)',
  },
  proficient: {
    label: 'PROFICIENT',
    dotColor: 'var(--text-primary)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--border)',
    fontSize: '0.72rem',
    padding: '0.55rem 1.1rem',
    cardOpacity: 1,
    animation: 'none',
    stampChar: '',
    background: 'transparent',
  },
  learning: {
    label: 'LEARNING',
    dotColor: 'var(--text-dim)',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: 'var(--border)',
    fontSize: '0.65rem',
    padding: '0.45rem 0.9rem',
    cardOpacity: 0.72,
    animation: 'none',
    stampChar: '',
    background: 'transparent',
  },
} as const;

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

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Deterministic rotation — same on server AND client (no SSR mismatch).
 */
function seededRotation(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  }
  return (hash % 280) / 10 - 14;
}

/* ══════════════════════════════════════════════════
   SKILL PILL
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
  const [hovered, setHovered] = useState(false);
  const cfg = TIER_CONFIG[skill.level];
  const yearsUsed = skill.since ? CURRENT_YEAR - skill.since : null;

  return (
    /* Outer div — GSAP scatter target (transform only, no Framer conflict) */
    <div ref={pillRef} style={{ display: 'inline-block', willChange: 'transform', flexShrink: 0 }}>
      {/* Inner motion.div — Framer entrance + hover lift */}
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
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
        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
        whileHover={{ scale: 1.06, y: -3 }}
        data-cursor-hover
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.2rem',
          padding: cfg.padding,
          border: `${cfg.borderWidth} ${hovered && skill.level === 'learning' ? 'solid' : cfg.borderStyle} ${cfg.borderColor}`,
          borderRadius: '3px',
          position: 'relative',
          opacity: hovered && skill.level === 'learning' ? 1 : cfg.cardOpacity,
          cursor: 'default',
          userSelect: 'none',
          backdropFilter: 'blur(4px)',
          animation: cfg.animation,
          background: cfg.background,
          transition: 'opacity 0.25s ease',
        }}
      >
        {/* Expert hanko stamp */}
        {skill.level === 'expert' && (
          <span
            aria-hidden
            style={{
              position: 'absolute',
              top: '5px',
              right: '6px',
              fontFamily: 'var(--font-noto-jp)',
              fontSize: '0.5rem',
              fontWeight: 900,
              color: 'var(--accent-red)',
              opacity: 0.4,
              lineHeight: 1,
              border: '1px solid var(--accent-red)',
              borderRadius: '2px',
              padding: '0 2px',
              userSelect: 'none',
            }}
          >
            {cfg.stampChar}
          </span>
        )}

        {/* Dot + name row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: cfg.dotColor,
              flexShrink: 0,
              boxShadow: skill.level === 'expert' ? `0 0 6px ${cfg.dotColor}` : 'none',
            }}
          />
          <span
            style={{
              fontSize: cfg.fontSize,
              letterSpacing: '0.12em',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
            }}
          >
            {skill.name}
          </span>
        </div>

        {/* Fixed-height slot: tier label ↔ since stat cross-fade — Grid stacking prevents overflow */}
        <div
          style={{
            display: 'grid',
            gridTemplateAreas: '"stack"',
            paddingLeft: '0.9rem',
            height: '0.85rem',
          }}
        >
          <motion.span
            animate={{ opacity: hovered ? 0 : 0.75 }}
            transition={{ duration: 0.15 }}
            style={{
              gridArea: 'stack',
              fontSize: '0.44rem',
              letterSpacing: '0.2em',
              color: cfg.dotColor,
              fontWeight: 700,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              lineHeight: '0.85rem',
            }}
          >
            {cfg.label}
          </motion.span>
          <motion.span
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            style={{
              gridArea: 'stack',
              fontSize: '0.42rem',
              letterSpacing: '0.18em',
              color: 'var(--text-dim)',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              lineHeight: '0.85rem',
            }}
          >
            {skill.since ? `SINCE ${skill.since}${yearsUsed ? ` · ${yearsUsed}Y` : ''}` : cfg.label}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   CATEGORY TAB — Loadout Slot
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
        padding: '0.75rem 3.5rem 0.75rem 1.2rem',
        border: isActive ? '2px solid var(--accent-red)' : '1px solid var(--border)',
        background: isActive
          ? 'radial-gradient(ellipse at 0% 0%, rgba(200,40,40,0.12) 0%, transparent 70%)'
          : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        minWidth: '130px',
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

      {/* "SLOT EQUIPPED" badge — only when active */}
      {isActive && (
        <span
          style={{
            position: 'absolute',
            top: '5px',
            right: '6px',
            fontSize: '0.32rem',
            letterSpacing: '0.15em',
            color: 'var(--accent-red)',
            fontWeight: 700,
            textTransform: 'uppercase',
            opacity: 0.7,
            border: '1px solid var(--accent-red)',
            borderRadius: '2px',
            padding: '1px 3px',
            lineHeight: 1.4,
          }}
        >
          EQUIPPED
        </span>
      )}

      {/* Category label */}
      <span
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: isActive ? 'var(--accent-red)' : 'var(--text-primary)',
          fontWeight: 700,
          transition: 'color 0.3s ease',
        }}
      >
        {label}
      </span>

      {/* JP label */}
      <span
        style={{
          fontFamily: 'var(--font-noto-jp)',
          fontSize: '0.55rem',
          color: isActive ? 'var(--accent-red)' : 'var(--text-primary)',
          opacity: 0.6,
          letterSpacing: '0.05em',
          transition: 'color 0.3s ease',
        }}
      >
        {labelJP}
      </span>

      {/* Count */}
      <span
        style={{
          fontSize: '0.48rem',
          letterSpacing: '0.15em',
          color: isActive ? 'var(--accent-red)' : 'var(--text-primary)',
          opacity: 0.5,
          marginTop: '1px',
          transition: 'color 0.3s ease',
        }}
      >
        {count} WEAPONS
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

  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredSkills =
    activeCategory === 'all'
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.categoryId === activeCategory);

  /* ── Mouse Repulsion — tighter radius so hovering is always possible ── */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const RADIUS = 75; /* was 150 — reduced so cursor can actually reach cards */
    const STRENGTH = 35; /* was 80  — gentler push, cards clattering not fleeing */
    const MAX_ROTATE = 10;

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
        const pushX = -(dx / dist) * force * STRENGTH;
        const pushY = -(dy / dist) * force * STRENGTH;
        // Rotation: pushed left → clockwise, pushed right → counter-clockwise
        const rotate = (pushX / STRENGTH) * -MAX_ROTATE;
        gsap.to(pill, {
          x: pushX,
          y: pushY,
          rotate,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(pill, {
          x: 0,
          y: 0,
          rotate: 0,
          duration: 1.4,
          ease: 'elastic.out(1, 0.4)',
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

  useEffect(() => {
    pillRefs.current = [];
  }, [activeCategory]);

  const expertCount = ALL_SKILLS.filter((s) => s.level === 'expert').length;

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
        padding: 'clamp(4rem, 8vh, 8rem) clamp(1.5rem, 5vw, 6rem)',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
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
          bottom: '2rem' /* Moved up from -2rem so it doesn't get cut off by overflow: hidden */,
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
          marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
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
          SECTION HEADLINE
      ════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        style={{
          marginTop: '1.5rem',
          marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
          position: 'relative',
          zIndex: 2,
        }}
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
          CATEGORY TABS — Loadout Slots
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
          PILLS — SCATTER CHAMBER
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
          minHeight: '220px',
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
          alignItems: 'center',
        }}
      >
        {(Object.entries(TIER_CONFIG) as [string, (typeof TIER_CONFIG)['expert']][]).map(
          ([key, cfg]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: cfg.dotColor,
                  boxShadow: key === 'expert' ? `0 0 8px ${cfg.dotColor}` : 'none',
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
          )
        )}

        {/* Summary stat moved here to right side of legend */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '0.5rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--text-dim)',
              fontWeight: 600,
              opacity: 0.6,
            }}
          >
            {expertCount} EXPERT WEAPONS · {ALL_SKILLS.length} TOTAL
          </span>
        </div>
      </motion.div>
    </section>
  );
}

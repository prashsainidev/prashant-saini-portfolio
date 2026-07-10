/**
 * HeroSection — Parallax Character Hero
 *
 * Layout: 5-layer mouse-reactive parallax
 *   Layer 0 (z=0): Ghost Kanji — barely moves
 *   Layer 1 (z=1): Back floating Kanji — slow
 *   Layer 2 (z=2): Character image — medium (scroll reveal)
 *   Layer 3 (z=3): Front Kanji + cranes — fast
 *   Layer 4 (z=4): Typography — fixed
 *
 * Scroll Reveal: Character starts with face below viewport (translateY +30vh)
 * As user scrolls, GSAP moves character upward → face reveals (Tanmay-style)
 *
 * Character: /images/hero-character.png (transparent PNG)
 * Mouse → GSAP quickTo → smooth 60fps movement per layer
 */
'use client';

import { useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChapterLabel, JpTooltip } from '@/components/ui';
import { heroData } from '@/data/hero';

gsap.registerPlugin(ScrollTrigger);

/* ── Framer Motion variants ─────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

/* ── Floating Kanji data ────────────────────────── */
const BACK_KANJI = [
  { char: '誠', top: '12%', left: '5%', size: '5rem', opacity: 0.07 },
  { char: '技', top: '60%', left: '8%', size: '3.5rem', opacity: 0.06 },
  { char: '道', top: '78%', left: '55%', size: '3rem', opacity: 0.05 },
];

const FRONT_KANJI = [
  { char: '創', top: '8%', right: '12%', size: '4rem', opacity: 0.18, color: 'var(--accent-red)' },
  {
    char: '誠',
    top: '55%',
    right: '6%',
    size: '2.5rem',
    opacity: 0.14,
    color: 'var(--accent-red)',
  },
];

/* ── Origami crane SVG ──────────────────────────── */
function CraneSvg({ size = 28, opacity = 0.25 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="var(--accent-gold, #C9A96E)"
      strokeWidth="2.5"
      strokeLinejoin="round"
      style={{ opacity }}
    >
      <path d="M50 10 L80 50 L50 40 L20 50 Z" />
      <path d="M50 40 L50 90" />
      <path d="M50 90 L30 75" />
      <path d="M50 90 L70 75" />
      <path d="M20 50 L5 35" />
      <path d="M80 50 L95 35" />
    </svg>
  );
}

/* ── Main Component ─────────────────────────────── */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const charEl = charRef.current;
    const backEl = backRef.current;
    const frontEl = frontRef.current;
    if (!section || !charEl || !backEl || !frontEl) return;

    /* QuickTo for buttery smooth 60fps movement */
    const charX = gsap.quickTo(charEl, 'x', { duration: 0.6, ease: 'power3.out' });
    const charY = gsap.quickTo(charEl, 'y', { duration: 0.6, ease: 'power3.out' });
    const backX = gsap.quickTo(backEl, 'x', { duration: 0.9, ease: 'power3.out' });
    const backY = gsap.quickTo(backEl, 'y', { duration: 0.9, ease: 'power3.out' });
    const frontX = gsap.quickTo(frontEl, 'x', { duration: 0.4, ease: 'power3.out' });
    const frontY = gsap.quickTo(frontEl, 'y', { duration: 0.4, ease: 'power3.out' });

    /* Head-turn: subtle rotateY on character based on mouse X — use set, not quickTo */
    function applyRotateY(val: number) {
      gsap.to(charEl, { rotateY: val, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    }

    /* ── SCROLL REVEAL: section overflow:hidden clips character at bottom ── */
    /* Character pushed down 25% initially — only body visible, face hidden */
    gsap.set(charEl, { yPercent: 20 });

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: (self) => {
        /* progress 0→1: character moves from +20% down to -15% up (face fully revealed) */
        const offsetY = gsap.utils.interpolate(20, -15, self.progress);
        gsap.set(charEl, { yPercent: offsetY });
      },
    });

    function onMouseMove(e: MouseEvent) {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      /* Normalize to -0.5 → +0.5 */
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      /* Each layer moves at different depth factor */
      backX(nx * 18);
      backY(ny * 12); // far — slow
      charX(nx * 32);
      charY(ny * 20); // mid — medium
      frontX(nx * -24);
      frontY(ny * -14); // near — opposite (creates depth)

      /* Head-turn illusion: -8deg to +8deg */
      applyRotateY(nx * 8);
    }

    function onMouseLeave() {
      /* Spring back to center */
      gsap.to([charEl, backEl, frontEl], {
        x: 0,
        y: 0,
        rotateY: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
      });
    }

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);

    /* Scroll indicator pulse */
    if (scrollLineRef.current) {
      gsap.to(scrollLineRef.current, {
        scaleY: 0.3,
        duration: 0.9,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        transformOrigin: 'top center',
      });
    }

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 clamp(1.5rem, 5vw, 6rem)',
        paddingTop: '64px',
        overflow: 'hidden',
        /* Perspective for the head-turn 3D effect */
        perspective: '1200px',
      }}
    >
      {/* ══ LAYER 0 — Ghost Kanji (barely moves, z=0) ══ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            right: 'clamp(2rem, 5vw, 7rem)',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--font-noto-jp)',
            fontSize: 'clamp(12rem, 28vw, 32rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: 'var(--text-primary)',
            opacity: 0.03,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          誠
        </span>
      </div>

      {/* ══ LAYER 1 — Back floating Kanji (slow) ══ */}
      <div
        ref={backRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        {BACK_KANJI.map((k, i) => (
          <span
            key={i}
            aria-hidden
            style={{
              position: 'absolute',
              top: k.top,
              left: k.left,
              fontFamily: 'var(--font-noto-jp)',
              fontSize: k.size,
              fontWeight: 900,
              color: 'var(--text-primary)',
              opacity: k.opacity,
              userSelect: 'none',
            }}
          >
            {k.char}
          </span>
        ))}
        {/* Origami cranes — back */}
        <div style={{ position: 'absolute', top: '20%', left: '30%' }}>
          <CraneSvg size={22} opacity={0.15} />
        </div>
        <div style={{ position: 'absolute', top: '70%', left: '70%' }}>
          <CraneSvg size={18} opacity={0.12} />
        </div>
      </div>

      {/* ══ LAYER 2 — Character (medium speed, head-turn) ══ */}
      <div
        ref={charRef}
        style={{
          position: 'absolute',
          /* Anchor to BOTTOM-RIGHT inside section */
          bottom: 0,
          right: 'clamp(0rem, 4vw, 6rem)',
          zIndex: 2,
          pointerEvents: 'none',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-character.png"
          alt="Prashant Saini — Developer"
          style={{
            /* 82vh tall — face starts hidden below, scroll reveals it */
            height: '82vh',
            width: 'auto',
            display: 'block',
            filter: 'drop-shadow(var(--shadow-lg))',
          }}
        />
      </div>

      {/* ══ LAYER 3 — Front Kanji + cranes (fast, opposite) ══ */}
      <div
        ref={frontRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        {FRONT_KANJI.map((k, i) => (
          <span
            key={i}
            aria-hidden
            style={{
              position: 'absolute',
              top: k.top,
              right: k.right,
              fontFamily: 'var(--font-noto-jp)',
              fontSize: k.size,
              fontWeight: 900,
              color: k.color,
              opacity: k.opacity,
              userSelect: 'none',
            }}
          >
            {k.char}
          </span>
        ))}
        {/* Origami cranes — front */}
        <div style={{ position: 'absolute', top: '30%', right: '28%' }}>
          <CraneSvg size={32} opacity={0.3} />
        </div>
        <div style={{ position: 'absolute', bottom: '25%', right: '18%' }}>
          <CraneSvg size={20} opacity={0.2} />
        </div>
      </div>

      {/* ══ LAYER 4 — Typography (z=4, fixed, slight counter-move) ══ */}

      {/* Top rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          height: '1px',
          backgroundColor: 'var(--border)',
          transformOrigin: 'left',
          marginTop: '0.5rem',
          flexShrink: 0,
          zIndex: 4,
          position: 'relative',
        }}
      />

      {/* Main content row */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 4,
          paddingTop: 'clamp(1.5rem, 4vh, 3rem)',
          paddingBottom: 'clamp(1.5rem, 4vh, 3rem)',
          /* Typography lives on the LEFT — max 55% width so character shows right */
          maxWidth: '55%',
        }}
      >
        <motion.div variants={fadeUp}>
          <ChapterLabel
            number="00"
            label="Portfolio"
            labelJP="作品集"
            labelTranslation="Selected Works"
          />
        </motion.div>

        {/* PRASHANT */}
        <div style={{ overflow: 'hidden', marginTop: '0.75rem', marginBottom: '0.15rem' }}>
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: 'clamp(3rem, 10vw, 12rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
            }}
          >
            {heroData.firstName}
          </motion.h1>
        </div>

        {/* SAINI — outlined */}
        <div style={{ overflow: 'hidden', marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)' }}>
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 1.5vw, 1.2rem)' }}
          >
            <h1
              style={{
                fontSize: 'clamp(3rem, 10vw, 12rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                color: 'transparent',
                WebkitTextStroke: '1.5px var(--text-primary)',
                textTransform: 'uppercase',
                opacity: 0.4,
                flexShrink: 0,
              }}
            >
              {heroData.lastName}
            </h1>
            <div
              style={{
                flex: 1,
                height: '1.5px',
                backgroundColor: 'var(--accent-red)',
                opacity: 0.35,
                alignSelf: 'center',
                marginBottom: '0.5rem',
              }}
            />
            <JpTooltip
              translation={
                heroData.nameKanjiTranslation || `${heroData.firstName} ${heroData.lastName}`
              }
            >
              <span
                aria-hidden
                style={{
                  fontFamily: 'var(--font-noto-jp)',
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.4rem)',
                  color: 'var(--accent-red)',
                  opacity: 0.5,
                  flexShrink: 0,
                  marginBottom: '0.5rem',
                  fontWeight: 700,
                  borderBottom: '1px dashed rgba(200,40,40,0.3)',
                  paddingBottom: '1px',
                }}
              >
                {heroData.nameKanji}
              </span>
            </JpTooltip>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'clamp(1rem, 2vw, 2rem)',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: '3px',
              height: '3.5rem',
              backgroundColor: 'var(--accent-red)',
              flexShrink: 0,
              marginTop: '2px',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              flex: 1,
              minWidth: '160px',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)',
                fontWeight: 400,
                color: 'var(--text-primary)',
                maxWidth: '38ch',
                lineHeight: 1.65,
              }}
            >
              {heroData.subtitle}
            </p>
            <span
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
              }}
            >
              {heroData.location} — {heroData.availability}
            </span>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}
        >
          {heroData.socials.slice(0, 3).map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                fontWeight: 500,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-red)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-dim)')
              }
            >
              {s.label}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Vertical JP text — far right */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(0.5rem, 2vw, 2rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 5,
        }}
      >
        <JpTooltip translation={`${heroData.role} / ${heroData.location}`}>
          <span
            aria-hidden
            style={{
              writingMode: 'vertical-rl',
              fontFamily: 'var(--font-noto-jp)',
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              color: 'var(--text-dim)',
              opacity: 'var(--opacity-decorative)',
              userSelect: 'none',
              borderLeft: '1px dashed var(--border-subtle)',
              paddingLeft: '1px',
              display: 'block',
            }}
          >
            {heroData.roleJP} / {heroData.locationJP}
          </span>
        </JpTooltip>
      </div>

      {/* Bottom metadata bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '1rem',
          paddingBottom: 'clamp(1rem, 3vh, 2rem)',
          borderTop: '1px solid var(--border)',
          flexShrink: 0,
          flexWrap: 'wrap',
          gap: '1rem',
          position: 'relative',
          zIndex: 4,
        }}
      >
        <div style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 3.5rem)', flexWrap: 'wrap' }}>
          {[
            { label: 'Role', value: heroData.role },
            { label: 'Location', value: heroData.locationJP },
            { label: 'Status', value: heroData.availability },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span
                style={{
                  fontSize: '0.5rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.value === heroData.locationJP ? (
                  <JpTooltip translation={heroData.location} hint="Location">
                    <span
                      style={{
                        borderBottom: '1px dashed var(--border-subtle)',
                        paddingBottom: '1px',
                        fontFamily: 'var(--font-noto-jp)',
                      }}
                    >
                      {item.value}
                    </span>
                  </JpTooltip>
                ) : (
                  item.value
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}
        >
          <span
            style={{
              fontSize: '0.5rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--text-dim)',
            }}
          >
            Scroll
          </span>
          <div
            ref={scrollLineRef}
            style={{
              width: '1px',
              height: '2.5rem',
              backgroundColor: 'var(--accent-red)',
              opacity: 0.6,
            }}
          />
        </div>
      </motion.div>

      {/* ── Bottom gradient fade — hides sharp character clip, blends into next section ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(to bottom, transparent 0%, var(--bg-primary) 100%)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}

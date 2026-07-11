'use client';

/**
 * OpenSourceSection — Chapter 07 : 共有 (OPEN SOURCE)
 *
 * Design: Git Commit Log / Terminal aesthetic — completely unique from ExperienceSection.
 * Concept: "Your GitHub story told as a commit timeline."
 *   - Vertical glowing commit line (left axis) — not a boring timeline, but a terminal pipe
 *   - Each entry = a commit node with a short hash badge
 *   - Ghost "git log" text in background
 *   - ACTIVE entry has a blinking cursor — signals ongoing work
 *   - Zero elements from ExperienceSection reused here
 *
 * Data: 100% from src/data/openSource.ts — no hardcoding.
 */

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { GitBranch, GitCommit, Radar } from 'lucide-react';
import { ChapterLabel, KanjiAccent } from '@/components/ui';
import { JpTooltip } from '@/components/ui/JpTooltip';
import { openSourceData } from '@/data/openSource';

/* ── Animation Variants ─────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

/* ── Commit hashes — decorative short hashes ── */
const COMMIT_HASHES = ['a3f91c2', 'ff0d99b'];

/* ══════════════════════════════════════════════════
   COMMIT NODE — the circle on the git log line
══════════════════════════════════════════════════ */
function CommitNode({ isActive }: { isActive?: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 18,
        height: 18,
        flexShrink: 0,
        zIndex: 2,
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `2px solid ${isActive ? 'var(--accent-red)' : 'var(--border)'}`,
          background: 'var(--bg-secondary)',
          boxShadow: isActive ? '0 0 10px rgba(230,57,70,0.4)' : 'none',
        }}
      />
      {/* Inner dot */}
      {isActive ? (
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: 4,
            borderRadius: '50%',
            background: 'var(--accent-red)',
          }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 4,
            borderRadius: '50%',
            background: 'var(--border)',
          }}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   COMMIT HASH BADGE
══════════════════════════════════════════════════ */
function HashBadge({ hash, isActive }: { hash: string; isActive?: boolean }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        letterSpacing: '0.1em',
        color: isActive ? 'var(--accent-red)' : 'var(--text-dim)',
        background: isActive ? 'rgba(230,57,70,0.06)' : 'var(--bg-primary)',
        border: `1px solid ${isActive ? 'rgba(230,57,70,0.2)' : 'var(--border)'}`,
        padding: '0.2rem 0.55rem',
        borderRadius: '2px',
        userSelect: 'all',
      }}
    >
      {hash}
    </span>
  );
}

/* ══════════════════════════════════════════════════
   SECTION COMPONENT
══════════════════════════════════════════════════ */
export function OpenSourceSection({ chapter = '07' }: { chapter?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-5%' });

  if (openSourceData.list.length === 0) return null;

  const firstStep = openSourceData.list[0];
  const activeSearch = openSourceData.list[1];

  return (
    <section
      id="openSource"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 8vh, 8rem) clamp(1.5rem, 5vw, 6rem)',
        overflow: 'hidden',
        /* Alternating bg: 07 = secondary */
        background: 'var(--bg-secondary)',
        minHeight: '100svh',
      }}
    >
      {/* ── Ghost Kanji: 共 (Share/Together) — far bottom-right ── */}
      <KanjiAccent
        char="共"
        bottom="-5%"
        right="-3%"
        size="clamp(14rem, 35vw, 40rem)"
        opacity={0.018}
      />

      {/* ── Ghost "git log" text — decorative terminal flavor ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '12%',
          right: '3%',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.45rem, 0.9vw, 0.65rem)',
          color: 'var(--text-primary)',
          opacity: 0.03,
          lineHeight: 1.9,
          letterSpacing: '0.05em',
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'pre',
          textAlign: 'right',
        }}
      >
        {`$ git log --oneline --graph\n* a3f91c2 feat: first contribution merged\n* ff0d99b chore: exploring open source\n* 7b2e9a1 docs: readme improvements\n| * 4c8d3f0 fix: PR workflow learned\n|/\n* 1a0bc7e init: fork repository`}
      </div>

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
          label="OPEN SOURCE"
          labelJP="共有"
          labelTranslation="Community Code"
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

      {/* ── Terminal prompt headline ── */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={stagger}
        style={{
          marginBottom: 'clamp(3rem, 6vh, 5rem)',
          position: 'relative',
          zIndex: 2,
        }}
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
          <JpTooltip translation="Community / Sharing" hint="Open Source Journey">
            <span style={{ color: 'var(--accent-red)', cursor: 'help' }}>共有の旅</span>
          </JpTooltip>
          {' / '}OPEN SOURCE
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
          COMMIT
          <br />
          <span style={{ WebkitTextStroke: '1px var(--accent-red)', color: 'transparent' }}>
            HISTORY
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-space)',
            fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
            color: 'var(--text-secondary)',
            maxWidth: '460px',
            lineHeight: 1.65,
            fontWeight: 300,
          }}
        >
          {openSourceData.subtitle}
        </motion.p>
      </motion.div>

      {/* ════════════════════════════════════════════
          GIT LOG TIMELINE
      ════════════════════════════════════════════ */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={stagger}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Vertical commit line — the backbone of the git log */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 8,
            top: 0,
            bottom: 0,
            width: 1,
            background: `linear-gradient(to bottom, var(--accent-red) 0%, var(--border) 60%, transparent 100%)`,
            opacity: 0.35,
          }}
        />

        {/* ── COMMIT 1: FIRST CONTRIBUTION ── */}
        <motion.div variants={slideIn} style={{ marginBottom: '3rem' }}>
          {/* Commit header row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <CommitNode />
            <HashBadge hash={COMMIT_HASHES[0]} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GitBranch
                size={11}
                style={{ color: 'var(--accent-red)', opacity: 0.7, flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                }}
              >
                <JpTooltip translation="Initiation / First Step" hint="入門">
                  <span style={{ cursor: 'help', fontFamily: 'var(--font-noto-jp)' }}>入門</span>
                </JpTooltip>
                {' · '}main
              </span>
            </div>
            {/* Merged tag */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.52rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#2a7a4b',
                background: 'rgba(42,122,75,0.08)',
                border: '1px solid rgba(42,122,75,0.2)',
                padding: '0.18rem 0.55rem',
                borderRadius: '2px',
                marginLeft: 'auto',
              }}
            >
              ✓ MERGED
            </span>
          </div>

          {/* Commit body — indented card */}
          <motion.div
            variants={fadeUp}
            style={{
              marginLeft: '2.5rem',
              padding: '1.5rem 1.75rem',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              position: 'relative',
              /* Left connector to the timeline */
              borderLeft: '3px solid rgba(42,122,75,0.3)',
            }}
          >
            {/* Connector arrow */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: -10,
                top: '1.5rem',
                width: 0,
                height: 0,
                borderTop: '5px solid transparent',
                borderBottom: '5px solid transparent',
                borderRight: '10px solid var(--bg-primary)',
              }}
            />

            <h3
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                letterSpacing: '-0.025em',
                textTransform: 'uppercase',
                margin: '0 0 0.65rem 0',
                lineHeight: 1,
              }}
            >
              {firstStep.name}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                fontWeight: 300,
                marginBottom: '1.25rem',
                maxWidth: '580px',
              }}
            >
              {firstStep.description}
            </p>

            <a
              href={firstStep.repo}
              target="_blank"
              rel="noreferrer"
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
                borderBottom: '1px solid var(--border)',
                paddingBottom: '3px',
                textDecoration: 'none',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-red)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent-red)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
              }}
            >
              <GitCommit size={12} />
              View Repository
            </a>
          </motion.div>
        </motion.div>

        {/* ── COMMIT 2: ACTIVE EXPLORATION ── */}
        {activeSearch && (
          <motion.div variants={slideIn}>
            {/* Commit header row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <CommitNode isActive />
              <HashBadge hash={COMMIT_HASHES[1]} isActive />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Radar
                  size={11}
                  style={{ color: 'var(--accent-red)', opacity: 0.8, flexShrink: 0 }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.58rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--text-dim)',
                  }}
                >
                  <JpTooltip translation="Searching / Exploring" hint="探索中">
                    <span style={{ cursor: 'help', fontFamily: 'var(--font-noto-jp)' }}>
                      探索中
                    </span>
                  </JpTooltip>
                  {' · '}HEAD
                </span>
              </div>
              {/* Blinking ACTIVE pill */}
              <div
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  style={{
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--accent-red)',
                    boxShadow: '0 0 6px var(--accent-red)',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.52rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-red)',
                    background: 'rgba(230,57,70,0.06)',
                    border: '1px solid rgba(230,57,70,0.15)',
                    padding: '0.18rem 0.55rem',
                    borderRadius: '2px',
                  }}
                >
                  IN PROGRESS
                </span>
              </div>
            </div>

            {/* Active commit body */}
            <motion.div
              variants={fadeUp}
              style={{
                marginLeft: '2.5rem',
                padding: '1.5rem 1.75rem',
                background: 'rgba(230,57,70,0.02)',
                border: '1px solid rgba(230,57,70,0.12)',
                position: 'relative',
                borderLeft: '3px solid rgba(230,57,70,0.35)',
              }}
            >
              {/* Connector arrow */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  left: -10,
                  top: '1.5rem',
                  width: 0,
                  height: 0,
                  borderTop: '5px solid transparent',
                  borderBottom: '5px solid transparent',
                  borderRight: '10px solid rgba(230,57,70,0.02)',
                }}
              />

              {/* Blinking cursor before title */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.5rem',
                  marginBottom: '0.65rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-space)',
                    fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                    fontWeight: 900,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.025em',
                    textTransform: 'uppercase',
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {activeSearch.name}
                </h3>
                {/* Terminal cursor blink */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                  style={{
                    display: 'inline-block',
                    width: 3,
                    height: '1.5em',
                    background: 'var(--accent-red)',
                    flexShrink: 0,
                    verticalAlign: 'middle',
                  }}
                />
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-space)',
                  fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  fontWeight: 300,
                  marginBottom: '1.25rem',
                  maxWidth: '580px',
                }}
              >
                {activeSearch.description}
              </p>

              <a
                href={activeSearch.repo}
                target="_blank"
                rel="noreferrer"
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
                  padding: '0.6rem 1.25rem',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                  transition: 'background 0.25s, color 0.25s, border-color 0.25s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'var(--accent-red)';
                  el.style.color = '#fff';
                  el.style.borderColor = 'var(--accent-red)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'transparent';
                  el.style.color = 'var(--text-primary)';
                  el.style.borderColor = 'var(--border)';
                }}
              >
                <Radar size={12} />
                Inspect GitHub Profile
              </a>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

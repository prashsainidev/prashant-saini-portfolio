/**
 * BlogsSection — Manga Chapter [ 08 ] : 記事 (ARTICLES / WRITINGS)
 *
 * Design concept: Japanese Editorial Broadsheet
 *   — NOT a card grid. A serialized publication.
 *   — First article = full-width "Dispatch" strip (newspaper front-page energy).
 *   — Remaining articles = asymmetric editorial grid (first spans 2 cols).
 *   — Ghost kanji watermark per article, pulled from categoryKanji.
 *   — Issue numbers replace card numbering — each article is a chapter.
 *   — Hashnode CTA occupies the final grid slot as an editorial element.
 *
 * Data: 100% from src/data/blogs.ts — no hardcoding.
 */
'use client';

import { useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { ChapterLabel } from '@/components/ui';
import { blogsData, BlogPost } from '@/data/blogs';

/* ── Animation Variants ─────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const dividerReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
  },
};

/* ── Helper: Format date ──────────────────────────────────────────── */

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const monthNames = [
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
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

/* ── Featured Dispatch ─────────────────────────────────────────────
   Full-width editorial hero strip for the first (most recent) article.
   Feels like a newspaper front-page headline — not a blog card.
──────────────────────────────────────────────────────────────────── */

function FeaturedDispatch({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeLeft}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-secondary)',
        borderLeft: `3px solid var(--accent-red)`,
        padding: 'clamp(2rem, 4vw, 3.5rem)',
        textDecoration: 'none',
        cursor: 'none',
        transition: 'background 0.4s ease',
        ...(hovered && { background: 'var(--bg-card)' }),
      }}
    >
      {/* Ghost kanji — the category character, massive */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 'clamp(1rem, 4vw, 3rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-noto-jp)',
          fontSize: 'clamp(8rem, 18vw, 18rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          opacity: 0.04,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'opacity 0.4s ease',
          ...(hovered && { opacity: 0.07 }),
        }}
      >
        {post.categoryKanji}
      </span>

      {/* Top row: "DISPATCH" label + Issue number */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--accent-red)',
            fontWeight: 500,
          }}
        >
          ▌ FEATURED DISPATCH
        </span>
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: 'var(--text-dim)',
          }}
        >
          [ ISSUE 01 ]
        </span>
      </div>

      {/* Thin divider */}
      <div
        style={{
          width: '100%',
          height: '1px',
          background: 'var(--border)',
          marginBottom: '2rem',
        }}
      />

      {/* Main title — newspaper headline scale */}
      <h3
        style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: 'var(--text-primary)',
          maxWidth: '70%',
          margin: '0 0 2rem 0',
          transition: 'color 0.3s ease',
        }}
      >
        {post.title}
      </h3>

      {/* Brief excerpt */}
      <p
        style={{
          fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          maxWidth: '60%',
          margin: '0 0 2.5rem 0',
          fontWeight: 300,
        }}
      >
        {post.brief}
      </p>

      {/* Bottom metadata bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            color: 'var(--text-dim)',
            textTransform: 'uppercase',
          }}
        >
          {formatDate(post.dateAdded)}
        </span>

        <span style={{ color: 'var(--border)', fontSize: '0.7rem' }}>·</span>

        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            color: 'var(--text-dim)',
            textTransform: 'uppercase',
          }}
        >
          {post.readTime} MIN READ
        </span>

        <span style={{ color: 'var(--border)', fontSize: '0.7rem' }}>·</span>

        {/* Category Hanko stamp */}
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: hovered ? 'var(--bg-primary)' : 'var(--accent-red)',
            background: hovered ? 'var(--accent-red)' : 'transparent',
            border: '1px solid var(--accent-red)',
            padding: '2px 8px',
            textTransform: 'uppercase',
            transition: 'background 0.25s ease, color 0.25s ease',
          }}
        >
          {post.category}
        </span>

        {/* Read CTA — animated on hover */}
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            color: 'var(--accent-red)',
            textTransform: 'uppercase',
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'gap 0.3s ease',
            ...(hovered && { gap: '0.9rem' }),
          }}
        >
          READ ARTICLE
          <span style={{ fontSize: '0.8rem' }}>→</span>
        </span>
      </div>
    </motion.a>
  );
}

/* ── Article Card ──────────────────────────────────────────────────
   Secondary editorial card for articles 2–N.
   Asymmetric visual weight: first secondary card spans 2 columns.
──────────────────────────────────────────────────────────────────── */

function ArticleCard({
  post,
  issueNum,
  isLead = false,
}: {
  post: BlogPost;
  issueNum: number;
  isLead?: boolean; // First secondary card — gets 2-col span + extra weight
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderTop: `2px solid ${hovered ? 'var(--accent-red)' : 'var(--border)'}`,
        textDecoration: 'none',
        cursor: 'none',
        transition: 'border-color 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        ...(isLead && { gridColumn: 'span 2' }),
      }}
    >
      {/* Ghost kanji — per-article category character */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '0.75rem',
          bottom: '0.75rem',
          fontFamily: 'var(--font-noto-jp)',
          fontSize: 'clamp(4rem, 8vw, 7rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          opacity: hovered ? 0.06 : 0.03,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        {post.categoryKanji}
      </span>

      {/* Issue number — top right */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1.25rem',
        }}
      >
        {/* Category tag */}
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.58rem',
            letterSpacing: '0.18em',
            color: 'var(--accent-red)',
            textTransform: 'uppercase',
          }}
        >
          {post.category}
        </span>

        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.58rem',
            letterSpacing: '0.2em',
            color: hovered ? 'var(--accent-red)' : 'var(--text-dim)',
            transition: 'color 0.3s ease',
          }}
        >
          ISSUE {String(issueNum).padStart(2, '0')}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: isLead ? 'clamp(1.3rem, 2.5vw, 1.9rem)' : 'clamp(1rem, 1.8vw, 1.4rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          color: 'var(--text-primary)',
          margin: '0 0 1rem 0',
          flex: isLead ? undefined : '1',
        }}
      >
        {post.title}
      </h3>

      {/* Brief — only show on lead card or on wider screens via CSS */}
      {isLead && (
        <p
          style={{
            fontSize: '0.88rem',
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            fontWeight: 300,
            margin: '0 0 1.5rem 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.brief}
        </p>
      )}

      {/* Spacer pushes metadata to bottom */}
      {!isLead && <div style={{ flex: 1 }} />}

      {/* Metadata footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginTop: isLead ? '0' : '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.58rem',
            letterSpacing: '0.15em',
            color: 'var(--text-dim)',
            textTransform: 'uppercase',
          }}
        >
          {formatDate(post.dateAdded)}
        </span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.58rem',
            letterSpacing: '0.15em',
            color: 'var(--text-dim)',
            textTransform: 'uppercase',
          }}
        >
          {post.readTime} MIN
        </span>

        <span
          style={{
            marginLeft: 'auto',
            fontSize: '0.75rem',
            color: 'var(--accent-red)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}
        >
          →
        </span>
      </div>
    </motion.a>
  );
}

/* ── Hashnode CTA Card ─────────────────────────────────────────────
   Occupies the last grid slot — NOT a boring button.
   Editorial element that draws the eye and drives Hashnode traffic.
──────────────────────────────────────────────────────────────────── */

function HashnodeCTA({ username, url }: { username: string; url: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        background: hovered ? 'var(--accent-red)' : 'transparent',
        border: `2px solid var(--accent-red)`,
        textDecoration: 'none',
        cursor: 'none',
        transition: 'background 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        minHeight: '220px',
      }}
    >
      {/* Top label */}
      <span
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: hovered ? 'rgba(0,0,0,0.6)' : 'var(--accent-red)',
          transition: 'color 0.3s ease',
        }}
      >
        MORE WRITINGS
      </span>

      {/* Big arrow — the centrepiece */}
      <span
        style={{
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          color: hovered ? '#000' : 'var(--accent-red)',
          lineHeight: 1,
          transition: 'color 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: hovered ? 'translateX(8px) translateY(-8px)' : 'none',
          display: 'block',
        }}
      >
        →
      </span>

      {/* Username */}
      <div>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            color: hovered ? '#000' : 'var(--text-dim)',
            marginBottom: '0.2rem',
            transition: 'color 0.3s ease',
          }}
        >
          hashnode.dev/
        </span>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            fontWeight: 700,
            color: hovered ? '#000' : 'var(--text-primary)',
            transition: 'color 0.3s ease',
          }}
        >
          {username}
        </span>
      </div>
    </motion.a>
  );
}

/* ── Main Component ────────────────────────────────────────────────── */

export function BlogsSection({ chapter }: { chapter: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px 0px' });

  // Destructure: first post is the featured dispatch, rest go into the grid
  const [featured, ...secondaryPosts] = blogsData.posts;

  return (
    <section
      id="blogs"
      ref={sectionRef}
      aria-label="Articles section — writings and blog posts"
      style={{
        position: 'relative',
        padding: 'clamp(3rem, 6vh, 6rem) clamp(1.5rem, 5vw, 6rem)',
        borderTop: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* ── Ghost chapter number ── */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'clamp(2rem, 5vw, 4rem)',
          right: 'clamp(1.5rem, 4vw, 5rem)',
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 'clamp(6rem, 16vw, 18rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          opacity: 0.03,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.05em',
        }}
      >
        {chapter}
      </span>

      {/* ── Ghost kanji background — 記 (record/write) ── */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 6vh, 6rem)',
          left: '2%',
          fontFamily: 'var(--font-noto-jp)',
          fontSize: 'clamp(10rem, 22vw, 26rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          opacity: 0.025,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        記
      </span>

      <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger}>
        {/* ── Zone 1: Chapter Label + Header ── */}
        <motion.div variants={fadeUp} style={{ marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
          <ChapterLabel
            number={chapter}
            label="ARTICLES"
            labelJP="記事"
            labelTranslation="Writings / Published Thoughts"
          />

          <div
            style={{
              marginTop: 'clamp(1.5rem, 3vh, 2.5rem)',
              maxWidth: '640px',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                fontWeight: 300,
              }}
            >
              {blogsData.subtitle}
            </p>
          </div>
        </motion.div>

        {/* ── Zone 2: Featured Dispatch (article[0]) ── */}
        <div style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
          <FeaturedDispatch post={featured} />
        </div>

        {/* ── Mid-section red divider ── */}
        <motion.div
          variants={dividerReveal}
          style={{
            height: '1px',
            background: 'var(--accent-red)',
            transformOrigin: 'left center',
            margin: 'clamp(1.5rem, 3vh, 2.5rem) 0',
            opacity: 0.6,
          }}
        />

        {/* ── Zone 3: Secondary article grid ── */}
        <motion.div
          variants={stagger}
          style={{
            display: 'grid',
            // 3-column grid: first secondary card spans 2 cols (lead), last = CTA
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
          }}
          className="blogs-grid"
        >
          {/* Lead card (spans 2 columns) */}
          {secondaryPosts[0] && <ArticleCard post={secondaryPosts[0]} issueNum={2} isLead />}

          {/* Standard card */}
          {secondaryPosts[1] && <ArticleCard post={secondaryPosts[1]} issueNum={3} />}

          {/* Standard card — row 2 */}
          {secondaryPosts[2] && <ArticleCard post={secondaryPosts[2]} issueNum={4} />}

          {/* Standard card — row 2 */}
          {secondaryPosts[3] && <ArticleCard post={secondaryPosts[3]} issueNum={5} />}

          {/* Hashnode CTA — always the last slot */}
          <HashnodeCTA username={blogsData.hashnodeUsername} url={blogsData.hashnodeUrl} />
        </motion.div>

        {/* ── Zone 4: Animated bottom divider ── */}
        <motion.div
          variants={dividerReveal}
          style={{
            height: '1px',
            background: 'var(--accent-red)',
            transformOrigin: 'left center',
            marginTop: 'clamp(2.5rem, 5vh, 4rem)',
            opacity: 0.4,
          }}
        />

        {/* ── Live indicator + publication note ── */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '0.58rem',
              letterSpacing: '0.2em',
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {/* Pulsing dot — "published on Hashnode" */}
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--accent-red)',
                display: 'inline-block',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            Published on Hashnode
          </span>

          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '0.58rem',
              letterSpacing: '0.2em',
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
            }}
          >
            Act III — 声 (The Voice)
          </span>
        </motion.div>
      </motion.div>

      {/* ── Responsive CSS ── */}
      <style>{`
        /* Tablet: collapse to 2 columns */
        @media (max-width: 1024px) {
          .blogs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        /* Mobile: single column, remove lead spanning */
        @media (max-width: 767px) {
          .blogs-grid {
            grid-template-columns: 1fr !important;
          }
          .blogs-grid > * {
            grid-column: span 1 !important;
          }
        }
        /* Pulsing dot animation */
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }
      `}</style>
    </section>
  );
}

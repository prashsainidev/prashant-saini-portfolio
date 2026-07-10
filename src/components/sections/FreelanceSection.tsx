'use client';

import { motion } from 'framer-motion';
import { ExternalLink, GitBranch } from 'lucide-react';
import { ChapterLabel, KanjiAccent } from '@/components/ui';
import { getSortedFreelanceProjects } from '@/data/freelance';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export function FreelanceSection({ chapter }: { chapter: string }) {
  const projects = getSortedFreelanceProjects();

  return (
    <section
      id="freelance"
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 8vh, 8rem) clamp(1.5rem, 5vw, 6rem)',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
        minHeight: '100vh',
      }}
    >
      {/* ── Ghost Kanji: 委 (Entrust/Contract) ── */}
      <KanjiAccent char="委" top="10%" left="-4%" size="clamp(12rem, 25vw, 22rem)" opacity={0.02} />

      {/* ── Chapter Header ── */}
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

      {/* ── Projects Grid ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: '2rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            style={{
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Top Bar: Date & Links */}
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
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: 'var(--accent-red)',
                }}
              >
                {project.date}
              </span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <GitBranch size={18} />
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--accent-red)' }}
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: '1.8rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                fontStyle: 'italic',
                marginBottom: '1.5rem',
              }}
            >
              Client: {project.client}
            </p>

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '2rem',
                flexGrow: 1,
              }}
            >
              {project.description}
            </p>

            {/* Details (Manga style bullet points) */}
            <div style={{ marginBottom: '2rem' }}>
              {project.details.map((detail, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 12,
                      height: 1,
                      background: 'var(--accent-red)',
                      marginTop: '0.6rem',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-space)',
                      fontSize: '0.85rem',
                      color: 'var(--text-dim)',
                      lineHeight: 1.5,
                    }}
                  >
                    {detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    padding: '0.2rem 0.6rem',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/**
 * MangaPanel — Comic panel border wrapper.
 * Wraps content in a bordered panel with hover glow effect.
 * Supports Framer Motion animation via motion.div.
 *
 * @example
 * <MangaPanel>
 *   <p>Card content here</p>
 * </MangaPanel>
 */
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MangaPanelProps {
  children: ReactNode;
  className?: string;
  padding?: string;
  animate?: boolean; // Enable Framer Motion hover animation
  delay?: number; // Animation delay in seconds
}

export function MangaPanel({
  children,
  className,
  padding = '1.5rem',
  animate = true,
  delay = 0,
}: MangaPanelProps) {
  const content = (
    <div
      className={cn('manga-panel', className)}
      style={{
        padding,
        backgroundColor: 'var(--bg-card)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top-left corner accent */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: '-1px',
          left: '-1px',
          width: '12px',
          height: '12px',
          borderTop: '2px solid var(--accent-red)',
          borderLeft: '2px solid var(--accent-red)',
          opacity: 0.7,
        }}
      />
      {/* Bottom-right corner accent */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-1px',
          right: '-1px',
          width: '12px',
          height: '12px',
          borderBottom: '2px solid var(--accent-red)',
          borderRight: '2px solid var(--accent-red)',
          opacity: 0.7,
        }}
      />
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {content}
    </motion.div>
  );
}

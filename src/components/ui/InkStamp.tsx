/**
 * InkStamp — Small red Japanese ink stamp accent.
 * Displays a single Kanji in a tilted red border box.
 * Used as a visual "seal" on cards and section headers.
 *
 * @example
 * <InkStamp char="経" />
 * <InkStamp char="仕" size="lg" rotate={8} />
 */

import { cn } from '@/lib/utils';

interface InkStampProps {
  char: string; // Single Kanji character
  size?: 'sm' | 'md' | 'lg';
  rotate?: number; // Degrees of rotation (default -5)
  className?: string;
}

const sizeMap = {
  sm: { box: '1.8rem', font: '0.7rem', border: '1.5px' },
  md: { box: '2.5rem', font: '0.9rem', border: '2px' },
  lg: { box: '3.5rem', font: '1.25rem', border: '2px' },
};

export function InkStamp({ char, size = 'md', rotate = -5, className }: InkStampProps) {
  const s = sizeMap[size];

  return (
    <span
      aria-hidden="true"
      className={cn('ink-stamp', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: s.box,
        height: s.box,
        border: `${s.border} solid var(--accent-red)`,
        borderRadius: '3px',
        fontFamily: 'var(--font-noto-jp)',
        fontSize: s.font,
        fontWeight: 700,
        color: 'var(--accent-red)',
        opacity: 0.75,
        transform: `rotate(${rotate}deg)`,
        flexShrink: 0,
        letterSpacing: 0,
        lineHeight: 1,
      }}
    >
      {char}
    </span>
  );
}

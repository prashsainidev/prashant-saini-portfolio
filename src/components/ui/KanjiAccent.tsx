/**
 * KanjiAccent — Large ghost Kanji watermark behind section content.
 * Rendered as aria-hidden so screen readers skip it.
 * Position it absolutely inside a relative-positioned parent.
 *
 * @example
 * <div style={{ position: "relative" }}>
 *   <KanjiAccent char="経験" top="0" right="-2rem" />
 *   ... section content
 * </div>
 */

import { cn } from '@/lib/utils';

interface KanjiAccentProps {
  char: string; // e.g. "経験", "仕事", "技術"
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size?: string; // font-size override, default uses clamp
  opacity?: number; // 0–1, default 0.04
  vertical?: boolean; // writing-mode: vertical-rl
  className?: string;
}

export function KanjiAccent({
  char,
  top,
  bottom,
  left,
  right,
  size = 'clamp(8rem, 20vw, 22rem)',
  opacity = 0.04,
  vertical = false,
  className,
}: KanjiAccentProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('kanji-watermark', className)}
      style={{
        position: 'absolute',
        top,
        bottom,
        left,
        right,
        fontSize: size,
        opacity,
        writingMode: vertical ? 'vertical-rl' : 'horizontal-tb',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
        fontFamily: 'var(--font-noto-jp)',
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: '-0.05em',
        color: 'var(--text-primary)',
        // If top is 50%, auto-center vertically
        transform: top === '50%' ? 'translateY(-50%)' : undefined,
      }}
    >
      {char}
    </span>
  );
}

/**
 * ChapterLabel — "[ 01 ] ——— SECTION / 日本語"
 * Renders the manga-style chapter marker used at the top of every section.
 * Japanese label shows translation tooltip on hover.
 *
 * @example
 * <ChapterLabel number="01" label="Experience" labelJP="経験" labelTranslation="Experience" />
 */

import { cn } from '@/lib/utils';
import { JpTooltip } from './JpTooltip';

interface ChapterLabelProps {
  number: string; // e.g. "01"
  label: string; // e.g. "Experience"
  labelJP?: string; // e.g. "経験" (optional)
  labelTranslation?: string; // shown in tooltip on JP hover
  className?: string;
  align?: 'left' | 'right';
}

export function ChapterLabel({
  number,
  label,
  labelJP,
  labelTranslation,
  className,
  align = 'left',
}: ChapterLabelProps) {
  return (
    <div
      className={cn('chapter-label', className)}
      style={{
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      <span className="chapter-number">[ {number} ]</span>
      <span className="chapter-line" />
      <span>{label.toUpperCase()}</span>
      {labelJP && (
        <>
          <span style={{ color: 'var(--text-dim)', opacity: 0.4 }}>/</span>
          <JpTooltip translation={labelTranslation ?? label} hint={`Section ${number}`}>
            <span
              style={{
                fontFamily: 'var(--font-noto-jp)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: 'var(--text-dim)',
                borderBottom: '1px dashed rgba(255,255,255,0.15)',
                paddingBottom: '1px',
              }}
            >
              {labelJP}
            </span>
          </JpTooltip>
        </>
      )}
    </div>
  );
}

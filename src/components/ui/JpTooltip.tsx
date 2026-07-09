/**
 * JpTooltip — Cinematic Japanese Translation Tooltip
 *
 * Renders via React Portal (document.body) to escape any overflow:hidden parent.
 * Tooltip anchors to the CENTER of the wrapped element — does NOT follow mouse.
 * Smart viewport collision detection: flips below if too close to top edge,
 * clamps left/right so it never goes off-screen.
 *
 * @example
 * <JpTooltip translation="About Me">
 *   <span>私について</span>
 * </JpTooltip>
 */
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface JpTooltipProps {
  translation: string;
  children: React.ReactNode;
  hint?: string;
}

/** Minimum px gap from viewport edge */
const EDGE_PADDING = 12;
/** Gap between element and tooltip */
const GAP = 10;
/** Approximate tooltip height (for "flip below" logic) */
const TOOLTIP_HEIGHT = 64;

export function JpTooltip({ translation, children, hint }: JpTooltipProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Computed position in viewport coords
  const [style, setStyle] = useState<React.CSSProperties>({});
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  /** Calculate tooltip position based on element bounding rect */
  const computePosition = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;

    // Center of element horizontally
    const left = rect.left + rect.width / 2;
    // By default: show ABOVE element
    let top = rect.top - GAP;
    let isBelow = false;

    // If too close to top edge, flip BELOW
    if (rect.top - TOOLTIP_HEIGHT - GAP < EDGE_PADDING) {
      top = rect.bottom + GAP;
      isBelow = true;
    }

    setStyle({
      position: 'fixed',
      left,
      top,
      transform: isBelow ? 'translateX(-50%)' : 'translateX(-50%) translateY(-100%)',
      // Clamp so tooltip never goes off left or right edge
      // We do this via CSS min/max — but we override left if near edge
      zIndex: 999999,
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
    });

    // Post-calculation: clamp left so tooltip stays in viewport
    // We estimate tooltip width as 160px max
    const tooltipHalfW = 100;
    const clampedLeft = Math.max(
      EDGE_PADDING + tooltipHalfW,
      Math.min(left, vw - EDGE_PADDING - tooltipHalfW)
    );
    if (clampedLeft !== left) {
      setStyle((prev) => ({ ...prev, left: clampedLeft }));
    }
  }, []);

  function handleMouseEnter() {
    computePosition();
    setVisible(true);
  }

  function handleMouseLeave() {
    setVisible(false);
  }

  const tooltipEl = (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={style}
        >
          {/* Glassmorphism card */}
          <div
            style={{
              background: 'rgba(8, 8, 8, 0.92)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderTop: '1.5px solid var(--accent-red)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '0.4rem 0.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <span
              style={{
                fontSize: '0.4rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--accent-red)',
                fontWeight: 700,
              }}
            >
              JP → EN
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: '#ffffff',
              }}
            >
              {translation}
            </span>
            {hint && (
              <span
                style={{
                  fontSize: '0.45rem',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.08em',
                  fontStyle: 'italic',
                }}
              >
                {hint}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: 'relative', display: 'inline-block', cursor: 'help' }}
      >
        {children}
      </span>
      {mounted && createPortal(tooltipEl, document.body)}
    </>
  );
}

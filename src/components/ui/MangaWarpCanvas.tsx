/**
 * MangaWarpCanvas — Interactive horizontal line distortion background
 *
 * Technique: HTML Canvas 2D + requestAnimationFrame
 * Effect: 80 horizontal lines that bend/warp around cursor position
 *         using smoothstep falloff — fluid, water-like displacement
 *
 * Optimizations:
 *   - Mouse position lerped (LERP=0.08) for buttery smooth transitions
 *   - Lines drawn as Path2D with 150 segments for smooth curves
 *   - Subtle red accent radial glow at cursor center
 *   - Slight idle oscillation so lines feel "alive" even without cursor
 *
 * Usage: Drop inside any `position: relative` container as first child.
 *        Canvas covers 100% of parent via position: absolute.
 */
'use client';

import { useRef, useEffect } from 'react';

export function MangaWarpCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* ── State ── */
    let targetX = -3000,
      targetY = -3000;
    let currentX = -3000,
      currentY = -3000;
    let animId: number;
    const startTime = performance.now();

    /* ── Theme: cache isDarkMode, update via MutationObserver (not per-frame) ── */
    let isDarkMode = document.documentElement.classList.contains('dark');
    const themeObserver = new MutationObserver(() => {
      isDarkMode = document.documentElement.classList.contains('dark');
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    /* ── Config ── */
    const LINE_COUNT = 80; // number of horizontal lines
    const SEGMENTS = 160; // bezier-like segments per line
    const RADIUS = 210; // cursor influence radius (px)
    const MAX_WARP = 38; // max vertical displacement (px)
    const LERP = 0.075; // mouse smoothing (lower = smoother)
    const IDLE_AMP = 1.8; // idle sine wave amplitude (px)
    const IDLE_SPEED = 0.25; // idle animation speed

    /* ── Resize ── */
    function resize() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      canvas.width = r.width;
      canvas.height = r.height;
    }

    /* ── Draw loop ── */
    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const t = (performance.now() - startTime) / 1000;

      /* Lerp mouse */
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;

      ctx.clearRect(0, 0, w, h);

      /* Theme colors — read from cached ref, NOT DOM every frame */
      const [lineR, lineG, lineB] = isDarkMode ? [255, 255, 255] : [0, 0, 0];
      const innerR = isDarkMode ? 255 : 0;

      /* ── Draw lines ── */
      for (let i = 0; i < LINE_COUNT; i++) {
        const baseY = (i / (LINE_COUNT - 1)) * h;

        /* Idle wave offset — each line has a phase shift */
        const idleY = Math.sin(t * IDLE_SPEED * Math.PI * 2 + i * 0.18) * IDLE_AMP;

        ctx.beginPath();

        for (let s = 0; s <= SEGMENTS; s++) {
          const x = (s / SEGMENTS) * w;
          const dx = x - currentX;
          const dy = baseY - currentY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let warpY = 0;
          if (dist < RADIUS && dist > 0.1) {
            /* Smoothstep falloff: starts fast, eases at edge */
            const tNorm = 1 - dist / RADIUS;
            const strength = tNorm * tNorm * (3 - 2 * tNorm);
            warpY = (dy / dist) * strength * MAX_WARP;
          }

          const y = baseY + idleY + warpY;

          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        /* Alternating opacity for depth — every 5th line slightly brighter */
        const isAccent = i % 5 === 0;
        ctx.strokeStyle = isAccent
          ? `rgba(${lineR},${lineG},${lineB},0.07)`
          : `rgba(${lineR},${lineG},${lineB},0.028)`;
        ctx.lineWidth = isAccent ? 0.7 : 0.35;
        ctx.stroke();
      }

      /* ── Cursor glow — red accent + white center ── */
      if (currentX > -1000) {
        /* Red accent radial glow */
        const redGrad = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          RADIUS * 0.8
        );
        redGrad.addColorStop(0, 'rgba(220, 38, 38, 0.09)');
        redGrad.addColorStop(0.4, 'rgba(220, 38, 38, 0.04)');
        redGrad.addColorStop(1, 'rgba(220, 38, 38, 0)');
        ctx.fillStyle = redGrad;
        ctx.fillRect(0, 0, w, h);

        /* Inner hot spot — adapts to theme */
        const whiteGrad = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 50);
        whiteGrad.addColorStop(0, `rgba(${innerR},${innerR},${innerR},0.06)`);
        whiteGrad.addColorStop(1, `rgba(${innerR},${innerR},${innerR},0)`);
        ctx.fillStyle = whiteGrad;
        ctx.fillRect(0, 0, w, h);
      }

      animId = requestAnimationFrame(draw);
    }

    /* ── Event handlers ── */
    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    }

    function onMouseLeave() {
      targetX = -3000;
      targetY = -3000;
    }

    /* ── Init ── */
    resize();
    draw();

    const section = canvas.parentElement!;
    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      themeObserver.disconnect();
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

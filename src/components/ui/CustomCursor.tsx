/**
 * CustomCursor — Ink-drop cursor with canvas trail.
 * Replaces the default browser cursor on desktop.
 * Hidden on mobile (pointer: coarse media query).
 *
 * Features:
 * - Small vermillion dot that follows mouse
 * - Larger ring that lags behind (magnetic feel)
 * - Expands on hoverable elements
 * - Canvas trail of fading ink dots
 */
'use client';

import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  alpha: number;
  radius: number;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  /* useRef instead of useState — prevents stale closure in the rAF loop */
  const isHoveringRef = useRef(false);
  const dots = useRef<Dot[]>([]);
  const raf = useRef<number>(0);

  useEffect(() => {
    // Only on desktop (pointer: fine)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Size canvas to window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Track mouse
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Add ink dot to trail
      dots.current.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 0.35,
        radius: Math.random() * 2 + 1.5,
      });
      if (dots.current.length > 28) dots.current.shift();
    };

    // Detect hoverable elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover]')) {
        isHoveringRef.current = true;
      }
    };
    const onMouseOut = () => {
      isHoveringRef.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    // Animation loop
    const animate = () => {
      // Move dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 5}px, ${mouse.current.y - 5}px)`;
      }

      // Lag ring behind mouse
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        /* Read from ref — always fresh, no stale closure */
        const size = isHoveringRef.current ? 40 : 24;
        ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }

      // Draw ink trail on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.current.forEach((dot) => {
        dot.alpha *= 0.9;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 57, 70, ${dot.alpha})`;
        ctx.fill();
      });
      dots.current = dots.current.filter((d) => d.alpha > 0.01);

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Canvas trail layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
        aria-hidden="true"
      />

      {/* Small dot — follows mouse exactly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-red)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.02s linear',
          mixBlendMode: 'normal',
        }}
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '1.5px solid var(--accent-red)',
          pointerEvents: 'none',
          zIndex: 9997,
          opacity: 0.6,
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      />
    </>
  );
}

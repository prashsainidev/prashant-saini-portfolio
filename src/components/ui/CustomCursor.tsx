/**
 * CustomCursor — Ink-brush cursor system with per-element states.
 * Theme: "Written in Ink" — vermillion accent, hanko-stamp click signature.
 *
 * States (auto-detected via selectors, or force with data attrs):
 *  - default   : dot + lagging ring
 *  - text      : p, h1-h6, li, [data-cursor-text]  → ring hides, thin ink caret shows
 *  - link      : a, button, [data-cursor-hover]     → ring expands, label optional
 *  - view      : [data-cursor-view]                 → ring expands big, "VIEW" label
 *  - drag      : [data-cursor-drag]                 → ring expands, "DRAG" label
 *  - click     : mousedown anywhere                 → hanko ink-stamp burst (signature)
 *
 * Magnetic buttons: add [data-magnetic] to any element — it will gently
 * pull toward the pointer while hovered, and the ring locks harder onto it.
 *
 * Usage:
 *   <CustomCursor />                 // mount once, e.g. in layout.tsx
 *   <button data-magnetic>Hire me</button>
 *   <div data-cursor-view className="project-card">...</div>
 *
 * Hides itself automatically on touch/coarse pointers.
 * Respects prefers-reduced-motion (skips trail + splash particles).
 *
 * CSS you need in globals.css (desktop only, keep native cursor on inputs):
 *
 *   @media (pointer: fine) {
 *     a, button, input, textarea, select, [contenteditable] { cursor: auto; }
 *     * { cursor: none; }
 *     input, textarea, [contenteditable] { cursor: text; }
 *   }
 */
'use client';

import { useEffect, useRef } from 'react';

type Variant = 'default' | 'text' | 'link' | 'view' | 'drag';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
}

const INK = 'var(--accent-red, #e63946)';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const variant = useRef<Variant>('default');
  const magneticTarget = useRef<HTMLElement | null>(null);
  const trail = useRef<Particle[]>([]);
  const burst = useRef<Particle[]>([]);
  const raf = useRef<number>(0);
  const isDown = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ---- pointer tracking + ink trail ----
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (!reduceMotion && variant.current !== 'text') {
        trail.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: 0,
          vy: 0,
          alpha: 0.3,
          radius: Math.random() * 2 + 1.2,
        });
        if (trail.current.length > 24) trail.current.shift();
      }

      // magnetic pull on the currently locked element
      const el = magneticTarget.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * 0.35;
        const dy = (e.clientY - cy) * 0.35;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };

    // ---- element-aware state detection ----
    const resolveVariant = (target: HTMLElement): { v: Variant; magnetic: HTMLElement | null } => {
      const drag = target.closest<HTMLElement>('[data-cursor-drag]');
      if (drag) return { v: 'drag', magnetic: null };

      const view = target.closest<HTMLElement>('[data-cursor-view]');
      if (view) return { v: 'view', magnetic: null };

      const magnetic = target.closest<HTMLElement>('[data-magnetic]');
      const link = target.closest<HTMLElement>('a, button, [data-cursor-hover]');
      if (link) return { v: 'link', magnetic: magnetic ?? null };

      const text = target.closest<HTMLElement>('p, h1, h2, h3, h4, h5, h6, li, [data-cursor-text]');
      if (text) return { v: 'text', magnetic: null };

      return { v: 'default', magnetic: null };
    };

    const setMagnetic = (el: HTMLElement | null) => {
      if (magneticTarget.current && magneticTarget.current !== el) {
        magneticTarget.current.style.transform = 'translate(0px, 0px)';
        magneticTarget.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      }
      magneticTarget.current = el;
      if (el) el.style.transition = 'transform 0.1s ease-out';
    };

    const onMouseOver = (e: MouseEvent) => {
      const { v, magnetic } = resolveVariant(e.target as HTMLElement);
      variant.current = v;
      setMagnetic(magnetic);
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest) {
        variant.current = 'default';
        setMagnetic(null);
        return;
      }
      const { v, magnetic } = resolveVariant(related);
      variant.current = v;
      setMagnetic(magnetic);
    };

    // ---- click: hanko ink-stamp burst (signature moment) ----
    const onMouseDown = (e: MouseEvent) => {
      isDown.current = true;
      if (reduceMotion) return;
      const count = 12;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const speed = Math.random() * 2.2 + 1;
        burst.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 0.8,
          radius: Math.random() * 2.5 + 1.5,
        });
      }
    };
    const onMouseUp = () => {
      isDown.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // ---- render loop ----
    const animate = () => {
      const v = variant.current;

      // dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 5}px, ${mouse.current.y - 5}px) scale(${isDown.current ? 0.5 : 1})`;
        dotRef.current.style.opacity = v === 'drag' || v === 'text' ? '0' : '1';
      }

      // ring lag — snaps harder when locked to a magnetic element
      const ease = magneticTarget.current ? 0.22 : 0.14;
      ring.current.x += (mouse.current.x - ring.current.x) * ease;
      ring.current.y += (mouse.current.y - ring.current.y) * ease;

      if (ringRef.current) {
        let size = 24;
        if (v === 'link') size = 44;
        if (v === 'view') size = 88;
        if (v === 'drag') size = 74;
        if (isDown.current) size *= 0.85;

        ringRef.current.style.opacity = v === 'text' ? '0' : '0.7';
        ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px) scale(${isDown.current ? 0.92 : 1})`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.borderWidth = v === 'view' || v === 'drag' ? '1px' : '1.5px';
      }

      if (labelRef.current) {
        labelRef.current.textContent = v === 'view' ? 'VIEW' : v === 'drag' ? 'DRAG' : '';
        labelRef.current.style.opacity = v === 'view' || v === 'drag' ? '1' : '0';
      }

      // ink caret for text state
      if (caretRef.current) {
        caretRef.current.style.opacity = v === 'text' ? '1' : '0';
        caretRef.current.style.transform = `translate(${mouse.current.x - 1}px, ${mouse.current.y - 9}px)`;
      }

      // canvas: trail + burst particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.current.forEach((d) => {
        d.alpha *= 0.9;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 57, 70, ${d.alpha})`;
        ctx.fill();
      });
      trail.current = trail.current.filter((d) => d.alpha > 0.01);

      burst.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.alpha *= 0.92;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 57, 70, ${p.alpha})`;
        ctx.fill();
      });
      burst.current = burst.current.filter((p) => p.alpha > 0.02);

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998 }}
        aria-hidden="true"
      />

      {/* dot */}
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
          backgroundColor: INK,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.02s linear, opacity 0.2s ease',
        }}
      />

      {/* ring */}
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
          border: `1.5px solid ${INK}`,
          pointerEvents: 'none',
          zIndex: 9997,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition:
            'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease, border-width 0.2s ease',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontSize: '9px',
            fontWeight: 900,
            letterSpacing: '0.1em',
            color: INK,
            opacity: 0,
            transition: 'opacity 0.2s ease',
          }}
        />
      </div>

      {/* ink-brush text caret */}
      <div
        ref={caretRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '2px',
          height: '18px',
          borderRadius: '2px',
          backgroundColor: INK,
          pointerEvents: 'none',
          zIndex: 9997,
          opacity: 0,
          transition: 'opacity 0.15s ease',
        }}
      />
    </>
  );
}

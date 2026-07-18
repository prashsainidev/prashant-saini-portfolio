/**
 * SmoothScroll — Global Lenis smooth scroll provider.
 *
 * Uses the official ReactLenis component with root=true so Lenis controls
 * the window scroll globally (single instance, as per architecture rules).
 *
 * GSAP ScrollTrigger sync: we wire lenis.on('scroll', ScrollTrigger.update)
 * so pinned sections (ProjectsSection horizontal scroll, ExperienceSection
 * timeline) stay perfectly in sync with Lenis's interpolated position.
 *
 * Mounted in layout.tsx — wraps the entire app once at the root level.
 */
'use client';

import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    // Keep GSAP ScrollTrigger in sync with Lenis's interpolated scroll position.
    // Without this, pinned sections scroll out of phase with smooth scroll.
    function onScroll() {
      ScrollTrigger.update();
    }

    lenis.on('scroll', onScroll);

    return () => {
      lenis.off('scroll', onScroll);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        // Cinematic feel — slightly longer than default 1.2s
        duration: 1.4,
        // Ease curve that feels like silk — fast start, soft landing
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

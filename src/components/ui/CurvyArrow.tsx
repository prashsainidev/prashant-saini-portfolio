/**
 * CurvyArrow — GSAP-drawn SVG curvy arrow connecting sections.
 * The path draws itself when it enters the viewport (drawSVG effect).
 * This is the signature manga-style connector used between sections.
 *
 * @example
 * <CurvyArrow variant="down-right" />
 * <CurvyArrow variant="down-left" width={200} height={150} />
 */
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

type ArrowVariant = 'down-right' | 'down-left' | 'down-center' | 's-curve';

interface CurvyArrowProps {
  variant?: ArrowVariant;
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

/** SVG path definitions for each arrow variant */
const pathData: Record<ArrowVariant, string> = {
  'down-right': 'M 20 20 C 20 80, 180 80, 180 160 C 180 240, 280 240, 280 320',
  'down-left': 'M 280 20 C 280 80, 120 80, 120 160 C 120 240, 20 240, 20 320',
  'down-center': 'M 150 20 C 200 80, 100 160, 150 240 C 200 320, 150 360, 150 380',
  's-curve':
    'M 40 20 C 40 100, 200 100, 200 180 C 200 260, 40 260, 40 340 C 40 400, 160 400, 160 440',
};

/** Arrowhead position for each variant */
const arrowHeadPos: Record<ArrowVariant, { x: number; y: number; rotate: string }> = {
  'down-right': { x: 280, y: 320, rotate: 'rotate(160, 280, 320)' },
  'down-left': { x: 20, y: 320, rotate: 'rotate(-160, 20, 320)' },
  'down-center': { x: 150, y: 380, rotate: 'rotate(180, 150, 380)' },
  's-curve': { x: 160, y: 440, rotate: 'rotate(160, 160, 440)' },
};

const svgDimensions: Record<ArrowVariant, { w: number; h: number }> = {
  'down-right': { w: 300, h: 340 },
  'down-left': { w: 300, h: 340 },
  'down-center': { w: 300, h: 400 },
  's-curve': { w: 240, h: 460 },
};

export function CurvyArrow({
  variant = 'down-right',
  color = 'var(--accent-red)',
  opacity = 0.45,
  className,
}: CurvyArrowProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const arrowRef = useRef<SVGPolygonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const dim = svgDimensions[variant];
  const ah = arrowHeadPos[variant];

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(arrowRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: 'top 85%',
        once: true,
      },
    });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power2.out',
    }).to(arrowRef.current, { opacity: 1, duration: 0.3 }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${dim.w} ${dim.h}`}
      width={dim.w}
      height={dim.h}
      className={cn(className)}
      style={{ overflow: 'visible', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Main curvy path */}
      <path
        ref={pathRef}
        d={pathData[variant]}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={opacity}
      />
      {/* Arrowhead */}
      <polygon
        ref={arrowRef}
        points={`${ah.x},${ah.y - 10} ${ah.x - 5},${ah.y - 18} ${ah.x + 5},${ah.y - 18}`}
        fill={color}
        opacity={opacity}
        transform={ah.rotate}
      />
    </svg>
  );
}

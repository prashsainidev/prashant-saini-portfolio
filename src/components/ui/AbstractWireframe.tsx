/**
 * AbstractWireframe — Rotating 3D wireframe Icosahedron.
 * Used in About section right column behind the Story Panels.
 *
 * Fixes applied vs. original:
 *  - Removed dead `useState` and `useMemo` imports
 *  - Fixed `new Color("rgba(...)")` → `new Color("#hex")` (Three.js doesn't accept rgba strings)
 *  - Typed `materialRef` as `MeshBasicMaterial` (not `any`)
 *  - Color is now light/dark mode aware via `isDark` prop
 */
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshBasicMaterial, Color } from 'three';
import { Float } from '@react-three/drei';

interface AbstractWireframeProps {
  isHovered: boolean;
  isDark: boolean;
}

/* Pre-allocated Color objects — avoid GC pressure every frame */
const COLOR_BASE_DARK = new Color('#E63946').multiplyScalar(0.4); // dim red
const COLOR_HOVER_DARK = new Color('#F0EBE0'); // bright white (dark mode)
const COLOR_BASE_LIGHT = new Color('#E63946').multiplyScalar(0.5); // slightly brighter red on light bg
const COLOR_HOVER_LIGHT = new Color('#1A1512'); // near-black on hover in light mode

export function AbstractWireframe({ isHovered, isDark }: AbstractWireframeProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshBasicMaterial>(null);
  const speed = useRef(0.001);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const targetSpeed = isHovered ? 0.018 : 0.0015;
    const targetScale = isHovered ? 1.12 : 1;

    /* Smooth speed lerp */
    speed.current += (targetSpeed - speed.current) * 0.05;
    meshRef.current.rotation.x += speed.current;
    meshRef.current.rotation.y += speed.current * 1.5;

    /* Scale lerp */
    const s = meshRef.current.scale;
    s.x += (targetScale - s.x) * 0.05;
    s.y = s.x;
    s.z = s.x;

    /* Color lerp — theme aware */
    const baseColor = isDark ? COLOR_BASE_DARK : COLOR_BASE_LIGHT;
    const hoverColor = isDark ? COLOR_HOVER_DARK : COLOR_HOVER_LIGHT;
    materialRef.current.color.lerp(isHovered ? hoverColor : baseColor, 0.05);

    /* Organic pulse on hover */
    if (isHovered) {
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 5) * 0.08;
    } else {
      meshRef.current.position.y += (0 - meshRef.current.position.y) * 0.1;
    }
  });

  return (
    <Float
      speed={isHovered ? 3 : 1.2}
      rotationIntensity={isHovered ? 1.2 : 0.4}
      floatIntensity={isHovered ? 1.5 : 0.8}
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshBasicMaterial
          ref={materialRef}
          wireframe
          transparent
          opacity={isHovered ? 0.38 : 0.14}
          color={isDark ? COLOR_BASE_DARK : COLOR_BASE_LIGHT}
        />
      </mesh>
    </Float>
  );
}

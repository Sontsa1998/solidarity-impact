'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * CursorSpotlight — halo lumineux semi-transparent qui suit la souris.
 * Positionné en fixed, z-index faible pour ne pas bloquer les interactions.
 */
export function CursorSpotlight() {
  const dotRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = dotRef.current;
    if (!el) return;

    let raf: number;
    let mx = -300, my = -300;
    let cx = -300, cy = -300;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });

    function animate() {
      cx += (mx - cx) * 0.1;
      cy += (my - cy) * 0.1;
      if (el) {
        el.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
      }
      raf = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[1] w-[400px] h-[400px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(107,62,46,0.06) 0%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}

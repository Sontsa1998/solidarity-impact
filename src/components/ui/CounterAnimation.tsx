'use client';

/**
 * CounterAnimation.tsx — Compteur animé déclenché par Intersection Observer
 *
 * Interpole de 0 à `value` via requestAnimationFrame sur la durée spécifiée.
 * L'animation ne démarre que lorsque l'élément entre dans le viewport (threshold: 0.5).
 * Elle ne se rejoue qu'une seule fois par montage.
 * Si prefers-reduced-motion est actif, la valeur finale est affichée immédiatement.
 *
 * Requirements: 12.5
 */

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CounterAnimationProps {
  /** Valeur cible à atteindre à la fin de l'animation */
  readonly value: number;
  /**
   * Durée de l'animation en millisecondes.
   * Plage recommandée : 1000–2000 ms. Défaut : 1500 ms.
   */
  readonly duration?: number;
  readonly className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * CounterAnimation — Affiche un entier animé de 0 vers `value`.
 *
 * - Déclenché une seule fois quand l'élément atteint 50 % de visibilité.
 * - Si prefers-reduced-motion est actif, affiche directement la valeur finale.
 */
export function CounterAnimation({
  value,
  duration = 1500,
  className,
}: CounterAnimationProps) {
  const prefersReduced = useReducedMotion();

  // Initialisation immédiate si prefers-reduced-motion est actif
  const [count, setCount] = useState(prefersReduced ? value : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Respect de prefers-reduced-motion : afficher la valeur finale sans animation
    if (prefersReduced) {
      setCount(value);
      return;
    }

    // Clamper la durée dans la plage recommandée
    const clampedDuration = Math.min(Math.max(duration, 1000), 2000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Interpolation linéaire via requestAnimationFrame
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / clampedDuration, 1);
            setCount(Math.round(progress * value));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  );
}

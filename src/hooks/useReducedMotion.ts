'use client';
import { useState, useEffect } from 'react';

/**
 * Hook SSR-safe qui lit la préférence `prefers-reduced-motion` de l'utilisateur.
 * Retourne `true` si l'utilisateur a activé la réduction des mouvements,
 * `false` sinon (valeur par défaut côté serveur).
 *
 * Satisfait les exigences : Requirements 6.6, 7.6, 12.3
 */
export function useReducedMotion(): boolean {
  // SSR-safe : false par défaut (window n'est pas disponible côté serveur)
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

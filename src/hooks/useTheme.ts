'use client';

import { useState, useEffect } from 'react';
import { getInitialTheme, persistTheme } from '@/lib/theme';

type Theme = 'light' | 'dark';

/**
 * Hook de gestion du thème clair/sombre.
 *
 * - Résout le thème initial via getInitialTheme() (localStorage → prefers-color-scheme → 'light')
 * - Applique/retire la classe `dark` sur <html>
 * - Persiste le choix dans localStorage via persistTheme()
 *
 * Validates: Requirements 3.1, 3.2, 3.3
 */
export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>('light');

  // Lecture du thème initial côté client uniquement (évite les erreurs SSR)
  useEffect(() => {
    // Lecture de la valeur stockée dans localStorage (protégée par try/catch)
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('si_theme');
    } catch {
      // localStorage indisponible (navigation privée, quota) — on ignore silencieusement
    }

    // Lecture de la préférence système via matchMedia
    let systemPref: 'dark' | 'light' | null = null;
    try {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        systemPref = 'dark';
      } else {
        systemPref = 'light';
      }
    } catch {
      // matchMedia indisponible — on ignore
    }

    const initial = getInitialTheme(stored, systemPref);
    setTheme(initial);

    // Appliquer la classe dark sur <html> selon le thème résolu
    if (initial === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const next: Theme = current === 'light' ? 'dark' : 'light';

      // Appliquer/retirer la classe `dark` sur l'élément racine
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Persister le nouveau thème
      persistTheme(next);

      return next;
    });
  };

  return { theme, toggleTheme };
}

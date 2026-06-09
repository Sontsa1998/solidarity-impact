'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

// ─── Context ──────────────────────────────────────────────────────────────────

interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

export function useThemeContext(): ThemeContextValue {
  return useContext(ThemeContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * ThemeProvider
 *
 * - Fournit le contexte { theme, toggleTheme } à tous les composants enfants.
 * - Applique / retire la classe 'dark' sur <html> à chaque changement de thème.
 * - L'initialisation synchrone (anti-FOUC) est gérée par useTheme() via
 *   getInitialTheme() qui lit localStorage avant le premier rendu.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, toggleTheme } = useTheme();

  // Synchroniser la classe 'dark' sur <html> à chaque changement de thème
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

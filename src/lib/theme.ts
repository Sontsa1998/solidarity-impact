/**
 * Theme utility functions for the Solidarity Impact website.
 *
 * Implements the theme resolution logic (Property 4) and persistence
 * as specified in the design document and Requirement 3.3.
 */

const THEME_STORAGE_KEY = 'si_theme';

/**
 * Determines the initial theme to apply based on a strict priority order:
 *  1. Stored value in localStorage (if 'light' or 'dark')
 *  2. System preference (if 'dark')
 *  3. Default: 'light'
 *
 * @param stored - Value read from localStorage, or null if unavailable/missing.
 * @param systemPreference - Result of `prefers-color-scheme` media query, or null.
 * @returns The resolved theme: 'light' | 'dark'
 */
export function getInitialTheme(
  stored: string | null,
  systemPreference: 'dark' | 'light' | null
): 'light' | 'dark' {
  // Priority 1: valid stored value
  if (stored === 'light' || stored === 'dark') return stored;
  // Priority 2: system preference is dark
  if (systemPreference === 'dark') return 'dark';
  // Priority 3: default light
  return 'light';
}

/**
 * Persists the chosen theme to localStorage under the key 'si_theme'.
 * Silently swallows errors (e.g. private browsing, storage quota exceeded).
 *
 * @param theme - The theme to persist: 'light' | 'dark'
 */
export function persistTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Silently ignore — localStorage may be unavailable (private mode, quota)
  }
}

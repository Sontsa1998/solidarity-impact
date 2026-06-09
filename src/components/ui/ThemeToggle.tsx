'use client';

/**
 * ThemeToggle.tsx — Bouton de basculement du thème clair/sombre
 *
 * Consomme useThemeContext() pour lire le thème actif et appeler toggleTheme().
 * Consomme useI18nContext() pour les labels aria traduits.
 *
 * Requirements: 3.5, 3.6
 */

import { useThemeContext } from '@/components/providers/ThemeProvider';
import { useI18nContext } from '@/components/providers/I18nProvider';

/**
 * ThemeToggle
 *
 * Affiche ☀️ quand le thème est 'dark' (cliquer activera le mode clair)
 * Affiche 🌙 quand le thème est 'light' (cliquer activera le mode sombre)
 *
 * L'aria-label décrit l'ACTION — ce que le clic va faire :
 *   - theme 'dark'  → aria-label = t('theme.toggleLight') → "Activer le mode clair"
 *   - theme 'light' → aria-label = t('theme.toggleDark')  → "Activer le mode sombre"
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  const { t } = useI18nContext();

  const isDark = theme === 'dark';

  // L'emoji et le label décrivent ce qui va se passer au clic,
  // pas l'état courant.
  const icon = isDark ? '☀️' : '🌙';
  const ariaLabel = isDark ? t('theme.toggleLight') : t('theme.toggleDark');

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      title={ariaLabel}
      suppressHydrationWarning
      className={[
        'inline-flex items-center justify-center',
        'w-10 h-10 rounded-full',
        'bg-gray-100 dark:bg-gray-800',
        'text-gray-700 dark:text-gray-200',
        'border border-gray-200 dark:border-gray-700',
        'hover:bg-gray-200 dark:hover:bg-gray-700',
        'focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-[#7B3F2A] focus-visible:ring-offset-2',
        'transition-colors duration-300',
        'cursor-pointer',
        'text-xl',
      ].join(' ')}
    >
      <span aria-hidden="true" suppressHydrationWarning>{icon}</span>
    </button>
  );
}

export default ThemeToggle;

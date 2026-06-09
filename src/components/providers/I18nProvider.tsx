'use client';

/**
 * I18nProvider.tsx — Context React pour l'internationalisation
 *
 * Fournit la langue active, le changement de langue, la fonction de traduction,
 * et la clé d'animation aux composants enfants via React Context.
 *
 * Requirements: 2.2, 2.4, 13.1
 */

import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { useI18n } from '@/hooks/useI18n';
import type { Lang } from '@/lib/i18n';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface I18nContextType {
  /** Langue active : 'fr' | 'en' */
  lang: Lang;
  /** Change la langue, la persiste et incrémente animationKey */
  setLang: (lang: Lang) => void;
  /** Résout une clé de traduction avec notation pointée (ex: 'hero.title') */
  t: (key: string) => string;
  /**
   * Clé incrémentée à chaque changement de langue.
   * Utilisée comme `key` prop sur AnimatedSection pour rejouer les animations
   * des sections visibles dans le viewport (Requirement 2.8).
   */
  animationKey: number;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export const I18nContext = createContext<I18nContextType>({
  lang: 'fr',
  setLang: () => {},
  t: (key: string) => key,
  animationKey: 0,
});

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * useI18nContext — Accès au contexte i18n depuis n'importe quel composant enfant.
 *
 * @example
 * const { lang, setLang, t, animationKey } = useI18nContext();
 */
export function useI18nContext(): I18nContextType {
  return useContext(I18nContext);
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface I18nProviderProps {
  readonly children: ReactNode;
}

/**
 * I18nProvider — Enveloppe l'arborescence React avec le contexte i18n.
 *
 * Met à jour `document.documentElement.lang` à chaque changement de langue
 * pour l'accessibilité des lecteurs d'écran (Requirement 13.1).
 *
 * @example
 * <I18nProvider>
 *   <App />
 * </I18nProvider>
 */
export function I18nProvider({ children }: I18nProviderProps) {
  const { lang, setLang, t, animationKey } = useI18n();

  // Met à jour l'attribut lang de <html> quand la langue change (Requirement 13.1)
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const contextValue = useMemo(
    () => ({ lang, setLang, t, animationKey }),
    [lang, setLang, t, animationKey]
  );

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

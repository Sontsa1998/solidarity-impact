'use client';

/**
 * useI18n.ts — Hook de gestion de l'internationalisation
 *
 * Expose la langue active, le changement de langue, la fonction de traduction,
 * et une clé d'animation permettant de rejouer les animations au changement
 * de langue (Requirements 2.2, 2.4, 2.5, 2.8).
 */

import { useState, useEffect, useCallback } from 'react';
import {
  type Lang,
  getInitialLanguage,
  readStoredLanguage,
  persistLanguage,
  translate,
} from '@/lib/i18n';
import { fr } from '@/content/translations/fr';
import { en } from '@/content/translations/en';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UseI18nReturn {
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
// Flattening utility
// ---------------------------------------------------------------------------

/**
 * Aplatit un objet imbriqué en un Record<string, string> à notation pointée.
 *
 * Exemple :
 *   { nav: { home: 'Accueil' } }  →  { 'nav.home': 'Accueil' }
 *
 * Les valeurs qui sont des tableaux (string[]) sont sérialisées sous la forme
 * 'nav.values.0', 'nav.values.1', etc. pour rester compatibles avec
 * Record<string, string>.
 */
function flattenTranslations(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      // Tableau de chaînes → 'section.key.0', 'section.key.1', …
      value.forEach((item, index) => {
        result[`${fullKey}.${index}`] = String(item);
      });
    } else if (value !== null && typeof value === 'object') {
      // Objet imbriqué → récursion
      const nested = flattenTranslations(
        value as Record<string, unknown>,
        fullKey
      );
      Object.assign(result, nested);
    } else if (typeof value === 'string') {
      result[fullKey] = value;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      result[fullKey] = String(value);
    }
    // null / undefined → ignoré (clé omise du dictionnaire aplati)
  }

  return result;
}

// ---------------------------------------------------------------------------
// Dictionnaire aplati pré-calculé (hors du hook pour éviter les recalculs)
// ---------------------------------------------------------------------------

const flatDict: Record<Lang, Record<string, string>> = {
  fr: flattenTranslations(fr as unknown as Record<string, unknown>),
  en: flattenTranslations(en as unknown as Record<string, unknown>),
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * useI18n — Accès aux traductions et changement de langue.
 *
 * @returns { lang, setLang, t, animationKey }
 *
 * @example
 * const { lang, setLang, t, animationKey } = useI18n();
 * // Utilisation d'une clé simple
 * <h1>{t('hero.title')}</h1>
 * // Utilisation d'une clé imbriquée avec index de tableau
 * <li>{t('about.values.0')}</li>
 */
export function useI18n(): UseI18nReturn {
  // Toujours initialiser à 'fr' côté SSR pour correspondre au rendu serveur.
  // La vraie valeur (depuis localStorage) est lue dans useEffect, côté client.
  const [lang, setActiveLang] = useState<Lang>('fr');
  const [animationKey, setAnimationKey] = useState<number>(0);

  // Lire localStorage uniquement après hydratation pour éviter le mismatch SSR/client
  useEffect(() => {
    const stored = readStoredLanguage();
    const initial = getInitialLanguage(stored);
    if (initial !== 'fr') {
      setActiveLang(initial);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Change la langue active, la persiste dans localStorage,
   * et incrémente animationKey pour forcer le replay des animations.
   */
  const setLang = useCallback((nextLang: Lang) => {
    setActiveLang(nextLang);
    persistLanguage(nextLang);
    setAnimationKey((prev) => prev + 1);
  }, []);

  /**
   * Résout une clé de traduction avec notation pointée.
   * Retourne la valeur FR en fallback si la clé est absente dans la langue
   * active, ou la clé brute en dernier recours (Requirement 2.7, Property 3).
   */
  const t = useCallback(
    (key: string): string => translate(key, lang, flatDict),
    [lang]
  );

  return { lang, setLang, t, animationKey };
}

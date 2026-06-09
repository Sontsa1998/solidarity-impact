/**
 * i18n.ts — Fonctions pures d'internationalisation
 *
 * Gère la résolution de langue, les traductions avec fallback FR,
 * et la persistance du choix de langue via localStorage.
 *
 * Requirements: 2.1, 2.3, 2.4, 2.5, 2.7
 */

/** Les deux langues supportées par l'application. */
export type Lang = 'fr' | 'en';

/**
 * Détermine la langue initiale à partir d'une valeur stockée.
 *
 * Property 1 — Pour toute valeur `stored` qui n'est ni 'fr' ni 'en'
 * (null, undefined, chaîne vide, ou toute autre valeur), retourne 'fr'.
 *
 * @param stored  Valeur lue depuis le localStorage (peut être null).
 * @returns       'fr' ou 'en' — 'fr' par défaut si valeur invalide.
 */
export function getInitialLanguage(stored: string | null): Lang {
  if (stored === 'fr' || stored === 'en') return stored;
  return 'fr';
}

/**
 * Résout une clé de traduction dans le dictionnaire fourni,
 * avec fallback vers le français si la clé est absente dans la langue active,
 * et retour de la clé brute en dernier recours.
 *
 * Property 3 — Pour toute clé présente dans le dictionnaire FR mais absente
 * du dictionnaire EN, translate(key, 'en', dict) retourne la valeur FR,
 * jamais undefined, null ou la clé brute.
 *
 * @param key   Clé de traduction (notation aplatie, ex: 'nav.home').
 * @param lang  Langue active ('fr' | 'en').
 * @param dict  Dictionnaire { [lang]: { [key]: string } }.
 * @returns     Chaîne traduite, valeur FR en fallback, ou clé brute en dernier recours.
 */
export function translate(
  key: string,
  lang: Lang,
  dict: Record<string, Record<string, string>>
): string {
  // 1. Valeur dans la langue active
  const value = dict[lang]?.[key];
  if (value !== undefined && value !== '') return value;

  // 2. Fallback français
  const fallback = dict['fr']?.[key];
  if (fallback !== undefined && fallback !== '') return fallback;

  // 3. Dernière défense : retourner la clé brute
  // (ne devrait jamais arriver en production si les fichiers de traduction sont complets)
  return key;
}

/**
 * Persiste le choix de langue dans le localStorage.
 *
 * Property 2 — Après persistLanguage(lang), localStorage.getItem('si_lang')
 * retourne exactement ce même code de langue.
 *
 * Silencieux en cas d'indisponibilité du localStorage (navigation privée,
 * quota atteint). Requirements 2.4, 2.5.
 *
 * @param lang  Langue à persister ('fr' | 'en').
 */
export function persistLanguage(lang: Lang): void {
  try {
    localStorage.setItem('si_lang', lang);
  } catch {
    // localStorage indisponible — aucune erreur visible pour l'utilisateur
  }
}

/**
 * Lit la langue stockée dans le localStorage.
 *
 * Retourne null si le localStorage est indisponible (navigation privée,
 * quota atteint, ou clé absente). Requirements 2.3, 2.5.
 *
 * @returns  La valeur stockée sous 'si_lang', ou null.
 */
export function readStoredLanguage(): string | null {
  try {
    return localStorage.getItem('si_lang');
  } catch {
    // localStorage indisponible (navigation privée, quota)
    return null;
  }
}

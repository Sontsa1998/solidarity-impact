'use client';

/**
 * LanguageSwitcher.tsx — Commutateur de langue FR / EN
 *
 * Affiche deux boutons permettant de basculer entre le français et l'anglais.
 * Le bouton de la langue active est visuellement distinct (couleur + graisse)
 * et porte l'attribut aria-current="true" pour l'accessibilité.
 *
 * Requirements: 2.2, 2.9
 */

import { useI18nContext } from '@/components/providers/I18nProvider';
import type { Lang } from '@/lib/i18n';

const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
];

/**
 * LanguageSwitcher — Composant client de sélection de langue.
 *
 * Accessibilité :
 * - `aria-current="true"` sur le bouton de la langue active.
 * - Distinction visuelle par couleur ET graisse (pas uniquement par couleur),
 *   pour les utilisateurs daltoniens.
 * - Les deux boutons sont accessibles au clavier (éléments <button> natifs).
 * - `aria-label` explicite sur chaque bouton pour les lecteurs d'écran.
 *
 * @example
 * <LanguageSwitcher />
 */
export function LanguageSwitcher() {
  const { lang, setLang } = useI18nContext();

  return (
    <div
      aria-label="Sélection de la langue / Language selection"
      className="flex items-center gap-1"
    >
      {LANGUAGES.map(({ code, label }) => {
        const isActive = lang === code;

        return (
          <button
            key={code}
            type="button"
            onClick={() => {
              if (!isActive) setLang(code);
            }}
            disabled={isActive}
            aria-current={isActive ? 'true' : undefined}
            aria-label={
              isActive
                ? `Langue active : ${label}`
                : `Passer en ${label}`
            }
            className={[
              'px-2 py-1 text-sm rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              isActive
                ? // Active : couleur primaire + gras + souligné (triple signal visuel)
                  'font-bold underline text-primary-600 dark:text-primary-400 cursor-default'
                : // Inactive : couleur atténuée, graisse normale, pas de soulignement
                  'font-normal text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 cursor-pointer',
            ].join(' ')}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

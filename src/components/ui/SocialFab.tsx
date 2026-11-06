'use client';

import { siteConfig } from '@/content/config';
import { useI18nContext } from '@/components/providers/I18nProvider';

/**
 * Boutons flottants des réseaux sociaux, empilés en bas à droite de l'écran.
 * Seuls les réseaux renseignés dans `siteConfig.socialLinks` sont affichés :
 * pour ajouter TikTok, il suffit de remplir `tiktok` dans src/content/config.ts.
 */

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.35-2.49V9.66a5.73 5.73 0 0 0-.75-.05A5.69 5.69 0 0 0 4.17 15.3 5.69 5.69 0 0 0 9.86 21a5.69 5.69 0 0 0 5.69-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.25-1.48Z" />
    </svg>
  );
}

const NETWORKS = [
  { key: 'linkedin',  label: 'LinkedIn',  Icon: LinkedInIcon  },
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { key: 'tiktok',    label: 'TikTok',    Icon: TikTokIcon    },
] as const;

export function SocialFab() {
  const { lang } = useI18nContext();
  const links = NETWORKS
    .map((n) => ({ ...n, href: siteConfig.socialLinks[n.key] }))
    .filter((n): n is typeof n & { href: string } => Boolean(n.href));

  if (links.length === 0) return null;

  return (
    <nav
      aria-label={lang === 'en' ? 'Follow us on social media' : 'Suivez-nous sur les réseaux sociaux'}
      className="fixed z-40 right-4 sm:right-6 flex flex-col gap-3"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      {links.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === 'en' ? `${label} (opens in a new tab)` : `${label} (nouvel onglet)`}
          className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#2E7D44] text-white shadow-[0_6px_20px_rgba(18,33,26,0.28)] ring-2 ring-white/70 dark:ring-[#0E1A14] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#256B39] hover:shadow-[0_10px_26px_rgba(18,33,26,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F2C94C]"
        >
          <Icon />
          {/* Étiquette au survol (ordinateur) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-[#12211A] px-3 py-1 text-xs font-medium text-white opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 hidden sm:block"
          >
            {label}
          </span>
        </a>
      ))}
    </nav>
  );
}

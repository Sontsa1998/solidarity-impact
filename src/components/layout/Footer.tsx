'use client';

/**
 * Footer.tsx — Pied de page de l'association Solidarity Impact
 *
 * Affiche :
 * - Logo et nom de l'association
 * - Liens de navigation principaux
 * - Mention légale "Association loi 1901"
 * - Numéro SIREN (si configuré dans siteConfig.association.sirenNumber)
 * - Adresse du siège social
 * - Icônes des réseaux sociaux (uniquement les URLs configurées)
 * - Droits d'auteur avec année dynamique
 *
 * Requirements: 11.1, 11.2, 11.3, 11.4, 11.5
 */

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useI18nContext } from '@/components/providers/I18nProvider';
import { siteConfig } from '@/content/config';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  key: string;
  href: string;
  labelKey: string;
}

interface SocialIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Navigation links
// ---------------------------------------------------------------------------

const NAV_LINKS: NavLink[] = [
  { key: 'home',    href: '#hero',    labelKey: 'nav.home'    },
  { key: 'about',   href: '#about',   labelKey: 'nav.about'   },
  { key: 'team',    href: '#team',    labelKey: 'nav.team'    },
  { key: 'events',  href: '#events',  labelKey: 'nav.events'  },
  { key: 'donate',  href: '#donate',  labelKey: 'nav.donate'  },
  { key: 'contact', href: '#contact', labelKey: 'nav.contact' },
];

// ---------------------------------------------------------------------------
// Social icon SVG paths
// ---------------------------------------------------------------------------

/** Facebook icon (simple path, brand-recognisable) */
function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M22 12a10 10 0 1 0-11.563 9.872v-6.985H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.887h-2.33v6.985A10.003 10.003 0 0 0 22 12Z" />
    </svg>
  );
}

/** Instagram icon */
function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  );
}

/** LinkedIn icon */
function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

/** X / Twitter icon */
function TwitterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

/** YouTube icon */
function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SocialIconLink sub-component
// ---------------------------------------------------------------------------

/**
 * SocialIconLink — Lien icône réseau social avec accessibilité et hover.
 * Ouvre dans un nouvel onglet (Requirement 11.3).
 */
function SocialIconLink({ href, label, children }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        text-gray-400
        hover:text-primary-500
        transition-colors
        duration-200
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary-500
        focus-visible:ring-offset-2
        focus-visible:ring-offset-gray-900
        rounded
      "
    >
      {children}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Footer component
// ---------------------------------------------------------------------------

/**
 * Footer — Pied de page principal du site Solidarity Impact.
 *
 * - role="contentinfo" pour la sémantique HTML (Requirement 13.2)
 * - Tout le contenu textuel est traduit via t() (Requirement 11.4)
 * - Hover sur les liens : transition-colors 200ms (Requirement 11.5)
 */
export function Footer() {
  const { t } = useI18nContext();
  const { association, socialLinks } = siteConfig;

  // Année côté client uniquement pour éviter l'hydratation mismatch
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  useEffect(() => { setCurrentYear(new Date().getFullYear()); }, []);

  const rightsText = t('footer.rights').replace('{year}', String(currentYear ?? ''));

  // ---------------------------------------------------------------------------
  // Scroll helper (smooth scroll vers les ancres)
  // ---------------------------------------------------------------------------
  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <footer
      role="contentinfo"
      className="bg-gray-900 dark:bg-gray-950 text-gray-300"
    >
      {/* ── Main footer content ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* ── Column 1 : Brand & legal ──────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Logo + name */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Logo de l'association Solidarity Impact"
                width={40}
                height={40}
                className="rounded"
              />
              <span className="font-bold text-white text-lg">
                {association.name}
              </span>
            </div>

            {/* Legal mention — Requirement 11.1 */}
            <p className="text-sm text-gray-400">
              {t('footer.legalMention')}
            </p>

            {/* SIREN — displayed only when configured (Requirement 11.1) */}
            {association.sirenNumber && (
              <p className="text-sm text-gray-400">
                SIREN&nbsp;: {association.sirenNumber}
              </p>
            )}

            {/* Address — Requirement 11.2 */}
            <address className="not-italic text-sm text-gray-400 leading-relaxed">
              {association.address}
              <br />
              {association.postalCode} {association.city}
            </address>
          </div>

          {/* ── Column 2 : Navigation links ───────────────────────────── */}
          <div>
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t('nav.home')}
            </h2>
            <nav aria-label={t('nav.home')}>
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="
                        text-sm text-gray-400
                        hover:text-primary-400
                        transition-colors
                        duration-200
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary-500
                        rounded
                      "
                    >
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Column 3 : Social networks ────────────────────────────── */}
          {/* Only rendered when at least one social URL is configured
              — Requirement 11.3 */}
          {Object.values(socialLinks).some(Boolean) && (
            <div>
              <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Réseaux sociaux
              </h2>
              <div className="flex flex-wrap gap-4">
                {socialLinks.facebook && (
                  <SocialIconLink
                    href={socialLinks.facebook}
                    label="Facebook — Solidarity Impact"
                  >
                    <FacebookIcon />
                  </SocialIconLink>
                )}
                {socialLinks.instagram && (
                  <SocialIconLink
                    href={socialLinks.instagram}
                    label="Instagram — Solidarity Impact"
                  >
                    <InstagramIcon />
                  </SocialIconLink>
                )}
                {socialLinks.linkedin && (
                  <SocialIconLink
                    href={socialLinks.linkedin}
                    label="LinkedIn — Solidarity Impact"
                  >
                    <LinkedInIcon />
                  </SocialIconLink>
                )}
                {socialLinks.twitter && (
                  <SocialIconLink
                    href={socialLinks.twitter}
                    label="X (Twitter) — Solidarity Impact"
                  >
                    <TwitterIcon />
                  </SocialIconLink>
                )}
                {socialLinks.youtube && (
                  <SocialIconLink
                    href={socialLinks.youtube}
                    label="YouTube — Solidarity Impact"
                  >
                    <YouTubeIcon />
                  </SocialIconLink>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom bar : copyright ─────────────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            {rightsText}
          </p>
          {/* Address repeated compactly on small screens can be omitted;
              legal mention reinforcement for SEO / accessibility */}
          <p className="text-xs text-gray-500 text-center sm:text-right">
            {t('footer.address')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

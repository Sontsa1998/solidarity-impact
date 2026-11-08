'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useI18nContext } from '@/components/providers/I18nProvider';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { siteConfig } from '@/content/config';

const NAV_LINKS = [
  { href: '/',           labelFr: 'Accueil',      labelEn: 'Home'     },
  { href: '/evenements', labelFr: 'Événements',   labelEn: 'Events'   },
  { href: '/don',        labelFr: 'Faire un don', labelEn: 'Donate'   },
  { href: '/contact',    labelFr: 'Contact',      labelEn: 'Contact'  },
];

const ASSO_LINKS = [
  { href: '/a-propos',                  labelFr: "À propos de l'association", labelEn: 'About the association' },
  { href: '/equipe',                    labelFr: 'Notre équipe',              labelEn: 'Our team'              },
  { href: '/evenements/tournoi-football', labelFr: 'Tournoi de football',     labelEn: 'Football tournament'   },
  { href: '/don',                       labelFr: 'Nous soutenir',             labelEn: 'Support us'            },
];

const LEGAL_LINKS = [
  { href: '/mentions-legales',          labelFr: 'Mentions légales',              labelEn: 'Legal Notice'   },
  { href: '/politique-confidentialite', labelFr: 'Politique de confidentialité',  labelEn: 'Privacy Policy' },
];

function FacebookIcon()  { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.563 9.872v-6.985H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.887h-2.33v6.985A10.003 10.003 0 0 0 22 12Z" /></svg>; }
function InstagramIcon() { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" /></svg>; }
function LinkedInIcon()  { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" /></svg>; }
function TikTokIcon()    { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.35-2.49V9.66a5.73 5.73 0 0 0-.75-.05A5.69 5.69 0 0 0 4.17 15.3 5.69 5.69 0 0 0 9.86 21a5.69 5.69 0 0 0 5.69-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.25-1.48Z" /></svg>; }
function HelloAssoIcon() { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.1c2.1-.2 3.9.9 5.4 2.8 1.5-1.9 3.3-3 5.4-2.8 3.7.4 5.7 4.3 4.2 7.7C19.5 16.4 12 21 12 21Z" /></svg>; }
function EnvelopeIcon()  { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>; }
function MapPinIcon()    { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>; }
function PhoneIcon()     { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>; }

export function SiteFooter() {
  const { lang } = useI18nContext();
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);
  const T = (fr: string, en: string) => (lang === 'en' ? en : fr);

  // Seuls les réseaux réellement configurés sont affichés (src/content/config.ts)
  const socials = [
    { label: 'LinkedIn',  href: siteConfig.socialLinks.linkedin,  Icon: LinkedInIcon  },
    { label: 'Instagram', href: siteConfig.socialLinks.instagram, Icon: InstagramIcon },
    { label: 'HelloAsso', href: siteConfig.socialLinks.helloasso, Icon: HelloAssoIcon },
    { label: 'TikTok',    href: siteConfig.socialLinks.tiktok,    Icon: TikTokIcon    },
    { label: 'Facebook',  href: siteConfig.socialLinks.facebook,  Icon: FacebookIcon  },
  ].filter((s): s is typeof s & { href: string } => Boolean(s.href));

  const linkCls = 'text-sm text-[#4B5563] hover:text-[#2E7D44] dark:text-[#9CA3AF] dark:hover:text-[#5DB876] transition-colors';
  const titleCls = 'text-sm font-semibold uppercase tracking-[0.08em] mb-5 text-[#1A1A1A] dark:text-white';

  return (
    <footer role="contentinfo" className="bg-[#F9FAFB] dark:bg-[#0B1510] border-t border-[#EEF0F2] dark:border-[#1F3329]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Identité */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="w-fit" aria-label="Solidarity Impact — Accueil">
              <BrandLogo variant="compact" className="h-14 w-auto text-[#2E7D44] dark:text-[#5DB876]" title="Logo Solidarity Impact" />
            </Link>
            <p className="text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF] max-w-xs">
              {T("Créée en 2025 par un collectif de Franco-Camerounais, Solidarity Impact agit pour l'éducation, les opportunités professionnelles, le soutien aux plus démunis et des actions diverses sur le terrain au Cameroun.",
                 'Founded in 2025 by a group of French-Cameroonians, Solidarity Impact works for education, professional opportunities, support for the most vulnerable and a range of field actions in Cameroon.')}
            </p>
            {socials.length > 0 && (
              <div className="flex items-center gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-[#EEF7F0] text-[#2E7D44] hover:bg-[#2E7D44] hover:text-white transition-colors dark:bg-[#1F3329] dark:text-[#5DB876]">
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className={titleCls}>Navigation</h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ href, labelFr, labelEn }) => (
                <li key={href}><Link href={href} className={linkCls}>{T(labelFr, labelEn)}</Link></li>
              ))}
            </ul>
          </div>

          {/* L'association */}
          <div>
            <h3 className={titleCls}>{T("L'association", 'The association')}</h3>
            <ul className="flex flex-col gap-3">
              {ASSO_LINKS.map(({ href, labelFr, labelEn }) => (
                <li key={href}><Link href={href} className={linkCls}>{T(labelFr, labelEn)}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={titleCls}>Contact</h3>
            <ul className="flex flex-col gap-3.5 text-sm text-[#4B5563] dark:text-[#9CA3AF]">
              <li className="flex items-start gap-2.5">
                <EnvelopeIcon />
                <a href="mailto:contact@solidarityimpact.org" className={`${linkCls} break-all`}>contact@solidarityimpact.org</a>
              </li>
              <li className="flex items-start gap-2.5">
                <PhoneIcon />
                <a href="tel:+33751075750" className={linkCls}>07 51 07 57 50</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPinIcon />
                <address className="not-italic leading-relaxed">Villemomble</address>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 pt-6 border-t border-[#E5E7EB] dark:border-[#1F3329] flex flex-col items-center gap-3 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {LEGAL_LINKS.map(({ href, labelFr, labelEn }) => (
              <Link key={href} href={href} className="text-xs text-[#6B7280] hover:text-[#2E7D44] transition-colors">
                {T(labelFr, labelEn)}
              </Link>
            ))}
          </div>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            © <span suppressHydrationWarning>{year ?? ''}</span> Solidarity Impact. {T('Tous droits réservés.', 'All rights reserved.')} · {T('Association loi 1901', 'Non-profit (law 1901)')} · RNA W931031771 · SIREN 105 826 440
          </p>
        </div>
      </div>
    </footer>
  );
}

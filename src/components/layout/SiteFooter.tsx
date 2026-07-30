'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useI18nContext } from '@/components/providers/I18nProvider';

const NAV_LINKS = [
  { href: '/',           labelFr: 'Accueil',      labelEn: 'Home'     },
  { href: '/a-propos',   labelFr: 'À propos',     labelEn: 'About'    },
  { href: '/equipe',     labelFr: 'Notre équipe', labelEn: 'Our Team' },
  { href: '/evenements', labelFr: 'Événements',   labelEn: 'Events'   },
  { href: '/don',        labelFr: 'Faire un don', labelEn: 'Donate'   },
  { href: '/contact',    labelFr: 'Contact',      labelEn: 'Contact'  },
];

const LEGAL_LINKS = [
  { href: '/mentions-legales',          labelFr: 'Mentions légales',              labelEn: 'Legal Notice'   },
  { href: '/politique-confidentialite', labelFr: 'Politique de confidentialité',  labelEn: 'Privacy Policy' },
];

function FacebookIcon()  { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.563 9.872v-6.985H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.887h-2.33v6.985A10.003 10.003 0 0 0 22 12Z" /></svg>; }
function InstagramIcon() { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" /></svg>; }
function LinkedInIcon()  { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" /></svg>; }
function EnvelopeIcon()  { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>; }
function MapPinIcon()    { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>; }
function PhoneIcon()     { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>; }

export function SiteFooter() {
  const { lang } = useI18nContext();
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  return (
    <footer role="contentinfo" style={{ background: '#2a1209', color: '#d4ae92' }}>

      {/* Bande décorative franco-camerounaise */}
      <div className="h-1 flex" aria-hidden="true">
        <div className="flex-1" style={{ background: '#1d4ed8' }} />
        <div className="flex-1" style={{ background: '#ffffff' }} />
        <div className="flex-1" style={{ background: '#dc2626' }} />
        <div className="flex-1" style={{ background: '#16a34a' }} />
        <div className="flex-1" style={{ background: '#dc2626' }} />
        <div className="flex-1" style={{ background: '#fbbf24' }} />
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Colonne 1 — Identité */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <Image src="/logo.png" alt="Logo Solidarity Impact" width={48} height={48}
                className="rounded-full object-cover ring-2" style={{ '--tw-ring-color': '#3d2318' } as React.CSSProperties} />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg transition-colors group-hover:opacity-80" style={{ color: '#F5EFE6' }}>
                  Solidarity Impact
                </span>
                <span className="text-xs" style={{ color: '#9a7060' }}>Loi 1901 — Fondée en 2025</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: '#b07a60' }}>
              {lang === 'en'
                ? "Franco-Cameroonian association committed to education, orphanages and local development."
                : "Association franco-camerounaise engagée pour l'éducation, les orphelinats et le développement local."}
            </p>
            <div className="flex items-center gap-3 mt-1">
              {[
                { label: 'Facebook',  Icon: FacebookIcon  },
                { label: 'Instagram', Icon: InstagramIcon },
                { label: 'LinkedIn',  Icon: LinkedInIcon  },
              ].map(({ label, Icon }) => (
                <a key={label} href="#" aria-label={label}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: '#9a7060' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F5EFE6')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9a7060')}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 — Navigation */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: '#F5EFE6' }}>
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ href, labelFr, labelEn }) => (
                <li key={href}>
                  <Link href={href}
                    className="text-sm flex items-center gap-2 group transition-colors"
                    style={{ color: '#b07a60' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F5EFE6')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#b07a60')}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#7B3F2A' }} aria-hidden="true" />
                    {lang === 'en' ? labelEn : labelFr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: '#F5EFE6' }}>
              Contact
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-2.5 text-sm" style={{ color: '#b07a60' }}>
                <MapPinIcon />
                <address className="not-italic leading-relaxed">
                  Villemomble, France
                </address>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <EnvelopeIcon />
                <a href="mailto:contact@solidarityimpact.org"
                  className="transition-colors break-all"
                  style={{ color: '#b07a60' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F5EFE6')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#b07a60')}
                >
                  contact@solidarityimpact.org
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm" style={{ color: '#b07a60' }}>
                <PhoneIcon />
                <span>+33 7 54 39 89 71</span>
              </li>
            </ul>
          </div>

          {/* Colonne 4 — Mission */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: '#F5EFE6' }}>
              {lang === 'en' ? 'Our Mission' : 'Notre mission'}
            </h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#b07a60' }}>
              {lang === 'en'
                ? "Supporting education, orphanages and local development between France and Cameroon."
                : "Soutenir l'éducation, les orphelinats et le développement local entre la France et le Cameroun."}
            </p>
            <Link href="/don"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: '#7B3F2A', color: '#F5EFE6' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#6a3423')}
              onMouseLeave={e => (e.currentTarget.style.background = '#7B3F2A')}
            >
              <span>❤️</span>
              {lang === 'en' ? 'Make a donation' : 'Faire un don'}
            </Link>
          </div>
        </div>
      </div>

      {/* Barre copyright */}
      <div style={{ borderTop: '1px solid #3d2318' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-center sm:text-left" style={{ color: '#9a7060' }}>
              © <span suppressHydrationWarning>{year ?? ''}</span> Solidarity Impact. {lang === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'} — Association loi 1901
            </p>
            <div className="flex items-center gap-4">
              {LEGAL_LINKS.map(({ href, labelFr, labelEn }) => (
                <Link key={href} href={href}
                  className="text-xs transition-colors"
                  style={{ color: '#9a7060' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F5EFE6')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9a7060')}
                >
                  {lang === 'en' ? labelEn : labelFr}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

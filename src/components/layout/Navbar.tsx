'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useThemeContext } from '@/components/providers/ThemeProvider';
import { useI18nContext } from '@/components/providers/I18nProvider';
import { BrandLogo } from '@/components/brand/BrandLogo';

const NAV_LINKS = [
  { href: '/',            labelFr: 'Accueil',      labelEn: 'Home'      },
  { href: '/a-propos',    labelFr: "L'association",     labelEn: 'About us'  },
  { href: '/equipe',      labelFr: 'Équipe',       labelEn: 'Team'      },
  { href: '/evenements',  labelFr: 'Événements',   labelEn: 'Events'    },
  { href: '/don',         labelFr: 'Faire un don', labelEn: 'Donate'    },
  { href: '/contact',     labelFr: 'Contact',      labelEn: 'Contact'   },
];

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="w-6 h-6" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="w-6 h-6" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Style : barre blanche épurée, liens centrés, bouton « pilule » vert ─────
const BRAND = {
  link:        'text-[#1A1A1A] dark:text-[#E5E7EB] hover:text-[#2E7D44] dark:hover:text-[#5DB876]',
  active:      'text-[#2E7D44] dark:text-[#5DB876] font-medium',
  ctaBg:       'bg-[#2E7D44] hover:bg-[#256B39] active:bg-[#1F5A30] text-white',
  pill:        'bg-[#F3F4F6] dark:bg-[#1F3329]',
  pillActive:  'bg-white dark:bg-[#2E7D44] text-[#2E7D44] dark:text-white shadow-sm',
  pillDefault: 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#1A1A1A] dark:hover:text-white',
  iconBtn:     'text-[#374151] dark:text-[#E5E7EB] hover:bg-[#F3F4F6] dark:hover:bg-[#1F3329]',
  focus:       'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D44] focus-visible:ring-offset-2',
};

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeContext();
  const { lang, setLang } = useI18nContext();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); hamburgerRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) &&
          hamburgerRef.current && !hamburgerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const links = NAV_LINKS.filter(({ href }) => href !== '/don');
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const donateLabel = lang === 'en' ? 'Donate' : 'Faire un don';

  return (
    <header
      role="banner"
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-[#0E1A14]',
        'border-b border-[#EEF0F2] dark:border-[#1F3329]',
        scrolled ? 'shadow-[0_2px_16px_rgba(0,0,0,0.06)]' : '',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">

          {/* Logo officiel */}
          <Link href="/" className={`flex-shrink-0 flex items-center rounded-lg ${BRAND.focus}`}
            aria-label="Solidarity Impact — Retour à l'accueil">
            <BrandLogo variant="compact"
              className="h-14 w-auto text-[#2E7D44] dark:text-[#5DB876] transition-transform duration-200 hover:scale-105" />
          </Link>

          {/* Nav desktop, centrée */}
          <nav aria-label="Navigation principale" className="hidden lg:flex flex-1 items-center justify-center gap-8">
            {links.map(({ href, labelFr, labelEn }) => {
              const active = isActive(href);
              return (
                <Link key={href} href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`text-[15px] transition-colors duration-200 rounded ${BRAND.focus} ${active ? BRAND.active : BRAND.link}`}>
                  {lang === 'en' ? labelEn : labelFr}
                </Link>
              );
            })}
          </nav>

          {/* Actions desktop */}
          <div className="hidden lg:flex flex-shrink-0 items-center gap-2">
            <div className={`flex items-center gap-0.5 rounded-full p-0.5 ${BRAND.pill}`}>
              {(['fr', 'en'] as const).map((code) => (
                <button key={code} type="button" onClick={() => setLang(code)}
                  disabled={lang === code}
                  aria-current={lang === code ? 'true' : undefined}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${lang === code ? BRAND.pillActive : BRAND.pillDefault} ${BRAND.focus}`}>
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            <button type="button" onClick={toggleTheme}
              aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
              suppressHydrationWarning
              className={`p-2 rounded-full transition-all duration-200 ${BRAND.iconBtn} ${BRAND.focus}`}>
              <span suppressHydrationWarning>{isDark ? <SunIcon /> : <MoonIcon />}</span>
            </button>

            <Link href="/don"
              className={`ml-2 px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ${BRAND.ctaBg} ${BRAND.focus}`}>
              {donateLabel}
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-1">
            <Link href="/don"
              className={`mr-1 px-4 py-2 text-sm font-semibold rounded-full ${BRAND.ctaBg} ${BRAND.focus}`}>
              {donateLabel}
            </Link>
            <button ref={hamburgerRef} type="button" onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen} aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className={`p-2 rounded-full transition-colors ${BRAND.iconBtn} ${BRAND.focus}`}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div ref={menuRef} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu de navigation"
          className="lg:hidden border-t border-[#EEF0F2] dark:border-[#1F3329] bg-white dark:bg-[#0E1A14] shadow-xl">
          <nav aria-label="Navigation mobile" className="px-4 py-3 flex flex-col">
            {links.map(({ href, labelFr, labelEn }) => {
              const active = isActive(href);
              return (
                <Link key={href} href={href} onClick={closeMenu}
                  aria-current={active ? 'page' : undefined}
                  className={`px-3 py-3 text-base border-b last:border-0 border-[#F3F4F6] dark:border-[#1F3329] ${active ? BRAND.active : BRAND.link}`}>
                  {lang === 'en' ? labelEn : labelFr}
                </Link>
              );
            })}
          </nav>
          <div className="px-4 pb-4 pt-2 flex items-center justify-between">
            <div className={`flex items-center gap-0.5 rounded-full p-0.5 ${BRAND.pill}`}>
              {(['fr', 'en'] as const).map((code) => (
                <button key={code} type="button" onClick={() => setLang(code)} disabled={lang === code}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${lang === code ? BRAND.pillActive : BRAND.pillDefault}`}>
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <button type="button" onClick={toggleTheme}
              aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
              suppressHydrationWarning
              className={`p-2 rounded-full transition-colors ${BRAND.iconBtn}`}>
              <span suppressHydrationWarning>{isDark ? <SunIcon /> : <MoonIcon />}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

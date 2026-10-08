'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useThemeContext } from '@/components/providers/ThemeProvider';
import { useI18nContext } from '@/components/providers/I18nProvider';
import { BrandLogo } from '@/components/brand/BrandLogo';

const NAV_LINKS = [
  { href: '/',            labelFr: 'Accueil',      labelEn: 'Home'      },
  { href: '/a-propos',    labelFr: 'À propos',     labelEn: 'About'     },
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

// ─── Couleurs brand (logo) ────────────────────────────────────────────────────
// Marron #6B3E2E  |  Beige #FDF9F7
const BRAND = {
  active:      'text-[#6B3E2E] dark:text-[#D2B8AA] bg-[#FDF9F7] dark:bg-[#3A2219] font-semibold',
  hover:       'text-[#4A2B20] dark:text-[#D2B8AA] hover:bg-[#FDF9F7] dark:hover:bg-[#3A2219]',
  default:     'text-[#3A2219] dark:text-[#D2B8AA]',
  ctaBg:       'bg-[#6B3E2E] hover:bg-[#5A3426] active:bg-[#4A2B20] text-[#FDF9F7]',
  pill:        'bg-[#FDF9F7] dark:bg-[#3A2219]',
  pillActive:  'bg-white dark:bg-[#4A2B20] text-[#6B3E2E] dark:text-[#D2B8AA] shadow-sm',
  pillDefault: 'text-[#86655A] dark:text-[#A8836F] hover:text-[#4A2B20] dark:hover:text-[#D2B8AA]',
  iconBtn:     'text-[#6B3E2E] dark:text-[#D2B8AA] hover:bg-[#FDF9F7] dark:hover:bg-[#3A2219]',
  focus:       'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B3E2E] focus-visible:ring-offset-1',
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

  return (
    <header
      role="banner"
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'border-b border-[#EBDDD4] dark:border-[#3A2219]',
        scrolled
          ? 'bg-[#FFFFFF]/96 dark:bg-[#170D09]/96 backdrop-blur-md shadow-md'
          : 'bg-[#FDF9F7] dark:bg-[#170D09]',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo + Nom */}
          <Link href="/" className={`flex items-center gap-3 group rounded-lg ${BRAND.focus}`}
            aria-label="Solidarity Impact — Retour à l'accueil">
            <BrandLogo variant="compact"
              className="h-12 w-auto text-[#6B3E2E] dark:text-[#F2C94C] transition-transform duration-200 group-hover:scale-105" />
            <div className="hidden sm:flex flex-col leading-tight border-l border-[#EBDDD4] dark:border-[#3A2219] pl-3">
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3FA45B]">
                {lang === 'en' ? 'The future within reach' : "L'avenir à portée de main"}
              </span>
              <span className="text-xs text-[#86655A] dark:text-[#A8836F]">
                {lang === 'en' ? 'Franco-Cameroonian association' : 'Association franco-camerounaise'}
              </span>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, labelFr, labelEn }) => {
              const label = lang === 'en' ? labelEn : labelFr;
              const isActive = pathname === href;
              return (
                <Link key={href} href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'px-3 py-2 rounded-lg text-sm transition-all duration-200',
                    BRAND.focus,
                    isActive ? BRAND.active : `text-[#4A2B20] dark:text-[#D2B8AA] hover:text-[#6B3E2E] dark:hover:text-[#FDF9F7] ${BRAND.hover}`,
                  ].join(' ')}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Actions desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Switcher langue */}
            <div className={`flex items-center gap-0.5 rounded-lg p-0.5 ${BRAND.pill}`}>
              {(['fr', 'en'] as const).map((code) => (
                <button key={code} type="button" onClick={() => setLang(code)}
                  disabled={lang === code}
                  aria-current={lang === code ? 'true' : undefined}
                  className={[
                    'px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200',
                    lang === code ? BRAND.pillActive : BRAND.pillDefault,
                    BRAND.focus,
                  ].join(' ')}>
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Dark/Light */}
            <button type="button" onClick={toggleTheme}
              aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
              suppressHydrationWarning
              className={`p-2 rounded-lg transition-all duration-200 ${BRAND.iconBtn} ${BRAND.focus}`}>
              <span suppressHydrationWarning>{isDark ? <SunIcon /> : <MoonIcon />}</span>
            </button>

            {/* CTA */}
            <Link href="/don"
              className={`ml-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${BRAND.ctaBg} ${BRAND.focus}`}>
              {lang === 'en' ? '❤️ Donate' : '❤️ Faire un don'}
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <button type="button" onClick={toggleTheme}
              aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
              suppressHydrationWarning
              className={`p-2 rounded-lg transition-colors ${BRAND.iconBtn}`}>
              <span suppressHydrationWarning>{isDark ? <SunIcon /> : <MoonIcon />}</span>
            </button>
            <button ref={hamburgerRef} type="button" onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen} aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className={`p-2 rounded-lg transition-colors ${BRAND.iconBtn} ${BRAND.focus}`}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div ref={menuRef} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu de navigation"
          className="lg:hidden border-t border-[#EBDDD4] dark:border-[#3A2219] bg-[#FDF9F7] dark:bg-[#170D09] shadow-xl">
          <nav aria-label="Navigation mobile" className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, labelFr, labelEn }) => {
              const label = lang === 'en' ? labelEn : labelFr;
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} onClick={closeMenu}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                    isActive ? BRAND.active : `text-[#4A2B20] dark:text-[#D2B8AA] hover:bg-[#FDF9F7] dark:hover:bg-[#3A2219]`,
                  ].join(' ')}>
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="px-4 pb-4 flex items-center justify-between border-t border-[#EBDDD4] dark:border-[#3A2219] pt-3">
            <div className={`flex items-center gap-0.5 rounded-lg p-0.5 ${BRAND.pill}`}>
              {(['fr', 'en'] as const).map((code) => (
                <button key={code} type="button" onClick={() => setLang(code)} disabled={lang === code}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 ${lang === code ? BRAND.pillActive : BRAND.pillDefault}`}>
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <Link href="/don" onClick={closeMenu}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm ${BRAND.ctaBg}`}>
              {lang === 'en' ? '❤️ Donate' : '❤️ Faire un don'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

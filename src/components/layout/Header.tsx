'use client';

/**
 * Header.tsx — Navigation sticky principale
 *
 * Fonctionnalités :
 * - Position sticky top-0 z-50 avec effet backdrop-blur au scroll > 50px (Req 4.1, 4.2)
 * - Logo public/logo.png avec alt accessible (Req 4.6, 13.3)
 * - Liens d'ancre avec smooth scroll (Req 4.4)
 * - Lien actif via useScrollSpy() (Req 4.5)
 * - Menu hamburger mobile < 768px avec aria complet (Req 4.3, 13.1)
 * - Overlay mobile animé Framer Motion 200–400ms (Req 4.3)
 * - Fermeture : clic extérieur, clic lien, touche Escape (Req 4.3)
 * - Focus trap dans le menu mobile (Req 13.1)
 * - Intégration LanguageSwitcher et ThemeToggle (Req 4.1)
 *
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 13.1, 13.2
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18nContext } from '@/components/providers/I18nProvider';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  /** Clé de traduction dans nav.* */
  labelKey: string;
  /** Id de section cible (sans le #) */
  sectionId: string;
}

// ---------------------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------------------

const NAV_LINKS: NavLink[] = [
  { labelKey: 'nav.home',    sectionId: 'hero'    },
  { labelKey: 'nav.about',   sectionId: 'about'   },
  { labelKey: 'nav.team',    sectionId: 'team'    },
  { labelKey: 'nav.events',  sectionId: 'events'  },
  { labelKey: 'nav.donate',  sectionId: 'donate'  },
  { labelKey: 'nav.contact', sectionId: 'contact' },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.sectionId);

/** Seuil de scroll (px) au-delà duquel l'effet backdrop-blur est appliqué */
const SCROLL_THRESHOLD = 50;

// ---------------------------------------------------------------------------
// Variantes Framer Motion pour le menu mobile
// ---------------------------------------------------------------------------

const overlayVariants = {
  hidden:  { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0,   transition: { duration: 0.25, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.20, ease: 'easeIn'  } },
};

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export function Header() {
  const { t } = useI18nContext();

  // ── Scroll effect ─────────────────────────────────────────────────────
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    // Initialiser l'état dès le montage
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Scroll spy ────────────────────────────────────────────────────────
  const activeSection = useScrollSpy(SECTION_IDS);

  // ── Menu mobile ───────────────────────────────────────────────────────
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef      = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  // Fermeture sur touche Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen, closeMenu]);

  // Fermeture sur clic extérieur
  useEffect(() => {
    if (!isMenuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (
        menuRef.current      && !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isMenuOpen, closeMenu]);

  // Blocage du scroll body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // ── Focus trap ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;

    const FOCUSABLE_SELECTORS =
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const getFocusable = () =>
      Array.from(
        menuRef.current!.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
      ).filter((el) => !el.hasAttribute('aria-hidden'));

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', trapFocus);

    // Donner le focus au premier élément focusable du menu
    const focusable = getFocusable();
    if (focusable.length > 0) {
      // Petit délai pour laisser l'animation Framer Motion commencer
      const t = setTimeout(() => focusable[0].focus(), 50);
      return () => {
        document.removeEventListener('keydown', trapFocus);
        clearTimeout(t);
      };
    }

    return () => document.removeEventListener('keydown', trapFocus);
  }, [isMenuOpen]);

  // ── Smooth scroll ─────────────────────────────────────────────────────
  const scrollToSection = useCallback(
    (sectionId: string, closeMobileMenu = false) => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      if (closeMobileMenu) closeMenu();
    },
    [closeMenu]
  );

  // ── Render ────────────────────────────────────────────────────────────

  const headerClasses = [
    'sticky top-0 z-50',
    'w-full',
    'transition-all duration-300',
    isScrolled
      ? 'backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-sm'
      : 'bg-white dark:bg-gray-900',
  ].join(' ');

  return (
    <header className={headerClasses} role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
            aria-label="Solidarity Impact — Retour en haut de page"
          >
            <Image
              src="/logo.png"
              alt="Logo de l'association Solidarity Impact"
              width={48}
              height={48}
              priority
              className="h-10 w-auto"
            />
          </a>

          {/* ── Navigation desktop (≥ 768px) ── */}
          <nav
            aria-label="Navigation principale"
            className="hidden md:flex items-center gap-6"
          >
            {NAV_LINKS.map(({ labelKey, sectionId }) => {
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={sectionId}
                  href={`#${sectionId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sectionId);
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  className={[
                    'text-sm font-medium transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded',
                    isActive
                      ? 'text-primary-600 dark:text-primary-400 font-semibold underline underline-offset-4'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400',
                  ].join(' ')}
                >
                  {t(labelKey)}
                </a>
              );
            })}
          </nav>

          {/* ── Actions desktop : LanguageSwitcher + ThemeToggle ── */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* ── Bouton hamburger mobile (< 768px) ── */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            className={[
              'md:hidden inline-flex items-center justify-center',
              'w-10 h-10 rounded-md',
              'text-gray-700 dark:text-gray-300',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              'transition-colors duration-200',
            ].join(' ')}
          >
            <span className="sr-only">
              {isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            </span>
            {/* Icône hamburger / croix */}
            <span aria-hidden="true" className="block w-6 h-6 relative">
              <span
                className={[
                  'absolute left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-300 origin-center',
                  isMenuOpen
                    ? 'top-1/2 -translate-y-1/2 rotate-45'
                    : 'top-1',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-current rounded-full transition-all duration-300',
                  isMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-300 origin-center',
                  isMenuOpen
                    ? 'top-1/2 -translate-y-1/2 -rotate-45'
                    : 'bottom-1',
                ].join(' ')}
              />
            </span>
          </button>
        </div>
      </div>

      {/* ── Menu mobile overlay animé (< 768px) ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            aria-hidden={!isMenuOpen}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={[
              'md:hidden',
              'absolute top-full left-0 right-0',
              'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md',
              'shadow-lg border-t border-gray-100 dark:border-gray-800',
              'pb-4',
            ].join(' ')}
          >
            {/* Liens de navigation */}
            <nav
              aria-label="Navigation mobile"
              className="flex flex-col px-4 pt-3 gap-1"
            >
              {NAV_LINKS.map(({ labelKey, sectionId }) => {
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={sectionId}
                    href={`#${sectionId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(sectionId, true);
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className={[
                      'block px-3 py-2.5 rounded-md text-base font-medium',
                      'transition-colors duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                      isActive
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400',
                    ].join(' ')}
                  >
                    {t(labelKey)}
                  </a>
                );
              })}
            </nav>

            {/* Séparateur */}
            <div
              className="mx-4 mt-3 mb-3 border-t border-gray-100 dark:border-gray-800"
              aria-hidden="true"
            />

            {/* LanguageSwitcher + ThemeToggle */}
            <div className="flex items-center justify-between px-7">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;

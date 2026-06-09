'use client';

import { Navbar } from '@/components/layout/Navbar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { PageTransition } from '@/components/ui/PageTransition';
import { CursorSpotlight } from '@/components/ui/CursorSpotlight';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      {/* Barre de progression de lecture */}
      <ScrollProgressBar />

      {/* Halo cursor */}
      <CursorSpotlight />

      {/* Navbar fixe en haut */}
      <Navbar />

      {/* Contenu principal avec transition de page */}
      <main id="main-content" className="min-h-screen pt-16">
        <PageTransition>
          {children}
        </PageTransition>
      </main>

      {/* Footer */}
      <SiteFooter />

      {/* Bannière cookies */}
      <CookieBanner />
    </>
  );
}

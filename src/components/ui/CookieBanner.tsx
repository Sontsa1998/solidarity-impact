'use client';

import { useState, useEffect, useRef } from 'react';
import { useI18nContext } from '@/components/providers/I18nProvider';

const COOKIE_KEY = 'si_cookies_accepted';

export function CookieBanner() {
  const { lang } = useI18nContext();
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(COOKIE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => btnRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [visible]);

  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  function accept() {
    try { localStorage.setItem(COOKIE_KEY, '1'); } catch { /* silencieux */ }
    document.body.style.overflow = '';
    setVisible(false);
  }

  if (!visible) return null;

  const message = lang === 'en'
    ? 'We use cookies to offer you a better browsing experience, display advertisements, analyze site traffic and personalize content. By continuing to use this site, you consent to the use of cookies.'
    : "Nous utilisons des cookies pour vous offrir une meilleure expérience de navigation, afficher des publicités, analyser le trafic du site et personnaliser le contenu. En continuant à utiliser ce site, vous consentez à l'utilisation de cookies.";

  return (
    <>
      {/* Overlay bloquant */}
      <div aria-hidden="true"
        className="fixed inset-0 z-[9998] bg-[#24140E]/70 backdrop-blur-sm"
        style={{ pointerEvents: 'all' }} />

      {/* Modale */}
      <div role="dialog" aria-modal="true"
        aria-labelledby="cookie-title" aria-describedby="cookie-desc"
        className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4"
        style={{ pointerEvents: 'all' }}>

        <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-[#EBDDD4]">

          {/* En-tête — beige logo avec marron */}
          <div className="bg-[#FDF9F7] dark:bg-[#3A2219] px-6 py-5 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#6B3E2E] flex items-center justify-center text-2xl shadow-md">
              🍪
            </div>
            <div>
              <h2 id="cookie-title" className="text-lg font-bold text-[#24140E] dark:text-[#FDF9F7]">
                {lang === 'en' ? 'Cookie consent' : 'Paramètres de cookies'}
              </h2>
            </div>
          </div>

          {/* Corps — fond blanc */}
          <div className="bg-white dark:bg-[#24160F] px-6 py-5">
            <p id="cookie-desc" className="text-sm text-[#4A2B20] dark:text-[#D2B8AA] leading-relaxed">
              {message}
            </p>
            <div className="mt-3 flex items-center gap-4">
              <a href="/politique-confidentialite" target="_blank" rel="noopener noreferrer"
                className="text-xs text-[#6B3E2E] dark:text-[#D2B8AA] hover:underline">
                {lang === 'en' ? 'Privacy Policy' : 'Politique de confidentialité'}
              </a>
              <a href="/mentions-legales" target="_blank" rel="noopener noreferrer"
                className="text-xs text-[#6B3E2E] dark:text-[#D2B8AA] hover:underline">
                {lang === 'en' ? 'Legal Notice' : 'Mentions légales'}
              </a>
            </div>
          </div>

          {/* Pied — fond beige clair */}
          <div className="bg-[#FFFFFF] dark:bg-[#170D09] px-6 py-5 border-t border-[#EBDDD4] dark:border-[#3A2219]">
            <button ref={btnRef} type="button" onClick={accept}
              className="w-full bg-[#6B3E2E] hover:bg-[#5A3426] active:bg-[#4A2B20] text-[#FDF9F7] font-semibold text-sm py-3.5 px-6 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B3E2E] focus-visible:ring-offset-2">
              {lang === 'en' ? 'Accept & Continue →' : 'Accepter et continuer →'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

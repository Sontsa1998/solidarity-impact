'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useI18nContext } from '@/components/providers/I18nProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay, ease: 'easeOut' },
  }),
};

const itemReduced = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.2, delay: delay * 0.3 },
  }),
};

const chevronVariants = {
  animate: {
    y: [0, 10, 0],
    transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
  },
};

export function HeroSection() {
  const { lang } = useI18nContext();
  const reduced = useReducedMotion();
  const v = reduced ? itemReduced : itemVariants;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
      style={{ background: 'linear-gradient(135deg, #F5EFE6 0%, #fdf8f5 50%, #ede4d8 100%)' }}
    >
      {/* Cercles décoratifs marron/beige */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #7B3F2A 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #7B3F2A 0%, transparent 70%)' }} />
      </div>

      <div className="relative mx-auto max-w-4xl">

        {/* Badge */}
        <motion.div
          custom={0} variants={v} initial="hidden" animate="visible"
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium border"
          style={{ background: '#F5EFE6', borderColor: '#e8d5c4', color: '#7B3F2A' }}
        >
          <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: '#7B3F2A' }} aria-hidden="true" />
          {lang === 'en' ? 'Franco-Cameroonian Association — Law 1901' : 'Association franco-camerounaise — Loi 1901'}
        </motion.div>

        {/* Titre H1 */}
        <motion.h1
          id="hero-title"
          custom={0.15} variants={v} initial="hidden" animate="visible"
          className="font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
          style={{ color: '#2a1209' }}
        >
          SOLIDARITY<br />
          <span style={{ color: '#7B3F2A' }}>IMPACT</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          custom={0.3} variants={v} initial="hidden" animate="visible"
          className="mt-5 text-xl sm:text-2xl font-semibold"
          style={{ color: '#562a1c' }}
        >
          {lang === 'en' ? 'The future within reach' : "L'avenir à portée de main"}
        </motion.p>

        {/* Sous-titre */}
        <motion.p
          custom={0.45} variants={v} initial="hidden" animate="visible"
          className="mt-5 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: '#9a7060' }}
        >
          {lang === 'en'
            ? 'Franco-Cameroonian association committed to education, support for orphanages and local development in Cameroon, based in Villemomble.'
            : "Association franco-camerounaise engagée pour l'éducation, l'aide aux orphelinats et le développement local au Cameroun, depuis Villemomble."}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.6} variants={v} initial="hidden" animate="visible"
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* CTA primaire — marron plein */}
          <Link
            href="/don"
            className="inline-flex items-center gap-2 rounded-xl font-semibold text-base px-8 py-3.5 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: '#7B3F2A',
              color: '#F5EFE6',
              // @ts-expect-error css var
              '--tw-ring-color': '#7B3F2A',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#6a3423')}
            onMouseLeave={e => (e.currentTarget.style.background = '#7B3F2A')}
          >
            <span>❤️</span>
            {lang === 'en' ? 'Make a donation' : 'Faire un don'}
          </Link>

          {/* CTA secondaire — contour marron */}
          <Link
            href="/a-propos"
            className="inline-flex items-center gap-2 rounded-xl font-semibold text-base px-8 py-3.5 border-2 bg-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ borderColor: '#7B3F2A', color: '#7B3F2A' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F5EFE6'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            {lang === 'en' ? 'Learn more' : 'En savoir plus'}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={0.75} variants={v} initial="hidden" animate="visible"
          className="mt-16 grid grid-cols-3 gap-6 sm:gap-10"
        >
          {[
            { value: '2025', labelFr: 'Fondée en',        labelEn: 'Founded in'   },
            { value: '9',    labelFr: 'Fondateurs',       labelEn: 'Founders'     },
            { value: '3',    labelFr: "Domaines d'action", labelEn: 'Action areas' },
          ].map(({ value, labelFr, labelEn }) => (
            <div key={value} className="flex flex-col items-center gap-1">
              <span className="text-2xl sm:text-3xl font-bold" style={{ color: '#7B3F2A' }}>{value}</span>
              <span className="text-xs sm:text-sm text-center" style={{ color: '#9a7060' }}>
                {lang === 'en' ? labelEn : labelFr}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Chevron bas de page */}
      {!reduced && (
        <motion.div
          variants={chevronVariants} animate="animate"
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ color: '#d4ae92' }}
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      )}
    </section>
  );
}

export default HeroSection;

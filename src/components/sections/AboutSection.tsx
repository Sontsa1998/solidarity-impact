'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { useI18nContext } from '@/components/providers/I18nProvider';

// ── Palette brand ─────────────────────────────────────────────────────────────
const B = '#7B3F2A';
const BEIGE = '#F5EFE6';
const BEIGE_LIGHT = '#fdf8f5';
const BORDER = '#e8d5c4';

function IconBrand({ children }: { children: React.ReactNode }) {
  return <span style={{ color: B }}>{children}</span>;
}

function IconSolidarity() {
  return <svg aria-hidden="true" focusable="false" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: B }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function IconImpact() {
  return <svg aria-hidden="true" focusable="false" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: B }}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
}
function IconGlobe() {
  return <svg aria-hidden="true" focusable="false" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: B }}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}
function IconScale() {
  return <svg aria-hidden="true" focusable="false" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: B }}><line x1="12" y1="3" x2="12" y2="21"/><path d="M3 9l9-7 9 7"/><path d="M3 15h18"/><path d="M3 9h4l2 6H1l2-6z"/><path d="M17 9h4l2 6h-8l2-6z"/></svg>;
}
function IconFlag() {
  return <svg aria-hidden="true" focusable="false" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: B }}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>;
}

const VALUE_ICONS = [
  <IconSolidarity key="s" />,
  <IconImpact key="i" />,
  <IconGlobe key="g" />,
  <IconScale key="sc" />,
  <IconFlag key="f" />,
];

export function AboutSection() {
  const { t } = useI18nContext();
  const values = [0, 1, 2, 3, 4].map(i => t(`about.values.${i}`));

  return (
    <section id="about" aria-labelledby="about-title"
      className="py-20" style={{ background: BEIGE }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* En-tête */}
        <AnimatedSection animation="fadeIn" threshold={0.3} className="text-center mb-16">
          <h2 id="about-title" className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#2a1209' }}>
            {t('about.sectionTitle')}
          </h2>
          <div aria-hidden="true" className="mx-auto w-16 h-1 rounded-full" style={{ background: B }} />
        </AnimatedSection>

        {/* Grille */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Colonne gauche */}
          <AnimatedSection animation="slideInLeft" threshold={0.5} className="space-y-10">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#2a1209' }}>
                {t('about.missionTitle')}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#562a1c' }}>
                {t('about.missionText')}
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: '#2a1209' }}>
                {t('about.valuesTitle')}
              </h3>
              <ul className="space-y-3" aria-label={t('about.valuesTitle')}>
                {values.map((value, index) => (
                  <li key={value} className="flex items-center gap-4 p-3 rounded-xl border"
                    style={{ background: BEIGE_LIGHT, borderColor: BORDER }}>
                    <span className="flex-shrink-0">{VALUE_ICONS[index]}</span>
                    <span className="text-base font-medium" style={{ color: '#3d2318' }}>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Colonne droite */}
          <AnimatedSection animation="slideInRight" threshold={0.5} className="space-y-8">
            {/* Carte fondation */}
            <div className="rounded-2xl p-8 shadow-sm border" style={{ background: BEIGE_LIGHT, borderColor: BORDER }}>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: '#2a1209' }}>
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: B }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Fondation
              </h3>
              <dl className="space-y-4">
                {[
                  { key: 'Date',  val: t('about.foundedDate')  },
                  { key: 'Lieu',  val: t('about.foundedPlace') },
                ].map(({ key, val }) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <dt className="text-sm font-semibold uppercase tracking-wide min-w-[5rem]" style={{ color: '#9a7060' }}>{key}</dt>
                    <dd className="text-base font-medium" style={{ color: '#2a1209' }}>{val}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Carte légale */}
            <div className="rounded-2xl p-8 shadow-sm border" style={{ background: '#fff', borderColor: BORDER }}>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#2a1209' }}>
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#c4622e' }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Informations légales
              </h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#562a1c' }}>
                {t('about.legalInfo')}
              </p>
            </div>

            {/* Bande décorative */}
            <div aria-hidden="true" className="rounded-2xl overflow-hidden h-3 flex">
              <div className="flex-1" style={{ background: '#1d4ed8' }} />
              <div className="flex-1 bg-white" />
              <div className="flex-1" style={{ background: '#dc2626' }} />
              <div className="flex-1" style={{ background: '#16a34a' }} />
              <div className="flex-1" style={{ background: '#dc2626' }} />
              <div className="flex-1" style={{ background: '#fbbf24' }} />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { DonationForm } from '@/components/ui/DonationForm';
import { useI18nContext } from '@/components/providers/I18nProvider';

const IMPACT_ICONS = ['📚', '🏠', '🌍'] as const;
const IMPACT_ITEM_COUNT = 3;

export function DonationSection() {
  const { t } = useI18nContext();
  const impactItems = Array.from({ length: IMPACT_ITEM_COUNT }, (_, i) => t(`donation.impactItems.${i}`));

  return (
    <section id="donate" aria-labelledby="donation-title"
      className="py-20"
      style={{ background: 'linear-gradient(to bottom, #F5EFE6, #fdf8f5)' }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp" threshold={0.1}>

          {/* En-tête */}
          <div className="mb-12 text-center">
            <h2 id="donation-title" className="mb-3 text-3xl sm:text-4xl font-bold" style={{ color: '#2a1209' }}>
              {t('donation.sectionTitle')}
            </h2>
            <div aria-hidden="true" className="mx-auto w-16 h-1 rounded-full mb-4" style={{ background: '#7B3F2A' }} />
            <p className="mx-auto max-w-2xl text-lg" style={{ color: '#9a7060' }}>
              {t('donation.description')}
            </p>
          </div>

          {/* Corps */}
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Impacts */}
            <div>
              <h3 className="mb-6 text-xl font-semibold" style={{ color: '#2a1209' }}>
                {t('donation.impactTitle')}
              </h3>
              <ul className="space-y-4" aria-label={t('donation.impactTitle')}>
                {impactItems.map((item, index) => (
                  <li key={item} className="flex items-start gap-4 rounded-2xl p-5 shadow-sm border"
                    style={{ background: '#fff', borderColor: '#e8d5c4' }}>
                    <span className="flex-shrink-0 text-2xl" aria-hidden="true">
                      {IMPACT_ICONS[index as 0 | 1 | 2] ?? '✅'}
                    </span>
                    <span className="leading-relaxed" style={{ color: '#562a1c' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formulaire */}
            <div className="rounded-2xl p-6 shadow-md border" style={{ background: '#fff', borderColor: '#e8d5c4' }}>
              <DonationForm />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

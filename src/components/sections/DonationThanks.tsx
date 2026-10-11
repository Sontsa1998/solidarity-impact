'use client';

import Link from 'next/link';
import { useI18nContext } from '@/components/providers/I18nProvider';

const B = '#6B3E2E';
const BEIGE = '#FDF9F7';
const BORDER = '#EBDDD4';

interface DonationThanksProps {
  /** Paiement confirmé par le prestataire */
  paid: boolean;
  amountCents: number | null;
}

export function DonationThanks({ paid, amountCents }: DonationThanksProps) {
  const { t, lang } = useI18nContext();
  const amount = amountCents !== null && amountCents > 0
    ? new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'fr-FR', { style: 'currency', currency: 'EUR' }).format(amountCents / 100)
    : null;

  return (
    <section aria-labelledby="thanks-title" className="py-24"
      style={{ background: 'linear-gradient(to bottom, #FDF9F7, #FFFFFF)', minHeight: '70vh' }}>
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <div role="status" className="rounded-2xl border p-8 sm:p-10 text-center shadow-md"
          style={{ background: '#fff', borderColor: BORDER }}>
          <div className="text-5xl mb-5" aria-hidden="true">{paid ? '🎉' : '⏳'}</div>
          <h1 id="thanks-title" className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#24140E' }}>
            {t(paid ? 'donation.thanksTitle' : 'donation.pendingTitle')}
          </h1>

          {paid && amount && (
            <p className="mb-5 inline-block rounded-xl px-5 py-3" style={{ background: '#FBF4EF' }}>
              <span className="block text-sm" style={{ color: '#86655A' }}>{t('donation.thanksAmount')}</span>
              <span className="block text-2xl font-bold" style={{ color: B }}>{amount}</span>
            </p>
          )}

          <p className="leading-relaxed mb-8" style={{ color: '#4A2B20' }}>
            {t(paid ? 'donation.thanksMessage' : 'donation.pendingMessage')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="rounded-xl px-6 py-3 font-semibold"
              style={{ background: B, color: BEIGE }}>
              {t('donation.backHome')}
            </Link>
            <Link href="/don" className="rounded-xl border-2 px-6 py-3 font-semibold"
              style={{ borderColor: BORDER, color: B }}>
              {t('donation.backToDonation')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

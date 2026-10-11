'use client';

import { useEffect, useState } from 'react';
import { validateDonationAmount } from '@/lib/donation';
import { useI18nContext } from '@/components/providers/I18nProvider';
import { siteConfig } from '@/content/config';

type Provider = 'stripe' | 'paypal';

interface DonationState {
  selectedPreset: number | null;
  customAmount: string;
  isCustom: boolean;
  error: string | null;
  /** Étape 2 : montant validé, choix du mode de paiement */
  step: 'amount' | 'payment';
  /** Prestataire en cours de redirection */
  pending: Provider | null;
  paymentError: string | null;
}

const B = '#6B3E2E';
const BEIGE = '#FDF9F7';
const BORDER = '#EBDDD4';

function formatEuros(amount: number, lang: string) {
  return new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'fr-FR', {
    style: 'currency', currency: 'EUR', maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}

function CardIcon() {
  return (
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /><line x1="6" y1="15" x2="10" y2="15" />
    </svg>
  );
}

function PayPalIcon() {
  return (
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24">
      <path fill="#003087" d="M7.1 21.3H3.6a.5.5 0 0 1-.5-.6L5.9 3.1A.9.9 0 0 1 6.8 2.4h6.6c3.1 0 5 1.6 4.6 4.6-.5 3.6-2.9 5.4-6.3 5.4H9.4a.9.9 0 0 0-.9.7z" />
      <path fill="#009CDE" d="M19.3 7.4c-.6 3.6-3 5.6-6.5 5.6h-1.6a.9.9 0 0 0-.9.7l-1 6.4-.3 1.7a.5.5 0 0 0 .5.6h3a.8.8 0 0 0 .8-.7l.6-3.8a.8.8 0 0 1 .8-.7h.5c3 0 5.1-1.2 5.8-4.8.3-1.7.1-3.1-.9-4.1z" />
    </svg>
  );
}

export function DonationForm() {
  const { t, lang } = useI18nContext();
  const [state, setState] = useState<DonationState>({
    selectedPreset: null, customAmount: '', isCustom: false, error: null,
    step: 'amount', pending: null, paymentError: null,
  });

  // Retour depuis Stripe/PayPal après annulation (?statut=annule) ou échec (?statut=erreur)
  useEffect(() => {
    const statut = new URLSearchParams(window.location.search).get('statut');
    if (statut === 'annule' || statut === 'erreur') {
      setState(p => ({ ...p, paymentError: t(statut === 'annule' ? 'donation.cancelledMessage' : 'donation.failedMessage') }));
    }
    // Retour arrière du navigateur depuis la page de paiement : la page peut être
    // restaurée depuis le cache (bfcache) avec le bouton encore « en cours ».
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setState(p => ({ ...p, pending: null }));
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, [t]);

  const amount = state.isCustom ? Number.parseFloat(state.customAmount) : state.selectedPreset;

  function isEnabled() {
    return state.isCustom ? validateDonationAmount(state.customAmount).valid : state.selectedPreset !== null;
  }

  function handlePreset(value: number) {
    setState(p => ({ ...p, selectedPreset: value, customAmount: '', isCustom: false, error: null, paymentError: null }));
  }

  function handleCustomSelect() {
    setState(p => ({ ...p, selectedPreset: null, isCustom: true, error: null, paymentError: null }));
  }

  function handleCustomChange(value: string) {
    const v = validateDonationAmount(value);
    setState(p => ({ ...p, customAmount: value, error: value.length > 0 && !v.valid ? t('donation.errorInvalidAmount') : null }));
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (!isEnabled()) return;
    setState(p => ({ ...p, step: 'payment', paymentError: null }));
  }

  async function handlePay(provider: Provider) {
    if (state.pending || amount === null || !isEnabled()) return;
    setState(p => ({ ...p, pending: provider, paymentError: null }));
    try {
      const res = await fetch(`/api/donation/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || typeof data.url !== 'string') throw new Error(data.error);
      // Ouvre la page de paiement sécurisée du prestataire
      window.location.assign(data.url);
    } catch {
      setState(p => ({ ...p, pending: null, paymentError: t('donation.errorPayment') }));
    }
  }

  const paymentAlert = state.paymentError && (
    <div role="alert" className="mb-6 rounded-xl border px-4 py-3 text-sm"
      style={{ background: '#FEF2F2', borderColor: '#FCA5A5', color: '#991B1B' }}>
      {state.paymentError}
    </div>
  );

  // ── Étape 2 : choix du mode de paiement ──────────────────────────────────
  if (state.step === 'payment' && amount !== null) {
    const methods: { id: Provider; label: string; hint: string; icon: React.ReactNode }[] = [
      { id: 'stripe', label: t('donation.payWithCard'),   hint: t('donation.payWithCardHint'),   icon: <CardIcon /> },
      { id: 'paypal', label: t('donation.payWithPaypal'), hint: t('donation.payWithPaypalHint'), icon: <PayPalIcon /> },
    ];

    return (
      <div aria-label={t('donation.paymentTitle')}>
        {paymentAlert}

        <div className="mb-6 flex items-center justify-between gap-4 rounded-xl px-5 py-4"
          style={{ background: '#FBF4EF', border: `1px solid ${BORDER}` }}>
          <div>
            <p className="text-sm font-medium" style={{ color: '#86655A' }}>{t('donation.amountLabel')}</p>
            <p className="text-2xl font-bold" style={{ color: B }}>{formatEuros(amount, lang)}</p>
          </div>
          <button type="button" disabled={state.pending !== null}
            onClick={() => setState(p => ({ ...p, step: 'amount', paymentError: null }))}
            className="text-sm font-semibold underline underline-offset-4 disabled:opacity-50"
            style={{ color: B }}>
            {t('donation.changeAmount')}
          </button>
        </div>

        <h3 className="mb-3 text-sm font-semibold" style={{ color: '#24140E' }}>
          {t('donation.paymentTitle')}
        </h3>

        <div className="flex flex-col gap-3">
          {methods.map(m => {
            const busy = state.pending === m.id;
            return (
              <button key={m.id} type="button" onClick={() => handlePay(m.id)}
                disabled={state.pending !== null} aria-busy={busy}
                className="flex w-full items-center gap-4 rounded-xl border-2 px-5 py-4 text-left transition-all duration-200 disabled:cursor-wait"
                style={{
                  borderColor: busy ? B : BORDER,
                  background: '#fff',
                  color: '#24140E',
                  opacity: state.pending !== null && !busy ? 0.5 : 1,
                }}
                onMouseEnter={e => { if (!state.pending) e.currentTarget.style.borderColor = B; }}
                onMouseLeave={e => { if (!state.pending) e.currentTarget.style.borderColor = BORDER; }}
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
                  style={{ background: BEIGE, color: B }}>
                  {m.icon}
                </span>
                <span className="flex-1">
                  <span className="block text-base font-bold">{m.label}</span>
                  <span className="block text-sm" style={{ color: '#86655A' }}>
                    {busy ? t('donation.redirecting') : m.hint}
                  </span>
                </span>
                <span aria-hidden="true" className="text-xl" style={{ color: B }}>{busy ? '…' : '→'}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-relaxed" style={{ color: '#86655A' }}>
          {t('donation.securePayment')}
        </p>
      </div>
    );
  }

  // ── Étape 1 : choix du montant ───────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate aria-label={t('donation.sectionTitle')}>
      {paymentAlert}

      {/* Presets */}
      <fieldset className="mb-6">
        <legend className="mb-3 text-sm font-semibold" style={{ color: '#24140E' }}>
          {t('donation.presetLabel')}
        </legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {siteConfig.donationPresets.map((preset) => {
            const sel = !state.isCustom && state.selectedPreset === preset;
            return (
              <button key={preset} type="button" onClick={() => handlePreset(preset)}
                aria-pressed={sel}
                className="rounded-xl border-2 px-4 py-3 text-base font-semibold transition-all duration-200"
                style={sel
                  ? { borderColor: B, background: B, color: BEIGE }
                  : { borderColor: BORDER, background: '#fff', color: '#3A2219' }}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.borderColor = B; }}
                onMouseLeave={e => { if (!sel) e.currentTarget.style.borderColor = BORDER; }}
              >
                {preset}&nbsp;€
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Montant libre */}
      <div className="mb-6">
        <button type="button" onClick={handleCustomSelect} aria-pressed={state.isCustom}
          className="rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-all duration-200 mb-3"
          style={state.isCustom
            ? { borderColor: B, background: B, color: BEIGE }
            : { borderColor: BORDER, background: '#fff', color: '#3A2219' }}>
          {t('donation.customLabel')}
        </button>

        {state.isCustom && (
          <div>
            <label htmlFor="donation-custom-amount" className="sr-only">{t('donation.customLabel')}</label>
            <div className="relative">
              <input
                id="donation-custom-amount" type="number" inputMode="decimal" min="1" max="10000" step="1"
                value={state.customAmount} onChange={e => handleCustomChange(e.target.value)}
                placeholder={t('donation.customPlaceholder')}
                aria-required="true"
                aria-describedby={state.error ? 'donation-error' : undefined}
                aria-invalid={state.error !== null}
                className="w-full rounded-xl border-2 px-4 py-3 pr-12 transition-colors duration-200"
                style={{
                  background: '#fff', color: '#24140E',
                  borderColor: state.error ? '#dc2626' : BORDER,
                  outline: 'none',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = B; }}
                onBlur={e => { e.currentTarget.style.borderColor = state.error ? '#dc2626' : BORDER; }}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-medium"
                style={{ color: '#86655A' }} aria-hidden="true">€</span>
            </div>
            {state.error && (
              <span id="donation-error" role="alert" className="mt-2 block text-sm" style={{ color: '#dc2626' }}>
                {state.error}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bouton */}
      <button type="submit" disabled={!isEnabled()} aria-disabled={!isEnabled()}
        className="w-full rounded-xl px-6 py-4 text-base font-bold transition-all duration-200"
        style={isEnabled()
          ? { background: B, color: BEIGE, cursor: 'pointer', boxShadow: '0 4px 12px rgba(107,62,46,0.25)' }
          : { background: '#EBDDD4', color: '#86655A', cursor: 'not-allowed' }}
        onMouseEnter={e => { if (isEnabled()) e.currentTarget.style.background = '#5A3426'; }}
        onMouseLeave={e => { if (isEnabled()) e.currentTarget.style.background = B; }}
      >
        {t('donation.buttonText')}
        {isEnabled() && amount !== null && <> — {formatEuros(amount, lang)}</>}
      </button>
    </form>
  );
}

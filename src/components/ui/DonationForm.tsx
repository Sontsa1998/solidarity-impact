'use client';

import { useState } from 'react';
import { validateDonationAmount } from '@/lib/donation';
import { useI18nContext } from '@/components/providers/I18nProvider';
import { siteConfig } from '@/content/config';

interface DonationState {
  selectedPreset: number | null;
  customAmount: string;
  isCustom: boolean;
  error: string | null;
  isSubmitted: boolean;
}

const B = '#7B3F2A';
const BEIGE = '#F5EFE6';
const BORDER = '#e8d5c4';

export function DonationForm() {
  const { t } = useI18nContext();
  const [state, setState] = useState<DonationState>({
    selectedPreset: null, customAmount: '', isCustom: false, error: null, isSubmitted: false,
  });

  function isEnabled() {
    return state.isCustom ? validateDonationAmount(state.customAmount).valid : state.selectedPreset !== null;
  }

  function handlePreset(amount: number) {
    setState({ selectedPreset: amount, customAmount: '', isCustom: false, error: null, isSubmitted: false });
  }

  function handleCustomSelect() {
    setState(p => ({ ...p, selectedPreset: null, isCustom: true, error: null }));
  }

  function handleCustomChange(value: string) {
    const v = validateDonationAmount(value);
    setState(p => ({ ...p, customAmount: value, error: value.length > 0 && !v.valid ? t('donation.errorInvalidAmount') : null }));
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (!isEnabled()) return;
    setState(p => ({ ...p, isSubmitted: true }));
  }

  if (state.isSubmitted) {
    return (
      <div role="status" aria-live="polite"
        className="rounded-2xl border p-8 text-center"
        style={{ background: '#fdf5f0', borderColor: BORDER }}>
        <div className="text-4xl mb-4" aria-hidden="true">🎉</div>
        <p className="text-lg font-semibold" style={{ color: B }}>
          {t('donation.successMessage')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label={t('donation.sectionTitle')}>
      {/* Avertissement */}
      <div role="alert" className="mb-6 rounded-xl border px-4 py-3 text-sm"
        style={{ background: '#fef9f0', borderColor: '#f5c842', color: '#7a5c00' }}>
        {t('donation.mockWarning')}
      </div>

      {/* Presets */}
      <fieldset className="mb-6">
        <legend className="mb-3 text-sm font-semibold" style={{ color: '#2a1209' }}>
          {t('donation.presetLabel')}
        </legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {siteConfig.donationPresets.map((amount) => {
            const sel = !state.isCustom && state.selectedPreset === amount;
            return (
              <button key={amount} type="button" onClick={() => handlePreset(amount)}
                aria-pressed={sel}
                className="rounded-xl border-2 px-4 py-3 text-base font-semibold transition-all duration-200"
                style={sel
                  ? { borderColor: B, background: B, color: BEIGE }
                  : { borderColor: BORDER, background: '#fff', color: '#3d2318' }}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.borderColor = B; }}
                onMouseLeave={e => { if (!sel) e.currentTarget.style.borderColor = BORDER; }}
              >
                {amount}&nbsp;€
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
            : { borderColor: BORDER, background: '#fff', color: '#3d2318' }}>
          {t('donation.customLabel')}
        </button>

        {state.isCustom && (
          <div>
            <label htmlFor="donation-custom-amount" className="sr-only">{t('donation.customLabel')}</label>
            <div className="relative">
              <input
                id="donation-custom-amount" type="number" inputMode="decimal" min="1" step="1"
                value={state.customAmount} onChange={e => handleCustomChange(e.target.value)}
                placeholder={t('donation.customPlaceholder')}
                aria-required="true"
                aria-describedby={state.error ? 'donation-error' : undefined}
                aria-invalid={state.error !== null}
                className="w-full rounded-xl border-2 px-4 py-3 pr-12 transition-colors duration-200"
                style={{
                  background: '#fff', color: '#2a1209',
                  borderColor: state.error ? '#dc2626' : BORDER,
                  outline: 'none',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = B; }}
                onBlur={e => { e.currentTarget.style.borderColor = state.error ? '#dc2626' : BORDER; }}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-medium"
                style={{ color: '#9a7060' }} aria-hidden="true">€</span>
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
          ? { background: B, color: BEIGE, cursor: 'pointer', boxShadow: '0 4px 12px rgba(123,63,42,0.25)' }
          : { background: '#e8d5c4', color: '#9a7060', cursor: 'not-allowed' }}
        onMouseEnter={e => { if (isEnabled()) e.currentTarget.style.background = '#6a3423'; }}
        onMouseLeave={e => { if (isEnabled()) e.currentTarget.style.background = B; }}
      >
        {t('donation.buttonText')}
      </button>
    </form>
  );
}

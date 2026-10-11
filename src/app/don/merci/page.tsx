import type { Metadata } from 'next';
import { getPayPalDonation, getStripeDonation } from '@/lib/payments';
import { DonationThanks } from '@/components/sections/DonationThanks';

export const metadata: Metadata = {
  title: 'Merci pour votre don — Solidarity Impact',
  robots: { index: false },
};

/**
 * Page de retour après paiement. Le statut est vérifié côté serveur auprès
 * du prestataire (on ne se fie jamais aux paramètres de l'URL).
 */
export default async function DonationThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { provider, id } = await searchParams;
  let result: { paid: boolean; amountCents: number } | null = null;

  if (typeof id === 'string') {
    try {
      if (provider === 'stripe') result = await getStripeDonation(id);
      else if (provider === 'paypal') result = await getPayPalDonation(id);
    } catch (err) {
      console.error('[don/merci]', err);
    }
  }

  return <DonationThanks paid={result?.paid ?? false} amountCents={result?.amountCents ?? null} />;
}

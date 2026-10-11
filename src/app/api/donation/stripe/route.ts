import { createStripeCheckout, getSiteUrl, parseDonationAmount, PaymentError } from '@/lib/payments';

/** POST /api/donation/stripe — { amount, lang } → { url } de la page de paiement Stripe. */
export async function POST(request: Request) {
  try {
    const { amount, lang } = await request.json();
    const url = await createStripeCheckout(parseDonationAmount(amount), getSiteUrl(request), lang === 'en' ? 'en' : 'fr');
    return Response.json({ url });
  } catch (err) {
    const status = err instanceof PaymentError ? err.status : 500;
    const message = err instanceof PaymentError ? err.message : 'Erreur inattendue.';
    if (!(err instanceof PaymentError)) console.error('[stripe]', err);
    return Response.json({ error: message }, { status });
  }
}

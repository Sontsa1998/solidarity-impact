import { createPayPalOrder, getSiteUrl, parseDonationAmount, PaymentError } from '@/lib/payments';

/** POST /api/donation/paypal — { amount, lang } → { url } de validation PayPal. */
export async function POST(request: Request) {
  try {
    const { amount, lang } = await request.json();
    const url = await createPayPalOrder(parseDonationAmount(amount), getSiteUrl(request), lang === 'en' ? 'en' : 'fr');
    return Response.json({ url });
  } catch (err) {
    const status = err instanceof PaymentError ? err.status : 500;
    const message = err instanceof PaymentError ? err.message : 'Erreur inattendue.';
    if (!(err instanceof PaymentError)) console.error('[paypal]', err);
    return Response.json({ error: message }, { status });
  }
}

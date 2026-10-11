import { capturePayPalOrder, getSiteUrl } from '@/lib/payments';

/**
 * GET /api/donation/paypal/capture?token=<orderId>&PayerID=…
 *
 * URL de retour PayPal : le donateur vient de valider son paiement,
 * on encaisse la commande puis on le redirige vers la page de remerciement.
 */
export async function GET(request: Request) {
  const siteUrl = getSiteUrl(request);
  const orderId = new URL(request.url).searchParams.get('token') ?? '';
  try {
    if (await capturePayPalOrder(orderId)) {
      return Response.redirect(`${siteUrl}/don/merci?provider=paypal&id=${encodeURIComponent(orderId)}`, 303);
    }
  } catch (err) {
    console.error('[paypal] capture', err);
  }
  return Response.redirect(`${siteUrl}/don?statut=erreur`, 303);
}

/**
 * payments.ts — Intégration serveur Stripe Checkout et PayPal Checkout (Orders v2).
 *
 * ⚠️ Ce module lit des clés secrètes : il ne doit être importé que depuis
 * des Route Handlers ou des Server Components, jamais depuis un composant client.
 *
 * Les deux prestataires sont appelés via leur API REST (fetch) : aucune
 * dépendance npm supplémentaire n'est nécessaire.
 *
 * Variables d'environnement (voir PAIEMENTS.md) :
 *   STRIPE_SECRET_KEY       — clé secrète Stripe (sk_test_… ou sk_live_…)
 *   PAYPAL_CLIENT_ID        — identifiant de l'application REST PayPal
 *   PAYPAL_CLIENT_SECRET    — secret de l'application REST PayPal
 *   PAYPAL_ENV              — "sandbox" (défaut) ou "live"
 *   NEXT_PUBLIC_SITE_URL    — URL publique du site (ex. https://solidarityimpact.org)
 */

export const MIN_DONATION_EUR = 1;
export const MAX_DONATION_EUR = 10_000;
const CURRENCY = 'EUR';
const DONATION_LABEL = 'Don à Solidarity Impact';

export class PaymentError extends Error {
  constructor(message: string, readonly status = 500) {
    super(message);
  }
}

/** Valide un montant reçu du client et le convertit en centimes. */
export function parseDonationAmount(raw: unknown): number {
  const value = typeof raw === 'string' ? Number.parseFloat(raw) : raw;
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new PaymentError('Montant invalide.', 400);
  }
  if (value < MIN_DONATION_EUR || value > MAX_DONATION_EUR) {
    throw new PaymentError(`Le montant doit être compris entre ${MIN_DONATION_EUR} € et ${MAX_DONATION_EUR.toLocaleString('fr-FR')} €.`, 400);
  }
  return Math.round(value * 100);
}

/** URL publique du site, utilisée pour les redirections de retour des prestataires. */
export function getSiteUrl(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/+$/, '');
  return new URL(request.url).origin;
}

function centsToString(cents: number): string {
  return (cents / 100).toFixed(2);
}

// ---------------------------------------------------------------------------
// Stripe Checkout
// ---------------------------------------------------------------------------

const STRIPE_API = 'https://api.stripe.com/v1';

function stripeKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new PaymentError('Le paiement par carte (Stripe) n\'est pas encore configuré.', 503);
  return key;
}

async function stripeRequest<T>(path: string, init: { method?: string; body?: URLSearchParams } = {}): Promise<T> {
  const res = await fetch(`${STRIPE_API}${path}`, {
    method: init.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${stripeKey()}`,
      ...(init.body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
    },
    body: init.body,
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) {
    console.error('[stripe]', res.status, data?.error?.message);
    throw new PaymentError('Erreur lors de la communication avec Stripe.', 502);
  }
  return data as T;
}

/** Crée une session Stripe Checkout et renvoie l'URL de la page de paiement hébergée par Stripe. */
export async function createStripeCheckout(amountCents: number, siteUrl: string, lang: 'fr' | 'en'): Promise<string> {
  const body = new URLSearchParams({
    mode: 'payment',
    submit_type: 'donate',
    locale: lang,
    'line_items[0][quantity]': '1',
    'line_items[0][price_data][currency]': CURRENCY.toLowerCase(),
    'line_items[0][price_data][unit_amount]': String(amountCents),
    'line_items[0][price_data][product_data][name]': DONATION_LABEL,
    'metadata[type]': 'don',
    success_url: `${siteUrl}/don/merci?provider=stripe&id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/don?statut=annule`,
  });
  const session = await stripeRequest<{ url: string }>('/checkout/sessions', { method: 'POST', body });
  return session.url;
}

/** Vérifie qu'une session Stripe Checkout a bien été payée. */
export async function getStripeDonation(sessionId: string): Promise<{ paid: boolean; amountCents: number }> {
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) throw new PaymentError('Session inconnue.', 400);
  const session = await stripeRequest<{ payment_status: string; amount_total: number }>(
    `/checkout/sessions/${sessionId}`,
  );
  return { paid: session.payment_status === 'paid', amountCents: session.amount_total };
}

// ---------------------------------------------------------------------------
// PayPal Checkout (Orders v2)
// ---------------------------------------------------------------------------

function paypalApi(): string {
  return process.env.PAYPAL_ENV === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
}

async function paypalToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) throw new PaymentError('Le paiement PayPal n\'est pas encore configuré.', 503);

  const res = await fetch(`${paypalApi()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) {
    console.error('[paypal] auth', res.status, data?.error_description);
    throw new PaymentError('Erreur lors de la communication avec PayPal.', 502);
  }
  return data.access_token as string;
}

interface PayPalOrder {
  id: string;
  status: string;
  links?: { rel: string; href: string }[];
  purchase_units?: {
    amount?: { value: string };
    payments?: { captures?: { status: string; amount: { value: string } }[] };
  }[];
  details?: { issue: string }[];
}

async function paypalRequest(path: string, init: { method?: string; body?: unknown; requestId?: string } = {}) {
  const res = await fetch(`${paypalApi()}${path}`, {
    method: init.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${await paypalToken()}`,
      'Content-Type': 'application/json',
      ...(init.requestId ? { 'PayPal-Request-Id': init.requestId } : {}),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: 'no-store',
  });
  return { ok: res.ok, status: res.status, data: (await res.json()) as PayPalOrder };
}

/** Crée une commande PayPal et renvoie l'URL où le donateur valide son paiement. */
export async function createPayPalOrder(amountCents: number, siteUrl: string, lang: 'fr' | 'en'): Promise<string> {
  const { ok, status, data } = await paypalRequest('/v2/checkout/orders', {
    method: 'POST',
    body: {
      intent: 'CAPTURE',
      purchase_units: [{
        description: DONATION_LABEL,
        amount: { currency_code: CURRENCY, value: centsToString(amountCents) },
      }],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name: 'Solidarity Impact',
            locale: lang === 'en' ? 'en-GB' : 'fr-FR',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            return_url: `${siteUrl}/api/donation/paypal/capture`,
            cancel_url: `${siteUrl}/don?statut=annule`,
          },
        },
      },
    },
  });
  const approveUrl = data.links?.find(l => l.rel === 'payer-action' || l.rel === 'approve')?.href;
  if (!ok || !approveUrl) {
    console.error('[paypal] create order', status, data?.details);
    throw new PaymentError('Erreur lors de la création du paiement PayPal.', 502);
  }
  return approveUrl;
}

/** Encaisse une commande PayPal validée par le donateur (idempotent). */
export async function capturePayPalOrder(orderId: string): Promise<boolean> {
  if (!/^[A-Z0-9]+$/.test(orderId)) throw new PaymentError('Commande inconnue.', 400);
  const { ok, data } = await paypalRequest(`/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    requestId: `capture-${orderId}`,
  });
  if (ok) return true;
  // Rafraîchissement de la page de retour : la commande a déjà été encaissée.
  if (data.details?.some(d => d.issue === 'ORDER_ALREADY_CAPTURED')) return true;
  console.error('[paypal] capture', orderId, data?.details);
  return false;
}

/** Vérifie qu'une commande PayPal a bien été encaissée. */
export async function getPayPalDonation(orderId: string): Promise<{ paid: boolean; amountCents: number }> {
  if (!/^[A-Z0-9]+$/.test(orderId)) throw new PaymentError('Commande inconnue.', 400);
  const { ok, data } = await paypalRequest(`/v2/checkout/orders/${orderId}`);
  if (!ok) throw new PaymentError('Commande introuvable.', 404);
  const capture = data.purchase_units?.[0]?.payments?.captures?.[0];
  const value = capture?.amount.value ?? data.purchase_units?.[0]?.amount?.value ?? '0';
  return {
    paid: data.status === 'COMPLETED' && capture?.status === 'COMPLETED',
    amountCents: Math.round(Number.parseFloat(value) * 100),
  };
}

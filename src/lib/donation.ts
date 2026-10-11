/**
 * Donation utility functions — pure, side-effect-free.
 *
 * Property 7 (design.md):
 *   - If parseFloat(input) < 1 OR input is not a valid number
 *     → { valid: false, error: non-null string }
 *   - If parseFloat(input) > 10 000 → { valid: false, error: non-null string }
 *     (plafond aligné sur MAX_DONATION_EUR côté serveur, lib/payments.ts)
 *   - Otherwise → { valid: true, error: null }
 *
 * Validates: Requirements 9.4
 */

export interface DonationValidationResult {
  valid: boolean;
  error: string | null;
}

/**
 * Validates a donation amount string.
 *
 * @param input - The raw string value entered by the user.
 * @returns `{ valid: true, error: null }` when `1 <= parseFloat(input) <= 10 000`,
 *          `{ valid: false, error: string }` otherwise.
 */
export function validateDonationAmount(input: string): DonationValidationResult {
  const parsed = Number.parseFloat(input);

  if (Number.isNaN(parsed)) {
    return { valid: false, error: 'Veuillez saisir un montant numérique valide.' };
  }

  if (parsed < 1) {
    return { valid: false, error: 'Le montant minimum est de 1 €.' };
  }

  if (parsed > 10_000) {
    return { valid: false, error: 'Le montant maximum en ligne est de 10 000 €.' };
  }

  return { valid: true, error: null };
}

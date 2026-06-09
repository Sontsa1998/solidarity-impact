/**
 * Events utility functions for the Solidarity Impact website.
 *
 * Implements event sorting (Property 6) and badge classification (Property 5)
 * as specified in the design document and Requirements 8.6, 8.7.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Represents a single association event.
 * The `date` field must follow the ISO 8601 format: "YYYY-MM-DD".
 */
export interface SiteEvent {
  id: string;
  titleKey: string;
  date: string; // ISO 8601: "YYYY-MM-DD"
  location: string;
  descriptionKey: string;
  learnMoreUrl?: string;
}

/**
 * Visual badge indicating whether an event is upcoming or already past.
 * - 'upcoming' → green badge (date >= today)
 * - 'past'     → grey badge  (date < today)
 */
export type EventBadge = 'upcoming' | 'past';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Safely parses an ISO 8601 date string ("YYYY-MM-DD") into a Date object.
 * If the string is malformed, logs an error in development mode and returns null.
 *
 * @param dateString - ISO 8601 date string to parse.
 * @returns A valid Date instance, or null if parsing failed.
 */
function parseEventDate(dateString: string): Date | null {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `[events] Invalid date string encountered: "${dateString}". ` +
          'Expected ISO 8601 format "YYYY-MM-DD".'
      );
    }
    return null;
  }
  return date;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Sorts an array of events by date in ascending order (earliest first).
 *
 * - The result contains exactly the same elements as the input (Property 6).
 * - Events with invalid dates are preserved in the output but sorted last
 *   (to avoid silent data loss); a dev-mode error is also logged for each.
 * - The original array is not mutated.
 *
 * @param events - List of events to sort.
 * @returns A new array sorted by ascending ISO 8601 date.
 */
export function sortEvents(events: SiteEvent[]): SiteEvent[] {
  return [...events].sort((a, b) => {
    const dateA = parseEventDate(a.date);
    const dateB = parseEventDate(b.date);

    // Invalid dates sink to the end
    if (dateA === null && dateB === null) return 0;
    if (dateA === null) return 1;
    if (dateB === null) return -1;

    return dateA.getTime() - dateB.getTime();
  });
}

/**
 * Returns the display badge for an event based on its date relative to today.
 *
 * Rules (Property 5):
 * - If `eventDate` is strictly before `today` (date comparison, time stripped) → 'past'
 * - If `eventDate` is equal to or after `today`                               → 'upcoming'
 *
 * The comparison is performed at **date granularity** (time part is ignored):
 * both dates are normalised to midnight UTC to avoid timezone-offset surprises
 * when working with plain "YYYY-MM-DD" strings.
 *
 * @param eventDate - ISO 8601 date string of the event ("YYYY-MM-DD").
 * @param today     - The reference date (typically `new Date()`).
 * @returns 'past' | 'upcoming'
 */
export function getEventBadge(eventDate: string, today: Date): EventBadge {
  const parsed = parseEventDate(eventDate);

  if (parsed === null) {
    // Graceful degradation: treat unparseable dates as upcoming so they remain visible.
    return 'upcoming';
  }

  // Strip the time part by comparing only the date portion (YYYY-MM-DD strings).
  // new Date("YYYY-MM-DD") is interpreted as midnight UTC, so we normalise `today`
  // to midnight UTC as well for a fair, time-zone-agnostic comparison.
  const todayMidnightUTC = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  );

  // Strictly before today → past; otherwise (same day or future) → upcoming.
  return parsed.getTime() < todayMidnightUTC.getTime() ? 'past' : 'upcoming';
}

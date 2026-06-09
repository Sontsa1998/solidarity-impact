'use client';

import { useState, useEffect } from 'react';
import { useI18nContext } from '@/components/providers/I18nProvider';
import type { SiteEvent, EventBadge } from '@/lib/events';

interface EventCardProps {
  readonly event: SiteEvent;
  readonly badge: EventBadge;
}

// Formate la date seulement côté client pour éviter les différences de locale serveur/navigateur
function useDateFormatted(dateString: string, lang: string): string {
  const [formatted, setFormatted] = useState(dateString); // valeur SSR = ISO brute
  useEffect(() => {
    const locale = lang === 'en' ? 'en-GB' : 'fr-FR';
    setFormatted(new Date(dateString).toLocaleDateString(locale, {
      day: '2-digit', month: 'long', year: 'numeric',
    }));
  }, [dateString, lang]);
  return formatted;
}

export function EventCard({ event, badge }: EventCardProps) {
  const { t, lang } = useI18nContext();
  const isUpcoming = badge === 'upcoming';
  const formattedDate = useDateFormatted(event.date, lang);

  return (
    <article className="flex flex-col gap-3 rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow duration-200 h-full"
      style={{ background: '#fff', borderColor: '#e8d5c4' }}>

      {/* Badge */}
      <span
        className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold"
        style={isUpcoming
          ? { background: '#fdf5f0', color: '#7B3F2A', border: '1px solid #e8d5c4' }
          : { background: '#f3f4f6', color: '#6b7280' }}
        aria-label={isUpcoming ? t('events.badgeUpcoming') : t('events.badgePast')}
      >
        {isUpcoming ? t('events.badgeUpcoming') : t('events.badgePast')}
      </span>

      <h3 className="text-lg font-bold leading-snug break-words" style={{ color: '#2a1209' }}>
        {t(event.titleKey)}
      </h3>

      <div className="flex flex-col gap-1 text-sm" style={{ color: '#9a7060' }}>
        <time dateTime={event.date}>{formattedDate}</time>
        <span>{event.location}</span>
      </div>

      <p className="text-sm leading-relaxed break-words" style={{ color: '#562a1c' }}>
        {t(event.descriptionKey)}
      </p>

      {event.learnMoreUrl && (
        <a href={event.learnMoreUrl} target="_blank" rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-medium hover:underline rounded"
          style={{ color: '#7B3F2A' }}>
          {t('events.learnMore')}
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h4a.75.75 0 010 1.5h-4z" clipRule="evenodd"/>
            <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd"/>
          </svg>
        </a>
      )}
    </article>
  );
}

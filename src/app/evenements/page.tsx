import type { Metadata } from 'next';
import { EventsSection } from '@/components/sections/EventsSection';

export const metadata: Metadata = {
  title: 'Événements — Solidarity Impact',
  description: 'Retrouvez les prochaines actions et rendez-vous solidaires de l\'association Solidarity Impact.',
};

export default function EventsPage() {
  return <EventsSection />;
}

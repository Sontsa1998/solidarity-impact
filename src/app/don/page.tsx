import type { Metadata } from 'next';
import { DonationSection } from '@/components/sections/DonationSection';

export const metadata: Metadata = {
  title: 'Faire un don — Solidarity Impact',
  description: 'Soutenez les actions de l\'association Solidarity Impact : éducation, aide aux orphelinats et développement local au Cameroun.',
};

export default function DonationPage() {
  return <DonationSection />;
}

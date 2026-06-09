import type { Metadata } from 'next';
import { TeamSection } from '@/components/sections/TeamSection';

export const metadata: Metadata = {
  title: 'Notre équipe — Solidarity Impact',
  description: 'Rencontrez les 9 membres fondateurs de l\'association Solidarity Impact, élus lors de l\'assemblée générale constitutive du 14 septembre 2025.',
};

export default function TeamPage() {
  return <TeamSection />;
}

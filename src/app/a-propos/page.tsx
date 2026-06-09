import type { Metadata } from 'next';
import { AboutSection } from '@/components/sections/AboutSection';

export const metadata: Metadata = {
  title: 'À propos — Solidarity Impact',
  description: 'Découvrez la mission, les valeurs et l\'histoire de l\'association Solidarity Impact, fondée à Villemomble le 14 septembre 2025.',
};

export default function AboutPage() {
  return <AboutSection />;
}

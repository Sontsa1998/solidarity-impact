import type { Metadata } from 'next';
import { HomePage } from '@/components/sections/HomePage';

export const metadata: Metadata = {
  title: "Solidarity Impact — L'avenir à portée de main",
  description:
    "Association franco-camerounaise fondée en 2025 à Villemomble. Nous agissons pour l'éducation, les orphelinats et le développement local au Cameroun.",
};

export default function Page() {
  return <HomePage />;
}

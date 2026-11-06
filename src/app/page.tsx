import type { Metadata } from 'next';
import { HomePage } from '@/components/sections/HomePage';

export const metadata: Metadata = {
  title: "Solidarity Impact — L'avenir à portée de main",
  description:
    "Association franco-camerounaise fondée en 2025 à Villemomble. Nous agissons pour l'éducation, les opportunités professionnelles, le soutien aux plus démunis et des actions de terrain au Cameroun.",
};

export default function Page() {
  return <HomePage />;
}

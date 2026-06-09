import type { Metadata } from 'next';
import { ContactSection } from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Contact — Solidarity Impact',
  description: 'Contactez l\'association Solidarity Impact pour toute question, partenariat ou information complémentaire.',
};

export default function ContactPage() {
  return <ContactSection />;
}

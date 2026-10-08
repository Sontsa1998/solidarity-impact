import type { Metadata } from 'next';
import { TournamentDetails } from '@/components/sections/TournamentDetails';

export const metadata: Metadata = {
  title: 'Tournoi de Football — 1ère Édition | Solidarity Impact',
  description:
    'Tournoi de football solidaire organisé par Solidarity Impact le 17 juillet 2027 à Villemomble. Inscriptions ouvertes !',
};

export default function TournamentPage() {
  return <TournamentDetails />;
}

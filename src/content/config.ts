/**
 * Static configuration for the Solidarity Impact website.
 *
 * Contains association details, team members, events list, social links,
 * donation presets, and contact information.
 *
 * Satisfies Requirements: 7.1, 7.2, 9.2, 11.1, 11.2
 */

import type { SiteEvent } from '@/lib/events';

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  photoUrl?: string;
}

export interface SiteConfig {
  association: {
    name: string;
    sirenNumber?: string;
    foundationDate: string; // ISO 8601: "YYYY-MM-DD"
    address: string;
    city: string;
    postalCode: string;
  };
  team: TeamMember[];
  events: SiteEvent[];
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  donationPresets: number[];
  contactInfo: {
    email?: string;
    phone?: string;
  };
}

// ---------------------------------------------------------------------------
// Team members — 9 founding members elected at the AG constitutive (2025-09-14)
// Requirement 7.1, 7.2
// ---------------------------------------------------------------------------

export const teamMembers: TeamMember[] = [
  {
    id: 'nwall-florent',
    firstName: 'Florent Landry',
    lastName: 'NWALL',
    role: 'Président & Resp. Communication et Partenariats',
  },
  {
    id: 'atoko-marcel',
    firstName: 'Marcel Parfait',
    lastName: 'ATOKO À NDEM',
    role: 'Vice-Président & Resp. Projets',
  },
  {
    id: 'edimo-will',
    firstName: 'Will Herman',
    lastName: 'EDIMO',
    role: 'Secrétaire',
  },
  {
    id: 'bitang-marcelle',
    firstName: 'Marcelle Olga Nadine',
    lastName: 'BITANG À NDEM',
    role: 'Trésorière',
  },
  {
    id: 'kouahou-leonidas',
    firstName: 'Léonidas',
    lastName: 'KOUAHOU YANKEP',
    role: 'Trésorier',
  },
  {
    id: 'mfouapon-aboubakar',
    firstName: 'Aboubakar Sidiki',
    lastName: 'MFOUAPON',
    role: "Responsable des équipes d'intervention",
  },
  {
    id: 'bithe-lisa',
    firstName: 'Lisa Klara',
    lastName: 'BITHÉ',
    role: 'Responsable Partenariats',
  },
  {
    id: 'kameni-arthur',
    firstName: 'Arthur',
    lastName: 'KAMENI WESSIZE',
    role: 'Responsable Projets',
  },
  {
    id: 'keedi-marcel',
    firstName: 'Marcel Raoul',
    lastName: 'KEEDI À NDEM',
    role: 'Censeur',
  },
];

// ---------------------------------------------------------------------------
// Site configuration
// ---------------------------------------------------------------------------

export const siteConfig: SiteConfig = {
  association: {
    name: 'Solidarity Impact',
    foundationDate: '2025-09-14',
    address: '89 rue de la Fosse aux Bergers',
    city: 'Villemomble',
    postalCode: '93250',
  },

  // Requirement 7.1, 7.2 — all 9 founding members
  team: teamMembers,

  // Requirement 8 — initially empty; events can be added here later
  events: [],

  // Requirement 9.2 — four preset donation amounts
  donationPresets: [10, 25, 50, 100],

  // Requirement 11.3 — social links hidden when not configured
  socialLinks: {},

  // Requirement 10.6, 11.1 — contact info (empty until configured)
  contactInfo: {
    phone: '+33 7 54 39 89 71',
  },
};

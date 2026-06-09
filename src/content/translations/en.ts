/**
 * en.ts — English translations for the Solidarity Impact website
 *
 * All keys of the Translations interface must be provided here.
 * Missing keys fall back to the French translations (Requirement 2.7, Property 3).
 *
 * Requirements: 2.1, 2.6, 5.1, 6.1, 6.2, 6.3, 6.5, 13.4
 */

import type { Translations } from './fr';

export const en: Translations = {
  // ── Navigation ──────────────────────────────────────────────────────────
  nav: {
    home: 'Home',
    about: 'About',
    team: 'Team',
    events: 'Events',
    donate: 'Donate',
    contact: 'Contact',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
  },

  // ── Hero ────────────────────────────────────────────────────────────────
  hero: {
    title: 'SOLIDARITY IMPACT',
    tagline: 'The future within reach',
    subtitle:
      'A Franco-Cameroonian association committed to education, orphanage support and local development in Cameroon, based in Villemomble.',
    ctaDonate: 'Donate',
    ctaLearnMore: 'Learn more',
    scrollIndicator: 'Scroll down',
  },

  // ── About ───────────────────────────────────────────────────────────────
  about: {
    sectionTitle: 'About',
    missionTitle: 'Our mission',
    missionText:
      'Solidarity Impact carries out Franco-Cameroonian solidarity actions in the fields of education, orphanage support, field operations in Cameroon, international partnerships and sustainable solidarity development. We believe that a shared commitment between France and Cameroon can transform lives and build a more equitable future for all.',
    valuesTitle: 'Our values',
    values: [
      'Solidarity',
      'Social impact',
      'Franco-Cameroonian engagement',
      'Secularism',
      'Apoliticism',
    ],
    foundedDate: 'September 14, 2025',
    foundedPlace: 'Villemomble, Seine-Saint-Denis',
    legalInfo:
      'Association governed by the law of July 1, 1901, with an international vocation. Registered office: 89 rue de la Fosse aux Bergers – 93250 Villemomble.',
  },

  // ── Team ────────────────────────────────────────────────────────────────
  team: {
    sectionTitle: 'Our team',
    sectionSubtitle:
      'The founding members elected at the constitutive general assembly of September 14, 2025.',
  },

  // ── Events ──────────────────────────────────────────────────────────────
  events: {
    sectionTitle: 'Events',
    sectionSubtitle: 'Find our upcoming actions and solidarity gatherings.',
    emptyState: 'No events planned for now. Check back soon!',
    badgeUpcoming: 'Upcoming',
    badgePast: 'Past',
    learnMore: 'Learn more',
  },

  // ── Donation ────────────────────────────────────────────────────────────
  donation: {
    sectionTitle: 'Make a donation',
    description:
      'Your generosity allows us to fund concrete actions in the field. Every contribution, whatever its size, changes lives.',
    impactTitle: 'The impact of your donation',
    impactItems: [
      'Education: scholarships and supplies for underprivileged children',
      'Orphanage support: material assistance and care for children',
      'Field operations in Cameroon: local and solidarity development projects',
    ],
    presetLabel: 'Choose an amount',
    customLabel: 'Other amount',
    customPlaceholder: 'Amount in euros (e.g. 30)',
    buttonText: 'Donate',
    mockWarning:
      '⚠️ This donation module is a demonstration. No real financial data is collected or processed.',
    errorInvalidAmount: 'Please enter a valid amount (minimum €1).',
    successMessage:
      'Thank you for your generosity! The payment feature is being deployed. Your interest means a great deal to us.',
  },

  // ── Contact ─────────────────────────────────────────────────────────────
  contact: {
    sectionTitle: 'Contact us',
    sectionSubtitle:
      'A question, a partnership proposal or simply want to know more? Write to us.',
    addressTitle: 'Our address',
    fields: {
      fullName: 'Full name',
      email: 'Email address',
      subject: 'Subject',
      message: 'Message',
    },
    placeholders: {
      fullName: 'First and last name',
      email: 'your@email.com',
      subject: 'Subject of your message',
      message: 'Your message (minimum 10 characters)…',
    },
    errors: {
      fullNameRequired: 'Full name is required.',
      emailRequired: 'Email address is required.',
      emailInvalid: 'Please enter a valid email address.',
      subjectRequired: 'Subject is required.',
      messageRequired: 'Message is required.',
      messageTooShort: 'The message must be at least 10 characters long.',
    },
    submitButton: 'Send message',
    successMessage:
      'Your message has been sent successfully. We will get back to you as soon as possible.',
  },

  // ── Footer ──────────────────────────────────────────────────────────────
  footer: {
    legalMention: 'Non-profit association — International vocation',
    rights: '© {year} Solidarity Impact. All rights reserved.',
    address: '89 rue de la Fosse aux Bergers – 93250 Villemomble',
  },

  // ── SEO Metadata ────────────────────────────────────────────────────────
  meta: {
    title: 'Solidarity Impact — Franco-Cameroonian Solidarity',
    description:
      'Non-profit association conducting solidarity actions between France and Cameroon: education, orphanage support and local development.',
  },

  // ── Theme ───────────────────────────────────────────────────────────────
  theme: {
    toggleDark: 'Enable dark mode',
    toggleLight: 'Enable light mode',
  },
};

export default en;

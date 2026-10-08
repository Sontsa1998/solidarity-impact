/**
 * fr.ts — Traductions françaises du site Solidarity Impact
 *
 * Langue par défaut de l'application (Requirements 2.1, 2.3).
 * Toutes les clés de l'interface Translations doivent être renseignées ici —
 * ce fichier sert également de fallback pour les clés manquantes en anglais
 * (Requirement 2.7, Property 3).
 *
 * Requirements: 2.1, 2.6, 5.1, 6.1, 6.2, 6.3, 6.5, 13.4
 */

// ---------------------------------------------------------------------------
// Interface Translations — contrat partagé avec en.ts
// ---------------------------------------------------------------------------

export interface Translations {
  nav: {
    home: string;
    about: string;
    team: string;
    events: string;
    donate: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    title: string;
    tagline: string;
    /** Sous-titre ≤ 200 caractères (Requirement 5.1) */
    subtitle: string;
    ctaDonate: string;
    ctaLearnMore: string;
    scrollIndicator: string;
  };
  about: {
    sectionTitle: string;
    visionTitle: string;
    visionText: string;
    missionTitle: string;
    missionText: string;
    valuesTitle: string;
    values: string[];
    foundedDate: string;
    foundedPlace: string;
    legalInfo: string;
  };
  team: {
    sectionTitle: string;
    sectionSubtitle: string;
  };
  events: {
    sectionTitle: string;
    sectionSubtitle: string;
    emptyState: string;
    badgeUpcoming: string;
    badgePast: string;
    learnMore: string;
  };
  donation: {
    sectionTitle: string;
    description: string;
    impactTitle: string;
    impactItems: string[];
    presetLabel: string;
    customLabel: string;
    customPlaceholder: string;
    buttonText: string;
    mockWarning: string;
    errorInvalidAmount: string;
    successMessage: string;
  };
  contact: {
    sectionTitle: string;
    sectionSubtitle: string;
    addressTitle: string;
    fields: {
      fullName: string;
      email: string;
      subject: string;
      message: string;
    };
    placeholders: {
      fullName: string;
      email: string;
      subject: string;
      message: string;
    };
    errors: {
      fullNameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      subjectRequired: string;
      messageRequired: string;
      messageTooShort: string;
    };
    submitButton: string;
    successMessage: string;
  };
  footer: {
    legalMention: string;
    /** Modèle avec token {year} — ex: "© 2025 Solidarity Impact. Tous droits réservés." */
    rights: string;
    address: string;
  };
  meta: {
    /** ≤ 60 caractères (Requirement 13.4) */
    title: string;
    /** ≤ 160 caractères (Requirement 13.4) */
    description: string;
  };
  theme: {
    toggleDark: string;
    toggleLight: string;
  };
}

// ---------------------------------------------------------------------------
// Traductions françaises
// ---------------------------------------------------------------------------

export const fr: Translations = {
  // ── Navigation ──────────────────────────────────────────────────────────
  nav: {
    home: "Accueil",
    about: "À propos",
    team: "Équipe",
    events: "Événements",
    donate: "Faire un don",
    contact: "Contact",
    openMenu: "Ouvrir le menu de navigation",
    closeMenu: "Fermer le menu de navigation",
  },

  // ── Hero ────────────────────────────────────────────────────────────────
  hero: {
    // Requirement 5.1 — titre exact
    title: "SOLIDARITY IMPACT",
    // Requirement 5.1 — devise exacte
    tagline: "L'avenir à portée de main",
    // Requirement 5.1 — ≤ 200 chars, dimensions FR et CM
    // (156 chars — vérifié)
    subtitle:
      "Association franco-camerounaise engagée pour l'éducation, l'aide aux orphelinats et le développement local au Cameroun, depuis Villemomble.",
    ctaDonate: "Faire un don",
    ctaLearnMore: "En savoir plus",
    scrollIndicator: "Défiler vers le bas",
  },

  // ── À propos ────────────────────────────────────────────────────────────
  about: {
    sectionTitle: "À propos",
    visionTitle: "Notre vision",
    // Vision de la marque — charte graphique (DossierSI_2026V3)
    visionText:
      "Faire de la solidarité franco-camerounaise une force collective, structurée et durable, capable de transformer concrètement les réalités au Cameroun grâce à l'engagement de la diaspora, à des partenariats solides et à un impact mesurable.",
    missionTitle: "Notre mission",
    // Requirement 6.1 — mission officielle des statuts
    missionText:
      "Solidarity Impact mène des actions solidaires franco-camerounaises dans les domaines de l'éducation, de l'aide aux orphelinats, des actions terrain au Cameroun, des partenariats internationaux et du développement solidaire durable. Nous croyons qu'un engagement commun entre la France et le Cameroun peut transformer des vies et construire un avenir plus équitable pour tous.",
    valuesTitle: "Nos valeurs",
    // Requirement 6.2 — valeurs exactes des statuts
    values: [
      "Solidarité",
      "Impact social",
      "Engagement franco-camerounais",
      "Laïcité",
      "Apolitisme",
    ],
    // Requirement 6.3 — date de fondation
    foundedDate: "14 septembre 2025",
    // Requirement 6.3 — lieu de création
    foundedPlace: "Villemomble, Seine-Saint-Denis",
    // Requirement 6.5 — informations légales
    legalInfo:
      "Association régie par la loi du 1er juillet 1901, à vocation internationale. Siège social : Villemomble.",
  },

  // ── Équipe ──────────────────────────────────────────────────────────────
  team: {
    sectionTitle: "Notre équipe",
    sectionSubtitle:
      "Les membres fondateurs élus lors de l'assemblée générale constitutive du 14 septembre 2025.",
  },

  // ── Événements ──────────────────────────────────────────────────────────
  events: {
    sectionTitle: "Événements",
    sectionSubtitle:
      "Retrouvez nos prochaines actions et rendez-vous solidaires.",
    // Requirement 8.2 — message état vide exact
    emptyState: "Aucun événement prévu pour le moment. Revenez bientôt !",
    badgeUpcoming: "À venir",
    badgePast: "Passé",
    learnMore: "En savoir plus",
  },

  // ── Don ─────────────────────────────────────────────────────────────────
  donation: {
    sectionTitle: "Faire un don",
    description:
      "Votre générosité nous permet de financer des actions concrètes sur le terrain. Chaque contribution, quelle que soit sa taille, change des vies.",
    impactTitle: "L'impact de votre don",
    // Requirement 9.8 — domaines d'impact
    impactItems: [
      "Éducation : bourses scolaires et fournitures pour les enfants défavorisés",
      "Aide aux orphelinats : soutien matériel et accompagnement des enfants",
      "Actions terrain au Cameroun : projets de développement local et solidaire",
    ],
    presetLabel: "Choisissez un montant",
    customLabel: "Autre montant",
    customPlaceholder: "Montant en euros (ex: 30)",
    buttonText: "Faire un don",
    // Requirement 9.7 — avertissement visible
    mockWarning:
      "⚠️ Ce module de don est une démonstration. Aucune donnée financière réelle n'est collectée ni traitée.",
    errorInvalidAmount:
      "Veuillez saisir un montant valide (minimum 1 €).",
    successMessage:
      "Merci pour votre générosité ! La fonctionnalité de paiement est en cours de déploiement. Votre intérêt nous touche profondément.",
  },

  // ── Contact ─────────────────────────────────────────────────────────────
  contact: {
    sectionTitle: "Nous contacter",
    sectionSubtitle:
      "Une question, une proposition de partenariat ou simplement envie d'en savoir plus ? Écrivez-nous.",
    addressTitle: "Notre adresse",
    fields: {
      fullName: "Nom complet",
      email: "Adresse e-mail",
      subject: "Sujet",
      message: "Message",
    },
    placeholders: {
      fullName: "Prénom et nom",
      email: "votre@email.com",
      subject: "Objet de votre message",
      message: "Votre message (minimum 10 caractères)…",
    },
    errors: {
      fullNameRequired: "Le nom complet est obligatoire.",
      emailRequired: "L'adresse e-mail est obligatoire.",
      emailInvalid: "Veuillez saisir une adresse e-mail valide.",
      subjectRequired: "Le sujet est obligatoire.",
      messageRequired: "Le message est obligatoire.",
      messageTooShort: "Le message doit contenir au moins 10 caractères.",
    },
    submitButton: "Envoyer le message",
    successMessage:
      "Votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.",
  },

  // ── Pied de page ────────────────────────────────────────────────────────
  footer: {
    legalMention: "Association loi 1901 — Vocation internationale",
    // Token {year} remplacé dynamiquement (Requirement 11.1)
    rights: "© {year} Solidarity Impact. Tous droits réservés.",
    // Requirement 11.2 — adresse du siège social
    address: "Villemomble",
  },

  // ── Métadonnées SEO ─────────────────────────────────────────────────────
  meta: {
    // 51 chars — ≤ 60 (Requirement 13.4)
    title: "Solidarity Impact — Solidarité Franco-Camerounaise",
    // 155 chars — ≤ 160 (Requirement 13.4)
    description:
      "Association loi 1901 menant des actions solidaires entre la France et le Cameroun : éducation, aide aux orphelinats et développement local.",
  },

  // ── Thème ───────────────────────────────────────────────────────────────
  theme: {
    toggleDark: "Activer le mode sombre",
    toggleLight: "Activer le mode clair",
  },
};

export default fr;

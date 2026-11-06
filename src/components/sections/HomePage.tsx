'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useI18nContext } from '@/components/providers/I18nProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { MoodboardBackground } from '@/components/brand/MoodboardBackground';

// ── Palette (cf. globals.css) ────────────────────────────────────────────────
const GREEN = '#2E7D44';
const NIGHT = '#12211A';

// ── Icônes (traits fins, style « outline ») ──────────────────────────────────
const iconProps = {
  xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true,
};
function ArrowIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return <svg {...iconProps} className={`${className} transition-transform group-hover:translate-x-1`}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
}
function CheckIcon() {
  return <svg {...iconProps} strokeWidth={2.5} className="w-3 h-3"><polyline points="20 6 9 17 4 12" /></svg>;
}
function BookIcon()  { return <svg {...iconProps} className="w-5 h-5"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z" /><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" /></svg>; }
function GlobeIcon() { return <svg {...iconProps} className="w-5 h-5"><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" /></svg>; }
function BriefcaseIcon() { return <svg {...iconProps} className="w-5 h-5"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M2 13h20" /></svg>; }
function HeartIcon() { return <svg {...iconProps} className="w-5 h-5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>; }
function UsersIcon() { return <svg {...iconProps} className="w-4 h-4"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>; }
function MailIcon()  { return <svg {...iconProps} className="w-4 h-4"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22 6 12 13 2 6" /></svg>; }

// ── Contenus ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: '2025', fr: 'Année de création',  en: 'Year founded'     },
  { value: '9',    fr: 'Membres fondateurs', en: 'Founding members' },
  { value: '2',    fr: 'Pays unis',          en: 'Countries united' },
  { value: '100%', fr: 'Bénévoles',          en: 'Volunteers'       },
];

const PILLARS = [
  { fr: 'Solidarité',    en: 'Solidarity',  dFr: 'Tendre la main aux enfants et aux familles dans le besoin',    dEn: 'Reaching out to children and families in need'            },
  { fr: 'Éducation',     en: 'Education',   dFr: "Donner à chaque enfant les moyens d'apprendre",                dEn: 'Giving every child the means to learn'                    },
  { fr: 'Engagement',    en: 'Commitment',  dFr: 'Agir sur le terrain avec les communautés locales au Cameroun', dEn: 'Working on the ground with local communities in Cameroon' },
];

const MISSIONS = [
  { Icon: BookIcon,  fr: "L'éducation pour tous",       en: 'Education for all',      dFr: 'Bourses, fournitures et matériel scolaire pour que chaque enfant puisse apprendre.',                 dEn: 'Scholarships, supplies and school equipment so every child can learn.' },
  { Icon: BriefcaseIcon, fr: 'Opportunités professionnelles', en: 'Professional opportunities', dFr: "Accompagner les jeunes vers l'emploi : orientation, formation, stages et mise en relation avec des professionnels.", dEn: 'Helping young people into work: guidance, training, internships and connections with professionals.' },
  { Icon: HeartIcon,     fr: 'Soutien aux plus démunis',      en: 'Support for those in need',  dFr: "Aide matérielle et humaine aux enfants, aux familles et aux personnes en situation de précarité.",                    dEn: 'Material and human support for children, families and people facing hardship.' },
  { Icon: GlobeIcon,     fr: 'Actions diverses sur le terrain', en: 'Field actions',            dFr: 'Grâce à notre délégation locale, nous menons des actions concrètes et variées auprès des communautés au Cameroun.', dEn: 'Through our local delegation, we carry out concrete and varied actions alongside communities in Cameroon.' },
];

const HOW = [
  { fr: 'Vous choisissez le montant de votre don : même 5 € comptent', en: 'You choose your donation amount: even €5 counts'      },
  { fr: 'Notre délégation sur place identifie les besoins urgents',     en: 'Our local delegation identifies the most urgent needs' },
  { fr: 'Chaque euro est affecté à une action concrète',               en: 'Every euro goes to a concrete action'                   },
  { fr: 'Nous rendons compte de chaque action menée',                   en: 'We report back on every action carried out'           },
];

const VALUES = [
  { fr: 'Solidarité',              en: 'Solidarity'              },
  { fr: 'Impact social',           en: 'Social impact'           },
  { fr: 'Lien franco-camerounais', en: 'Franco-Cameroonian bond' },
  { fr: 'Laïcité',                 en: 'Secularism'              },
  { fr: 'Apolitisme',              en: 'Non-partisanship'        },
  { fr: 'Transparence',            en: 'Transparency'            },
];

// ── Apparition douce au défilement ───────────────────────────────────────────
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

const pillBase    = 'group inline-flex items-center justify-center gap-2 rounded-full font-semibold text-[15px] px-7 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3FA45B]';
const pillPrimary = `${pillBase} bg-[#2E7D44] hover:bg-[#256B39] text-white`;
const pillGhost   = `${pillBase} border border-white/40 hover:bg-white/10 text-white`;

// ── Page d'accueil ───────────────────────────────────────────────────────────
export function HomePage() {
  const { lang } = useI18nContext();
  const T = (fr: string, en: string) => (lang === 'en' ? en : fr);

  return (
    <div className="bg-white dark:bg-[#0E1A14] text-[#1A1A1A] dark:text-white">

      {/* ══ HERO : photos de la charte sous un voile vert nuit ═════════════════ */}
      <section id="hero" aria-labelledby="hero-title"
        className="relative isolate overflow-hidden min-h-[calc(100svh-5rem)] flex items-center justify-center px-4 py-24 text-center">
        <MoodboardBackground variant="dark" />

        <div className="relative max-w-4xl mx-auto">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur px-4 py-1.5 text-sm text-white/90">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F2C94C]" aria-hidden="true" />
              {T('Association loi 1901 · France & Cameroun', 'Non-profit association · France & Cameroon')}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 id="hero-title" className="mt-7 text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] text-white">
              {T("L'avenir des enfants du Cameroun se construit ensemble.", "The future of Cameroon's children is built together.")}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-white/80">
              {T("Depuis 2025, Solidarity Impact réunit des Français et des Camerounais autour d'une même conviction : l'éducation, l'emploi et la solidarité changent des vies.",
                 'Since 2025, Solidarity Impact has brought together French and Cameroonian people around one belief: education, employment and solidarity change lives.')}
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/don" className={pillPrimary}>
              {T('Faire un don', 'Donate')} <ArrowIcon />
            </Link>
            <Link href="/a-propos" className={pillGhost}>
              {T("Découvrir l'association", 'Discover the association')}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ CHIFFRES CLÉS ══════════════════════════════════════════════════════ */}
      <section aria-label={T('Chiffres clés', 'Key figures')} style={{ background: NIGHT }}>
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ value, fr, en }, i) => (
            <Reveal key={fr} delay={i * 0.06}
              className={`py-4 text-center border-white/10 ${i % 2 === 1 ? 'border-l' : ''} ${i === 2 ? 'lg:border-l' : ''}`}>
              <p className="text-4xl sm:text-5xl font-bold text-white">{value}</p>
              <p className="mt-2 text-sm text-[#9CA3AF]">{T(fr, en)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ QUI SOMMES-NOUS + PRÉSIDENT ════════════════════════════════════════ */}
      <section aria-labelledby="about-title" className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-16 items-center">

          <Reveal>
            <h2 id="about-title" className="text-3xl sm:text-4xl font-bold">{T('Qui sommes-nous ?', 'Who are we?')}</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#4B5563] dark:text-[#C9CED6]">
              {T("Solidarity Impact est une association loi 1901 créée en 2025 à Villemomble par un collectif de Franco-Camerounais. Nos missions : l'éducation, les opportunités professionnelles, le soutien aux plus démunis et des actions diverses sur le terrain au Cameroun.",
                 'Solidarity Impact is a French non-profit founded in 2025 in Villemomble by a group of French-Cameroonians. Our missions: education, professional opportunities, support for the most vulnerable and a range of field actions in Cameroon.')}
            </p>

            {/* Frise des piliers */}
            <ol className="mt-10">
              {PILLARS.map(({ fr, en, dFr, dEn }, i) => (
                <li key={fr} className="relative pl-10 pb-8 last:pb-0">
                  {i < PILLARS.length - 1 && (
                    <span className="absolute left-[9px] top-6 bottom-0 w-px bg-[#D3EBDA] dark:bg-[#1F3329]" aria-hidden="true" />
                  )}
                  <span className="absolute left-0 top-1 h-[19px] w-[19px] rounded-full border-2 border-[#3FA45B] bg-white dark:bg-[#0E1A14]" aria-hidden="true" />
                  <p className="font-semibold">{T(fr, en)}</p>
                  <p className="mt-1 text-sm text-[#6B7280] dark:text-[#9CA3AF]">{T(dFr, dEn)}</p>
                </li>
              ))}
            </ol>

            <Link href="/a-propos" className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D44] dark:text-[#5DB876]">
              {T('En savoir plus', 'Learn more')} <ArrowIcon />
            </Link>
          </Reveal>

          {/* Portrait du président dans un cadre vert */}
          <Reveal delay={0.1} className="w-full max-w-sm mx-auto lg:ml-auto">
            <figure>
              <div className="relative rounded-xl p-3 sm:p-3.5 shadow-[0_24px_60px_rgba(18,33,26,0.18)]" style={{ background: GREEN }}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#EEF7F0]">
                  <Image src="/equipe/president-florent-nwall.webp"
                    alt={T('Florent Landry NWALL, président de Solidarity Impact', 'Florent Landry NWALL, President of Solidarity Impact')}
                    fill sizes="(min-width: 1024px) 384px, 90vw" className="object-cover object-top" />
                </div>
                <span className="absolute -bottom-4 left-6 rounded-full bg-[#F2C94C] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#12211A] shadow-md">
                  {T('Président', 'President')}
                </span>
              </div>
              <figcaption className="mt-9 flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-bold leading-snug">
                    {T('2025, création de Solidarity Impact', '2025, Solidarity Impact is founded')}
                    <br />
                    <span className="font-medium text-[#4B5563] dark:text-[#C9CED6]">
                      {T('par un collectif de Franco‑Camerounais','by a group of French‑Cameroonians')}
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    Florent Landry NWALL · {T("Président de l'association", 'President of the association')}
                  </p>
                </div>
                <BrandLogo variant="compact" className="h-10 w-auto flex-shrink-0 text-[#2E7D44] dark:text-[#5DB876]" title="Solidarity Impact" />
              </figcaption>
              <p className="mt-6 border-l-[3px] border-[#F2C94C] pl-4 text-lg italic font-medium text-[#2E7D44] dark:text-[#5DB876]">
                {T('« Unis par deux terres, engagés pour un même avenir. »', '“Two lands united, one shared future.”')}
              </p>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ══ MISSIONS ═══════════════════════════════════════════════════════════ */}
      <section aria-labelledby="missions-title" className="py-24 px-4 bg-[#F9FAFB] dark:bg-[#0B1510]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 id="missions-title" className="text-3xl sm:text-4xl font-bold">{T('Nos missions', 'Our missions')}</h2>
            <p className="mt-4 text-[#6B7280] dark:text-[#9CA3AF]">
              {T("Solidarity Impact s'organise autour de 4 axes d'action pour maximiser son impact.",
                 'Solidarity Impact is organised around 4 areas of action to maximise its impact.')}
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MISSIONS.map(({ Icon, fr, en, dFr, dEn }, i) => (
              <Reveal key={fr} delay={i * 0.06}
                className={`h-full rounded-2xl border border-[#E5E7EB] dark:border-[#1F3329] p-6 transition-shadow hover:shadow-[0_12px_32px_rgba(18,33,26,0.08)] dark:bg-[#12211A] ${i % 2 === 0 ? 'bg-dots' : 'bg-white'}`}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF7F0] dark:bg-[#1F3329] text-[#2E7D44] dark:text-[#5DB876]">
                  <Icon />
                </span>
                <h3 className="mt-5 font-semibold">{T(fr, en)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">{T(dFr, dEn)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SOUTENIR : bandeau sombre + carte ══════════════════════════════════ */}
      <section aria-labelledby="support-title" className="py-24 px-4" style={{ background: NIGHT }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h2 id="support-title" className="text-3xl sm:text-4xl font-bold text-white">{T('Soutenez nos actions', 'Support our work')}</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#9CA3AF] max-w-md">
              {T("Un enfant qui reçoit aujourd'hui des fournitures scolaires peut devenir le médecin ou l'ingénieur de demain. Votre geste compte, vraiment.",
                 "A child who receives school supplies today can become tomorrow's doctor or engineer. Your gesture truly matters.")}
            </p>
            <p className="mt-8 flex items-baseline gap-2 text-white">
              <span className="text-sm text-[#9CA3AF]">{T('dès', 'from')}</span>
              <span className="text-6xl font-bold">5 €</span>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 sm:p-9">
              <span className="inline-block rounded-full bg-[#3FA45B]/20 px-3 py-1 text-xs font-medium text-[#8FD3A2]">
                {T('Où va votre don', 'Where your donation goes')}
              </span>
              <ul className="mt-6 space-y-4">
                {HOW.map(({ fr, en }) => (
                  <li key={fr} className="flex items-start gap-3 text-[15px] text-white/85">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#3FA45B]/25 text-[#8FD3A2]">
                      <CheckIcon />
                    </span>
                    {T(fr, en)}
                  </li>
                ))}
              </ul>
              <Link href="/don" className={`${pillBase} mt-8 w-full bg-[#3FA45B] hover:bg-[#5DB876] text-[#0B1510]`}>
                {T('Faire un don maintenant', 'Donate now')} <ArrowIcon />
              </Link>
              <p className="mt-4 text-center text-xs text-[#9CA3AF]">
                {T('Paiement sécurisé par carte bancaire ou PayPal.', 'Secure payment by card or PayPal.')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ À LA UNE ═══════════════════════════════════════════════════════════ */}
      <section aria-labelledby="events-title" className="py-24 px-4 bg-[#F9FAFB] dark:bg-[#0B1510]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="events-title" className="text-3xl sm:text-4xl font-bold">{T('À la une', 'Highlights')}</h2>
              <p className="mt-3 text-[#6B7280] dark:text-[#9CA3AF]">{T("Les prochains rendez-vous de l'association.", "The association's upcoming events.")}</p>
            </div>
            <Link href="/evenements" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D44] dark:text-[#5DB876]">
              {T('Tous les événements', 'All events')} <ArrowIcon />
            </Link>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5">
            {/* Carte principale : tournoi */}
            <Reveal>
              <Link href="/evenements/tournoi-football"
                className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl p-7 sm:p-8"
                style={{ background: 'linear-gradient(135deg, #183A23 0%, #2E7D44 100%)' }}>
                <svg viewBox="0 0 200 120" className="absolute inset-0 h-full w-full opacity-[0.14] transition-transform duration-700 group-hover:scale-105" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <g fill="none" stroke="white" strokeWidth="0.8">
                    <rect x="10" y="10" width="180" height="100" /><line x1="100" y1="10" x2="100" y2="110" />
                    <circle cx="100" cy="60" r="18" /><rect x="10" y="35" width="28" height="50" /><rect x="162" y="35" width="28" height="50" />
                  </g>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" aria-hidden="true" />
                <div className="relative">
                  <span className="inline-block rounded-full bg-[#F2C94C] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#12211A]">
                    {T('À venir', 'Upcoming')}
                  </span>
                  <p className="mt-4 text-sm text-white/80">17 {T('juillet', 'July')} 2027 · Villemomble</p>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
                    {T('Tournoi de football solidaire, 1ʳᵉ édition', 'Charity football tournament, 1st edition')}
                  </h3>
                  <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    {T('Inscrire une équipe', 'Register a team')} <ArrowIcon />
                  </p>
                </div>
              </Link>
            </Reveal>

            {/* Cartes secondaires */}
            <div className="flex flex-col gap-5">
              {[
                { href: '/equipe',  img: '/moodboard/cercle-solidaire.webp', Icon: UsersIcon, tagFr: "L'équipe",  tagEn: 'The team',     fr: 'Les 9 membres fondateurs, élus en assemblée générale', en: 'The 9 founding members, elected at the general assembly' },
                { href: '/contact', img: '/moodboard/mains-liens.webp',      Icon: MailIcon,  tagFr: 'Bénévolat', tagEn: 'Volunteering', fr: 'Envie de vous engager ? Écrivez-nous',               en: 'Want to get involved? Write to us' },
              ].map(({ href, img, Icon, tagFr, tagEn, fr, en }, i) => (
                <Reveal key={href} delay={0.08 + i * 0.06} className="flex-1">
                  <Link href={href}
                    className="group flex h-full items-center gap-4 rounded-2xl border border-[#E5E7EB] dark:border-[#1F3329] bg-white dark:bg-[#12211A] p-3 pr-5 transition-shadow hover:shadow-[0_12px_32px_rgba(18,33,26,0.08)]">
                    <div className="relative h-24 w-28 flex-shrink-0 overflow-hidden rounded-xl">
                      <Image src={img} alt="" fill sizes="112px" className="object-cover" />
                    </div>
                    <div>
                      <p className="flex items-center gap-1.5 text-xs text-[#6B7280] dark:text-[#9CA3AF]"><Icon /> {T(tagFr, tagEn)}</p>
                      <p className="mt-1 font-semibold leading-snug">{T(fr, en)}</p>
                      <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#2E7D44] dark:text-[#5DB876]">
                        {T('Découvrir', 'Discover')} <ArrowIcon className="w-3.5 h-3.5" />
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ VALEURS (bandeau discret) ══════════════════════════════════════════ */}
      <section aria-labelledby="values-title" className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 id="values-title" className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
            {T('Les valeurs qui nous guident', 'The values that guide us')}
          </h2>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {VALUES.map(({ fr, en }) => (
              <li key={fr} className="text-xl sm:text-2xl font-semibold text-[#9CA3AF] hover:text-[#2E7D44] dark:text-[#6B7280] dark:hover:text-[#5DB876] transition-colors">
                {T(fr, en)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ APPEL À L'ACTION FINAL ═════════════════════════════════════════════ */}
      <section aria-labelledby="cta-title" className="py-24 px-4 text-center" style={{ background: NIGHT }}>
        <Reveal className="max-w-3xl mx-auto">
          <h2 id="cta-title" className="text-3xl sm:text-5xl font-bold text-white">
            {T('Prêt à changer des vies avec nous ?', 'Ready to change lives with us?')}
          </h2>
          <p className="mt-5 text-lg text-[#9CA3AF]">
            {T("Donateur, bénévole ou partenaire : rejoignez celles et ceux qui s'engagent entre la France et le Cameroun.",
               'Donor, volunteer or partner: join the people taking action between France and Cameroon.')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/don" className={pillPrimary}>{T('Faire un don', 'Donate')} <ArrowIcon /></Link>
            <Link href="/contact" className={pillGhost}>{T('Nous contacter', 'Contact us')}</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { FloatingParticles } from '@/components/ui/FloatingParticles';
import { useI18nContext } from '@/components/providers/I18nProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BrandMotif } from '@/components/brand/BrandMotif';

const B = '#6B3E2E', BH = '#5A3426', BEIGE = '#FDF9F7', BEIGE2 = '#FFFFFF', BORDER = '#EBDDD4';

function HeartIcon()  { return <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>; }
function CheckIcon()  { return <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>; }
function ArrowIcon()  { return <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>; }
function UsersIcon()  { return <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>; }

const MISSIONS = [
  { emoji: '📚', titleFr: "L'éducation pour tous",          titleEn: "Education for all",          descFr: "Nous finançons des bourses et des fournitures scolaires pour les enfants dans le besoin. Chaque enfant mérite d'apprendre.", descEn: "We fund scholarships and school supplies. Every child deserves to learn.", color: '#FEF6DB', accent: '#D9A82B' },
  { emoji: '🏠', titleFr: "Soutien aux orphelinats",         titleEn: "Orphanage support",           descFr: "Aide matérielle et humaine aux enfants orphelins au Cameroun. Ces enfants ont besoin de nous — et de vous.", descEn: "Material and human support for orphaned children in Cameroon.", color: '#F6EEE9', accent: '#6B3E2E' },
  { emoji: '🌍', titleFr: "Actions terrain au Cameroun",     titleEn: "Field operations",            descFr: "Via notre délégation locale, nous agissons directement pour le développement des communautés.", descEn: "Through our local delegation, we act directly for community development.", color: '#EEF7F0', accent: '#3FA45B' },
  { emoji: '🤝', titleFr: "Partenariats internationaux",     titleEn: "International partnerships",  descFr: "Nous construisons des ponts durables entre la France et le Cameroun.", descEn: "We build lasting bridges between France and Cameroon.", color: '#FEF6DB', accent: '#6B3E2E' },
];

const VALUES = [
  { emoji: '🤲', fr: 'Solidarité',                  en: 'Solidarity'     },
  { emoji: '💥', fr: 'Impact social',                en: 'Social impact'  },
  { emoji: '🇫🇷', fr: 'Lien franco-camerounais',      en: 'Franco-Cameroonian bond' },
  { emoji: '⚖️', fr: 'Laïcité',                      en: 'Secularism'     },
  { emoji: '🕊️', fr: 'Apolitisme',                   en: 'Non-partisanship' },
];

const STATS = [
  { value: '2025',  fr: 'Année de création',   en: 'Year founded'   },
  { value: '9',     fr: 'Membres fondateurs',  en: 'Founders'       },
  { value: '2',     fr: 'Pays concernés',      en: 'Countries'      },
  { value: '100%',  fr: 'Bénévoles engagés',   en: '100% volunteers' },
];

const HOW = [
  { step: '01', fr: 'Vous faites un don',             en: 'You donate',            desc_fr: "Choisissez le montant. Même 5 € aident.", desc_en: "Choose any amount. Even €5 helps." },
  { step: '02', fr: 'Nous identifions les besoins',   en: 'We identify needs',     desc_fr: "Notre délégation terrain identifie les urgences.", desc_en: "Our field delegation identifies urgent needs." },
  { step: '03', fr: 'L\'argent va là où il faut',     en: 'Money goes where needed', desc_fr: "Chaque euro va à l'action directe.", desc_en: "Every euro goes to direct action." },
  { step: '04', fr: 'Vous voyez l\'impact',           en: 'You see the impact',    desc_fr: "Nous rendons compte de chaque action.", desc_en: "We report on every action taken." },
];

// ── Composant AnimatedCounter ─────────────────────────────────────────────────
function AnimatedCounter({ value, reduced }: { value: string; reduced: boolean }) {
  if (reduced) return <span>{value}</span>;
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {value}
    </motion.span>
  );
}

// ── Composant MissionCard avec tilt 3D ────────────────────────────────────────
function MissionCard({ emoji, title, desc, color, accent, idx, reduced }: {
  emoji: string; title: string; desc: string; color: string; accent: string; idx: number; reduced: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(600px) rotateY(${x / 25}deg) rotateX(${-y / 25}deg) translateY(-4px)`;
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0)';
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ background: color, borderLeft: `4px solid ${accent}`, transformStyle: 'preserve-3d', transition: 'transform 0.2s ease' }}
      className="rounded-2xl p-7 shadow-sm cursor-default"
    >
      <motion.div
        className="text-4xl mb-3"
        animate={reduced ? {} : { rotate: [0, -5, 5, -3, 3, 0] }}
        transition={{ duration: 1.5, delay: idx * 0.2 + 0.8, repeat: Infinity, repeatDelay: 4 }}
        aria-hidden="true"
      >
        {emoji}
      </motion.div>
      <h3 className="text-lg font-black mb-2" style={{ color: '#24140E' }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: '#4A2B20' }}>{desc}</p>
    </motion.div>
  );
}

// ── HomePage ──────────────────────────────────────────────────────────────────
export function HomePage() {
  const { lang } = useI18nContext();
  const reduced = useReducedMotion();
  const T = (fr: string, en: string) => lang === 'en' ? en : fr;
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax scroll sur le hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroYSpring = useSpring(heroY, { stiffness: 60, damping: 20 });

  return (
    <div style={{ background: BEIGE }}>

      {/* ══ HERO ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} id="hero" aria-labelledby="hero-title"
        className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden px-4 py-24 text-center"
        style={{ background: 'linear-gradient(160deg, #FDF9F7 0%, #FDF9F7 50%, #FBEFC8 100%)' }}>

        {/* Particules flottantes */}
        <FloatingParticles count={30} />

        {/* Motifs « demi-cercles » de la charte */}
        <BrandMotif className="absolute top-10 left-6 sm:left-12 w-28 sm:w-40 opacity-80" />
        <BrandMotif color="#3FA45B" className="absolute bottom-16 right-6 sm:right-12 w-24 sm:w-32 opacity-60" />

        {/* Orbes décoratifs avec parallax */}
        {!reduced && (
          <>
            <motion.div
              style={{ y: heroYSpring, background: `radial-gradient(circle, ${B} 0%, transparent 70%)` }}
              className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            <motion.div
              className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full opacity-10"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{ background: `radial-gradient(circle, ${B} 0%, transparent 70%)` }}
              aria-hidden="true"
            />
            {/* Anneau rotatif */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border opacity-5"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{ borderColor: B, borderStyle: 'dashed' }}
              aria-hidden="true"
            />
          </>
        )}

        {/* Bande drapeaux */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex opacity-50" aria-hidden="true">
          {['#1d4ed8','#fff','#dc2626','#3FA45B','#dc2626','#F2C94C'].map((c,i) => (
            <motion.div key={i} className="flex-1" style={{ background: c }}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 1 + i * 0.08, duration: 0.3 }} />
          ))}
        </div>

        {/* Contenu hero avec parallax */}
        <motion.div style={reduced ? {} : { y: heroYSpring, opacity: heroOpacity }}
          className="relative mx-auto max-w-4xl">

          {/* Badge animé */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold border relative"
            style={{ background: BEIGE, borderColor: BORDER, color: B }}
          >
            <motion.span className="h-2 w-2 rounded-full relative"
              animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ background: B }} aria-hidden="true" />
            {T('Association loi 1901 — Fondée le 14 septembre 2025', 'Non-profit — Founded September 14, 2025')}
          </motion.div>

          {/* Titre avec animation lettre par lettre */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h1 id="hero-title"
              className="font-black tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]"
              style={{ color: '#24140E' }}>
              {'SOLIDARITY'.split('').map((char, i) => (
                <motion.span key={i} className="inline-block"
                  initial={{ opacity: 0, y: 40, rotateX: -60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.3 + i * 0.04, duration: 0.4, ease: 'backOut' }}>
                  {char}
                </motion.span>
              ))}
              <br />
              {'IMPACT'.split('').map((char, i) => (
                <motion.span key={i} className="inline-block"
                  initial={{ opacity: 0, y: 40, rotateX: -60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.7 + i * 0.05, duration: 0.4, ease: 'backOut' }}
                  style={{ color: B }}>
                  {char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Devise avec effet typewriter */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
            className="font-display mt-4 text-xl sm:text-2xl font-bold"
            style={{ color: '#2E7D44' }}>
            « {T("L'avenir à portée de main", 'The future within reach')} »
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-6 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed"
            style={{ color: '#6E4A3C' }}>
            {T(
              "Nous sommes des Français et des Camerounais unis pour aider les enfants, soutenir les orphelinats et développer les communautés au Cameroun. Ensemble, on change des vies.",
              "French and Cameroonian people united to help children, support orphanages and develop communities in Cameroon. Together, we change lives."
            )}
          </motion.p>

          {/* CTAs avec effets */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={reduced ? {} : { scale: 1.05 }} whileTap={reduced ? {} : { scale: 0.97 }}>
              <Link href="/don"
                className="btn-ripple inline-flex items-center gap-2 rounded-2xl font-black text-base px-8 py-4 shadow-lg animate-glow"
                style={{ background: B, color: BEIGE }}>
                <motion.span animate={reduced ? {} : { scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}>
                  <HeartIcon />
                </motion.span>
                {T('Faire un don maintenant', 'Donate now')}
              </Link>
            </motion.div>
            <motion.div whileHover={reduced ? {} : { scale: 1.04 }} whileTap={reduced ? {} : { scale: 0.97 }}>
              <Link href="/a-propos"
                className="group animated-underline inline-flex items-center gap-2 rounded-2xl font-bold text-base px-8 py-4 border-2 bg-transparent transition-all duration-200"
                style={{ borderColor: B, color: B }}>
                {T('Qui sommes-nous ?', 'Who are we?')}
                <ArrowIcon />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats avec bounce-in */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map(({ value, fr, en }, idx) => (
              <motion.div key={value}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.7 + idx * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                whileHover={reduced ? {} : { scale: 1.08, rotate: 1 }}
                className="flex flex-col items-center gap-1 rounded-2xl py-4 px-3"
                style={{ background: 'rgba(255,255,255,0.65)', border: `1px solid ${BORDER}` }}>
                <AnimatedCounter value={value} reduced={reduced} />
                <span className="text-[11px] sm:text-xs text-center font-medium" style={{ color: '#86655A' }}>
                  {T(fr, en)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chevron animé */}
        {!reduced && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2" style={{ color: '#D2B8AA' }}
            aria-hidden="true">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* ══ ACCROCHE ANIMÉE ══════════════════════════════════════════════════ */}
      <section className="py-16 px-4 overflow-hidden relative" style={{ background: B }}>
        {/* Orbe décoratif */}
        {!reduced && (
          <motion.div className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-10"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(circle, #FDF9F7 0%, transparent 70%)' }}
            aria-hidden="true" />
        )}
        <AnimatedSection animation="fadeIn" threshold={0.2}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'backOut' }}
              className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed" style={{ color: BEIGE }}>
              {T(
                '"Peu importe d\'où vous venez — si vous avez envie d\'aider, vous êtes chez vous ici."',
                '"No matter where you come from — if you want to help, you are at home here."'
              )}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 text-sm font-semibold" style={{ color: '#EBDDD4' }}>
              — Solidarity Impact, Villemomble
            </motion.p>
          </div>
        </AnimatedSection>
      </section>

      {/* ══ NOS 4 MISSIONS ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: BEIGE2 }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn" threshold={0.1} className="text-center mb-14">
            <motion.p className="text-sm font-black uppercase tracking-widest mb-3"
              style={{ color: '#86655A' }}
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}>
              {T('Ce que nous faisons concrètement', 'What we concretely do')}
            </motion.p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#24140E' }}>
              {T('Nos 4 missions principales', 'Our 4 main missions')}
            </h2>
            <motion.div className="mx-auto h-1 rounded-full"
              initial={{ width: 0 }} whileInView={{ width: 64 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ background: B }} aria-hidden="true" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MISSIONS.map(({ emoji, titleFr, titleEn, descFr, descEn, color, accent }, idx) => (
              <MissionCard key={titleFr} emoji={emoji} title={T(titleFr, titleEn)}
                desc={T(descFr, descEn)} color={color} accent={accent} idx={idx} reduced={reduced} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ QUI SOMMES-NOUS ══════════════════════════════════════════════════ */}
      <section className="py-20 px-4 overflow-hidden" style={{ background: BEIGE }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slideInLeft" threshold={0.2}>
              <motion.p className="text-sm font-black uppercase tracking-widest mb-3"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                style={{ color: '#86655A' }}>
                {T('Notre histoire', 'Our story')}
              </motion.p>
              <h2 className="text-3xl sm:text-4xl font-black mb-6" style={{ color: '#24140E' }}>
                {T("Une association née d'une amitié franco-camerounaise", "Born from a Franco-Cameroonian friendship")}
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: '#4A2B20' }}>
                {T("Le 14 septembre 2025, à Villemomble, 9 personnes se sont réunies pour créer un lien fort entre la France et le Cameroun, pour aider ceux qui en ont le plus besoin.",
                   "On September 14, 2025, in Villemomble, 9 people gathered to create a bond between France and Cameroon, to help those who need it most.")}
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  T('Reconnue loi 1901, à vocation internationale', 'Recognized non-profit, international purpose'),
                  T('Compatible avec la loi camerounaise N°90/053', 'Compatible with Cameroonian law N°90/053'),
                  T('9 fondateurs élus démocratiquement', '9 democratically elected founders'),
                  T('Siège : Villemomble', 'HQ: Villemomble'),
                ].map((item, idx) => (
                  <motion.li key={idx} className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}>
                    <motion.span style={{ color: B }}
                      initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.2, type: 'spring', stiffness: 300 }}>
                      <CheckIcon />
                    </motion.span>
                    <span className="text-sm" style={{ color: '#4A2B20' }}>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div whileHover={reduced ? {} : { scale: 1.04 }} whileTap={reduced ? {} : { scale: 0.97 }}>
                <Link href="/equipe"
                  className="btn-ripple group inline-flex items-center gap-2 font-black text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg"
                  style={{ background: B, color: BEIGE }}>
                  <UsersIcon />
                  {T("Rencontrer l'équipe", 'Meet the team')}
                </Link>
              </motion.div>
            </AnimatedSection>

            {/* Carte identité avec effet morphing */}
            <AnimatedSection animation="slideInRight" threshold={0.2}>
              <motion.div
                whileHover={reduced ? {} : { scale: 1.02, rotate: 0.5 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="rounded-3xl overflow-hidden shadow-2xl border" style={{ borderColor: BORDER }}>
                <div className="p-6 text-center relative overflow-hidden" style={{ background: B }}>
                  {!reduced && (
                    <motion.div className="absolute inset-0 opacity-20"
                      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', backgroundSize: '200% 100%' }}
                      aria-hidden="true" />
                  )}
                  <motion.div className="text-5xl mb-3" animate={reduced ? {} : { rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 2, delay: 1.5 }} aria-hidden="true">🤝</motion.div>
                  <h3 className="text-xl font-black" style={{ color: BEIGE }}>Solidarity Impact</h3>
                  <p className="text-sm mt-1 opacity-80" style={{ color: BEIGE }}>
                    {T('Association à vocation internationale', 'International purpose association')}
                  </p>
                </div>
                <div className="p-6 space-y-3" style={{ background: '#fff' }}>
                  {[
                    { k: T('📋 Statut', '📋 Status'),       v: T('Association loi 1901', 'Non-profit (Law 1901)') },
                    { k: T('🗓️ Fondée le', '🗓️ Founded'),    v: '14 septembre 2025' },
                    { k: T('📍 Siège', '📍 HQ'),              v: 'Villemomble, 93250' },
                    { k: T('👥 Fondateurs', '👥 Founders'),   v: '9 ' + T('membres élus', 'elected members') },
                    { k: T('📞 Contact', '📞 Contact'),       v: '+33 7 54 39 89 71' },
                  ].map(({ k, v }, idx) => (
                    <motion.div key={k}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                      style={{ borderColor: BORDER }}>
                      <span className="text-xs font-black uppercase tracking-wide w-24 flex-shrink-0 pt-0.5" style={{ color: '#86655A' }}>{k}</span>
                      <span className="text-sm font-medium" style={{ color: '#24140E' }}>{v}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="px-6 py-4" style={{ background: BEIGE }}>
                  <p className="text-center text-sm font-black italic" style={{ color: B }}>
                    "{T("L'avenir à portée de main", 'The future within reach')}"
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══ VALEURS ══════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto">
          <AnimatedSection animation="fadeIn" threshold={0.1} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#24140E' }}>
              {T('Ce en quoi nous croyons', 'What we believe in')}
            </h2>
            <motion.div className="mx-auto h-1 rounded-full"
              initial={{ width: 0 }} whileInView={{ width: 64 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }} style={{ background: B }} aria-hidden="true" />
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-4">
            {VALUES.map(({ emoji, fr, en }, idx) => (
              <motion.div key={fr}
                initial={{ opacity: 0, scale: 0.6, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200, damping: 12 }}
                whileHover={reduced ? {} : { scale: 1.1, rotate: 2, y: -4 }}
                className="flex items-center gap-3 rounded-2xl px-6 py-4 shadow-sm border cursor-default"
                style={{ background: '#fff', borderColor: BORDER }}>
                <motion.span className="text-2xl" aria-hidden="true"
                  animate={reduced ? {} : { rotate: [0, -8, 8, -4, 4, 0] }}
                  transition={{ duration: 2, delay: idx * 0.3 + 1, repeat: Infinity, repeatDelay: 5 }}>
                  {emoji}
                </motion.span>
                <span className="font-black text-base" style={{ color: '#24140E' }}>{T(fr, en)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMMENT ÇA MARCHE ════════════════════════════════════════════════ */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ background: B }}>
        {!reduced && (
          <motion.div className="absolute inset-0 opacity-5"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ background: 'linear-gradient(45deg, transparent 40%, rgba(253,249,247,0.3) 50%, transparent 60%)', backgroundSize: '200% 200%' }}
            aria-hidden="true" />
        )}
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSection animation="fadeIn" threshold={0.1} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: BEIGE }}>
              {T('Comment votre don aide ?', 'How does your donation help?')}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW.map(({ step, fr, en, desc_fr, desc_en }, idx) => (
              <motion.div key={step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduced ? {} : { y: -8, scale: 1.03 }}
                className="rounded-2xl p-6 relative"
                style={{ background: 'rgba(253,249,247,0.1)', border: '1px solid rgba(253,249,247,0.15)' }}>
                <motion.div className="text-5xl font-black mb-4"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 0.4, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 + 0.3, type: 'spring' }}
                  style={{ color: BEIGE }}>{step}</motion.div>
                <h3 className="font-black text-base mb-2" style={{ color: BEIGE }}>{T(fr, en)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(253,249,247,0.7)' }}>
                  {T(desc_fr, desc_en)}
                </p>
                {/* Connecteur entre étapes */}
                {idx < 3 && !reduced && (
                  <motion.div className="hidden lg:block absolute top-8 -right-2.5 w-5 h-0.5 opacity-30"
                    style={{ background: BEIGE }}
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                    transition={{ delay: idx * 0.12 + 0.5, duration: 0.3 }}
                    aria-hidden="true" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TÉMOIGNAGES ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: BEIGE2 }}>
        <div className="max-w-5xl mx-auto">
          <AnimatedSection animation="fadeIn" threshold={0.1} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#24140E' }}>
              {T('Ils ont fondé cette association', 'They founded this association')}
            </h2>
            <motion.div className="mx-auto h-1 rounded-full"
              initial={{ width: 0 }} whileInView={{ width: 64 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }} style={{ background: B }} aria-hidden="true" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { textFr: "Solidarity Impact, c'est une famille. On est venus de France et du Cameroun avec un seul objectif : que les enfants aient une chance.", textEn: "Solidarity Impact is a family. We came from France and Cameroon with one goal: give children a chance.", author: "Florent Landry NWALL", roleFr: "Président & Co-fondateur", roleEn: "President & Co-founder", initials: "FN" },
              { textFr: "Je crois que l'on peut changer les choses, même à petite échelle. Chaque enfant qui va à l'école grâce à nous, c'est une victoire pour tous.", textEn: "I believe we can change things, even on a small scale. Every child who goes to school because of us is a victory for everyone.", author: "Marcel Parfait ATOKO À NDEM", roleFr: "Vice-Président", roleEn: "Vice-President", initials: "MA" },
            ].map(({ textFr, textEn, author, roleFr, roleEn, initials }, idx) => (
              <motion.div key={author}
                initial={{ opacity: 0, y: 30, rotate: idx === 0 ? -1 : 1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                whileHover={reduced ? {} : { y: -6, rotate: idx === 0 ? -0.5 : 0.5 }}
                className="rounded-2xl p-7 border shadow-sm relative overflow-hidden"
                style={{ background: '#fff', borderColor: BORDER }}>
                {/* Guillemet décoratif animé */}
                <motion.div className="absolute top-4 right-5 text-6xl font-black opacity-8 select-none"
                  style={{ color: B, opacity: 0.07, lineHeight: 1 }}
                  animate={reduced ? {} : { scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                  aria-hidden="true">"</motion.div>
                <p className="text-base leading-relaxed mb-6 italic" style={{ color: '#4A2B20' }}>
                  "{T(textFr, textEn)}"
                </p>
                <div className="flex items-center gap-3">
                  <motion.div className="w-11 h-11 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                    style={{ background: B, color: BEIGE }}
                    whileHover={reduced ? {} : { scale: 1.1, rotate: 5 }}>
                    {initials}
                  </motion.div>
                  <div>
                    <p className="font-black text-sm" style={{ color: '#24140E' }}>{author}</p>
                    <p className="text-xs" style={{ color: '#86655A' }}>{T(roleFr, roleEn)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA DON FINAL ════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ background: BEIGE }}>
        <AnimatedSection animation="slideUp" threshold={0.2}>
          <motion.div
            whileHover={reduced ? {} : { scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="max-w-3xl mx-auto rounded-3xl p-10 sm:p-14 text-center shadow-2xl border relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${B} 0%, #4A2B20 100%)`, borderColor: 'rgba(253,249,247,0.2)' }}>
            {/* Shimmer effect */}
            {!reduced && (
              <motion.div className="absolute inset-0 opacity-15"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                style={{ background: 'linear-gradient(90deg, transparent, rgba(253,249,247,0.5), transparent)', width: '40%' }}
                aria-hidden="true" />
            )}
            <div className="relative z-10">
              <motion.div className="flex items-center justify-center gap-2 mb-6 text-3xl"
                animate={reduced ? {} : { scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }} aria-hidden="true">
                <span>🇫🇷</span>
                <motion.span className="text-lg" style={{ color: 'rgba(253,249,247,0.5)' }}
                  animate={reduced ? {} : { opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}>×</motion.span>
                <span>🇨🇲</span>
              </motion.div>
              <h2 className="text-2xl sm:text-4xl font-black mb-4" style={{ color: BEIGE }}>
                {T("Ensemble, changeons des vies", "Together, let's change lives")}
              </h2>
              <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: 'rgba(253,249,247,0.85)' }}>
                {T("Un enfant qui reçoit des fournitures scolaires aujourd'hui peut devenir le médecin ou l'ingénieur de demain. Votre geste compte — vraiment.",
                   "A child who receives school supplies today can become tomorrow's doctor or engineer. Your gesture truly matters.")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                {[10, 25, 50].map((amount, i) => (
                  <motion.div key={amount}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={reduced ? {} : { scale: 1.08, y: -3 }}>
                    <Link href="/don"
                      className="btn-ripple block font-bold text-base px-6 py-3 rounded-xl border-2 transition-all duration-200"
                      style={{ borderColor: 'rgba(253,249,247,0.4)', color: BEIGE, background: 'rgba(253,249,247,0.1)' }}>
                      {amount} €
                    </Link>
                  </motion.div>
                ))}
                <motion.div whileHover={reduced ? {} : { scale: 1.05, y: -3 }}>
                  <Link href="/don"
                    className="btn-ripple block font-black text-base px-8 py-3.5 rounded-xl animate-glow"
                    style={{ background: BEIGE, color: B }}>
                    {T('Autre montant →', 'Custom amount →')}
                  </Link>
                </motion.div>
              </div>
              <p className="text-xs" style={{ color: 'rgba(253,249,247,0.5)' }}>
                {T('✓ Association reconnue · ✓ Impact direct · ✓ Transparence totale',
                   '✓ Recognized association · ✓ Direct impact · ✓ Full transparency')}
              </p>
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ══ PROCHAIN ÉVÉNEMENT ═══════════════════════════════════════════════ */}
      <section className="py-16 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fadeIn" threshold={0.1} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: '#24140E' }}>
              {T('Notre prochain grand rendez-vous', 'Our next big event')}
            </h2>
            <motion.div className="mx-auto h-1 rounded-full"
              initial={{ width: 0 }} whileInView={{ width: 64 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }} style={{ background: B }} aria-hidden="true" />
          </AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={reduced ? {} : { scale: 1.02, y: -4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
            <Link href="/evenements/tournoi-football"
              className="group flex flex-col sm:flex-row items-center gap-6 rounded-3xl p-6 border shadow-md"
              style={{ background: '#fff', borderColor: BORDER }}>
              <div className="flex-shrink-0 w-full sm:w-32 h-28 sm:h-24 rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1F4A2C, #2E7D44)' }}>
                <motion.div animate={reduced ? {} : { rotate: [0, -5, 5, -3, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                  <svg viewBox="0 0 100 70" className="w-24 h-16" aria-hidden="true">
                    <rect x="5" y="5" width="90" height="60" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6"/>
                    <line x1="50" y1="5" x2="50" y2="65" stroke="white" strokeWidth="1.5" opacity="0.6"/>
                    <circle cx="50" cy="35" r="12" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6"/>
                    <text x="50" y="39" textAnchor="middle" fill="white" fontSize="14">⚽</text>
                  </svg>
                </motion.div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <motion.span className="text-xs font-black uppercase px-2 py-0.5 rounded-full"
                    animate={reduced ? {} : { scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ background: '#F2C94C', color: '#170D09' }}>
                    {T('À venir', 'Upcoming')}
                  </motion.span>
                  <span className="text-xs" style={{ color: '#86655A' }}>🗓️ 17 {T('juillet', 'July')} 2027</span>
                </div>
                <h3 className="font-black text-lg" style={{ color: '#24140E' }}>
                  {T('Tournoi de Football — 1ère Édition', 'Football Tournament — 1st Edition')}
                </h3>
                <p className="text-sm mt-1" style={{ color: '#86655A' }}>
                  Villemomble · Île-de-France · {T('Restauration · Musique', 'Food · Music')}
                </p>
              </div>
              <motion.div className="flex-shrink-0 flex items-center gap-2 font-black text-sm px-5 py-2.5 rounded-xl"
                animate={reduced ? {} : { x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ background: B, color: BEIGE }}>
                {T('Voir', 'View')} <ArrowIcon />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

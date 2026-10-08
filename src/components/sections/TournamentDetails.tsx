'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Countdown } from '@/components/ui/Countdown';
import { TeamRegistrationModal } from '@/components/ui/TeamRegistrationModal';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { useI18nContext } from '@/components/providers/I18nProvider';

// Coup d'envoi du tournoi : 17 juillet 2027 à 09h00, heure de Paris (UTC+2 en été).
// Le fuseau explicite garantit le même compte à rebours pour tous les visiteurs.
const TOURNAMENT_DATE = new Date('2027-07-17T09:00:00+02:00');

const B = '#6B3E2E';
const BEIGE = '#FDF9F7';
const BORDER = '#EBDDD4';

const ORGA_CARDS = [
  { icon: '⚽', titleFr: 'Recrutement des équipes',  titleEn: 'Team recruitment',   descFr: 'Les inscriptions sont ouvertes ! Nous recrutons des équipes de 7 à 11 joueurs. Maximum 12 équipes participantes.', descEn: 'Registrations are open! We are recruiting teams of 7 to 11 players. Maximum 12 participating teams.' },
  { icon: '🏟️', titleFr: 'Réservation du stade',     titleEn: 'Stadium booking',    descFr: 'Nous finalisons la réservation du terrain avec vestiaires, tribunes et éclairage. Lieu confirmé prochainement.', descEn: 'We are finalizing the pitch booking with changing rooms, stands and lighting. Venue confirmed soon.' },
  { icon: '🍖', titleFr: 'Stands restauration',       titleEn: 'Food stands',        descFr: 'Organisation en cours des stands de nourriture et boissons : grillades, spécialités camerounaises, boissons fraîches.', descEn: 'Food and drinks stands in preparation: grills, Cameroonian specialties, cold beverages.' },
  { icon: '🏆', titleFr: 'Remise des prix',            titleEn: 'Award ceremony',     descFr: 'Coupes, médailles et prix pour les 3 premières équipes. Un trophée spécial fair-play sera remis.', descEn: 'Cups, medals and prizes for the top 3 teams. A special fair-play trophy will be awarded.' },
  { icon: '🎶', titleFr: 'Animation & musique',        titleEn: 'Entertainment',      descFr: 'DJ, animations et jeux pour toute la famille. Un événement festif qui rassemble les communautés.', descEn: 'DJ, entertainment and games for the whole family. A festive event bringing communities together.' },
  { icon: '📸', titleFr: 'Couverture médiatique',      titleEn: 'Media coverage',     descFr: "Photographe officiel présent toute la journée. Photos disponibles en téléchargement après l'événement.", descEn: 'Official photographer present all day. Photos available for download after the event.' },
];

export function TournamentDetails() {
  const { lang } = useI18nContext();
  const [modalOpen, setModalOpen] = useState(false);
  const tournamentDate = useMemo(() => TOURNAMENT_DATE, []);

  return (
    <div style={{ background: BEIGE }}>

      {/* HERO */}
      <section aria-labelledby="tournament-title"
        className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden py-20 px-4 text-center"
        style={{ background: 'linear-gradient(160deg, #1F4A2C 0%, #2E7D44 35%, #183A23 70%, #0D2014 100%)' }}>
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 500"
          preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect x="40" y="40" width="720" height="420" fill="none" stroke="white" strokeWidth="2"/>
          <line x1="40" y1="250" x2="760" y2="250" stroke="white" strokeWidth="2"/>
          <circle cx="400" cy="250" r="80" fill="none" stroke="white" strokeWidth="2"/>
          <circle cx="400" cy="250" r="4" fill="white"/>
          <rect x="40" y="140" width="160" height="220" fill="none" stroke="white" strokeWidth="2"/>
          <rect x="600" y="140" width="160" height="220" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
        {[0,1,2,3,4,5].map((i) => (
          <motion.div key={i}
            className="absolute text-2xl sm:text-4xl select-none pointer-events-none"
            style={{ opacity: 0.12, left: `${10 + i * 16}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ y: [-8, 8, -8], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            aria-hidden="true">⚽</motion.div>
        ))}
        <AnimatedSection animation="fadeIn">
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 font-semibold text-sm"
            style={{ background: 'rgba(253,249,247,0.15)', border: '1px solid rgba(253,249,247,0.3)', color: BEIGE }}>
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: '#F2C94C' }} aria-hidden="true"/>
            {lang === 'en' ? '🗓️ July 17, 2027 — Villemomble' : '🗓️ 17 Juillet 2027 — Villemomble'}
          </div>
          <h1 id="tournament-title" className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight"
            style={{ color: BEIGE, textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
            {lang === 'en' ? <>SOLIDARITY IMPACT<br /><span style={{ color: '#F2C94C' }}>FOOTBALL TOURNAMENT</span></> : <>TOURNOI DE FOOTBALL<br /><span style={{ color: '#F2C94C' }}>SOLIDARITY IMPACT</span></>}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(253,249,247,0.85)' }}>
            {lang === 'en'
              ? 'The first solidarity football tournament. Teams from Île-de-France compete for the trophy. Food stands, music and prizes await you!'
              : "Le premier tournoi de football solidaire. Des équipes d'Île-de-France s'affrontent pour le trophée. Stands de restauration, musique et lots à gagner !"}
          </p>
        </AnimatedSection>
      </section>

      {/* COUNTDOWN */}
      <section className="py-14 px-4" style={{ background: BEIGE }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#86655A' }}>
            {lang === 'en' ? '⏱️ Time remaining before kick-off' : "⏱️ Temps restant avant le coup d'envoi"}
          </p>
          <h2 className="text-2xl sm:text-3xl font-black mb-10" style={{ color: B }}>
            {lang === 'en' ? 'The tournament starts in…' : 'Le tournoi commence dans…'}
          </h2>
          <Countdown targetDate={tournamentDate} />
          <p className="mt-8 text-sm font-medium" style={{ color: '#86655A' }}>
            {lang === 'en' ? '📍 Villemomble (93250) · 17 July 2027 from 9:00 AM' : '📍 Villemomble (93250) · 17 Juillet 2027 dès 09h00'}
          </p>
        </div>
      </section>

      {/* ORGANISATION */}
      <section className="py-16 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn" threshold={0.1} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: B }}>
              {lang === 'en' ? '🏗️ Tournament Organisation' : '🏗️ Organisation du Tournoi'}
            </h2>
            <div aria-hidden="true" className="mx-auto w-16 h-1 rounded-full mb-4" style={{ background: B }}/>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#86655A' }}>
              {lang === 'en' ? 'Everything is being prepared to offer you an unforgettable day.' : 'Tout est en cours de préparation pour vous offrir une journée inoubliable.'}
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ORGA_CARDS.map(({ icon, titleFr, titleEn, descFr, descEn }, idx) => (
              <AnimatedSection key={titleFr} animation="slideUp" threshold={0.1} delay={idx * 0.07}>
                <div className="rounded-2xl p-6 h-full border transition-shadow hover:shadow-md"
                  style={{ background: '#fff', borderColor: BORDER }}>
                  <div className="text-4xl mb-3" aria-hidden="true">{icon}</div>
                  <h3 className="text-base font-bold mb-2" style={{ color: B }}>{lang === 'en' ? titleEn : titleFr}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A2B20' }}>{lang === 'en' ? descEn : descFr}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME / CALENDRIER */}
      <section className="py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #1F4A2C 0%, #2A6A3E 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <AnimatedSection animation="fadeIn" threshold={0.1} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: BEIGE }}>
              {lang === 'en' ? '📋 Match Schedule' : '📋 Programme de la Journée'}
            </h2>
            <div aria-hidden="true" className="mx-auto w-16 h-1 rounded-full" style={{ background: '#F2C94C' }}/>
          </AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl border"
            style={{ borderColor: 'rgba(253,249,247,0.15)' }}>
            <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 600 320"
              preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="600" height="320" fill="#1F4A2C"/>
              <rect x="20" y="20" width="560" height="280" fill="none" stroke="white" strokeWidth="2"/>
              <line x1="20" y1="160" x2="580" y2="160" stroke="white" strokeWidth="2"/>
              <circle cx="300" cy="160" r="50" fill="none" stroke="white" strokeWidth="2"/>
              <circle cx="300" cy="160" r="3" fill="white"/>
              <rect x="20" y="100" width="100" height="120" fill="none" stroke="white" strokeWidth="2"/>
              <rect x="480" y="100" width="100" height="120" fill="none" stroke="white" strokeWidth="2"/>
            </svg>
            <div className="relative z-10 py-20 px-8 text-center">
              <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block mb-6" aria-hidden="true">
                <span className="text-6xl sm:text-7xl">📅</span>
              </motion.div>
              <h3 className="font-black leading-tight"
                style={{ color: BEIGE, fontSize: 'clamp(1.4rem, 4vw, 2.8rem)', letterSpacing: '0.08em', textShadow: '0 2px 20px rgba(0,0,0,0.5)', whiteSpace: 'pre-line' }}>
                {lang === 'en' ? 'MATCH SCHEDULE\nCOMING SOON' : 'CALENDRIER DE MATCH\nBIENTÔT DISPONIBLE'}
              </h3>
              <p className="mt-6 text-sm sm:text-base font-medium max-w-md mx-auto"
                style={{ color: 'rgba(253,249,247,0.7)' }}>
                {lang === 'en'
                  ? 'The match schedule will be published once all teams are confirmed.'
                  : 'Le calendrier sera publié dès que toutes les équipes seront confirmées.'}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm"
                style={{ background: 'rgba(242,201,76,0.15)', border: '1px solid rgba(242,201,76,0.4)', color: '#F2C94C' }}>
                <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: '#F2C94C' }} aria-hidden="true"/>
                {lang === 'en' ? 'Registrations open — 12 teams max' : 'Inscriptions ouvertes — 12 équipes maximum'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA INSCRIPTION */}
      <section className="py-16 px-4" style={{ background: BEIGE }}>
        <AnimatedSection animation="slideUp" threshold={0.2}>
          <div className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-12 text-center shadow-xl border"
            style={{ background: 'linear-gradient(135deg, #fff 0%, #FBF4EF 100%)', borderColor: BORDER, boxShadow: '0 20px 60px rgba(107,62,46,0.12)' }}>
            <div className="text-6xl mb-4" aria-hidden="true">⚽</div>
            <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: B }}>
              {lang === 'en' ? 'Want to participate?' : 'Envie de participer ?'}
            </h2>
            <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: '#4A2B20' }}>
              {lang === 'en'
                ? 'Register your team now. Places are limited to 12 teams!'
                : 'Inscris ton équipe dès maintenant. Les places sont limitées à 12 équipes !'}
            </p>
            <button type="button" onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-3 font-black text-base px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
              style={{ background: B, color: BEIGE }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5A3426'; }}
              onMouseLeave={e => { e.currentTarget.style.background = B; }}>
              <span className="text-xl" aria-hidden="true">🏆</span>
              {lang === 'en' ? 'Register my team now' : 'Inscrire mon équipe maintenant'}
            </button>
            <p className="mt-6 text-xs font-medium" style={{ color: '#86655A' }}>
              {lang === 'en' ? '✓ Free · ✓ 7 to 11 players · ✓ All levels' : '✓ Gratuit · ✓ 7 à 11 joueurs · ✓ Tous niveaux'}
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* CARTE FLOTTANTE */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: 'easeOut' }}
        className="fixed bottom-6 left-1/2 z-[200] w-[92vw] max-w-sm -translate-x-1/2"
      >
        <button type="button" onClick={() => setModalOpen(true)}
          className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl transition-all duration-200 hover:-translate-y-1"
          style={{ background: B, color: BEIGE, border: '2px solid rgba(253,249,247,0.25)' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#5A3426'; }}
          onMouseLeave={e => { e.currentTarget.style.background = B; }}>
          <span className="text-2xl flex-shrink-0" aria-hidden="true">⚽</span>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-xs font-semibold opacity-75">{lang === 'en' ? 'July 17, 2027' : '17 Juillet 2027'}</span>
            <span className="text-sm font-black">{lang === 'en' ? 'Register your team now →' : 'Inscris ton équipe maintenant →'}</span>
          </div>
          <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: '#F2C94C', color: '#170D09' }}>
            {lang === 'en' ? 'Free' : 'Gratuit'}
          </span>
        </button>
      </motion.div>

      <TeamRegistrationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { useI18nContext } from '@/components/providers/I18nProvider';

const B = '#6B3E2E';
const BEIGE = '#FDF9F7';
const BORDER = '#EBDDD4';

// SVG d'affiche football : terrain vu de dessus avec ballon central
function FootballPosterSVG() {
  return (
    <svg
      viewBox="0 0 400 280"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Fond pelouse */}
      <defs>
        <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#276A3A"/>
          <stop offset="100%" stopColor="#1F5A30"/>
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill="url(#grass)"/>

      {/* Bandes de pelouse */}
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={i*57} y="0" width="28" height="280"
          fill={i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'}/>
      ))}

      {/* Cadre extérieur */}
      <rect x="12" y="12" width="376" height="256" fill="none" stroke="white" strokeWidth="2.5" opacity="0.7"/>

      {/* Ligne médiane */}
      <line x1="200" y1="12" x2="200" y2="268" stroke="white" strokeWidth="2" opacity="0.7"/>

      {/* Cercle central */}
      <circle cx="200" cy="140" r="52" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>
      <circle cx="200" cy="140" r="3.5" fill="white" opacity="0.85"/>

      {/* Surface de réparation gauche */}
      <rect x="12" y="82" width="70" height="116" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>
      {/* Surface de but gauche */}
      <rect x="12" y="108" width="28" height="64" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>

      {/* Surface de réparation droite */}
      <rect x="318" y="82" width="70" height="116" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>
      {/* Surface de but droite */}
      <rect x="360" y="108" width="28" height="64" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>

      {/* Point de penalty gauche */}
      <circle cx="60" cy="140" r="3" fill="white" opacity="0.7"/>
      {/* Point de penalty droit */}
      <circle cx="340" cy="140" r="3" fill="white" opacity="0.7"/>

      {/* Arcs de surface */}
      <path d="M82 104 Q96 140 82 176" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>
      <path d="M318 104 Q304 140 318 176" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>

      {/* Ballon central */}
      <circle cx="200" cy="140" r="22" fill="white" opacity="0.95"/>
      <circle cx="200" cy="140" r="22" fill="none" stroke="#24140E" strokeWidth="1.5"/>

      {/* Pentagones du ballon */}
      <polygon points="200,118 212,126 208,140 192,140 188,126" fill="#1a1a1a" opacity="0.85"/>
      <polygon points="188,126 176,130 174,143 184,151 192,140" fill="#1a1a1a" opacity="0.6"/>
      <polygon points="212,126 224,130 226,143 216,151 208,140" fill="#1a1a1a" opacity="0.6"/>
      <polygon points="184,151 186,162 200,162 214,162 216,151 208,140 192,140" fill="#1a1a1a" opacity="0.4"/>

      {/* Texte SOLIDARITY IMPACT en haut */}
      <text x="200" y="46" textAnchor="middle" fill="#F2C94C"
        fontSize="13" fontWeight="900" fontFamily="system-ui,sans-serif" letterSpacing="3">
        SOLIDARITY IMPACT
      </text>

      {/* Étoiles */}
      {[-60, -30, 0, 30, 60].map((offset, i) => (
        <text key={i} x={200 + offset} y="62" textAnchor="middle"
          fill="#F2C94C" fontSize="8" opacity="0.7">★</text>
      ))}

      {/* TOURNOI DE FOOTBALL */}
      <text x="200" y="232" textAnchor="middle" fill="white"
        fontSize="11" fontWeight="700" fontFamily="system-ui,sans-serif" letterSpacing="1.5">
        TOURNOI DE FOOTBALL
      </text>
      <text x="200" y="250" textAnchor="middle" fill="rgba(253,249,247,0.7)"
        fontSize="9" fontFamily="system-ui,sans-serif" letterSpacing="1">
        17 JUILLET 2026 · VILLEMOMBLE
      </text>
    </svg>
  );
}

export function EventsSection() {
  const { lang } = useI18nContext();

  return (
    <section
      id="events"
      aria-labelledby="events-title"
      className="py-20 px-4"
      style={{ background: BEIGE }}
    >
      <div className="max-w-6xl mx-auto">

        {/* En-tête */}
        <AnimatedSection animation="fadeIn" threshold={0.1} className="text-center mb-14">
          <h2 id="events-title" className="text-3xl sm:text-4xl font-black mb-3"
            style={{ color: B }}>
            {lang === 'en' ? '🗓️ Our Events' : '🗓️ Nos Événements'}
          </h2>
          <div aria-hidden="true" className="mx-auto w-16 h-1 rounded-full mb-4" style={{ background: B }}/>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#86655A' }}>
            {lang === 'en'
              ? 'Discover all the solidarity actions and events organized by Solidarity Impact.'
              : 'Découvrez toutes les actions solidaires et événements organisés par Solidarity Impact.'}
          </p>
        </AnimatedSection>

        {/* Grille d'événements */}
        <AnimatedSection animation="slideUp" threshold={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* ── Carte : Tournoi de football ── */}
            <motion.div
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(107,62,46,0.18)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="rounded-3xl overflow-hidden border flex flex-col"
              style={{
                background: '#fff',
                borderColor: BORDER,
                boxShadow: '0 4px 20px rgba(107,62,46,0.08)',
              }}
            >
              {/* Image affiche football */}
              <div className="relative h-52 overflow-hidden" style={{ background: '#1F4A2C' }}>
                <FootballPosterSVG />

                {/* Badge édition */}
                <div className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-black"
                  style={{ background: '#F2C94C', color: '#170D09' }}>
                  {lang === 'en' ? '1st Edition' : '1ère Édition'}
                </div>

                {/* Badge "À venir" */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: 'rgba(107,62,46,0.9)', color: BEIGE }}>
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#F2C94C' }} aria-hidden="true"/>
                  {lang === 'en' ? 'Upcoming' : 'À venir'}
                </div>
              </div>

              {/* Corps de la carte */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                {/* Méta date */}
                <div className="flex items-center gap-2 text-sm" style={{ color: '#86655A' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <time dateTime="2026-07-17">
                    {lang === 'en' ? 'July 17, 2026 · Villemomble (93250)' : '17 Juillet 2026 · Villemomble (93250)'}
                  </time>
                </div>

                {/* Titre */}
                <h3 className="text-xl sm:text-2xl font-black leading-tight" style={{ color: '#24140E' }}>
                  {lang === 'en' ? 'Football Tournament — 1st Edition' : 'Tournoi de Football — 1ère Édition'}
                </h3>

                {/* Description courte */}
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#4A2B20' }}>
                  {lang === 'en'
                    ? 'The first solidarity football tournament by Solidarity Impact. Teams from Île-de-France compete for the trophy. Food stands, music and prizes await you!'
                    : "Le premier tournoi de football solidaire de l'association. Des équipes d'Île-de-France s'affrontent pour le trophée, avec stands de restauration, musique et lots à gagner !"}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {['⚽ Football', '🏆 Tournoi', '🎉 Festif'].map(tag => (
                    <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: BEIGE, color: B, border: `1px solid ${BORDER}` }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bouton CTA */}
                <Link
                  href="/evenements/tournoi-football"
                  className="mt-2 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-black text-sm transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 group"
                  style={{ background: B, color: BEIGE }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#5A3426'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = B; }}
                >
                  {lang === 'en' ? 'Click here for more details' : 'Cliquer ici pour plus de détails'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* ── Carte placeholder : autres événements à venir ── */}
            <div className="rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-10 text-center col-span-1"
              style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.5)', minHeight: '340px' }}>
              <div className="text-4xl mb-4" aria-hidden="true">🌍</div>
              <h3 className="text-base font-bold mb-2" style={{ color: B }}>
                {lang === 'en' ? 'More events coming soon' : "D'autres événements arrivent bientôt"}
              </h3>
              <p className="text-sm" style={{ color: '#86655A' }}>
                {lang === 'en'
                  ? "Follow us to stay informed about our upcoming solidarity actions."
                  : "Suivez-nous pour être informé de nos prochaines actions solidaires."}
              </p>
            </div>

          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}

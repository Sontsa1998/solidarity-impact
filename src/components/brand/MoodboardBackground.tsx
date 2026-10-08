import Image from 'next/image';

/**
 * Arrière-plan « moodboard » du hero, d'après la planche 2 de la charte
 * graphique (DossierSI_2026V3). Photos extraites dans public/moodboard/.
 *
 * Les logos d'autres marques présents sur la planche sont volontairement exclus.
 * Un voile crème garantit la lisibilité du titre (contraste WCAG).
 */
const PHOTOS = [
  { src: '/moodboard/ville.webp',            className: 'col-span-1 row-span-2' },
  { src: '/moodboard/enfants.webp',          className: 'col-span-1 row-span-1' },
  { src: '/moodboard/mains-liens.webp',      className: 'col-span-1 row-span-1' },
  { src: '/moodboard/cercle-solidaire.webp', className: 'col-span-1 row-span-2' },
  { src: '/moodboard/mont-cameroun.webp',    className: 'col-span-1 row-span-1' },
  { src: '/moodboard/feuillage.webp',        className: 'col-span-1 row-span-1' },
];

export function MoodboardBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Collage : 2 colonnes sur mobile, 4 sur ordinateur */}
      <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-4 grid-rows-4 sm:grid-rows-2 grid-flow-dense gap-1">
        {PHOTOS.map(({ src, className }) => (
          <div key={src} className={`relative overflow-hidden ${className}`}>
            <Image src={src} alt="" fill priority sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover animate-moodboard-zoom" />
          </div>
        ))}
      </div>

      {/* Voile crème : plus dense au centre, derrière le titre */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 65% at 50% 50%, rgba(253,249,247,0.94) 0%, rgba(253,249,247,0.86) 55%, rgba(253,249,247,0.62) 100%)' }} />
      {/* Fondu vers la section suivante */}
      <div className="absolute inset-x-0 bottom-0 h-32"
        style={{ background: 'linear-gradient(to bottom, rgba(253,249,247,0) 0%, #FDF9F7 100%)' }} />
    </div>
  );
}

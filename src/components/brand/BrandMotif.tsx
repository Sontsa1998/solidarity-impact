/**
 * Motif « demi-cercles » de la charte graphique (donnees/Éléments/Demi-cercles.png).
 *
 * Rendu via un masque CSS : la couleur se règle avec la prop `color`
 * (jaune #F2C94C par défaut). Purement décoratif.
 */

interface BrandMotifProps {
  readonly color?: string;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

export function BrandMotif({ color = '#F2C94C', className = '', style }: BrandMotifProps) {
  const mask = 'url(/brand/demi-cercles.png) center / contain no-repeat';
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none block aspect-[2/1] ${className}`}
      style={{ background: color, WebkitMask: mask, mask, ...style }}
    />
  );
}

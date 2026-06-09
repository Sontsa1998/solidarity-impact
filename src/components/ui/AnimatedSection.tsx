'use client';

/**
 * AnimatedSection.tsx — Wrapper générique d'animation basé sur Intersection Observer
 *
 * Déclenche l'animation Framer Motion quand la section entre dans le viewport.
 * Respecte prefers-reduced-motion et rejoue l'animation au changement de langue
 * via la clé animationKey fournie par le contexte i18n.
 *
 * Requirements: 2.8, 12.1, 12.2, 12.3
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getVariants, type AnimationType } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useI18nContext } from '@/components/providers/I18nProvider';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AnimatedSectionProps {
  readonly children: React.ReactNode;
  readonly animation?: AnimationType;
  readonly threshold?: number;  // default: 0.1
  readonly delay?: number;      // delay in seconds, injected into variants
  readonly className?: string;
  readonly id?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * AnimatedSection — Encapsule l'Intersection Observer et les animations Framer Motion.
 *
 * - Animation déclenchée une seule fois quand l'élément entre dans le viewport.
 * - `animationKey` force un re-mount complet à chaque changement de langue,
 *   ce qui rejoue l'animation pour les sections déjà visibles (Requirement 2.8).
 * - Si prefers-reduced-motion est actif, utilise la variante réduite (opacity only).
 * - Le `delay` est injecté dans la transition de la variante `visible` pour
 *   fonctionner correctement avec Framer Motion.
 */
export function AnimatedSection({
  children,
  animation = 'fadeIn',
  threshold = 0.1,
  delay,
  className,
  id,
}: AnimatedSectionProps) {
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { animationKey } = useI18nContext();

  // One-shot Intersection Observer: observe once, set visible, then disconnect
  useEffect(() => {
    // Reset visibility on animationKey change (language switch)
    setIsVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, animationKey]);

  const baseVariants = getVariants(animation, prefersReduced);

  // Inject delay into the visible transition if provided
  const variants =
    delay !== undefined
      ? {
          ...baseVariants,
          visible: {
            ...(baseVariants.visible as object),
            transition: {
              ...((baseVariants.visible as Record<string, unknown>)
                .transition as object | undefined),
              delay,
            },
          },
        }
      : baseVariants;

  return (
    <motion.div
      key={animationKey}
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}

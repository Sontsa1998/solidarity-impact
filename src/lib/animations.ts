import { Variants } from 'framer-motion';

// Animation type union — maps to the available variant objects below
export type AnimationType = 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight';

// ─── Standard animation variants ─────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

// Used as a parent variant to stagger the entrance of child elements
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

// Accessibility — respects prefers-reduced-motion (opacity only, max 200ms)
export const reducedMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

// ─── Variant resolver ─────────────────────────────────────────────────────────

const variantMap: Record<AnimationType, Variants> = {
  fadeIn,
  slideUp,
  slideInLeft,
  slideInRight,
};

/**
 * Returns the appropriate Framer Motion Variants object.
 *
 * @param animation      - One of the four named animation types.
 * @param prefersReduced - When true (prefers-reduced-motion is active),
 *                         returns the reduced-motion variant instead.
 *
 * Validates: Requirements 12.2, 12.3
 */
export function getVariants(
  animation: AnimationType,
  prefersReduced: boolean,
): Variants {
  if (prefersReduced) return reducedMotion;
  return variantMap[animation];
}

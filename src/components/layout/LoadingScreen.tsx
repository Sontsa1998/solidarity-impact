'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ─── Animation variants ────────────────────────────────────────────────────────

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const logoReducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

// Exit animation for the full loading screen overlay
const overlayVariants = {
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
};

const overlayReducedVariants = {
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Component ─────────────────────────────────────────────────────────────────

interface LoadingScreenProps {
  /** Called once the exit animation has finished — lets the parent unmount. */
  onFinished?: () => void;
}

/**
 * LoadingScreen
 *
 * Displays a centred logo with a Framer Motion entrance animation.
 * Automatically hides itself after 3 seconds (setTimeout) and plays an
 * AnimatePresence fade-out exit animation before the main page is revealed.
 *
 * Validates: Requirements 12.6
 */
export function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReduced = useReducedMotion();

  // Force the loading screen to disappear after 3 seconds maximum
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const chosenOverlayVariants = prefersReduced
    ? overlayReducedVariants
    : overlayVariants;

  const chosenLogoVariants = prefersReduced
    ? logoReducedVariants
    : logoVariants;

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {isVisible && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-950"
          variants={chosenOverlayVariants}
          initial="visible"
          animate="visible"
          exit="exit"
          aria-label="Chargement en cours"
          aria-live="polite"
          role="status"
        >
          <motion.div
            variants={chosenLogoVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-4"
          >
            <Image
              src="/logo.png"
              alt="Logo de l'association Solidarity Impact"
              width={120}
              height={120}
              priority
              className="object-contain"
            />

            {/* Subtle pulsing dots to indicate activity */}
            {!prefersReduced && (
              <div className="flex gap-1.5" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-2 w-2 rounded-full bg-primary-500"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

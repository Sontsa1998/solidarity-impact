'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { TeamCard } from '@/components/ui/TeamCard';
import { siteConfig } from '@/content/config';
import { staggerContainer, reducedMotion } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useI18nContext } from '@/components/providers/I18nProvider';

export function TeamSection() {
  const { t } = useI18nContext();
  const prefersReduced = useReducedMotion();

  const containerVariants = prefersReduced ? reducedMotion : staggerContainer;
  const itemVariants = prefersReduced
    ? reducedMotion
    : { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <section id="team" aria-labelledby="team-title"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: '#fdf8f5' }}>
      <div className="mx-auto max-w-6xl">

        <AnimatedSection animation="slideUp" threshold={0.1} className="mb-14 text-center">
          <h2 id="team-title" className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: '#2a1209' }}>
            {t('team.sectionTitle')}
          </h2>
          <div aria-hidden="true" className="mx-auto w-16 h-1 rounded-full mb-4"
            style={{ background: '#7B3F2A' }} />
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9a7060' }}>
            {t('team.sectionSubtitle')}
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {siteConfig.team.map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <TeamCard member={member} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

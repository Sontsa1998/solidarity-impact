'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { TeamMember } from '@/content/config';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TeamCardProps { readonly member: TeamMember; }

export function TeamCard({ member }: TeamCardProps) {
  const { firstName, lastName, role, photoUrl } = member;
  const prefersReduced = useReducedMotion();
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

  const hoverAnimation = prefersReduced ? {} : {
    scale: 1.03,
    boxShadow: '0 16px 36px -6px rgba(46,125,68,0.18), 0 6px 14px -4px rgba(46,125,68,0.10)',
  };

  return (
    <motion.article
      whileHover={hoverAnimation}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex flex-col items-center gap-4 rounded-2xl p-6 shadow-sm border"
      style={{ background: '#fff', borderColor: '#E5E7EB' }}
    >
      {/* Avatar */}
      <div className="relative size-24 shrink-0">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={`Portrait de ${firstName} ${lastName}, ${role}`}
            fill className="rounded-full object-cover object-top" sizes="96px"
          />
        ) : (
          <div
            aria-label={`Portrait de ${firstName} ${lastName}, ${role}`}
            className="flex size-full items-center justify-center rounded-full text-2xl font-bold select-none"
            style={{ background: '#2E7D44', color: '#F7F9F7' }}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Infos */}
      <div className="flex flex-col items-center gap-1 text-center w-full">
        <p className="text-base font-semibold break-words w-full" style={{ color: '#1A1A1A' }}>
          {firstName}{' '}
          <span className="font-bold uppercase tracking-wide">{lastName}</span>
        </p>
        <p className="text-sm break-words w-full" style={{ color: '#6B7280' }}>{role}</p>
      </div>
    </motion.article>
  );
}

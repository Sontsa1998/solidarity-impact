'use client';

import { useEffect, useState } from 'react';

/**
 * ScrollProgressBar — barre de progression fine en haut de page
 * qui indique la progression de lecture.
 */
export function ScrollProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setPct(total > 0 ? Math.round((scrollTop / total) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[3px]"
      style={{ background: 'rgba(123,63,42,0.12)' }}
    >
      <div
        className="h-full transition-none"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #7B3F2A, #c4622e, #7B3F2A)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
          boxShadow: '0 0 8px rgba(123,63,42,0.5)',
        }}
      />
    </div>
  );
}

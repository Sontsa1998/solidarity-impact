'use client';
import { useState, useEffect } from 'react';

/**
 * Détecte la section active dans la page en utilisant IntersectionObserver.
 * Retourne l'id de la section visible à plus de 50%, ou null si aucune.
 *
 * @param sectionIds - Tableau des ids de sections à observer
 * @returns L'id de la section active, ou null
 */
export function useScrollSpy(sectionIds: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

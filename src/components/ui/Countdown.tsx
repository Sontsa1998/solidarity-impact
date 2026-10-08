'use client';

import { useState, useEffect, useRef } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

// ── Calcul du temps restant ───────────────────────────────────────────────────
function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    total:   diff,
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// ── Formatage 2 chiffres ──────────────────────────────────────────────────────
function pad(n: number): string {
  return String(n).padStart(2, '0');
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface CountdownProps {
  targetDate: Date;
}

// ── Composant ─────────────────────────────────────────────────────────────────
export function Countdown({ targetDate }: CountdownProps) {
  // null = pas encore monté (SSR)
  const [time, setTime] = useState<TimeLeft | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Premier calcul immédiat après hydratation
    setTime(calcTimeLeft(targetDate));

    // Mise à jour chaque seconde
    intervalRef.current = setInterval(() => {
      setTime(calcTimeLeft(targetDate));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [targetDate]);

  // ── État SSR / avant hydratation ─────────────────────────────────────────
  if (time === null) {
    return (
      <div className="flex items-center justify-center gap-2 sm:gap-5 flex-wrap py-4">
        {['JJ', 'HH', 'MM', 'SS'].map((label, idx) => (
          <div key={label} className="flex items-center gap-2 sm:gap-5">
            <div className="flex flex-col items-center">
              <div
                className="rounded-2xl px-4 py-3 sm:px-6 sm:py-4 min-w-[80px] sm:min-w-[110px] lg:min-w-[140px] text-center"
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, #FBF4EF 100%)',
                  border: '2px solid #EBDDD4',
                  boxShadow: '0 8px 32px rgba(107,62,46,0.10)',
                }}
              >
                <span className="block text-5xl sm:text-7xl lg:text-8xl font-black leading-none"
                  style={{ color: '#EBDDD4' }}>
                  --
                </span>
              </div>
              <span className="mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: '#D2B8AA' }}>
                {label}
              </span>
            </div>
            {idx < 3 && (
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 select-none"
                style={{ color: '#EBDDD4' }} aria-hidden="true">:</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // ── Tournoi terminé ────────────────────────────────────────────────────────
  if (time.total <= 0) {
    return (
      <div className="py-8 text-center">
        <div className="text-5xl mb-4" aria-hidden="true">🏆</div>
        <p className="text-2xl sm:text-3xl font-black" style={{ color: '#6B3E2E' }}>
          Le tournoi a commencé !
        </p>
      </div>
    );
  }

  // ── Compteur actif ─────────────────────────────────────────────────────────
  const units = [
    { value: time.days,    labelFr: 'Jours',    labelEn: 'Days'    },
    { value: time.hours,   labelFr: 'Heures',   labelEn: 'Hours'   },
    { value: time.minutes, labelFr: 'Minutes',  labelEn: 'Minutes' },
    { value: time.seconds, labelFr: 'Secondes', labelEn: 'Seconds' },
  ];

  return (
    <div
      className="flex items-center justify-center gap-2 sm:gap-5 lg:gap-6 flex-wrap py-4"
      role="timer"
      aria-live="off"
      aria-label={`Compte à rebours : ${time.days} jours, ${time.hours} heures, ${time.minutes} minutes, ${time.seconds} secondes`}
    >
      {units.map(({ value, labelFr }, idx) => (
        <div key={labelFr} className="flex items-center gap-2 sm:gap-5 lg:gap-6">
          <div className="flex flex-col items-center">
            {/* Bloc chiffre */}
            <div
              className="rounded-2xl px-4 py-3 sm:px-6 sm:py-4 min-w-[80px] sm:min-w-[110px] lg:min-w-[140px] text-center"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #FBF4EF 100%)',
                border: '2px solid #EBDDD4',
                boxShadow: '0 8px 32px rgba(107,62,46,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              <span
                className="block text-5xl sm:text-7xl lg:text-8xl font-black leading-none tabular-nums"
                style={{
                  color: '#6B3E2E',
                  textShadow: '0 2px 10px rgba(107,62,46,0.18)',
                  fontVariantNumeric: 'tabular-nums',
                  fontFeatureSettings: '"tnum"',
                }}
              >
                {pad(value)}
              </span>
            </div>
            {/* Label */}
            <span
              className="mt-2 text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-[0.25em]"
              style={{ color: '#86655A' }}
            >
              {labelFr}
            </span>
          </div>

          {/* Séparateur : sauf après le dernier */}
          {idx < 3 && (
            <span
              className="text-3xl sm:text-5xl lg:text-6xl font-black mb-7 select-none"
              style={{ color: '#D2B8AA' }}
              aria-hidden="true"
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

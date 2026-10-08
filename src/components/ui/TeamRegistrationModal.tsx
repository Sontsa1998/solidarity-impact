'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// ── Football pitch SVG background ────────────────────────────────────────────
function FootballPitchBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 600 800"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Fond vert sombre */}
      <rect width="600" height="800" fill="#1F4A2C" />
      {/* Bandes alternées pelouse */}
      {[0, 80, 160, 240, 320, 400, 480, 560, 640, 720].map((y, i) => (
        <rect key={y} x="0" y={y} width="600" height="80"
          fill={i % 2 === 0 ? '#1F4A2C' : '#245635'}
          opacity="0.7"
        />
      ))}
      {/* Ligne de touche extérieure */}
      <rect x="30" y="30" width="540" height="740" fill="none" stroke="white" strokeWidth="2" opacity="0.45"/>
      {/* Ligne médiane */}
      <line x1="30" y1="400" x2="570" y2="400" stroke="white" strokeWidth="2" opacity="0.45"/>
      {/* Cercle central */}
      <circle cx="300" cy="400" r="70" fill="none" stroke="white" strokeWidth="2" opacity="0.45"/>
      {/* Point central */}
      <circle cx="300" cy="400" r="4" fill="white" opacity="0.5"/>
      {/* Surface de réparation haut */}
      <rect x="155" y="30" width="290" height="120" fill="none" stroke="white" strokeWidth="2" opacity="0.45"/>
      {/* Surface de but haut */}
      <rect x="225" y="30" width="150" height="50" fill="none" stroke="white" strokeWidth="2" opacity="0.45"/>
      {/* Arc surface haut */}
      <path d="M 155 150 Q 300 210 445 150" fill="none" stroke="white" strokeWidth="2" opacity="0.45"/>
      {/* Surface de réparation bas */}
      <rect x="155" y="650" width="290" height="120" fill="none" stroke="white" strokeWidth="2" opacity="0.45"/>
      {/* Surface de but bas */}
      <rect x="225" y="720" width="150" height="50" fill="none" stroke="white" strokeWidth="2" opacity="0.45"/>
      {/* Arc surface bas */}
      <path d="M 155 650 Q 300 590 445 650" fill="none" stroke="white" strokeWidth="2" opacity="0.45"/>
      {/* Coins — arcs de cercle */}
      {[
        [30, 30, 0, 90], [570, 30, 90, 180],
        [570, 770, 180, 270], [30, 770, 270, 360],
      ].map(([cx, cy, s, e], i) => {
        const toRad = (d: number) => (d * Math.PI) / 180;
        const x1 = cx + 15 * Math.cos(toRad(s));
        const y1 = cy + 15 * Math.sin(toRad(s));
        const x2 = cx + 15 * Math.cos(toRad(e));
        const y2 = cy + 15 * Math.sin(toRad(e));
        return (
          <path key={i}
            d={`M ${x1} ${y1} A 15 15 0 0 1 ${x2} ${y2}`}
            fill="none" stroke="white" strokeWidth="2" opacity="0.45"
          />
        );
      })}
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface PlayerEntry {
  name: string;
  position: string;
}

interface FormState {
  teamName: string;
  contact: string;
  city: string;
  postalCode: string;
  players: PlayerEntry[];
  logoFile: File | null;
  logoPreview: string | null;
}

const POSITIONS = [
  'Gardien', 'Défenseur central', 'Défenseur latéral droit',
  'Défenseur latéral gauche', 'Milieu défensif', 'Milieu central',
  'Milieu offensif', 'Ailier droit', 'Ailier gauche', 'Attaquant', 'Capitaine',
];

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
    </svg>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
interface TeamRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const B = '#6B3E2E';
const BEIGE = '#FDF9F7';
const BORDER = '#EBDDD4';

const inputStyle = {
  background: 'rgba(255,255,255,0.9)',
  border: `1.5px solid ${BORDER}`,
  borderRadius: '0.5rem',
  padding: '0.6rem 0.875rem',
  color: '#24140E',
  width: '100%',
  outline: 'none',
  fontSize: '0.9rem',
};

export function TeamRegistrationModal({ isOpen, onClose }: TeamRegistrationModalProps) {
  const [form, setForm] = useState<FormState>({
    teamName: '', contact: '', city: '', postalCode: '',
    players: [{ name: '', position: 'Gardien' }],
    logoFile: null, logoPreview: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Focus au premier champ à l'ouverture
  useEffect(() => {
    if (isOpen) setTimeout(() => firstInputRef.current?.focus(), 80);
  }, [isOpen]);

  // Fermeture sur Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setForm(p => ({ ...p, logoFile: file, logoPreview: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }

  function addPlayer() {
    setForm(p => ({ ...p, players: [...p.players, { name: '', position: 'Milieu central' }] }));
  }

  function removePlayer(idx: number) {
    setForm(p => ({ ...p, players: p.players.filter((_, i) => i !== idx) }));
  }

  function updatePlayer(idx: number, field: keyof PlayerEntry, value: string) {
    setForm(p => ({
      ...p,
      players: p.players.map((pl, i) => i === idx ? { ...pl, [field]: value } : pl),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleClose() {
    setSubmitted(false);
    setForm({ teamName: '', contact: '', city: '', postalCode: '', players: [{ name: '', position: 'Gardien' }], logoFile: null, logoPreview: null });
    onClose();
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[9990]"
        style={{ background: 'rgba(23,13,9,0.75)', backdropFilter: 'blur(4px)' }}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog" aria-modal="true" aria-labelledby="modal-title"
        className="fixed inset-0 z-[9991] flex items-center justify-center p-4"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl"
          style={{ pointerEvents: 'all' }}
        >
          {/* Fond stade de football */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <FootballPitchBg />
            {/* Voile semi-transparent pour la lisibilité */}
            <div className="absolute inset-0" style={{ background: 'rgba(253,249,247,0.88)' }} />
          </div>

          {/* Contenu */}
          <div
            className="relative overflow-y-auto max-h-[90vh] scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
          >

            {/* Header */}
            <div className="sticky top-0 z-10 px-6 pt-6 pb-4 flex items-start justify-between"
              style={{ background: 'rgba(253,249,247,0.97)', borderBottom: `1px solid ${BORDER}` }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl" aria-hidden="true">⚽</span>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86655A' }}>
                    Tournoi Solidarity Impact — 17 Juillet 2025
                  </p>
                </div>
                <h2 id="modal-title" className="text-xl sm:text-2xl font-black" style={{ color: B }}>
                  Inscrire mon équipe
                </h2>
              </div>
              <button onClick={handleClose} aria-label="Fermer"
                className="p-2 rounded-full transition-colors flex-shrink-0"
                style={{ color: B, background: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.background = BEIGE; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                <CloseIcon />
              </button>
            </div>

            {/* Formulaire ou succès */}
            {submitted ? (
              <div className="px-6 py-12 text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-black mb-3" style={{ color: B }}>
                  Équipe « {form.teamName} » inscrite !
                </h3>
                <p className="text-base mb-6" style={{ color: '#4A2B20' }}>
                  Votre demande a bien été enregistrée. Notre équipe vous contactera prochainement
                  au <strong>{form.contact}</strong> pour confirmer votre participation.
                </p>
                <button onClick={handleClose}
                  className="px-8 py-3 rounded-xl font-bold text-base transition-colors"
                  style={{ background: B, color: BEIGE }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#5A3426'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = B; }}>
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="px-6 py-6 space-y-6">

                {/* Section informations équipe */}
                <fieldset>
                  <legend className="text-base font-black mb-4 flex items-center gap-2" style={{ color: B }}>
                    <span aria-hidden="true">🛡️</span> Informations de l'équipe
                  </legend>

                  {/* Logo + Nom */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Upload logo */}
                    <button type="button" onClick={() => logoInputRef.current?.click()}
                      className="flex-shrink-0 w-20 h-20 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-colors overflow-hidden"
                      style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.7)' }}
                      aria-label="Charger le logo de l'équipe">
                      {form.logoPreview ? (
                        <Image src={form.logoPreview} alt="Logo équipe" width={80} height={80}
                          className="w-full h-full object-cover rounded-2xl" />
                      ) : (
                        <>
                          <span className="text-2xl" aria-hidden="true">🏅</span>
                          <span className="text-[10px] font-semibold mt-1" style={{ color: '#86655A' }}>Logo</span>
                        </>
                      )}
                    </button>
                    <input ref={logoInputRef} type="file" accept="image/*" className="hidden"
                      onChange={handleLogoChange} aria-label="Choisir un logo d'équipe" />

                    {/* Nom équipe */}
                    <div className="flex-1">
                      <label htmlFor="team-name" className="block text-sm font-bold mb-1.5" style={{ color: '#24140E' }}>
                        Nom de l'équipe <span aria-hidden="true" style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input ref={firstInputRef} id="team-name" type="text" required
                        value={form.teamName} onChange={e => setForm(p => ({ ...p, teamName: e.target.value }))}
                        placeholder="Ex: Les Lions Indomptables"
                        style={inputStyle} />
                    </div>
                  </div>

                  {/* Contact + Ville + CP */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-3">
                      <label htmlFor="team-contact" className="block text-sm font-bold mb-1.5" style={{ color: '#24140E' }}>
                        Numéro de contact <span aria-hidden="true" style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input id="team-contact" type="tel" required
                        value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
                        placeholder="+33 6 XX XX XX XX"
                        style={inputStyle} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="team-city" className="block text-sm font-bold mb-1.5" style={{ color: '#24140E' }}>
                        Ville <span aria-hidden="true" style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input id="team-city" type="text" required
                        value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                        placeholder="Villemomble"
                        style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="team-cp" className="block text-sm font-bold mb-1.5" style={{ color: '#24140E' }}>
                        Code postal <span aria-hidden="true" style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input id="team-cp" type="text" required maxLength={5} pattern="\d{5}"
                        value={form.postalCode} onChange={e => setForm(p => ({ ...p, postalCode: e.target.value }))}
                        placeholder="93250"
                        style={inputStyle} />
                    </div>
                  </div>
                </fieldset>

                {/* Section membres */}
                <fieldset>
                  <legend className="text-base font-black mb-4 flex items-center gap-2" style={{ color: B }}>
                    <span aria-hidden="true">👟</span> Membres de l'équipe
                    <span className="ml-auto text-sm font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: B, color: BEIGE }}>
                      {form.players.length} joueur{form.players.length > 1 ? 's' : ''}
                    </span>
                  </legend>

                  <div className="space-y-3">
                    {form.players.map((player, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.7)', border: `1px solid ${BORDER}` }}>
                        {/* Numéro */}
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                          style={{ background: B, color: BEIGE }}>
                          {idx + 1}
                        </span>

                        {/* Nom */}
                        <input type="text"
                          value={player.name}
                          onChange={e => updatePlayer(idx, 'name', e.target.value)}
                          placeholder={`Joueur ${idx + 1}`}
                          aria-label={`Nom du joueur ${idx + 1}`}
                          style={{ ...inputStyle, flex: 1 }}
                        />

                        {/* Position */}
                        <select
                          value={player.position}
                          onChange={e => updatePlayer(idx, 'position', e.target.value)}
                          aria-label={`Position du joueur ${idx + 1}`}
                          style={{ ...inputStyle, width: 'auto', minWidth: '130px', cursor: 'pointer' }}>
                          {POSITIONS.map(pos => (
                            <option key={pos} value={pos}>{pos}</option>
                          ))}
                        </select>

                        {/* Supprimer (garder au moins 1) */}
                        {form.players.length > 1 && (
                          <button type="button" onClick={() => removePlayer(idx)}
                            aria-label={`Supprimer le joueur ${idx + 1}`}
                            className="flex-shrink-0 p-1.5 rounded-lg transition-colors"
                            style={{ color: '#dc2626' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                            <TrashIcon />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Bouton ajouter joueur */}
                  <button type="button" onClick={addPlayer}
                    className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm border-2 border-dashed transition-all"
                    style={{ borderColor: B, color: B, background: 'transparent' }}
                    onMouseEnter={e => { e.currentTarget.style.background = BEIGE; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                    <PlusIcon />
                    Ajouter un joueur
                  </button>
                </fieldset>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t" style={{ borderColor: BORDER }}>
                  <button type="button" onClick={handleClose}
                    className="flex-1 py-3 rounded-xl font-semibold text-sm border-2 transition-colors"
                    style={{ borderColor: BORDER, color: '#86655A', background: 'transparent' }}
                    onMouseEnter={e => { e.currentTarget.style.background = BEIGE; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                    Annuler
                  </button>
                  <button type="submit"
                    className="flex-[2] py-3 rounded-xl font-black text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    style={{ background: B, color: BEIGE }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#5A3426'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = B; }}>
                    ⚽ Inscrire mon équipe au tournoi
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

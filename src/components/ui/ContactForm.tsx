'use client';

import { useState } from 'react';
import { useI18nContext } from '@/components/providers/I18nProvider';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ContactFormFields {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// ── Constantes de style ───────────────────────────────────────────────────────

const B      = '#6B3E2E';
const BORDER = '#EBDDD4';

const inputBase: React.CSSProperties = {
  background: '#fff',
  color: '#24140E',
  border: `1.5px solid ${BORDER}`,
  borderRadius: '0.5rem',
  padding: '0.625rem 1rem',
  width: '100%',
  outline: 'none',
  transition: 'border-color 200ms',
  fontSize: '1rem',
};

// ── Validation ────────────────────────────────────────────────────────────────

function isValidEmail(email: string) {
  return /^[^@]+@[^.]+\..+$/.test(email);
}

function validateForm(
  fields: ContactFormFields,
  t: (k: string) => string
): ContactFormErrors {
  const e: ContactFormErrors = {};
  if (!fields.fullName.trim())                         e.fullName = t('contact.errors.fullNameRequired');
  if (!fields.email.trim())                            e.email    = t('contact.errors.emailRequired');
  else if (!isValidEmail(fields.email.trim()))         e.email    = t('contact.errors.emailInvalid');
  if (!fields.subject.trim())                          e.subject  = t('contact.errors.subjectRequired');
  if (!fields.message.trim())                          e.message  = t('contact.errors.messageRequired');
  else if (fields.message.trim().length < 10)          e.message  = t('contact.errors.messageTooShort');
  return e;
}

// ── Composant Field — DÉFINI EN DEHORS de ContactForm ────────────────────────
// Important : le définir à l'intérieur de ContactForm provoque un remontage
// à chaque frappe (nouvelle référence de fonction = perte du focus).

interface FieldProps {
  readonly id: string;
  readonly name: keyof ContactFormFields;
  readonly label: string;
  readonly type?: string;
  readonly autoComplete?: string;
  readonly maxLength?: number;
  readonly value: string;
  readonly placeholder: string;
  readonly error?: string;
  readonly errorId: string;
  readonly onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function Field({
  id, name, label, type = 'text', autoComplete,
  maxLength, value, placeholder, error, errorId, onChange,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold" style={{ color: '#24140E' }}>
        {label}{' '}
        <span aria-hidden="true" style={{ color: '#dc2626' }}>*</span>
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        maxLength={maxLength}
        required
        aria-required="true"
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? 'true' : 'false'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ ...inputBase, borderColor: error ? '#dc2626' : BORDER }}
        onFocus={e  => { e.currentTarget.style.borderColor = B; }}
        onBlur={e   => { e.currentTarget.style.borderColor = error ? '#dc2626' : BORDER; }}
      />
      {error && (
        <span id={errorId} role="alert" style={{ color: '#dc2626', fontSize: '0.85rem' }}>
          {error}
        </span>
      )}
    </div>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────

export function ContactForm() {
  const { t } = useI18nContext();

  const [fields, setFields] = useState<ContactFormFields>({
    fullName: '', email: '', subject: '', message: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // Gestionnaire générique pour les <input>
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFields(p => ({ ...p, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(p => ({ ...p, [name]: undefined }));
    }
  }

  // Gestionnaire pour le <textarea>
  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields(p => ({ ...p, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(p => ({ ...p, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateForm(fields, t);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  }

  // ── État succès ──────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div role="status" aria-live="polite" className="rounded-xl border p-8 text-center"
        style={{ background: '#FBF4EF', borderColor: BORDER }}>
        <div className="mb-3 text-4xl" aria-hidden="true">✅</div>
        <p className="text-lg font-semibold" style={{ color: B }}>
          {t('contact.successMessage')}
        </p>
      </div>
    );
  }

  // ── Formulaire ───────────────────────────────────────────────────────────

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={t('contact.sectionTitle')}
      className="flex flex-col gap-5"
    >
      {/* Nom complet */}
      <Field
        id="c-fullName" name="fullName"
        label={t('contact.fields.fullName')}
        autoComplete="name" maxLength={100}
        value={fields.fullName}
        placeholder={t('contact.placeholders.fullName')}
        error={errors.fullName} errorId="c-fullName-err"
        onChange={handleChange}
      />

      {/* Email */}
      <Field
        id="c-email" name="email" type="email"
        label={t('contact.fields.email')}
        autoComplete="email"
        value={fields.email}
        placeholder={t('contact.placeholders.email')}
        error={errors.email} errorId="c-email-err"
        onChange={handleChange}
      />

      {/* Sujet */}
      <Field
        id="c-subject" name="subject"
        label={t('contact.fields.subject')}
        maxLength={150}
        value={fields.subject}
        placeholder={t('contact.placeholders.subject')}
        error={errors.subject} errorId="c-subject-err"
        onChange={handleChange}
      />

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="c-message" className="text-sm font-semibold" style={{ color: '#24140E' }}>
          {t('contact.fields.message')}{' '}
          <span aria-hidden="true" style={{ color: '#dc2626' }}>*</span>
        </label>
        <textarea
          id="c-message" name="message"
          rows={5} minLength={10} maxLength={2000}
          required aria-required="true"
          aria-describedby={errors.message ? 'c-message-err' : undefined}
          aria-invalid={errors.message ? 'true' : 'false'}
          value={fields.message}
          onChange={handleTextareaChange}
          placeholder={t('contact.placeholders.message')}
          style={{
            ...inputBase,
            resize: 'vertical',
            borderColor: errors.message ? '#dc2626' : BORDER,
          }}
          onFocus={e => { e.currentTarget.style.borderColor = B; }}
          onBlur={e  => { e.currentTarget.style.borderColor = errors.message ? '#dc2626' : BORDER; }}
        />
        {errors.message && (
          <span id="c-message-err" role="alert" style={{ color: '#dc2626', fontSize: '0.85rem' }}>
            {errors.message}
          </span>
        )}
      </div>

      {/* Bouton envoyer */}
      <button
        type="submit"
        className="mt-2 w-full rounded-xl font-semibold py-3 px-6 transition-colors duration-200"
        style={{ background: B, color: '#FDF9F7' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#5A3426'; }}
        onMouseLeave={e => { e.currentTarget.style.background = B; }}
      >
        {t('contact.submitButton')}
      </button>
    </form>
  );
}

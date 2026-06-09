'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { ContactForm } from '@/components/ui/ContactForm';
import { useI18nContext } from '@/components/providers/I18nProvider';
import { siteConfig } from '@/content/config';

export function ContactSection() {
  const { t } = useI18nContext();
  const { association, contactInfo } = siteConfig;

  return (
    <section id="contact" aria-labelledby="contact-title"
      className="py-20" style={{ background: '#fdf8f5' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* En-tête */}
        <div className="mb-12 text-center">
          <h2 id="contact-title" className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2a1209' }}>
            {t('contact.sectionTitle')}
          </h2>
          <div aria-hidden="true" className="mx-auto w-16 h-1 rounded-full mb-4" style={{ background: '#7B3F2A' }} />
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9a7060' }}>
            {t('contact.sectionSubtitle')}
          </p>
        </div>

        <AnimatedSection animation="fadeIn" threshold={0.1}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

            {/* Infos de contact */}
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="mb-3 text-lg font-semibold" style={{ color: '#2a1209' }}>
                  {t('contact.addressTitle')}
                </h3>
                <address className="not-italic leading-relaxed" style={{ color: '#562a1c' }}>
                  <span className="block font-medium">{association.name}</span>
                  <span className="block">{association.address}</span>
                  <span className="block">{association.postalCode} {association.city}</span>
                </address>
              </div>

              {contactInfo.email && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold" style={{ color: '#2a1209' }}>Email</h3>
                  <a href={`mailto:${contactInfo.email}`}
                    className="hover:underline break-all transition-colors"
                    style={{ color: '#7B3F2A' }}>
                    {contactInfo.email}
                  </a>
                </div>
              )}

              {contactInfo.phone && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold" style={{ color: '#2a1209' }}>Téléphone</h3>
                  <a href={`tel:${contactInfo.phone}`} className="hover:underline transition-colors"
                    style={{ color: '#7B3F2A' }}>
                    {contactInfo.phone}
                  </a>
                </div>
              )}

              <p className="text-sm italic pl-4 border-l-4" style={{ color: '#9a7060', borderColor: '#e8d5c4' }}>
                {t('footer.legalMention')}
              </p>
            </div>

            {/* Formulaire */}
            <div>
              <ContactForm />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

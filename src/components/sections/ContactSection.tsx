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
      className="py-20" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* En-tête */}
        <div className="mb-12 text-center">
          <h2 id="contact-title" className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#24140E' }}>
            {t('contact.sectionTitle')}
          </h2>
          <div aria-hidden="true" className="mx-auto w-16 h-1 rounded-full mb-4" style={{ background: '#6B3E2E' }} />
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#86655A' }}>
            {t('contact.sectionSubtitle')}
          </p>
        </div>

        <AnimatedSection animation="fadeIn" threshold={0.1}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

            {/* Infos de contact */}
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="mb-3 text-lg font-semibold" style={{ color: '#24140E' }}>
                  {t('contact.addressTitle')}
                </h3>
                <address className="not-italic leading-relaxed" style={{ color: '#4A2B20' }}>
                  <span className="block font-medium">{association.name}</span>
                  <span className="block">{association.address}</span>
                  <span className="block">{association.postalCode} {association.city}</span>
                </address>
              </div>

              {contactInfo.email && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold" style={{ color: '#24140E' }}>Email</h3>
                  <a href={`mailto:${contactInfo.email}`}
                    className="hover:underline break-all transition-colors"
                    style={{ color: '#6B3E2E' }}>
                    {contactInfo.email}
                  </a>
                </div>
              )}

              {contactInfo.phone && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold" style={{ color: '#24140E' }}>Téléphone</h3>
                  <a href={`tel:${contactInfo.phone}`} className="hover:underline transition-colors"
                    style={{ color: '#6B3E2E' }}>
                    {contactInfo.phone}
                  </a>
                </div>
              )}

              <p className="text-sm italic pl-4 border-l-4" style={{ color: '#86655A', borderColor: '#EBDDD4' }}>
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

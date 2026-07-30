import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Politique de confidentialité — Solidarity Impact' };

export default function PolitiqueConfidentialitePage() {
  return (
    <div style={{ background: '#F5EFE6', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#7B3F2A' }}>
          Politique de confidentialité
        </h1>
        <div className="w-16 h-1 rounded-full mb-10" style={{ background: '#7B3F2A' }} aria-hidden="true" />

        <div className="space-y-8">
          {[
            {
              title: 'Collecte des données',
              content: "L'association Solidarity Impact collecte uniquement les données que vous nous fournissez volontairement via le formulaire de contact (nom, email, message). Ces données sont utilisées exclusivement pour répondre à vos demandes.",
            },
            {
              title: 'Cookies',
              content: "Ce site utilise des cookies techniques nécessaires à son bon fonctionnement (préférences de thème, langue) ainsi que des cookies analytiques. Vous pouvez gérer vos préférences depuis la bannière de consentement affichée lors de votre première visite.",
            },
            {
              title: 'Vos droits',
              content: null,
            },
            {
              title: 'Contact DPO',
              content: "Solidarity Impact — Villemomble",
            },
          ].map(({ title, content }) => (
            <section key={title} className="rounded-2xl border p-6 shadow-sm"
              style={{ background: '#fff', borderColor: '#e8d5c4' }}>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#7B3F2A' }}>{title}</h2>
              {title === 'Vos droits' ? (
                <p style={{ color: '#562a1c' }} className="leading-relaxed">
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez-nous à :{' '}
                  <a href="mailto:contact@solidarityimpact.org"
                    style={{ color: '#7B3F2A' }} className="hover:underline">
                    contact@solidarityimpact.org
                  </a>
                </p>
              ) : (
                <p style={{ color: '#562a1c' }} className="leading-relaxed">{content}</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

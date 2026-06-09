import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Mentions légales — Solidarity Impact' };

export default function MentionsLegalesPage() {
  return (
    <div style={{ background: '#F5EFE6', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#7B3F2A' }}>Mentions légales</h1>
        <div className="w-16 h-1 rounded-full mb-10" style={{ background: '#7B3F2A' }} aria-hidden="true" />

        <div className="space-y-10">
          {[
            {
              title: 'Éditeur du site',
              content: (
                <p style={{ color: '#562a1c' }}>
                  <strong>Solidarity Impact</strong><br />
                  Association régie par la loi du 1er juillet 1901<br />
                  Siège social : 89 rue de la Fosse aux Bergers – 93250 Villemomble<br />
                  Date de fondation : 14 septembre 2025<br />
                  Email : <a href="mailto:contact@solidarityimpact.org"
                    style={{ color: '#7B3F2A' }} className="hover:underline">
                    contact@solidarityimpact.org
                  </a>
                </p>
              ),
            },
            {
              title: 'Hébergement',
              content: <p style={{ color: '#562a1c' }}>Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.</p>,
            },
            {
              title: 'Propriété intellectuelle',
              content: <p style={{ color: '#562a1c' }}>L'ensemble des contenus présents sur ce site (textes, images, logos) est la propriété exclusive de l'association Solidarity Impact. Toute reproduction sans autorisation est interdite.</p>,
            },
            {
              title: 'Responsabilité',
              content: <p style={{ color: '#562a1c' }}>L'association Solidarity Impact s'efforce de maintenir les informations de ce site à jour et exactes. Elle ne saurait être tenue responsable des erreurs ou omissions.</p>,
            },
          ].map(({ title, content }) => (
            <section key={title} className="rounded-2xl border p-6 shadow-sm"
              style={{ background: '#fff', borderColor: '#e8d5c4' }}>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#7B3F2A' }}>{title}</h2>
              {content}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

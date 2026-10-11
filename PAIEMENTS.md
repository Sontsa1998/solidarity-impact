# Activer les dons en ligne (Stripe et PayPal)

Ce guide liste ce que l'association doit faire pour que les dons faits sur le site arrivent sur **son compte bancaire**.

Le code est déjà en place. Tant que les clés ci-dessous ne sont pas renseignées, les boutons de paiement affichent un message d'erreur et **aucun argent ne circule**.

---

## 1. Comment ça marche

1. Sur la page **/don**, le donateur choisit un montant (de 1 € à 10 000 €) et clique sur **« Continuer vers le paiement »**.
2. Le site lui propose deux modes de paiement :
   - **Carte bancaire** : il est redirigé vers la page de paiement sécurisée **Stripe Checkout** ;
   - **PayPal** : il est redirigé vers **PayPal** pour se connecter, ou payer par carte via PayPal.
3. Le donateur saisit ses coordonnées **chez Stripe ou chez PayPal**. Elles ne passent jamais par notre site, donc nous n'avons pas de contraintes PCI-DSS à gérer.
4. Une fois le paiement validé, il revient sur **/don/merci**. Cette page vérifie le paiement directement auprès du prestataire avant d'afficher le remerciement.
5. L'argent arrive sur le compte Stripe ou PayPal de l'association, puis est **viré sur son compte bancaire** (voir §4).

S'il annule, le donateur revient sur /don avec le message « Le paiement a été annulé ».

Fichiers concernés :

| Fichier | Rôle |
| --- | --- |
| `src/components/ui/DonationForm.tsx` | Formulaire : montant, puis choix Stripe ou PayPal |
| `src/lib/payments.ts` | Appels serveur aux API Stripe et PayPal |
| `src/app/api/donation/stripe/route.ts` | Crée la session de paiement Stripe |
| `src/app/api/donation/paypal/route.ts` | Crée la commande PayPal |
| `src/app/api/donation/paypal/capture/route.ts` | Encaisse le paiement PayPal au retour du donateur |
| `src/app/don/merci/page.tsx` | Page de remerciement, avec vérification du paiement |

---

## 2. Avant de commencer : les documents à préparer

Stripe comme PayPal vérifient l'identité de l'association (obligation légale de lutte contre le blanchiment). Préparez :

- **SIREN : 105 826 440**, SIRET du siège : 105 826 440 00015
- **N° RNA : W931031771**
- Adresse du siège : 89 rue de la Fosse aux Bergers, 93250 Villemomble
- Les **statuts** signés et le **récépissé de déclaration en préfecture** (ou la publication au JOAFE)
- Le **PV de l'AG constitutive** (14/09/2025) qui désigne le président et le bureau
- La **pièce d'identité** du représentant légal (le président, Florent Landry NWALL), plus ses date de naissance et adresse personnelle
- Le **RIB d'un compte bancaire au nom de l'association**. Les dons ne doivent pas arriver sur un compte personnel.
- Une **adresse e-mail de l'association** (par ex. `contact@solidarityimpact.org`) pour créer les comptes, plutôt qu'une adresse personnelle

> 💡 Créez les comptes avec une adresse e-mail de l'association et activez la **double authentification**. Ainsi, le prochain bureau pourra récupérer l'accès lors d'un changement de président ou de trésorier.

---

## 3. Stripe (paiement par carte bancaire)

### 3.1 Créer et activer le compte

1. Créer un compte sur <https://dashboard.stripe.com/register>, pays **France**.
2. Dans **Paramètres → Profil d'entreprise → Activer les paiements**, choisir :
   - Type d'entreprise : **Association / organisation à but non lucratif**
   - Renseigner le SIREN, l'adresse du siège, le site web (`https://solidarityimpact.org`) et la description de l'activité (« Dons à une association loi 1901 »).
   - Représentant : le président, avec sa pièce d'identité.
   - **Compte bancaire de versement : l'IBAN de l'association.**
3. Dans **Paramètres → Image de marque**, ajouter le logo et les couleurs : ils s'afficheront sur la page de paiement.
4. Dans **Paramètres → Emails clients**, activer l'envoi des **reçus de paiement** au donateur.
5. Optionnel : dans **Paramètres → Moyens de paiement**, activer d'autres moyens (Apple Pay, Google Pay…). Ils apparaîtront automatiquement sur la page Stripe, sans toucher au code.

### 3.2 Récupérer la clé

- **Développeurs → Clés API**
  - **Mode test** : clé secrète `sk_test_…`, pour les essais
  - **Mode production** (disponible une fois le compte activé) : clé secrète `sk_live_…`

👉 Cette clé va dans la variable `STRIPE_SECRET_KEY` (voir §5). Seule la **clé secrète** est nécessaire, pas la clé publiable `pk_…`.

### 3.3 Versements vers la banque

Stripe vire automatiquement les fonds sur l'IBAN de l'association, par défaut tous les jours avec quelques jours de délai pour le premier versement. Le rythme se règle dans **Paramètres → Versements**.

### 3.4 Frais

Stripe prélève une commission sur chaque don, de l'ordre de **1,5 % + 0,25 €** pour une carte européenne standard. Les tarifs réels sont sur <https://stripe.com/fr/pricing>. Il n'y a pas d'abonnement.

---

## 4. PayPal

### 4.1 Créer un compte Professionnel

1. Créer un compte **Professionnel** (pas Personnel) sur <https://www.paypal.com/fr/business>.
2. Type d'entreprise : **Association / organisme à but non lucratif**, avec le SIREN, l'adresse et le représentant légal.
3. **Associer le compte bancaire de l'association** (Portefeuille → Associer une banque) et le confirmer.
4. Envoyer les justificatifs demandés par PayPal (statuts, pièce d'identité…) pour lever les plafonds.
5. 💡 PayPal propose un **tarif réduit pour les associations** : demandez-le au service client PayPal Business avec les statuts et le récépissé de déclaration.

### 4.2 Créer l'application REST et récupérer les clés

1. Se connecter sur <https://developer.paypal.com> avec le compte Professionnel.
2. **Apps & Credentials** :
   - onglet **Sandbox** : créer une application, puis récupérer *Client ID* et *Secret*, pour les essais ;
   - onglet **Live** : créer une application, puis récupérer *Client ID* et *Secret*, pour les vrais dons.
3. Dans l'application, vérifier que la fonctionnalité **Accept payments** est cochée.

👉 Ces valeurs vont dans `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, avec `PAYPAL_ENV=sandbox` ou `live` (voir §5).

### 4.3 Transfert vers la banque

Les dons arrivent sur le **solde PayPal** de l'association. Il faut ensuite les **transférer vers le compte bancaire** depuis PayPal (Portefeuille → Transférer de l'argent), ou activer le transfert automatique s'il est proposé. Pensez à le faire régulièrement, par exemple chaque mois, côté trésorerie.

---

## 5. Mettre les clés sur le site

Les clés **secrètes** ne doivent **jamais** être écrites dans le code ni envoyées sur GitHub. Elles se renseignent dans l'hébergeur.

### En production (Vercel)

1. Vercel → le projet → **Settings → Environment Variables**
2. Ajouter, pour l'environnement **Production** :

| Variable | Valeur |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://solidarityimpact.org` (le vrai domaine du site, sans `/` final) |
| `STRIPE_SECRET_KEY` | `sk_live_…` |
| `PAYPAL_ENV` | `live` |
| `PAYPAL_CLIENT_ID` | Client ID **Live** |
| `PAYPAL_CLIENT_SECRET` | Secret **Live** |

3. Pour l'environnement **Preview**, mettre les clés de **test** (`sk_test_…`, `PAYPAL_ENV=sandbox` et les identifiants Sandbox) : on peut ainsi tester sans débiter de vraie carte.
4. **Redéployer** le site (Deployments → ⋯ → Redeploy) pour que les variables soient prises en compte.

### En local (développement)

```bash
cp .env.example .env.local   # puis remplir avec les clés de TEST
npm run dev
```

`.env.local` est ignoré par git, il ne sera jamais publié.

---

## 6. Tester avant d'ouvrir les dons

Avec les clés de **test** :

- **Stripe** : sur la page de paiement, utiliser la carte `4242 4242 4242 4242`, une date d'expiration future quelconque et un CVC quelconque. Le paiement apparaît dans le Dashboard Stripe en **mode test**. Pour tester le 3-D Secure : `4000 0027 6000 3184`.
- **PayPal** : sur developer.paypal.com → **Sandbox → Accounts**, utiliser le compte *Personal* fictif fourni pour payer. Le don apparaît sur le compte *Business* sandbox.

Points à vérifier :

- [ ] le bouton **Carte bancaire** ouvre la page Stripe avec le bon montant ;
- [ ] le bouton **PayPal** ouvre PayPal avec le bon montant ;
- [ ] après paiement, la page **« Merci pour votre don ! »** s'affiche avec le montant ;
- [ ] en cliquant sur « Retour » ou « Annuler » chez le prestataire, on revient sur /don avec le message d'annulation ;
- [ ] le paiement apparaît dans le Dashboard Stripe ou PayPal.

Une fois tout validé, remplacer les clés de test par les clés **live** (§5), redéployer, puis faire **un vrai don de 1 €** pour contrôler toute la chaîne jusqu'au compte bancaire.

---

## 7. Points d'attention

### Reçus fiscaux (réduction d'impôt de 66 %)
Une association ne peut délivrer des **reçus fiscaux** (formulaire Cerfa n° 11580) que si elle est **d'intérêt général** au sens des articles 200 et 238 bis du Code général des impôts : gestion désintéressée, activité non lucrative, pas de cercle restreint de bénéficiaires. Pour une association qui agit à l'étranger (Cameroun), les conditions sont plus strictes. L'appartenance à l'ESS **ne suffit pas**.

- Tant que ce point n'est pas confirmé, **ne pas promettre de réduction d'impôt** sur le site. Le site n'en mentionne aucune actuellement.
- Pour sécuriser la situation, on peut demander un **rescrit fiscal** au service des impôts des entreprises (SIE).
- Les reçus envoyés par Stripe et PayPal sont des **reçus de paiement**, pas des reçus fiscaux.

### Comptabilité
- Les frais Stripe et PayPal sont déduits des dons : le montant versé sur la banque est donc inférieur au total des dons. Le trésorier peut exporter les relevés (Stripe : *Rapports* ; PayPal : *Activité → Relevés*) pour la comptabilité et l'AG.

### Améliorations possibles (non indispensables)
- **Webhooks** (Stripe `checkout.session.completed`, PayPal `PAYMENT.CAPTURE.COMPLETED`) pour enregistrer chaque don dans une base de données, ou envoyer un e-mail de remerciement personnalisé.
- **Dons mensuels** (abonnement Stripe, abonnement PayPal).
- Reçus fiscaux automatiques, une fois le statut d'intérêt général confirmé.
- Plafond du montant en ligne : 10 000 €, à modifier dans `src/lib/payments.ts` (`MAX_DONATION_EUR`) et `src/lib/donation.ts`.

### Sécurité
- Si une clé secrète a fuité (envoyée par e-mail, publiée sur GitHub…), la **régénérer immédiatement** : Stripe → Clés API → *Renouveler la clé* ; PayPal → l'application → *Secret* → régénérer. Puis mettre à jour Vercel.
- Limiter l'accès aux comptes Stripe et PayPal au président et au(x) trésorier(s), et donner des accès nominatifs : Stripe → *Équipe*, PayPal → *Gestion des utilisateurs*.

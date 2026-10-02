# Mamiratra

**Faisons rayonner ceux qui méritent d’être vus.**

Site officiel du projet Mamiratra, une initiative EJE Labs pour donner de la visibilité aux petits entrepreneurs, artisans, commerces et talents locaux de Madagascar.

Une vitrine éditoriale en français, malagasy et anglais : mission, services, fonctionnement, offres, concepts de portfolio, équipe, expérimentation et contact. Aucun backend, compte utilisateur ou base de données.

## Installation

Prérequis : Node.js 22 ou une version LTS plus récente compatible, et npm.

```bash
git clone https://github.com/rasolofoniaina-lucas/mamiratra.git
cd mamiratra
npm install
npm run dev
```

Depuis ce dossier déjà téléchargé, il suffit de lancer `npm install` puis `npm run dev`. Le nom du dossier peut être `MAMIRATRA` ; adaptez la commande `cd` en conséquence.

Ouvrir [http://localhost:3000](http://localhost:3000). Une première visite arrive sur `/fr` ; un choix explicite de langue est conservé dans le cookie `NEXT_LOCALE`. Le site ne sélectionne pas une langue d’après la géolocalisation ou la langue du navigateur.

## Stack et architecture

- Next.js 16, App Router et React 19.
- TypeScript strict, Tailwind CSS 4, icônes Lucide.
- `next-intl` : routes localisées, traductions typées, rendu statique des trois langues.
- Composants serveur pour le contenu ; JavaScript client limité au menu, aux langues, aux comparaisons et à l’apparition au défilement.
- Photographies locales optimisées avec `next/image` ; police DM Sans hébergée localement.

```text
public/
├── brand/                 # Logos officiels, conservés sans modification
├── images/                # Photos d’illustration remplaçables
│   └── portrait/          # Portraits professionnels de l’équipe
└── fonts/                 # Police locale et licence OFL
src/
├── app/
│   ├── [locale]/          # Mise en page, accueil, 404 et image Open Graph
│   ├── globals.css        # Identité, styles et responsive
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── data/                  # Données métier
├── i18n/                  # Routage, navigation et configuration next-intl
├── lib/                   # Liens de contact et URL publique
├── messages/              # fr.json, mg.json, en.json
└── proxy.ts               # Français par défaut et préférence de langue
scripts/check-content.mjs  # Cohérence des traductions et présence des assets
tests/site.spec.ts         # Vérifications navigateur
Dockerfile
docker-compose.yml
```

## Modification du contenu

Les informations évolutives se trouvent principalement dans `src/data/`. Les textes traduits restent dans `src/messages/` pour conserver les mêmes composants dans chaque langue.

| Modification | Fichier |
| --- | --- |
| Coordonnées, réseaux sociaux, domaine, photo du Hero | `src/data/site.ts` |
| Membres, noms et chemins des portraits | `src/data/team.ts` |
| Services, icônes et images | `src/data/services.ts` |
| Prix, quantités, mise en avant des offres | `src/data/offers.ts` |
| Valeurs et étapes | `src/data/mission.ts` |
| Images et catégories des concepts | `src/data/portfolio.ts` |
| Résultats mesurés de l’expérimentation | `src/data/impact.ts` |
| Titres, descriptions, rôles et boutons | `src/messages/{fr,mg,en}.json` |

Les identifiants des données, tels que `photos`, `boost` ou `lucas`, correspondent aux clés des traductions. Pour ajouter un membre ou un service, ajouter son objet de données, ses textes dans les trois fichiers JSON, puis mettre à jour l’union TypeScript si nécessaire.

Les prix sont exprimés en ariary. Modifier uniquement `price` dans `offers.ts` pour changer un tarif. Les caractéristiques se déduisent des champs `photos`, `reels` et `visuals`. Le champ `featured` pilote le badge « Le plus choisi ».

Les résultats ne sont pas inventés : `0` représente zéro résultat enregistré ; `null` affiche « À venir ». Remplacer ces valeurs par les données réellement mesurées pendant le projet.

### Coordonnées avant publication

Les coordonnées n’ayant pas été fournies, elles sont initialement vides. Compléter `site.contact` dans `src/data/site.ts` :

- `whatsapp` : numéro international réel, avec indicatif pays, par exemple `+261…`.
- `phone` : numéro public réel.
- `email` : adresse publique.
- `facebook` et `instagram` : URL HTTPS complète des profils officiels.

Le bouton WhatsApp apparaît automatiquement dès qu’un numéro valide est renseigné. Sans numéro, la section annonce la disponibilité prochaine ; les boutons d’offres mènent au contact. Aucun lien ne pointe vers un destinataire fictif. Les liens de contact configurés s’affichent automatiquement, et le message WhatsApp est traduit et prérempli avec le pack choisi.

### Images et identité

Les SVG dans `public/brand/` sont ceux fournis par l’équipe : ne pas les remplacer par un logo recréé. La marge transparente du logo est recadrée dans son conteneur, avec conservation de ses proportions. Le slogan intégré aux SVG officiels reste tel que fourni ; le reste du site est traduit.

Remplacer les JPG dans `public/images/`, ou modifier leurs chemins dans les données. Mettre à jour les textes alternatifs correspondants dans les trois langues. Aucune image distante n’est nécessaire à l’exécution. Voahary, Vahatra, Miranto et Lucas utilisent leurs portraits professionnels dans `public/images/portrait/`. Abdi est présenté en dernier, avec la mention « Portrait à venir » tant que sa photo est absente.

Le portfolio est explicitement indiqué comme **concept / démonstration**. Sa vue « Avant » simule une présentation moins travaillée ; sa vue « Avec Mamiratra » illustre une mise en page éditoriale. Ce ne sont ni des shootings clients, ni des résultats réels, ni des témoignages.

### Design et animations

Les tokens sont définis dans `src/app/globals.css` : orange `#F59A4A`, charcoal `#171717`, cream `#FFFDF9`, gris `#6B6B6B`. Une nuance orange plus sombre est utilisée pour les textes sur fond clair afin de respecter les contrastes.

Le loader utilise les fichiers officiels, dure 1,3 seconde au maximum et ne se répète pas dans la même session. Les animations sont désactivées avec `prefers-reduced-motion`. Sans JavaScript, tout le contenu reste visible et les ancres restent utilisables.

## Languages

Le site supporte :

- `/fr` — Français, langue par défaut.
- `/mg` — Malagasy.
- `/en` — English.

Modifier les traductions dans :

```text
src/messages/fr.json
src/messages/mg.json
src/messages/en.json
```

Chaque nouveau texte visible doit être ajouté aux **trois fichiers**, avec la même clé et les mêmes paramètres ICU. `npm run lint` vérifie cette cohérence. Les textes malagasy sont centralisés pour permettre leur relecture par l’équipe sans modifier les composants.

Le sélecteur de langue conserve le chemin, les paramètres d’URL et l’ancre courante. Les sections d’une landing page restent des ancres, par exemple `/fr#services` vers `/mg#services`.

Les metadata, la langue HTML, Open Graph, les canonical et les références `hreflang` sont adaptés à chaque version.

## Build

```bash
npm run lint
npm run build
npm start
```

Le site de production est accessible sur [http://localhost:3000](http://localhost:3000). `npm start` utilise le serveur Next.js normal ; le build Docker active la sortie `standalone` avec `NEXT_OUTPUT_STANDALONE=true`.

Vérification TypeScript supplémentaire :

```bash
npm run typecheck
```

### Vérifications navigateur

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

Playwright démarre le serveur de production automatiquement sur le port 3100. On peut changer ce port avec `PLAYWRIGHT_PORT`. Les tests couvrent les trois langues, les largeurs 320, 375, 390, 430, 768, 1024, 1440 et 1920 px, le menu et son clavier, le changement de langue avec ancre, la préférence mémorisée, le loader, les images, les metadata, les comparaisons, les liens de contact et l’accessibilité avec axe.

Si nécessaire sous Linux, installer les dépendances système du navigateur avec `npx playwright install-deps chromium`.

## Docker

Prérequis : Docker Engine et Docker Compose.

```bash
docker compose up --build
```

Accéder à [http://localhost:3000](http://localhost:3000). Si le port 3000 est déjà occupé, utiliser par exemple `MAMIRATRA_PORT=3101 docker compose up --build` et ouvrir `http://localhost:3101`.

```bash
# Lancer en arrière-plan
docker compose up --build -d

# Voir les journaux
docker compose logs -f

# Arrêter
docker compose down
```

Le Dockerfile utilise plusieurs étapes : dépendances, build, puis exécution `standalone` avec un utilisateur non privilégié. Seuls les fichiers nécessaires au serveur sont copiés dans l’image finale. Un healthcheck vérifie `/fr`.

Compose exécute un **build de production**. Après une modification, relancer `docker compose up --build`. Pour un développement avec rechargement immédiat, utiliser `npm run dev`.

Pour un hébergement autonome avec un domaine, définir l’URL au moment du build :

```bash
NEXT_PUBLIC_SITE_URL=https://votre-domaine.mg docker compose up --build -d
```

## URL publique et environnement

Aucun secret n’est nécessaire. `.env.example` contient uniquement une URL publique optionnelle :

```bash
cp .env.example .env.local
```

Définir `NEXT_PUBLIC_SITE_URL` avec le domaine final pour les canonical, le sitemap et les images de partage. On peut aussi renseigner `site.url`. Sur Vercel, le domaine de production est détecté via `VERCEL_PROJECT_PRODUCTION_URL` si aucune URL n’est fournie. En local, la valeur de repli est `http://localhost:3000`.

Après un changement d’URL publique, refaire le build. Les fichiers `.env*` sont ignorés par Git, sauf `.env.example`.

## Git

Le projet est versionné sur [GitHub](https://github.com/rasolofoniaina-lucas/mamiratra), avec `main` comme branche principale.

Pour les évolutions :

```bash
git checkout -b feat/update-team
# Modifier les données et les traductions
npm run lint
npm run build
git add .
git commit -m "feat: update team information"
git push -u origin feat/update-team
```

Exemples de commits de contenu : `content: update Mamiratra pricing`, `content: improve Malagasy translations`, `content: update experiment results`.

## Déploiement Vercel

1. Pousser le projet sur GitHub ou GitLab.
2. Dans Vercel, créer un projet et importer le dépôt.
3. Conserver le preset **Next.js**, la commande `npm run build` et les paramètres par défaut.
4. Choisir Node.js 22 ou une version LTS compatible.
5. Définir `NEXT_PUBLIC_SITE_URL` si un domaine personnalisé est utilisé.
6. Déployer, puis connecter le domaine dans les paramètres du projet.

Vercel détecte Next.js directement depuis Git. Docker et un fichier `vercel.json` ne sont pas nécessaires. Les prochains pushes déclenchent les builds et les déploiements selon la branche configurée.

## Validation locale

Vérifications réalisées le 29 septembre 2026 : lint sans erreur ni avertissement, build de production, TypeScript strict, sept tests navigateur réussis sur le conteneur Docker et healthcheck Docker valide. Les trois langues ont été vérifiées aux huit largeurs décrites ci-dessus, sans débordement horizontal ni violation WCAG détectée par axe.

Mesure Lighthouse 13.5.0, profil mobile simulé, sur la version de production locale :

| Critère | Score |
| --- | --- |
| Performance | 96 / 100 |
| Accessibilité | 100 / 100 |
| Bonnes pratiques | 100 / 100 |
| SEO | 92 / 100 |

Le LCP mesuré est de 2,7 secondes et le CLS de 0. La pénalité SEO locale vient de l’URL canonical par défaut sur le port 3000, alors que l’aperçu a été testé sur le port 3100, le port 3000 étant déjà occupé. Renseigner l’URL publique réelle avant publication. Ces scores sont une mesure locale, pas une garantie des résultats après déploiement.

## Crédits et ressources

- Identité Mamiratra : fichiers officiels fournis avec le projet.
- DM Sans : [Google Fonts](https://fonts.google.com/specimen/DM+Sans), licence SIL Open Font License fournie dans `public/fonts/OFL.txt`.
- Photos d’illustration : [Unsplash](https://unsplash.com), utilisées conformément à la [licence Unsplash](https://unsplash.com/license). Identifiants des photos conservées localement :
  - `bakery.jpg` : `photo-1509440159596-0249088772ff`.
  - `food.jpg` : `photo-1547592180-85f173990554`.
  - `ceramics.jpg` : `photo-1493106641515-6b5631de4bb9`.
  - `creator.jpg` : `photo-1452860606245-08befc0ff44b`.
- [Documentation Next.js](https://nextjs.org/docs), [next-intl](https://next-intl.dev/docs/routing/setup) et [Docker](https://docs.docker.com/guides/nextjs/).

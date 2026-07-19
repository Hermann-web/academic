# Site personnel académique — Hermann Agossou

Site vitrine de doctorat (module « Digitalisation », FSBM — Université Hassan II de Casablanca),
construit avec [Astro](https://astro.build) et déployé sur GitHub Pages derrière un sous-domaine
personnalisé. L'ancien site personnel (blog MkDocs) vit dans `../blog` et reste en ligne sur
<https://hermann-agossou.com>.

## Pages (cahier des charges)

| Page | Route | Contenu |
| --- | --- | --- |
| Accueil | `/` | Photo, nom, discipline, résumé de profil, navigation |
| CV | `/cv` | PDF intégré + téléchargement (généré depuis `../latex-repo/resume`) |
| Publications | `/publications` | Manuscrits personnels + 14 références Zotero (export `.bib` téléchargeable) |
| Communications & Attestations | `/communications-attestations` | Tableau des communications + 9 attestations PDF |
| Cours & TPs | `/cours-tps` | Enseignements et supports |
| Parcours & Contact | `/parcours-contact` | Biographie, chronologie, profils, formulaire de contact |
| Mentions légales & RGPD | `/mentions-legales` | Données personnelles, licences (CC BY 4.0) |

## Où modifier quoi

- **Identité, liens, e-mail, formulaire Google** : `src/data/site.ts` (source unique).
- **Publications personnelles / communications** : `src/data/works.ts`.
- **Attestations** : `src/data/attestations.ts` **et** le mapping dans `scripts/sync-assets.sh`.
- **Cours & supports** : `src/data/cours.ts` (fichiers dans `public/cours/`).
- **Parcours** : `src/data/parcours.ts`.
- **Références bibliographiques** : ré-exporter la collection Zotero vers
  `docs/zotero-export/COURSDIGIT.bib`, puis `npm run sync`. La page Publications est
  régénérée à partir de ce fichier au build.
- **Design** : jetons dans `src/styles/global.css` (vert pin `#0E6E55` partagé avec le CV LaTeX).

## Mettre à jour le CV

```bash
cd ../latex-repo/resume
./run.sh --type 20        # variante académique ; moteur Tectonic par défaut
cd ../../website
npm run sync              # copie le PDF, les attestations et l'export .bib dans public/
```

## Développement

```bash
npm install
npm run sync     # synchronise les assets publiés (CV, attestations, .bib, photo)
npm run dev      # serveur local
npm run build    # build de production dans dist/
npm run check    # vérification TypeScript/Astro
```

## Déploiement (GitHub Pages + sous-domaine)

1. Pousser sur `main` : `.github/workflows/deploy.yml` construit et publie automatiquement.
2. Dans les réglages du dépôt GitHub : *Settings → Pages → Source : GitHub Actions*.
3. Domaine : `public/CNAME` contient le sous-domaine (actuellement
   `academic.hermann-agossou.com`) et doit rester cohérent avec `site` dans `astro.config.mjs`.
   Chez le registrar, créer un enregistrement `CNAME` du sous-domaine vers
   `<utilisateur>.github.io`, puis activer *Enforce HTTPS* dans les réglages Pages.

## Confidentialité du dépôt

`docs/` contient des documents sources **privés** (rapport de réinscription avec CIN,
date de naissance…). `.gitignore` les exclut ; seuls les fichiers copiés dans `public/`
par `npm run sync` sont publiés. Vérifier avant tout `git add` massif.

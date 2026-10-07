# Rema

Site public de Rema, le journal de rêves pour iPhone développé par Antoine Ghigny.

Le site présente le journal, les récurrences, les bilans hebdomadaires et la réflexion personnelle. Les aperçus interactifs du bilan mensuel et de l'accompagnement par objectifs sont signalés comme fonctions à venir et utilisent des rêves fictifs.

Le lancement sur l'App Store est en préparation. Le contact pour être informé du lancement ouvre la messagerie du visiteur ; aucun compte ni inscription automatique n'est créé.

## Développement

Next.js 16, React, TypeScript, CSS Modules et next-intl 4. Les pages publiques sont générées statiquement en français et en anglais.

```bash
npm ci
npm run dev
npm run build
npm run start
```

Les URLs sont préfixées par `/fr` ou `/en`. La racine redirige vers `/fr`.

- `src/components/rema/` : pages, navigation et démonstrations du produit.
- `messages/rema-fr.json`, `messages/rema-en.json` : textes Rema.
- `src/lib/rema.ts` : contact et métadonnées des pages.
- `public/rema/` : identité de l'app et images de partage.
- `src/app/fonts/` : Newsreader et DM Sans, avec leurs licences OFL.

Les pages de mockups existantes sont conservées. Leurs styles restent distincts du site Rema.

## Publication

Vercel publie automatiquement les commits de `main` sur [antoineghigny.be](https://antoineghigny.be). Le workflow du dépôt reste : branche de travail, PR vers `develop`, puis PR vers `main`.

Les pages légales identifient Antoine Ghigny comme éditeur et distinguent les traitements du site de ceux de l'app. La mesure d'audience et de performance existante est décrite dans la politique de confidentialité.

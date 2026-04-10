# Client Site Intake Framework

Use this reference when the user needs a complete but useful client intake, analysis of real client answers, or a handoff that lets Claude/Codex build a website with minimal follow-up.

Do not send this reference as a raw questionnaire. Use it to select the smallest complete set of questions for the specific client, based on what they already wrote.

## Personalized Client Reply

Use this before any questionnaire when the client already contacted the user. Do not send a generic form-first answer.

### Personalization Inputs

Extract what is available from the first client message:

- what they sell or want to launch/refaire
- who they serve
- what seems blocked
- what they want the site/app to do
- their urgency, doubt, or emotional signal
- exact words that should be echoed

If the client message is thin, be transparent and ask the minimum needed without pretending to know.

### Reply Formula

Do not output this formula verbatim. Use it as a structure, then rewrite it around the actual client message.

```text
[Phrase d'ouverture liee a ce que le client vient d'ecrire.]

Ce que je comprends pour l'instant: [1 phrase specifique sur leur projet, leur offre, leur audience, leur blocage, ou leur objectif].

Pour avancer proprement, vous pouvez me repondre simplement en vrac, en bullet points, avec des liens, une note vocale retranscrite, ou meme avec "je ne sais pas encore" quand ce n'est pas clair.

J'ai surtout besoin de comprendre:
1. [question adaptee a leur offre/projet]
2. [question adaptee a leur audience]
3. [question adaptee au blocage ou a l'objectif]
4. [question adaptee a la conversion attendue]
5. [question adaptee aux assets/contenus/contraintes]

Avec ca, je peux vous renvoyer les premieres pistes de strategie et la suite concrete.
```

### Tone Rules

- Sound like a person who read the message, not a form.
- Use "vous" by default.
- Keep the first answer short if the client is early or unsure.
- Ask more only when the project is complex or already contracted.
- If already contracted, replace sales language with collaboration language: "pour avancer", "pour construire juste", "pour eviter de partir sur une mauvaise hypothese".
- Use one sentence to explain why the questions matter: to understand the offer, the audience, the blocker, and what must be built.
- Never reuse the exact site block "Prochain pas / Demande de projet" as the answer.

## One-Shot Useful Intake

Use this when the user wants enough information to move forward without sending several follow-up emails.

This is not a request to ask everything. It is a request to ask everything that matters for this specific client.

Before outputting a client-facing question, check that it helps at least one of these decisions:

- positioning: understand what makes the client different
- offer: know what to sell and what not to sell
- audience: know who the site must attract or filter out
- conversion: know what action the site should create
- scope: decide landing page, refonte, multi-page site, feature, or handoff
- content/assets: know what can be reused and what is missing
- SEO/AI search: preserve traffic, define page intent, answer real client questions
- technical feasibility: know the current platform, domain, tools, integrations, constraints
- timeline/operations: know urgency, validation process, access, and non-negotiables

If a question does not affect a decision, remove it.

### One-Shot Reply Structure

```text
[Personalized opening based on the client's message.]

Ce que je comprends: [specific summary].

Pour avancer sans partir sur une mauvaise hypothese, envoyez-moi les elements ci-dessous. Vous pouvez repondre en vrac, avec des liens, des captures, ou "je ne sais pas encore".

1. [current site/platform/access question, only if relevant]
2. [offer question]
3. [audience/filtering question]
4. [conversion question]
5. [content/assets/proof question]
6. [SEO/current traffic/existing page question, if relevant]
7. [style/reference question]
8. [deadline/constraint question]

Avec ca, je pourrai [specific next step: recommend landing vs refonte, prepare strategy, estimate scope, build brief, etc.].
```

Keep it personal. Merge related questions when possible. A good intake email feels like 6-10 precise questions chosen for the client, not a 40-question audit.

## Fast Intake

Use this when the user wants a short version that still captures the minimum needed.

1. Que vendez-vous, en une phrase simple ?
2. A qui le vendez-vous exactement ?
3. Quel probleme votre client essaie-t-il de resoudre ?
4. Qu'est-ce qui bloque aujourd'hui dans votre site, votre offre, votre acquisition, ou votre message ?
5. Quelle action voulez-vous que le site declenche ? Exemple: appel, devis, achat, inscription, candidature, demande d'audit.
6. Pourquoi un client devrait-il vous choisir vous plutot qu'une alternative ?
7. Quelle offre, page, produit, service, ou preuve doit absolument etre mis en avant ?
8. Avez-vous deja du contenu, un site actuel, des visuels, des avis, des chiffres, ou des references ?
9. Quel style ou ressenti voulez-vous ? Quel style voulez-vous eviter ?
10. Y a-t-il une deadline, un budget, une contrainte technique, ou un outil obligatoire ?

## Selection Question Bank

Use this as a bank of possible questions for automated forms, deep analysis, or build-ready handoffs. Do not send it as-is to the client. Select and rewrite the relevant questions based on the first message, the project type, and what is still missing.

### 1. Contexte

- Nom de l'entreprise/projet.
- Site actuel, reseaux, supports existants.
- Activite en une phrase.
- Stade du projet: lancement, refonte, repositionnement, nouvelle offre, scale, autre.
- Pourquoi maintenant ?
- Qu'est-ce qui doit changer apres ce projet ?

### 2. Offre

- Que vendez-vous exactement ?
- Quelles offres/services/produits doivent etre visibles ?
- Quelle offre est prioritaire ?
- Quel est le prix ou la fourchette si c'est public ou utile pour qualifier ?
- Qu'est-ce qui est inclus/exclu ?
- Quels types de clients ne voulez-vous pas attirer ?
- Quelles objections reviennent souvent avant l'achat ?

### 3. Audience

- A qui s'adresse l'offre ?
- Quel est le niveau de maturite du client ideal ?
- Quel probleme concret l'amene a chercher une solution ?
- Qu'a-t-il deja essaye ?
- Qu'est-ce qu'il craint ?
- Qu'est-ce qui le ferait dire "c'est exactement pour moi" ?
- Qui decide et qui influence la decision ?

### 4. Difference

- Pourquoi vous plutot qu'un concurrent, une agence, un freelance, un outil, ou ne rien faire ?
- Qu'est-ce que vos clients comprennent mal au depart ?
- Quelle conviction forte guide votre approche ?
- Quelle promesse pouvez-vous tenir sans sur-vendre ?
- Qu'est-ce qui rend votre methode, experience, vitesse, gout, processus, ou resultat different ?
- Qu'est-ce que le site ne doit surtout pas raconter ?

### 5. Preuves

- Avis clients, resultats, chiffres, captures, logos, cas clients.
- Exemples de projets ou transformations.
- Garanties, certifications, diplome, experience, methode.
- Photos, videos, demonstrations, avant/apres.
- Ce qui peut etre publie et ce qui doit rester prive.

### 6. Objectif de Conversion

- Action principale attendue.
- Actions secondaires.
- Ce qui doit se passer apres l'envoi d'un formulaire.
- Critere d'un bon lead.
- Informations necessaires pour qualifier un lead.
- Objections a traiter avant le CTA.
- Mesure du succes: leads, ventes, appels, inscriptions, clarte, recrutement, image, autre.

### 7. Perimetre Site

- Type de projet: landing page, site vitrine, e-commerce, app, portail, refonte, autre.
- Pages indispensables.
- Sections indispensables par page.
- Fonctionnalites: formulaire, calendrier, paiement, espace membre, blog, CMS, portfolio, filtres, multilingue, analytics, tracking.
- Contenu dynamique ou statique.
- Besoin d'administration par le client.
- SEO local, SEO contenu, ou SEO minimal.

### 8. Contenu et Assets

- Textes disponibles.
- Photos/illustrations/videos disponibles.
- Brand assets: logo, couleurs, typos, charte.
- Liens vers Drive/Notion/Figma/site existant.
- Contenu a reutiliser tel quel.
- Contenu a reecrire.
- Elements manquants que le client doit fournir.

### 9. Direction Visuelle

- Trois mots pour decrire le ressenti voulu.
- Trois mots a eviter.
- Sites ou marques de reference, avec ce qui plait precisement.
- Sites ou marques a eviter, avec ce qui derange.
- Niveau de sobriete vs expressivite.
- Importance des photos humaines, produit, 3D, video, illustrations, typographie.
- Contraintes d'accessibilite, lisibilite, ou secteur.

### 10. Technique et Operations

- Stack existante si elle existe.
- Hebergement/domaine actuel.
- Outils obligatoires: CMS, CRM, email, paiement, calendrier, analytics, tracking, newsletter.
- Integrations souhaitees.
- Acces disponibles.
- Contraintes legales: RGPD, cookies, mentions, secteur reglemente.
- Langues, regions, devises.
- Maintenance attendue apres livraison.

### 11. Contraintes

- Deadline.
- Budget ou enveloppe si partageable.
- Niveau d'urgence.
- Decisionnaires.
- Processus de validation.
- Elements non-negociables.
- Risques connus.

### 12. Automation

- Canal d'entree: formulaire site, email, Typeform/Tally, Notion form, CRM, autre.
- Destination des reponses: email, Notion, Sheets, Airtable, CRM, ticket.
- Statuts: recu, a lire, piste envoyee, call propose, en attente client, pret a builder, refuse.
- Auto-reponse client.
- Rappel si aucune reponse.
- Generation automatique d'un brief interne.
- Generation automatique d'une checklist assets.

## SEO and AI Search Intake

Use this section when the project involves a new site, refonte, landing page, local visibility, Google visibility, AI search visibility, content strategy, or migration.

Ask only what matters for the project stage. Do not turn the first client reply into an SEO audit unless the user asks for one.

### Client Questions

- Quelle zone geographique compte vraiment ? Local, Belgique, France, international, ville precise, service area ?
- Quels services/offres doivent etre trouvables sur Google ou via les moteurs de recherche IA ?
- Quels mots vos clients utilisent deja pour parler du probleme ? Garder les mots exacts.
- Y a-t-il des pages, articles, cas clients, guides, ou FAQ existants qui attirent deja du trafic ?
- Avez-vous deja une Google Business Profile, des avis Google, ou une strategie locale ?
- Avez-vous des concurrents ou alternatives que vos clients comparent souvent ?
- Y a-t-il des pages existantes a ne pas casser, garder, rediriger, ou reecrire ?
- Est-ce que le site actuel a deja du trafic ou des positions connues ? Si oui, demander Search Console/Analytics ou une capture, sans inventer.
- Quelles questions reviennent souvent avant qu'un client vous contacte ?
- Quels elements de preuve peuvent aider la confiance : avis, cas clients, resultats, logos, photos, certifications, process ?

### SEO Requirements For Handoff

Always include when building:

- primary search intent by page
- suggested title/meta description direction, without pretending they are final if copy is missing
- H1/H2 structure direction
- internal linking opportunities
- image alt-text direction based on real assets
- schema.org candidates: LocalBusiness, ProfessionalService, Service, WebPage, FAQPage, Product, BreadcrumbList, Article, Organization, depending on the project
- canonical, sitemap, robots, OpenGraph, Twitter Card expectations
- performance/Core Web Vitals expectation
- mobile readability expectation
- redirect notes for refontes or migrations
- content gaps that block quality SEO
- AI search notes: direct answer sections, FAQ, definitions, clear service pages, proof, author/entity clarity

If current SEO data is unavailable, write `A confirmer` instead of inventing traffic, rankings, or keyword volume.

## First AI Prompt Quality Bar

The first prompt given to Claude/Codex/Gemini should be complete enough that the user has minimal edits to do after generation.

Include:

- client context and exact words worth preserving
- business goal and conversion goal
- target audience and non-target audience
- offer hierarchy
- what is blocked today
- page type recommendation: landing page, refonte, multi-page site, or `a confirmer`
- technical platform and constraints if known
- content and asset inventory
- SEO/AI search requirements
- copy tone and words to avoid
- visual direction and references if available
- Gemini MCP note when design/frontend will be generated through Gemini
- assumptions and open questions
- acceptance criteria

### Prompt Template

```text
Tu vas m'aider a transformer ce brief client en [site/landing/refonte] pret a produire.

Contexte client:
- Activite:
- Offre prioritaire:
- Audience:
- Blocage actuel:
- Conversion principale:
- Mots exacts a preserver:

Decision produit:
- Type recommande: [landing/refonte/site multi-page/a confirmer]
- Raison:
- Hors scope:

SEO / AI search:
- Intentions de recherche par page:
- Zone geographique:
- Pages a garder/rediriger:
- Metadata direction:
- Schema.org candidats:
- FAQ ou reponses directes a prevoir:
- Donnees manquantes:

Copy:
- Ton:
- Promesse prudente:
- Objections a traiter:
- Mots/formulations a eviter:

Design / Gemini MCP:
- Ressenti:
- References:
- Assets disponibles:
- Assets manquants:
- Contraintes du repo:
- Si Gemini MCP est utilise, produire un brief design complet avant tout code UI et respecter les instructions locales du projet.

Contraintes:
- Stack/plateforme:
- Integrations:
- Legal/RGPD:
- Performance/accessibilite:

Acceptance criteria:
- Le site explique vite ce qui est vendu, pour qui, et pourquoi c'est different.
- Le parcours mene clairement vers [CTA].
- Le SEO repose sur le contenu reel et les mots client, sans inventer de chiffres ou de positions.
- Les preuves disponibles sont utilisees sans sur-vendre.
- Les informations manquantes sont marquees TODO ou A confirmer.
```

## Analysis Method

When client answers are provided, produce this sequence:

1. Summarize the project in 5 lines.
2. Extract exact client words worth preserving.
3. Identify the strongest positioning angle.
4. Identify blockers and risks.
5. Identify what is ready to build.
6. List missing critical facts only.
7. Produce recommended next step.

Use this missing-info policy:

- `Bloquant`: cannot build responsibly without it.
- `Important`: build can start with an assumption, but confirm soon.
- `Optionnel`: improve quality, but do not block.

## Build-Ready Brief Schema

```markdown
# Brief build-ready - [Projet]

## Decision rapide
[1-3 phrases: ce qu'on construit, pour qui, dans quel but.]

## Mots exacts du client
- "[verbatim]"

## Interpretation strategique
- Offre:
- Audience:
- Probleme:
- Difference:
- Blocage actuel:
- Conversion principale:

## Hypothese de positionnement
[Angle principal et raison.]

## Scope
- Type:
- Pages:
- Fonctionnalites:
- Integrations:
- Hors scope:

## Parcours utilisateur
1. Arrivee:
2. Comprehension:
3. Preuve:
4. Objection:
5. Action:

## Plan des pages
### [Page]
- Objectif:
- Sections:
- CTA:
- Contenu requis:

## Direction copy
- Ton:
- Promesse prudente:
- Messages a repeter:
- Objections a traiter:
- Mots/formulations a eviter:

## Direction visuelle
- Ressenti:
- References:
- A eviter:
- Assets disponibles:
- Assets manquants:

## Contraintes techniques
- Stack:
- CMS/admin:
- Domaine/hebergement:
- Tracking/analytics:
- Legal/RGPD:
- Performance/accessibilite:

## SEO / AI search
- Intention de recherche principale:
- Pages SEO importantes:
- Zone geographique:
- Title/meta direction:
- Structure H1/H2:
- Donnees structurees:
- FAQ/reponses directes:
- Redirects/canonical/sitemap/robots:
- Contenu manquant:
- A confirmer:

## Donnees et contenu
- Fourni:
- A creer:
- A confirmer:

## Risques et decisions
- Risques:
- Decisions prises:
- Decisions a confirmer:

## Acceptance criteria
- [ ] Le site explique en moins de 10 secondes ce qui est vendu et pour qui.
- [ ] Le CTA principal est clair et present aux moments cles.
- [ ] Les objections principales sont traitees avant la demande de contact.
- [ ] Les preuves disponibles sont integrees sans inventer de chiffres.
- [ ] Les contraintes techniques et legales connues sont respectees.

## Prompt Claude/Codex
Tu vas construire [type de site] pour [client/audience]. Objectif principal: [conversion]. Respecte le brief ci-dessus, preserve les mots exacts du client quand ils portent le positionnement, n'invente pas de preuves, chiffres, rankings SEO, volumes de recherche, ou contraintes techniques. Integre les exigences SEO/AI search, marque les informations manquantes comme TODO/A confirmer, et suis les instructions locales du repo avant toute modification UI/frontend. Si Gemini MCP est utilise pour le design/frontend, prepare le brief design complet et passe par Gemini conformement aux instructions du repo.
```

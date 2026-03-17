# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js 16 + Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
```

No test framework is configured.

## Git Workflow

Never commit directly to `main`. Always create a feature branch from `develop`, then open a PR targeting `develop`.

```
feature/xxx  →  PR  →  develop  →  PR  →  main
```

- `main` = production (deployed on Vercel)
- `develop` = integration branch
- Feature branches: `feature/description`, `fix/description`, etc.

## Architecture

Bilingual (FR/EN) static landing page for Antoine Ghigny's digital creation services. Deployed on Vercel.

**Stack:** Next.js 16 (App Router, SSG), TypeScript, Tailwind CSS 3, Framer Motion, next-intl 4.

### i18n (next-intl)

- Locales: `fr` (default), `en` — always prefixed in URLs (`/fr/`, `/en/`)
- Translation files: `messages/fr.json`, `messages/en.json`
- Routing config: `src/i18n/navigation.ts` (Link, redirect, useRouter, usePathname)
- Server translations: `src/i18n/request.ts`
- Middleware: `src/middleware.ts` — locale detection disabled, respects defaultLocale
- In components: `useTranslations("namespace")` client-side, `getTranslations()` server-side

### Routing

```
src/app/[locale]/
├── layout.tsx       # Fonts, metadata (async params), Providers
├── page.tsx         # Landing: HeroAndWhy + WhyMeSection + ContactFooter
├── legal/page.tsx   # Legal mentions (client component)
└── privacy/page.tsx # Privacy policy (client component)
```

Root `page.tsx` redirects to `/[locale]`. All pages are statically generated via `generateStaticParams`.

**Important:** Next.js 16 requires `params` to be awaited (`const { locale } = await params`), not destructured directly.

### Components

```
src/components/
├── Providers.tsx         # NextIntlClientProvider + LazyMotion (Framer)
├── LocaleSwitcher.tsx    # FR/EN toggle
├── JsonLd.tsx            # Schema.org structured data
└── landing/
    ├── HeroAndWhy.tsx    # Hero + animated browser mockup dashboard
    ├── WhyMeSection.tsx  # Bento grid (4 service cards + collaboration)
    └── ContactFooter.tsx # Contact CTA + footer
```

### Design System (Warm Asymmetric)

- Background: `#FAF8F5` — Text: `#2D2926` — Accent: `#B34B44`
- Fonts: Geist Sans + Geist Mono (local WOFF in `src/app/fonts/`)
- Icons: `@phosphor-icons/react` (primary), `lucide-react` (secondary)
- Translation strings support `<highlight>` tags for accent-colored emphasis in bento cards

### SEO

Full metadata per locale (OpenGraph, Twitter Card, canonical URLs, robots, sitemap, JSON-LD). Configured in `[locale]/layout.tsx` generateMetadata.

### Path alias

`@/*` maps to `./src/*` (tsconfig).

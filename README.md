# Zubkivskiy — Portfolio

Bilingual (EN/UA) portfolio and CV for **Bohdan Zubkivskiy** — frontend developer & AI automation specialist, Chernihiv, Ukraine.

Live at <https://zubkovskiy.github.io/Portfolio/>

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · CSS Modules · `lucide-react` · `zod`

The site builds to a fully static export, so it runs on any file host.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000/en
```

| Script              | Does                        |
| ------------------- | --------------------------- |
| `npm run dev`       | Dev server with hot reload  |
| `npm run build`     | Static export into `out/`   |
| `npm run typecheck` | `tsc --noEmit`              |
| `npm run lint`      | ESLint                      |
| `npm run check`     | Typecheck + lint            |

`next dev` reads `.env` and serves from the domain root. `npm run build` also reads `.env.production`, which is the GitHub Pages configuration.

## Structure

```
src/
├── app/
│   ├── [lang]/          Locale segment — also the root layout
│   │   └── cv/          Print-ready A4 CV
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── ui/              Primitives (Button, Card, Tag…)
│   ├── layout/          NavBar, Footer, Logo, Section, LanguageSwitch
│   ├── sections/        One file per page section
│   └── fx/              Page-wide effects (boot, cursor, canvas…)
├── hooks/
├── lib/
│   ├── i18n/            Locale config + typed EN/UA dictionaries
│   ├── site.ts          Contact details, socials, CV files
│   └── …
└── styles/
    ├── tokens/          colors · typography · spacing · effects
    ├── animations.css   Every keyframe, in one place
    └── globals.css

public/
├── cv/                  The downloadable CV, one PDF per locale
└── index.html           `/` → `/en` or `/ua` from navigator.language
```

| To change…                      | Edit                                                     |
| ------------------------------- | -------------------------------------------------------- |
| Any text, in either language    | `src/lib/i18n/dictionaries/{en,ua}.ts`                    |
| Email, phone, social links      | `src/lib/site.ts`                                         |
| The downloadable CV             | Replace the PDF in `public/cv/`, keeping the filename     |
| Colours, spacing, radii, motion | `src/styles/tokens/`                                      |
| A section's layout              | `src/components/sections/<Name>.tsx` + its `.module.css`  |

Both dictionaries are typed as `Dictionary` (`src/lib/i18n/types.ts`), so adding a string to one language and forgetting the other is a compile error rather than a blank spot on the page.

> [!IMPORTANT]
> Inside a `.module.css` file, reference a keyframe through its `--kf-*` variable, never by its bare name:
>
> ```css
> animation: var(--kf-pulse-glow) 2s ease-in-out infinite;   /* runs      */
> animation: pulse-glow 2s ease-in-out infinite;             /* dead code */
> ```
>
> CSS Modules rewrites animation names as local identifiers, so the bare form compiles to a keyframe that does not exist and the animation silently never plays. Keyframes and their variables both live in `src/styles/animations.css`; global stylesheets and inline `style` objects can use the bare name.

## Localisation

Every page lives under a locale segment — `/en`, `/ua` — and both are pre-rendered, cross-linked with `hreflang` and listed in the sitemap. `public/index.html` forwards the bare root to one of them based on `navigator.language`.

The URL segment is `ua`, while `<html lang>` and `hreflang` use the correct `uk`. That mapping lives in `LOCALE_META`.

## Contact form

The form posts straight to Formspree from the browser, validated against the zod schema in `src/lib/contact-schema.ts` first. A filled honeypot field is answered with the success state and dropped.

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/<id>   # the id alone works too
```

Without the variable the form falls back to a pre-filled `mailto:` link, as it does when a request fails.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`: typecheck, lint, build, then push `out/` to the `gh-pages` branch. Two things that branch depends on:

- **`projects/` is preserved.** The standalone demos the portfolio links to are hosted on `gh-pages` and are not built from this repository, so the deploy clears everything else and leaves that directory alone.
- **`.nojekyll` is written into the output.** Without it Pages runs the site through Jekyll, which discards every directory starting with an underscore — `_next` included.

Configuration lives in `.env.production`; a repository variable of the same name overrides it.

| Variable                         | Purpose                                                 |
| -------------------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | Canonical URLs, `hreflang`, sitemap and `robots.txt`     |
| `NEXT_PUBLIC_BASE_PATH`          | Sub-path the site is served from — `/Portfolio` on Pages |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Contact form delivery                                    |

To serve from a domain root instead, clear `NEXT_PUBLIC_BASE_PATH` and point `NEXT_PUBLIC_SITE_URL` at the new origin.

# Zubkivskiy — Portfolio

Bilingual (EN/UA) portfolio and CV for **Bohdan Zubkivskiy** — frontend developer & AI automation specialist, Chernihiv, Ukraine.

Built from the Zubkivskiy design system: near-black surfaces, a single lime accent (`#A2FF01`), Unbounded + Inter type, and purposeful motion.

---

## Stack

| Layer      | Choice                                        | Why                                                                     |
| ---------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| Framework  | Next.js 15 (App Router) + React 19            | Static pre-rendering per locale, real URLs for EN/UA, exports to plain files |
| Language   | TypeScript, `strict` + `noUncheckedIndexedAccess` | The content dictionary is type-enforced across both languages        |
| Styling    | CSS Modules + design tokens                   | Zero runtime cost; hover/focus stay in CSS, not React state              |
| Icons      | `lucide-react`                                | Tree-shaken per icon instead of a ~400 KB CDN bundle                     |
| Fonts      | `next/font/google`                            | Self-hosted at build time — no CDN request, no render-blocking `@import` |
| Validation | `zod`                                         | The contact form is checked before anything leaves the page              |

No CSS framework, no animation library, no state manager — the design system is token-based and the motion is CSS-driven, so neither would have earned its bytes.

---

## Getting started

```bash
npm install
npm run dev                  # http://localhost:3000/en
```

`next dev` reads `.env`, so it runs without a base path at the domain root. `npm run build` reads `.env.production` on top of it and produces the GitHub Pages build in `out/`.

| Script              | Does                                          |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                    |
| `npm run build`     | Static export into `out/`                     |
| `npm run typecheck` | `tsc --noEmit`                                |
| `npm run lint`      | ESLint                                        |
| `npm run check`     | Typecheck + lint — run this before committing |

---

## Structure

```
src/
├── app/
│   ├── [lang]/                  # Locale segment — also the root layout
│   │   ├── layout.tsx           # <html lang>, fonts, metadata, boot script
│   │   ├── page.tsx             # Portfolio page (server component)
│   │   ├── PersonJsonLd.tsx     # schema.org Person markup
│   │   ├── not-found.tsx
│   │   └── cv/                  # Print-ready A4 CV
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── ui/                      # Design-system primitives (Button, Card, Tag…)
│   ├── layout/                  # NavBar, Footer, Logo, Section, LanguageSwitch
│   ├── sections/                # One file per page section + SVG diagrams
│   └── fx/                      # Page-wide effects (boot, cursor, canvas…)
│
├── hooks/                       # Reveal, parallax, tilt, count-up, konami…
├── lib/
│   ├── i18n/                    # Locale config + typed EN/UA dictionaries
│   ├── site.ts                  # Contact details, socials — single source of truth
│   ├── fonts.ts
│   ├── scroll-manager.ts        # Shared rAF-throttled scroll subscription
│   ├── contact-schema.ts
│   └── utils.ts
│
└── styles/
    ├── tokens/                  # colors · typography · spacing · effects
    ├── animations.css           # Every keyframe, in one place
    └── globals.css              # Reset, focus, utilities, reduced-motion

public/
├── cv/                          # The downloadable CV, one PDF per locale
└── index.html                   # `/` → `/en` or `/ua` from navigator.language
```

### Where to change things

> [!IMPORTANT]
> **Adding an animation inside a `.module.css` file?** Reference the keyframe
> through its `--kf-*` variable, never by its bare name:
>
> ```css
> animation: var(--kf-pulse-glow) 2s ease-in-out infinite;   /* ✅ runs      */
> animation: pulse-glow 2s ease-in-out infinite;             /* ❌ dead code */
> ```
>
> CSS Modules rewrites animation names as local identifiers, so the bare form
> compiles to `About_pulse-glow__hash` — a keyframe that does not exist — and
> the animation silently never plays. Keyframes and their `--kf-*` variables
> both live in `src/styles/animations.css`. Global stylesheets and inline
> `style` objects can use the bare name.

| To change…                     | Edit                                             |
| ------------------------------ | ------------------------------------------------ |
| Any text, in either language   | `src/lib/i18n/dictionaries/{en,ua}.ts`           |
| Email, phone, social links     | `src/lib/site.ts`                                |
| The downloadable CV            | Replace the PDF in `public/cv/` (keep the filename) |
| Colours, spacing, radii, motion | `src/styles/tokens/`                            |
| A section's layout             | `src/components/sections/<Name>.tsx` + its `.module.css` |

Both dictionaries are typed as `Dictionary` (`src/lib/i18n/types.ts`), so adding a string to one language and forgetting the other is a **compile error**, not a blank spot on the page.

---

## i18n

Every page lives under a locale segment: `/en`, `/ua`, `/en/cv`, `/ua/cv`. Middleware redirects `/` using `Accept-Language`.

Both locales are pre-rendered at build time, cross-linked with `hreflang`, and listed in the sitemap — so each language is a real, indexable URL rather than a client-side toggle. The language switch is a `<Link>`, which means Next prefetches the other locale on hover.

Note: the URL segment is `ua` (matching the original design), while `<html lang>` and `hreflang` correctly use `uk`. That mapping lives in `LOCALE_META`.

---

## Contact form

The site is a static export with no backend, so the form posts straight to **Formspree** from the browser. Before anything is sent it is validated against the zod schema in `src/lib/contact-schema.ts`, and a filled honeypot field is answered with the success state and quietly dropped.

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/<id>   # the id alone works too
```

That value is public by definition — `NEXT_PUBLIC_*` is inlined into the bundle every visitor downloads — so it lives in `.env.production` rather than in a secret. Formspree endpoints are designed to be posted to from the browser and carry their own spam controls.

**Without the variable the form still works.** It falls back to a pre-filled `mailto:` link — so the form is never a dead end, and it never silently swallows a message. The same fallback appears when the request itself fails.

---

## Performance notes

What changed relative to the design export, and why:

- **Hover state moved from React to CSS.** The design-system components tracked `hover`/`active` in `useState`, so moving the pointer across the page re-rendered component subtrees. Now it is `:hover` in a CSS Module — zero renders.
- **One scroll listener for the page.** `lib/scroll-manager.ts` measures scroll position once per frame and broadcasts it. The export attached a listener per effect, each re-reading `scrollHeight`/`clientHeight` independently — several forced layouts per scroll frame.
- **Progress bars animate `transform: scaleX()`**, not `width`, so they never trigger layout.
- **Fonts are self-hosted** by `next/font` instead of a Google Fonts `@import`, removing a render-blocking cross-origin request.
- **Icons are bundled per-use** via `lucide-react`, replacing the CDN UMD build plus a `lucide.createIcons()` DOM sweep on every update.
- **The background canvas batches its lines.** Link opacities are quantised into six buckets and stroked as one `Path2D` each, instead of a `beginPath`/`stroke` pair per line. It also stops entirely when the tab is hidden and uses fewer nodes on touch devices.
- **The custom cursor parks its rAF loop** once the pointer settles, so an idle tab costs nothing.
- **Canvas, cursor and easter egg load after hydration** (`next/dynamic`, `ssr: false`) and stay out of the critical bundle.

### Deliberate non-optimisations

`content-visibility: auto` on sections was tried and removed. It skips off-screen rendering, but its estimated placeholder heights make in-page anchor jumps land in the wrong place — and this site's entire navigation is anchor links.

---

## Accessibility & resilience

- Reduced motion is honoured through one global `@media` block plus per-hook checks; no effect opts out individually.
- The scroll-reveal hidden state is scoped to `html[data-js]` and backed by a 4 s failsafe, so a JavaScript failure shows the content instead of a blank page.
- Stat counters render their **final** value on the server and reset to zero in a layout effect before paint — the HTML never ships a `0` that depends on JS to become correct.
- Skip link, `:focus-visible` rings, real `<label for>` bindings, `aria-current` on the active nav item, and a keyboard-operable listbox for the interest field.
- The custom cursor only activates on fine pointers.

---

## Deployment

The site builds to a fully static export (`output: 'export'`) and is published to **GitHub Pages** at <https://zubkovskiy.github.io/Portfolio/>. Pushing to `master` runs `.github/workflows/deploy.yml`, which typechecks, lints, builds and pushes `out/` to the `gh-pages` branch.

Two details that branch depends on:

- **`projects/` is preserved.** The standalone project demos the portfolio links to are hosted on `gh-pages` itself and are not built from this repository, so the deploy step clears everything else and leaves that directory alone.
- **`.nojekyll` is written into the output.** Without it Pages runs the site through Jekyll, which discards every directory starting with an underscore — `_next` included.

Build-time configuration lives in `.env.production`; a repository variable of the same name overrides it.

| Variable                         | Purpose                                                      |
| -------------------------------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`           | Canonical URLs, `hreflang`, sitemap and `robots.txt`          |
| `NEXT_PUBLIC_BASE_PATH`          | Sub-path the site is served from — `/Portfolio` on Pages      |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Contact form delivery                                         |

Serving from a domain root instead? Clear `NEXT_PUBLIC_BASE_PATH` and point `NEXT_PUBLIC_SITE_URL` at the new origin; nothing else changes.

Because the host only serves files, the security headers this project used to set in `next.config.ts` are gone — a static host cannot send them. Behaviour that used to need a server was replaced rather than dropped: the locale redirect moved to `public/index.html`, and the contact form talks to Formspree directly.

---

## Content status

Some content is deliberately unfinished and labelled as such in the UI rather than filled with plausible-looking fiction:

- Certificates — titles, issuers and scans are placeholders.
- Projects — two placeholder case studies, no stock screenshots.
- The 2023 internship company name.
- Social links in `src/lib/site.ts` still point at `#`.

Drop real images into `public/` and pass their path to `<ImageSlot src="…" />` to fill the slots.

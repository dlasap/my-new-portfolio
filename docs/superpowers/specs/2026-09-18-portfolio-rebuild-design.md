# Portfolio Rebuild — Design Spec

**Date:** 2026-09-18
**Owner:** Dominic Gabriel Lasap
**Status:** Approved for planning

---

## 1. Problem

The portfolio at `dlasap-portfolio.vercel.app` no longer represents the engineer it describes.

**Content is roughly two years stale.** The resume dated 2026 leads with PaddleBag (a consumer product designed, built, and launched solo, now serving real users) and a current UK role at Childcare Marketing. Neither appears on the site. The site's strongest technical stories — tracing a runaway infrastructure cost spike to a single network ASN in edge logs, designing a search path that serves anonymous visitors at zero backend cost, running a cohort retention analysis that redirected a product roadmap — appear on no webpage anywhere.

**The stack caps the stated SEO goal.** The site is Create React App (`react-scripts` 5.0.1, deprecated) rendering entirely client-side. The served HTML is an empty shell; `react-helmet` writes meta tags only after hydration, so link previews on LinkedIn, X, and Slack resolve to nothing and indexing depends on the crawler executing JavaScript.

**Specific defects carried by the current build:**

- Homepage embeds the superseded `DominicLasap-Resume.pdf` in a fixed 700px `<iframe>` — unusable on mobile
- `/articles` ships two placeholder stubs ("Content of article 1", `picsum.photos` images) that are indexable and listed for crawling
- ~30 third-party CDN logo images load render-blocking from `cdnjs`/`cdnlogo`
- Google Fonts imported via render-blocking `@import` in CSS
- All eight projects render at once on the homepage; none has its own URL
- A scroll-driven logo resize recomputes layout on every scroll event
- Project copy is written in a diary voice ("Overall, I greatly enjoyed working here") that reads junior against the resume's own prose

**Goal:** a portfolio that is accurate, ranks, loads fast, reads senior, and makes contact effortless — hiring-first, freelance-second.

---

## 2. Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 16, App Router** | Static HTML at build → real SEO and link previews. Also the exact stack the resume claims, so the artifact is its own evidence. |
| Language | **TypeScript, strict** | Claimed on the resume; must be demonstrated. |
| Styling | **Tailwind CSS v4** | On the resume; CSS-first `@theme` tokens keep spacing/motion consistent. Existing hand-rolled CSS does not survive the redesign. |
| Audience | **Hiring-first, freelance-second** | Resume says "Open to Remote"; contract lane served by a toggle, not a separate funnel. |
| Visual direction | **Aurora Editorial** | Near-black, drifting color light, gradient accent on the key phrase, generous whitespace. Premium and calm. |
| Homepage structure | **Hybrid** | Proof numbers inside the hero, flagship in screen two, per-project pages beneath. |
| Blog | **Removed** | Stubs are thin content and an active liability. Fewer strong pages beat more weak ones. |
| Projects | **Curated to 5–6** | Thin entries move into the experience timeline where they read as progression. |
| Contact | **Server action → Resend, + booking link** | Best UX; the action itself is a portfolio detail. |
| Domain | **`vercel.app` for now** | Everything reads `NEXT_PUBLIC_SITE_URL`; swapping later is one variable. |
| Execution | **In-place migration on a branch** | Preserves git history, Vercel project, GA4 ID, Google verification token. `main` stays live throughout. |

**Scope note:** this is a rewrite, not a refactor. Everything under `src/` is deleted. What carries forward: `public/` images, the analytics and verification IDs, and the resume content.

---

## 3. Architecture

```
app/
  layout.tsx                        fonts, theme, JSON-LD Person, analytics
  page.tsx                          home (static)
  work/page.tsx                     project index
  work/[slug]/page.tsx              case study — generateStaticParams
  work/[slug]/opengraph-image.tsx   per-project share card
  about/page.tsx
  contact/page.tsx
  actions/contact.ts                "use server"
  sitemap.ts
  robots.ts
  opengraph-image.tsx               site-wide share card
  not-found.tsx
content/
  profile.ts        identity, socials, availability, headline copy
  projects.ts       Project[] — the single source of truth
  experience.ts     Role[] — full-time and contract
  stack.ts          grouped by layer
components/
  ui/               Button, Card, Badge, Section, Pill
  sections/         Hero, Flagship, WorkGrid, Timeline, Stack, About, Contact
  motion/           Reveal, AuroraField
lib/
  seo.ts            metadata builders
  rate-limit.ts     in-memory IP limiter for the contact action
```

Every page is statically generated. No client-side data fetching, so crawlers receive complete HTML on first byte.

### Content model

```ts
type Project = {
  slug: string              // URL segment, unique
  title: string
  role: string              // "Founder & Full-Stack Engineer"
  org: string
  period: string
  featured: boolean
  summary: string           // card + meta description
  problem: string           // case study: what was wrong
  decisions: Decision[]     // case study: what was chosen and why
  outcome: string           // case study: what resulted
  stack: string[]           // keys into stack.ts
  screenshots: Screenshot[] // { src, alt, caption }
  liveUrl?: string
}
```

The homepage grid, `/work`, each `/work/[slug]`, `sitemap.ts`, and every OG card derive from this one array. Adding a project updates six surfaces. This is the structural fix for the drift that produced the current stale site: content lives in one typed place instead of being hand-written into JSX across many files.

---

## 4. Homepage

| # | Section | Contents |
|---|---|---|
| 01 | **Hero** | Availability pill, headline with gradient phrase, subhead, thin numbers row (`5+ yrs · 3 countries · 1 solo product`), CTAs: *See my work* / *Download résumé*. Aurora field behind. |
| 02 | **Flagship — PaddleBag** | One strong visual, three decision callouts (ASN cost-spike trace, near-zero-load search architecture, RLS-enforced authorization), link to the live app and the full case study. |
| 03 | **Selected work** | 5–6 cards, each linking to its own page; hover reveals stack. |
| 04 | **Experience timeline** | Full-time and contract, expandable rows. Home for Filinvest, 1ClickDesign, DNA Micro. |
| 05 | **Stack** | Grouped by layer, mirroring the resume's own grouping. Local SVGs only. |
| 06 | **About** | Photo, first-person paragraph, résumé download (`Dominic_Lasap_Resume.pdf`). |
| 07 | **Contact** | Hiring/project toggle, form, booking link, direct channels. |

### Featured projects

PaddleBag · Childcare Marketing CRM · AI Shorts · LendingStandard · RCM AI app · Business Templates Builder.

Folded into the timeline instead: GoRentals/DNA Micro, Filinvest, 1ClickDesign. ("GoRentals" currently mislabels the DNA Micro training story under a client's name; the timeline is the honest home for it.)

### Copy

All project descriptions are rewritten to lead with problem and decision, in the register the resume already uses. The current diary voice is replaced throughout.

---

## 5. SEO

- Per-route `generateMetadata`: title, description, canonical, OpenGraph, Twitter card
- JSON-LD `Person` schema in the root layout, `sameAs` → GitHub, LinkedIn, PaddleBag — the signal that feeds a knowledge panel for the name
- `opengraph-image.tsx` at site and project level, rendered at build
- `sitemap.ts` generated from the content model; `robots.ts` replaces the static file
- **301 redirects:** `/projects` → `/work`, `/articles` → `/`, `/article/*` → `/`, `/contact` retained. Preserves existing indexed URLs.
- One `h1` per page, semantic heading hierarchy, descriptive alt text on every screenshot
- Existing Google site-verification token and GA4 ID carried over unchanged

---

## 6. Motion and accessibility

Motion is CSS-first: scroll reveals via a single `IntersectionObserver` with staggered `transition-delay`; the aurora field is three blurred orbs on slow GPU-composited transforms, no JS animation loop. No animation library in the critical path.

- `prefers-reduced-motion: reduce` freezes the aurora and makes reveals instant
- Keyboard navigable throughout, visible focus rings
- ARIA on timeline disclosure rows and on form error association
- WCAG AA contrast verified — on a dark theme with gradient text this needs explicit checking, and gradient never carries meaning alone
- Every interactive target ≥ 44px on touch

---

## 7. Performance

**Targets:** Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO. LCP < 2.0s on simulated 4G mobile. CLS < 0.05.

- `next/image` with AVIF/WebP on all screenshots (currently unoptimized PNGs)
- `next/font` self-hosting with `display: swap` — removes the render-blocking Google Fonts request
- Zero third-party render-blocking requests; the ~30 CDN logo images are replaced with local SVGs
- Mobile-first at every breakpoint. The 700px resume `<iframe>` and the scroll-resize logo are removed.

---

## 8. Contact flow

```
form → server action
  → zod validation
  → honeypot check
  → per-IP rate limit
  → resend.emails.send({ to: lasapdominic@gmail.com })
```

States: `idle → submitting → success → error`, each with explicit copy. On Resend failure the error surfaces the email address directly, so a failed send never becomes a lost opportunity. The form works without JavaScript via progressive enhancement. Field-level validation errors are associated to inputs for screen readers.

**External dependencies, both pending from the owner and neither blocking:** a Resend API key (`RESEND_API_KEY`) and a cal.com booking link. The form degrades gracefully to direct channels until the key exists.

---

## 9. Testing

**Vitest**
- Content-model invariants: slugs unique, required fields present, every referenced screenshot exists on disk, every `stack[]` key resolves in `stack.ts`
- Contact action: each validation branch, honeypot rejection, rate-limit behavior, Resend-failure path

**Playwright** — one smoke path: home renders → navigate to a project page → contact form validates and reports errors.

Both frameworks appear on the resume; the suite doubles as evidence.

---

## 10. Out of scope

No blog, no CMS, no light/dark toggle (Aurora is dark by design), no i18n, no custom-domain DNS work beyond reading `NEXT_PUBLIC_SITE_URL`, no changes to the PaddleBag product itself.

---

## 11. Acceptance criteria

1. `curl` of any route returns fully-rendered HTML containing the page's real content and meta tags
2. Every featured project resolves at its own `/work/<slug>` URL with a unique title, description, and OG image
3. Lighthouse mobile ≥ 95 on all four categories
4. All old indexed URLs either resolve or 301 — no new 404s
5. Contact form delivers to `lasapdominic@gmail.com`, and fails visibly with a fallback when it cannot
6. Site is fully usable by keyboard and at 375px width
7. Zero content on the site contradicts the resume
8. `npm run build`, Vitest, and Playwright all pass

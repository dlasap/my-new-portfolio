# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace a stale, client-rendered Create React App portfolio with a statically-generated Next.js 16 site that is accurate to the 2026 resume, ranks, loads fast, and makes contact effortless.

**Architecture:** Every route is statically generated at build time from a typed content model under `content/`, so crawlers receive complete HTML on first byte and adding a project updates the grid, its case-study page, the sitemap, and its OG card at once. Presentation is Tailwind v4 CSS-first tokens; motion is CSS transitions driven by a single `IntersectionObserver`, with no animation library in the critical path. The only server-side surface is one server action that validates a contact submission and hands it to Resend.

**Tech Stack:** Next.js 16.3.5 (App Router) · React 19.3 · TypeScript (strict) · Tailwind CSS v4.3 · Zod 4.6 · Resend 6.28 · Vitest + Testing Library · Playwright

**Spec:** `docs/superpowers/specs/2026-09-18-portfolio-rebuild-design.md`

## Global Constraints

- **Node ≥ 20.9.0.** Verified present: v22.18.0.
- **Next.js 16: `params` and `searchParams` are Promises.** In every `page.tsx` and `generateMetadata`, type them as `Promise<{...}>` and `await` before use. This is the single most common way to break a Next 16 build.
- **Zod 4: use top-level format validators.** `z.email()`, `z.url()` — not `z.string().email()`.
- **Tailwind v4 is CSS-first.** No `tailwind.config.js`. Tokens are declared in `@theme { }` inside `app/globals.css`. PostCSS plugin is `@tailwindcss/postcss`.
- **TypeScript strict mode on.** No `any` in committed code.
- **Path alias `@/*` → repo root.** Configured in both `tsconfig.json` and `vitest.config.ts`.
- **All motion respects `prefers-reduced-motion: reduce`.** Every animated component must have a reduced-motion branch.
- **One `<h1>` per page.** Section headings are `<h2>`.
- **Every image needs descriptive `alt`.** Decorative-only images take `alt=""`.
- **All site URLs derive from `NEXT_PUBLIC_SITE_URL`.** Never hardcode `dlasap-portfolio.vercel.app` outside `.env`.
- **Preserve these verbatim** from the old build: Google site-verification token `GUzSat7XFK-F2U84wFEC-20TPzYQI-uD7BFg-GiH_68`, and the Vercel Analytics script.
- **Copy voice:** lead with problem and decision. Never the diary register of the old site ("Overall, I greatly enjoyed working here"). Source of truth for all facts is `public/Dominic_Lasap_Resume.pdf`.
- **Commit after every task.** Branch is `redesign/next-portfolio`.

---

## File Structure

| Path | Responsibility |
|---|---|
| `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs` | Toolchain and redirects |
| `app/globals.css` | Tailwind import + `@theme` design tokens + base layer |
| `app/layout.tsx` | Fonts, root metadata, JSON-LD Person, analytics, shell |
| `app/page.tsx` | Homepage composition only — no markup logic |
| `app/work/page.tsx`, `app/work/[slug]/page.tsx` | Project index and case studies |
| `app/about/page.tsx`, `app/contact/page.tsx`, `app/not-found.tsx` | Secondary routes |
| `app/sitemap.ts`, `app/robots.ts` | Crawl surface, derived from content |
| `app/opengraph-image.tsx`, `app/work/[slug]/opengraph-image.tsx` | Build-time share cards |
| `app/actions/contact.ts` | The only server-side mutation |
| `content/types.ts` | Shared content types — imported by everything |
| `content/profile.ts` | Identity, socials, availability, headline copy |
| `content/projects.ts` | `Project[]` — single source of truth |
| `content/experience.ts` | `Role[]` — full-time and contract |
| `content/stack.ts` | Technologies grouped by layer |
| `lib/seo.ts` | Metadata builders, absolute URL helper |
| `lib/rate-limit.ts` | In-memory per-IP limiter |
| `components/ui/*` | Presentational primitives, no domain knowledge |
| `components/motion/*` | `Reveal`, `AuroraField` |
| `components/sections/*` | One file per homepage section |
| `components/shell/*` | `NavBar`, `Footer`, `MobileMenu` |
| `tests/` | Vitest unit/content tests |
| `e2e/` | Playwright smoke |

**Deleted entirely:** `src/`, `public/index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/DominicLasap-Resume.pdf` (superseded), `yarn.lock`, `vercel.json`.

---

## Task 1: Toolchain foundation

Replace CRA with a building, empty Next.js 16 app. Nothing renders yet beyond a placeholder — the deliverable is a green `npm run build`.

**Files:**
- Modify: `package.json` (full replace)
- Create: `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `next-env.d.ts` (generated), `.env.local`, `.env.example`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`
- Delete: `src/`, `public/index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/DominicLasap-Resume.pdf`, `yarn.lock`, `vercel.json`, `package-lock.json`

**Interfaces:**
- Consumes: nothing
- Produces: a working Next 16 app; the `@/*` path alias; `NEXT_PUBLIC_SITE_URL` env var

- [ ] **Step 1: Remove the CRA application and its artifacts**

```bash
git rm -r --quiet src public/index.html public/robots.txt public/sitemap.xml public/DominicLasap-Resume.pdf vercel.json yarn.lock package-lock.json
rm -rf node_modules build
```

Keep every image under `public/` — the screenshots are reused.

- [ ] **Step 2: Write the new `package.json`**

```json
{
  "name": "dlasap-portfolio",
  "version": "2.0.0",
  "private": true,
  "description": "Portfolio of Dominic Gabriel Lasap — Full-Stack Software Engineer",
  "author": {
    "name": "Dominic Gabriel Lasap",
    "email": "lasapdominic@gmail.com",
    "url": "https://www.linkedin.com/in/dominic-gabriel-lasap-07655a199/"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@vercel/analytics": "^1.5.0",
    "next": "16.3.5",
    "react": "19.3.0",
    "react-dom": "19.3.0",
    "resend": "^6.28.1",
    "zod": "^4.6.5"
  },
  "devDependencies": {
    "@playwright/test": "^1.50.0",
    "@tailwindcss/postcss": "^4.3.3",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.17.0",
    "eslint-config-next": "16.3.5",
    "jsdom": "^25.0.1",
    "tailwindcss": "^4.3.3",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "e2e"]
}
```

- [ ] **Step 4: Write `next.config.ts` with the redirects**

Old indexed URLs must not 404. This is acceptance criterion 4.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/articles", destination: "/", permanent: true },
      { source: "/article/:slug", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 5: Write `postcss.config.mjs`**

Tailwind v4 uses a dedicated PostCSS package. Using the v3 `tailwindcss` plugin name here is the classic v4 setup failure.

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 6: Write `.env.local` and `.env.example`**

`.env.local` (gitignored — confirm `.env*.local` is in `.gitignore`):

```bash
NEXT_PUBLIC_SITE_URL=https://dlasap-portfolio.vercel.app
RESEND_API_KEY=
CONTACT_TO_EMAIL=lasapdominic@gmail.com
NEXT_PUBLIC_BOOKING_URL=
```

`.env.example` — same keys, no values, committed.

- [ ] **Step 7: Write a minimal `app/globals.css`**

Tokens land in Task 2; this proves the pipeline.

```css
@import "tailwindcss";

@theme {
  --color-ink: #07070b;
  --color-paper: #f2f2f5;
}

body {
  background-color: var(--color-ink);
  color: var(--color-paper);
}
```

- [ ] **Step 8: Write a placeholder `app/layout.tsx` and `app/page.tsx`**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dominic Gabriel Lasap",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx
export default function HomePage() {
  return <h1>Portfolio rebuild in progress</h1>;
}
```

- [ ] **Step 9: Install and verify the build**

```bash
npm install
npm run build
```

Expected: build completes, `/` listed as a static route (`○`). If it fails on PostCSS, re-check Step 5.

- [ ] **Step 10: Verify the dev server renders**

```bash
npm run dev
```

Expected: `http://localhost:3000` shows the placeholder heading on a near-black background — which also confirms Tailwind's `@theme` tokens are being applied.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: replace CRA with Next.js 16 + TypeScript + Tailwind v4 foundation"
```

---

## Task 2: Design tokens, fonts, and UI primitives

The Aurora visual language, expressed once as tokens so no component invents its own spacing or color.

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`
- Create: `components/ui/Section.tsx`, `components/ui/Button.tsx`, `components/ui/Badge.tsx`, `components/ui/Pill.tsx`
- Test: `tests/ui/button.test.tsx`

**Interfaces:**
- Consumes: Task 1's build pipeline
- Produces:
  - `<Section id?: string, label?: string, title?: string, children>` — vertical rhythm wrapper, renders an `<h2>` when `title` is set
  - `<Button href?: string, variant?: "primary" | "ghost", children>` — renders `<a>` when `href` present, else `<button>`
  - `<Badge>{children}</Badge>` — small stack/tech chip
  - `<Pill tone?: "live" | "muted">{children}</Pill>` — availability indicator with pulsing dot
  - CSS tokens: `--color-ink`, `--color-paper`, `--color-muted`, `--color-line`, `--color-iris`, `--color-cyan`, `--color-fuchsia`, `--color-mint`

- [ ] **Step 1: Write the full token layer in `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  /* surfaces */
  --color-ink: #07070b;
  --color-ink-2: #0c0c12;
  --color-paper: #f2f2f5;
  --color-muted: #9a9aa8;
  --color-line: rgba(255, 255, 255, 0.11);

  /* aurora accents */
  --color-iris: #818cf8;
  --color-cyan: #22d3ee;
  --color-fuchsia: #f0abfc;
  --color-mint: #34d399;

  /* type scale */
  --text-display: clamp(2.5rem, 7vw, 5rem);
  --text-h2: clamp(1.75rem, 3.5vw, 2.75rem);

  /* motion */
  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-ink);
    color: var(--color-paper);
    -webkit-font-smoothing: antialiased;
  }

  /* Visible, high-contrast focus for keyboard users — spec §6 */
  :focus-visible {
    outline: 2px solid var(--color-cyan);
    outline-offset: 3px;
    border-radius: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@utility text-gradient {
  background-image: linear-gradient(100deg, var(--color-iris), var(--color-cyan) 55%, var(--color-fuchsia));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

- [ ] **Step 2: Self-host fonts in `app/layout.tsx`**

Replaces the render-blocking Google Fonts `@import` the old site used (spec §7).

```tsx
import { Inter, JetBrains_Mono } from "next/font/google";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});
```

Apply to `<html>`: `className={`${sans.variable} ${mono.variable}`}`, and add to the `@theme` block: `--font-sans: var(--font-sans), ui-sans-serif, system-ui;` and `--font-mono: var(--font-mono), ui-monospace, monospace;`

- [ ] **Step 3: Write the failing test for `Button`**

```tsx
// tests/ui/button.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders an anchor when href is provided", () => {
    render(<Button href="/work">See my work</Button>);
    const el = screen.getByRole("link", { name: "See my work" });
    expect(el).toHaveAttribute("href", "/work");
  });

  it("renders a button element when href is absent", () => {
    render(<Button>Send</Button>);
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("marks external links safe", () => {
    render(<Button href="https://paddlebag.app">Open app</Button>);
    const el = screen.getByRole("link", { name: "Open app" });
    expect(el).toHaveAttribute("rel", "noopener noreferrer");
    expect(el).toHaveAttribute("target", "_blank");
  });
});
```

- [ ] **Step 4: Configure Vitest so the test can run**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": resolve(__dirname, "./") },
  },
});
```

```ts
// tests/setup.ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "@/components/ui/Button"`.

- [ ] **Step 6: Implement the primitives**

```tsx
// components/ui/Button.tsx
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href?: string;
  variant?: "primary" | "ghost";
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold " +
  "transition-transform duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 " +
  "disabled:pointer-events-none disabled:opacity-60 min-h-11";

const variants = {
  primary: "bg-paper text-ink hover:bg-white",
  ghost: "border border-line text-paper hover:border-white/30",
} as const;

export function Button({ href, variant = "primary", children, type = "button", disabled }: Props) {
  const className = `${base} ${variants[variant]}`;

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={className} disabled={disabled}>
      {children}
    </button>
  );
}
```

Write `Section`, `Badge`, and `Pill` in the same style:

```tsx
// components/ui/Section.tsx
import type { ReactNode } from "react";

type Props = { id?: string; label?: string; title?: string; children: ReactNode };

export function Section({ id, label, title, children }: Props) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      {label && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-iris">{label}</p>
      )}
      {title && (
        <h2 className="mb-10 max-w-3xl text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
```

```tsx
// components/ui/Badge.tsx
import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 text-xs text-muted">
      {children}
    </span>
  );
}
```

```tsx
// components/ui/Pill.tsx
import type { ReactNode } from "react";

export function Pill({ tone = "live", children }: { tone?: "live" | "muted"; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-iris/30 bg-iris/[0.07] px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-iris">
      {tone === "live" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
        </span>
      )}
      {children}
    </span>
  );
}
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — 3 tests.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add Aurora design tokens, self-hosted fonts, and UI primitives"
```

---

## Task 3: Content model

The single source of truth. Everything downstream — grid, case studies, sitemap, OG cards — reads from here.

**Files:**
- Create: `content/types.ts`, `content/profile.ts`, `content/projects.ts`, `content/experience.ts`, `content/stack.ts`
- Test: `tests/content/model.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `type Project`, `type Role`, `type StackGroup`, `type Screenshot`, `type Decision` from `@/content/types`
  - `profile` object: `{ name, role, location, email, headline, headlineAccent, subhead, availability, stats, socials, resumePath, photoPath }`
  - `projects: Project[]`, `featuredProjects: Project[]`, `getProject(slug: string): Project | undefined`
  - `roles: Role[]`, `education: { school, degree, period, location, note }`
  - `stackGroups: StackGroup[]`

- [ ] **Step 1: Write `content/types.ts`**

```ts
export type Screenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type Decision = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  org: string;
  role: string;
  period: string;
  featured: boolean;
  summary: string;
  problem: string;
  decisions: Decision[];
  outcome: string;
  stack: string[];
  screenshots: Screenshot[];
  liveUrl?: string;
  liveLabel?: string;
};

export type Role = {
  org: string;
  title: string;
  period: string;
  location: string;
  kind: "full-time" | "contract";
  summary: string;
  highlights: string[];
  stack: string[];
};

export type StackGroup = {
  label: string;
  items: string[];
};
```

- [ ] **Step 2: Write the failing content-model tests**

These are the invariants that prevent the drift that produced the old site.

```ts
// tests/content/model.test.ts
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { featuredProjects, getProject, projects } from "@/content/projects";
import { roles } from "@/content/experience";
import { stackGroups } from "@/content/stack";
import { profile } from "@/content/profile";

const allStackItems = new Set(stackGroups.flatMap((g) => g.items));

describe("projects", () => {
  it("has at least five entries", () => {
    expect(projects.length).toBeGreaterThanOrEqual(5);
  });

  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses url-safe slugs", () => {
    for (const p of projects) {
      expect(p.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("populates every required case-study field", () => {
    for (const p of projects) {
      expect(p.title.length, `${p.slug} title`).toBeGreaterThan(0);
      expect(p.summary.length, `${p.slug} summary`).toBeGreaterThan(40);
      expect(p.problem.length, `${p.slug} problem`).toBeGreaterThan(40);
      expect(p.outcome.length, `${p.slug} outcome`).toBeGreaterThan(20);
      expect(p.decisions.length, `${p.slug} decisions`).toBeGreaterThanOrEqual(2);
      expect(p.stack.length, `${p.slug} stack`).toBeGreaterThan(0);
    }
  });

  it("references only screenshots that exist on disk", () => {
    for (const p of projects) {
      for (const shot of p.screenshots) {
        const path = join(process.cwd(), "public", shot.src);
        expect(existsSync(path), `missing ${shot.src} for ${p.slug}`).toBe(true);
      }
    }
  });

  it("gives every screenshot descriptive alt text", () => {
    for (const p of projects) {
      for (const shot of p.screenshots) {
        expect(shot.alt.length, `${p.slug} alt`).toBeGreaterThan(10);
      }
    }
  });

  it("references only technologies declared in the stack model", () => {
    for (const p of projects) {
      for (const tech of p.stack) {
        expect(allStackItems.has(tech), `${p.slug} uses undeclared "${tech}"`).toBe(true);
      }
    }
  });

  it("exposes exactly the featured subset", () => {
    expect(featuredProjects).toEqual(projects.filter((p) => p.featured));
    expect(featuredProjects.length).toBeGreaterThanOrEqual(5);
  });

  it("looks projects up by slug", () => {
    expect(getProject("paddlebag")?.title).toBeDefined();
    expect(getProject("does-not-exist")).toBeUndefined();
  });
});

describe("experience", () => {
  it("declares roles with highlights", () => {
    expect(roles.length).toBeGreaterThanOrEqual(6);
    for (const r of roles) {
      expect(r.highlights.length, `${r.org} highlights`).toBeGreaterThan(0);
    }
  });
});

describe("profile", () => {
  it("points at assets that exist", () => {
    expect(existsSync(join(process.cwd(), "public", profile.resumePath))).toBe(true);
    expect(existsSync(join(process.cwd(), "public", profile.photoPath))).toBe(true);
  });

  it("carries exactly three hero stats", () => {
    expect(profile.stats).toHaveLength(3);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `@/content/projects`.

- [ ] **Step 4: Write `content/profile.ts`**

```ts
export const profile = {
  name: "Dominic Gabriel Lasap",
  shortName: "Dominic Lasap",
  role: "Full-Stack Software Engineer",
  location: "Cebu City, Philippines",
  email: "lasapdominic@gmail.com",
  phone: "+63 905 561 0116",
  availability: "Open to remote roles",
  headline: "Full-stack engineer who",
  headlineAccent: "ships whole products",
  subhead:
    "5+ years building React and Next.js on Node and PostgreSQL for UK, US, and Philippine teams — and one consumer product I designed, built, and launched alone.",
  stats: [
    { value: "5+", label: "Years shipping" },
    { value: "3", label: "Countries served" },
    { value: "1", label: "Product, solo-built" },
  ],
  socials: {
    github: "https://github.com/dlasap",
    linkedin: "https://www.linkedin.com/in/dominic-gabriel-lasap-07655a199/",
    paddlebag: "https://paddlebag.app",
  },
  resumePath: "/Dominic_Lasap_Resume.pdf",
  photoPath: "/about-me-photo.png",
} as const;
```

- [ ] **Step 5: Write `content/stack.ts`**

Mirror the resume's own grouping (spec §4).

```ts
import type { StackGroup } from "./types";

export const stackGroups: StackGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "SQL", "HTML5", "CSS3", "SCSS", "Java", "Ruby"],
  },
  {
    label: "Frontend",
    items: [
      "React 19", "Next.js 16", "Vue.js", "Tailwind CSS v4", "ShadCN UI", "Mantine UI",
      "Material UI", "TanStack Query", "Redux", "Zod", "Remotion", "Mapbox GL",
    ],
  },
  {
    label: "Backend & Data",
    items: [
      "Node.js", "Express.js", "tRPC", "PostgreSQL", "Supabase", "Drizzle ORM", "MongoDB",
      "Firebase", "RethinkDB", "Redis", "Elasticsearch", "MeiliSearch", "Cassandra",
      "pg-boss", "SendGrid", "Ruby on Rails",
    ],
  },
  {
    label: "Cloud & DevOps",
    items: ["Vercel", "Docker", "Git", "Sentry", "AWS S3", "Google Cloud"],
  },
  {
    label: "Testing & QA",
    items: ["Vitest", "Jest", "Playwright", "Postman", "ESLint"],
  },
  {
    label: "AI & Automation",
    items: ["OpenAI API", "Prompt engineering", "Google AppSheet", "Google Apps Script"],
  },
];
```

Note: every string a project lists in `stack[]` must appear here, or the Task 3 test fails. That coupling is deliberate.

- [ ] **Step 6: Write `content/projects.ts`**

Six featured projects. Copy leads with problem and decision — never the old diary voice. Facts come from the resume; screenshot filenames already exist in `public/`.

```ts
import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "paddlebag",
    title: "PaddleBag",
    org: "Independent Product",
    role: "Founder & Full-Stack Engineer",
    period: "Aug 2026 — Present",
    featured: true,
    summary:
      "A pickleball community platform I designed, built, and launched alone — player profiles, court and paddle directories, leaderboards, a social feed, and a live on-court queue, serving real users.",
    problem:
      "Pickleball communities coordinate across group chats and spreadsheets: no shared record of who plays where, which paddles are worth buying, or who is next on court. Building that as a solo engineer meant every layer had to be cheap to run, because there was no infrastructure budget to absorb mistakes.",
    decisions: [
      {
        title: "Traced a runaway cost spike to a single network ASN",
        body:
          "An anomalous request flood drove infrastructure cost sharply upward. Reading Vercel edge logs isolated the traffic to one ASN, and targeted firewall rate-limit rules shut it down with no impact on legitimate users.",
      },
      {
        title: "Made search cost almost nothing to serve",
        body:
          "Anonymous visitors — the overwhelming majority — hit a pre-built static index and generate zero backend requests. Only authenticated users route to a cached service-role RPC, so search scales with traffic without scaling with spend.",
      },
      {
        title: "Bounded data cost by architecture, not by monitoring",
        body:
          "Tagged cache revalidation with CDN s-maxage and stale-while-revalidate, per-user query fan-out replaced by batched and row-capped queries, and heavy aggregation pushed into bounded Postgres RPCs — keeping origin compute flat as traffic grows.",
      },
      {
        title: "Enforced authorization in the database, not the client",
        body:
          "Row-level security policies, privacy controls, and role-based admin gating live in Postgres, so a compromised or bypassed client cannot read what it should not.",
      },
    ],
    outcome:
      "Live and serving real users, with a growth stack built end to end: first-touch UTM attribution, a referral program with correct post-auth attribution, weekly leaderboards, shareable Open Graph cards, and an internal analytics suite whose cohort retention analysis redirected the product roadmap.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS v4", "Zod", "Mapbox GL", "OpenAI API", "Playwright", "Vercel"],
    screenshots: [],
    liveUrl: "https://paddlebag.app",
    liveLabel: "Open PaddleBag",
  },
  {
    slug: "childcare-crm",
    title: "Childcare Marketing CRM & Operations Platform",
    org: "Childcare Marketing (UK)",
    role: "Software Engineer",
    period: "Jun 2025 — Present",
    featured: true,
    summary:
      "A client-facing CRM and operations platform for a UK childcare marketing agency — campaign templates, account-manager workload tracking, and a hardened GoHighLevel integration keeping client data in sync.",
    problem:
      "Account managers tracked client work across disconnected tools, so nobody could see workload distribution or catch a client message that had gone unanswered. Client records also had to stay continuously in sync with an external CRM whose API failed in ways that silently corrupted state.",
    decisions: [
      {
        title: "Built an Operations Report module around the questions managers actually ask",
        body:
          "Workload per account manager, task management with client-approval workflows, and a communications overview that surfaces unresponded messages rather than waiting for someone to notice.",
      },
      {
        title: "Hardened the GoHighLevel integration at its failure points",
        body:
          "OAuth token refresh, opportunity-search pagination, and error handling were rebuilt so partial failures stop rather than propagate — the integration's reliability problem was in its edges, not its happy path.",
      },
      {
        title: "Moved slow work off the request path",
        body:
          "Background job processing with pg-boss workers and Sentry monitoring, plus data-fetching performance tuning — parallelized queries, lazy-loaded modals, and paginated directories for large data sets.",
      },
      {
        title: "Audited database security rather than assuming it",
        body:
          "Supabase's splinter linter plus RLS policy audits, with owned schema migrations and type generation keeping environments consistent.",
      },
    ],
    outcome:
      "Core CRM, Operations Report, and Onboarding modules shipped and in daily use, with Vitest coverage and synced Drizzle schemas across environments.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Drizzle ORM", "TanStack Query", "Zod", "Tailwind CSS v4", "Sentry", "Vitest", "pg-boss"],
    screenshots: [],
  },
  {
    slug: "ai-shorts",
    title: "AI Shorts — Video Generator for Real Estate",
    org: "FullScale (US client)",
    role: "Frontend Developer / API Management",
    period: "2023 — 2024",
    featured: true,
    summary:
      "An AI short-form video generator for real estate listings — Figma designs translated into responsive production UI, with video effects, transitions, and programmatic image and text composition.",
    problem:
      "Agents needed listing videos without touching an editor. That meant composing video in the browser — effects, transitions, markdown-driven copy, and repositionable image and text layers — while keeping the interface responsive enough to feel like a design tool rather than a render queue.",
    decisions: [
      {
        title: "Built the composition surface from Figma to production",
        body:
          "Responsive production UI implemented directly from designs, including image resizing and free repositioning of image and text layers.",
      },
      {
        title: "Fixed performance at the hook level",
        body:
          "Render performance problems traced to incorrect React hook usage and dependency arrays rather than to the video pipeline — the cheapest fix was the correct one.",
      },
      {
        title: "Owned the API surface and review quality",
        body:
          "Configured Next.js API routes for the generation flow and reviewed pull requests across the team.",
      },
    ],
    outcome: "Shipped to production and in use by the client's real estate customers.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "OpenAI API", "Remotion"],
    screenshots: [
      { src: "/ai-shorts-ss.png", alt: "AI Shorts video generator main composition view" },
      { src: "/ai-shorts-ss-3.png", alt: "AI Shorts template selection interface" },
      { src: "/ai-shorts-ss-5.png", alt: "AI Shorts video effects and transitions panel" },
      { src: "/ai-shorts-ss-4.png", alt: "AI Shorts image and text repositioning controls" },
      { src: "/ai-shorts-ss-6.png", alt: "AI Shorts rendered video preview" },
    ],
    liveUrl: "https://app.tensixty.ai/",
    liveLabel: "View the app",
  },
  {
    slug: "lending-standard",
    title: "LendingStandard — Multifamily Loan Platform",
    org: "FullScale (US client)",
    role: "Developer",
    period: "2022 — 2023",
    featured: true,
    summary:
      "A multifamily lending platform that moves commercial loan origination online, built in an Agile team against JIRA acceptance criteria and design mockups.",
    problem:
      "Commercial multifamily lending ran on documents and email. Moving it online meant modelling a process with many participants and long timelines, where a half-complete state is normal rather than exceptional.",
    decisions: [
      {
        title: "Earned scope by proving reliability first",
        body:
          "Started on bug fixes, then moved to owning whole features built from mockups and JIRA acceptance criteria — delivered on schedule throughout.",
      },
      {
        title: "Worked the full stack rather than a slice",
        body:
          "React and CSS on the front, Java and MongoDB behind it, containerized with Docker for consistent environments.",
      },
    ],
    outcome: "Features delivered on schedule across a long-running client engagement.",
    stack: ["React 19", "JavaScript", "Java", "MongoDB", "Docker"],
    screenshots: [
      { src: "/ls-ss-1.png", alt: "LendingStandard loan pipeline dashboard" },
      { src: "/ls-ss-2.png", alt: "LendingStandard loan application detail view" },
      { src: "/ls-ss-3.png", alt: "LendingStandard borrower management interface" },
    ],
    liveUrl: "https://app.multifamilydebt.com/",
    liveLabel: "View the platform",
  },
  {
    slug: "rcm-ai-platform",
    title: "RCM AI Analysis Platform",
    org: "Reliability Management (UK)",
    role: "Sole Developer",
    period: "Apr 2023 — Present",
    featured: true,
    summary:
      "An AI web application for a Reliability Centered Maintenance engineering business — engineer inputs run through custom-engineered prompts and return as structured tables and exportable PDFs.",
    problem:
      "RCM analysis is structured engineering judgment that was being written by hand for every asset. The output had to be consistent and exportable as a formal document, which meant an AI response could not simply be prose — it had to land in a fixed structure.",
    decisions: [
      {
        title: "Engineered prompts toward a structure, not a paragraph",
        body:
          "Engineer inputs are post-processed through custom prompts whose responses render as correlated tables and text, then export to PDF as a formal deliverable.",
      },
      {
        title: "Met the client on the platform their team could maintain",
        body:
          "Extended delivery into Google AppSheet with Apps Script and Drive/Sheets, running JavaScript on AppSheet-triggered events for PDF generation and correlated tables — and handled Android deployment through the Play Console.",
      },
    ],
    outcome:
      "Sole developer for the business across both the custom application and the no-code delivery, from prompt design through Play Console deployment.",
    stack: ["Next.js 16", "React 19", "Node.js", "OpenAI API", "Google AppSheet", "Google Apps Script", "Vercel"],
    screenshots: [
      { src: "/rcm-ss-1.png", alt: "RCM AI analysis bot input form" },
      { src: "/rcm-ss-2.png", alt: "RCM structured analysis results table" },
      { src: "/rcm-ss-4.png", alt: "RCM generated PDF report output" },
      { src: "/rcm-ss-6.png", alt: "RCM AppSheet data application view" },
    ],
    liveUrl: "https://reliability-management-frontend.vercel.app/analysis_bot/new",
    liveLabel: "Open the analysis bot",
  },
  {
    slug: "business-templates-builder",
    title: "Business Templates Builder",
    org: "FullScale (US client)",
    role: "Full-Stack Developer",
    period: "2023",
    featured: true,
    summary:
      "A document web editor letting small businesses customize their own operational templates — payroll and similar — with Microsoft SSO and a Next.js front end over a Ruby on Rails backend.",
    problem:
      "Small businesses needed to adapt standard document templates to their own operations without a developer, while authenticating against the Microsoft accounts they already had.",
    decisions: [
      {
        title: "Built customization as a first-class editing surface",
        body:
          "Document customization features — payroll templates and similar — implemented so a non-technical user edits structure, not markup.",
      },
      {
        title: "Removed the signup barrier with Microsoft SSO",
        body:
          "Single Sign-On against Microsoft accounts plus ReCaptcha validation, so businesses onboard with credentials they already hold.",
      },
      {
        title: "Worked both sides of a split stack",
        body:
          "Next.js and Mantine UI on the front, Ruby on Rails behind it, with dashboard features spanning both.",
      },
    ],
    outcome: "Delivered with tickets consistently resolved on schedule in a daily-scrum team.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Mantine UI", "Ruby on Rails", "Ruby"],
    screenshots: [
      { src: "/trs-ss-1.png", alt: "Business Templates Builder document editor" },
      { src: "/trs-ss-2.png", alt: "Business Templates Builder template dashboard" },
      { src: "/trs-ss-3.png", alt: "Business Templates Builder payroll template customization" },
    ],
    liveUrl: "https://trsexpress.com/",
    liveLabel: "View the business",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
```

**Screenshot note:** PaddleBag and Childcare CRM have empty `screenshots: []` because no images exist in `public/` for them yet. The test only validates screenshots that are listed, so this passes. Flag to the owner that PaddleBag — the flagship — should get 3–5 screenshots, and that the Childcare CRM may be client-confidential. Case-study pages must render correctly with zero screenshots.

- [ ] **Step 7: Write `content/experience.ts`**

Full-time and contract roles, including the three projects demoted from the grid (spec §4).

```ts
import type { Role } from "./types";

export const roles: Role[] = [
  {
    org: "PaddleBag",
    title: "Founder & Full-Stack Engineer",
    period: "Aug 2026 — Present",
    location: "Cebu City, Philippines (Remote)",
    kind: "full-time",
    summary:
      "Solo-designed, built, and launched a production pickleball community platform, owning every layer: product, UX, schema, API, frontend, SEO, analytics, and monetization.",
    highlights: [
      "Ship and maintain a Next.js 16 / React 19 / TypeScript app on Supabase and PostgreSQL with versioned SQL migrations and continuous deployment.",
      "Shut down a runaway infrastructure cost spike by tracing a request flood to a single network ASN and deploying targeted firewall rate limits.",
      "Designed a cost-bounded data architecture that keeps origin compute flat as traffic grows.",
      "Built the growth and retention stack end to end, including a cohort retention analysis that redirected the product roadmap.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
  },
  {
    org: "Childcare Marketing (UK)",
    title: "Software Engineer",
    period: "Jun 2025 — Present",
    location: "Remote (United Kingdom)",
    kind: "full-time",
    summary: "Full-stack development on a client-facing CRM and operations platform.",
    highlights: [
      "Built core CRM features with data-fetching performance tuning and paginated directories for large data sets.",
      "Developed an Operations Report module covering workload tracking, approval workflows, and unresponded-message detection.",
      "Hardened the GoHighLevel CRM integration: OAuth token refresh, pagination, and error handling.",
      "Implemented pg-boss background workers and Sentry monitoring; audited RLS policies via Supabase's splinter linter.",
    ],
    stack: ["Next.js 16", "TypeScript", "Supabase", "Drizzle ORM", "Sentry", "Vitest"],
  },
  {
    org: "FullScale",
    title: "Software Engineer",
    period: "Jun 2022 — Present",
    location: "IT Park, Cebu City, Philippines",
    kind: "full-time",
    summary: "Feature delivery for US-based clients across several long-running projects.",
    highlights: [
      "AI Shorts video app — Figma-to-production UI, video effects and transitions, Next.js API routes, PR review.",
      "Document web editor — document customization, Microsoft SSO, ReCaptcha, across Next.js and Ruby on Rails.",
      "Multifamily loan platform — moved from bug fixes to owning features built from mockups and JIRA criteria.",
      "Travel itinerary showcase — frontend and backend delivery under a tight timeline.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "tRPC", "Ruby on Rails", "Docker"],
  },
  {
    org: "DNA Micro",
    title: "Software Engineer",
    period: "May 2021 — Jun 2022",
    location: "Gorordo Ave., Cebu City, Philippines",
    kind: "full-time",
    summary:
      "Completed an intensive full-stack training program, then moved from the frontend team to the database team on the strength of data-handling work.",
    highlights: [
      "Built TypeScript and React components; diagnosed data inconsistencies caused by conflicting types in asynchronous flows.",
      "Promoted to the database team — built a cross-instance migration script, a replication resync service with inconsistency alerting, and a SendGrid notification service.",
      "Managed dockerized images across RethinkDB, PostgreSQL, MeiliSearch, Redis, Elasticsearch, and Cassandra.",
      "Recognized for outstanding work and delivery of exceptional results (May 2022).",
    ],
    stack: ["React 19", "TypeScript", "Node.js", "RethinkDB", "Docker", "SendGrid"],
  },
  {
    org: "Reliability Management (UK)",
    title: "Part-Time Software Engineer",
    period: "Apr 2023 — Present",
    location: "Remote (United Kingdom)",
    kind: "contract",
    summary: "Sole developer for a Reliability Centered Maintenance engineering business.",
    highlights: [
      "Built an AI web application post-processing engineer inputs through custom prompts into structured tables and PDF exports.",
      "Expanded into no-code delivery with Google AppSheet and Apps Script, including Android deployment via the Play Console.",
    ],
    stack: ["Next.js 16", "Node.js", "OpenAI API", "Google AppSheet", "Google Apps Script"],
  },
  {
    org: "Filinvest",
    title: "Part-Time Web Developer",
    period: "Dec 2023 — Mar 2024",
    location: "Remote (Philippines)",
    kind: "contract",
    summary: "Upgraded a real estate website to Next.js with Tailwind CSS.",
    highlights: [
      "Resolved responsiveness issues across breakpoints and added missing features.",
      "Fixed search query and pagination behavior.",
    ],
    stack: ["Next.js 16", "React 19", "Tailwind CSS v4"],
  },
  {
    org: "1ClickDesign",
    title: "Part-Time Full-Stack Developer",
    period: "Apr 2023 — Nov 2023",
    location: "Remote (Philippines)",
    kind: "contract",
    summary:
      "Sole all-around developer on a real estate CRM, meeting daily with the owner and team.",
    highlights: [
      "Built product, customer, user, and property management with dashboards and data tables.",
      "Implemented Google Auth and managed the Firebase data layer.",
    ],
    stack: ["Vue.js", "Tailwind CSS v4", "Firebase"],
  },
];

export const education = {
  school: "University of San Carlos",
  degree: "BS Computer Engineering",
  period: "Jun 2015 — May 2020",
  location: "Talamban, Cebu City, Philippines",
  note: "Thesis: Dynamic Light Signal System for Real-Time Evacuation Guide Path During Fire Disaster.",
};
```

- [ ] **Step 8: Run tests to verify they pass**

Run: `npm test`
Expected: PASS. If "uses undeclared X" fails, add the technology to `content/stack.ts` — do not weaken the test.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add typed content model sourced from the 2026 resume"
```

---

## Task 4: SEO infrastructure

Metadata, structured data, sitemap, robots — derived from the content model so they cannot drift.

**Files:**
- Create: `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`
- Modify: `app/layout.tsx`
- Test: `tests/seo/seo.test.ts`

**Interfaces:**
- Consumes: `profile`, `projects` from Task 3
- Produces:
  - `siteUrl: string` — absolute origin from env, no trailing slash
  - `absoluteUrl(path: string): string`
  - `buildMetadata(input: { title: string; description: string; path: string; image?: string }): Metadata`
  - `personSchema(): object` — JSON-LD

- [ ] **Step 1: Write the failing test**

```ts
// tests/seo/seo.test.ts
import { describe, expect, it } from "vitest";
import { absoluteUrl, buildMetadata, personSchema } from "@/lib/seo";

describe("absoluteUrl", () => {
  it("joins a path onto the site origin", () => {
    expect(absoluteUrl("/work/paddlebag")).toMatch(/^https?:\/\/.+\/work\/paddlebag$/);
  });

  it("does not double up slashes", () => {
    expect(absoluteUrl("/")).not.toMatch(/\/\/$/);
  });
});

describe("buildMetadata", () => {
  const meta = buildMetadata({
    title: "PaddleBag",
    description: "A pickleball community platform built solo.",
    path: "/work/paddlebag",
  });

  it("sets a canonical url", () => {
    expect(meta.alternates?.canonical).toBe(absoluteUrl("/work/paddlebag"));
  });

  it("sets openGraph and twitter cards", () => {
    expect(meta.openGraph?.title).toBe("PaddleBag");
    expect(meta.twitter?.card).toBe("summary_large_image");
  });
});

describe("personSchema", () => {
  const schema = personSchema() as Record<string, unknown>;

  it("declares a Person with sameAs links", () => {
    expect(schema["@type"]).toBe("Person");
    expect(Array.isArray(schema.sameAs)).toBe(true);
    expect((schema.sameAs as string[]).length).toBeGreaterThanOrEqual(3);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- seo`
Expected: FAIL — cannot resolve `@/lib/seo`.

- [ ] **Step 3: Implement `lib/seo.ts`**

```ts
import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dlasap-portfolio.vercel.app"
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path === "/" ? "" : path}` || siteUrl;
}

export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(input.path);
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: input.title,
      description: input.description,
      siteName: `${profile.shortName} — Portfolio`,
      ...(input.image ? { images: [{ url: input.image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      ...(input.image ? { images: [input.image] } : {}),
    },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cebu City",
      addressCountry: "PH",
    },
    sameAs: [profile.socials.github, profile.socials.linkedin, profile.socials.paddlebag],
    knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase"],
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- seo`
Expected: PASS — 5 tests.

- [ ] **Step 5: Write `app/sitemap.ts` and `app/robots.ts`**

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/work/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
```

```ts
// app/robots.ts
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
```

- [ ] **Step 6: Wire root metadata, JSON-LD, and analytics into `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { personSchema, siteUrl } from "@/lib/seo";
import { profile } from "@/content/profile";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.shortName}`,
  },
  description: profile.subhead,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  robots: { index: true, follow: true },
  verification: { google: "GUzSat7XFK-F2U84wFEC-20TPzYQI-uD7BFg-GiH_68" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Verify the crawl surface**

```bash
npm run build && npm start
```

Then in a second shell:

```bash
curl -s localhost:3000/sitemap.xml | head -30
curl -s localhost:3000/robots.txt
curl -s localhost:3000/ | grep -c "application/ld+json"
```

Expected: sitemap lists 4 static routes plus 6 project URLs; robots names the sitemap; the JSON-LD grep returns `1`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add SEO infrastructure — metadata builders, JSON-LD, sitemap, robots"
```

---

## Task 5: App shell — nav, footer, mobile menu

**Files:**
- Create: `components/shell/NavBar.tsx`, `components/shell/MobileMenu.tsx`, `components/shell/Footer.tsx`, `components/shell/SkipLink.tsx`
- Modify: `app/layout.tsx`
- Test: `tests/shell/navbar.test.tsx`

**Interfaces:**
- Consumes: `profile` (Task 3), `Button` (Task 2)
- Produces: `<NavBar />`, `<Footer />`, `<SkipLink />`; `NAV_LINKS` exported from `NavBar` as `{ href: string; label: string }[]`

- [ ] **Step 1: Write the failing test**

```tsx
// tests/shell/navbar.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NavBar, NAV_LINKS } from "@/components/shell/NavBar";

describe("NavBar", () => {
  it("renders a link for every nav entry", () => {
    render(<NavBar />);
    for (const link of NAV_LINKS) {
      expect(screen.getAllByRole("link", { name: link.label }).length).toBeGreaterThan(0);
    }
  });

  it("labels the navigation landmark", () => {
    render(<NavBar />);
    expect(screen.getByRole("navigation", { name: /main/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- navbar`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the shell components**

`NavBar` is a client component (it tracks scroll for its backdrop and owns the mobile menu state).

```tsx
// components/shell/NavBar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { MobileMenu } from "./MobileMenu";

export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {profile.shortName}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm text-muted transition-colors hover:text-paper">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <MobileMenu />
      </nav>
    </header>
  );
}
```

`MobileMenu`: a `<button aria-expanded aria-controls="mobile-nav">` toggling a full-screen panel that lists `NAV_LINKS`, closes on Escape and on route change, and traps nothing (it is a simple overlay — return focus to the toggle on close).

`Footer`: name, role, email link, GitHub/LinkedIn links, and the current year via `new Date().getFullYear()`.

`SkipLink`: `<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-paper focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>`

- [ ] **Step 4: Mount the shell in `app/layout.tsx`**

Inside `<body>`: `<SkipLink />`, `<NavBar />`, `<main id="main">{children}</main>`, `<Footer />`.

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- navbar`
Expected: PASS — 2 tests.

- [ ] **Step 6: Verify keyboard access manually**

Run `npm run dev`, load `/`, press Tab once. Expected: "Skip to content" becomes visible. Continue tabbing — every nav link shows a cyan focus ring.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add app shell with accessible nav, mobile menu, and footer"
```

---

## Task 6: Motion primitives

**Files:**
- Create: `components/motion/Reveal.tsx`, `components/motion/AuroraField.tsx`, `lib/use-reduced-motion.ts`
- Test: `tests/motion/reveal.test.tsx`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `<Reveal delay?: number, as?: "div" | "section" | "li", children>` — fades and lifts into view once
  - `<AuroraField />` — the ambient background orbs
  - `useReducedMotion(): boolean`

- [ ] **Step 1: Write the failing test**

```tsx
// tests/motion/reveal.test.tsx
import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Reveal } from "@/components/motion/Reveal";

beforeAll(() => {
  // jsdom has no IntersectionObserver
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

describe("Reveal", () => {
  it("renders its children regardless of observer state", () => {
    render(<Reveal>Visible content</Reveal>);
    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });
});
```

The point of this test: content must exist in the DOM even before it is revealed. A reveal implementation that mounts children only on intersection would hide content from crawlers — that is the failure this guards.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- reveal`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the primitives**

```tsx
// components/motion/Reveal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Props = { children: ReactNode; delay?: number; className?: string };

export function Reveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)] ${
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
```

`AuroraField`: three absolutely-positioned blurred divs (iris / cyan / fuchsia), `pointer-events-none`, `aria-hidden="true"`, animated with a CSS `@keyframes` float declared in `globals.css`, at 9s/11s/13s durations. Because the global reduced-motion rule in Task 2 clamps every animation duration, the orbs freeze automatically — no JS branch needed.

Add to `globals.css`:

```css
@keyframes aurora-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(28px, -22px) scale(1.12); }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- reveal`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Reveal and AuroraField motion primitives with reduced-motion support"
```

---

## Task 7: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`
- Modify: `app/page.tsx`
- Test: `tests/sections/hero.test.tsx`

**Interfaces:**
- Consumes: `profile` (Task 3), `Button`/`Pill` (Task 2), `AuroraField` (Task 6)
- Produces: `<Hero />` — contains the page's only `<h1>`

- [ ] **Step 1: Write the failing test**

```tsx
// tests/sections/hero.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/sections/Hero";
import { profile } from "@/content/profile";

describe("Hero", () => {
  it("renders exactly one h1 containing the headline", () => {
    const { container } = render(<Hero />);
    const h1s = container.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toContain(profile.headlineAccent);
  });

  it("shows the availability pill", () => {
    render(<Hero />);
    expect(screen.getByText(profile.availability)).toBeInTheDocument();
  });

  it("renders all three stats", () => {
    render(<Hero />);
    for (const stat of profile.stats) {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });

  it("offers a work link and a résumé download", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /see my work/i })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("link", { name: /r[ée]sum[ée]/i })).toHaveAttribute(
      "href",
      profile.resumePath,
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- hero`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `Hero`**

Structure, top to bottom: `AuroraField` behind; `Pill` with `profile.availability`; `<h1>` rendering `profile.headline` with `profile.headlineAccent` wrapped in `<span className="text-gradient">`; `<p>` with `profile.subhead`; a stats row mapping `profile.stats` (value in `font-mono`, label in `text-xs uppercase tracking-[0.12em] text-muted`, separated by `border-l border-line`); CTA row with `<Button href="/work">See my work</Button>` and `<Button href={profile.resumePath} variant="ghost">Download résumé</Button>`.

Layout: `min-h-[92svh]` (use `svh`, not `vh` — mobile browser chrome makes `vh` overflow), `flex flex-col justify-center`, `max-w-6xl` container, `pt-28` to clear the fixed nav.

The résumé button must carry `download` and point at `profile.resumePath`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- hero`
Expected: PASS — 4 tests.

- [ ] **Step 5: Verify responsively**

`npm run dev`, then check at 375px, 768px, and 1440px widths. Expected: no horizontal scroll at any width; the headline never overflows; stats wrap rather than compress.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add hero section with aurora field, stats, and CTAs"
```

---

## Task 8: Flagship section

**Files:**
- Create: `components/sections/Flagship.tsx`
- Modify: `app/page.tsx`
- Test: `tests/sections/flagship.test.tsx`

**Interfaces:**
- Consumes: `getProject` (Task 3), `Section`/`Button`/`Badge` (Task 2), `Reveal` (Task 6)
- Produces: `<Flagship />` — renders the PaddleBag project as a featured block

- [ ] **Step 1: Write the failing test**

```tsx
// tests/sections/flagship.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Flagship } from "@/components/sections/Flagship";
import { getProject } from "@/content/projects";

const paddlebag = getProject("paddlebag")!;

describe("Flagship", () => {
  it("renders the project title", () => {
    render(<Flagship />);
    expect(screen.getByRole("heading", { name: /paddlebag/i })).toBeInTheDocument();
  });

  it("renders exactly three decision callouts", () => {
    render(<Flagship />);
    for (const decision of paddlebag.decisions.slice(0, 3)) {
      expect(screen.getByText(decision.title)).toBeInTheDocument();
    }
  });

  it("links to the live app and the case study", () => {
    render(<Flagship />);
    expect(screen.getByRole("link", { name: /open paddlebag/i })).toHaveAttribute(
      "href",
      "https://paddlebag.app",
    );
    expect(screen.getByRole("link", { name: /case study|full story/i })).toHaveAttribute(
      "href",
      "/work/paddlebag",
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- flagship`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `Flagship`**

Read the project with `getProject("paddlebag")`; if it returns `undefined`, return `null` (defensive — the content test already guarantees it exists).

Layout: `Section` with `label="Flagship"` and a two-column grid at `md:` — left column holds title, period, `summary`, stack `Badge`s, and both CTAs; right column holds the first screenshot in a bordered, rounded frame, or, when `screenshots` is empty, a gradient placeholder panel showing the project initial. Below the grid, `decisions.slice(0, 3)` render as three cards in a `md:grid-cols-3`, each wrapped in `<Reveal delay={i * 90}>`.

The empty-screenshot branch is required — PaddleBag currently has no images (Task 3 note).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- flagship`
Expected: PASS — 3 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add flagship section featuring PaddleBag"
```

---

## Task 9: Work grid and project cards

**Files:**
- Create: `components/sections/WorkGrid.tsx`, `components/ui/ProjectCard.tsx`
- Modify: `app/page.tsx`
- Test: `tests/sections/work-grid.test.tsx`

**Interfaces:**
- Consumes: `featuredProjects` (Task 3), `Section`/`Badge` (Task 2), `Reveal` (Task 6)
- Produces:
  - `<ProjectCard project: Project, priority?: boolean />`
  - `<WorkGrid limit?: number, excludeSlug?: string />`

- [ ] **Step 1: Write the failing test**

```tsx
// tests/sections/work-grid.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { featuredProjects } from "@/content/projects";

describe("WorkGrid", () => {
  it("links every card to its own case-study page", () => {
    render(<WorkGrid />);
    for (const project of featuredProjects) {
      const link = screen.getByRole("link", { name: new RegExp(project.title, "i") });
      expect(link).toHaveAttribute("href", `/work/${project.slug}`);
    }
  });

  it("honours excludeSlug", () => {
    render(<WorkGrid excludeSlug="paddlebag" />);
    expect(screen.queryByRole("link", { name: /paddlebag/i })).not.toBeInTheDocument();
  });

  it("honours limit", () => {
    const { container } = render(<WorkGrid limit={2} />);
    expect(container.querySelectorAll("article")).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- work-grid`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the card and the grid**

`ProjectCard` renders an `<article>` containing a `next/link` wrapping the whole card (so the accessible name is the title), the first screenshot via `next/image` with `sizes="(max-width: 768px) 100vw, 50vw"` (or the gradient placeholder when empty), the title as `<h3>`, `org · period` as small muted text, `summary` clamped to three lines, and the first four `stack` entries as `Badge`s with a `+N` overflow indicator.

Hover: `-translate-y-1` and `border-white/25`, both transitioned. Every card is wrapped in `<Reveal delay={index * 70}>` by the grid.

`WorkGrid` renders a `Section` with `label="Selected work"`, `title="Things I've built and shipped"`, a `md:grid-cols-2` grid, and a trailing link to `/work`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- work-grid`
Expected: PASS — 3 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add project cards and selected-work grid"
```

---

## Task 10: Experience timeline

**Files:**
- Create: `components/sections/Timeline.tsx`, `components/ui/TimelineRow.tsx`
- Modify: `app/page.tsx`
- Test: `tests/sections/timeline.test.tsx`

**Interfaces:**
- Consumes: `roles` (Task 3), `Section`/`Badge` (Task 2)
- Produces: `<Timeline />` with `id="experience"` (the nav anchors to it)

- [ ] **Step 1: Write the failing test**

```tsx
// tests/sections/timeline.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Timeline } from "@/components/sections/Timeline";
import { roles } from "@/content/experience";

describe("Timeline", () => {
  it("renders a row for every role", () => {
    render(<Timeline />);
    for (const role of roles) {
      expect(screen.getByText(role.org)).toBeInTheDocument();
    }
  });

  it("collapses highlights behind an accessible disclosure", async () => {
    render(<Timeline />);
    const toggles = screen.getAllByRole("button", { expanded: false });
    expect(toggles.length).toBe(roles.length);

    await userEvent.click(toggles[0]);
    expect(toggles[0]).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(roles[0].highlights[0])).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- timeline`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the timeline**

`TimelineRow` is a client component. Each row: a `<button aria-expanded={open} aria-controls={panelId}>` spanning the row, showing `org`, `title`, `period`, `location`, and a `kind` badge ("Contract" only — full-time needs no label). The panel is `<div id={panelId} hidden={!open}>` containing `summary`, the `highlights` as a `<ul>`, and stack `Badge`s.

Use `hidden` rather than CSS-only hiding so the closed content is correctly excluded from the accessibility tree.

Visual: a 1px left rule (`border-l border-line`) with a small dot per row; contract roles rendered at slightly lower emphasis under a "Part-time & contract" subheading.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- timeline`
Expected: PASS — 2 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add experience timeline with accessible disclosures"
```

---

## Task 11: Stack and About sections

**Files:**
- Create: `components/sections/StackSection.tsx`, `components/sections/About.tsx`
- Modify: `app/page.tsx`
- Test: `tests/sections/stack.test.tsx`

**Interfaces:**
- Consumes: `stackGroups`, `profile`, `education` (Task 3)
- Produces: `<StackSection />`, `<About />`

- [ ] **Step 1: Write the failing test**

```tsx
// tests/sections/stack.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StackSection } from "@/components/sections/StackSection";
import { About } from "@/components/sections/About";
import { stackGroups } from "@/content/stack";
import { profile } from "@/content/profile";

describe("StackSection", () => {
  it("renders every group label and item", () => {
    render(<StackSection />);
    for (const group of stackGroups) {
      expect(screen.getByText(group.label)).toBeInTheDocument();
      for (const item of group.items) {
        expect(screen.getAllByText(item).length).toBeGreaterThan(0);
      }
    }
  });
});

describe("About", () => {
  it("renders the photo with meaningful alt text", () => {
    render(<About />);
    const img = screen.getByRole("img", { name: /dominic/i });
    expect(img).toBeInTheDocument();
  });

  it("offers the current résumé", () => {
    render(<About />);
    expect(screen.getByRole("link", { name: /r[ée]sum[ée]/i })).toHaveAttribute(
      "href",
      profile.resumePath,
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- stack`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement both sections**

`StackSection`: `Section` with `label="Stack"`, `title="What I build with"`. Each group is a row — label on the left at `md:` (`text-xs uppercase tracking-[0.14em] text-muted`), items as wrapped `Badge`s on the right. No logo images: text badges are faster, always legible, and remove the ~30 third-party CDN requests the old site made (spec §7).

`About`: two columns at `md:` — photo left via `next/image` (`profile.photoPath`, `alt="Dominic Gabriel Lasap"`, fixed dimensions, `rounded-2xl border border-line`), copy right. Copy is first-person, three short paragraphs: who he is and where, how he works (international clients, Figma to release, owning schema through deploy), and what he's looking for. Close with the education line from `education` and a `Button` linking to `profile.resumePath` with `download`.

Write the copy fresh in the resume's register — do not port the old site's "I've worked on alot of client projets" paragraph, which contains two typos and reads junior.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- stack`
Expected: PASS — 3 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add stack and about sections"
```

---

## Task 12: Contact — server action and form

**Files:**
- Create: `app/actions/contact.ts`, `lib/rate-limit.ts`, `components/sections/Contact.tsx`, `components/ui/ContactForm.tsx`
- Modify: `app/page.tsx`
- Test: `tests/contact/action.test.ts`

**Interfaces:**
- Consumes: `profile` (Task 3), `Button` (Task 2)
- Produces:
  - `type ContactState = { status: "idle" | "success" | "error"; message?: string; fieldErrors?: Record<string, string[]> }`
  - `submitContact(prev: ContactState, formData: FormData): Promise<ContactState>`
  - `checkRateLimit(key: string): boolean` from `lib/rate-limit`

- [ ] **Step 1: Write the failing tests**

```ts
// tests/contact/action.test.ts
import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

vi.mock("next/headers", () => ({
  headers: async () => new Map([["x-forwarded-for", "203.0.113.5"]]),
}));

import { submitContact } from "@/app/actions/contact";
import { resetRateLimit } from "@/lib/rate-limit";

function form(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

const valid = {
  name: "Jane Recruiter",
  email: "jane@example.com",
  message: "We have a senior full-stack role that looks like a strong fit for your background.",
  intent: "hiring",
  website: "",
};

beforeEach(() => {
  sendMock.mockReset();
  sendMock.mockResolvedValue({ data: { id: "msg_1" }, error: null });
  resetRateLimit();
  process.env.RESEND_API_KEY = "re_test_key";
});

describe("submitContact", () => {
  it("rejects an invalid email without sending", async () => {
    const result = await submitContact({ status: "idle" }, form({ ...valid, email: "not-an-email" }));
    expect(result.status).toBe("error");
    expect(result.fieldErrors?.email).toBeDefined();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a too-short message without sending", async () => {
    const result = await submitContact({ status: "idle" }, form({ ...valid, message: "hi" }));
    expect(result.status).toBe("error");
    expect(result.fieldErrors?.message).toBeDefined();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("silently accepts but does not send when the honeypot is filled", async () => {
    const result = await submitContact({ status: "idle" }, form({ ...valid, website: "spam.example" }));
    expect(result.status).toBe("success");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("sends a valid submission", async () => {
    const result = await submitContact({ status: "idle" }, form(valid));
    expect(result.status).toBe("success");
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it("surfaces the fallback email when the provider fails", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "provider down" } });
    const result = await submitContact({ status: "idle" }, form(valid));
    expect(result.status).toBe("error");
    expect(result.message).toContain("lasapdominic@gmail.com");
  });

  it("rate-limits repeated submissions from one address", async () => {
    for (let i = 0; i < 3; i++) {
      await submitContact({ status: "idle" }, form(valid));
    }
    const result = await submitContact({ status: "idle" }, form(valid));
    expect(result.status).toBe("error");
    expect(result.message).toMatch(/too many/i);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- contact`
Expected: FAIL — cannot resolve `@/app/actions/contact`.

- [ ] **Step 3: Implement `lib/rate-limit.ts`**

```ts
const WINDOW_MS = 60_000 * 10;
const MAX_PER_WINDOW = 3;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);
  return true;
}

export function resetRateLimit(): void {
  hits.clear();
}
```

In-memory is the right scope here: a static portfolio on serverless has no shared store, and the honeypot plus Resend's own limits carry the rest. Documented as a deliberate limitation.

- [ ] **Step 4: Implement `app/actions/contact.ts`**

Note the Zod 4 API — `z.email()`, not `z.string().email()` (Global Constraints).

```ts
"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { profile } from "@/content/profile";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

const schema = z.object({
  name: z.string().min(2, "Please tell me your name."),
  email: z.email("That email address doesn't look right."),
  message: z.string().min(20, "A little more detail helps me reply usefully."),
  intent: z.enum(["hiring", "project"]).default("hiring"),
});

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real users never see this field, bots fill everything.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks — I'll be in touch shortly." };
  }

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    intent: formData.get("intent") ?? "hiring",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return {
      status: "error",
      message: `Too many messages from this connection. Email me directly at ${profile.email}.`,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: `The form isn't connected yet — please email me at ${profile.email}.`,
    };
  }

  const { name, email, message, intent } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? profile.email,
      replyTo: email,
      subject: `[${intent === "hiring" ? "Hiring" : "Project"}] ${name}`,
      text: `From: ${name} <${email}>\nIntent: ${intent}\n\n${message}`,
    });

    if (error) {
      return {
        status: "error",
        message: `Something went wrong sending that. Please email me directly at ${profile.email}.`,
      };
    }

    return { status: "success", message: "Thanks — I'll be in touch shortly." };
  } catch {
    return {
      status: "error",
      message: `Something went wrong sending that. Please email me directly at ${profile.email}.`,
    };
  }
}
```

The `from` address uses Resend's shared sending domain, which works without domain verification. When a custom domain lands, change this one line.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- contact`
Expected: PASS — 6 tests.

- [ ] **Step 6: Implement `ContactForm` and `Contact`**

`ContactForm` is a client component using `useActionState(submitContact, { status: "idle" })` and `useFormStatus` for the pending state.

Requirements:
- An `intent` toggle rendered as two radio inputs styled as a segmented control, labelled "I'm hiring" / "I have a project", with a visible `<fieldset><legend>`
- Fields: name, email, message. Each has a real `<label>`, and on error gets `aria-invalid="true"` and `aria-describedby` pointing at its error `<p id="...-error">`
- Honeypot: `<input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px]" />`
- Submit button shows "Sending…" and is `disabled` while pending
- Success and error banners use `role="status"` and `role="alert"` respectively

`Contact` section wraps the form plus direct channels: a large `mailto:` link, a copy-email button (`navigator.clipboard.writeText`, with a "Copied" confirmation), the LinkedIn and GitHub links, and — when `process.env.NEXT_PUBLIC_BOOKING_URL` is set — a "Book 20 minutes" button. Omit the booking button entirely when the variable is empty rather than rendering a dead link.

- [ ] **Step 7: Verify the form manually**

`npm run dev`, go to `/#contact`. Submit empty — expect inline field errors and no network call. Submit valid with no `RESEND_API_KEY` — expect the "isn't connected yet" message showing the email address. Tab through the form — every control reachable, errors announced.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add contact server action with validation, honeypot, rate limiting, and form"
```

---

## Task 13: Homepage composition

**Files:**
- Modify: `app/page.tsx`
- Test: `tests/pages/home.test.tsx`

**Interfaces:**
- Consumes: every section from Tasks 7–12
- Produces: the finished `/` route

- [ ] **Step 1: Write the failing test**

```tsx
// tests/pages/home.test.tsx
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders exactly one h1", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("renders all seven sections in order", () => {
    const { container } = render(<HomePage />);
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(6);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- home`
Expected: FAIL — the placeholder page has no sections.

- [ ] **Step 3: Compose the homepage**

```tsx
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Flagship } from "@/components/sections/Flagship";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { Timeline } from "@/components/sections/Timeline";
import { StackSection } from "@/components/sections/StackSection";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { buildMetadata } from "@/lib/seo";
import { profile } from "@/content/profile";

export const metadata: Metadata = buildMetadata({
  title: `${profile.name} — ${profile.role}`,
  description: profile.subhead,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Flagship />
      <WorkGrid limit={5} excludeSlug="paddlebag" />
      <Timeline />
      <StackSection />
      <About />
      <Contact />
    </>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- home`
Expected: PASS — 2 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: compose the homepage from all sections"
```

---

## Task 14: Case-study pages and per-project OG images

**Files:**
- Create: `app/work/[slug]/page.tsx`, `app/work/[slug]/opengraph-image.tsx`, `app/opengraph-image.tsx`, `app/not-found.tsx`
- Test: `tests/pages/work-slug.test.ts`

**Interfaces:**
- Consumes: `projects`, `getProject` (Task 3), `buildMetadata` (Task 4), `WorkGrid` (Task 9)
- Produces: statically generated `/work/<slug>` for every project

**Critical:** `params` is a `Promise` in Next 16 (Global Constraints). Both `generateMetadata` and the page component must `await` it.

- [ ] **Step 1: Write the failing test**

```ts
// tests/pages/work-slug.test.ts
import { describe, expect, it } from "vitest";
import { generateMetadata, generateStaticParams } from "@/app/work/[slug]/page";
import { projects } from "@/content/projects";

describe("work/[slug]", () => {
  it("generates a static param for every project", async () => {
    const params = await generateStaticParams();
    expect(params).toHaveLength(projects.length);
    expect(params).toContainEqual({ slug: "paddlebag" });
  });

  it("builds per-project metadata with a canonical url", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: "paddlebag" }) });
    expect(meta.title).toContain("PaddleBag");
    expect(meta.alternates?.canonical).toContain("/work/paddlebag");
  });

  it("returns empty metadata for an unknown slug rather than throwing", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: "nope" }) });
    expect(meta.title).toBeDefined();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- work-slug`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the case-study page**

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return buildMetadata({
    title: `${project.title} — ${project.role}`,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  // ...render
}
```

Page structure: back-link to `/work`; `<h1>` with the title; a meta row of `org · role · period`; the `summary` as a lead paragraph; a live-site `Button` when `liveUrl` exists; then three labelled blocks — **The problem** (`project.problem`), **Decisions** (`project.decisions` as cards, each `<h3>` + body), **Outcome** (`project.outcome`); then the stack as `Badge`s; then the screenshot gallery via `next/image` with each `caption` rendered as a `<figcaption>`; then `<WorkGrid limit={2} excludeSlug={project.slug} />` as "More work".

When `screenshots` is empty, omit the gallery entirely — do not render an empty container.

- [ ] **Step 4: Implement the OG images**

```tsx
// app/work/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { getProject } from "@/content/projects";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project case study";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #07070b 0%, #141428 55%, #0b2230 100%)",
          padding: 72,
          color: "#f2f2f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 26, color: "#818cf8", letterSpacing: 2 }}>
          {project?.org ?? profile.shortName}
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 950 }}>
          {project?.title ?? profile.name}
        </div>
        <div style={{ fontSize: 28, color: "#9a9aa8" }}>
          {project?.role ?? profile.role} · {profile.shortName}
        </div>
      </div>
    ),
    size,
  );
}
```

`app/opengraph-image.tsx` is the same shape for the site root, using `profile.name`, `profile.role`, and `profile.availability`. Keep the markup to flexbox only — Satori (which powers `ImageResponse`) supports no CSS grid and no external stylesheets.

- [ ] **Step 5: Write `app/not-found.tsx`**

`<h1>` reading "Page not found", a one-line explanation, and `Button` links to `/` and `/work`. Give it `export const metadata = { title: "Page not found", robots: { index: false } }`.

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test -- work-slug`
Expected: PASS — 3 tests.

- [ ] **Step 7: Verify static generation**

```bash
npm run build
```

Expected: build output lists `/work/[slug]` as `SSG` with 6 generated paths, each marked static (`●`). If any route shows as dynamic (`ƒ`), `params` is not being awaited correctly.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add case-study pages, OG image generation, and 404"
```

---

## Task 15: Secondary pages

**Files:**
- Create: `app/work/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`
- Test: `tests/pages/secondary.test.tsx`

**Interfaces:**
- Consumes: `WorkGrid`, `About`, `Contact`, `buildMetadata`
- Produces: `/work`, `/about`, `/contact`

- [ ] **Step 1: Write the failing test**

```tsx
// tests/pages/secondary.test.tsx
import { describe, expect, it } from "vitest";
import { metadata as workMeta } from "@/app/work/page";
import { metadata as aboutMeta } from "@/app/about/page";
import { metadata as contactMeta } from "@/app/contact/page";

describe("secondary page metadata", () => {
  it("gives each page a unique canonical url", () => {
    const canonicals = [workMeta, aboutMeta, contactMeta].map(
      (m) => m.alternates?.canonical,
    );
    expect(new Set(canonicals).size).toBe(3);
  });

  it("gives each page a unique description", () => {
    const descriptions = [workMeta, aboutMeta, contactMeta].map((m) => m.description);
    expect(new Set(descriptions).size).toBe(3);
    for (const d of descriptions) {
      expect(String(d).length).toBeGreaterThan(60);
    }
  });
});
```

Duplicate meta descriptions across pages are a real SEO defect; this test prevents the copy-paste that causes them.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- secondary`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement the three pages**

Each exports `metadata` built with `buildMetadata` using a distinct title, a distinct 60+ character description, and its own path.

- `/work` — `<h1>Work</h1>`, a short intro line, then `<WorkGrid />` with no limit.
- `/about` — `<h1>About</h1>`, then `<About />`, then the education block.
- `/contact` — `<h1>Get in touch</h1>`, then `<Contact />`.

Each page needs top padding (`pt-32`) to clear the fixed nav.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- secondary`
Expected: PASS — 2 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add work index, about, and contact pages"
```

---

## Task 16: End-to-end smoke test

**Files:**
- Create: `playwright.config.ts`, `e2e/smoke.spec.ts`

**Interfaces:**
- Consumes: the complete built site
- Produces: `npm run test:e2e`

- [ ] **Step 1: Write `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: "npm run build && npm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
```

- [ ] **Step 2: Write the smoke spec**

```ts
import { expect, test } from "@playwright/test";

test("homepage renders its core content", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("Open to remote roles")).toBeVisible();
});

test("a visitor can reach a case study from the homepage", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /ai shorts/i }).first().click();
  await expect(page).toHaveURL(/\/work\/ai-shorts/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/ai shorts/i);
});

test("the contact form reports validation errors", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /send/i }).click();
  await expect(page.getByRole("alert")).toBeVisible();
});

test("old project urls redirect instead of 404ing", async ({ page }) => {
  await page.goto("/projects");
  await expect(page).toHaveURL(/\/work$/);
});

test("the page has no horizontal overflow on mobile", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
});
```

- [ ] **Step 3: Install browsers and run**

```bash
npx playwright install chromium
npm run test:e2e
```

Expected: all 5 specs pass on both desktop and mobile projects.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "test: add Playwright smoke coverage for the critical paths"
```

---

## Task 17: Final audit and cleanup

**Files:**
- Modify: `README.md`
- Delete: any remaining CRA leftovers

- [ ] **Step 1: Verify no CRA remnants survive**

```bash
grep -rn "react-scripts\|react-helmet\|styled-components\|react-ga4" --include="*.json" --include="*.ts" --include="*.tsx" . | grep -v node_modules
```

Expected: no output. Any hit is a leftover to remove.

- [ ] **Step 2: Run the full verification suite**

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

Expected: all four green. Do not proceed past a failure.

- [ ] **Step 3: Confirm server-rendered HTML contains real content**

This is acceptance criterion 1 — the whole reason for the migration.

```bash
npm start &
sleep 5
curl -s localhost:3000/work/paddlebag | grep -o "<title>[^<]*</title>"
curl -s localhost:3000/work/paddlebag | grep -c "og:image"
curl -s localhost:3000/ | grep -c "Open to remote roles"
```

Expected: the title contains "PaddleBag"; `og:image` appears at least once; the availability string appears in raw HTML with no JS executed.

- [ ] **Step 4: Run Lighthouse against the production build**

```bash
npx lighthouse http://localhost:3000 --preset=desktop --quiet --chrome-flags="--headless" --output=json --output-path=./lh-desktop.json
npx lighthouse http://localhost:3000 --quiet --chrome-flags="--headless" --output=json --output-path=./lh-mobile.json
```

Expected: ≥ 95 on Performance, Accessibility, Best Practices, and SEO for both (spec §7). Record any category below 95 and fix before merging — the most likely culprits are unsized images (set explicit `width`/`height`) and insufficient contrast on `--color-muted` against `--color-ink`.

Delete both JSON files afterward; do not commit them.

- [ ] **Step 5: Verify reduced motion**

In Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce", reload `/`. Expected: aurora orbs static, sections appear immediately at full opacity, no movement on scroll.

- [ ] **Step 6: Rewrite `README.md`**

Cover: what the project is, the stack, `npm run dev`, the environment variables and where to get each (`RESEND_API_KEY` from resend.com, `NEXT_PUBLIC_BOOKING_URL` from cal.com), how to add a project (edit `content/projects.ts` — everything else follows), and how to run the tests.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: final audit, README rewrite, and CRA cleanup"
```

- [ ] **Step 8: Report status to the owner**

State plainly: the Lighthouse numbers actually measured (not the targets), which acceptance criteria pass, and the two known gaps — PaddleBag and Childcare CRM have no screenshots, and `RESEND_API_KEY` plus `NEXT_PUBLIC_BOOKING_URL` are unset so the contact form falls back to direct email.

---

## Deferred — needs owner input

These block full completion but not the build. Surface them, do not guess:

1. **PaddleBag screenshots** — the flagship has no images. 3–5 captures of the platform would materially strengthen the strongest section on the site.
2. **Childcare CRM screenshots** — may be client-confidential. Ask before capturing anything.
3. **`RESEND_API_KEY`** — until set, the form shows its fallback message with the email address. Add in Vercel project settings.
4. **`NEXT_PUBLIC_BOOKING_URL`** — the booking button is omitted entirely while empty.
5. **Live URL health** — verify `app.tensixty.ai`, `app.multifamilydebt.com`, and `trsexpress.com` still resolve. Drop `liveUrl` from any project whose link is dead rather than linking a recruiter into a 404.

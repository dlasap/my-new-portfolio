# Portfolio — multi-persona

Next.js 15 portfolio that can deploy as **Dominic**, **Luna**, or **Therese** via an environment variable.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Default persona is **Dominic**. To preview another:

```bash
PORTFOLIO_PERSONA=luna npm run dev
PORTFOLIO_PERSONA=therese npm run dev
```

## Build

```bash
npm run build
npm start
```

## Personas on Vercel

Use the same repo with separate Vercel projects (or one project per domain). Set:

| Variable | Values | Notes |
|----------|--------|--------|
| `PORTFOLIO_PERSONA` | `dominic` \| `luna` \| `therese` | Defaults to `dominic` if unset |
| `NEXT_PUBLIC_SITE_URL` | e.g. `https://your-app.vercel.app` | Optional; overrides sitemap/OG base URL |

After changing env vars, **redeploy** so the build picks them up.

## Content

Persona data lives under `src/data/personas/`:

- `dominic.ts` / `luna.ts` / `therese.ts` — identity, experience, education, projects/highlights
- `resolve.ts` — selects the active persona from `PORTFOLIO_PERSONA`

Resumes: `public/DominicLasap-Resume.pdf`, `public/resumes/luna.pdf`, `public/resumes/therese.pdf`.

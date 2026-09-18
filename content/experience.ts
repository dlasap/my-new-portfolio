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
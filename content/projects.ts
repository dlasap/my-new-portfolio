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
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS v4",
      "Zod",
      "Mapbox GL",
      "OpenAI API",
      "Playwright",
      "Vercel",
    ],
    screenshots: [
      { src: "/paddlebag.png", alt: "PaddleBag home screen with pickleball community feed and court directory" },
    ],
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
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Drizzle ORM",
      "TanStack Query",
      "Zod",
      "Tailwind CSS v4",
      "Sentry",
      "Vitest",
      "pg-boss",
    ],
    screenshots: [
      { src: "/CRM v2 app.png", alt: "Childcare Marketing CRM dashboard showing campaign and account-manager workload views" },
    ],
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
    stack: [
      "Next.js 16",
      "React 19",
      "Node.js",
      "OpenAI API",
      "Google AppSheet",
      "Google Apps Script",
      "Vercel",
    ],
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

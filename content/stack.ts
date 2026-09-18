import type { StackGroup } from "./types";

export const stackGroups: StackGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "SQL", "HTML5", "CSS3", "SCSS", "Java", "Ruby"],
  },
  {
    label: "Frontend",
    items: [
      "React 19",
      "Next.js 16",
      "Vue.js",
      "Tailwind CSS v4",
      "ShadCN UI",
      "Mantine UI",
      "Material UI",
      "TanStack Query",
      "Redux",
      "Zod",
      "Remotion",
      "Mapbox GL",
    ],
  },
  {
    label: "Backend & Data",
    items: [
      "Node.js",
      "Express.js",
      "tRPC",
      "PostgreSQL",
      "Supabase",
      "Drizzle ORM",
      "MongoDB",
      "Firebase",
      "RethinkDB",
      "Redis",
      "Elasticsearch",
      "MeiliSearch",
      "Cassandra",
      "pg-boss",
      "SendGrid",
      "Ruby on Rails",
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
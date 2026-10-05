import type { Metadata } from "next";
import { education } from "@/content/experience";
import { profile } from "@/content/profile";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dlasap-portfolio.vercel.app"
).replace(/\/$/, "");

// Google shows this as the site name in results; without it, it falls back to "Vercel".
export const siteName = profile.shortName;

export const siteKeywords = [
  "Dominic Lasap",
  "Dominic Gabriel Lasap",
  "full-stack developer",
  "full-stack software engineer",
  "React developer",
  "Next.js developer",
  "Node.js developer",
  "TypeScript developer",
  "Supabase developer",
  "remote software engineer",
  "freelance web developer Philippines",
  "web developer Cebu",
];

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path === "/" ? "" : path}`;
}

export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  /** Skip the "%s | Dominic Lasap" template and use the title as-is. */
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(input.path);
  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: input.title,
      description: input.description,
      siteName,
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
    "@id": personId,
    name: profile.name,
    alternateName: [profile.shortName, "dlasap"],
    givenName: "Dominic",
    familyName: "Lasap",
    jobTitle: profile.role,
    description: profile.subhead,
    image: absoluteUrl(profile.photoPath),
    email: `mailto:${profile.email}`,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cebu City",
      addressRegion: "Cebu",
      addressCountry: "PH",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.school,
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Full-Stack Software Engineer",
      occupationLocation: { "@type": "Country", name: "Philippines" },
      skills: "React, Next.js, TypeScript, Node.js, PostgreSQL, Supabase, OpenAI API",
    },
    sameAs: Object.values(profile.socials),
    knowsAbout: [
      "Full-stack web development",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Tailwind CSS",
      "REST APIs",
      "OpenAI API",
      "AI integrations",
      "Workflow automation",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteName,
    alternateName: [profile.name, `${profile.shortName} Portfolio`],
    url: siteUrl,
    inLanguage: "en",
    author: { "@id": personId },
    publisher: { "@id": personId },
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl("/about"),
    name: `About ${profile.shortName}`,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function jsonLd(data: unknown): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

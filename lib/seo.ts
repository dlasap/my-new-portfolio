import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dlasap-portfolio.vercel.app"
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path === "/" ? "" : path}`;
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
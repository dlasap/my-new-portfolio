import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Hero } from "@/components/sections/Hero";
import { StackSection } from "@/components/sections/StackSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { profile } from "@/content/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${profile.shortName} — Full-Stack Developer | React, Next.js, Node.js`,
  description:
    "Dominic Lasap is a full-stack developer from Cebu, Philippines with 5+ years building React, Next.js, Node.js, and Supabase apps for UK and US teams. Open to remote roles.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkSection />
      <ExperienceSection />
      <StackSection />
      <CTASection />
    </>
  );
}
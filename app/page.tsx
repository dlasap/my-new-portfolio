import { CTASection } from "@/components/sections/CTASection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Hero } from "@/components/sections/Hero";
import { StackSection } from "@/components/sections/StackSection";
import { WorkSection } from "@/components/sections/WorkSection";

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
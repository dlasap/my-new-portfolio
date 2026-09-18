import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { profile } from "@/content/profile";

export function CTASection() {
  return (
    <Section id="contact" label="Contact" title="Need someone who ships? Let's talk.">
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        <Button href="mailto:lasapdominic@gmail.com">Email me directly</Button>
        <p className="text-sm text-muted">
          {profile.email} · replies within a day or two · {profile.location}
        </p>
      </div>
    </Section>
  );
}
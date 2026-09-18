import { roles } from "@/content/experience";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";

export function ExperienceSection() {
  return (
    <Section id="experience" label="Experience" title="Where I've been building.">
      <ol className="space-y-12">
        {roles.map((role, i) => (
          <li key={`${role.org}-${role.period}`}>
            <Reveal delay={Math.min(i * 80, 240)}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">
                  {role.title} · {role.org}
                </h3>
                <p className="text-sm text-muted">
                  {role.period} — {role.location}
                </p>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{role.summary}</p>
              <ul className="mt-4 max-w-3xl space-y-2">
                {role.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed">
                    <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-iris" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
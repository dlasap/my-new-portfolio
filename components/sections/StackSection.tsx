import { stackGroups } from "@/content/stack";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";

export function StackSection() {
  return (
    <Section label="Toolbox" title="The stack behind the work.">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {stackGroups.map((group, i) => (
          <Reveal key={group.label} delay={Math.min(i * 60, 300)}>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-iris">{group.label}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <span className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 text-xs text-paper/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
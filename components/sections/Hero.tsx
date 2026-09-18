import { profile } from "@/content/profile";
import { AuroraField } from "@/components/motion/AuroraField";
import { Reveal } from "@/components/motion/Reveal";
import { Pill } from "@/components/ui/Pill";

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden">
      <AuroraField />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Pill>{profile.availability}</Pill>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 max-w-4xl text-[length:var(--text-display)] font-semibold leading-[1.05] tracking-tight">
            {profile.headline} <span className="text-gradient">{profile.headlineAccent}</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{profile.subhead}</p>
        </Reveal>
        <Reveal delay={300}>
          <dl className="mt-12 flex flex-wrap gap-10">
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs uppercase tracking-[0.14em] text-muted">{stat.label}</dt>
                <dd className="mt-1 text-3xl font-semibold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={400}>
          <a
            href="#work"
            className="mt-14 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            See the work
          </a>
        </Reveal>
      </div>
    </section>
  );
}
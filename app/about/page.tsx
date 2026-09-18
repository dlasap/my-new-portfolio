import type { Metadata } from "next";
import Image from "next/image";
import { education, roles } from "@/content/experience";
import { profile } from "@/content/profile";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `Who ${profile.shortName} is, how he works, and the road from computer engineering to full-stack product work.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8">
      <div className="flex flex-col gap-10 md:flex-row md:items-start">
        <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl border border-line">
          <Image
            src={profile.photoPath}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="160px"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-[length:var(--text-h2)] font-semibold tracking-tight">
            About {profile.shortName}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            I&apos;m a full-stack software engineer from {profile.location}, currently building a
            pickleball community platform as a solo founder while engineering client platforms for
            teams in the UK and US. My bias is toward shipping whole products — schema, API,
            frontend, and the growth loop around them.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={`mailto:${profile.email}`}>Get in touch</Button>
            <Button href={profile.resumePath} variant="ghost">
              Download résumé (PDF)
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-20 space-y-12">
        <Reveal>
          <section>
            <h2 className="text-xl font-semibold">Career</h2>
            <ol className="mt-6 space-y-8">
              {roles.map((role) => (
                <li key={`${role.org}-${role.period}`}>
                  <h3 className="font-semibold">
                    {role.title} · {role.org}
                  </h3>
                  <p className="text-sm text-muted">
                    {role.period} — {role.location}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{role.summary}</p>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="text-xl font-semibold">Education</h2>
            <p className="mt-4 font-semibold">
              {education.degree} · {education.school}
            </p>
            <p className="text-sm text-muted">
              {education.period} — {education.location}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{education.note}</p>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8">
      <p className="text-xs uppercase tracking-[0.14em] text-iris">
        {project.org} · {project.role} · {project.period}
      </p>
      <h1 className="mt-3 text-[length:var(--text-h2)] font-semibold tracking-tight">
        {project.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{project.summary}</p>

      {project.liveUrl && (
        <div className="mt-6">
          <Button href={project.liveUrl} variant="ghost">
            {project.liveLabel ?? "View live"} ↗
          </Button>
        </div>
      )}

      <div className="mt-14 space-y-14">
        <Reveal>
          <section>
            <h2 className="text-xl font-semibold">The problem</h2>
            <p className="mt-3 leading-relaxed text-muted">{project.problem}</p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="text-xl font-semibold">Key decisions</h2>
            <ol className="mt-6 space-y-8">
              {project.decisions.map((d, i) => (
                <li key={d.title} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-iris/40 font-mono text-sm text-iris"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{d.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        {project.screenshots.length > 0 && (
          <Reveal>
            <section>
              <h2 className="text-xl font-semibold">Screens</h2>
              <div className="mt-6 space-y-6">
                {project.screenshots.map((shot) => (
                  <figure key={shot.src}>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-line">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(min-width: 768px) 896px, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                    {shot.caption && (
                      <figcaption className="mt-2 text-sm text-muted">{shot.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        <Reveal>
          <section>
            <h2 className="text-xl font-semibold">Outcome</h2>
            <p className="mt-3 leading-relaxed text-muted">{project.outcome}</p>
          </section>
        </Reveal>

        <section>
          <h2 className="text-xl font-semibold">Stack</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <nav aria-label="More projects" className="mt-20 border-t border-line pt-10">
        <h2 className="text-sm uppercase tracking-[0.14em] text-muted">More work</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {others.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="block rounded-xl border border-line bg-ink-2 p-5 transition-colors hover:border-white/25"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-muted">{p.org}</p>
                <p className="mt-1 font-semibold">{p.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
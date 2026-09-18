import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";

export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const cover = project.screenshots[0];
  return (
    <Reveal delay={delay}>
      <Link
        href={`/work/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-ink-2 transition-colors hover:border-white/25"
      >
        {cover && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">
            {project.org} · {project.period}
          </p>
          <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
            {project.stack.length > 4 && <li className="text-xs text-muted">+{project.stack.length - 4} more</li>}
          </ul>
        </div>
      </Link>
    </Reveal>
  );
}
import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Every project Dominic Lasap has shipped — the problem, the decisions, and the outcome for each.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8">
      <h1 className="text-[length:var(--text-h2)] font-semibold tracking-tight">Work</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Six shipped projects. Each case study covers the problem, the decisions that mattered, and
        how it turned out.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} delay={(i % 2) * 100} />
        ))}
      </div>
    </div>
  );
}
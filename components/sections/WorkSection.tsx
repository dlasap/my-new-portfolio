import { featuredProjects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "./ProjectCard";

export function WorkSection() {
  return (
    <Section id="work" label="Selected work" title="Projects that shipped, and what I decided building them.">
      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} delay={(i % 2) * 100} />
        ))}
      </div>
      <p className="mt-10 text-sm text-muted">
        <a href="/work" className="underline decoration-iris/60 underline-offset-4 hover:text-paper">
          View all projects →
        </a>
      </p>
    </Section>
  );
}
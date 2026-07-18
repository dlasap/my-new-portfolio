import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import styles from "./projects.module.css";

export const metadata: Metadata = {
	title: "Projects",
	description: `Selected client and product work by ${siteConfig.name} — React, Next.js, full-stack web apps.`,
	alternates: { canonical: "/projects" },
	openGraph: {
		title: `Projects · ${siteConfig.name}`,
		description: `Selected client and product work by ${siteConfig.name}.`,
		url: `${siteConfig.url}/projects`,
	},
};

export default function ProjectsPage() {
	return (
		<div className={styles.page}>
			<div className="container">
				<header className={styles.header}>
					<p className={styles.eyebrow}>Projects</p>
					<h1 className={styles.title}>Work I&apos;ve shipped</h1>
					<p className={styles.lead}>
						A mix of full-stack product work, frontend delivery, and AI-assisted
						tools for real-estate, lending, and operations teams.
					</p>
				</header>
				<div className={styles.list}>
					{projects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			</div>
		</div>
	);
}

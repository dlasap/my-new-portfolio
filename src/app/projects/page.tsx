import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, siteConfig } from "@/data";
import styles from "./projects.module.css";

export const metadata: Metadata = {
	title: siteConfig.copy.projectsPageTitle,
	description: siteConfig.copy.projectsLead,
	alternates: { canonical: "/projects" },
	openGraph: {
		title: `${siteConfig.copy.projectsPageTitle} · ${siteConfig.name}`,
		description: siteConfig.copy.projectsLead,
		url: `${siteConfig.url}/projects`,
	},
};

export default function ProjectsPage() {
	return (
		<div className={styles.page}>
			<div className="container">
				<header className={styles.header}>
					<p className={styles.eyebrow}>{siteConfig.copy.projectsEyebrow}</p>
					<h1 className={styles.title}>{siteConfig.copy.projectsTitle}</h1>
					<p className={styles.lead}>{siteConfig.copy.projectsLead}</p>
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

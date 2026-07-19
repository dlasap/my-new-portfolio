import Link from "next/link";
import { featuredProjects, siteConfig } from "@/data";
import { ProjectCard } from "./ProjectCard";
import styles from "./FeaturedProjects.module.css";

export function FeaturedProjects() {
	return (
		<section
			id="selected-work"
			className={styles.section}
			aria-labelledby="selected-work-title"
		>
			<div className="container">
				<div className={styles.header}>
					<div>
						<p className={styles.eyebrow}>
							{siteConfig.copy.featuredEyebrow}
						</p>
						<h2 id="selected-work-title" className={styles.title}>
							{siteConfig.copy.featuredTitle}
						</h2>
					</div>
					<Link href="/projects" className={styles.more}>
						{siteConfig.copy.featuredMore}
					</Link>
				</div>
				<div className={styles.list}>
					{featuredProjects.map((project) => (
						<ProjectCard
							key={project.id}
							project={project}
							featured
						/>
					))}
				</div>
			</div>
		</section>
	);
}

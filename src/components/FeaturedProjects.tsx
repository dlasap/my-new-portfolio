import Link from "next/link";
import { featuredProjects } from "@/data/projects";
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
						<p className={styles.eyebrow}>Selected work</p>
						<h2 id="selected-work-title" className={styles.title}>
							Projects that show how I ship
						</h2>
					</div>
					<Link href="/projects" className={styles.more}>
						View all projects →
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

import Image from "next/image";
import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

type Props = {
	project: Project;
	featured?: boolean;
};

export function ProjectCard({ project, featured = false }: Props) {
	const image = project.screenshots[0];

	return (
		<article
			className={`${styles.card} ${featured ? styles.featured : ""}`}
		>
			<div className={styles.media}>
				{image ? (
					<Image
						src={image}
						alt={`Screenshot of ${project.title}`}
						fill
						sizes={
							featured
								? "(max-width: 768px) 100vw, 55vw"
								: "(max-width: 768px) 100vw, 33vw"
						}
					/>
				) : (
					<div className={styles.placeholder} aria-hidden="true">
						{project.title.split("—")[0].trim()}
					</div>
				)}
			</div>
			<div className={styles.body}>
				<h3 className={styles.title}>{project.title}</h3>
				<p className={styles.description}>{project.description}</p>
				<ul className={styles.tech} aria-label="Technologies">
					{project.technologies.map((tech) => (
						<li key={tech}>{tech}</li>
					))}
				</ul>
				<a
					href={project.link}
					className={styles.link}
					target="_blank"
					rel="noopener noreferrer"
				>
					{project.linkText} →
				</a>
			</div>
		</article>
	);
}

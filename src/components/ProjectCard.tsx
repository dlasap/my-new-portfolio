"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data";
import { ProjectGallery } from "./ProjectGallery";
import styles from "./ProjectCard.module.css";

type Props = {
	project: Project;
	featured?: boolean;
};

export function ProjectCard({ project, featured = false }: Props) {
	const [galleryOpen, setGalleryOpen] = useState(false);
	const images = project.screenshots;
	const lead = images[0];
	const hasGallery = images.length > 1;
	const hasLink = Boolean(project.link && project.linkText);

	return (
		<article
			className={`${styles.card} ${featured ? styles.featured : ""}`}
		>
			{lead ? (
				<button
					type="button"
					className={styles.mediaButton}
					onClick={() => setGalleryOpen(true)}
					aria-label={
						hasGallery
							? `View ${images.length} screenshots of ${project.title}`
							: `View screenshot of ${project.title}`
					}
				>
					<span className={styles.media}>
						<Image
							src={lead}
							alt={`Screenshot of ${project.title}`}
							fill
							sizes={
								featured
									? "(max-width: 768px) 100vw, 55vw"
									: "(max-width: 768px) 100vw, 33vw"
							}
							style={{ objectFit: "cover" }}
						/>
						{hasGallery && (
							<span className={styles.badge}>
								{images.length} photos · View gallery
							</span>
						)}
					</span>
				</button>
			) : (
				<div className={styles.media}>
					<div className={styles.placeholder} aria-hidden="true">
						{project.title.split("—")[0].trim()}
					</div>
				</div>
			)}

			<div className={styles.body}>
				<h3 className={styles.title}>{project.title}</h3>
				<p className={styles.description}>{project.description}</p>
				<ul className={styles.tech} aria-label="Skills and tools">
					{project.technologies.map((tech) => (
						<li key={tech}>{tech}</li>
					))}
				</ul>
				{hasLink && (
					<a
						href={project.link}
						className={styles.link}
						target="_blank"
						rel="noopener noreferrer"
					>
						{project.linkText} →
					</a>
				)}
			</div>

			{lead && (
				<ProjectGallery
					title={project.title}
					images={images}
					open={galleryOpen}
					onClose={() => setGalleryOpen(false)}
				/>
			)}
		</article>
	);
}

import type { Metadata } from "next";
import Image from "next/image";
import { education } from "@/data/experience";
import { siteConfig } from "@/data/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
	title: "About",
	description: siteConfig.about.body,
	alternates: { canonical: "/about" },
	openGraph: {
		title: `About · ${siteConfig.name}`,
		description: siteConfig.about.headline,
		url: `${siteConfig.url}/about`,
	},
};

export default function AboutPage() {
	return (
		<div className={styles.page}>
			<div className={`container ${styles.grid}`}>
				<div>
					<p className={styles.eyebrow}>About</p>
					<h1 className={styles.title}>{siteConfig.about.headline}</h1>
					<p className={styles.body}>{siteConfig.about.body}</p>
					<p className={styles.body}>
						I focus on feature delivery, system enhancements, and turning user
						stories into production-ready interfaces — with attention to
						performance, clarity, and collaboration.
					</p>

					<h2 className={styles.skillsTitle}>Skills & tools</h2>
					<ul className={styles.skills}>
						{siteConfig.about.skills.map((skill) => (
							<li key={skill}>{skill}</li>
						))}
					</ul>

					<section className={styles.education} aria-labelledby="education-title">
						<h2 id="education-title" className={styles.educationTitle}>
							Education
						</h2>
						<ul className={styles.eduList}>
							{education.map((item) => (
								<li key={item.school} className={styles.eduItem}>
									<div className={styles.eduLogo}>
										<Image
											src={item.logo}
											alt=""
											fill
											sizes="44px"
										/>
									</div>
									<div>
										<p className={styles.eduSchool}>{item.school}</p>
										<p className={styles.eduMeta}>
											{item.detail} · {item.location} · {item.duration}
										</p>
									</div>
								</li>
							))}
						</ul>
					</section>
				</div>

				<div className={styles.media}>
					<Image
						src="/about-photo.jpg"
						alt={`${siteConfig.name} portrait`}
						fill
						sizes="(max-width: 860px) 100vw, 40vw"
						priority
					/>
				</div>
			</div>
		</div>
	);
}

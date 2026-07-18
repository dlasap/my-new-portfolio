import Image from "next/image";
import { experience } from "@/data/experience";
import styles from "./Experience.module.css";

export function Experience() {
	return (
		<section className={styles.section} aria-labelledby="experience-title">
			<div className="container">
				<div className={styles.header}>
					<p className={styles.eyebrow}>Experience</p>
					<h2 id="experience-title" className={styles.title}>
						Where I&apos;ve been shipping
					</h2>
				</div>
				<ul className={styles.list}>
					{experience.map((job) => (
						<li key={`${job.company}-${job.duration}`} className={styles.item}>
							<div className={styles.logo}>
								<Image
									src={job.logo}
									alt=""
									fill
									sizes="48px"
								/>
							</div>
							<div className={styles.meta}>
								<p className={styles.company}>{job.company}</p>
								<p className={styles.role}>
									{job.role}
									{job.type ? ` · ${job.type}` : ""}
								</p>
							</div>
							<div className={styles.details}>
								<span>{job.duration}</span>
								<span>{job.location}</span>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

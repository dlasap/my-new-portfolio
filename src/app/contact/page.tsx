import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
	title: "Contact",
	description: `Contact ${siteConfig.name} for full-stack engineering roles and collaborations.`,
	alternates: { canonical: "/contact" },
	openGraph: {
		title: `Contact · ${siteConfig.name}`,
		description: `Get in touch with ${siteConfig.name}.`,
		url: `${siteConfig.url}/contact`,
	},
};

export default function ContactPage() {
	return (
		<div className={styles.page}>
			<div className="container">
				<header className={styles.header}>
					<p className={styles.eyebrow}>Contact</p>
					<h1 className={styles.title}>Let&apos;s talk</h1>
					<p className={styles.lead}>
						Interested in hiring or collaborating? Send an email or reach out on
						LinkedIn — I&apos;m always open to strong opportunities.
					</p>
				</header>

				<div className={styles.grid}>
					<a href={`mailto:${siteConfig.email}`} className={styles.card}>
						<span className={styles.label}>Email</span>
						<span className={styles.value}>{siteConfig.email}</span>
					</a>
					<a
						href={siteConfig.socials.linkedin}
						className={styles.card}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className={styles.label}>LinkedIn</span>
						<span className={styles.value}>Connect on LinkedIn</span>
					</a>
					<a
						href={siteConfig.socials.github}
						className={styles.card}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className={styles.label}>GitHub</span>
						<span className={styles.value}>github.com/dlasap</span>
					</a>
				</div>

				<p className={styles.resume}>
					<a href={siteConfig.resumePath} download>
						Download resume (PDF)
					</a>
				</p>
			</div>
		</div>
	);
}

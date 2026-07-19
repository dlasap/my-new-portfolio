import type { Metadata } from "next";
import { siteConfig } from "@/data";
import styles from "./contact.module.css";

export const metadata: Metadata = {
	title: "Contact",
	description: siteConfig.copy.contactDescription,
	alternates: { canonical: "/contact" },
	openGraph: {
		title: `Contact · ${siteConfig.name}`,
		description: `Get in touch with ${siteConfig.name}.`,
		url: `${siteConfig.url}/contact`,
	},
};

function displayHost(url: string) {
	try {
		return new URL(url).host.replace(/^www\./, "");
	} catch {
		return url;
	}
}

export default function ContactPage() {
	const { linkedin, github } = siteConfig.socials;

	return (
		<div className={styles.page}>
			<div className="container">
				<header className={styles.header}>
					<p className={styles.eyebrow}>Contact</p>
					<h1 className={styles.title}>Let&apos;s talk</h1>
					<p className={styles.lead}>{siteConfig.copy.contactLead}</p>
				</header>

				<div className={styles.grid}>
					<a href={`mailto:${siteConfig.email}`} className={styles.card}>
						<span className={styles.label}>Email</span>
						<span className={styles.value}>{siteConfig.email}</span>
					</a>
					{linkedin && (
						<a
							href={linkedin}
							className={styles.card}
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className={styles.label}>LinkedIn</span>
							<span className={styles.value}>Connect on LinkedIn</span>
						</a>
					)}
					{github && (
						<a
							href={github}
							className={styles.card}
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className={styles.label}>GitHub</span>
							<span className={styles.value}>{displayHost(github)}</span>
						</a>
					)}
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

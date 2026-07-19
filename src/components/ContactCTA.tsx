import Link from "next/link";
import { siteConfig } from "@/data";
import styles from "./ContactCTA.module.css";

export function ContactCTA() {
	return (
		<section className={styles.band} aria-labelledby="contact-cta-title">
			<div className="container">
				<div className={styles.panel}>
					<div>
						<h2 id="contact-cta-title" className={styles.title}>
							{siteConfig.copy.contactCtaTitle}
						</h2>
						<p className={styles.copy}>{siteConfig.copy.contactCtaCopy}</p>
					</div>
					<div className={styles.actions}>
						<a
							href={`mailto:${siteConfig.email}`}
							className={styles.primary}
						>
							Email me
						</a>
						<Link href="/contact" className={styles.secondary}>
							Contact page
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

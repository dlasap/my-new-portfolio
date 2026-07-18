import Link from "next/link";
import { siteConfig } from "@/data/site";
import styles from "./ContactCTA.module.css";

export function ContactCTA() {
	return (
		<section className={styles.band} aria-labelledby="contact-cta-title">
			<div className="container">
				<div className={styles.panel}>
					<div>
						<h2 id="contact-cta-title" className={styles.title}>
							Let&apos;s build something worth shipping
						</h2>
						<p className={styles.copy}>
							Open to full-time roles and strong contract work. Reach out and I&apos;ll
							get back to you.
						</p>
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

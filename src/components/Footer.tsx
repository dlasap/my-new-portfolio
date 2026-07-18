import Link from "next/link";
import { siteConfig } from "@/data/site";
import styles from "./Footer.module.css";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={`container ${styles.inner}`}>
				<div className={styles.top}>
					<div>
						<p className={styles.brand}>{siteConfig.name}</p>
						<p className={styles.note}>
							{siteConfig.role} · {siteConfig.location}
						</p>
					</div>
					<nav className={styles.socials} aria-label="Social links">
						<a
							href={siteConfig.socials.linkedin}
							target="_blank"
							rel="noopener noreferrer"
						>
							LinkedIn
						</a>
						<a
							href={siteConfig.socials.github}
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub
						</a>
						<a href={`mailto:${siteConfig.email}`}>Email</a>
					</nav>
				</div>
				<div className={styles.bottom}>
					<p>
						© {year} {siteConfig.name}
					</p>
					<Link href="/contact">Available for opportunities</Link>
				</div>
			</div>
		</footer>
	);
}

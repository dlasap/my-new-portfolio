import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import styles from "./AboutTeaser.module.css";

export function AboutTeaser() {
	return (
		<section className={styles.section} aria-labelledby="about-teaser-title">
			<div className={`container ${styles.grid}`}>
				<div>
					<p className={styles.eyebrow}>About</p>
					<h2 id="about-teaser-title" className={styles.title}>
						{siteConfig.about.headline}
					</h2>
					<p className={styles.body}>{siteConfig.about.body}</p>
					<Link href="/about" className={styles.link}>
						More about me →
					</Link>
				</div>
				<div className={styles.media}>
					<Image
						src="/about-photo.jpg"
						alt={`${siteConfig.name} portrait`}
						fill
						sizes="(max-width: 800px) 100vw, 40vw"
					/>
				</div>
			</div>
		</section>
	);
}

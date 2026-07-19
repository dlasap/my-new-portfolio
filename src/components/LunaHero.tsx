import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data";
import styles from "./LunaHero.module.css";

export function LunaHero() {
	return (
		<section className={styles.hero} aria-labelledby="hero-name">
			<div className={`container ${styles.frame}`}>
				<div className={`${styles.content} animate-fade-up`}>
					<p className={styles.eyebrow}>{siteConfig.location}</p>
					<h1 id="hero-name" className={styles.brand}>
						{siteConfig.name}
					</h1>
					<p className={styles.role}>{siteConfig.role}</p>
					<p className={styles.tagline}>{siteConfig.tagline}</p>
					<div className={styles.actions}>
						<Link href="/contact" className={styles.primary}>
							Contact me
						</Link>
						<a
							href={siteConfig.resumePath}
							className={styles.secondary}
							download
						>
							Download resume
						</a>
						<a href="#selected-work" className={styles.ghost}>
							{siteConfig.copy.heroSelectedWork}
						</a>
					</div>
				</div>

				<div className={`${styles.portraitWrap} animate-fade-up`}>
					<div className={styles.portrait}>
						<Image
							src={siteConfig.images.hero}
							alt={`${siteConfig.name} portrait`}
							fill
							priority
							sizes="(max-width: 900px) 60vw, 18rem"
							className={styles.photo}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

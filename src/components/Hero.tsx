import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import styles from "./Hero.module.css";

export function Hero() {
	return (
		<section className={styles.hero} aria-labelledby="hero-name">
			<div className={`container ${styles.inner}`}>
				<div className={styles.content}>
					<h1
						id="hero-name"
						className={`${styles.brand} animate-fade-up`}
					>
						{siteConfig.name}
					</h1>
					<p className={`${styles.role} animate-fade-up-delay-1`}>
						{siteConfig.role}
					</p>
					<p className={`${styles.tagline} animate-fade-up-delay-2`}>
						{siteConfig.tagline}
					</p>
					<div className={`${styles.actions} animate-fade-up-delay-3`}>
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
							Selected work
						</a>
					</div>
				</div>

				<div className={`${styles.portrait} animate-fade-up-delay-2`}>
					<Image
						src="/hero.jpg"
						alt={`${siteConfig.name} portrait`}
						fill
						priority
						sizes="(max-width: 860px) 70vw, 24rem"
					/>
				</div>
			</div>
		</section>
	);
}

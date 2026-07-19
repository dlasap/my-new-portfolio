import Image from "next/image";
import Link from "next/link";
import { personaId, siteConfig } from "@/data";
import { LoopingTypewriter } from "./LoopingTypewriter";
import { LunaHero } from "./LunaHero";
import { Typewriter } from "./Typewriter";
import styles from "./Hero.module.css";

export function Hero() {
	if (personaId === "luna") {
		return <LunaHero />;
	}

	const useTypewriter = siteConfig.features.typewriter;

	return (
		<section className={styles.hero} aria-labelledby="hero-name">
			<div className={`container ${styles.inner}`}>
				<div className={styles.content}>
					<h1 id="hero-name" className={styles.brand}>
						{useTypewriter ? (
							<Typewriter text={siteConfig.name} speed={55} />
						) : (
							siteConfig.name
						)}
					</h1>
					<p className={styles.role}>
						{useTypewriter ? (
							<Typewriter
								text={siteConfig.role}
								speed={16}
								startDelay={850}
							/>
						) : (
							siteConfig.role
						)}
					</p>
					<p className={styles.tagline}>
						{useTypewriter ? (
							<Typewriter
								text={siteConfig.tagline}
								speed={9}
								startDelay={1700}
							/>
						) : (
							siteConfig.tagline
						)}
					</p>
					<div
						className={`${styles.actions}${useTypewriter ? " animate-fade-up-delay-3" : " animate-fade-up"}`}
					>
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

				<div
					className={`${styles.portraitCol}${useTypewriter ? " animate-fade-up-delay-2" : " animate-fade-up"}`}
				>
					<div className={styles.portrait}>
						<Image
							src={siteConfig.images.hero}
							alt={`${siteConfig.name} portrait`}
							fill
							priority
							sizes="(max-width: 860px) 70vw, 24rem"
							unoptimized={siteConfig.images.hero.endsWith(".svg")}
						/>
					</div>
					{useTypewriter && (
						<p className={styles.loopBadge}>
							<span className={styles.loopPrefix}>I</span>{" "}
							<LoopingTypewriter
								words={[...siteConfig.copy.loopWords]}
								startDelay={2800}
								className={styles.loopWords}
							/>
						</p>
					)}
				</div>
			</div>
		</section>
	);
}

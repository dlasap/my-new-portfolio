import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { LoopingTypewriter } from "./LoopingTypewriter";
import { Typewriter } from "./Typewriter";
import styles from "./Hero.module.css";

const loopWords = [
	"Plan",
	"Build",
	"Ship",
	"Optimize",
	"Debug",
	"Fix",
	"Refactor",
	"Maintain",
	"Improve",
	"Scale",
];

export function Hero() {
	return (
		<section className={styles.hero} aria-labelledby="hero-name">
			<div className={`container ${styles.inner}`}>
				<div className={styles.content}>
					<h1 id="hero-name" className={styles.brand}>
						<Typewriter text={siteConfig.name} speed={55} />
					</h1>
					<p className={styles.role}>
						<Typewriter
							text={siteConfig.role}
							speed={16}
							startDelay={850}
						/>
					</p>
					<p className={styles.tagline}>
						<Typewriter
							text={siteConfig.tagline}
							speed={9}
							startDelay={1700}
						/>
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

				<div className={`${styles.portraitCol} animate-fade-up-delay-2`}>
					<div className={styles.portrait}>
						<Image
							src="/hero.jpg"
							alt={`${siteConfig.name} portrait`}
							fill
							priority
							sizes="(max-width: 860px) 70vw, 24rem"
						/>
					</div>
					<p className={styles.loopBadge}>
						<span className={styles.loopPrefix}>I</span>{" "}
						<LoopingTypewriter
							words={loopWords}
							startDelay={2800}
							className={styles.loopWords}
						/>
					</p>
				</div>
			</div>
		</section>
	);
}

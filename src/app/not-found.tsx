import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
	title: "Page not found",
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<div className={styles.page}>
			<div>
				<h1 className={styles.title}>404</h1>
				<p className={styles.copy}>This page doesn&apos;t exist.</p>
				<Link href="/" className={styles.link}>
					Back home →
				</Link>
			</div>
		</div>
	);
}

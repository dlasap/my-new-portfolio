"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import styles from "./Header.module.css";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/projects", label: "Projects" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
];

export function Header() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	return (
		<header
			className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
		>
			<div className={`container ${styles.inner}`}>
				<Link href="/" className={styles.brand} aria-label="Home">
					{siteConfig.name.split(" ")[0]}
					<span>.</span>
				</Link>

				<nav className={styles.nav} aria-label="Primary">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							aria-current={pathname === link.href ? "page" : undefined}
						>
							{link.label}
						</Link>
					))}
				</nav>

				<button
					type="button"
					className={styles.menuButton}
					aria-expanded={open}
					aria-controls="mobile-nav"
					aria-label={open ? "Close menu" : "Open menu"}
					onClick={() => setOpen((v) => !v)}
				>
					<span />
				</button>
			</div>

			<nav
				id="mobile-nav"
				className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
				aria-label="Mobile"
			>
				{links.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						aria-current={pathname === link.href ? "page" : undefined}
					>
						{link.label}
					</Link>
				))}
			</nav>
		</header>
	);
}

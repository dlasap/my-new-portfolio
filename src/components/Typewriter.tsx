"use client";

import { useEffect, useState } from "react";
import styles from "./Typewriter.module.css";

type Props = {
	text: string;
	/** ms per character */
	speed?: number;
	/** ms before typing starts */
	startDelay?: number;
	/** keep the caret blinking after typing finishes */
	keepCaret?: boolean;
	className?: string;
};

export function Typewriter({
	text,
	speed = 35,
	startDelay = 0,
	keepCaret = false,
	className,
}: Props) {
	const [count, setCount] = useState(0);
	const [started, setStarted] = useState(false);
	const done = count >= text.length;

	useEffect(() => {
		const startTimer = window.setTimeout(() => {
			setStarted(true);
		}, startDelay);

		return () => window.clearTimeout(startTimer);
	}, [startDelay]);

	useEffect(() => {
		if (!started || done) return;

		const timer = window.setTimeout(() => {
			setCount((c) => Math.min(c + 1, text.length));
		}, speed);

		return () => window.clearTimeout(timer);
	}, [started, done, count, speed, text.length]);

	return (
		<span className={`${styles.wrap} ${className ?? ""}`}>
			{/* Invisible full text reserves space so nothing jumps while typing */}
			<span className={styles.ghost} aria-hidden="true">
				{text}
			</span>
			<span className={styles.typed} aria-hidden="true">
				{text.slice(0, count)}
				{(!done || keepCaret) && (
					<span
						className={`${styles.caret} ${done ? styles.caretBlink : ""}`}
					/>
				)}
			</span>
			<span className="sr-only">{text}</span>
		</span>
	);
}

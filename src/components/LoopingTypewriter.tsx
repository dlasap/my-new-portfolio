"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./Typewriter.module.css";

type Phase = "idle" | "typing" | "pausing" | "deleting";

type Props = {
	words: string[];
	/** ms per character when typing */
	typeSpeed?: number;
	/** ms per character when deleting */
	deleteSpeed?: number;
	/** ms a completed word stays on screen */
	pause?: number;
	/** ms before the loop starts */
	startDelay?: number;
	className?: string;
};

export function LoopingTypewriter({
	words,
	typeSpeed = 70,
	deleteSpeed = 35,
	pause = 1300,
	startDelay = 0,
	className,
}: Props) {
	const [wordIndex, setWordIndex] = useState(0);
	const [count, setCount] = useState(0);
	const [phase, setPhase] = useState<Phase>("idle");

	const word = words[wordIndex % words.length];
	const longest = useMemo(
		() => words.reduce((a, b) => (b.length > a.length ? b : a), ""),
		[words],
	);

	useEffect(() => {
		const timer = window.setTimeout(() => setPhase("typing"), startDelay);
		return () => window.clearTimeout(timer);
	}, [startDelay]);

	useEffect(() => {
		if (phase === "idle") return;

		let timer: number;

		if (phase === "typing") {
			if (count < word.length) {
				timer = window.setTimeout(
					() => setCount((c) => c + 1),
					typeSpeed,
				);
			} else {
				timer = window.setTimeout(() => setPhase("deleting"), pause);
			}
		} else if (phase === "deleting") {
			if (count > 0) {
				timer = window.setTimeout(
					() => setCount((c) => c - 1),
					deleteSpeed,
				);
			} else {
				setWordIndex((i) => (i + 1) % words.length);
				setPhase("typing");
			}
		}

		return () => window.clearTimeout(timer);
	}, [phase, count, word, typeSpeed, deleteSpeed, pause, words.length]);

	return (
		<span
			className={`${styles.wrap} ${styles.nowrap} ${className ?? ""}`}
			aria-hidden="true"
		>
			{/* Longest word reserves width so the line never shifts */}
			<span className={styles.ghost}>{longest}</span>
			<span className={styles.typed}>
				{word.slice(0, count)}
				<span
					className={`${styles.caret} ${
						phase === "pausing" || count === word.length
							? styles.caretBlink
							: ""
					}`}
				/>
			</span>
		</span>
	);
}

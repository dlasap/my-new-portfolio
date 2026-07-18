"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ProjectGallery.module.css";

type Props = {
	title: string;
	images: string[];
	open: boolean;
	initialIndex?: number;
	onClose: () => void;
};

export function ProjectGallery({
	title,
	images,
	open,
	initialIndex = 0,
	onClose,
}: Props) {
	const [index, setIndex] = useState(initialIndex);
	const closeRef = useRef<HTMLButtonElement>(null);
	const titleId = useId();

	useEffect(() => {
		if (open) setIndex(initialIndex);
	}, [open, initialIndex]);

	const goPrev = useCallback(() => {
		setIndex((i) => (i - 1 + images.length) % images.length);
	}, [images.length]);

	const goNext = useCallback(() => {
		setIndex((i) => (i + 1) % images.length);
	}, [images.length]);

	useEffect(() => {
		if (!open) return;

		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		closeRef.current?.focus();

		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") goPrev();
			if (e.key === "ArrowRight") goNext();
		};

		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prevOverflow;
			window.removeEventListener("keydown", onKey);
		};
	}, [open, onClose, goPrev, goNext]);

	if (!open || images.length === 0) return null;

	return createPortal(
		<div
			className={styles.overlay}
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
			onClick={onClose}
		>
			<div
				className={styles.dialog}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles.top}>
					<p id={titleId} className={styles.title}>
						{title}
						<span className={styles.count}>
							{index + 1} / {images.length}
						</span>
					</p>
					<button
						ref={closeRef}
						type="button"
						className={styles.close}
						onClick={onClose}
						aria-label="Close gallery"
					>
						×
					</button>
				</div>

				<div className={styles.stage}>
					{images.length > 1 && (
						<button
							type="button"
							className={`${styles.nav} ${styles.prev}`}
							onClick={goPrev}
							aria-label="Previous screenshot"
						>
							‹
						</button>
					)}

					<div className={styles.frame}>
						<Image
							key={images[index]}
							src={images[index]}
							alt={`${title} screenshot ${index + 1}`}
							fill
							sizes="(max-width: 900px) 94vw, 900px"
							className={styles.image}
							priority
						/>
					</div>

					{images.length > 1 && (
						<button
							type="button"
							className={`${styles.nav} ${styles.next}`}
							onClick={goNext}
							aria-label="Next screenshot"
						>
							›
						</button>
					)}
				</div>

				{images.length > 1 && (
					<ul className={styles.thumbs} aria-label="Screenshots">
						{images.map((src, i) => (
							<li key={src}>
								<button
									type="button"
									className={`${styles.thumb} ${i === index ? styles.thumbActive : ""}`}
									onClick={() => setIndex(i)}
									aria-label={`Show screenshot ${i + 1}`}
									aria-current={i === index}
								>
									<Image
										src={src}
										alt=""
										width={96}
										height={60}
										sizes="96px"
									/>
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>,
		document.body,
	);
}

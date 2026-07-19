import type { Metadata } from "next";
import { AboutTeaser } from "@/components/AboutTeaser";
import { ContactCTA } from "@/components/ContactCTA";
import { Experience } from "@/components/Experience";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Hero } from "@/components/Hero";
import { personaId, siteConfig } from "@/data";

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
	alternates: { canonical: "/" },
};

export default function HomePage() {
	const isLuna = personaId === "luna";

	return (
		<>
			<Hero />
			{isLuna ? (
				<>
					<Experience />
					<FeaturedProjects />
				</>
			) : (
				<>
					<FeaturedProjects />
					<Experience />
				</>
			)}
			<AboutTeaser />
			<ContactCTA />
		</>
	);
}

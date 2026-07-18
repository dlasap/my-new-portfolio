import type { Metadata } from "next";
import { AboutTeaser } from "@/components/AboutTeaser";
import { ContactCTA } from "@/components/ContactCTA";
import { Experience } from "@/components/Experience";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Hero } from "@/components/Hero";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
	alternates: { canonical: "/" },
};

export default function HomePage() {
	return (
		<>
			<Hero />
			<FeaturedProjects />
			<Experience />
			<AboutTeaser />
			<ContactCTA />
		</>
	);
}

import { siteConfig } from "@/data";

export function JsonLd() {
	const sameAs = [
		siteConfig.socials.github,
		siteConfig.socials.linkedin,
		siteConfig.socials.facebook,
	].filter(Boolean);

	const person = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: siteConfig.name,
		url: siteConfig.url,
		email: siteConfig.email,
		jobTitle: siteConfig.role,
		address: {
			"@type": "PostalAddress",
			addressCountry: "PH",
		},
		sameAs,
		image: `${siteConfig.url}${siteConfig.images.og}`,
		description: siteConfig.description,
	};

	const website = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.title,
		url: siteConfig.url,
		description: siteConfig.description,
		author: {
			"@type": "Person",
			name: siteConfig.name,
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
			/>
		</>
	);
}

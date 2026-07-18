export const siteConfig = {
	name: "Dominic Lasap",
	shortName: "Dom",
	title: "Dominic Lasap — Full-Stack Web Developer",
	url: "https://dlasap-portfolio.vercel.app",
	email: "lasapdominic@gmail.com",
	location: "Philippines",
	resumePath: "/DominicLasap-Resume.pdf",
	googleVerification: "GUzSat7XFK-F2U84wFEC-20TPzYQI-uD7BFg-GiH_68",
	ogImage: "/og-image.jpg",
	role: "Full-stack Web Developer & Computer Engineer",
	tagline:
		"I turn product requirements into reliable web apps — clean UI, solid APIs, and features that ship.",
	description:
		"Dominic Lasap is a full-stack web developer and computer engineer based in the Philippines, building scalable React and Next.js applications for international clients.",
	keywords: [
		"Dominic Lasap",
		"Dominic Gabriel Lasap",
		"Full-stack Developer",
		"Software Engineer",
		"Frontend Developer",
		"Next.js",
		"React",
		"TypeScript",
		"Portfolio",
		"Philippines",
	],
	socials: {
		github: "https://github.com/dlasap",
		linkedin:
			"https://www.linkedin.com/in/dominic-gabriel-lasap-07655a199/",
		facebook: "https://facebook.com/dominiclasap",
	},
	about: {
		headline: "Building products with international teams from the Philippines.",
		body: "I've worked on many client projects with teams around the world — collaborating closely to ship features that solve real problems. I welcome feedback and new ideas, and I keep growing as an engineer who cares about craft and delivery.",
		skills: [
			"React",
			"Next.js",
			"TypeScript",
			"JavaScript",
			"Node.js",
			"CSS / Tailwind",
			"MongoDB",
			"Firebase",
			"Docker",
			"Ruby on Rails",
			"Vue.js",
			"OpenAI APIs",
			"Figma",
			"Agile / Jira",
		],
	},
} as const;

export type SiteConfig = typeof siteConfig;

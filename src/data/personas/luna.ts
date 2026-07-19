import type { Persona } from "./types";

const placeholderLogo = "/placeholders/logo.svg";

export const lunaPersona: Persona = {
	id: "luna",
	site: {
		name: "Lunar Kaye Lavides",
		shortName: "Luna",
		title: "Lunar Kaye Lavides — Data Analyst & Process Engineer",
		url: "https://luna-portfolio.vercel.app",
		email: "kayelav2016@gmail.com",
		location: "Cebu City, Philippines",
		resumePath: "/resumes/luna.pdf",
		role: "Data Analyst & Process Engineer",
		tagline:
			"I turn messy operational data into clear decisions — yield insights, quality systems, and research you can trust.",
		description:
			"Lunar Kaye Lavides is a data analyst and process engineer based in Cebu, Philippines, with experience in semiconductor manufacturing, educational data research, and customer support.",
		keywords: [
			"Lunar Kaye Lavides",
			"Luna Lavides",
			"Data Analyst",
			"Process Engineer",
			"Power BI",
			"Excel",
			"Semiconductor",
			"Cebu",
			"Philippines",
		],
		theme: "luna",
		features: {
			typewriter: false,
		},
		images: {
			hero: "/personas/luna/portrait.png",
			about: "/personas/luna/portrait.png",
			og: "/personas/luna/portrait.png",
			favicon: "/personas/luna/favicon.svg",
		},
		socials: {
			linkedin: "https://www.linkedin.com/in/lunarkaye",
		},
		about: {
			headline:
				"Data-driven process improvement from the semiconductor floor to remote research.",
			body: "I bring a chemical engineering foundation and hands-on manufacturing experience to data analysis — collecting, validating, and organizing information so teams can act with confidence. From yield metrics to educational records, I care about accuracy, structure, and clear documentation.",
			bodyExtra:
				"I thrive where analysis meets operations: spotting root causes, building reliable spreadsheets and databases, and translating findings into practical recommendations for quality and continuous improvement.",
			skills: [
				"Data Analysis & Interpretation",
				"Microsoft Excel",
				"Microsoft Power BI",
				"Microsoft PowerPoint",
				"Statistical Methods / DOE",
				"Technical & Report Writing",
				"Quality Control Systems",
				"Database & Spreadsheet Management",
				"Customer Support",
				"Communication",
				"Time Management",
				"Multitasking",
			],
		},
		nav: {
			projectsLabel: "Highlights",
		},
		copy: {
			featuredEyebrow: "Selected highlights",
			featuredTitle: "Work that shows how I deliver",
			featuredMore: "View all highlights →",
			projectsPageTitle: "Highlights",
			projectsEyebrow: "Highlights",
			projectsTitle: "Impact from the work I've done",
			projectsLead:
				"Standout results across process engineering, data research, and high-volume support — focused on accuracy, yield, and operational clarity.",
			experienceTitle: "Where I've applied my craft",
			contactDescription:
				"Contact Lunar Kaye Lavides for data analyst, process engineering, and research roles.",
			contactLead:
				"Open to data analysis, process improvement, and remote research roles. Email me or connect on LinkedIn.",
			contactCtaTitle: "Let's turn data into decisions",
			contactCtaCopy:
				"Open to full-time and remote opportunities. Reach out and I'll get back to you.",
			heroSelectedWork: "Selected highlights",
			loopWords: [
				"Analyze",
				"Validate",
				"Organize",
				"Measure",
				"Improve",
				"Document",
				"Optimize",
				"Report",
				"Research",
				"Deliver",
			],
		},
	},
	experience: [
		{
			company: "Public Info Access LLC",
			role: "Data Analyst Virtual Assistant",
			location: "Wyoming, USA (Remote)",
			duration: "Jul 2025 — Present",
			logo: placeholderLogo,
		},
		{
			company: "onsemi",
			role: "Process Engineer",
			location: "Lapu-Lapu, Philippines",
			duration: "Feb 2022 — May 2025",
			logo: placeholderLogo,
		},
		{
			company: "eperformax",
			role: "Chat Support Agent",
			location: "Cebu City, Philippines",
			duration: "Jul 2021 — Nov 2021",
			logo: placeholderLogo,
		},
	],
	education: [
		{
			school: "Cebu Institute of Technology — University",
			detail: "Bachelor of Science in Chemical Engineering",
			location: "Cebu City, Philippines",
			duration: "Completed",
			logo: placeholderLogo,
		},
	],
	projects: [
		{
			id: "yield-doe",
			title: "Yield & Defect Reduction via DOE",
			description:
				"Led data-driven process improvements in semiconductor manufacturing by analyzing weekly yield and loss metrics. Used statistical methods and Design of Experiments to troubleshoot die cracks, voids, and solder contamination — achieving up to 90% defect reduction and meaningful yield gains.",
			featured: true,
			technologies: [
				"Statistical Analysis",
				"DOE",
				"Yield Metrics",
				"Root Cause Analysis",
			],
			screenshots: [],
		},
		{
			id: "automated-qc",
			title: "Automated Quality Control Systems",
			description:
				"Developed automated quality control systems that replaced manual inspections — improving data reliability and eliminating critical process errors. Kept FMEA, control plans, and work instructions current so changes stayed backed by data.",
			featured: true,
			technologies: [
				"Quality Systems",
				"FMEA",
				"Control Plans",
				"Process Documentation",
			],
			screenshots: [],
		},
		{
			id: "education-data",
			title: "Educational Data Research & Validation",
			description:
				"Managed collection, research, and organization of school-related data from multiple sources for a US-based client. Verified educational records, maintained structured databases and spreadsheets, and ran quality checks for accurate, up-to-date information.",
			featured: true,
			technologies: [
				"Data Research",
				"Excel",
				"Record Validation",
				"Database Organization",
			],
			screenshots: [],
		},
		{
			id: "cross-functional-ci",
			title: "Cross-Functional Continuous Improvement",
			description:
				"Partnered with cross-functional teams to implement cost-saving initiatives and process upgrades. Recognized through internal awards and technical symposiums for analytical problem-solving and a strong quality mindset.",
			technologies: [
				"Continuous Improvement",
				"Cross-Functional Collaboration",
				"Cost Reduction",
			],
			screenshots: [],
		},
		{
			id: "chat-support-ops",
			title: "High-Volume Chat Support Operations",
			description:
				"Delivered accurate customer support on the Shopee chat platform — resolving high inquiry volume, tracking order issues, and using service patterns to improve responses in a fast-paced digital environment.",
			technologies: [
				"Customer Support",
				"Written Communication",
				"Issue Tracking",
			],
			screenshots: [],
		},
	],
};

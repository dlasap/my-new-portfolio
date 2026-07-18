export type Project = {
	id: string;
	title: string;
	description: string;
	linkText: string;
	link: string;
	featured?: boolean;
	technologies: string[];
	screenshots: string[];
};

export const projects: Project[] = [
	{
		id: "ai-shorts",
		title: "AI Shorts — Video Generator for Real Estate",
		description:
			"Built UI and features for an AI Shorts app for real-estate products. Translated Figma into responsive interfaces, implemented video effects and transitions, markdown handling, image resize/reposition tools, and API route configuration for a Next.js app.",
		linkText: "View app",
		link: "https://app.tensixty.ai/",
		featured: true,
		technologies: [
			"JavaScript",
			"TypeScript",
			"React",
			"Next.js",
			"Tailwind CSS",
			"OpenAI",
			"Figma",
		],
		screenshots: [
			"/projects/ai-shorts-ss.webp",
			"/projects/ai-shorts-ss-3.webp",
			"/projects/ai-shorts-ss-5.webp",
			"/projects/ai-shorts-ss-4.webp",
		],
	},
	{
		id: "lending-standard",
		title: "LendingStandard — Multifamily Loan CRM",
		description:
			"Contributed to a multifamily loan platform that streamlines online lending. Worked in React, CSS, Java, MongoDB, and Docker in an Agile environment — moving from bug fixes into features and components from mockups and Jira tickets.",
		linkText: "View business",
		link: "https://app.multifamilydebt.com/",
		featured: true,
		technologies: [
			"React",
			"JavaScript",
			"Java",
			"MongoDB",
			"Docker",
			"CSS",
		],
		screenshots: [
			"/projects/ls-ss-1.webp",
			"/projects/ls-ss-2.webp",
			"/projects/ls-ss-3.webp",
		],
	},
	{
		id: "rcm-ai",
		title: "AI Web Apps — Bot, AppSheet & PDF Generator",
		description:
			"Sole web developer for an RCM engineering business. Built an AI bot (Next.js, OpenAI, Node.js) that processes engineer inputs into tables, text, and exportable PDFs. Also shipped Google AppSheet apps with AppScript automation and explored mobile deployments.",
		linkText: "View deployed app",
		link: "https://reliability-management-frontend.vercel.app/analysis_bot/new",
		featured: true,
		technologies: [
			"Next.js",
			"React",
			"OpenAI",
			"Google AppSheet",
			"Apps Script",
			"Vercel",
		],
		screenshots: [
			"/projects/rcm-ss-1.webp",
			"/projects/rcm-ss-2.webp",
			"/projects/rcm-ss-3.webp",
			"/projects/rcm-ss-4.webp",
		],
	},
	{
		id: "trs-express",
		title: "Business Templates Builder",
		description:
			"Built a user-friendly web editor for small businesses to customize documents like payroll templates. Worked across Next.js, Figma, and Mantine UI; implemented SSO, dashboard features, and ReCaptcha. Also contributed backend work in Ruby on Rails.",
		linkText: "View business",
		link: "https://trsexpress.com/",
		technologies: [
			"Next.js",
			"React",
			"Ruby on Rails",
			"Mantine UI",
			"Figma",
			"Azure",
		],
		screenshots: [
			"/projects/trs-ss-1.webp",
			"/projects/trs-ss-2.webp",
			"/projects/trs-ss-3.webp",
			"/projects/trs-ss-4.webp",
		],
	},
	{
		id: "plannet",
		title: "Plannet — Itinerary App",
		description:
			"Worked on a React and Node.js product showcasing planners' itineraries worldwide. Handled frontend and backend tasks including component implementation, bug fixing, and backend testing on a tight timeline.",
		linkText: "View business",
		link: "https://plannet.io/",
		technologies: ["React", "Node.js", "JavaScript", "CSS"],
		screenshots: [
			"/projects/planet-ss-1.webp",
			"/projects/planet-ss-2.webp",
		],
	},
	{
		id: "gorentals",
		title: "GoRentals — Luxury Vehicle CRM",
		description:
			"Trained in full-stack JavaScript (React, Node.js, Express, RethinkDB), then joined the frontend team with TypeScript and React. Later moved to the database team — building migration, resync, and SendGrid email services, and helping frontend teammates with API access.",
		linkText: "View business",
		link: "https://www.gorentals.com/",
		technologies: [
			"React",
			"TypeScript",
			"NestJS",
			"RethinkDB",
			"Node.js",
			"SendGrid",
		],
		screenshots: [],
	},
	{
		id: "filinvest",
		title: "Filinvest — Multiproperty Web Apps",
		description:
			"Helped upgrade a real-estate client site to Next.js and Tailwind CSS. Fixed responsiveness issues, restored missing features, improved search and pagination, and maintained the codebase in Git.",
		linkText: "View business",
		link: "https://filinvest.com/",
		technologies: ["Next.js", "React", "Tailwind CSS"],
		screenshots: [],
	},
	{
		id: "one-click-design",
		title: "CRM App — Real Estate Showrooms & Assets",
		description:
			"Built a CRM for managing products, customers, users, and properties using Vue.js, Tailwind CSS, Google Auth, and Firebase. Owned dashboard tables and Firebase data, working directly with the owner and team in daily meetings.",
		linkText: "View business",
		link: "https://www.1clickdesign.com/virtual_showroom",
		technologies: ["Vue.js", "Tailwind CSS", "Firebase", "Google Auth"],
		screenshots: [],
	},
];

export const featuredProjects = projects.filter((p) => p.featured);

import type { Persona } from "./types";

const placeholderLogo = "/placeholders/logo.svg";
const placeholderPhoto = "/placeholders/portrait.svg";

export const theresePersona: Persona = {
	id: "therese",
	site: {
		name: "Therese Angela Lasap",
		shortName: "Therese",
		title: "Therese Angela Lasap — HR Professional & Registered Psychometrician",
		url: "https://therese-portfolio.vercel.app",
		email: "thereselasap@gmail.com",
		location: "Cebu City, Philippines",
		resumePath: "/resumes/therese.pdf",
		role: "HR Professional & Registered Psychometrician",
		tagline:
			"I build fair hiring journeys and steady employee relations — organized, people-first, and detail-driven.",
		description:
			"Therese Angela Lasap is a Registered Psychometrician and HR professional based in Cebu, Philippines, with experience in recruitment, employee relations, engagement, and remote administrative support.",
		keywords: [
			"Therese Angela Lasap",
			"Therese Lasap",
			"Registered Psychometrician",
			"Human Resources",
			"Recruitment",
			"Employee Relations",
			"Cebu",
			"Philippines",
		],
		theme: "therese",
		features: {
			typewriter: false,
		},
		images: {
			hero: placeholderPhoto,
			about: placeholderPhoto,
			og: placeholderPhoto,
		},
		socials: {
			linkedin: "https://www.linkedin.com/in/thereseangela12",
		},
		about: {
			headline:
				"People operations with almost four years in Human Resources.",
			body: "I am a Registered Psychometrician skilled in recruitment, employee relations, engagement, administrative support, and customer service. I currently support an Australian company remotely while bringing a strong foundation from university and hospital HR environments.",
			bodyExtra:
				"I am highly organized, detail-oriented, and committed to delivering excellent service — whether facilitating merit-based selection, counseling through employee concerns, or processing finance applications with care.",
			skills: [
				"Recruitment & Onboarding",
				"Employee Relations & Engagement",
				"Administrative Support",
				"Communication",
				"Coordination & Collaboration",
				"Compliance & Policy Knowledge",
				"Customer Service",
				"Interpersonal Skills",
				"IQ & Personality Testing",
				"Exit Interview Analysis",
			],
		},
		nav: {
			projectsLabel: "Highlights",
		},
		copy: {
			featuredEyebrow: "Selected highlights",
			featuredTitle: "Work that shows how I support people",
			featuredMore: "View all highlights →",
			projectsPageTitle: "Highlights",
			projectsEyebrow: "Highlights",
			projectsTitle: "Impact across HR and client support",
			projectsLead:
				"Highlights from recruitment, employee relations, and remote client support — focused on fairness, process, and clear communication.",
			experienceTitle: "Where I've supported people and teams",
			contactDescription:
				"Contact Therese Angela Lasap for HR, recruitment, and administrative support roles.",
			contactLead:
				"Open to HR, recruitment, and remote support opportunities. Email me or connect on LinkedIn.",
			contactCtaTitle: "Let's talk about your people needs",
			contactCtaCopy:
				"Open to full-time and remote roles. Reach out and I'll get back to you.",
			heroSelectedWork: "Selected highlights",
			loopWords: [
				"Recruit",
				"Screen",
				"Support",
				"Counsel",
				"Coordinate",
				"Document",
				"Engage",
				"Advise",
				"Organize",
				"Deliver",
			],
		},
	},
	experience: [
		{
			company: "Solaris Finance",
			role: "Finance Associate",
			location: "Australia (Remote)",
			duration: "Feb 2026 — Present",
			logo: placeholderLogo,
		},
		{
			company: "Cebu Normal University",
			role: "Administrative Officer II (HRMO I)",
			location: "Cebu City, Philippines",
			duration: "Mar 2024 — Jul 2025",
			logo: placeholderLogo,
		},
		{
			company: "Cebu Doctors' University Hospital",
			role: "Employee Relations Specialist",
			location: "Cebu City, Philippines",
			duration: "May 2023 — Aug 2023",
			logo: placeholderLogo,
		},
		{
			company: "Cebu Doctors' University Hospital",
			role: "Human Resource Associate",
			location: "Cebu City, Philippines",
			duration: "Apr 2022 — May 2023",
			logo: placeholderLogo,
		},
		{
			company: "Aventus Medical Care, Inc.",
			role: "Human Resources Assistant",
			location: "Cebu City, Philippines",
			duration: "Nov 2021 — Mar 2022",
			logo: placeholderLogo,
		},
		{
			company: "Mactan Doctors' Hospital",
			role: "Human Resource Staff",
			location: "Lapu-Lapu City, Philippines",
			duration: "Oct 2020 — Aug 2021",
			logo: placeholderLogo,
		},
	],
	education: [
		{
			school: "University of San Carlos",
			detail: "Bachelor of Science in Psychology (Cum Laude)",
			location: "Cebu City, Philippines",
			duration: "2015 — 2019",
			logo: "/logos/usc-logo.png",
		},
	],
	projects: [
		{
			id: "hrmpsb-recruitment",
			title: "Merit-Based Recruitment (HRMPSB)",
			description:
				"Prepared vacancy publications for CSC and PIO, pre-screened applications, tracked candidates, scheduled HRMPSB and presidential interviews, administered IQ and personality tests, and prepared screening results and deliberation minutes end to end.",
			featured: true,
			technologies: [
				"Recruitment",
				"HRMPSB",
				"Psychometrics",
				"Civil Service Process",
			],
			screenshots: [],
		},
		{
			id: "employee-relations",
			title: "Employee Relations & Due Process",
			description:
				"Prepared disciplinary notices, led incident investigations, facilitated administrative hearings, and coordinated closely with department heads and HR leadership — balancing policy compliance with fair, clear communication.",
			featured: true,
			technologies: [
				"Employee Relations",
				"Investigations",
				"Due Process",
				"Policy Compliance",
			],
			screenshots: [],
		},
		{
			id: "solar-finance",
			title: "Solar Finance Application Support",
			description:
				"Process solar finance applications for an Australian lender — assessing client profiles, recommending suitable green and personal loan options, and ensuring applications meet regulatory and financier requirements.",
			featured: true,
			technologies: [
				"Client Assessment",
				"Loan Products",
				"Compliance",
				"Remote Admin Support",
			],
			screenshots: [],
		},
		{
			id: "onboarding-gov",
			title: "Onboarding & Government Memberships",
			description:
				"Guided candidates through pre-employment requirements, medical referrals, ID and government forms, and SSS, PhilHealth, HDMF, and BIR membership processing — handing new hires cleanly to requisitioning teams.",
			technologies: [
				"Onboarding",
				"Government Forms",
				"Candidate Coordination",
			],
			screenshots: [],
		},
		{
			id: "exit-interviews",
			title: "Exit Interview Insights",
			description:
				"Conducted, tallied, and interpreted exit interview results for resigning employees — turning feedback into clearer patterns for leadership and continuous improvement in employee experience.",
			technologies: [
				"Exit Interviews",
				"Data Interpretation",
				"Employee Experience",
			],
			screenshots: [],
		},
	],
};

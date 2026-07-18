export type Experience = {
	company: string;
	role: string;
	location: string;
	duration: string;
	type?: string;
	logo: string;
};

export const experience: Experience[] = [
	{
		company: "Full Scale",
		role: "Software Engineer",
		location: "Cebu, Philippines (Remote)",
		duration: "Jun 2022 — Present",
		logo: "/logos/fullscale-logo.jpeg",
	},
	{
		company: "Reliability Management",
		role: "Full Stack Developer",
		location: "United Kingdom (Remote)",
		duration: "Apr 2023 — Present",
		type: "Part-time",
		logo: "/logos/reliability-logo.png",
	},
	{
		company: "Filinvest",
		role: "Frontend Developer",
		location: "Philippines (Remote)",
		duration: "Dec 2023 — Mar 2024",
		type: "Part-time",
		logo: "/logos/filinvestlogo.png",
	},
	{
		company: "1ClickDesign",
		role: "Frontend Developer",
		location: "Philippines (Remote)",
		duration: "Apr 2023 — Nov 2023",
		type: "Part-time",
		logo: "/logos/1cd-logo.png",
	},
	{
		company: "DNA Micro",
		role: "Software Engineer",
		location: "Cebu, Philippines",
		duration: "May 2021 — Jun 2022",
		logo: "/logos/dnamicro-logo.jpeg",
	},
];

export type Education = {
	school: string;
	detail: string;
	location: string;
	duration: string;
	logo: string;
};

export const education: Education[] = [
	{
		school: "University of San Carlos",
		detail: "College & Elementary",
		location: "Cebu, Philippines",
		duration: "2003–2011, 2015–2020",
		logo: "/logos/usc-logo.png",
	},
	{
		school: "Future Generation Philippines",
		detail: "High School",
		location: "Kingdom of Saudi Arabia",
		duration: "2012–2014",
		logo: "/logos/fugen-logo.jpg",
	},
];

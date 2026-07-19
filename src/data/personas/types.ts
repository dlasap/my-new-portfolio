export type ThemeId = "dominic" | "luna" | "therese";
export type PersonaId = ThemeId;

export type Experience = {
	company: string;
	role: string;
	location: string;
	duration: string;
	type?: string;
	logo: string;
};

export type Education = {
	school: string;
	detail: string;
	location: string;
	duration: string;
	logo: string;
};

export type Project = {
	id: string;
	title: string;
	description: string;
	linkText?: string;
	link?: string;
	featured?: boolean;
	technologies: string[];
	screenshots: string[];
};

export type SiteConfig = {
	name: string;
	shortName: string;
	title: string;
	url: string;
	email: string;
	location: string;
	resumePath: string;
	googleVerification?: string;
	role: string;
	tagline: string;
	description: string;
	keywords: string[];
	theme: ThemeId;
	features: {
		typewriter: boolean;
	};
	images: {
		hero: string;
		about: string;
		og: string;
	};
	socials: {
		github?: string;
		linkedin?: string;
		facebook?: string;
	};
	about: {
		headline: string;
		body: string;
		bodyExtra?: string;
		skills: string[];
	};
	nav: {
		projectsLabel: string;
	};
	copy: {
		featuredEyebrow: string;
		featuredTitle: string;
		featuredMore: string;
		projectsPageTitle: string;
		projectsEyebrow: string;
		projectsTitle: string;
		projectsLead: string;
		experienceTitle: string;
		contactDescription: string;
		contactLead: string;
		contactCtaTitle: string;
		contactCtaCopy: string;
		heroSelectedWork: string;
		loopWords: string[];
	};
};

export type Persona = {
	id: PersonaId;
	site: SiteConfig;
	experience: Experience[];
	education: Education[];
	projects: Project[];
};

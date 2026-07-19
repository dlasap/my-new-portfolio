import { dominicPersona } from "./dominic";
import { lunaPersona } from "./luna";
import { theresePersona } from "./therese";
import type { Persona, PersonaId, SiteConfig } from "./types";

const personas: Record<PersonaId, Persona> = {
	dominic: dominicPersona,
	luna: lunaPersona,
	therese: theresePersona,
};

function resolvePersonaId(): PersonaId {
	const raw = process.env.PORTFOLIO_PERSONA?.trim().toLowerCase();
	if (raw === "luna" || raw === "therese" || raw === "dominic") {
		return raw;
	}
	return "dominic";
}

const active = personas[resolvePersonaId()];

function withSiteUrl(site: SiteConfig): SiteConfig {
	const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
	if (!fromEnv) return site;
	return { ...site, url: fromEnv.replace(/\/$/, "") };
}

export const personaId = active.id;
export const siteConfig = withSiteUrl(active.site);
export const experience = active.experience;
export const education = active.education;
export const projects = active.projects;
export const featuredProjects = projects.filter((p) => p.featured);

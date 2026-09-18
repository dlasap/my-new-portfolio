import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { featuredProjects, getProject, projects } from "@/content/projects";
import { roles } from "@/content/experience";
import { stackGroups } from "@/content/stack";
import { profile } from "@/content/profile";

const allStackItems = new Set(stackGroups.flatMap((g) => g.items));

describe("projects", () => {
  it("has at least five entries", () => {
    expect(projects.length).toBeGreaterThanOrEqual(5);
  });

  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses url-safe slugs", () => {
    for (const p of projects) {
      expect(p.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("populates every required case-study field", () => {
    for (const p of projects) {
      expect(p.title.length, `${p.slug} title`).toBeGreaterThan(0);
      expect(p.summary.length, `${p.slug} summary`).toBeGreaterThan(40);
      expect(p.problem.length, `${p.slug} problem`).toBeGreaterThan(40);
      expect(p.outcome.length, `${p.slug} outcome`).toBeGreaterThan(20);
      expect(p.decisions.length, `${p.slug} decisions`).toBeGreaterThanOrEqual(2);
      expect(p.stack.length, `${p.slug} stack`).toBeGreaterThan(0);
    }
  });

  it("references only screenshots that exist on disk", () => {
    for (const p of projects) {
      for (const shot of p.screenshots) {
        const path = join(process.cwd(), "public", shot.src);
        expect(existsSync(path), `missing ${shot.src} for ${p.slug}`).toBe(true);
      }
    }
  });

  it("gives every screenshot descriptive alt text", () => {
    for (const p of projects) {
      for (const shot of p.screenshots) {
        expect(shot.alt.length, `${p.slug} alt`).toBeGreaterThan(10);
      }
    }
  });

  it("references only technologies declared in the stack model", () => {
    for (const p of projects) {
      for (const tech of p.stack) {
        expect(allStackItems.has(tech), `${p.slug} uses undeclared "${tech}"`).toBe(true);
      }
    }
  });

  it("exposes exactly the featured subset", () => {
    expect(featuredProjects).toEqual(projects.filter((p) => p.featured));
    expect(featuredProjects.length).toBeGreaterThanOrEqual(5);
  });

  it("looks projects up by slug", () => {
    expect(getProject("paddlebag")?.title).toBeDefined();
    expect(getProject("does-not-exist")).toBeUndefined();
  });
});

describe("experience", () => {
  it("declares roles with highlights", () => {
    expect(roles.length).toBeGreaterThanOrEqual(6);
    for (const r of roles) {
      expect(r.highlights.length, `${r.org} highlights`).toBeGreaterThan(0);
    }
  });
});

describe("profile", () => {
  it("points at assets that exist", () => {
    expect(existsSync(join(process.cwd(), "public", profile.resumePath))).toBe(true);
    expect(existsSync(join(process.cwd(), "public", profile.photoPath))).toBe(true);
  });

  it("carries exactly three hero stats", () => {
    expect(profile.stats).toHaveLength(3);
  });
});
import { describe, expect, it } from "vitest";
import { absoluteUrl, buildMetadata, jsonLd, personSchema, siteName, websiteSchema } from "@/lib/seo";

describe("absoluteUrl", () => {
  it("joins a path onto the site origin", () => {
    expect(absoluteUrl("/work/paddlebag")).toMatch(/^https?:\/\/.+\/work\/paddlebag$/);
  });

  it("does not double up slashes", () => {
    expect(absoluteUrl("/")).not.toMatch(/\/$/);
  });
});

describe("buildMetadata", () => {
  const meta = buildMetadata({
    title: "PaddleBag",
    description: "A pickleball community platform built solo.",
    path: "/work/paddlebag",
  });

  it("sets a canonical url", () => {
    expect(meta.alternates?.canonical).toBe(absoluteUrl("/work/paddlebag"));
  });

  it("sets openGraph and twitter cards", () => {
    expect(meta.openGraph?.title).toBe("PaddleBag");
    expect((meta.twitter as { card: string }).card).toBe("summary_large_image");
  });
});

describe("personSchema", () => {
  const schema = personSchema() as Record<string, unknown>;

  it("declares a Person with sameAs links", () => {
    expect(schema["@type"]).toBe("Person");
    expect(Array.isArray(schema.sameAs)).toBe(true);
    expect((schema.sameAs as string[]).length).toBeGreaterThanOrEqual(3);
  });
});
describe("websiteSchema", () => {
  const schema = websiteSchema() as Record<string, unknown>;

  it("names the site so Google doesn't fall back to the host", () => {
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.name).toBe(siteName);
    expect(schema.name).not.toMatch(/vercel/i);
  });
});

describe("buildMetadata site name and titles", () => {
  it("sets og:site_name on every page", () => {
    const meta = buildMetadata({ title: "Work", description: "d", path: "/work" });
    expect((meta.openGraph as { siteName: string }).siteName).toBe(siteName);
  });

  it("supports absolute titles that skip the template", () => {
    const meta = buildMetadata({ title: "Home", description: "d", path: "/", absoluteTitle: true });
    expect(meta.title).toEqual({ absolute: "Home" });
  });
});

describe("jsonLd", () => {
  it("escapes < so content can't close the script tag", () => {
    expect(jsonLd({ a: "</script>" }).__html).not.toContain("</script>");
  });
});

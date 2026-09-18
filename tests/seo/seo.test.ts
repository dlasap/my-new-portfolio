import { describe, expect, it } from "vitest";
import { absoluteUrl, buildMetadata, personSchema } from "@/lib/seo";

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
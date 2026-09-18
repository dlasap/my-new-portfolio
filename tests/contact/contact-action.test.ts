import { describe, expect, it } from "vitest";
import { submitContact } from "@/app/actions/contact";

function formWith(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  fd.set("name", "Grace Hopper");
  fd.set("email", "grace@example.com");
  fd.set("message", "I would like to talk about a remote full-stack role on my team.");
  for (const [k, v] of Object.entries(overrides)) fd.set(k, v);
  return fd;
}

describe("submitContact validation", () => {
  it("rejects a too-short name", async () => {
    const state = await submitContact({ status: "idle" }, formWith({ name: "G" }));
    expect(state.status).toBe("error");
    expect(state.fieldErrors?.name).toBeDefined();
  });

  it("rejects an invalid email with Zod 4 top-level z.email", async () => {
    const state = await submitContact({ status: "idle" }, formWith({ email: "not-an-email" }));
    expect(state.status).toBe("error");
    expect(state.fieldErrors?.email).toBeDefined();
  });

  it("rejects a too-short message", async () => {
    const state = await submitContact(
      { status: "idle" },
      formWith({ message: "hi" }),
    );
    expect(state.status).toBe("error");
    expect(state.fieldErrors?.message).toBeDefined();
  });

  it("silently succeeds on honeypot submission", async () => {
    const state = await submitContact({ status: "idle" }, formWith({ company: "SpamCo" }));
    expect(state.status).toBe("success");
  });

  it("reports a friendly error when email is not configured", async () => {
    const state = await submitContact({ status: "idle" }, formWith());
    expect(state.status).toBe("error");
    expect(state.message).toMatch(/not configured|directly/i);
  });
});
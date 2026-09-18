import { expect, test } from "@playwright/test";

test("homepage renders complete HTML with one h1 and project links", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText(/ships whole products/);
  await expect(page.getByRole("link", { name: /paddlebag/i }).first()).toHaveAttribute(
    "href",
    "/work/paddlebag",
  );
});

test("case study is server-rendered and navigable", async ({ page }) => {
  await page.goto("/work/paddlebag");
  await expect(page.locator("h1")).toContainText("PaddleBag");
  await expect(page.getByRole("heading", { name: "The problem" })).toBeVisible();
});

test("contact page renders the form with honeypot", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
});

test("404 page renders for unknown routes", async ({ page }) => {
  const res = await page.goto("/this-route-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText(/doesn't exist/);
});

test("sitemap and robots are served", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/work/paddlebag");
});
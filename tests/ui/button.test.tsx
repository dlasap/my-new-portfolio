import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders an anchor when href is provided", () => {
    render(<Button href="/work">See my work</Button>);
    const el = screen.getByRole("link", { name: "See my work" });
    expect(el).toHaveAttribute("href", "/work");
  });

  it("renders a button element when href is absent", () => {
    render(<Button>Send</Button>);
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("marks external links safe", () => {
    render(<Button href="https://paddlebag.app">Open app</Button>);
    const el = screen.getByRole("link", { name: "Open app" });
    expect(el).toHaveAttribute("rel", "noopener noreferrer");
    expect(el).toHaveAttribute("target", "_blank");
  });
});
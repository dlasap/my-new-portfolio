import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NavBar, NAV_LINKS } from "@/components/shell/NavBar";

describe("NavBar", () => {
  it("renders a link for every nav entry", () => {
    render(<NavBar />);
    for (const link of NAV_LINKS) {
      expect(screen.getAllByRole("link", { name: link.label }).length).toBeGreaterThan(0);
    }
  });

  it("labels the navigation landmark", () => {
    render(<NavBar />);
    expect(screen.getByRole("navigation", { name: /main/i })).toBeInTheDocument();
  });
});
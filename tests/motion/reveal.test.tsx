import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Reveal } from "@/components/motion/Reveal";

beforeAll(() => {
  // jsdom has no IntersectionObserver
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

describe("Reveal", () => {
  it("renders its children regardless of observer state", () => {
    render(<Reveal>Visible content</Reveal>);
    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });
});
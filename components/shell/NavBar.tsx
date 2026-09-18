"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { MobileMenu } from "./MobileMenu";

export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {profile.shortName}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm text-muted transition-colors hover:text-paper">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <MobileMenu />
      </nav>
    </header>
  );
}
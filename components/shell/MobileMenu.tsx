"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "./NavBar";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg border border-line"
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink/95 backdrop-blur-md"
        >
          <ul className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-2xl font-semibold"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
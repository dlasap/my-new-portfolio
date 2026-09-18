"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "./NavBar";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Lock body scroll while the menu is open so the page can't
     shift around underneath the overlay on touch devices. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

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

  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={toggle}
        className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg border border-line"
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
      </button>

      {/* Always mounted; toggled with opacity/visibility so transitions run
          and the toggle button never gets remounted mid-tap. Backdrop blur
          is intentionally avoided here — a nested backdrop-filter inside the
          blurred fixed header is janky and buggy on mobile browsers. */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex h-[100dvh] flex-col items-center justify-center gap-8 bg-ink transition-[opacity,visibility] duration-200 ease-[var(--ease-out-soft)] md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              className={`transition-[opacity,transform] duration-300 ease-[var(--ease-out-soft)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: `${open ? 60 + i * 50 : 0}ms` }}
            >
              <Link
                href={link.href}
                className="text-2xl font-semibold"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href?: string;
  variant?: "primary" | "ghost";
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  download?: boolean | string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold " +
  "transition-transform duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 " +
  "disabled:pointer-events-none disabled:opacity-60 min-h-11";

const variants = {
  primary: "bg-paper text-ink hover:bg-white",
  ghost: "border border-line text-paper hover:border-white/30",
} as const;

export function Button({ href, variant = "primary", children, type = "button", disabled, download }: Props) {
  const className = `${base} ${variants[variant]}`;

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    if (download) {
      return (
        <a href={href} className={className} download={download === true ? "" : download}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={className} disabled={disabled}>
      {children}
    </button>
  );
}
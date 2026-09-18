import type { ReactNode } from "react";

export function Pill({ tone = "live", children }: { tone?: "live" | "muted"; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-iris/30 bg-iris/[0.07] px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-iris">
      {tone === "live" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
        </span>
      )}
      {children}
    </span>
  );
}
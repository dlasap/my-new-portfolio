import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 text-xs text-muted">
      {children}
    </span>
  );
}
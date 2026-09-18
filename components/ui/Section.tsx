import type { ReactNode } from "react";

type Props = { id?: string; label?: string; title?: string; children: ReactNode };

export function Section({ id, label, title, children }: Props) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      {label && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-iris">{label}</p>
      )}
      {title && (
        <h2 className="mb-10 max-w-3xl text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-start justify-center px-5 sm:px-8">
      <p className="font-mono text-sm uppercase tracking-[0.16em] text-iris">404</p>
      <h1 className="mt-3 text-[length:var(--text-h2)] font-semibold tracking-tight">
        That page doesn&apos;t exist.
      </h1>
      <p className="mt-4 text-muted">
        The link may be stale — the site was rebuilt recently. Try the work index instead.
      </p>
      <Link
        href="/work"
        className="mt-8 rounded-lg bg-paper px-5 py-3 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
      >
        See my work
      </Link>
    </div>
  );
}
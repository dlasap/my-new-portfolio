import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { profile } from "@/content/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Email ${profile.shortName} directly or send a message — replies within a day or two.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8">
      <h1 className="text-[length:var(--text-h2)] font-semibold tracking-tight">Let&apos;s talk</h1>
      <p className="mt-4 text-muted">
        Hiring, contracting, or just want to compare notes on building in public? The form below
        lands straight in my inbox — or email{" "}
        <a href={`mailto:${profile.email}`} className="underline decoration-iris/60 underline-offset-4 hover:text-paper">
          {profile.email}
        </a>
        .
      </p>
      <div className="mt-12">
        <ContactForm />
      </div>
    </div>
  );
}
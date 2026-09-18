import Link from "next/link";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold">{profile.name}</p>
          <p className="text-sm text-muted">{profile.role}</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted">
          <a href={`mailto:${profile.email}`} className="hover:text-paper">
            {profile.email}
          </a>
          <a href={profile.resumePath} download className="hover:text-paper">
            Résumé (PDF)
          </a>
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
            GitHub
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
            LinkedIn
          </a>
        </div>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.shortName}
        </p>
      </div>
      <Link href="/" className="sr-only">
        Back to top
      </Link>
    </footer>
  );
}
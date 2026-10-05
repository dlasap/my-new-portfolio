import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { jsonLd, personSchema, siteKeywords, siteName, siteUrl, websiteSchema } from "@/lib/seo";
import { profile } from "@/content/profile";
import { Footer } from "@/components/shell/Footer";
import { NavBar } from "@/components/shell/NavBar";
import { SkipLink } from "@/components/shell/SkipLink";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.shortName} — Full-Stack Developer | React, Next.js, Node.js`,
    template: `%s | ${siteName}`,
  },
  description: profile.subhead,
  applicationName: siteName,
  keywords: siteKeywords,
  openGraph: { siteName, locale: "en_US", type: "website" },
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  robots: { index: true, follow: true },
  verification: { google: "GUzSat7XFK-F2U84wFEC-20TPzYQI-uD7BFg-GiH_68" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(personSchema())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(websiteSchema())}
        />
        <SkipLink />
        <NavBar />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
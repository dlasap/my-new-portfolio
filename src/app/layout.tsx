import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { DM_Sans, Syne } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data";
import "./globals.css";

const syne = Syne({
	subsets: ["latin"],
	variable: "--font-syne",
	display: "swap",
});

const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-dm-sans",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.title,
		template: `%s · ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [...siteConfig.keywords],
	authors: [{ name: siteConfig.name, url: siteConfig.url }],
	creator: siteConfig.name,
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		siteName: siteConfig.title,
		title: siteConfig.title,
		description: siteConfig.description,
		images: [
			{
				url: siteConfig.images.og,
				width: 1200,
				height: 630,
				alt: `${siteConfig.name} — portfolio`,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.title,
		description: siteConfig.description,
		images: [siteConfig.images.og],
	},
	robots: {
		index: true,
		follow: true,
	},
	...(siteConfig.googleVerification
		? { verification: { google: siteConfig.googleVerification } }
		: {}),
	icons: {
		icon: siteConfig.images.favicon,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			data-theme={siteConfig.theme}
			className={`${syne.variable} ${dmSans.variable}`}
		>
			<body>
				<JsonLd />
				<Header />
				<main id="main">{children}</main>
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}

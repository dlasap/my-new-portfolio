import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	outputFileTracingRoot: path.join(__dirname),
	images: {
		formats: ["image/avif", "image/webp"],
		dangerouslyAllowSVG: true,
		contentDispositionType: "attachment",
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	env: {
		PORTFOLIO_PERSONA: process.env.PORTFOLIO_PERSONA ?? "dominic",
	},
};

export default nextConfig;

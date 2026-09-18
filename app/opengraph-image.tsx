import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/seo";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "linear-gradient(135deg, #07070b 0%, #12122b 100%)",
          color: "#f2f2f5",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#818cf8", letterSpacing: 4 }}>
          {profile.availability.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, marginTop: 24 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#9a9aa8", marginTop: 16 }}>
          {profile.role} — {profile.location}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#22d3ee", marginTop: 40 }}>
          {siteUrl.replace("https://", "")}
        </div>
      </div>
    ),
    size,
  );
}
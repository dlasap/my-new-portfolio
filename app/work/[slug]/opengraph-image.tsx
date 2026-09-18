import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export function generateImageMetadata() {
  return projects.map((p) => ({ id: p.slug }));
}

export default async function OpengraphImage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

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
        <div style={{ display: "flex", fontSize: 26, color: "#818cf8", letterSpacing: 4 }}>
          {(project?.org ?? "").toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, marginTop: 24 }}>
          {project?.title ?? "Case study"}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9a9aa8", marginTop: 24 }}>
          {project?.role} · {project?.period}
        </div>
      </div>
    ),
    size,
  );
}
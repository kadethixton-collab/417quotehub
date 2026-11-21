import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#1d5fd1", color: "#fbbf24", fontSize: 64, fontWeight: 800, fontFamily: "sans-serif" }}>
        <div style={{ width: 90, height: 45, borderTop: "12px solid white", borderLeft: "12px solid white", transform: "rotate(45deg)", marginBottom: -6 }} />
        417
      </div>
    ),
    size,
  );
}

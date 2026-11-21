import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { getPrimaryTrade } from "@/lib/content";

export const alt = `${site.name}: compare ${site.quoteRange} free quotes from vetted local pros`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The preview image shown when the site is shared on Facebook, texts, Slack, etc. */
export default function OpengraphImage() {
  const trade = getPrimaryTrade();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "linear-gradient(160deg, #102a5c 0%, #173f86 55%, #0f172a 100%)", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 84, height: 84, borderRadius: 18, background: "#1d5fd1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 800, color: "#fbbf24" }}>417</div>
          <div style={{ fontSize: 44, fontWeight: 800 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.08, display: "flex", flexWrap: "wrap" }}>
            Compare {site.quoteRange} Free {trade.name} Quotes
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#fbbf24" }}>Vetted local pros. Zero spam calls.</div>
        </div>
        <div style={{ fontSize: 28, color: "#bfdbfe" }}>Springfield · Nixa · Ozark · Republic · Willard · Battlefield · Rogersville</div>
      </div>
    ),
    size,
  );
}

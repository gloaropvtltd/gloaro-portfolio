import { ImageResponse } from "next/og";

export const alt = "GLOARO PVT LTD — Innovative Digital Future & Digital Network";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a1030 0%, #1a2c7a 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>GLOARO</div>
        <div style={{ fontSize: 32, color: "#f2a71b", marginTop: 24, fontWeight: 600 }}>
          Innovative Digital Future &amp; Digital Network
        </div>
      </div>
    ),
    { ...size }
  );
}

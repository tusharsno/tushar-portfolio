import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tushar Barua | Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top-right glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Bottom-left glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative" }}>

          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "fit-content",
              padding: "6px 16px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "9999px", background: "#4ade80" }} />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", letterSpacing: "0.1em" }}>
              Open to work · Bangladesh
            </span>
          </div>

          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "20px", fontWeight: 400 }}>
              Hey, I&apos;m
            </span>
            <span
              style={{
                color: "#ffffff",
                fontSize: "80px",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-3px",
              }}
            >
              Tushar Barua
            </span>
          </div>

          {/* Title */}
          <span
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "28px",
              fontWeight: 400,
              borderLeft: "2px solid rgba(255,255,255,0.2)",
              paddingLeft: "16px",
            }}
          >
            Full Stack Developer · Next.js · TypeScript · Node.js
          </span>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "32px", marginTop: "8px" }}>
            {[
              { value: "250+", label: "Problems Solved" },
              { value: "10+", label: "Projects Built" },
              { value: "3+", label: "Live Apps" },
            ].map(({ value, label }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ color: "#ffffff", fontSize: "28px", fontWeight: 800 }}>{value}</span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            color: "rgba(255,255,255,0.25)",
            fontSize: "16px",
            letterSpacing: "0.05em",
          }}
        >
          tushar-portfolio.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const alt = "Ahmad Kurniawan — Full-Stack Developer";
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#08070e",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 640,
            height: 640,
            borderRadius: 9999,
            backgroundImage:
              "radial-gradient(circle at 32% 28%, #c4b8ff 0%, #8b76ff 42%, #241b52 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -180,
            width: 560,
            height: 560,
            borderRadius: 9999,
            backgroundImage:
              "radial-gradient(circle, rgba(99, 80, 230, 0.5) 0%, rgba(8, 7, 14, 0) 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#ab9bff",
            fontSize: 24,
            letterSpacing: "0.22em",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#8b76ff",
              display: "flex",
            }}
          />
          AHKUR.MY.ID
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 108,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              color: "#f2f0fa",
            }}
          >
            AHMAD
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 108,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              color: "#8b76ff",
            }}
          >
            KURNIAWAN
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#a6a1b8",
            fontSize: 28,
          }}
        >
          <div style={{ display: "flex" }}>
            Full-Stack Developer — Lampung, Indonesia
          </div>
          <div style={{ display: "flex", color: "#716b85", fontSize: 24 }}>
            Web · Mobile · Desktop
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

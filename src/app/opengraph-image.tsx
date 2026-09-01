import { ImageResponse } from "next/og";

export const alt = "Paleo Virtual FCEyN - Repositorio institucional 3D";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #1c1917 0%, #44403c 58%, #d6c7ad 100%)",
        color: "#fafaf9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 78% 18%, rgba(245,239,230,0.22), transparent 25%), radial-gradient(circle at 18% 82%, rgba(214,199,173,0.2), transparent 30%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 104,
          width: 760,
          height: 360,
          borderRadius: 240,
          border: "22px solid rgba(245,239,230,0.12)",
          transform: "rotate(-9deg)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 92px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 520,
            borderRadius: 999,
            padding: "10px 20px",
            background: "rgba(255,255,255,0.14)",
            border: "1px solid rgba(255,255,255,0.22)",
            fontSize: 28,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Repositorio institucional 3D
        </div>
        <div
          style={{
            marginTop: 34,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3 }}>
            Paleo Virtual
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#f5efe6" }}>
            FCEyN
          </div>
        </div>
        <div
          style={{
            marginTop: 34,
            maxWidth: 840,
            fontSize: 30,
            lineHeight: 1.35,
            color: "#e7e5e4",
          }}
        >
          Visualizador web para objetos paleontológicos digitalizados en 3D.
        </div>
      </div>
    </div>,
    size,
  );
}

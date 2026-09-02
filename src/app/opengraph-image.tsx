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
          "radial-gradient(circle at 76% 24%, rgba(89,243,255,0.24), transparent 28%), radial-gradient(circle at 20% 80%, rgba(0,255,198,0.14), transparent 34%), linear-gradient(135deg, #050b12 0%, #07111f 48%, #0b1726 100%)",
        color: "#f3ffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(rgba(89,243,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(89,243,255,0.055) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 82,
          top: 74,
          width: 364,
          height: 364,
          borderRadius: 999,
          border: "1px solid rgba(89,243,255,0.38)",
          boxShadow: "0 0 60px rgba(0,229,255,0.16)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 140,
          top: 148,
          width: 270,
          height: 210,
          display: "flex",
          transform: "rotate(-8deg)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 54,
            width: 230,
            height: 132,
            border: "12px solid rgba(213,251,255,0.82)",
            borderRadius: "55% 45% 48% 52%",
            boxShadow: "0 0 30px rgba(89,243,255,0.32)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 62,
            top: 96,
            width: 70,
            height: 50,
            border: "8px solid rgba(89,243,255,0.82)",
            borderRadius: "55%",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 154,
            top: 88,
            width: 76,
            height: 54,
            border: "8px solid rgba(89,243,255,0.72)",
            borderRadius: "55%",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 104,
            top: 188,
            width: 112,
            height: 0,
            borderTop: "8px solid rgba(0,255,198,0.74)",
            borderRadius: 999,
          }}
        />
      </div>
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
            width: 570,
            borderRadius: 999,
            padding: "12px 22px",
            background: "rgba(0,255,198,0.12)",
            border: "1px solid rgba(0,255,198,0.42)",
            color: "#00ffc6",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 3,
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
            gap: 8,
          }}
        >
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -4 }}>
            Paleo Virtual
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, color: "#59f3ff" }}>
            FCEyN
          </div>
        </div>
        <div
          style={{
            marginTop: 34,
            maxWidth: 760,
            fontSize: 30,
            lineHeight: 1.35,
            color: "rgba(243,255,255,0.72)",
          }}
        >
          Visualizador web para objetos paleontológicos digitalizados en 3D.
        </div>
      </div>
    </div>,
    size,
  );
}

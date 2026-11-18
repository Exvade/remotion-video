import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { B, H, T, clamp } from "./theme";

/** Spring 0->1 dengan config standar brand (damping 15 / stiffness 120 / mass .8). */
export const useIn = (delay = 0, damping = 15, stiffness = 120, mass = 0.8) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness, mass } });
};

/** 1 -> 0 di akhir scene (untuk fade-out). */
export const useOut = (dur: number, len = 14) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [dur - len, dur], [1, 0], clamp);
};

/**
 * Headline kinetik, muncul per kata.
 * Tandai highlight dengan *bintang*: "Tokonya *tutup* pas orang mau beli."
 */
export const Headline: React.FC<{
  text: string;
  delay?: number;
  size?: number;
  color?: string;
  accent?: string;
  align?: "left" | "center";
  stagger?: number;
  weight?: number;
  style?: React.CSSProperties;
}> = ({
  text,
  delay = 0,
  size = 84,
  color = T.white,
  accent = T.electricBlue,
  align = "center",
  stagger = 3,
  weight = 800,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let hi = false;
  const words: { w: string; hi: boolean }[] = [];
  for (const raw of text.split(" ")) {
    let w = raw;
    const startHi = w.startsWith("*");
    if (startHi) {
      hi = true;
      w = w.slice(1);
    }
    const endHi = w.includes("*");
    w = w.replace("*", "");
    words.push({ w, hi });
    if (endHi) hi = false;
  }

  return (
    <div
      style={{
        fontFamily: H,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.08,
        letterSpacing: -size * 0.025,
        color,
        textAlign: align,
        ...style,
      }}
    >
      {words.map((it, i) => {
        if (it.w === "/") return <br key={i} />;
        const p = spring({
          frame: frame - delay - i * stagger,
          fps,
          config: { damping: 15, stiffness: 140, mass: 0.7 },
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              marginRight: size * 0.24,
              opacity: p,
              transform: `translateY(${(1 - p) * size * 0.5}px)`,
              color: it.hi ? accent : undefined,
            }}
          >
            {it.w}
          </span>
        );
      })}
    </div>
  );
};

/** Label kecil berhuruf kapital. */
export const Eyebrow: React.FC<{ children: React.ReactNode; color?: string; enter?: number; style?: React.CSSProperties }> = ({
  children,
  color = T.electricBlue,
  enter = 1,
  style,
}) => (
  <div
    style={{
      fontFamily: B,
      fontWeight: 700,
      fontSize: 28,
      letterSpacing: 6,
      textTransform: "uppercase",
      color,
      opacity: enter,
      transform: `translateY(${(1 - enter) * 16}px)`,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Bingkai HP generik (tanpa logo merek). */
export const Phone: React.FC<{
  width: number;
  height: number;
  children: React.ReactNode;
  screen?: string;
  glow?: string;
  style?: React.CSSProperties;
}> = ({ width, height, children, screen = "#0B1120", glow = "rgba(51,102,255,.35)", style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: width * 0.13,
      background: "#020306",
      padding: width * 0.03,
      boxShadow: `0 0 0 3px rgba(255,255,255,.10), 0 50px 120px rgba(0,0,0,.65), 0 0 140px ${glow}`,
      ...style,
    }}
  >
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: width * 0.105,
        overflow: "hidden",
        background: screen,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: width * 0.03,
          left: "50%",
          width: width * 0.28,
          height: width * 0.07,
          marginLeft: -width * 0.14,
          borderRadius: 99,
          background: "#000",
          zIndex: 5,
        }}
      />
      {children}
    </div>
  </div>
);

/**
 * Papan toko gantung. flip: 0 = sisi TUTUP, 1 = sisi BUKA 24 JAM.
 * swing: derajat ayunan.
 */
export const ShopSign: React.FC<{ flip: number; swing?: number; width?: number }> = ({
  flip,
  swing = 0,
  width = 640,
}) => {
  const h = width * 0.46;
  const face = (front: boolean): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    borderRadius: 28,
    backfaceVisibility: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transform: front ? "rotateY(0deg)" : "rotateY(180deg)",
    background: front
      ? "linear-gradient(180deg, #2A1712 0%, #1A0E0B 100%)"
      : `linear-gradient(135deg, ${T.primary} 0%, ${T.electricBlue} 100%)`,
    border: front ? `4px solid ${T.orange}` : "4px solid rgba(255,255,255,.55)",
    boxShadow: front
      ? `0 30px 80px rgba(0,0,0,.6), 0 0 90px rgba(255,107,53,.25)`
      : `0 30px 80px rgba(0,0,0,.45), 0 0 140px rgba(0,212,255,.45)`,
  });

  return (
    <div style={{ width, height: h + 150, position: "relative", transformOrigin: "50% 0%", transform: `rotate(${swing}deg)` }}>
      {/* tali */}
      <svg width={width} height={160} style={{ position: "absolute", top: 0, left: 0 }}>
        <circle cx={width / 2} cy={14} r={12} fill="#C8CFDA" />
        <path d={`M${width / 2} 14 L${width * 0.22} 156 M${width / 2} 14 L${width * 0.78} 156`} stroke="#C8CFDA" strokeWidth={5} />
      </svg>
      <div style={{ position: "absolute", top: 150, left: 0, width, height: h, perspective: 1600 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transform: `rotateY(${flip * 180}deg)`,
          }}
        >
          <div style={face(true)}>
            <div style={{ fontFamily: B, fontWeight: 700, fontSize: width * 0.045, letterSpacing: 8, color: "rgba(255,255,255,.6)" }}>
              MAAF, KAMI
            </div>
            <div style={{ fontFamily: H, fontWeight: 900, fontSize: width * 0.2, lineHeight: 1, color: T.orange, letterSpacing: 6 }}>
              TUTUP
            </div>
          </div>
          <div style={face(false)}>
            <div style={{ fontFamily: B, fontWeight: 700, fontSize: width * 0.045, letterSpacing: 8, color: "rgba(255,255,255,.85)" }}>
              SILAKAN MASUK
            </div>
            <div style={{ fontFamily: H, fontWeight: 900, fontSize: width * 0.14, lineHeight: 1.05, color: T.white }}>
              BUKA 24 JAM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Jam digital besar dengan titik dua berkedip. */
export const BigClock: React.FC<{ time: string; size?: number; color?: string; blink?: boolean }> = ({
  time,
  size = 260,
  color = T.white,
  blink = true,
}) => {
  const frame = useCurrentFrame();
  const [hh, mm] = time.split(".");
  const on = !blink || Math.floor(frame / 15) % 2 === 0;
  return (
    <div
      style={{
        fontFamily: H,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: -size * 0.03,
        color,
        fontVariantNumeric: "tabular-nums",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span>{hh}</span>
      <span style={{ opacity: on ? 1 : 0.15, margin: `0 ${size * 0.02}px`, transform: `translateY(-${size * 0.06}px)` }}>:</span>
      <span>{mm}</span>
    </div>
  );
};

/** Notifikasi lock-screen. */
export const Notif: React.FC<{
  title: string;
  body: string;
  time: string;
  icon?: string;
  iconBg?: string;
  enter: number;
  width?: number;
}> = ({ title, body, time, icon = "✓", iconBg = T.success, enter, width = 760 }) => (
  <div
    style={{
      width,
      display: "flex",
      gap: 22,
      alignItems: "center",
      padding: "22px 26px",
      borderRadius: 32,
      background: "rgba(22,28,46,.82)",
      border: `1.5px solid ${T.glassLine}`,
      boxShadow: "0 20px 50px rgba(0,0,0,.45)",
      opacity: enter,
      transform: `translateY(${(1 - enter) * -40}px) scale(${0.94 + enter * 0.06})`,
    }}
  >
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: 20,
        background: iconBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: H,
        fontWeight: 800,
        fontSize: 36,
        color: "#06210F",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: B, fontWeight: 700, fontSize: 26, color: T.white }}>
        <span>{title}</span>
        <span style={{ fontWeight: 500, color: T.muted, fontSize: 22 }}>{time}</span>
      </div>
      <div style={{ fontFamily: B, fontWeight: 500, fontSize: 26, color: "#D5DBE6", marginTop: 4 }}>{body}</div>
    </div>
  </div>
);

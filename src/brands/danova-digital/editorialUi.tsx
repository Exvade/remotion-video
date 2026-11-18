// ============================================================
// Danova Editorial UI System — 100% Brand Color Palette Compliant
// Palet Resmi Danova: Danova Blue, Electric Blue, Sunset Orange,
// Golden Yellow, Obsidian Dark, Surface Dark, & Pure White
// ============================================================

import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";

const fraunces = loadFraunces("normal", { weights: ["500", "700", "800"], subsets: ["latin"] });
loadFraunces("italic", { weights: ["500", "700"], subsets: ["latin"] });
const jakarta = loadJakarta("normal", { weights: ["500", "700", "800"], subsets: ["latin"] });

export const SERIF = fraunces.fontFamily;
export const SANS = jakarta.fontFamily;

export const C = {
  // Brand Primary
  blue: "#3366FF",
  blueLight: "#5588FF",
  blueDark: "#1144DD",
  electricBlue: "#00D4FF",

  // Energy Accents
  orange: "#FF6B35",
  yellow: "#FFD23F",
  pink: "#FF3D71",

  // Semantic
  success: "#00E676",
  danger: "#FF3D57",

  // Luxury Dark Tech Palette (Danova Dark Mode)
  bgDark: "#070A10",
  bgPain: "#0E080C",
  bgWebsite: "#060E18",
  bgSuccess: "#06130E",
  bgCta: "#091224",

  // Surfaces & Cards
  cardDark: "#111724",
  cardElevated: "#182236",
  cardBorder: "rgba(51, 102, 255, 0.25)",
  cardBorderOrange: "rgba(255, 107, 53, 0.35)",
  cardBorderGreen: "rgba(0, 230, 118, 0.35)",

  // Typography
  white: "#FFFFFF",
  textSecondary: "#8B95A5",
  textMuted: "#5D6A7E",
  line: "rgba(255, 255, 255, 0.12)",
  lineBlue: "rgba(51, 102, 255, 0.35)",
};

export const rp = (n: number) =>
  "Rp " + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Spring entrance helper */
export const useEnter = (delay = 0, damping = 14, mass = 0.8) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass } });
};

/** Editorial Kicker (Numbered section tag in Danova Colors) */
export const Kicker: React.FC<{ n: string; label: string; color: string; enter: number }> = ({
  n,
  label,
  color,
  enter,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 18,
      opacity: enter,
      transform: `translateY(${(1 - enter) * 24}px)`,
    }}
  >
    <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 44, color: C.electricBlue, fontWeight: 700 }}>
      {n}
    </span>
    <span style={{ width: 54, height: 2, background: color, opacity: 0.7 }} />
    <span style={{ fontFamily: SANS, fontSize: 24, letterSpacing: 6, fontWeight: 800, color }}>{label}</span>
  </div>
);

/** Tech Film Grain Filter */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.07 }) => (
  <svg
    width="1080"
    height="1920"
    style={{
      position: "absolute",
      inset: 0,
      opacity,
      mixBlendMode: "overlay",
      pointerEvents: "none",
      zIndex: 100,
    }}
  >
    <filter id="grain-danova-brand">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain-danova-brand)" />
  </svg>
);

/** Segmented Story Progress Bar & Header */
export const EditorialHeader: React.FC<{
  frame: number;
  scenes: { from: number; dur: number }[];
}> = ({ frame, scenes }) => {
  return (
    <div style={{ position: "absolute", top: 76, left: 90, right: 90, zIndex: 90 }}>
      {/* Segmented Bars */}
      <div style={{ display: "flex", gap: 10 }}>
        {scenes.map((s, idx) => {
          const p = Math.max(0, Math.min(1, (frame - s.from) / s.dur));
          return (
            <div
              key={idx}
              style={{
                flex: 1,
                height: 6,
                borderRadius: 3,
                background: "rgba(255,255,255,.15)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${p * 100}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${C.blue} 0%, ${C.electricBlue} 100%)`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Header Label */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 22,
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: 5,
          color: C.white,
          opacity: 0.8,
        }}
      >
        <span style={{ color: C.electricBlue }}>DANOVA DIGITAL</span>
        <span>STUDI KASUS BISNIS</span>
      </div>
    </div>
  );
};

/** Bespoke Wax Seal / Stamp in Brand Colors */
export const BrandStamp: React.FC<{ text: string; size?: number; color?: string; textColor?: string }> = ({
  text,
  size = 150,
  color = C.orange,
  textColor = C.white,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: `${color}18`,
      border: `4px solid ${color}`,
      boxShadow: `0 14px 35px ${color}33, inset 0 0 20px ${color}22`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 16,
      transform: "rotate(-10deg)",
    }}
  >
    <span
      style={{
        fontFamily: SANS,
        fontSize: size * 0.13,
        fontWeight: 900,
        letterSpacing: 2,
        color: textColor,
        textTransform: "uppercase",
        lineHeight: 1.2,
      }}
    >
      {text}
    </span>
  </div>
);

/** Physical Price Tag in Danova Sunset Orange */
export const SwingPriceTag: React.FC<{
  price: string;
  label?: string;
  enter: number;
  top?: number;
  left?: number;
}> = ({ price, label = "SISTEM OTOMATIS", enter, top = 1150, left = 90 }) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      zIndex: 20,
      transformOrigin: "35px 20px",
      transform: `rotate(${-6 + (1 - enter) * 35}deg) scale(${enter})`,
      opacity: Math.min(1, enter * 2),
    }}
  >
    <div
      style={{
        background: `linear-gradient(135deg, ${C.orange} 0%, #E04D1B 100%)`,
        color: C.white,
        padding: "24px 36px 22px 58px",
        borderRadius: "16px 26px 26px 16px",
        clipPath: "polygon(28px 0, 100% 0, 100% 100%, 28px 100%, 0 50%)",
        boxShadow: `0 18px 40px ${C.orange}44`,
        fontFamily: SANS,
        position: "relative",
      }}
    >
      {/* Eyelet hole */}
      <div
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: C.bgDark,
          border: `2px solid rgba(255,255,255,.5)`,
        }}
      />
      <div style={{ fontSize: 18, letterSpacing: 4, fontWeight: 800, opacity: 0.9 }}>{label}</div>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 48, fontWeight: 800, marginTop: 4 }}>
        {price}
      </div>
    </div>
  </div>
);

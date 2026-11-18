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
  paper: "#F4EDE1",
  paperWarm: "#F5E6DF",
  paperSage: "#E3ECE4",
  card: "#FFFDF8",
  ink: "#1F1B16",
  muted: "#6B6158",
  line: "rgba(31,27,22,.14)",
  wine: "#7A1F2B",
  wineDeep: "#5C1420",
  wineSoft: "#E9C9C4",
  sage: "#2F5D50",
  sageDeep: "#1F4238",
  sageSoft: "#BFD6C8",
  gold: "#C9A227",
  goldDeep: "#8C6A0E",
};

export const rp = (n: number) =>
  "Rp " + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Spring that starts at `delay` frames (relative to the current Sequence). */
export const useEnter = (delay = 0, damping = 14, mass = 0.8) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass } });
};

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
    <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 44, color: C.gold, fontWeight: 700 }}>{n}</span>
    <span style={{ width: 54, height: 2, background: color, opacity: 0.5 }} />
    <span style={{ fontFamily: SANS, fontSize: 26, letterSpacing: 6, fontWeight: 800, color }}>{label}</span>
  </div>
);

export const Envelope: React.FC<{ w: number; color: string; seal?: string }> = ({ w, color, seal = C.gold }) => {
  const h = w * 0.66;
  return (
    <svg width={w} height={h} viewBox="0 0 150 99" style={{ overflow: "visible" }}>
      <rect x="1" y="1" width="148" height="97" rx="8" fill={color} />
      <path d="M2 4 L75 56 L148 4" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="3" />
      <path d="M2 96 L58 46 M148 96 L92 46" stroke="rgba(0,0,0,.12)" strokeWidth="3" />
      <circle cx="75" cy="56" r="13" fill={seal} />
      <circle cx="75" cy="56" r="7" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="2" />
    </svg>
  );
};

export const PhoneGlyph: React.FC<{ w: number; color: string }> = ({ w, color }) => (
  <svg width={w} height={w * 1.6} viewBox="0 0 60 96">
    <rect x="2" y="2" width="56" height="92" rx="11" fill={color} />
    <rect x="7" y="10" width="46" height="72" rx="5" fill="rgba(255,255,255,.9)" />
    <rect x="23" y="5" width="14" height="3" rx="1.5" fill="rgba(255,255,255,.5)" />
    <path d="M30 34 c-4-6-13-3-11 4 c1.5 5 11 11 11 11 s9.5-6 11-11 c2-7-7-10-11-4z" fill={C.wine} />
    <rect x="14" y="58" width="32" height="4" rx="2" fill={C.sageSoft} />
    <rect x="18" y="66" width="24" height="4" rx="2" fill={C.sageSoft} />
  </svg>
);

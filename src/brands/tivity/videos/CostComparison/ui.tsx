import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brandFile } from "../../../../shared/assets";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadGreatVibes } from "@remotion/google-fonts/GreatVibes";

// Tivity brand type: same pair as the website (Playfair Display + Montserrat) + a script for accents,
// echoing the calligraphic "T" of the logo.
const playfair = loadPlayfair("normal", { weights: ["500", "700", "800"], subsets: ["latin"] });
loadPlayfair("italic", { weights: ["500", "700"], subsets: ["latin"] });
const montserrat = loadMontserrat("normal", { weights: ["500", "600", "700", "800"], subsets: ["latin"] });
const vibes = loadGreatVibes("normal", { weights: ["400"], subsets: ["latin"] });

export const SERIF = playfair.fontFamily;
export const SANS = montserrat.fontFamily;
export const SCRIPT = vibes.fontFamily;

/** Tivity palette, sampled from the logo (plum "T" + wisteria blossom + leaves). */
export const C = {
  cream: "#FBF6F3",
  blush: "#F6E6E8",
  lilac: "#EFE4F1",
  card: "#FFFFFF",
  ink: "#2A1430",
  muted: "#7A6680",
  line: "rgba(68,16,76,.14)",
  plum: "#5E2A64",
  plumDeep: "#3A0F42",
  plumNight: "#260A2C",
  wisteria: "#B58BC4",
  wisteriaSoft: "#DCC6E4",
  rose: "#E3A9B9",
  roseSoft: "#F3D3DB",
  leaf: "#6F9A5C",
  leafSoft: "#CFE0C4",
  shine: "#F3C9D3",
};

export const LOGO = brandFile("tivity", "logo/tivity-logo.png");

export const rp = (n: number) =>
  "Rp " + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Spring that starts at `delay` frames (relative to the current Sequence). */
export const useEnter = (delay = 0, damping = 14, mass = 0.8) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass } });
};

/** Round logo badge (the favicon "T" with wisteria). */
export const LogoMark: React.FC<{ size: number; ring?: string; bg?: string }> = ({ size, ring = C.wisteriaSoft, bg = C.card }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 999,
      background: bg,
      border: `${Math.max(2, size * 0.03)}px solid ${ring}`,
      display: "grid",
      placeItems: "center",
      overflow: "hidden",
    }}
  >
    <Img src={LOGO} style={{ width: size * 0.82, height: size * 0.82 }} />
  </div>
);

/** Small eyebrow: script number + label pill. */
export const Eyebrow: React.FC<{ n: string; label: string; color: string; enter: number }> = ({ n, label, color, enter }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      opacity: enter,
      transform: `translateY(${(1 - enter) * 24}px)`,
    }}
  >
    <span style={{ fontFamily: SCRIPT, fontSize: 70, lineHeight: 0.8, color: C.wisteria }}>{n}</span>
    <span
      style={{
        fontFamily: SANS,
        fontSize: 22,
        letterSpacing: 5,
        fontWeight: 800,
        color,
        padding: "10px 20px",
        borderRadius: 999,
        border: `2px solid ${color}`,
      }}
    >
      {label}
    </span>
  </div>
);

/** A hanging wisteria raceme: stacked blossoms that shrink toward the tip, swaying from the top. */
export const Raceme: React.FC<{ x: number; y: number; len: number; sway: number; grow: number; hue?: "lilac" | "rose" }> = ({
  x,
  y,
  len,
  sway,
  grow,
  hue = "lilac",
}) => {
  const n = Math.max(1, Math.round(len / 26));
  const shown = n * grow;
  const cols = hue === "lilac" ? [C.wisteriaSoft, C.wisteria, "#9A6FB0"] : [C.roseSoft, C.rose, "#C98399"];
  return (
    <svg
      width={120}
      height={len + 60}
      viewBox={`0 0 120 ${len + 60}`}
      style={{ position: "absolute", left: x - 60, top: y, overflow: "visible", transformOrigin: "60px 0px", transform: `rotate(${sway}deg)` }}
    >
      <path d={`M60 0 C 58 ${len * 0.4}, 62 ${len * 0.7}, 60 ${len}`} stroke={C.leaf} strokeWidth="2" fill="none" opacity={0.7 * grow} />
      {Array.from({ length: n }, (_, i) => {
        if (i > shown) return null;
        const t = i / n;
        const r = 17 * (1 - t * 0.6);
        const side = i % 2 ? 1 : -1;
        const cy = 14 + i * 26 * (1 - t * 0.25);
        const c = cols[Math.min(2, Math.floor(t * 3))];
        const s = Math.min(1, shown - i);
        return (
          <g key={i} transform={`translate(${60 + side * r * 0.55} ${cy}) scale(${s})`}>
            <ellipse rx={r} ry={r * 0.72} fill={c} />
            <ellipse rx={r * 0.45} ry={r * 0.3} cy={-r * 0.12} fill="rgba(255,255,255,.55)" />
          </g>
        );
      })}
    </svg>
  );
};

/** Leaf pair. */
export const Leaf: React.FC<{ x: number; y: number; size: number; rot: number; o?: number }> = ({ x, y, size, rot, o = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg)`, opacity: o }}>
    <path d="M4 36 C 6 16, 18 6, 36 4 C 34 22, 24 34, 4 36 Z" fill={C.leaf} />
    <path d="M6 34 L 30 10" stroke="rgba(255,255,255,.45)" strokeWidth="1.5" />
  </svg>
);

/** Garland of wisteria hanging across the top edge. */
export const Garland: React.FC<{ frame: number; grow: number; dark?: boolean }> = ({ frame, grow, dark }) => {
  const items = [
    { x: 70, len: 210, hue: "lilac" as const },
    { x: 150, len: 140, hue: "rose" as const },
    { x: 230, len: 90, hue: "lilac" as const },
    { x: 850, len: 100, hue: "lilac" as const },
    { x: 930, len: 160, hue: "rose" as const },
    { x: 1010, len: 230, hue: "lilac" as const },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: dark ? 0.85 : 1 }}>
      <svg width="1080" height="80" style={{ position: "absolute", top: 0, left: 0 }}>
        <path d={`M0 18 Q 160 ${40 + 10 * grow} 300 22`} stroke={C.leaf} strokeWidth="4" fill="none" opacity={grow} />
        <path d={`M780 22 Q 920 ${40 + 10 * grow} 1080 18`} stroke={C.leaf} strokeWidth="4" fill="none" opacity={grow} />
      </svg>
      {items.map((it, i) => (
        <Raceme
          key={i}
          x={it.x}
          y={18 + Math.abs(Math.sin(i)) * 14}
          len={it.len}
          hue={it.hue}
          grow={grow}
          sway={Math.sin(frame / 26 + i * 1.3) * 3.5}
        />
      ))}
      <Leaf x={20} y={18} size={56} rot={-20} o={grow} />
      <Leaf x={260} y={20} size={46} rot={40} o={grow} />
      <Leaf x={800} y={20} size={46} rot={-60} o={grow} />
      <Leaf x={1010} y={14} size={56} rot={80} o={grow} />
    </div>
  );
};

/** Arch frame — the shape of a wedding arch / invitation card. */
export const Arch: React.FC<{
  w: number;
  h: number;
  bg: string;
  border?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ w, h, bg, border, children, style }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: `${w / 2}px ${w / 2}px 36px 36px`,
      background: bg,
      border: border ? `3px solid ${border}` : undefined,
      position: "relative",
      overflow: "hidden",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Envelope: React.FC<{ w: number; color: string; seal?: string }> = ({ w, color, seal = C.plum }) => {
  const h = w * 0.66;
  return (
    <svg width={w} height={h} viewBox="0 0 150 99" style={{ overflow: "visible" }}>
      <rect x="1" y="1" width="148" height="97" rx="8" fill={color} />
      <path d="M2 4 L75 56 L148 4" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="3" />
      <path d="M2 96 L58 46 M148 96 L92 46" stroke="rgba(0,0,0,.08)" strokeWidth="3" />
      <circle cx="75" cy="56" r="13" fill={seal} />
      <path d="M70 52 h10 M75 52 v10" stroke="rgba(255,255,255,.75)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
};

export const PhoneGlyph: React.FC<{ w: number; color: string }> = ({ w, color }) => (
  <svg width={w} height={w * 1.6} viewBox="0 0 60 96">
    <rect x="2" y="2" width="56" height="92" rx="11" fill={color} />
    <rect x="7" y="10" width="46" height="72" rx="5" fill="rgba(255,255,255,.92)" />
    <path d="M30 34 c-4-6-13-3-11 4 c1.5 5 11 11 11 11 s9.5-6 11-11 c2-7-7-10-11-4z" fill={C.rose} />
    <rect x="14" y="58" width="32" height="4" rx="2" fill={C.wisteriaSoft} />
    <rect x="18" y="66" width="24" height="4" rx="2" fill={C.wisteriaSoft} />
  </svg>
);

import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { local } from "./timeline";
import { C, rp, SANS, SERIF, useEnter } from "./ui";

export const SceneCta: React.FC<{ brandName: string; digitalPrice: number }> = ({ brandName, digitalPrice }) => {
  const frame = useCurrentFrame();
  const ornament = useEnter(4, 16);
  const brand = useEnter(10, 13);
  const line = useEnter(22);
  const price = useEnter(34, 10);
  const tBtn = local("cta", 5, 2.39);
  const btn = useEnter(tBtn, 9, 0.6);
  const handle = useEnter(tBtn + 14);

  const pulse = frame > tBtn ? ((frame - tBtn) % 36) / 36 : 0;
  const tap = frame > tBtn + 20 ? 1 - Math.max(0, Math.sin(((frame - tBtn - 20) / 36) * Math.PI * 2)) * 0.04 : 1;

  return (
    <AbsoluteFill style={{ color: C.paper, alignItems: "center", textAlign: "center" }}>
      <svg
        width="520"
        height="80"
        viewBox="0 0 520 80"
        style={{ position: "absolute", top: 400, opacity: ornament, transform: `scaleX(${ornament})` }}
      >
        <path d="M10 40 H210 M310 40 H510" stroke={C.gold} strokeWidth="2" />
        <path d="M260 14 C 240 34, 240 46, 260 66 C 280 46, 280 34, 260 14 Z" fill="none" stroke={C.gold} strokeWidth="2.5" />
        <circle cx="222" cy="40" r="5" fill={C.gold} />
        <circle cx="298" cy="40" r="5" fill={C.gold} />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 520,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 136,
          lineHeight: 1,
          opacity: brand,
          transform: `translateY(${(1 - brand) * 50}px)`,
        }}
      >
        {brandName}
      </div>

      <div
        style={{
          position: "absolute",
          top: 720,
          width: 820,
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: 42,
          lineHeight: 1.35,
          opacity: line * 0.85,
          transform: `translateY(${(1 - line) * 30}px)`,
        }}
      >
        Undangan digital yang estetik, hemat, dan langsung sampai ke tamu.
      </div>

      <div
        style={{
          position: "absolute",
          top: 900,
          padding: "14px 30px",
          borderRadius: 999,
          border: `2px solid ${C.gold}`,
          color: C.gold,
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 30,
          letterSpacing: 3,
          transform: `scale(${price})`,
        }}
      >
        MULAI {rp(digitalPrice)}
      </div>

      {/* button with pulse rings */}
      <div style={{ position: "absolute", top: 1090, width: 640, height: 150 }}>
        {[0, 0.5].map((o) => {
          const p = (pulse + o) % 1;
          return (
            <div
              key={o}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                border: `3px solid ${C.gold}`,
                opacity: btn > 0.9 ? (1 - p) * 0.7 : 0,
                transform: `scale(${1 + p * 0.25}, ${1 + p * 0.6})`,
              }}
            />
          );
        })}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 999,
            background: C.paper,
            color: C.wineDeep,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 50,
            transform: `scale(${btn * tap})`,
            boxShadow: "0 20px 40px rgba(0,0,0,.25)",
          }}
        >
          Cek link di bio
          <svg width="46" height="46" viewBox="0 0 24 24">
            <path d="M5 12 H19 M13 6 l6 6 -6 6" fill="none" stroke={C.wineDeep} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 1290,
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: 30,
          letterSpacing: 4,
          opacity: handle * 0.75,
        }}
      >
        @{brandName.toLowerCase().replace(/\s+/g, "")}
      </div>
    </AbsoluteFill>
  );
};

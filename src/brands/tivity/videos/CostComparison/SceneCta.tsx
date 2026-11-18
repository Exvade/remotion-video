import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { local, P } from "./timeline";
import { C, LogoMark, rp, SANS, SCRIPT, SERIF, useEnter } from "./ui";

export const SceneCta: React.FC<{ brandName: string; digitalPrice: number }> = ({ brandName, digitalPrice }) => {
  const frame = useCurrentFrame();
  const logo = useEnter(4, 12);
  const brand = useEnter(14, 13);
  const line = useEnter(24);
  const price = useEnter(34, 10);
  const tBtn = local("cta", 5, P(5, 1));
  const btn = useEnter(tBtn, 9, 0.6);
  const handle = useEnter(tBtn + 14);

  const pulse = frame > tBtn ? ((frame - tBtn) % 36) / 36 : 0;
  const tap = frame > tBtn + 20 ? 1 - Math.max(0, Math.sin(((frame - tBtn - 20) / 36) * Math.PI * 2)) * 0.04 : 1;
  const halo = 1 + Math.sin(frame / 16) * 0.03;

  return (
    <AbsoluteFill style={{ color: C.cream, alignItems: "center", textAlign: "center" }}>
      {/* logo with halo */}
      <div
        style={{
          position: "absolute",
          top: 280,
          width: 340,
          height: 340,
          display: "grid",
          placeItems: "center",
          transform: `scale(${logo}) rotate(${(1 - logo) * -30}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -40,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(220,198,228,.35) 0%, rgba(220,198,228,0) 70%)",
            transform: `scale(${halo})`,
          }}
        />
        <LogoMark size={300} ring={C.wisteria} bg={C.cream} />
      </div>

      <div
        style={{
          position: "absolute",
          top: 660,
          fontFamily: SERIF,
          fontWeight: 700,
          fontSize: 150,
          lineHeight: 1,
          letterSpacing: 2,
          opacity: brand,
          transform: `translateY(${(1 - brand) * 50}px)`,
        }}
      >
        {brandName}
      </div>
      <div
        style={{
          position: "absolute",
          top: 820,
          fontFamily: SCRIPT,
          fontSize: 84,
          color: C.shine,
          opacity: brand,
        }}
      >
        undangan digital
      </div>

      <div
        style={{
          position: "absolute",
          top: 950,
          width: 940,
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: 36,
          lineHeight: 1.4,
          opacity: line * 0.85,
          transform: `translateY(${(1 - line) * 30}px)`,
        }}
      >
        Estetik, hemat, dan langsung sampai ke tamu.
      </div>

      <div
        style={{
          position: "absolute",
          top: 1050,
          padding: "12px 30px",
          borderRadius: 999,
          background: "rgba(220,198,228,.16)",
          border: `2px solid ${C.wisteria}`,
          color: C.wisteriaSoft,
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: 3,
          transform: `scale(${price})`,
        }}
      >
        MULAI {rp(digitalPrice)}
      </div>

      {/* button with pulse rings */}
      <div style={{ position: "absolute", top: 1160, width: 620, height: 140 }}>
        {[0, 0.5].map((o) => {
          const p = (pulse + o) % 1;
          return (
            <div
              key={o}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                border: `3px solid ${C.wisteria}`,
                opacity: btn > 0.9 ? (1 - p) * 0.7 : 0,
                transform: `scale(${1 + p * 0.22}, ${1 + p * 0.55})`,
              }}
            />
          );
        })}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${C.shine}, ${C.wisteriaSoft})`,
            color: C.plumDeep,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 48,
            transform: `scale(${btn * tap})`,
            boxShadow: "0 20px 40px rgba(0,0,0,.3)",
          }}
        >
          Cek link di bio
          <svg width="44" height="44" viewBox="0 0 24 24">
            <path d="M5 12 H19 M13 6 l6 6 -6 6" fill="none" stroke={C.plumDeep} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 1340,
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: 30,
          letterSpacing: 4,
          color: C.wisteriaSoft,
          opacity: handle,
        }}
      >
        @{brandName.toLowerCase().replace(/\s+/g, "")}
      </div>
    </AbsoluteFill>
  );
};

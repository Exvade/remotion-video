import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { local, P, SCENES } from "./timeline";
import { C, Eyebrow, rp, SANS, SCRIPT, SERIF, useEnter } from "./ui";

const USES = [
  { label: "Souvenir", t: P(4, 1), icon: "M3 10 h18 v4 H3z M5 14 v7 h14 v-7 M12 10 v11 M12 10 c-2-4-7-5-7-2 s5 2 7 2 c2 0 7 1 7-2 s-5-2-7 2" },
  { label: "Catering", t: P(4, 2), icon: "M3 17 h18 M5 17 a7 7 0 0 1 14 0 M12 8 v2 M10 8 h4 M2 20 h20" },
  { label: "Bulan madu", t: P(4, 3), icon: "M2 16 l20-7 -3-2 -6 2 -6-4 -2 1 4 5 -4 1.5 -2-1.5 -1.5.5z M3 21 h18" },
];

export const SceneSavings: React.FC<{ physicalTotal: number; digitalPrice: number }> = ({ physicalTotal, digitalPrice }) => {
  const frame = useCurrentFrame();
  const { dur } = SCENES.savings;
  const savings = physicalTotal - digitalPrice;

  const head = useEnter(0);
  const barA = useEnter(4, 15);
  const barB = useEnter(12, 15);
  const tCount = local("savings", 4, 0);
  const counter = useEnter(tCount, 13);
  const value = interpolate(frame, [tCount, tCount + 48], [0, savings], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const done = useEnter(tCount + 48, 8, 0.5);
  const exit = interpolate(frame, [dur - 20, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const maxW = 900;
  const wA = maxW * barA;
  const wB = Math.max(40, (maxW * digitalPrice) / physicalTotal) * barB;

  return (
    <AbsoluteFill style={{ opacity: 1 - exit, transform: `translateY(${-exit * 120}px)` }}>
      <div style={{ position: "absolute", top: 240, width: "100%", display: "flex", justifyContent: "center" }}>
        <Eyebrow n="03" label="SELISIH BIAYA" color={C.plum} enter={head} />
      </div>

      {/* horizontal bars */}
      <BarRow top={380} w={wA} color={`linear-gradient(90deg, ${C.rose}, ${C.plum})`} label="Cetak" value={rp(physicalTotal)} enter={barA} />
      <BarRow top={540} w={wB} color={C.leaf} label="Digital" value={rp(digitalPrice)} enter={barB} />

      {/* savings medallion */}
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 740,
          height: 400,
          borderRadius: "450px 450px 44px 44px",
          background: `linear-gradient(170deg, ${C.plum} 0%, ${C.plumDeep} 100%)`,
          textAlign: "center",
          color: C.cream,
          opacity: counter,
          transform: `translateY(${(1 - counter) * 60}px) scale(${1 + Math.sin(done * Math.PI) * 0.04})`,
          boxShadow: `0 16px 0 ${C.wisteria}, 0 34px 50px rgba(58,15,66,.3)`,
        }}
      >
        <div style={{ position: "absolute", inset: 16, borderRadius: "434px 434px 30px 30px", border: "2px solid rgba(243,201,211,.4)" }} />
        <div style={{ fontFamily: SCRIPT, fontSize: 110, lineHeight: 1, color: C.shine, paddingTop: 70 }}>kamu hemat</div>
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 800,
            fontSize: 128,
            lineHeight: 1.05,
            marginTop: 10,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: -2,
          }}
        >
          {rp(value)}
        </div>
      </div>

      {/* what the savings can pay for */}
      <div style={{ position: "absolute", left: 90, right: 90, top: 1210, display: "flex", gap: 22 }}>
        {USES.map((u) => (
          <Use key={u.label} label={u.label} icon={u.icon} start={local("savings", 4, u.t)} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const BarRow: React.FC<{ top: number; w: number; color: string; label: string; value: string; enter: number }> = ({
  top,
  w,
  color,
  label,
  value,
  enter,
}) => (
  <div style={{ position: "absolute", left: 90, right: 90, top }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        opacity: enter,
        fontFamily: SANS,
        marginBottom: 14,
      }}
    >
      <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 50, color: C.plumDeep }}>{label}</span>
      <span style={{ fontWeight: 800, fontSize: 40, color: C.plum, fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
    <div style={{ height: 52, borderRadius: 999, background: C.lilac, overflow: "hidden" }}>
      <div style={{ width: w, height: "100%", borderRadius: 999, background: color }} />
    </div>
  </div>
);

const Use: React.FC<{ label: string; icon: string; start: number }> = ({ label, icon, start }) => {
  const e = useEnter(start, 10);
  return (
    <div
      style={{
        flex: 1,
        height: 200,
        borderRadius: "130px 130px 30px 30px",
        background: C.card,
        border: `3px solid ${C.wisteriaSoft}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        transform: `translateY(${(1 - e) * 60}px) scale(${0.8 + e * 0.2})`,
        opacity: e,
        boxShadow: "0 14px 26px rgba(58,15,66,.12)",
      }}
    >
      <div style={{ width: 80, height: 80, borderRadius: 99, background: C.blush, display: "grid", placeItems: "center" }}>
        <svg width="46" height="46" viewBox="0 0 24 24">
          <path d={icon} fill="none" stroke={C.plum} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.plumDeep }}>{label}</div>
    </div>
  );
};

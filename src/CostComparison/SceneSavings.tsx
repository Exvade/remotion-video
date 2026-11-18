import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { local, SCENES } from "./timeline";
import { C, Kicker, rp, SANS, SERIF, useEnter } from "./ui";

const USES = [
  { label: "Souvenir", t: 3.16, icon: "M3 10 h18 v4 H3z M5 14 v7 h14 v-7 M12 10 v11 M12 10 c-2-4-7-5-7-2 s5 2 7 2 c2 0 7 1 7-2 s-5-2-7 2" },
  { label: "Catering", t: 4.48, icon: "M3 17 h18 M5 17 a7 7 0 0 1 14 0 M12 8 v2 M10 8 h4 M2 20 h20" },
  { label: "Bulan madu", t: 4.95, icon: "M2 16 l20-7 -3-2 -6 2 -6-4 -2 1 4 5 -4 1.5 -2-1.5 -1.5.5z M3 21 h18" },
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

  const maxH = 440;
  const hA = maxH * barA;
  const hB = Math.max(18, (maxH * digitalPrice) / physicalTotal) * barB;
  const base = 860;

  return (
    <AbsoluteFill style={{ opacity: 1 - exit, transform: `translateY(${-exit * 120}px)` }}>
      <div style={{ position: "absolute", top: 200, left: 90 }}>
        <Kicker n="03" label="SELISIH BIAYA" color={C.goldDeep} enter={head} />
      </div>

      {/* baseline */}
      <div style={{ position: "absolute", left: 120, right: 120, top: base, height: 3, background: C.line }} />
      <Bar x={190} h={hA} base={base} color={C.wine} label="Cetak" value={rp(physicalTotal)} enter={barA} />
      <Bar x={590} h={hB} base={base} color={C.sage} label="Digital" value={rp(digitalPrice)} enter={barB} />

      {/* savings counter */}
      <div
        style={{
          position: "absolute",
          top: 980,
          width: "100%",
          textAlign: "center",
          opacity: counter,
          transform: `translateY(${(1 - counter) * 40}px) scale(${1 + Math.sin(done * Math.PI) * 0.05})`,
        }}
      >
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: 64, color: C.ink }}>kamu hemat</div>
        <div
          style={{
            display: "inline-block",
            marginTop: 8,
            padding: "10px 44px 18px",
            borderRadius: 28,
            background: C.ink,
            color: C.gold,
            fontFamily: SERIF,
            fontWeight: 800,
            fontSize: 124,
            lineHeight: 1.05,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: -2,
            boxShadow: `0 ${10 + done * 8}px 0 ${C.gold}`,
          }}
        >
          {rp(value)}
        </div>
      </div>

      {/* what the savings can pay for */}
      <div style={{ position: "absolute", left: 90, right: 90, top: 1260, display: "flex", gap: 22 }}>
        {USES.map((u) => (
          <Use key={u.label} label={u.label} icon={u.icon} start={local("savings", 4, u.t)} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Bar: React.FC<{ x: number; h: number; base: number; color: string; label: string; value: string; enter: number }> = ({
  x,
  h,
  base,
  color,
  label,
  value,
  enter,
}) => (
  <>
    <div
      style={{
        position: "absolute",
        left: x,
        width: 300,
        top: base - h,
        height: h,
        borderRadius: "26px 26px 6px 6px",
        background: color,
        boxShadow: "0 20px 34px rgba(31,27,22,.16)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: x - 40,
        width: 380,
        top: base - h - 78,
        textAlign: "center",
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: 42,
        color,
        opacity: enter,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {value}
    </div>
    <div
      style={{
        position: "absolute",
        left: x,
        width: 300,
        top: base + 18,
        textAlign: "center",
        fontFamily: SERIF,
        fontWeight: 700,
        fontSize: 52,
        color: C.ink,
        opacity: enter,
      }}
    >
      {label}
    </div>
  </>
);

const Use: React.FC<{ label: string; icon: string; start: number }> = ({ label, icon, start }) => {
  const e = useEnter(start, 10);
  return (
    <div
      style={{
        flex: 1,
        height: 160,
        borderRadius: 30,
        background: C.card,
        border: `3px solid ${C.gold}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        transform: `translateY(${(1 - e) * 60}px) scale(${0.8 + e * 0.2})`,
        opacity: e,
        boxShadow: "0 14px 26px rgba(140,106,14,.16)",
      }}
    >
      <svg width="52" height="52" viewBox="0 0 24 24">
        <path d={icon} fill="none" stroke={C.goldDeep} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.ink }}>{label}</div>
    </div>
  );
};

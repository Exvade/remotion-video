import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { local, P, SCENES } from "./timeline";
import { C, Envelope, Eyebrow, rp, SANS, SERIF, useEnter } from "./ui";

export const ScenePrint: React.FC<{ quantity: number; pricePerPcs: number; shippingCost: number }> = ({
  quantity,
  pricePerPcs,
  shippingCost,
}) => {
  const frame = useCurrentFrame();
  const { dur } = SCENES.print;
  const printTotal = quantity * pricePerPcs;
  const total = printTotal + shippingCost;

  const tA = local("print", 1, P(1, 1));
  const tB = local("print", 1, P(1, 2));
  const tC = local("print", 1, P(1, 3));
  const tC2 = local("print", 1, P(1, 4));
  const tTotal = local("print", 2, 0);
  const tAmount = local("print", 2, P(2, 1));

  const head = useEnter(0);
  const card = useEnter(8, 15);
  const rA = useEnter(tA, 16);
  const rB = useEnter(tB, 16);
  const rC = useEnter(tC, 16);
  const rT = useEnter(tTotal - 6, 16);
  const stamp = useEnter(tAmount, 9, 0.6);

  const countB = interpolate(frame, [tB, tB + 18], [0, printTotal], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const countT = interpolate(frame, [tAmount - 4, tAmount + 14], [printTotal, total], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // sheet stack grows with the per-sheet line and the quantity line
  const sheets = Math.round(interpolate(frame, [tA, tB + 18], [1, 9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const exit = interpolate(frame, [dur - 20, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shake = stamp > 0 && stamp < 0.98 ? Math.sin(frame * 2.4) * (1 - stamp) * 10 : 0;

  return (
    <AbsoluteFill style={{ opacity: 1 - exit, transform: `translateX(${-exit * 220}px)` }}>
      <div style={{ position: "absolute", top: 240, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Eyebrow n="01" label="CETAK FISIK" color={C.plum} enter={head} />
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 100,
            lineHeight: 1,
            color: C.plumDeep,
            marginTop: 20,
            opacity: head,
            transform: `translateY(${(1 - head) * 30}px)`,
          }}
        >
          Undangan <span style={{ fontStyle: "italic", color: C.rose, fontWeight: 500 }}>cetak</span>
        </div>
      </div>

      {/* bill card */}
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 500,
          borderRadius: 44,
          background: C.card,
          overflow: "hidden",
          boxShadow: `0 16px 0 ${C.roseSoft}, 0 34px 50px rgba(58,15,66,.16)`,
          transform: `translateY(${(1 - card) * 200}px) translateX(${shake}px)`,
          opacity: card,
          fontFamily: SANS,
          color: C.ink,
        }}
      >
        <div
          style={{
            background: C.plumDeep,
            color: C.cream,
            padding: "28px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: 800, letterSpacing: 6, fontSize: 24 }}>RINCIAN BIAYA</span>
          <span style={{ fontWeight: 700, letterSpacing: 3, fontSize: 22, color: C.shine }}>{quantity} TAMU</span>
        </div>
        <div style={{ padding: "18px 48px 40px" }}>
          <Row icon="sheet" label="Cetak per lembar" value={rp(pricePerPcs)} enter={rA} />
          <Row icon="times" label={`× ${quantity} lembar`} value={rp(countB)} enter={rB} />
          <Row icon="truck" label="Ongkir & kurir" value={frame >= tC2 ? `+ ${rp(shippingCost)}` : "…"} enter={rC} accent />
          <div
            style={{
              marginTop: 26,
              borderRadius: 30,
              background: C.blush,
              padding: "26px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: rT,
              transform: `scale(${0.9 + rT * 0.1})`,
            }}
          >
            <span style={{ fontWeight: 800, fontSize: 28, letterSpacing: 6, color: C.plum }}>TOTAL</span>
            <span
              style={{
                fontFamily: SERIF,
                fontWeight: 800,
                fontSize: 74,
                whiteSpace: "nowrap",
                color: C.plumDeep,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {frame >= tAmount - 4 ? rp(countT) : "Rp …"}
            </span>
          </div>
        </div>
      </div>

      {/* paper sheets piling up */}
      <div style={{ position: "absolute", left: 110, top: 1250, width: 260, height: 200 }}>
        {Array.from({ length: sheets }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: Math.sin(i * 2.1) * 14,
              bottom: i * 12,
              width: 220,
              height: 60,
              borderRadius: 10,
              background: i % 2 ? C.card : C.roseSoft,
              border: `2px solid ${C.line}`,
              transform: `rotate(${Math.sin(i * 1.7) * 5}deg)`,
            }}
          />
        ))}
        <div style={{ position: "absolute", left: 40, bottom: sheets * 12 + 30, opacity: rA }}>
          <Envelope w={130} color={C.roseSoft} seal={C.plum} />
        </div>
      </div>

      {/* wax-seal style stamp */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: 1170,
          width: 270,
          height: 270,
          borderRadius: 999,
          background: `radial-gradient(circle at 35% 30%, ${C.plum} 0%, ${C.plumDeep} 70%)`,
          color: C.cream,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          transform: `rotate(-12deg) scale(${2.2 - stamp * 1.2})`,
          opacity: Math.min(1, stamp * 1.4),
          boxShadow: `0 0 0 10px ${C.blush}, 0 0 0 14px ${C.plum}, 0 24px 40px rgba(58,15,66,.35)`,
        }}
      >
        <div style={{ border: `3px dashed rgba(243,201,211,.6)`, borderRadius: 999, width: 226, height: 226, display: "grid", placeItems: "center" }}>
          <div>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 20, letterSpacing: 4, color: C.shine }}>TOTAL</div>
            <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 74, lineHeight: 1 }}>
              {(total / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt
            </div>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 18, letterSpacing: 3, color: C.shine }}>CETAK + KIRIM</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ICONS: Record<string, string> = {
  sheet: "M6 3 h9 l4 4 v14 H6z M15 3 v4 h4 M9 12 h7 M9 16 h5",
  times: "M6 6 L18 18 M18 6 L6 18",
  truck: "M2 7 h12 v9 H2z M14 10 h4 l3 3 v3 h-7 M6 19 a2 2 0 1 0 0-.01 M17 19 a2 2 0 1 0 0-.01",
};

const Row: React.FC<{ icon: string; label: string; value: string; enter: number; accent?: boolean }> = ({
  icon,
  label,
  value,
  enter,
  accent,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 22,
      height: 106,
      borderBottom: `2px solid ${C.line}`,
      opacity: enter,
      transform: `translateX(${(1 - enter) * -40}px)`,
    }}
  >
    <div style={{ width: 62, height: 62, borderRadius: 20, background: C.lilac, display: "grid", placeItems: "center" }}>
      <svg width="34" height="34" viewBox="0 0 24 24">
        <path d={ICONS[icon]} fill="none" stroke={C.plum} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <span style={{ flex: 1, fontWeight: 600, fontSize: 36, color: C.muted }}>{label}</span>
    <span style={{ fontWeight: 800, fontSize: 38, fontVariantNumeric: "tabular-nums", color: accent ? "#B4537A" : C.ink }}>{value}</span>
  </div>
);

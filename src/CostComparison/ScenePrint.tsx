import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { local, SCENES } from "./timeline";
import { C, Envelope, Kicker, rp, SANS, SERIF, useEnter } from "./ui";

export const ScenePrint: React.FC<{ quantity: number; pricePerPcs: number; shippingCost: number }> = ({
  quantity,
  pricePerPcs,
  shippingCost,
}) => {
  const frame = useCurrentFrame();
  const { dur } = SCENES.print;
  const printTotal = quantity * pricePerPcs;
  const total = printTotal + shippingCost;

  const tA = local("print", 1, 1.51);
  const tB = local("print", 1, 3.24);
  const tC = local("print", 1, 4.85);
  const tC2 = local("print", 1, 6.44);
  const tTotal = local("print", 2, 0);
  const tAmount = local("print", 2, 0.83);

  const head = useEnter(0);
  const slot = useEnter(8, 16);
  const r0 = useEnter(12, 18);
  const rA = useEnter(tA, 18);
  const rB = useEnter(tB, 18);
  const rC = useEnter(tC, 18);
  const rT = useEnter(tTotal - 6, 18);
  const stamp = useEnter(tAmount, 9, 0.6);
  const envelope = useEnter(20, 12);

  const paperH = 130 * r0 + 100 * rA + 100 * rB + 100 * rC + 190 * rT;
  const countB = interpolate(frame, [tB, tB + 18], [0, printTotal], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const countT = interpolate(frame, [tAmount - 4, tAmount + 14], [printTotal, total], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exit = interpolate(frame, [dur - 20, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shake = stamp > 0 && stamp < 0.98 ? Math.sin(frame * 2.4) * (1 - stamp) * 10 : 0;

  return (
    <AbsoluteFill style={{ opacity: 1 - exit, transform: `translateX(${-exit * 220}px)` }}>
      <div style={{ position: "absolute", top: 200, left: 90 }}>
        <Kicker n="01" label="CETAK FISIK" color={C.wine} enter={head} />
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 104,
            lineHeight: 1,
            color: C.ink,
            marginTop: 22,
            opacity: head,
            transform: `translateY(${(1 - head) * 30}px)`,
          }}
        >
          Undangan <span style={{ fontStyle: "italic", color: C.wine, fontWeight: 500 }}>cetak</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 70,
          top: 170,
          transform: `rotate(${12 - envelope * 4}deg) scale(${envelope})`,
        }}
      >
        <Envelope w={190} color={C.wineSoft} seal={C.wine} />
      </div>

      {/* printer slot */}
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 470,
          height: 56,
          borderRadius: 28,
          background: C.ink,
          transform: `scaleX(${slot})`,
          boxShadow: "0 12px 24px rgba(31,27,22,.25)",
          zIndex: 2,
        }}
      >
        <div style={{ position: "absolute", left: 40, right: 40, top: 24, height: 8, borderRadius: 4, background: "#000" }} />
      </div>

      {/* receipt paper */}
      <div
        style={{
          position: "absolute",
          left: 170,
          right: 170,
          top: 498,
          height: paperH + 24,
          overflow: "hidden",
          filter: "drop-shadow(0 22px 26px rgba(92,20,32,.18))",
          transform: `translateX(${shake}px)`,
        }}
      >
        <div
          style={{
            height: paperH + 24,
            background: C.card,
            clipPath: zigzag(),
            padding: "52px 54px 0",
            fontFamily: SANS,
            color: C.ink,
          }}
        >
          <div style={{ textAlign: "center", fontWeight: 800, letterSpacing: 6, fontSize: 24, color: C.muted }}>
            NOTA · UNDANGAN CETAK
          </div>
          <Dash />
          <Row label="Cetak undangan" value={`${rp(pricePerPcs)} / lbr`} enter={rA} />
          <Row label={`× ${quantity} lembar`} value={rp(countB)} enter={rB} />
          <Row label="Ongkir & kurir" value={frame >= tC2 ? `+ ${rp(shippingCost)}` : "…"} enter={rC} accent />
          <div style={{ opacity: rT }}>
            <Dash />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 6 }}>
              <span style={{ fontWeight: 800, fontSize: 30, letterSpacing: 6 }}>TOTAL</span>
              <span
                style={{
                  fontFamily: SERIF,
                  fontWeight: 800,
                  fontSize: 70,
                  whiteSpace: "nowrap",
                  color: C.wine,
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: -2,
                }}
              >
                {frame >= tAmount - 4 ? rp(countT) : "Rp …"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* rubber stamp */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 1110,
          width: 270,
          height: 270,
          borderRadius: 999,
          border: `8px solid ${C.wine}`,
          color: C.wine,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          transform: `rotate(-14deg) scale(${2.2 - stamp * 1.2})`,
          opacity: Math.min(1, stamp * 1.4) * 0.92,
          background: "rgba(245,230,223,.85)",
        }}
      >
        <div style={{ border: `3px dashed ${C.wine}`, borderRadius: 999, width: 226, height: 226, display: "grid", placeItems: "center" }}>
          <div>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 4 }}>TOTAL</div>
            <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 76, lineHeight: 1 }}>
              {(total / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt
            </div>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 20, letterSpacing: 3 }}>CETAK + KIRIM</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const zigzag = () => {
  const pts: string[] = ["0 0", "100% 0"];
  const teeth = 22;
  for (let i = teeth; i >= 0; i--) {
    const x = (i / teeth) * 100;
    pts.push(`${x}% ${i % 2 === 0 ? "100%" : "calc(100% - 18px)"}`);
  }
  return `polygon(${pts.join(", ")})`;
};

const Dash = () => <div style={{ borderTop: `3px dashed ${C.line}`, margin: "24px 0" }} />;

const Row: React.FC<{ label: string; value: string; enter: number; accent?: boolean }> = ({ label, value, enter, accent }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: 100,
      opacity: enter,
      transform: `translateX(${(1 - enter) * -40}px)`,
      fontSize: 38,
    }}
  >
    <span style={{ fontWeight: 600, color: C.muted }}>{label}</span>
    <span style={{ fontWeight: 800, fontVariantNumeric: "tabular-nums", color: accent ? C.wine : C.ink }}>{value}</span>
  </div>
);

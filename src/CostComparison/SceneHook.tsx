import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";
import { local, SCENES } from "./timeline";
import { C, Envelope, PhoneGlyph, SANS, SERIF, useEnter } from "./ui";

export const SceneHook: React.FC<{ quantity: number }> = ({ quantity }) => {
  const frame = useCurrentFrame();
  const { dur } = SCENES.hook;

  const kicker = useEnter(4);
  const num = useEnter(8, 12);
  const count = Math.round(
    interpolate(frame, [10, 40], [0, quantity], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );
  const left = useEnter(local("hook", 0, 2.01), 11);
  const right = useEnter(local("hook", 0, 2.64), 11);
  const ask = useEnter(local("hook", 0, 3.92), 9);
  const exit = interpolate(frame, [dur - 18, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // envelopes stacking behind the number
  const stack = Array.from({ length: 7 }, (_, i) => i);
  const tilt = Math.sin(frame / 14) * 2.2 * ask;

  return (
    <AbsoluteFill style={{ opacity: 1 - exit, transform: `translateY(${-exit * 80}px)` }}>
      <div style={{ position: "absolute", top: 210, width: "100%", textAlign: "center", opacity: kicker }}>
        <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 8, color: C.wine }}>
          HITUNG-HITUNGAN UNDANGAN
        </span>
      </div>

      {/* envelope pile */}
      {stack.map((i) => {
        const e = staggered(frame, 6 + i * 4);
        const x = 540 + Math.sin(i * 2.3) * 300 - 90;
        const y = 330 + (i % 3) * 120 + Math.cos(i * 1.7) * 40;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y + (1 - e) * -500,
              opacity: e * 0.9,
              transform: `rotate(${Math.sin(i * 3.1) * 24}deg)`,
            }}
          >
            <Envelope w={180} color={i % 2 ? C.wineSoft : "#EAD9B8"} seal={i % 2 ? C.wine : C.gold} />
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          top: 300,
          width: "100%",
          textAlign: "center",
          transform: `scale(${0.6 + num * 0.4})`,
          opacity: num,
        }}
      >
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 800,
            fontSize: 400,
            lineHeight: 1,
            color: C.ink,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: -12,
            textShadow: `0 6px 0 ${C.paper}, 0 -6px 0 ${C.paper}, 6px 0 0 ${C.paper}, -6px 0 0 ${C.paper}`,
          }}
        >
          {count}
        </div>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: 96, color: C.wine, marginTop: -10 }}>
          undangan
        </div>
      </div>

      {/* versus cards */}
      <div style={{ position: "absolute", top: 905, left: 0, right: 0, height: 470, transform: `rotate(${tilt}deg)` }}>
        <VsCard x={80} enter={left} bg={C.wine} fg={C.paper} label="Cetak" sub="kertas & kurir" rot={-4}>
          <Envelope w={170} color={C.wineSoft} seal={C.gold} />
        </VsCard>
        <VsCard x={580} enter={right} bg={C.sage} fg={C.paper} label="Digital" sub="satu link" rot={4}>
          <PhoneGlyph w={96} color={C.sageDeep} />
        </VsCard>
        <div
          style={{
            position: "absolute",
            left: 540 - 70,
            top: 160,
            width: 140,
            height: 140,
            borderRadius: 999,
            background: C.gold,
            display: "grid",
            placeItems: "center",
            transform: `scale(${right})`,
            boxShadow: "0 14px 30px rgba(140,106,14,.35)",
            border: `6px solid ${C.paper}`,
          }}
        >
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 700, fontSize: ask > 0.5 ? 92 : 58, color: C.ink }}>
            {ask > 0.5 ? "?" : "vs"}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const staggered = (frame: number, delay: number) =>
  spring({ frame: frame - delay, fps: 30, config: { damping: 13, mass: 0.7 } });

const VsCard: React.FC<{
  x: number;
  enter: number;
  bg: string;
  fg: string;
  label: string;
  sub: string;
  rot: number;
  children: React.ReactNode;
}> = ({ x, enter, bg, fg, label, sub, rot, children }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: 0,
      width: 420,
      height: 460,
      borderRadius: 36,
      background: bg,
      color: fg,
      transform: `translateY(${(1 - enter) * 300}px) rotate(${rot * enter}deg)`,
      opacity: enter,
      boxShadow: "0 28px 50px rgba(31,27,22,.22)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 18,
    }}
  >
    <div style={{ height: 170, display: "grid", placeItems: "center" }}>{children}</div>
    <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 84, lineHeight: 1 }}>{label}</div>
    <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 28, letterSpacing: 3, opacity: 0.75 }}>{sub.toUpperCase()}</div>
  </div>
);

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";
import { local, P, SCENES } from "./timeline";
import { Arch, C, Envelope, PhoneGlyph, SANS, SCRIPT, SERIF, useEnter } from "./ui";

export const SceneHook: React.FC<{ quantity: number }> = ({ quantity }) => {
  const frame = useCurrentFrame();
  const { dur } = SCENES.hook;

  const kicker = useEnter(4);
  const arch = useEnter(6, 13);
  const count = Math.round(
    interpolate(frame, [12, 42], [0, quantity], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );
  const left = useEnter(local("hook", 0, P(0, 1)), 11);
  const right = useEnter(local("hook", 0, P(0, 1) + 0.66), 11);
  const ask = useEnter(local("hook", 0, P(0, 2)), 9);
  const exit = interpolate(frame, [dur - 18, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: 1 - exit, transform: `translateY(${-exit * 80}px)` }}>
      <div style={{ position: "absolute", top: 250, width: "100%", textAlign: "center", opacity: kicker }}>
        <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 8, color: C.plum }}>
          HITUNG-HITUNGAN UNDANGAN
        </span>
      </div>

      {/* plum arch holding the count, envelopes raining inside */}
      <div
        style={{
          position: "absolute",
          left: 540 - 300,
          top: 320,
          transform: `translateY(${(1 - arch) * 120}px) scale(${0.85 + arch * 0.15})`,
          opacity: arch,
          filter: "drop-shadow(0 30px 40px rgba(58,15,66,.28))",
        }}
      >
        <Arch w={600} h={640} bg={`linear-gradient(170deg, ${C.plum} 0%, ${C.plumDeep} 100%)`}>
          {Array.from({ length: 8 }, (_, i) => {
            const e = staggered(frame, 10 + i * 4);
            const x = 40 + ((i * 173) % 460);
            const y = 60 + ((i * 97) % 420);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: y + (1 - e) * -500 + Math.sin((frame + i * 20) / 20) * 6,
                  opacity: e * 0.35,
                  transform: `rotate(${Math.sin(i * 3.1) * 26}deg)`,
                }}
              >
                <Envelope w={110} color={i % 2 ? C.wisteriaSoft : C.roseSoft} seal={C.plumDeep} />
              </div>
            );
          })}
          <div style={{ position: "absolute", inset: 18, borderRadius: "282px 282px 24px 24px", border: `2px solid rgba(243,201,211,.45)` }} />
          <div style={{ position: "absolute", top: 120, width: "100%", textAlign: "center" }}>
            <div
              style={{
                fontFamily: SERIF,
                fontWeight: 800,
                fontSize: 270,
                lineHeight: 1,
                color: C.cream,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: -6,
              }}
            >
              {count}
            </div>
            <div style={{ fontFamily: SCRIPT, fontSize: 130, lineHeight: 0.9, color: C.shine, marginTop: 6 }}>undangan</div>
          </div>
        </Arch>
      </div>

      {/* poll: print vs digital */}
      <div style={{ position: "absolute", top: 1010, left: 0, right: 0, height: 420 }}>
        <Choice x={70} enter={left} bg={C.card} accent={C.rose} label="Cetak" sub="kertas & kurir" rot={-3} ask={ask}>
          <Envelope w={150} color={C.roseSoft} seal={C.plum} />
        </Choice>
        <Choice x={570} enter={right} bg={C.card} accent={C.wisteria} label="Digital" sub="satu link" rot={3} ask={ask}>
          <PhoneGlyph w={84} color={C.plum} />
        </Choice>
        <div
          style={{
            position: "absolute",
            left: 540 - 70,
            top: 130,
            width: 140,
            height: 140,
            borderRadius: 999,
            background: C.plumDeep,
            display: "grid",
            placeItems: "center",
            transform: `scale(${right}) rotate(${Math.sin(frame / 8) * 6 * ask}deg)`,
            boxShadow: `0 0 0 10px ${C.cream}, 0 18px 30px rgba(58,15,66,.3)`,
          }}
        >
          <span style={{ fontFamily: ask > 0.5 ? SERIF : SCRIPT, fontWeight: 700, fontSize: ask > 0.5 ? 92 : 76, color: C.shine, lineHeight: 1 }}>
            {ask > 0.5 ? "?" : "vs"}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const staggered = (frame: number, delay: number) =>
  spring({ frame: frame - delay, fps: 30, config: { damping: 13, mass: 0.7 } });

const Choice: React.FC<{
  x: number;
  enter: number;
  bg: string;
  accent: string;
  label: string;
  sub: string;
  rot: number;
  ask: number;
  children: React.ReactNode;
}> = ({ x, enter, bg, accent, label, sub, rot, ask, children }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: 0,
      width: 440,
      height: 400,
      borderRadius: 40,
      background: bg,
      border: `4px solid ${accent}`,
      boxShadow: `0 14px 0 ${accent}, 0 30px 50px rgba(58,15,66,.16)`,
      transform: `translateY(${(1 - enter) * 300 + Math.sin(ask * Math.PI) * -10}px) rotate(${rot * enter}deg)`,
      opacity: enter,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
    }}
  >
    <div style={{ height: 150, display: "grid", placeItems: "center" }}>{children}</div>
    <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 80, lineHeight: 1, color: C.plumDeep }}>{label}</div>
    <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 24, letterSpacing: 4, color: C.muted }}>{sub.toUpperCase()}</div>
  </div>
);

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { local, P, SCENES } from "./timeline";
import { C, Eyebrow, LogoMark, Raceme, rp, SANS, SCRIPT, SERIF, useEnter } from "./ui";

const CONTACTS = [
  { name: "Tante Rina", initials: "TR", color: C.rose },
  { name: "Grup Kantor", initials: "GK", color: C.leaf },
  { name: "Teman SMA", initials: "TS", color: C.wisteria },
];

const FEATURES = [
  { label: "RSVP", icon: "M4 12 l5 5 L20 6" },
  { label: "Peta lokasi", icon: "M12 21 s-7-6.5-7-12 a7 7 0 0 1 14 0 c0 5.5-7 12-7 12z M12 11.5 a2.5 2.5 0 1 0 0-5 a2.5 2.5 0 0 0 0 5z" },
  { label: "Musik", icon: "M9 18 V5 l11-2 v13 M9 18 a3 3 0 1 1-6 0 a3 3 0 0 1 6 0z M20 16 a3 3 0 1 1-6 0 a3 3 0 0 1 6 0z" },
  { label: "Galeri foto", icon: "M3 5 h18 v14 H3z M3 16 l5-5 4 4 3-3 6 6 M16 9.5 a1.5 1.5 0 1 0 0-.01" },
];

export const SceneDigital: React.FC<{ digitalPrice: number }> = ({ digitalPrice }) => {
  const frame = useCurrentFrame();
  const { dur } = SCENES.digital;

  const tPrice = local("digital", 3, P(3, 1));
  const tSend = local("digital", 3, P(3, 2));
  const tFeat = local("digital", 3, P(3, 3));

  const head = useEnter(0);
  const phone = useEnter(6, 13);
  const tag = useEnter(tPrice, 8, 0.6);
  const exit = interpolate(frame, [dur - 20, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const float = Math.sin(frame / 18) * 8;

  return (
    <AbsoluteFill style={{ opacity: 1 - exit, transform: `scale(${1 - exit * 0.08})` }}>
      <div style={{ position: "absolute", top: 240, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Eyebrow n="02" label="WEBSITE UNDANGAN" color={C.plum} enter={head} />
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
          Undangan <span style={{ fontStyle: "italic", color: C.wisteria, fontWeight: 500 }}>digital</span>
        </div>
      </div>

      {/* phone with a Tivity invitation */}
      <div
        style={{
          position: "absolute",
          left: 600,
          top: 480,
          width: 400,
          height: 800,
          borderRadius: 62,
          background: C.plumNight,
          padding: 14,
          transform: `translateY(${(1 - phone) * 900 + float}px) rotate(${4 * phone}deg)`,
          boxShadow: "0 40px 60px rgba(58,15,66,.32)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 50,
            overflow: "hidden",
            background: `linear-gradient(180deg, ${C.card} 0%, ${C.lilac} 100%)`,
            position: "relative",
            textAlign: "center",
            color: C.plumDeep,
          }}
        >
          <Raceme x={40} y={-6} len={150} sway={Math.sin(frame / 22) * 4} grow={phone} />
          <Raceme x={332} y={-6} len={120} sway={Math.sin(frame / 22 + 1) * 4} grow={phone} hue="rose" />
          <div style={{ position: "absolute", top: 12, left: 136, width: 100, height: 26, borderRadius: 20, background: C.plumNight }} />
          <div style={{ marginTop: 84, display: "flex", justifyContent: "center" }}>
            <LogoMark size={110} />
          </div>
          <div style={{ marginTop: 26, fontFamily: SANS, fontWeight: 800, letterSpacing: 6, fontSize: 16, color: C.muted }}>
            THE WEDDING OF
          </div>
          <div style={{ fontFamily: SCRIPT, fontSize: 96, lineHeight: 1, marginTop: 14, color: C.plum }}>Alya</div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 40, color: C.rose, lineHeight: 1 }}>&</div>
          <div style={{ fontFamily: SCRIPT, fontSize: 96, lineHeight: 1, color: C.plum }}>Raka</div>
          <div style={{ width: 120, height: 2, background: C.wisteria, margin: "22px auto" }} />
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 20, letterSpacing: 3 }}>SABTU · 21 JUNI 2026</div>
          <div
            style={{
              position: "absolute",
              left: 40,
              right: 40,
              bottom: 50,
              padding: "20px 0",
              borderRadius: 999,
              background: C.plum,
              color: C.cream,
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: 2,
            }}
          >
            BUKA UNDANGAN
          </div>
        </div>
      </div>

      {/* price ticket */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 490,
          width: 470,
          transformOrigin: "50% 0%",
          transform: `rotate(${-3 + (1 - tag) * -25}deg) scale(${tag})`,
          opacity: Math.min(1, tag * 2),
        }}
      >
        <div
          style={{
            background: `linear-gradient(150deg, ${C.plum} 0%, ${C.plumDeep} 100%)`,
            color: C.cream,
            padding: "26px 34px 30px",
            borderRadius: 34,
            boxShadow: `0 12px 0 ${C.wisteria}, 0 26px 40px rgba(58,15,66,.3)`,
            fontFamily: SANS,
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: 5, color: C.shine }}>CUMA · SEKALI BAYAR</div>
          <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 80, lineHeight: 1.05, marginTop: 6, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
            {rp(digitalPrice)}
          </div>
        </div>
      </div>

      {/* chat bubbles: the link goes out */}
      {CONTACTS.map((c, i) => (
        <Contact key={c.name} {...c} index={i} start={tSend + i * 9} />
      ))}

      {/* features */}
      <div style={{ position: "absolute", left: 80, width: 480, top: 1150, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {FEATURES.map((f, i) => (
          <Feature key={f.label} {...f} start={tFeat + i * 7} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Contact: React.FC<{ name: string; initials: string; color: string; index: number; start: number }> = ({
  name,
  initials,
  color,
  index,
  start,
}) => {
  const frame = useCurrentFrame();
  const row = useEnter(start, 12);
  const top = 760 + index * 124;
  // paper plane flies from the phone to the bubble
  const p = interpolate(frame, [start - 12, start], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const px = interpolate(p, [0, 1], [640, 480]);
  const py = interpolate(p, [0, 1], [1080, top + 30]) - Math.sin(p * Math.PI) * 80;
  return (
    <>
      {p > 0 && p < 1 && (
        <svg width="54" height="54" viewBox="0 0 24 24" style={{ position: "absolute", left: px, top: py, transform: "scaleX(-1) rotate(-20deg)" }}>
          <path d="M2 12 L22 3 L15 21 L11 13 Z" fill={C.plum} />
        </svg>
      )}
      <div
        style={{
          position: "absolute",
          left: 80,
          width: 480,
          top,
          height: 104,
          borderRadius: "30px 30px 30px 8px",
          background: C.card,
          boxShadow: "0 12px 26px rgba(58,15,66,.12)",
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "0 22px",
          opacity: row,
          transform: `translateX(${(1 - row) * -160}px)`,
          fontFamily: SANS,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 99,
            background: color,
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
            fontSize: 24,
            color: C.card,
          }}
        >
          {initials}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 27, color: C.ink }}>{name}</div>
          <div style={{ fontWeight: 600, fontSize: 20, color: C.muted, marginTop: 2 }}>Undangan terkirim</div>
        </div>
        <svg width="42" height="28" viewBox="0 0 30 20" style={{ opacity: row }}>
          <path d="M2 11 l5 5 L17 4 M12 14 l2 2 L26 4" fill="none" stroke={C.leaf} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
};

const Feature: React.FC<{ label: string; icon: string; start: number }> = ({ label, icon, start }) => {
  const e = useEnter(start, 10);
  return (
    <div
      style={{
        height: 104,
        borderRadius: 999,
        background: C.card,
        border: `3px solid ${C.wisteriaSoft}`,
        color: C.plumDeep,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 20px",
        transform: `scale(${e})`,
        opacity: e,
        fontFamily: SANS,
      }}
    >
      <div style={{ width: 54, height: 54, borderRadius: 99, background: C.plum, display: "grid", placeItems: "center", flexShrink: 0 }}>
        <svg width="30" height="30" viewBox="0 0 24 24">
          <path d={icon} fill="none" stroke={C.cream} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ fontWeight: 800, fontSize: 23 }}>{label}</div>
    </div>
  );
};

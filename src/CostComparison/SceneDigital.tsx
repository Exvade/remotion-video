import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { local, SCENES } from "./timeline";
import { C, Kicker, rp, SANS, SERIF, useEnter } from "./ui";

const CONTACTS = [
  { name: "Tante Rina", initials: "TR", color: "#D9A48F" },
  { name: "Grup Kantor", initials: "GK", color: "#9DB8A8" },
  { name: "Teman SMA", initials: "TS", color: "#D7BE7A" },
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

  const tPrice = local("digital", 3, 1.48);
  const tSend = local("digital", 3, 3.72);
  const tFeat = local("digital", 3, 6.0);

  const head = useEnter(0);
  const phone = useEnter(6, 13);
  const tag = useEnter(tPrice, 8, 0.6);
  const exit = interpolate(frame, [dur - 20, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const float = Math.sin(frame / 18) * 8;

  return (
    <AbsoluteFill style={{ opacity: 1 - exit, transform: `scale(${1 - exit * 0.08})` }}>
      <div style={{ position: "absolute", top: 200, left: 90 }}>
        <Kicker n="02" label="WEBSITE UNDANGAN" color={C.sage} enter={head} />
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
          Undangan <span style={{ fontStyle: "italic", color: C.sage, fontWeight: 500 }}>digital</span>
        </div>
      </div>

      {/* phone */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 470,
          width: 430,
          height: 860,
          borderRadius: 64,
          background: C.ink,
          padding: 16,
          transform: `translateY(${(1 - phone) * 900 + float}px) rotate(${-4 * phone}deg)`,
          boxShadow: "0 40px 60px rgba(31,66,56,.3)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 50,
            overflow: "hidden",
            background: `linear-gradient(180deg, ${C.card} 0%, ${C.paperSage} 100%)`,
            position: "relative",
            textAlign: "center",
            color: C.sageDeep,
          }}
        >
          <div style={{ position: "absolute", top: 14, left: 150, width: 98, height: 26, borderRadius: 20, background: C.ink }} />
          <svg width="398" height="160" viewBox="0 0 398 160" style={{ position: "absolute", top: 60, left: 0 }}>
            <path d="M40 120 C 90 30, 150 40, 199 90 C 248 40, 308 30, 358 120" fill="none" stroke={C.gold} strokeWidth="3" />
            {[70, 120, 278, 328].map((x, i) => (
              <ellipse key={x} cx={x} cy={i % 3 ? 62 : 82} rx="16" ry="8" fill={C.sageSoft} transform={`rotate(${i < 2 ? -30 : 30} ${x} 70)`} />
            ))}
          </svg>
          <div style={{ marginTop: 210, fontFamily: SANS, fontWeight: 800, letterSpacing: 6, fontSize: 18, color: C.muted }}>
            THE WEDDING OF
          </div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: 74, lineHeight: 1.05, marginTop: 18, color: C.ink }}>
            Alya
            <div style={{ fontSize: 46, color: C.gold }}>&</div>
            Raka
          </div>
          <div style={{ width: 120, height: 2, background: C.gold, margin: "26px auto" }} />
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, letterSpacing: 3 }}>SABTU · 21 JUNI 2026</div>
          <div
            style={{
              position: "absolute",
              left: 40,
              right: 40,
              bottom: 60,
              padding: "20px 0",
              borderRadius: 999,
              background: C.sage,
              color: C.card,
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: 24,
              letterSpacing: 2,
            }}
          >
            BUKA UNDANGAN
          </div>
        </div>
      </div>

      {/* price tag */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 1235,
          zIndex: 5,
          transformOrigin: "40px 20px",
          transform: `rotate(${-6 + (1 - tag) * 40}deg) scale(${tag})`,
          opacity: Math.min(1, tag * 2),
        }}
      >
        <div
          style={{
            background: C.gold,
            color: C.ink,
            padding: "26px 34px 24px 56px",
            borderRadius: "18px 28px 28px 18px",
            clipPath: "polygon(30px 0, 100% 0, 100% 100%, 30px 100%, 0 50%)",
            boxShadow: "0 18px 30px rgba(140,106,14,.35)",
            fontFamily: SANS,
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", left: 22, top: "50%", width: 16, height: 16, marginTop: -8, borderRadius: 99, background: C.paperSage }} />
          <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: 4 }}>SEKALI BAYAR</div>
          <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 76, lineHeight: 1, marginTop: 4 }}>{rp(digitalPrice)}</div>
        </div>
      </div>

      {/* contacts receiving the link */}
      {CONTACTS.map((c, i) => (
        <Contact key={c.name} {...c} index={i} start={tSend + i * 9} />
      ))}

      {/* features */}
      <div style={{ position: "absolute", left: 570, right: 70, top: 980, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
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
  const top = 520 + index * 140;
  // paper plane flight from phone to the row
  const p = interpolate(frame, [start - 12, start], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const px = interpolate(p, [0, 1], [470, 600]);
  const py = interpolate(p, [0, 1], [820, top + 30]) - Math.sin(p * Math.PI) * 80;
  return (
    <>
      {p > 0 && p < 1 && (
        <svg width="54" height="54" viewBox="0 0 24 24" style={{ position: "absolute", left: px, top: py, transform: "rotate(-20deg)" }}>
          <path d="M2 12 L22 3 L15 21 L11 13 Z" fill={C.sage} />
        </svg>
      )}
      <div
        style={{
          position: "absolute",
          left: 570,
          right: 70,
          top,
          height: 116,
          borderRadius: 30,
          background: C.card,
          boxShadow: "0 14px 28px rgba(31,66,56,.12)",
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "0 22px",
          opacity: row,
          transform: `translateX(${(1 - row) * 160}px)`,
          fontFamily: SANS,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 99,
            background: color,
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
            fontSize: 26,
            color: C.card,
          }}
        >
          {initials}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 28, color: C.ink }}>{name}</div>
          <div style={{ fontWeight: 600, fontSize: 21, color: C.muted, marginTop: 2 }}>Undangan terkirim</div>
        </div>
        <svg width="44" height="30" viewBox="0 0 30 20" style={{ opacity: row }}>
          <path d="M2 11 l5 5 L17 4 M12 14 l2 2 L26 4" fill="none" stroke={C.sage} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
        height: 120,
        borderRadius: 28,
        background: C.sage,
        color: C.card,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 8,
        padding: "0 22px",
        transform: `scale(${e})`,
        opacity: e,
        fontFamily: SANS,
      }}
    >
      <svg width="34" height="34" viewBox="0 0 24 24">
        <path d={icon} fill="none" stroke={C.gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{ fontWeight: 800, fontSize: 24 }}>{label}</div>
    </div>
  );
};

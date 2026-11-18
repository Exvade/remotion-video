import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { B, H, T, VO, border, clamp, shadow, wordTimes } from "./theme";

// ============================================================
// Motion helpers — gerak halus, tanpa overshoot berlebihan
// ============================================================

/** Spring 0->1 mulai di `delay` (frame lokal). */
export const useIn = (delay = 0, damping = 20, stiffness = 120, mass = 0.8) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness, mass } });
};

/** Muncul sedikit lebih "hidup" — untuk chip & badge. */
export const usePop = (delay = 0) => useIn(delay, 16, 170, 0.7);

/** Masuk dari bawah + fade (dipakai sebagai style). */
export const rise = (p: number, dist = 24): React.CSSProperties => ({
  opacity: p,
  transform: `translateY(${(1 - p) * dist}px)`,
});

/** Mengambang pelan. */
export const float = (frame: number, amp = 6, speed = 40, phase = 0) => Math.sin(frame / speed + phase) * amp;

// ============================================================
// Primitives
// ============================================================

/** Kartu putih membulat dengan bayangan lembut. */
export const Card: React.FC<{
  children?: React.ReactNode;
  bg?: string;
  radius?: number;
  pad?: number | string;
  depth?: number;
  style?: React.CSSProperties;
}> = ({ children, bg = T.white, radius = 28, pad = 0, depth = 12, style }) => (
  <div style={{ position: "relative", background: bg, border, borderRadius: radius, boxShadow: shadow(depth), padding: pad, ...style }}>
    {children}
  </div>
);

/** Chip / pill kecil. */
export const Chip: React.FC<{
  children: React.ReactNode;
  at: number;
  bg?: string;
  color?: string;
  size?: number;
  dot?: string;
  style?: React.CSSProperties;
}> = ({ children, at, bg = T.white, color = T.ink, size = 34, dot, style }) => {
  const p = usePop(at);
  const frame = useCurrentFrame();
  if (frame < at) return null;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.35,
        padding: `${size * 0.36}px ${size * 0.62}px`,
        borderRadius: 999,
        background: bg,
        color,
        border: bg === T.white ? border : "none",
        boxShadow: shadow(8),
        fontFamily: H,
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: -size * 0.01,
        whiteSpace: "nowrap",
        opacity: p,
        transform: `translateY(${(1 - p) * 20}px) scale(${0.92 + p * 0.08})`,
        ...style,
      }}
    >
      {dot && <span style={{ width: size * 0.36, height: size * 0.36, borderRadius: 99, background: dot, flexShrink: 0 }} />}
      {children}
    </div>
  );
};

/** Ikon centang dalam lingkaran. */
export const Check: React.FC<{ size?: number; bg?: string; color?: string }> = ({ size = 40, bg = T.green, color = T.white }) => (
  <div style={{ width: size, height: size, borderRadius: 99, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4.2 4.2L19 7" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

/** HP: bezel navy tipis, layar putih. */
export const Phone: React.FC<{
  width: number;
  height: number;
  screen?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ width, height, screen = T.white, children, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: width * 0.13,
      background: T.ink,
      padding: width * 0.025,
      boxShadow: `0 40px 90px rgba(28,70,160,.22), 0 8px 20px rgba(28,70,160,.12)`,
      ...style,
    }}
  >
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: width * 0.11, overflow: "hidden", background: screen }}>
      <div style={{ position: "absolute", top: width * 0.03, left: "50%", width: width * 0.24, height: width * 0.055, marginLeft: -width * 0.12, borderRadius: 99, background: T.ink, zIndex: 5 }} />
      {children}
    </div>
  </div>
);

/** Jam digital di kartu putih. */
export const Clock: React.FC<{ time: string; size?: number; blink?: boolean; label?: string }> = ({ time, size = 200, blink = true, label }) => {
  const frame = useCurrentFrame();
  const [hh, mm] = time.split(".");
  const on = !blink || Math.floor(frame / 15) % 2 === 0;
  return (
    <Card radius={size * 0.24} pad={`${size * 0.1}px ${size * 0.22}px ${size * 0.12}px`} depth={16} style={{ textAlign: "center" }}>
      {label && <div style={{ fontFamily: B, fontWeight: 600, fontSize: size * 0.13, color: T.sub, marginBottom: size * 0.02 }}>{label}</div>}
      <div style={{ fontFamily: H, fontWeight: 700, fontSize: size, lineHeight: 1, letterSpacing: -size * 0.04, color: T.ink, fontVariantNumeric: "tabular-nums", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span>{hh}</span>
        <span style={{ opacity: on ? 1 : 0.2, color: T.blue, margin: `0 ${size * 0.02}px`, transform: `translateY(-${size * 0.06}px)` }}>:</span>
        <span>{mm}</span>
      </div>
    </Card>
  );
};

/**
 * Kartu status toko yang bisa dibalik. flip: 0 = Tutup, 1 = Buka 24 jam.
 */
export const StatusCard: React.FC<{ flip: number; width?: number; tilt?: number }> = ({ flip, width = 620, tilt = 0 }) => {
  const h = width * 0.42;
  const face = (front: boolean): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    borderRadius: width * 0.07,
    backfaceVisibility: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: `0 ${width * 0.08}px`,
    gap: width * 0.025,
    transform: front ? "rotateY(0deg)" : "rotateY(180deg)",
    background: T.white,
    border,
    boxShadow: shadow(18),
  });
  const pill = (bg: string, color: string, dot: string, text: string) => (
    <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: width * 0.02, padding: `${width * 0.015}px ${width * 0.035}px`, borderRadius: 99, background: bg, color, fontFamily: B, fontWeight: 600, fontSize: width * 0.042 }}>
      <span style={{ width: width * 0.022, height: width * 0.022, borderRadius: 99, background: dot }} />
      {text}
    </div>
  );
  return (
    <div style={{ width, height: h, perspective: 1800, transform: `rotate(${tilt}deg)` }}>
      <div style={{ position: "absolute", width, height: h, transformStyle: "preserve-3d", transform: `rotateY(${flip * 180}deg)` }}>
        <div style={face(true)}>
          {pill(T.redSoft, T.red, T.red, "Status toko")}
          <div style={{ fontFamily: H, fontWeight: 700, fontSize: width * 0.15, lineHeight: 1, letterSpacing: -width * 0.005, color: T.ink }}>Tutup</div>
          <div style={{ fontFamily: B, fontWeight: 500, fontSize: width * 0.042, color: T.sub }}>Chat dibalas besok pagi</div>
        </div>
        <div style={face(false)}>
          {pill(T.greenSoft, T.green, T.green, "Status toko")}
          <div style={{ fontFamily: H, fontWeight: 700, fontSize: width * 0.13, lineHeight: 1, letterSpacing: -width * 0.005, color: T.ink, whiteSpace: "nowrap" }}>
            Buka <span style={{ color: T.blue }}>24 jam</span>
          </div>
          <div style={{ fontFamily: B, fontWeight: 500, fontSize: width * 0.042, color: T.sub }}>Pesan kapan saja lewat website</div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Captions — subtitle kata-per-kata mengikuti VO (dipasang di root, frame absolut)
// ============================================================

type Page = { words: string[]; start: number; times: number[] };

const paginate = (text: string, times: number[], max = 34): Page[] => {
  const words = text.split(" ");
  const pages: Page[] = [];
  let cur: Page = { words: [], start: times[0], times: [] };
  words.forEach((w, i) => {
    const len = [...cur.words, w].join(" ").length;
    const prev = cur.words[cur.words.length - 1] ?? "";
    const softBreak = cur.words.length > 0 && len > max * 0.55 && /[.?!]$|\.\.\.$/.test(prev);
    if (cur.words.length > 0 && (len > max || softBreak)) {
      pages.push(cur);
      cur = { words: [], start: times[i], times: [] };
    }
    cur.words.push(w);
    cur.times.push(times[i]);
  });
  pages.push(cur);
  return pages;
};

export const Captions: React.FC<{ top?: number }> = ({ top = 1420 }) => {
  const frame = useCurrentFrame();
  const l = VO.find((v) => frame >= v.from - 2 && frame < v.from + v.frames + 8);
  if (!l) return null;
  const offset = l.from - l.at;
  const times = wordTimes(l.id).map((t) => t + offset);
  const pages = paginate(l.text, times);
  const pi = Math.max(0, pages.findIndex((p, i) => frame >= p.start - 2 && (i === pages.length - 1 || frame < pages[i + 1].start - 2)));
  const page = pages[pi];
  const box = interpolate(frame, [page.start - 2, page.start + 6], [0, 1], clamp);
  const size = 54;

  return (
    <div style={{ position: "absolute", top, left: 70, right: 70, display: "flex", justifyContent: "center", zIndex: 40 }}>
      <div
        style={{
          maxWidth: 900,
          padding: "22px 34px",
          borderRadius: 30,
          background: "rgba(255,255,255,.92)",
          border,
          boxShadow: shadow(14),
          textAlign: "center",
          lineHeight: 1.22,
          fontFamily: H,
          fontWeight: 700,
          fontSize: size,
          letterSpacing: -size * 0.02,
          opacity: box,
          transform: `translateY(${(1 - box) * 14}px)`,
        }}
      >
        {page.words.map((w, i) => {
          const t = page.times[i];
          const said = interpolate(frame, [t - 1, t + 3], [0, 1], clamp);
          const next = page.times[i + 1] ?? l.from + l.frames;
          const active = frame >= t - 1 && frame < next;
          return (
            <span key={`${pi}-${i}`} style={{ color: active ? T.blue : T.ink, opacity: 0.25 + said * 0.75 }}>
              {w}
              {i < page.words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </div>
    </div>
  );
};

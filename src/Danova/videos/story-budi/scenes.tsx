import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Logo } from "../../components/Logo";
import { B, H, INCOMING, ORDERS, PRODUCTS, QA, SCENES, SHOP, T, clamp, rp } from "./theme";
import { BigClock, Eyebrow, Headline, Notif, Phone, ShopSign, useIn, useOut } from "./ui";

const center: React.CSSProperties = { position: "absolute", left: 0, right: 0, display: "flex", justifyContent: "center" };

/** Headline yang muncul lalu hilang di dalam rentang frame lokal. */
const Beat: React.FC<{ from: number; dur: number; top: number; children: React.ReactNode }> = ({ from, dur, top, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [from + dur - 10, from + dur], [1, 0], clamp);
  return (
    <Sequence from={from} durationInFrames={dur} layout="none">
      <div style={{ position: "absolute", top, left: 70, right: 70, opacity: o }}>{children}</div>
    </Sequence>
  );
};

// ============================================================
// 1. HOOK — "02:17. Budi belum tidur."
// ============================================================
export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const out = useOut(SCENES.hook.dur);
  const eyebrow = useIn(2);
  const clock = useIn(0, 18, 90, 1);
  const sub = useIn(96);
  const badge = useIn(102, 11, 160, 0.6);
  const count = Math.round(interpolate(frame, [104, 142], [1, 47], { ...clamp, easing: Easing.out(Easing.quad) }));
  const buzz = frame > 102 && frame < 146 ? Math.sin(frame * 2.2) * 5 : 0;

  return (
    <AbsoluteFill style={{ opacity: out, transform: `scale(${1 + (1 - out) * 0.06})` }}>
      <div style={{ ...center, top: 420 }}>
        <Eyebrow enter={eyebrow} color={T.muted}>Satu malam di {SHOP}</Eyebrow>
      </div>
      <div style={{ ...center, top: 510, opacity: clock, transform: `scale(${0.85 + clock * 0.15})` }}>
        <BigClock time="02.17" size={300} />
      </div>
      <div style={{ position: "absolute", top: 880, left: 60, right: 60 }}>
        <Headline text="Budi *belum* tidur." delay={56} size={104} accent={T.orange} />
      </div>
      <div
        style={{
          ...center,
          top: 1020,
          fontFamily: B,
          fontWeight: 500,
          fontSize: 46,
          color: T.muted,
          opacity: sub,
          transform: `translateY(${(1 - sub) * 20}px)`,
        }}
      >
        HP-nya nggak berhenti bunyi.
      </div>

      {/* Counter chat belum dibales */}
      <div style={{ ...center, top: 1200 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            padding: "26px 48px 26px 30px",
            borderRadius: 999,
            background: "rgba(255,107,53,.12)",
            border: `2px solid rgba(255,107,53,.5)`,
            opacity: badge,
            transform: `scale(${0.6 + badge * 0.4}) translateX(${buzz}px)`,
          }}
        >
          <div
            style={{
              minWidth: 120,
              height: 120,
              padding: "0 18px",
              borderRadius: 999,
              background: T.orange,
              color: T.white,
              fontFamily: H,
              fontWeight: 800,
              fontSize: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {count}
          </div>
          <div style={{ fontFamily: B, fontWeight: 600, fontSize: 40, color: T.white, lineHeight: 1.2 }}>
            chat belum
            <br />
            dibales
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// 2. CHAOS — DM numpuk, isinya sama, yang telat dibales kabur
// ============================================================
const MSG_START = 8;
const MSG_GAP = 21;
const TYPE_FROM = 238;
const REPLY = "Halo kak, untuk harganya 125rb ya, ongkirnya nanti aku cek du";
const LOST_AT = 291;

const Bubble: React.FC<{ enter: number; mine?: boolean; name?: string; text: string; time?: string; tone?: string }> = ({
  enter,
  mine,
  name,
  text,
  time,
  tone = T.orange,
}) => (
  <div style={{ maxHeight: enter * 220, overflow: "visible", display: "flex", justifyContent: mine ? "flex-end" : "flex-start" }}>
    <div
      style={{
        maxWidth: "82%",
        padding: "16px 22px",
        borderRadius: mine ? "26px 26px 6px 26px" : "26px 26px 26px 6px",
        background: mine ? T.primary : "#1A2236",
        opacity: enter,
        transform: `scale(${0.8 + enter * 0.2})`,
        transformOrigin: mine ? "100% 100%" : "0% 100%",
      }}
    >
      {name && <div style={{ fontFamily: B, fontWeight: 700, fontSize: 22, color: tone, marginBottom: 2 }}>{name}</div>}
      <div style={{ fontFamily: B, fontWeight: 500, fontSize: 30, color: T.white, lineHeight: 1.3 }}>{text}</div>
      {time && <div style={{ fontFamily: B, fontSize: 18, color: "rgba(255,255,255,.5)", textAlign: "right", marginTop: 2 }}>{time}</div>}
    </div>
  </div>
);

export const SceneChaos: React.FC = () => {
  const frame = useCurrentFrame();
  const out = useOut(SCENES.chaos.dur, 16);
  const phone = useIn(0, 16, 110, 0.9);

  const shown = Math.max(0, Math.min(INCOMING.length, Math.floor((frame - MSG_START) / MSG_GAP) + 1));
  const lastMsgFrame = MSG_START + (shown - 1) * MSG_GAP;
  const jolt = shown > 0 && frame - lastMsgFrame < 6 && frame < TYPE_FROM ? Math.sin((frame - lastMsgFrame) * 3) * 6 : 0;
  const time = frame >= LOST_AT ? "02.51" : shown > 0 ? INCOMING[shown - 1].time : "02.17";

  const typed = REPLY.slice(0, Math.max(0, Math.floor((frame - TYPE_FROM) * 1.3)));
  const typingEnter = useIn(TYPE_FROM - 4);
  const lost = useIn(LOST_AT, 12, 150, 0.6);
  const lostFlash = interpolate(frame, [LOST_AT, LOST_AT + 4, LOST_AT + 24], [0, 0.35, 0], clamp);

  return (
    <AbsoluteFill style={{ opacity: out, transform: `translateY(${(1 - out) * -60}px)` }}>
      <AbsoluteFill style={{ background: T.danger, opacity: lostFlash }} />

      <Beat from={0} dur={76} top={200}>
        <Headline text="*47 chat* masuk." size={96} accent={T.orange} />
      </Beat>
      <Beat from={76} dur={170} top={200}>
        <Headline text="Isinya? / *Hampir sama* semua." size={84} accent={T.orange} />
      </Beat>
      <Beat from={246} dur={110} top={200}>
        <Headline text="Dibales telat, / pembeli *kabur.*" size={84} accent={T.danger} />
      </Beat>

      <div style={{ ...center, top: 450, transform: `translateY(${(1 - phone) * 900}px) translateX(${jolt}px) rotate(${jolt * 0.15}deg)` }}>
        <Phone width={720} height={1110} glow="rgba(255,107,53,.22)">
          {/* status bar + header */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "26px 44px 0", display: "flex", justifyContent: "space-between", fontFamily: B, fontWeight: 600, fontSize: 24, color: T.white }}>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{time}</span>
            <span style={{ color: T.muted }}>12% ▮</span>
          </div>
          <div style={{ position: "absolute", top: 88, left: 0, right: 0, padding: "16px 36px", borderBottom: `1.5px solid ${T.glassLine}`, display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 64, height: 64, borderRadius: 99, background: "#5C3A22", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: H, fontWeight: 800, fontSize: 30, color: T.white }}>
              B
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: H, fontWeight: 700, fontSize: 32, color: T.white }}>{SHOP} — Chat</div>
              <div style={{ fontFamily: B, fontSize: 22, color: T.muted }}>{frame >= TYPE_FROM && frame < LOST_AT ? "Budi sedang mengetik…" : "online"}</div>
            </div>
            <div style={{ minWidth: 58, height: 46, padding: "0 14px", borderRadius: 99, background: T.orange, color: T.white, fontFamily: H, fontWeight: 800, fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {Math.min(47, 38 + shown)}
            </div>
          </div>

          {/* daftar pesan, bottom-anchored */}
          <div style={{ position: "absolute", top: 200, bottom: 30, left: 26, right: 26, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 14, overflow: "hidden" }}>
            {INCOMING.map((m, i) => (
              <MsgIn key={i} delay={MSG_START + i * MSG_GAP} {...m} />
            ))}
            {frame >= TYPE_FROM - 4 && <Bubble enter={typingEnter} mine text={(typed || "…") + (frame < LOST_AT ? "|" : "")} />}
            {frame >= LOST_AT && (
              <Bubble enter={lost} name="Rina" tone={T.danger} text="udah beli di toko sebelah kak 🙏" time="02.51" />
            )}
          </div>
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

const MsgIn: React.FC<{ delay: number; name: string; text: string; time: string }> = ({ delay, ...m }) => {
  const e = useIn(delay, 13, 170, 0.6);
  const frame = useCurrentFrame();
  if (frame < delay) return null;
  return <Bubble enter={e} {...m} />;
};

// ============================================================
// 3. INSIGHT — 47 chat -> 3 order. Tokonya "tutup".
// ============================================================
export const SignSwing = (frame: number, at: number, amp = 10) => {
  const t = Math.max(0, frame - at);
  return Math.sin(t / 7) * amp * Math.exp(-t / 45);
};

export const SceneInsight: React.FC = () => {
  const frame = useCurrentFrame();
  const a = useIn(8);
  const arrow = useIn(36);
  const b = useIn(52, 10, 160, 0.6);
  const sign = useIn(68, 14, 90, 1);
  const textOut = useOut(SCENES.insight.dur, 12);

  return (
    <AbsoluteFill>
      {/* 47 -> 3 */}
      <div style={{ ...center, top: 190, alignItems: "flex-end", gap: 44, opacity: textOut }}>
        <div style={{ textAlign: "center", opacity: a, transform: `translateY(${(1 - a) * 30}px)` }}>
          <div style={{ fontFamily: H, fontWeight: 800, fontSize: 170, lineHeight: 1, color: T.white }}>47</div>
          <div style={{ fontFamily: B, fontWeight: 600, fontSize: 32, color: T.muted, marginTop: 8 }}>chat masuk</div>
        </div>
        <div style={{ fontFamily: H, fontWeight: 700, fontSize: 90, color: T.muted, marginBottom: 70, opacity: arrow, transform: `translateX(${(1 - arrow) * -30}px)` }}>→</div>
        <div style={{ textAlign: "center", opacity: b, transform: `scale(${0.6 + b * 0.4})` }}>
          <div style={{ fontFamily: H, fontWeight: 800, fontSize: 170, lineHeight: 1, color: T.orange }}>3</div>
          <div style={{ fontFamily: B, fontWeight: 600, fontSize: 32, color: T.orange, marginTop: 8 }}>yang beli</div>
        </div>
      </div>

      {/* papan TUTUP */}
      <div style={{ ...center, top: 520, opacity: sign, transform: `translateY(${(1 - sign) * -500}px)` }}>
        <ShopSign flip={0} swing={SignSwing(frame, 68, 12)} width={600} />
      </div>

      <div style={{ position: "absolute", top: 1100, left: 70, right: 70, opacity: textOut }}>
        <Headline text="Produknya bagus. / Tokonya aja yang *“tutup”* / pas orang mau beli." delay={80} size={66} accent={T.orange} stagger={3} />
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// 4. TURN — papan dibalik, website dibangun, pertanyaan terjawab
// ============================================================
const SIGN_FLIP = 32;
const SITE_IN = 72;

export const SceneTurn: React.FC = () => {
  const frame = useCurrentFrame();
  const out = useOut(SCENES.turn.dur, 16);
  const flip = useIn(SIGN_FLIP, 12, 70, 1);
  const signAway = interpolate(frame, [SITE_IN - 12, SITE_IN + 6], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const site = useIn(SITE_IN, 16, 110, 0.9);
  const glow = interpolate(frame, [SIGN_FLIP, SIGN_FLIP + 20], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ opacity: out }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 45%, rgba(0,212,255,${0.25 * glow}) 0%, rgba(0,0,0,0) 60%)` }} />

      <Beat from={4} dur={SITE_IN - 4} top={200}>
        <Headline text="Lalu Budi / *bikin website.*" size={92} />
      </Beat>

      {signAway < 1 && (
        <div style={{ ...center, top: 520, opacity: 1 - signAway, transform: `translateY(${-signAway * 300}px) scale(${1 - signAway * 0.4})` }}>
          <ShopSign flip={flip} swing={SignSwing(frame, SIGN_FLIP + 10, 8)} width={600} />
        </div>
      )}

      <Beat from={SITE_IN + 4} dur={220} top={200}>
        <Headline text="Semua pertanyaan tadi / *udah dijawab duluan.*" size={68} />
      </Beat>

      {frame >= SITE_IN - 2 && (
        <div style={{ position: "absolute", left: 70, top: 470, transform: `translateY(${(1 - site) * 1100}px)` }}>
          <Phone width={500} height={1010} screen="#F6F4EF" glow="rgba(51,102,255,.45)">
            <Website start={SITE_IN} />
          </Phone>
        </div>
      )}

      {/* Q -> A */}
      <div style={{ position: "absolute", left: 600, right: 60, top: 520, display: "flex", flexDirection: "column", gap: 26 }}>
        {QA.map((qa, i) => (
          <QACard key={i} delay={QA_AT[i]} {...qa} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// muncul pas kata "Harga", "ongkir", "tokonya asli" diucapkan (vo-09 mulai frame 80)
const QA_AT = [80, 101, 121];

const Website: React.FC<{ start: number }> = ({ start }) => {
  const nav = useIn(start + 14);
  const hero = useIn(start + 22);
  const p0 = useIn(start + 32, 13, 150, 0.6);
  const p1 = useIn(start + 38, 13, 150, 0.6);
  const p2 = useIn(start + 44, 13, 150, 0.6);
  const p3 = useIn(start + 50, 13, 150, 0.6);
  const p = [p0, p1, p2, p3];
  const cta = useIn(start + 62, 10, 160, 0.6);
  const frame = useCurrentFrame();
  const pulse = frame > start + 80 ? 1 + Math.sin((frame - start) / 7) * 0.025 : 1;

  return (
    <div style={{ position: "absolute", inset: 0, padding: "70px 24px 24px", fontFamily: B, color: "#1A1410" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", opacity: nav }}>
        <div style={{ fontFamily: H, fontWeight: 800, fontSize: 30 }}>{SHOP}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 99, background: "#E3F9EC", fontWeight: 700, fontSize: 16, color: "#0F7A3D" }}>
          <span style={{ width: 10, height: 10, borderRadius: 99, background: "#16A34A" }} /> BUKA 24 JAM
        </div>
      </div>

      <div style={{ marginTop: 22, padding: "26px 24px", borderRadius: 24, background: "#2B1B12", color: "#FFF6EA", opacity: hero, transform: `translateY(${(1 - hero) * 20}px)` }}>
        <div style={{ fontFamily: H, fontWeight: 800, fontSize: 34, lineHeight: 1.1 }}>
          Kopi lokal,
          <br />
          disangrai tiap minggu.
        </div>
        <div style={{ fontSize: 18, marginTop: 10, opacity: 0.75 }}>★ 4,9 · 312 ulasan · Jl. Melati 12, Bekasi</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 18 }}>
        {PRODUCTS.map((pr, i) => (
          <div key={pr.name} style={{ background: T.white, borderRadius: 20, padding: 12, boxShadow: "0 6px 16px rgba(0,0,0,.08)", opacity: p[i], transform: `scale(${0.85 + p[i] * 0.15})` }}>
            <div style={{ height: 120, borderRadius: 14, background: `linear-gradient(160deg, ${pr.tone} 0%, #1E120A 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 54, height: 78, borderRadius: "10px 10px 14px 14px", background: "#E9DCC8", boxShadow: "0 6px 10px rgba(0,0,0,.3)" }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 19, marginTop: 10 }}>{pr.name}</div>
            <div style={{ fontSize: 15, color: "#7A6F66" }}>{pr.size}</div>
            <div style={{ fontFamily: H, fontWeight: 800, fontSize: 21, color: T.primaryDark, marginTop: 4 }}>{rp(pr.price)}</div>
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", left: 24, right: 24, bottom: 28, opacity: cta, transform: `translateY(${(1 - cta) * 40}px) scale(${pulse})` }}>
        <div style={{ padding: "22px 0", borderRadius: 99, background: T.primary, color: T.white, textAlign: "center", fontFamily: H, fontWeight: 700, fontSize: 24, boxShadow: `0 12px 30px ${T.primary}66` }}>
          Isi form pesanan →
        </div>
      </div>
    </div>
  );
};

const QACard: React.FC<{ delay: number; q: string; a: string }> = ({ delay, q, a }) => {
  const frame = useCurrentFrame();
  const e = useIn(delay, 14, 140, 0.7);
  const solve = useIn(delay + 14, 12, 170, 0.6);
  const strike = interpolate(frame, [delay + 10, delay + 18], [0, 100], clamp);
  return (
    <div
      style={{
        padding: "24px 26px",
        borderRadius: 28,
        background: "rgba(255,255,255,.06)",
        border: `2px solid ${solve > 0.5 ? "rgba(0,230,118,.45)" : T.glassLine}`,
        opacity: e,
        transform: `translateX(${(1 - e) * 80}px)`,
      }}
    >
      <div style={{ position: "relative", display: "inline-block", fontFamily: B, fontWeight: 500, fontSize: 28, color: T.muted }}>
        “{q}”
        <div style={{ position: "absolute", left: 0, top: "52%", height: 3, width: `${strike}%`, background: T.muted }} />
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginTop: 14, opacity: solve, transform: `translateY(${(1 - solve) * 12}px)` }}>
        <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 99, background: T.success, color: "#06210F", fontFamily: H, fontWeight: 800, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${solve})` }}>
          ✓
        </div>
        <div style={{ fontFamily: H, fontWeight: 700, fontSize: 30, lineHeight: 1.2, color: T.white }}>{a}</div>
      </div>
    </div>
  );
};

// ============================================================
// 5. NIGHT — 02:17 lagi. Bedanya, Budi tidur. Bangun: 6 pesanan tercatat rapi.
// ============================================================
export const NIGHT_ORDER_START = 70;
export const NIGHT_ORDER_GAP = 15;
export const DAWN_AT = 150;

const pad = (n: number) => String(n).padStart(2, "0");

export const SceneNight: React.FC = () => {
  const frame = useCurrentFrame();
  const out = useOut(SCENES.night.dur, 14);
  const clockIn = useIn(0, 18, 90, 1);
  const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
  const lastIdx = Math.floor((frame - NIGHT_ORDER_START) / NIGHT_ORDER_GAP);
  const lastOrderEnd = NIGHT_ORDER_START + (ORDERS.length - 1) * NIGHT_ORDER_GAP;
  const mins =
    frame >= lastOrderEnd
      ? Math.round(interpolate(frame, [lastOrderEnd, DAWN_AT], [toMin(ORDERS[ORDERS.length - 1].time), 420], clamp))
      : lastIdx < 0
        ? toMin("02.17")
        : toMin(ORDERS[Math.min(lastIdx, ORDERS.length - 1)].time);
  const time = `${pad(Math.floor(mins / 60))}.${pad(mins % 60)}`;
  const dawn = interpolate(frame, [DAWN_AT - 30, DAWN_AT + 20], [0, 1], clamp);
  const stackOut = interpolate(frame, [DAWN_AT, DAWN_AT + 12], [1, 0], clamp);
  const sum = useIn(DAWN_AT + 10, 14, 120, 0.8);

  return (
    <AbsoluteFill style={{ opacity: out }}>
      {/* langit pagi */}
      <AbsoluteFill
        style={{
          opacity: dawn,
          background: `linear-gradient(180deg, ${T.dawnTop} 0%, #3A2C5A 45%, ${T.dawnMid} 85%, ${T.dawnLow} 115%)`,
        }}
      />
      <div style={{ position: "absolute", left: 340, top: 1500 - dawn * 260, width: 400, height: 400, borderRadius: 999, background: `radial-gradient(circle, ${T.dawnLow} 0%, rgba(255,210,63,0) 70%)`, opacity: dawn }} />

      {/* Zzz */}
      {[0, 1, 2].map((i) => {
        const t = (frame + i * 22) % 66;
        return (
          <div key={i} style={{ position: "absolute", left: 900 + t * 0.8, top: 200 - t * 1.6, fontFamily: H, fontWeight: 800, fontSize: 40 + i * 10, color: T.electricBlue, opacity: interpolate(t, [0, 15, 66], [0, 0.8, 0]) * (1 - dawn) * clockIn }}>
            z
          </div>
        );
      })}

      <div style={{ ...center, top: 230, opacity: clockIn }}>
        <BigClock time={time} size={230} blink={false} color={T.white} />
      </div>

      <Beat from={6} dur={DAWN_AT - 6} top={500}>
        <Headline text="Jam 02.17 lagi. / Bedanya, Budi *tidur.*" size={74} />
      </Beat>
      <Beat from={DAWN_AT + 2} dur={180} top={500}>
        <Headline text="Bangun-bangun, / *6 pesanan* udah nunggu." size={66} accent={T.dawnLow} />
      </Beat>

      {/* stack notifikasi */}
      <div style={{ position: "absolute", top: 730, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: stackOut, transform: `scale(${0.9 + stackOut * 0.1})` }}>
        {ORDERS.map((o, i) => (
          <OrderNotif key={i} delay={NIGHT_ORDER_START + i * NIGHT_ORDER_GAP} {...o} />
        ))}
      </div>

      {/* ringkasan pagi */}
      {frame >= DAWN_AT + 6 && (
        <div style={{ ...center, top: 790 }}>
          <div
            style={{
              width: 900,
              padding: "48px 56px",
              borderRadius: 44,
              background: "rgba(8,12,28,.72)",
              border: "2px solid rgba(255,255,255,.18)",
              boxShadow: "0 40px 100px rgba(0,0,0,.4)",
              opacity: sum,
              transform: `translateY(${(1 - sum) * 80}px)`,
              textAlign: "center",
            }}
          >
            <Eyebrow color={T.dawnLow}>Form pesanan semalam</Eyebrow>
            <div style={{ marginTop: 26, borderRadius: 24, overflow: "hidden", border: `1.5px solid ${T.glassLine}`, textAlign: "left" }}>
              <SheetRow cells={["Nama", "Pesanan", "Kirim ke"]} head enter={1} />
              {ORDERS.map((o, i) => (
                <SheetRow key={i} cells={[o.who, `${o.qty}× ${o.item}`, o.city]} enter={rowIn(frame, DAWN_AT + 18 + i * 5)} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 28, flexWrap: "wrap" }}>
              {["data lengkap", "tinggal konfirmasi"].map((t) => (
                <div key={t} style={{ padding: "12px 26px", borderRadius: 99, background: "rgba(0,230,118,.14)", border: "1.5px solid rgba(0,230,118,.5)", fontFamily: B, fontWeight: 700, fontSize: 30, color: T.success }}>
                  ✓ {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const rowIn = (frame: number, at: number) => interpolate(frame, [at, at + 8], [0, 1], clamp);

const SheetRow: React.FC<{ cells: string[]; head?: boolean; enter: number }> = ({ cells, head, enter }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 2.1fr 1.2fr",
      gap: 12,
      padding: "13px 24px",
      background: head ? "rgba(255,255,255,.10)" : "transparent",
      borderTop: head ? "none" : `1px solid ${T.glassLine}`,
      fontFamily: B,
      fontWeight: head ? 700 : 500,
      fontSize: head ? 22 : 27,
      letterSpacing: head ? 2 : 0,
      textTransform: head ? "uppercase" : "none",
      color: head ? T.muted : T.white,
      opacity: enter,
      transform: `translateX(${(1 - enter) * 30}px)`,
    }}
  >
    {cells.map((c, i) => (
      <span key={i}>{c}</span>
    ))}
  </div>
);

const OrderNotif: React.FC<{ delay: number; who: string; item: string; qty: number; city: string; time: string }> = ({ delay, who, item, qty, city, time }) => {
  const e = useIn(delay, 13, 160, 0.6);
  const frame = useCurrentFrame();
  if (frame < delay) return null;
  return <Notif enter={e} title={`Form pesanan baru · ${who}`} body={`${qty}× ${item} · kirim ke ${city}`} time={time} icon="✓" width={900} />;
};

// ============================================================
// 6. CTA
// ============================================================
export const SceneCta: React.FC = () => {
  const frame = useCurrentFrame();
  const sign = useIn(0, 14, 90, 1);
  const sub = useIn(44);
  const logo = useIn(94);
  const btn = useIn(72, 11, 150, 0.6);
  const pulse = 1 + Math.sin(frame / 8) * 0.02 * btn;

  return (
    <AbsoluteFill>
      <div style={{ ...center, top: 150, opacity: sign, transform: `translateY(${(1 - sign) * -300}px)` }}>
        <ShopSign flip={1} swing={SignSwing(frame, 4, 9)} width={440} />
      </div>
      <div style={{ position: "absolute", top: 620, left: 60, right: 60 }}>
        <Headline text="Toko lo juga bisa / *buka 24 jam.*" delay={12} size={92} accent={T.yellow} />
      </div>
      <div style={{ ...center, top: 850, fontFamily: B, fontWeight: 500, fontSize: 46, color: "rgba(255,255,255,.85)", opacity: sub, transform: `translateY(${(1 - sub) * 20}px)` }}>
        Tanpa lo harus begadang.
      </div>
      <div style={{ ...center, top: 1000, opacity: logo }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Logo size={110} delay={94} showText={false} />
          <div style={{ fontFamily: H, fontWeight: 800, fontSize: 52, color: T.white, lineHeight: 1 }}>Danova Digital</div>
        </div>
      </div>
      <div style={{ ...center, top: 1200 }}>
        <div style={{ opacity: btn, transform: `scale(${(0.7 + btn * 0.3) * pulse})`, textAlign: "center" }}>
          <div style={{ padding: "34px 64px", borderRadius: 999, background: T.white, color: T.primaryDark, fontFamily: H, fontWeight: 800, fontSize: 42, boxShadow: "0 24px 60px rgba(0,0,0,.35)" }}>
            DM “WEBSITE” · konsultasi gratis
          </div>
          <div style={{ fontFamily: B, fontWeight: 700, fontSize: 34, letterSpacing: 2, color: T.white, marginTop: 30, opacity: 0.9 }}>@danovadigitalcom</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

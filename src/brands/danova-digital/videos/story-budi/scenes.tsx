import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Logo } from "../../components/Logo";
import { B, H, INCOMING, ORDERS, PRODUCTS, SCENES, SHOP, T, border, clamp, line, rp, shadow, wordAt } from "./theme";
import { Card, Check, Chip, Clock, Phone, StatusCard, float, rise, useIn, usePop } from "./ui";

// Konten utama ada di pita y 200..1360; subtitle VO di bawahnya (lihat Captions).
const center: React.CSSProperties = { position: "absolute", left: 0, right: 0, display: "flex", justifyContent: "center" };
const at = (x: number, y: number): React.CSSProperties => ({ position: "absolute", left: x, top: y });

// ============================================================
// Timing (frame lokal scene), semuanya diturunkan dari VO
// ============================================================
const L2 = line("02");
const L3 = line("03");
const L5 = line("05");
const L6 = line("06");
const L7 = line("07");
const L9 = line("09");
const L11 = line("11");
const L13 = line("13");

export const BEAT = {
  // hook
  phoneIn: wordAt("01", 5), // "Budi"
  // chaos
  msgStart: L3.at,
  msgEnd: wordAt("04", 3), // "semua."
  askHarga: wordAt("04", 4),
  askReady: wordAt("04", 6),
  askOngkir: wordAt("04", 8),
  typing: L5.at,
  kabur: wordAt("05", 6),
  // insight
  buyers: wordAt("06", 5), // "cuma"
  signDrop: wordAt("07", 2), // "Tokonya"
  // turn
  flip: wordAt("08", 2), // "bikin"
  siteIn: L9.at - 14,
  qa: [wordAt("09", 0), wordAt("09", 1), wordAt("09", 2)],
  solved: wordAt("09", 8), // "dijawab"
  formTap: wordAt("09", 15), // "isi"
  // night
  bedIn: wordAt("10", 6), // "Bedanya"
  ordersFrom: wordAt("10", 10) + 4,
  dawn: L11.at - 22,
  sheetIn: L11.at + 4,
  // cta
  dm: L13.at,
};

const n = INCOMING.length;
export const MSG_AT = INCOMING.map((_, i) => BEAT.msgStart + 4 + (i * (BEAT.msgEnd - BEAT.msgStart)) / (n - 1));
export const ORDER_AT = ORDERS.map((_, i) => BEAT.ordersFrom + (i * (BEAT.dawn - BEAT.ordersFrom + 6)) / (ORDERS.length - 1));

const Avatar: React.FC<{ letter: string; size?: number; bg?: string }> = ({ letter, size = 52, bg = T.blue }) => (
  <div style={{ width: size, height: size, borderRadius: 99, background: bg, color: T.white, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: H, fontWeight: 700, fontSize: size * 0.42, flexShrink: 0 }}>
    {letter}
  </div>
);

// ============================================================
// 1. HOOK — 02.17. Budi belum tidur. HP-nya nggak berhenti bunyi.
// ============================================================
const PINGS = [
  { t: "Kak, harga?", x: 60, y: 760 },
  { t: "Ready?", x: 780, y: 830 },
  { t: "P", x: 120, y: 1000 },
  { t: "Ongkir brp?", x: 720, y: 1110 },
  { t: "kak??", x: 110, y: 1210 },
];

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const clock = useIn(0);
  const phone = useIn(BEAT.phoneIn);
  const ring = frame >= L2.at && frame < L2.at + L2.frames + 10;
  const buzz = ring ? Math.sin(frame * 2.4) * 4 : 0;
  const count = Math.round(interpolate(frame, [L2.at, L2.at + L2.frames], [1, 47], { ...clamp, easing: Easing.out(Easing.quad) }));

  return (
    <AbsoluteFill>
      <div style={{ ...center, top: 230 }}>
        <Chip at={2} dot={T.blue} size={30}>
          Satu malam di {SHOP}
        </Chip>
      </div>
      <div style={{ ...center, top: 340, ...rise(clock, 40), transform: `translateY(${(1 - clock) * 40 + float(frame, 5)}px)` }}>
        <Clock time="02.17" size={200} />
      </div>

      {frame >= BEAT.phoneIn && (
        <div style={{ ...center, top: 700, opacity: phone, transform: `translateY(${(1 - phone) * 300}px) translateX(${buzz}px)` }}>
          <div style={{ position: "relative" }}>
            <Phone width={370} height={600}>
              <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontFamily: H, fontWeight: 700, fontSize: 60, letterSpacing: -2, color: T.ink }}>02.17</div>
              <div style={{ position: "absolute", top: 160, left: 16, right: 16, display: "flex", flexDirection: "column", gap: 9 }}>
                {INCOMING.slice(0, 5).map((m, i) => {
                  const e = interpolate(frame, [L2.at + i * 8, L2.at + i * 8 + 7], [0, 1], clamp);
                  return (
                    <div key={i} style={{ ...rise(e, -14), background: T.sky, borderRadius: 16, padding: "9px 12px", fontFamily: B, fontSize: 18, color: T.ink }}>
                      <b>{m.name}</b> <span style={{ color: T.sub }}>· {m.text}</span>
                    </div>
                  );
                })}
              </div>
            </Phone>
            {frame >= L2.at && (
              <div style={{ position: "absolute", top: -26, right: -30, minWidth: 92, height: 92, padding: "0 14px", borderRadius: 99, background: T.red, border: `5px solid ${T.white}`, boxShadow: shadow(10), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: H, fontWeight: 700, fontSize: 44, color: T.white, fontVariantNumeric: "tabular-nums" }}>
                {count}
              </div>
            )}
          </div>
        </div>
      )}

      {PINGS.map((p, i) => (
        <div key={i} style={{ ...at(p.x, p.y), transform: `translateY(${float(frame, 6, 30, i)}px)` }}>
          <Chip at={L2.at + 4 + i * 9} size={30}>
            {p.t}
          </Chip>
        </div>
      ))}
    </AbsoluteFill>
  );
};

// ============================================================
// 2. CHAOS — 47 chat, isinya sama, yang telat dibales kabur
// ============================================================
const REPLY = "Halo kak, harganya 125rb ya, ongkir aku cek du";

const Bubble: React.FC<{ enter: number; mine?: boolean; lost?: boolean; name?: string; text: string; time?: string }> = ({ enter, mine, lost, name, text, time }) => (
  <div style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start", maxHeight: enter * 200 }}>
    <div
      style={{
        maxWidth: "82%",
        padding: "12px 18px",
        borderRadius: mine ? "22px 22px 6px 22px" : "22px 22px 22px 6px",
        background: mine ? T.blue : lost ? T.redSoft : T.sky,
        color: mine ? T.white : T.ink,
        opacity: enter,
        transform: `translateY(${(1 - enter) * 14}px)`,
      }}
    >
      {name && <div style={{ fontFamily: H, fontWeight: 700, fontSize: 19, color: lost ? T.red : T.blue }}>{name}</div>}
      <div style={{ fontFamily: B, fontWeight: 500, fontSize: 26, lineHeight: 1.3 }}>{text}</div>
      {time && <div style={{ fontFamily: B, fontSize: 15, color: mine ? "rgba(255,255,255,.7)" : T.faint, textAlign: "right" }}>{time}</div>}
    </div>
  </div>
);

const Msg: React.FC<{ delay: number; name: string; text: string; time: string }> = ({ delay, ...m }) => {
  const frame = useCurrentFrame();
  const e = useIn(delay, 18, 200, 0.6);
  if (frame < delay) return null;
  return <Bubble enter={e} {...m} />;
};

export const SceneChaos: React.FC = () => {
  const frame = useCurrentFrame();
  const phone = useIn(0);
  const shown = MSG_AT.filter((t) => frame >= t).length;
  const counter = useIn(wordAt("03", 3));
  const typed = REPLY.slice(0, Math.max(0, Math.floor((frame - BEAT.typing) * 1.4)));
  const typingIn = useIn(BEAT.typing);
  const lost = useIn(BEAT.kabur);
  const tint = interpolate(frame, [BEAT.kabur, BEAT.kabur + 6, BEAT.kabur + 30], [0, 0.18, 0.08], clamp);
  const time = frame >= BEAT.kabur ? "02.51" : shown > 0 ? INCOMING[shown - 1].time : "02.17";

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: T.red, opacity: tint }} />

      <div style={{ ...center, top: 250, opacity: phone, transform: `translateY(${(1 - phone) * 200}px)` }}>
        <Phone width={580} height={1060}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "20px 40px 0", display: "flex", justifyContent: "space-between", fontFamily: B, fontWeight: 600, fontSize: 21, color: T.ink }}>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{time}</span>
            <span>12%</span>
          </div>
          <div style={{ position: "absolute", top: 70, left: 0, right: 0, padding: "12px 24px", borderBottom: border, display: "flex", alignItems: "center", gap: 14 }}>
            <Avatar letter="B" bg="#7A4A2B" />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: H, fontWeight: 700, fontSize: 26, color: T.ink }}>{SHOP}</div>
              <div style={{ fontFamily: B, fontWeight: 500, fontSize: 18, color: frame >= BEAT.typing && frame < BEAT.kabur ? T.blue : T.sub }}>
                {frame >= BEAT.typing && frame < BEAT.kabur ? "sedang mengetik…" : "online"}
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", top: 160, bottom: 22, left: 18, right: 18, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 10, overflow: "hidden" }}>
            {INCOMING.map((m, i) => (
              <Msg key={i} delay={MSG_AT[i]} {...m} />
            ))}
            {frame >= BEAT.typing && <Bubble enter={typingIn} mine text={(typed || "…") + (frame < BEAT.kabur ? "|" : "")} />}
            {frame >= BEAT.kabur && <Bubble enter={lost} lost name="Rina" text="udah beli di toko sebelah kak 🙏" time="02.51" />}
          </div>
        </Phone>
      </div>

      {/* counter chat */}
      {frame >= wordAt("03", 3) && (
        <div style={{ ...at(50, 210), ...rise(counter, 30) }}>
          <Card radius={28} pad="18px 30px" depth={14}>
            <div style={{ fontFamily: H, fontWeight: 700, fontSize: 96, lineHeight: 1, letterSpacing: -4, color: T.blue, fontVariantNumeric: "tabular-nums" }}>{40 + shown}</div>
            <div style={{ fontFamily: B, fontWeight: 600, fontSize: 24, color: T.sub, marginTop: 4 }}>chat masuk</div>
          </Card>
        </div>
      )}

      {/* pertanyaan yang sama terus */}
      <div style={at(700, 540)}>
        <Chip at={BEAT.askHarga} bg={T.blue} color={T.white} size={38}>Harga?</Chip>
      </div>
      <div style={at(40, 760)}>
        <Chip at={BEAT.askReady} bg={T.blue} color={T.white} size={38}>Ready?</Chip>
      </div>
      <div style={at(700, 940)}>
        <Chip at={BEAT.askOngkir} bg={T.blue} color={T.white} size={38}>Ongkir?</Chip>
      </div>

      <div style={{ ...center, top: 640 }}>
        <Chip at={BEAT.kabur + 4} bg={T.red} color={T.white} size={46} style={{ boxShadow: shadow(18) }}>
          ✕ Pembeli kabur
        </Chip>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// 3. INSIGHT — 47 chat -> 3 beli. Tokonya "tutup".
// ============================================================
const BUYERS = [10, 27, 41];

export const SceneInsight: React.FC = () => {
  const frame = useCurrentFrame();
  const a = useIn(L6.at + 4);
  const arrow = useIn(BEAT.buyers);
  const b = usePop(wordAt("06", 6));
  const dim = interpolate(frame, [BEAT.buyers, BEAT.buyers + 10], [0, 1], clamp);
  const gridOut = interpolate(frame, [L7.at, L7.at + 14], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const sign = useIn(BEAT.signDrop);

  const stat = (num: string, label: string, accent: boolean) => (
    <Card bg={accent ? T.blue : T.white} radius={30} pad="20px 44px" depth={accent ? 18 : 12} style={{ border: accent ? "none" : border, textAlign: "center" }}>
      <div style={{ fontFamily: H, fontWeight: 700, fontSize: 120, lineHeight: 1, letterSpacing: -5, color: accent ? T.white : T.ink }}>{num}</div>
      <div style={{ fontFamily: B, fontWeight: 600, fontSize: 26, color: accent ? "rgba(255,255,255,.85)" : T.sub, marginTop: 6 }}>{label}</div>
    </Card>
  );

  return (
    <AbsoluteFill>
      <div style={{ ...center, top: 220, alignItems: "center", gap: 30 }}>
        <div style={rise(a, 30)}>{stat("47", "chat masuk", false)}</div>
        <svg width={70} height={40} viewBox="0 0 70 40" style={{ opacity: arrow, transform: `translateX(${(1 - arrow) * -20}px)` }}>
          <path d="M4 20h56M46 6l14 14-14 14" stroke={T.faint} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ opacity: b, transform: `scale(${0.9 + b * 0.1})` }}>{stat("3", "yang beli", true)}</div>
      </div>

      {gridOut < 1 && (
        <div style={{ ...center, top: 570, opacity: 1 - gridOut, transform: `translateY(${gridOut * 120}px)` }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 82px)", gap: 18 }}>
            {Array.from({ length: 47 }, (_, i) => {
              const e = interpolate(frame, [L6.at + i * 0.9, L6.at + i * 0.9 + 8], [0, 1], clamp);
              const buyer = BUYERS.includes(i);
              const on = buyer && dim > 0;
              return (
                <div
                  key={i}
                  style={{
                    width: 82,
                    height: 82,
                    borderRadius: 24,
                    background: on ? T.blue : T.sky,
                    boxShadow: on ? shadow(12) : "none",
                    opacity: e * (buyer ? 1 : 1 - dim * 0.6),
                    transform: `scale(${(0.8 + e * 0.2) * (on ? 1 + 0.1 * dim : 1)})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {on ? <Check size={40} bg="rgba(255,255,255,.25)" /> : <div style={{ width: 30, height: 8, borderRadius: 9, background: T.sky3 }} />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ ...center, top: 560 }}>
        <Chip at={L7.at + 2} bg={T.greenSoft} color={T.green} dot={T.green} size={34}>
          Produknya bagus
        </Chip>
      </div>
      {frame >= BEAT.signDrop && (
        <div style={{ ...center, top: 720, ...rise(sign, 80) }}>
          <StatusCard flip={0} width={640} />
        </div>
      )}
    </AbsoluteFill>
  );
};

// ============================================================
// 4. TURN — status dibalik, website menjawab, ada form pesanan
// ============================================================
const QA = [
  { q: "Harga berapa?", a: "Daftar harga" },
  { q: "Ongkir brp?", a: "Info ongkir" },
  { q: "Tokonya asli?", a: "Alamat & ulasan" },
];

export const SceneTurn: React.FC = () => {
  const frame = useCurrentFrame();
  const flip = useIn(BEAT.flip, 16, 70, 1);
  const away = interpolate(frame, [BEAT.siteIn - 8, BEAT.siteIn + 6], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const enter = useIn(0);
  const site = useIn(BEAT.siteIn);

  return (
    <AbsoluteFill>
      {away < 1 && (
        <>
          <div style={{ ...center, top: 420, opacity: enter * (1 - away), transform: `translateY(${(1 - enter) * 40 - away * 80}px)` }}>
            <StatusCard flip={flip} width={700} />
          </div>
          <div style={{ ...center, top: 790, opacity: 1 - away }}>
            <Chip at={wordAt("08", 3)} bg={T.blue} color={T.white} size={40}>
              + Website
            </Chip>
          </div>
        </>
      )}

      {frame >= BEAT.siteIn && (
        <div style={{ ...at(50, 250), opacity: site, transform: `translateY(${(1 - site) * 260}px)` }}>
          <Phone width={510} height={1060}>
            <Website />
          </Phone>
        </div>
      )}

      <div style={{ position: "absolute", left: 600, right: 40, top: 320, display: "flex", flexDirection: "column", gap: 26 }}>
        {QA.map((qa, i) => (
          <QACard key={i} at={BEAT.qa[i]} solve={BEAT.solved + i * 5} {...qa} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const QACard: React.FC<{ at: number; solve: number; q: string; a: string }> = ({ at: t, solve, q, a }) => {
  const frame = useCurrentFrame();
  const e = useIn(t);
  const s = useIn(solve);
  const strike = interpolate(frame, [solve - 4, solve + 4], [0, 100], clamp);
  if (frame < t) return null;
  return (
    <div style={{ opacity: e, transform: `translateX(${(1 - e) * 40}px)` }}>
      <Card radius={24} pad="20px 22px" depth={10}>
        <div style={{ position: "relative", display: "inline-block", fontFamily: B, fontWeight: 500, fontSize: 26, color: T.sub }}>
          “{q}”
          <div style={{ position: "absolute", left: 0, top: "52%", height: 2.5, width: `${strike}%`, background: T.faint }} />
        </div>
        {frame >= solve && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10, ...rise(s, 10) }}>
            <Check size={36} />
            <div style={{ fontFamily: H, fontWeight: 700, fontSize: 28, letterSpacing: -0.5, color: T.ink }}>{a}</div>
          </div>
        )}
      </Card>
    </div>
  );
};

const Website: React.FC = () => {
  const frame = useCurrentFrame();
  const s = BEAT.siteIn;
  const nav = useIn(s + 10);
  const hero = useIn(s + 16);
  const prods = [useIn(s + 22), useIn(s + 26), useIn(s + 30), useIn(s + 34)];
  const info = [useIn(BEAT.qa[0] + 4), useIn(BEAT.qa[1] + 4), useIn(BEAT.qa[2] + 4)];
  const cta = useIn(s + 40);
  const press = interpolate(frame, [BEAT.formTap, BEAT.formTap + 3, BEAT.formTap + 8], [1, 0.94, 1], clamp);
  const form = useIn(BEAT.formTap + 6);

  return (
    <div style={{ position: "absolute", inset: 0, padding: "62px 20px 20px", fontFamily: B, color: T.ink }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", opacity: nav }}>
        <div style={{ fontFamily: H, fontWeight: 700, fontSize: 28, letterSpacing: -0.8 }}>{SHOP}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 99, background: T.greenSoft, color: T.green, fontWeight: 600, fontSize: 15 }}>
          <span style={{ width: 8, height: 8, borderRadius: 9, background: T.green }} /> Buka 24 jam
        </div>
      </div>
      <div style={{ marginTop: 14, padding: "20px 20px", borderRadius: 22, background: `linear-gradient(135deg, ${T.blue} 0%, ${T.blueLight} 100%)`, color: T.white, ...rise(hero, 16) }}>
        <div style={{ fontFamily: H, fontWeight: 700, fontSize: 30, lineHeight: 1.12, letterSpacing: -0.8 }}>Kopi lokal, disangrai tiap minggu.</div>
        <div style={{ fontSize: 16, marginTop: 8, opacity: 0.85 }}>★ 4,9 · 312 ulasan · Bekasi</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
        {PRODUCTS.map((p, i) => (
          <div key={p.name} style={{ background: T.white, border, borderRadius: 18, padding: 9, opacity: prods[i], transform: `scale(${0.92 + prods[i] * 0.08})` }}>
            <div style={{ height: 100, borderRadius: 12, background: `linear-gradient(160deg, ${p.tone} 0%, #2A1A10 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 42, height: 62, borderRadius: "8px 8px 12px 12px", background: "#EFE6D8" }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, marginTop: 7 }}>{p.name}</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
              <span style={{ color: T.sub }}>{p.size}</span>
              <b style={{ color: T.blue }}>{rp(p.price)}</b>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 7 }}>
        {["Ongkir mulai Rp10rb · Jabodetabek", "Kirim hari ini sebelum 15.00", "Alamat, foto toko & ulasan"].map((t, i) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, opacity: info[i], transform: `translateX(${(1 - info[i]) * 20}px)`, padding: "8px 12px", borderRadius: 12, background: T.sky, fontWeight: 600, fontSize: 16 }}>
            <Check size={20} /> {t}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 20, right: 20, bottom: 24, opacity: cta, transform: `scale(${press})` }}>
        <div style={{ padding: "20px 0", borderRadius: 99, background: T.blue, color: T.white, boxShadow: `0 12px 28px rgba(47,107,255,${press < 1 ? 0.15 : 0.35})`, textAlign: "center", fontFamily: H, fontWeight: 700, fontSize: 23 }}>
          Isi form pesanan →
        </div>
      </div>

      {frame >= BEAT.formTap + 6 && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 560, transform: `translateY(${(1 - form) * 600}px)`, background: T.white, borderRadius: "30px 30px 0 0", boxShadow: "0 -20px 50px rgba(28,70,160,.18)", padding: "16px 24px 24px" }}>
          <div style={{ width: 60, height: 6, borderRadius: 9, background: T.line, margin: "0 auto 16px" }} />
          <div style={{ fontFamily: H, fontWeight: 700, fontSize: 28, letterSpacing: -0.6 }}>Form pesanan</div>
          {[
            ["Nama", "Rina"],
            ["Pesanan", "1× Signature"],
            ["Kirim ke", "Bekasi"],
          ].map(([k, v], i) => (
            <div key={k} style={{ marginTop: 12, opacity: interpolate(frame, [BEAT.formTap + 12 + i * 5, BEAT.formTap + 18 + i * 5], [0, 1], clamp) }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: T.sub }}>{k}</div>
              <div style={{ marginTop: 4, padding: "11px 14px", border, borderRadius: 12, fontWeight: 600, fontSize: 21, background: T.bg }}>{v}</div>
            </div>
          ))}
          <div style={{ marginTop: 18, padding: "17px 0", borderRadius: 99, background: T.blue, color: T.white, textAlign: "center", fontFamily: H, fontWeight: 700, fontSize: 22 }}>Kirim pesanan</div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// 5. NIGHT — 02.17 lagi, Budi tidur. Pagi: 6 pesanan tercatat rapi.
// ============================================================
const pad2 = (x: number) => String(x).padStart(2, "0");
const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));

const SleepingBudi: React.FC<{ frame: number }> = ({ frame }) => {
  const breathe = Math.sin(frame / 14) * 4;
  return (
    <div style={{ position: "relative", width: 680, height: 280 }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 110, borderRadius: 34, background: T.white, boxShadow: shadow(16) }} />
      <div style={{ position: "absolute", left: 36, bottom: 92, width: 190, height: 84, borderRadius: 40, background: T.sky }} />
      <div style={{ position: "absolute", left: 100, bottom: 104, width: 130, height: 130, borderRadius: 99, background: "#F1C7A1", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 52, background: T.ink }} />
        <svg width={130} height={130} style={{ position: "absolute", top: 0, left: 0 }}>
          <path d="M34 78 q11 9 22 0 M74 78 q11 9 22 0" stroke={T.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 210, right: 18, bottom: 74, height: 130 + breathe, borderRadius: "60px 36px 24px 24px", background: `linear-gradient(135deg, ${T.blue} 0%, ${T.blueLight} 100%)` }} />
    </div>
  );
};

export const SceneNight: React.FC = () => {
  const frame = useCurrentFrame();
  const clockIn = useIn(0);
  const bed = useIn(BEAT.bedIn);
  const shown = ORDER_AT.filter((t) => frame >= t).length;
  const mins =
    shown === 0
      ? toMin("02.17")
      : shown < ORDERS.length
        ? toMin(ORDERS[shown - 1].time)
        : Math.round(interpolate(frame, [ORDER_AT[ORDERS.length - 1], BEAT.sheetIn], [toMin(ORDERS[ORDERS.length - 1].time), 7 * 60], clamp));
  const time = `${pad2(Math.floor(mins / 60))}.${pad2(mins % 60)}`;
  const dawn = interpolate(frame, [BEAT.dawn, BEAT.dawn + 26], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const nightOut = interpolate(frame, [BEAT.sheetIn - 10, BEAT.sheetIn], [1, 0], clamp);
  const sheet = useIn(BEAT.sheetIn);

  return (
    <AbsoluteFill>
      {/* pagi */}
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${T.white} 0%, ${T.sky} 100%)`, opacity: dawn }} />
      <div style={{ position: "absolute", left: 760, top: 260 - dawn * 120, width: 260, height: 260, borderRadius: 999, background: T.sun, boxShadow: `0 0 120px 40px rgba(255,200,97,.45)`, opacity: dawn * 0.9 }} />

      {nightOut > 0 && (
        <AbsoluteFill style={{ opacity: nightOut }}>
          <div style={{ position: "absolute", left: 840, top: 210, width: 130, height: 130, borderRadius: 99, background: T.white, boxShadow: "0 0 80px 20px rgba(255,255,255,.6)", opacity: 1 - dawn }}>
            <div style={{ position: "absolute", left: 36, top: -12, width: 120, height: 120, borderRadius: 99, background: T.sky2 }} />
          </div>

          <div style={{ ...center, top: 250, ...rise(clockIn, 30) }}>
            <Clock time={time} size={170} blink={false} label="Malam berikutnya" />
          </div>

          {frame >= BEAT.bedIn && (
            <div style={{ ...center, top: 560, ...rise(bed, 60) }}>
              <SleepingBudi frame={frame} />
            </div>
          )}
          {[0, 1, 2].map((i) => {
            const t = (frame + i * 20) % 60;
            const vis = frame >= wordAt("10", 10) ? 1 : 0;
            return (
              <div key={i} style={{ position: "absolute", left: 300 + t * 1.3, top: 600 - t * 1.1, fontFamily: H, fontWeight: 700, fontSize: 36 + i * 10, color: T.blue, opacity: interpolate(t, [0, 12, 60], [0, 0.9, 0]) * vis }}>
                z
              </div>
            );
          })}

          <div style={{ ...center, top: 950 }}>
            <div style={{ width: 860, display: "flex", flexDirection: "column", gap: 14 }}>
              {ORDERS.map((o, i) => ({ o, i }))
                .filter(({ i }) => i < shown && i >= shown - 3)
                .reverse()
                .map(({ o, i }) => (
                  <OrderCard key={i} t={ORDER_AT[i]} {...o} />
                ))}
            </div>
          </div>
          {shown > 0 && (
            <div style={{ ...center, top: 872, zIndex: 30 }}>
              <Chip at={ORDER_AT[0]} bg={T.blue} color={T.white} size={28}>
                {shown} pesanan baru
              </Chip>
            </div>
          )}
        </AbsoluteFill>
      )}

      {frame >= BEAT.sheetIn && (
        <>
          <div style={{ ...center, top: 240, ...rise(sheet, 80) }}>
            <Card radius={30} depth={18} style={{ width: 940, overflow: "hidden" }}>
              <div style={{ padding: "24px 30px", borderBottom: border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: B, fontWeight: 600, fontSize: 22, color: T.sub }}>Pagi ini, 07.00</div>
                  <div style={{ fontFamily: H, fontWeight: 700, fontSize: 38, letterSpacing: -1, color: T.ink }}>Form pesanan semalam</div>
                </div>
                <div style={{ minWidth: 76, height: 76, borderRadius: 99, background: T.blue, color: T.white, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: H, fontWeight: 700, fontSize: 36 }}>6</div>
              </div>
              {ORDERS.map((o, i) => {
                const r = interpolate(frame, [BEAT.sheetIn + 10 + i * 4, BEAT.sheetIn + 18 + i * 4], [0, 1], clamp);
                return (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "56px 1fr 1.8fr 1.2fr 0.8fr", alignItems: "center", gap: 10, padding: "14px 30px", borderTop: i ? border : "none", fontFamily: B, fontWeight: 500, fontSize: 26, color: T.ink, opacity: r, transform: `translateX(${(1 - r) * 30}px)` }}>
                    <Avatar letter={o.who[0]} size={44} bg={[T.blue, T.blueLight, "#7C9CFF"][i % 3]} />
                    <b style={{ fontWeight: 700 }}>{o.who}</b>
                    <span>
                      {o.qty}× {o.item}
                    </span>
                    <span style={{ color: T.sub }}>{o.city}</span>
                    <span style={{ color: T.faint, fontVariantNumeric: "tabular-nums" }}>{o.time}</span>
                  </div>
                );
              })}
            </Card>
          </div>
          <div style={{ ...center, top: 1030, gap: 20 }}>
            <Chip at={wordAt("11", 7)} bg={T.blue} color={T.white} size={34}>
              Tinggal konfirmasi
            </Chip>
            <Chip at={wordAt("11", 9)} dot={T.green} size={34}>
              Tanpa begadang
            </Chip>
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};

const OrderCard: React.FC<{ t: number; who: string; item: string; qty: number; city: string; time: string }> = ({ t, who, item, qty, city, time }) => {
  const e = useIn(t, 18, 180, 0.7);
  return (
    <div style={{ maxHeight: e * 140, opacity: e, transform: `translateY(${(1 - e) * -30}px) scale(${0.96 + e * 0.04})` }}>
      <Card radius={26} pad="20px 24px" depth={12} style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Check size={60} bg={T.greenSoft} color={T.green} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: H, fontWeight: 700, fontSize: 28, letterSpacing: -0.5, color: T.ink }}>
            <span>Pesanan baru · {who}</span>
            <span style={{ fontFamily: B, fontWeight: 500, fontSize: 22, color: T.faint }}>{time}</span>
          </div>
          <div style={{ fontFamily: B, fontWeight: 500, fontSize: 24, color: T.sub }}>
            {qty}× {item} · {city}
          </div>
        </div>
      </Card>
    </div>
  );
};

// ============================================================
// 6. CTA
// ============================================================
export const SceneCta: React.FC = () => {
  const frame = useCurrentFrame();
  const card = useIn(0);
  const list = useIn(wordAt("12", 1));
  const dm = useIn(BEAT.dm);
  const logo = useIn(wordAt("13", 4));
  const glow = frame > BEAT.dm + 20 ? 0.3 + 0.15 * Math.sin((frame - BEAT.dm) / 9) : 0.3;
  const perks = ["Landing page", "Form pesanan", "Harga & ongkir jelas"];

  return (
    <AbsoluteFill>
      <div style={{ ...center, top: 210, ...rise(card, 40) }}>
        <StatusCard flip={1} width={640} />
      </div>

      <div style={{ ...center, top: 540, ...rise(list, 30) }}>
        <Card radius={28} pad="12px 34px" depth={12} style={{ width: 640 }}>
          {perks.map((p, i) => {
            const e = interpolate(frame, [wordAt("12", 2 + i * 2), wordAt("12", 2 + i * 2) + 8], [0, 1], clamp);
            return (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 0", borderTop: i ? border : "none", opacity: 0.3 + e * 0.7 }}>
                <Check size={40} bg={e > 0.5 ? T.green : T.line} />
                <span style={{ fontFamily: H, fontWeight: 600, fontSize: 32, letterSpacing: -0.6, color: T.ink }}>{p}</span>
              </div>
            );
          })}
        </Card>
      </div>

      {frame >= BEAT.dm && (
        <div style={{ ...center, top: 960, flexDirection: "column", alignItems: "center", gap: 18, ...rise(dm, 30) }}>
          <div style={{ padding: "30px 70px", borderRadius: 999, background: T.blue, color: T.white, fontFamily: H, fontWeight: 700, fontSize: 52, letterSpacing: -1.5, boxShadow: `0 20px 50px rgba(47,107,255,${glow})` }}>
            DM “WEBSITE”
          </div>
          <div style={{ fontFamily: B, fontWeight: 600, fontSize: 28, color: T.sub, opacity: interpolate(frame, [wordAt("13", 6), wordAt("13", 6) + 8], [0, 1], clamp) }}>
            Konsultasi gratis · tanpa komitmen
          </div>
        </div>
      )}

      {frame >= wordAt("13", 4) && (
        <div style={{ ...center, top: 1200, ...rise(logo, 20) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ borderRadius: 99, background: T.blue, display: "flex" }}>
              <Logo size={64} showText={false} delay={0} />
            </div>
            <div>
              <div style={{ fontFamily: H, fontWeight: 700, fontSize: 34, letterSpacing: -0.8, color: T.ink, lineHeight: 1.1 }}>Danova Digital</div>
              <div style={{ fontFamily: B, fontWeight: 500, fontSize: 24, color: T.sub }}>@danovadigitalcom</div>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/** Efek suara: [frame absolut, file, volume]. */
export const sfxCues = (): [number, string, number][] => {
  const s = SCENES;
  return [
    [0, "tick.wav", 0.4],
    [s.hook.from + BEAT.phoneIn, "whoosh.wav", 0.25],
    [s.chaos.from, "whoosh.wav", 0.25],
    ...MSG_AT.map((t): [number, string, number] => [s.chaos.from + t, "pop.wav", 0.15]),
    [s.chaos.from + BEAT.askHarga, "pop.wav", 0.25],
    [s.chaos.from + BEAT.askReady, "pop.wav", 0.25],
    [s.chaos.from + BEAT.askOngkir, "pop.wav", 0.25],
    [s.chaos.from + BEAT.kabur + 4, "whoosh.wav", 0.35],
    [s.insight.from + BEAT.buyers, "ding.wav", 0.3],
    [s.insight.from + BEAT.signDrop, "whoosh.wav", 0.25],
    [s.turn.from + BEAT.flip, "rise.wav", 0.4],
    [s.turn.from + BEAT.siteIn, "whoosh.wav", 0.25],
    [s.turn.from + BEAT.formTap, "pop.wav", 0.3],
    [s.night.from, "tick.wav", 0.3],
    ...ORDER_AT.map((t): [number, string, number] => [s.night.from + t, "ding.wav", 0.2]),
    [s.night.from + BEAT.dawn, "rise.wav", 0.3],
    [s.cta.from + BEAT.dm, "pop.wav", 0.35],
  ];
};

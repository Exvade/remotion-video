// ============================================================
// Video: "Kisah Si Budi — Studi Kasus Danova Digital"
// 100% PALET RESMI DANOVA DIGITAL:
// Danova Blue (#3366FF), Electric Blue (#00D4FF), Sunset Orange (#FF6B35),
// Golden Yellow (#FFD23F), Obsidian Dark (#070A10), Pure White (#FFFFFF)
// ============================================================

import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  interpolateColors,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  BrandStamp,
  C,
  EditorialHeader,
  Grain,
  Kicker,
  SANS,
  SERIF,
  SwingPriceTag,
  useEnter,
} from "../../editorialUi";

const audio = (f: string) => staticFile(`audio/cost-comparison/${f}`);

// Timeline 5 Scene (Total 1150 frames @ 30fps = ~38 detik)
const SCENES = {
  hook: { from: 0, dur: 180 },
  pain: { from: 180, dur: 270 },
  turning: { from: 450, dur: 270 },
  auto: { from: 720, dur: 250 },
  cta: { from: 970, dur: 180 },
} as const;

type SceneKey = keyof typeof SCENES;
const SCENE_ORDER: SceneKey[] = ["hook", "pain", "turning", "auto", "cta"];

const SCENE_BG: Record<SceneKey, string> = {
  hook: C.bgDark,
  pain: C.bgPain,
  turning: C.bgWebsite,
  auto: C.bgSuccess,
  cta: C.bgCta,
};

// ==================== SCENE 1: HOOK / INTRO BUDI ====================
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { dur } = SCENES.hook;

  const head = useEnter(4);
  const cardEnter = useEnter(14, 12, 0.7);
  const meterEnter = useEnter(34);
  const stampEnter = useEnter(55, 9, 0.5);

  const exit = interpolate(frame, [dur - 18, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sway = Math.sin(frame / 16) * 2.8;
  const shake = stampEnter > 0 && stampEnter < 0.96 ? Math.sin(frame * 2.5) * (1 - stampEnter) * 8 : 0;

  return (
    <AbsoluteFill
      style={{
        opacity: 1 - exit,
        transform: `translateY(${-exit * 60 + shake}px)`,
      }}
    >
      {/* Editorial Title */}
      <div style={{ position: "absolute", top: 195, left: 90 }}>
        <Kicker n="01" label="STUDI KASUS BISNIS" color={C.blue} enter={head} />
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 104,
            lineHeight: 1,
            color: C.white,
            marginTop: 22,
            opacity: head,
            transform: `translateY(${(1 - head) * 30}px)`,
          }}
        >
          Kenalin, <span style={{ fontStyle: "italic", color: C.electricBlue, fontWeight: 500 }}>si Budi.</span>
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 32,
            fontWeight: 600,
            color: C.textSecondary,
            marginTop: 18,
            opacity: head,
          }}
        >
          Punya produk bagus, tapi tiap malam...
        </div>
      </div>

      {/* Hanging Physical ID Badge in Danova Tech Dark */}
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 470,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: cardEnter,
          transform: `translateY(${(1 - cardEnter) * 80}px) rotate(${sway}deg)`,
          transformOrigin: "50% -40px",
        }}
      >
        {/* Metallic Lanyard Clip */}
        <div
          style={{
            width: 32,
            height: 48,
            borderRadius: 6,
            background: "linear-gradient(180deg, #5588FF 0%, #1144DD 100%)",
            border: `2px solid ${C.electricBlue}`,
            marginBottom: -8,
            zIndex: 10,
          }}
        />

        {/* Physical Badge Body */}
        <div
          style={{
            width: "100%",
            maxWidth: 780,
            borderRadius: 36,
            background: C.cardDark,
            border: `2px solid ${C.cardBorder}`,
            boxShadow: `0 35px 70px rgba(0,0,0,.6), 0 0 40px rgba(51,102,255,.15)`,
            padding: "48px 52px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Card Top Strip in Danova Blue */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 12,
              background: `linear-gradient(90deg, ${C.blue} 0%, ${C.electricBlue} 100%)`,
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div
              style={{
                width: 130,
                height: 130,
                borderRadius: 28,
                background: C.cardElevated,
                border: `3px solid ${C.blue}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: 64,
                fontWeight: 700,
                color: C.electricBlue,
              }}
            >
              B
            </div>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 20, letterSpacing: 4, fontWeight: 800, color: C.electricBlue }}>
                OWNER & FOUNDER
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 52, fontWeight: 700, color: C.white, marginTop: 4 }}>
                Budi Pratama
              </div>
              <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 600, color: C.orange, marginTop: 4 }}>
                Toko Kopi & Fashion Lokal
              </div>
            </div>
          </div>

          <div style={{ width: "100%", height: 2, background: C.line, margin: "32px 0" }} />

          {/* Metrics inside card */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 20, letterSpacing: 3, fontWeight: 800, color: C.textSecondary }}>
                METODE JUALAN
              </div>
              <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 800, color: C.white, marginTop: 6 }}>
                100% Chat Manual
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: SANS, fontSize: 20, letterSpacing: 3, fontWeight: 800, color: C.textSecondary }}>
                JAM TIDUR
              </div>
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 38, fontWeight: 700, color: C.orange, marginTop: 4 }}>
                &lt; 3 Jam / Hari
              </div>
            </div>
          </div>

          {/* Rubber Stamp Slammed Down */}
          {stampEnter > 0 && (
            <div
              style={{
                position: "absolute",
                right: 40,
                bottom: 25,
                transform: `rotate(-14deg) scale(${0.8 + stampEnter * 0.2})`,
                opacity: stampEnter,
              }}
            >
              <div
                style={{
                  border: `4px solid ${C.orange}`,
                  borderRadius: 14,
                  padding: "10px 24px",
                  fontFamily: SANS,
                  fontWeight: 900,
                  fontSize: 26,
                  letterSpacing: 4,
                  color: C.orange,
                  textTransform: "uppercase",
                  background: "rgba(255,107,53,.15)",
                }}
              >
                STATUS: KEWALAHAN
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stress Meter Indicator */}
      <div
        style={{
          position: "absolute",
          top: 1040,
          left: 90,
          right: 90,
          background: C.cardDark,
          borderRadius: 28,
          border: `2px solid ${C.cardBorder}`,
          padding: "36px 44px",
          opacity: meterEnter,
          transform: `translateY(${(1 - meterEnter) * 30}px)`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
          <span style={{ fontFamily: SANS, fontSize: 26, fontWeight: 800, color: C.white }}>
            Waktu Tersita Balas Chat Manual
          </span>
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 44, fontWeight: 700, color: C.orange }}>
            14 Jam / Hari
          </span>
        </div>
        <div style={{ width: "100%", height: 16, background: C.cardElevated, borderRadius: 8, overflow: "hidden" }}>
          <div style={{ width: "92%", height: "100%", background: C.orange, borderRadius: 8 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==================== SCENE 2: THE PAIN (DM NUMPUK) ====================
const ScenePain: React.FC = () => {
  const frame = useCurrentFrame();
  const { dur } = SCENES.pain;

  const head = useEnter(0);
  const phoneEnter = useEnter(6, 13);
  const b1 = useEnter(18, 12);
  const b2 = useEnter(34, 12);
  const b3 = useEnter(50, 12);
  const stamp = useEnter(75, 9, 0.5);

  const exit = interpolate(frame, [dur - 20, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const float = Math.sin(frame / 18) * 8;
  const shake = stamp > 0 && stamp < 0.96 ? Math.sin(frame * 2.6) * (1 - stamp) * 9 : 0;

  return (
    <AbsoluteFill
      style={{
        opacity: 1 - exit,
        transform: `translateX(${-exit * 200 + shake}px)`,
      }}
    >
      <div style={{ position: "absolute", top: 195, left: 90 }}>
        <Kicker n="02" label="MASALAH OPERASIONAL" color={C.orange} enter={head} />
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 98,
            lineHeight: 1.05,
            color: C.white,
            marginTop: 20,
            opacity: head,
            transform: `translateY(${(1 - head) * 30}px)`,
          }}
        >
          Pukul 02.00, <br />
          <span style={{ fontStyle: "italic", color: C.orange, fontWeight: 500 }}>masih balas chat.</span>
        </div>
      </div>

      {/* Realistic Tilted Smartphone in Space Dark */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 480,
          width: 440,
          height: 870,
          borderRadius: 64,
          background: "#000000",
          border: `3px solid rgba(255,255,255,0.15)`,
          padding: 16,
          transform: `translateY(${(1 - phoneEnter) * 850 + float}px) rotate(${-4 * phoneEnter}deg)`,
          boxShadow: `0 40px 70px rgba(0,0,0,.8), 0 0 40px rgba(255,107,53,.15)`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 50,
            overflow: "hidden",
            background: `linear-gradient(180deg, #0F172A 0%, #090D16 100%)`,
            position: "relative",
            padding: "24px 20px",
          }}
        >
          {/* Dynamic Island Notch */}
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 140,
              width: 120,
              height: 28,
              borderRadius: 20,
              background: "#000000",
            }}
          />

          {/* Chat Header in Phone */}
          <div style={{ marginTop: 48, borderBottom: `2px solid ${C.line}`, paddingBottom: 14 }}>
            <div style={{ fontFamily: SANS, fontSize: 16, letterSpacing: 3, fontWeight: 800, color: C.electricBlue }}>
              KOTAK MASUK
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 700, color: C.white, marginTop: 4 }}>
              WhatsApp Business
            </div>
          </div>

          {/* Bubbles in phone */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 24 }}>
            <div
              style={{
                background: C.cardElevated,
                border: "1.5px solid rgba(255,255,255,.1)",
                borderRadius: "18px 18px 18px 4px",
                padding: "16px 18px",
                boxShadow: "0 4px 12px rgba(0,0,0,.3)",
                opacity: b1,
                transform: `translateX(${(1 - b1) * -20}px)`,
              }}
            >
              <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: C.orange }}>Calon Pembeli A</div>
              <div style={{ fontFamily: SANS, fontSize: 19, fontWeight: 500, color: C.white, marginTop: 4 }}>
                "Harga berapa kak? Ada katalognya?"
              </div>
            </div>

            <div
              style={{
                background: C.cardElevated,
                border: "1.5px solid rgba(255,255,255,.1)",
                borderRadius: "18px 18px 18px 4px",
                padding: "16px 18px",
                boxShadow: "0 4px 12px rgba(0,0,0,.3)",
                opacity: b2,
                transform: `translateX(${(1 - b2) * -20}px)`,
              }}
            >
              <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: C.orange }}>Calon Pembeli B</div>
              <div style={{ fontFamily: SANS, fontSize: 19, fontWeight: 500, color: C.white, marginTop: 4 }}>
                "Tokonya asli gak? Takut kena tipu nih..."
              </div>
            </div>

            <div
              style={{
                background: C.cardElevated,
                border: "1.5px solid rgba(255,255,255,.1)",
                borderRadius: "18px 18px 18px 4px",
                padding: "16px 18px",
                boxShadow: "0 4px 12px rgba(0,0,0,.3)",
                opacity: b3,
                transform: `translateX(${(1 - b3) * -20}px)`,
              }}
            >
              <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: C.orange }}>Calon Pembeli C</div>
              <div style={{ fontFamily: SANS, fontSize: 19, fontWeight: 500, color: C.white, marginTop: 4 }}>
                "Balesnya lama amat, batal beli deh."
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Problem Cards on the Right */}
      <div
        style={{
          position: "absolute",
          left: 560,
          right: 90,
          top: 520,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            background: C.cardDark,
            borderRadius: 24,
            border: `2px solid ${C.cardBorderOrange}`,
            padding: "28px 32px",
            boxShadow: `0 15px 35px rgba(0,0,0,.4)`,
            opacity: b1,
            transform: `translateY(${(1 - b1) * 30}px)`,
          }}
        >
          <div style={{ fontFamily: SANS, fontSize: 18, letterSpacing: 3, fontWeight: 800, color: C.orange }}>
            MASALAH 01
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: C.white, marginTop: 6 }}>
            Tanya Harga Doang
          </div>
          <div style={{ fontFamily: SANS, fontSize: 20, color: C.textSecondary, marginTop: 6 }}>
            Banyak chat masuk tapi konversi nol.
          </div>
        </div>

        <div
          style={{
            background: C.cardDark,
            borderRadius: 24,
            border: `2px solid ${C.cardBorderOrange}`,
            padding: "28px 32px",
            boxShadow: `0 15px 35px rgba(0,0,0,.4)`,
            opacity: b2,
            transform: `translateY(${(1 - b2) * 30}px)`,
          }}
        >
          <div style={{ fontFamily: SANS, fontSize: 18, letterSpacing: 3, fontWeight: 800, color: C.orange }}>
            MASALAH 02
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: C.white, marginTop: 6 }}>
            Tingkat Ragu Tinggi
          </div>
          <div style={{ fontFamily: SANS, fontSize: 20, color: C.textSecondary, marginTop: 6 }}>
            Calon buyer ragu karena tidak ada link resmi.
          </div>
        </div>

        <div
          style={{
            background: C.cardDark,
            borderRadius: 24,
            border: `2px solid ${C.cardBorderOrange}`,
            padding: "28px 32px",
            boxShadow: `0 15px 35px rgba(0,0,0,.4)`,
            opacity: b3,
            transform: `translateY(${(1 - b3) * 30}px)`,
          }}
        >
          <div style={{ fontFamily: SANS, fontSize: 18, letterSpacing: 3, fontWeight: 800, color: C.orange }}>
            MASALAH 03
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: C.white, marginTop: 6 }}>
            Order Terlewat
          </div>
          <div style={{ fontFamily: SANS, fontSize: 20, color: C.textSecondary, marginTop: 6 }}>
            Saat pemilik tidur, omset melayang.
          </div>
        </div>
      </div>

      {/* Slammed Brand Stamp */}
      {stamp > 0 && (
        <div
          style={{
            position: "absolute",
            left: 360,
            top: 1080,
            transform: `rotate(-12deg) scale(${0.7 + stamp * 0.3})`,
            opacity: stamp,
          }}
        >
          <BrandStamp text="POTENSI OMSET HILANG" size={170} color={C.orange} textColor={C.white} />
        </div>
      )}
    </AbsoluteFill>
  );
};

// ==================== SCENE 3: THE TURNING POINT (WEBSITE) ====================
const SceneTurningPoint: React.FC = () => {
  const frame = useCurrentFrame();
  const { dur } = SCENES.turning;

  const head = useEnter(0);
  const browser = useEnter(8, 14);
  const tag = useEnter(28, 8, 0.6);
  const f1 = useEnter(40);
  const f2 = useEnter(55);

  const exit = interpolate(frame, [dur - 20, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const float = Math.sin(frame / 20) * 6;

  return (
    <AbsoluteFill
      style={{
        opacity: 1 - exit,
        transform: `translateY(${-exit * 90}px)`,
      }}
    >
      <div style={{ position: "absolute", top: 195, left: 90 }}>
        <Kicker n="03" label="SOLUSI SISTEM" color={C.electricBlue} enter={head} />
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 98,
            lineHeight: 1.05,
            color: C.white,
            marginTop: 20,
            opacity: head,
            transform: `translateY(${(1 - head) * 30}px)`,
          }}
        >
          Bikin website, <br />
          <span style={{ fontStyle: "italic", color: C.electricBlue, fontWeight: 500 }}>semua berubah.</span>
        </div>
      </div>

      {/* High-Fidelity Browser Mockup in Danova Blue */}
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 480,
          borderRadius: 36,
          background: C.cardDark,
          border: `2px solid ${C.cardBorder}`,
          boxShadow: "0 35px 70px rgba(0,0,0,.6), 0 0 50px rgba(0,212,255,.15)",
          overflow: "hidden",
          opacity: browser,
          transform: `translateY(${(1 - browser) * 80 + float}px)`,
        }}
      >
        {/* Browser Top Controls */}
        <div
          style={{
            background: "#0B111D",
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            borderBottom: `2px solid ${C.line}`,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FF5F56" }} />
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#27C93F" }} />
          </div>
          <div
            style={{
              flex: 1,
              marginLeft: 18,
              background: C.cardElevated,
              borderRadius: 14,
              padding: "10px 24px",
              fontFamily: SANS,
              fontSize: 20,
              fontWeight: 600,
              color: C.electricBlue,
              border: `1px solid ${C.cardBorder}`,
            }}
          >
            tokobudi.danovadigital.com
          </div>
        </div>

        {/* Storefront View */}
        <div style={{ padding: "38px 44px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 18, letterSpacing: 3, fontWeight: 800, color: C.electricBlue }}>
                OFFICIAL STOREFRONT
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 44, fontWeight: 700, color: C.white, marginTop: 4 }}>
                Budi Coffee & Goods
              </div>
            </div>
            <div
              style={{
                background: C.blue,
                color: C.white,
                padding: "12px 28px",
                borderRadius: 999,
                fontFamily: SANS,
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 2,
                boxShadow: `0 8px 24px ${C.blue}55`,
              }}
            >
              BUKA 24 JAM
            </div>
          </div>

          <div style={{ width: "100%", height: 2, background: C.line, margin: "26px 0" }} />

          {/* Product Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div
              style={{
                background: C.cardElevated,
                borderRadius: 24,
                padding: "24px 28px",
                border: `1.5px solid ${C.cardBorder}`,
              }}
            >
              <div style={{ fontFamily: SANS, fontSize: 16, letterSpacing: 3, fontWeight: 800, color: C.textSecondary }}>
                PRODUK 01
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: C.white, marginTop: 6 }}>
                Signature Blend 250g
              </div>
              <div style={{ fontFamily: SANS, fontSize: 26, fontWeight: 800, color: C.yellow, marginTop: 8 }}>
                Rp 125.000
              </div>
              <div style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, color: C.success, marginTop: 6 }}>
                ✓ Checkout Otomatis
              </div>
            </div>

            <div
              style={{
                background: C.cardElevated,
                borderRadius: 24,
                padding: "24px 28px",
                border: `1.5px solid ${C.cardBorder}`,
              }}
            >
              <div style={{ fontFamily: SANS, fontSize: 16, letterSpacing: 3, fontWeight: 800, color: C.textSecondary }}>
                PRODUK 02
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: C.white, marginTop: 6 }}>
                Artisan Ceramic Mug
              </div>
              <div style={{ fontFamily: SANS, fontSize: 26, fontWeight: 800, color: C.yellow, marginTop: 8 }}>
                Rp 85.000
              </div>
              <div style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, color: C.success, marginTop: 6 }}>
                ✓ Checkout Otomatis
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Physical Swinging Price Tag in Sunset Orange */}
      <SwingPriceTag price="Otomatis" label="SISTEM CHECKOUT" enter={tag} top={1020} left={120} />

      {/* Feature Highlights below */}
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 1240,
          display: "flex",
          gap: 20,
        }}
      >
        <div
          style={{
            flex: 1,
            background: C.cardDark,
            borderRadius: 24,
            border: `2px solid ${C.cardBorder}`,
            padding: "28px 32px",
            boxShadow: "0 10px 30px rgba(0,0,0,.4)",
            opacity: f1,
            transform: `translateY(${(1 - f1) * 20}px)`,
          }}
        >
          <div style={{ fontFamily: SANS, fontSize: 18, letterSpacing: 3, fontWeight: 800, color: C.electricBlue }}>
            KEUNTUNGAN 01
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, color: C.white, marginTop: 6 }}>
            Katalog 24 Jam
          </div>
          <div style={{ fontFamily: SANS, fontSize: 18, color: C.textSecondary, marginTop: 6 }}>
            Calon pembeli baca spesifikasi sendiri tanpa perlu tanya berulang.
          </div>
        </div>

        <div
          style={{
            flex: 1,
            background: C.cardDark,
            borderRadius: 24,
            border: `2px solid ${C.cardBorderGreen}`,
            padding: "28px 32px",
            boxShadow: "0 10px 30px rgba(0,0,0,.4)",
            opacity: f2,
            transform: `translateY(${(1 - f2) * 20}px)`,
          }}
        >
          <div style={{ fontFamily: SANS, fontSize: 18, letterSpacing: 3, fontWeight: 800, color: C.success }}>
            KEUNTUNGAN 02
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, color: C.white, marginTop: 6 }}>
            Bayar Instan
          </div>
          <div style={{ fontFamily: SANS, fontSize: 18, color: C.textSecondary, marginTop: 6 }}>
            Ongkir & QRIS terhitung otomatis masuk langsung ke rekening.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==================== SCENE 4: TRANSFORMASI (RECEIPT UNROLL) ====================
const SceneAuto: React.FC = () => {
  const frame = useCurrentFrame();
  const { dur } = SCENES.auto;

  const head = useEnter(0);
  const slot = useEnter(6, 14);
  const r0 = useEnter(14, 16);
  const r1 = useEnter(30, 16);
  const r2 = useEnter(46, 16);
  const rTotal = useEnter(62, 16);
  const stamp = useEnter(78, 9, 0.5);

  const exit = interpolate(frame, [dur - 20, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const paperH = 140 * r0 + 130 * r1 + 130 * r2 + 200 * rTotal;
  const shake = stamp > 0 && stamp < 0.96 ? Math.sin(frame * 2.5) * (1 - stamp) * 9 : 0;

  return (
    <AbsoluteFill
      style={{
        opacity: 1 - exit,
        transform: `translateY(${-exit * 90 + shake}px)`,
      }}
    >
      <div style={{ position: "absolute", top: 195, left: 90 }}>
        <Kicker n="04" label="HASIL OTOMATISASI" color={C.success} enter={head} />
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 98,
            lineHeight: 1.05,
            color: C.white,
            marginTop: 20,
            opacity: head,
            transform: `translateY(${(1 - head) * 30}px)`,
          }}
        >
          Budi tidur nyenyak, <br />
          <span style={{ fontStyle: "italic", color: C.yellow, fontWeight: 500 }}>omset jalan terus.</span>
        </div>
      </div>

      {/* Printer Slot Hardware in Obsidian Metal */}
      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          top: 480,
          height: 24,
          background: "#000000",
          border: `1px solid rgba(255,255,255,.2)`,
          borderRadius: 12,
          boxShadow: "0 14px 28px rgba(0,0,0,.5)",
          zIndex: 10,
          opacity: slot,
        }}
      />

      {/* High-Contrast Receipt in Crisp Card */}
      <div
        style={{
          position: "absolute",
          left: 130,
          right: 130,
          top: 492,
          height: paperH,
          maxHeight: 700,
          background: "#FFFFFF",
          boxShadow: "0 30px 60px rgba(0,0,0,.5)",
          padding: "36px 48px",
          overflow: "hidden",
          zIndex: 5,
        }}
      >
        {/* Receipt Header */}
        <div style={{ textAlign: "center", borderBottom: `2px dashed rgba(0,0,0,.15)`, paddingBottom: 20 }}>
          <div style={{ fontFamily: SANS, fontSize: 18, letterSpacing: 4, fontWeight: 800, color: "#64748B" }}>
            STRUK TRANSAKSI WEBSITE
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 700, color: "#0F172A", marginTop: 4 }}>
            Toko Resmi Budi Pratama
          </div>
          <div style={{ fontFamily: SANS, fontSize: 18, color: "#64748B", marginTop: 4 }}>
            Terverifikasi Otomatis • 02:45 WIB
          </div>
        </div>

        {/* Transaction Items */}
        <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: r1,
            }}
          >
            <div>
              <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 700, color: "#0F172A" }}>
                TX-9041 · 2x Signature Blend
              </div>
              <div style={{ fontFamily: SANS, fontSize: 18, color: "#16A34A", fontWeight: 600 }}>
                Pembeli: Rian P. (Lunas via QRIS)
              </div>
            </div>
            <div style={{ fontFamily: SANS, fontSize: 28, fontWeight: 800, color: "#0F172A" }}>
              Rp 250.000
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: r2,
            }}
          >
            <div>
              <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 700, color: "#0F172A" }}>
                TX-9042 · 1x Artisan Mug
              </div>
              <div style={{ fontFamily: SANS, fontSize: 18, color: "#16A34A", fontWeight: 600 }}>
                Pembeli: Siti N. (Lunas via Virtual Account)
              </div>
            </div>
            <div style={{ fontFamily: SANS, fontSize: 28, fontWeight: 800, color: "#0F172A" }}>
              Rp 85.000
            </div>
          </div>
        </div>

        {/* Total Summary */}
        <div
          style={{
            marginTop: 26,
            borderTop: `2px dashed rgba(0,0,0,.15)`,
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            opacity: rTotal,
          }}
        >
          <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 800, color: "#0F172A" }}>
            TOTAL TRANSAKSI MALAM INI
          </div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 48, fontWeight: 800, color: "#2563EB" }}>
            Rp 4.850.000
          </div>
        </div>

        {/* Bottom Serrated Cutline (Zigzag) */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            backgroundImage: `radial-gradient(circle at 10px 0, transparent 8px, #FFFFFF 8px)`,
            backgroundSize: "20px 20px",
            backgroundRepeat: "repeat-x",
          }}
        />

        {/* Stamp on Receipt */}
        {stamp > 0 && (
          <div
            style={{
              position: "absolute",
              right: 60,
              bottom: 40,
              transform: `rotate(-10deg) scale(${0.8 + stamp * 0.2})`,
              opacity: stamp,
            }}
          >
            <BrandStamp text="LUNAS OTOMATIS" size={160} color="#16A34A" textColor="#16A34A" />
          </div>
        )}
      </div>

      {/* Comparison takeaway */}
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 1260,
          background: C.cardDark,
          borderRadius: 28,
          border: `2px solid ${C.cardBorderGreen}`,
          padding: "36px 44px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontFamily: SANS, fontSize: 20, letterSpacing: 3, fontWeight: 800, color: C.textSecondary }}>
            EFISIENSI WAKTU
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 700, color: C.success, marginTop: 4 }}>
            100% Berjalan Otomatis
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: SANS, fontSize: 20, letterSpacing: 3, fontWeight: 800, color: C.textSecondary }}>
            KEPUASAN BUYER
          </div>
          <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 800, color: C.white, marginTop: 4 }}>
            Instan & Terpercaya
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==================== SCENE 5: CTA (DANOVA LUXURY TECH BLUE) ====================
const SceneCta: React.FC = () => {
  const frame = useCurrentFrame();
  const ornament = useEnter(4, 16);
  const brand = useEnter(10, 13);
  const line = useEnter(22);
  const btn = useEnter(34, 9, 0.6);

  const tap = Math.sin(frame / 14) * 0.03;

  return (
    <AbsoluteFill style={{ color: C.white, alignItems: "center", textAlign: "center" }}>
      {/* Luxury Electric Blue Ornament */}
      <svg
        width="520"
        height="80"
        viewBox="0 0 520 80"
        style={{ position: "absolute", top: 360, opacity: ornament, transform: `scaleX(${ornament})` }}
      >
        <path d="M10 40 H210 M310 40 H510" stroke={C.electricBlue} strokeWidth="2" />
        <path d="M260 14 C 240 34, 240 46, 260 66 C 280 46, 280 34, 260 14 Z" fill="none" stroke={C.electricBlue} strokeWidth="2.5" />
        <circle cx="222" cy="40" r="5" fill={C.electricBlue} />
        <circle cx="298" cy="40" r="5" fill={C.electricBlue} />
      </svg>

      {/* Brand Heading */}
      <div
        style={{
          position: "absolute",
          top: 470,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 120,
          lineHeight: 1,
          opacity: brand,
          transform: `translateY(${(1 - brand) * 50}px)`,
          color: C.white,
        }}
      >
        Danova Digital
      </div>

      <div
        style={{
          position: "absolute",
          top: 620,
          fontFamily: SANS,
          fontSize: 24,
          letterSpacing: 6,
          fontWeight: 800,
          color: C.electricBlue,
          textTransform: "uppercase",
        }}
      >
        JASA WEBSITE KHUSUS BISNIS & UMKM
      </div>

      {/* Narrative Proposition */}
      <div
        style={{
          position: "absolute",
          top: 720,
          width: 820,
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: 42,
          lineHeight: 1.4,
          opacity: line * 0.9,
          transform: `translateY(${(1 - line) * 30}px)`,
          color: C.white,
        }}
      >
        Jangan nunggu lelah kayak Budi. <br />
        <span style={{ fontFamily: SERIF, fontStyle: "italic", color: C.yellow }}>
          Saatnya bisnis Anda berjalan otomatis 24/7.
        </span>
      </div>

      {/* Big Action Button in Danova Blue */}
      <div
        style={{
          position: "absolute",
          top: 1040,
          width: 740,
          opacity: btn,
          transform: `scale(${1 + tap})`,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${C.blue} 0%, #1D4ED8 100%)`,
            border: `2px solid ${C.electricBlue}`,
            color: C.white,
            borderRadius: 999,
            padding: "36px 40px",
            boxShadow: `0 30px 60px rgba(0,0,0,.6), 0 0 40px rgba(51,102,255,.4)`,
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 34,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Konsultasi Gratis via DM
        </div>

        <div
          style={{
            marginTop: 28,
            fontFamily: SANS,
            fontSize: 26,
            letterSpacing: 4,
            fontWeight: 700,
            color: C.electricBlue,
            opacity: 0.9,
          }}
        >
          @DANOVADIGITALCOM
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==================== MAIN COMPOSITION ====================
export const StoryBudiWebsiteV1: React.FC = () => {
  const frame = useCurrentFrame();

  const stops = SCENE_ORDER.flatMap((k, i) =>
    i === 0 ? [0] : [SCENES[k].from - 10, SCENES[k].from + 10]
  );
  const colors = SCENE_ORDER.flatMap((k, i) =>
    i === 0 ? [SCENE_BG[k]] : [SCENE_BG[SCENE_ORDER[i - 1]], SCENE_BG[k]]
  );
  const bg = interpolateColors(frame, stops, colors);

  const scenesArray = SCENE_ORDER.map((k) => SCENES[k]);

  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      {/* Soft Ambient Light Blobs in Danova Blue & Electric Blue */}
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: 999,
          left: -300 + Math.sin(frame / 60) * 60,
          top: -420,
          background: `radial-gradient(circle, rgba(51,102,255,.18) 0%, rgba(51,102,255,0) 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: 999,
          right: -360,
          bottom: -200 + Math.cos(frame / 70) * 60,
          background: `radial-gradient(circle, rgba(0,212,255,.14) 0%, rgba(0,212,255,0) 65%)`,
        }}
      />

      {/* Scene Sequences */}
      <Sequence durationInFrames={SCENES.hook.dur} layout="none">
        <SceneHook />
      </Sequence>
      <Sequence from={SCENES.pain.from} durationInFrames={SCENES.pain.dur} layout="none">
        <ScenePain />
      </Sequence>
      <Sequence from={SCENES.turning.from} durationInFrames={SCENES.turning.dur} layout="none">
        <SceneTurningPoint />
      </Sequence>
      <Sequence from={SCENES.auto.from} durationInFrames={SCENES.auto.dur} layout="none">
        <SceneAuto />
      </Sequence>
      <Sequence from={SCENES.cta.from} durationInFrames={SCENES.cta.dur} layout="none">
        <SceneCta />
      </Sequence>

      {/* Editorial Frame Border in Danova Electric Blue */}
      <div
        style={{
          position: "absolute",
          inset: 36,
          borderRadius: 34,
          border: `2px solid rgba(51, 102, 255, 0.35)`,
          pointerEvents: "none",
          zIndex: 80,
        }}
      />

      {/* Header & Segmented Bars */}
      <EditorialHeader frame={frame} scenes={scenesArray} />

      {/* Film Grain Texture */}
      <Grain opacity={0.07} />

      {/* Background Music & Sound Effects */}
      <Audio src={audio("music.mp3")} volume={0.2} name="Musik Latar" />
      <Sequence from={54} durationInFrames={40} layout="none">
        <Audio src={audio("ding.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={188} durationInFrames={40} layout="none">
        <Audio src={audio("whoosh.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={254} durationInFrames={40} layout="none">
        <Audio src={audio("ding.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={458} durationInFrames={40} layout="none">
        <Audio src={audio("whoosh.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={478} durationInFrames={40} layout="none">
        <Audio src={audio("pop.wav")} volume={0.7} />
      </Sequence>
      <Sequence from={740} durationInFrames={50} layout="none">
        <Audio src={audio("cash.wav")} volume={0.7} />
      </Sequence>
      <Sequence from={798} durationInFrames={40} layout="none">
        <Audio src={audio("ding.wav")} volume={0.7} />
      </Sequence>
    </AbsoluteFill>
  );
};

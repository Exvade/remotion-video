// ============================================================
// Video: "Toko Budi Tutup Jam 02.17" — studi kasus Danova Digital
// Reels 1080x1920 @30fps, ~50 detik, dengan voiceover.
//
// Fokus jasa: landing page + form pesanan (bukan toko online / payment).
// Alur: Hook (02.17, Budi belum tidur) -> Chaos (47 chat, isinya sama,
// yang telat dibales kabur) -> Insight (47 chat -> 3 beli; tokonya
// "tutup") -> Turn (papan dibalik BUKA 24 JAM, landing page menjawab
// pertanyaan tadi, ada form pesanan) -> Night (02.17 lagi, Budi tidur,
// pagi 6 form pesanan tercatat rapi) -> CTA.
// Voiceover: scripts/story-budi-vo.py -> public/audio/story-budi/
// Versi lama: ./_legacy/StoryBudiWebsite.v1.tsx
// ============================================================

import React from "react";
import { AbsoluteFill, Audio, interpolate, interpolateColors, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Grain } from "../editorialUi";
import { LogoWatermark } from "../components/Logo";
import { INCOMING, ORDERS, SCENES, SCENE_ORDER, SceneKey, T, TOTAL_FRAMES, VO, clamp } from "./story-budi/theme";
import {
  NIGHT_ORDER_GAP,
  NIGHT_ORDER_START,
  DAWN_AT,
  SceneChaos,
  SceneCta,
  SceneHook,
  SceneInsight,
  SceneNight,
  SceneTurn,
} from "./story-budi/scenes";

export const STORY_BUDI_FRAMES = TOTAL_FRAMES;

const sfx = (f: string) => staticFile(`audio/cost-comparison/${f}`);
const voFile = (id: string) => staticFile(`audio/story-budi/vo-${id}.mp3`);

// rentang VO absolut, untuk menurunkan musik saat narasi
const VO_ABS = VO.map((v) => ({ ...v, from: SCENES[v.scene].from + v.at }));
const voiceLevel = (f: number) =>
  Math.max(0, ...VO_ABS.map((v) => interpolate(f, [v.from - 6, v.from, v.from + v.frames, v.from + v.frames + 10], [0, 1, 1, 0], clamp)));

const BG: Record<SceneKey, string> = {
  hook: T.night,
  chaos: T.nightWarm,
  insight: T.ink,
  turn: T.deepBlue,
  night: T.night,
  cta: T.primaryDark,
};

const ACCENT: Record<SceneKey, string> = {
  hook: "rgba(51,102,255,.22)",
  chaos: "rgba(255,107,53,.18)",
  insight: "rgba(255,107,53,.10)",
  turn: "rgba(0,212,255,.22)",
  night: "rgba(51,102,255,.16)",
  cta: "rgba(0,212,255,.35)",
};

const Progress: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{ position: "absolute", top: 64, left: 60, right: 60, display: "flex", gap: 10, zIndex: 50 }}>
    {SCENE_ORDER.map((k) => {
      const s = SCENES[k];
      const p = Math.max(0, Math.min(1, (frame - s.from) / s.dur));
      return (
        <div key={k} style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,.18)", overflow: "hidden" }}>
          <div style={{ width: `${p * 100}%`, height: "100%", background: T.white }} />
        </div>
      );
    })}
  </div>
);

const At: React.FC<{ f: number; src: string; v?: number }> = ({ f, src, v = 0.35 }) => (
  <Sequence from={f} durationInFrames={60} layout="none">
    <Audio src={sfx(src)} volume={v} />
  </Sequence>
);

export const StoryBudiWebsite: React.FC = () => {
  const frame = useCurrentFrame();

  const stops: number[] = [];
  const bgs: string[] = [];
  const acc: string[] = [];
  SCENE_ORDER.forEach((k, i) => {
    if (i === 0) {
      stops.push(0);
      bgs.push(BG[k]);
      acc.push(ACCENT[k]);
      return;
    }
    const prev = SCENE_ORDER[i - 1];
    stops.push(SCENES[k].from - 8, SCENES[k].from + 8);
    bgs.push(BG[prev], BG[k]);
    acc.push(ACCENT[prev], ACCENT[k]);
  });
  const bg = interpolateColors(frame, stops, bgs);
  const glow = interpolateColors(frame, stops, acc);
  const drift = Math.sin(frame / 50) * 40;
  const musicVol = (f: number) =>
    interpolate(f, [0, 20, TOTAL_FRAMES - 30, TOTAL_FRAMES], [0, 1, 1, 0], clamp) * (0.2 - 0.13 * voiceLevel(f));
  const s = SCENES;

  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${50 + drift / 20}% 40%, ${glow} 0%, rgba(0,0,0,0) 60%)` }} />
      {frame >= s.cta.from - 10 && (
        <AbsoluteFill
          style={{
            opacity: interpolate(frame, [s.cta.from - 10, s.cta.from + 10], [0, 1], clamp),
            background: `linear-gradient(160deg, ${T.primary} 0%, ${T.primaryDark} 70%, #0A1A6B 100%)`,
          }}
        />
      )}

      <Sequence from={s.hook.from} durationInFrames={s.hook.dur} layout="none">
        <SceneHook />
      </Sequence>
      <Sequence from={s.chaos.from} durationInFrames={s.chaos.dur} layout="none">
        <SceneChaos />
      </Sequence>
      <Sequence from={s.insight.from} durationInFrames={s.insight.dur} layout="none">
        <SceneInsight />
      </Sequence>
      <Sequence from={s.turn.from} durationInFrames={s.turn.dur} layout="none">
        <SceneTurn />
      </Sequence>
      <Sequence from={s.night.from} durationInFrames={s.night.dur} layout="none">
        <SceneNight />
      </Sequence>
      <Sequence from={s.cta.from} durationInFrames={s.cta.dur} layout="none">
        <SceneCta />
      </Sequence>

      <Progress frame={frame} />
      {frame < s.cta.from && <LogoWatermark />}
      <Grain opacity={0.06} />

      {/* ---------- Audio ---------- */}
      <Audio src={sfx("music.mp3")} volume={musicVol} name="Musik" />
      {VO_ABS.map((v) => (
        <Sequence key={v.id} from={v.from} durationInFrames={v.frames + 6} layout="none" name={`VO ${v.id}`}>
          <Audio src={voFile(v.id)} volume={1} />
        </Sequence>
      ))}

      <At f={0} src="tick.wav" v={0.45} />
      <At f={102} src="ding.wav" v={0.35} />
      <At f={s.chaos.from} src="whoosh.wav" v={0.3} />
      {INCOMING.map((_, i) => (
        <At key={`m${i}`} f={s.chaos.from + 8 + i * 21} src="pop.wav" v={0.18} />
      ))}
      <At f={s.chaos.from + 291} src="whoosh.wav" v={0.4} />
      <At f={s.insight.from + 52} src="ding.wav" v={0.35} />
      <At f={s.insight.from + 68} src="whoosh.wav" v={0.3} />
      <At f={s.turn.from + 32} src="rise.wav" v={0.45} />
      <At f={s.turn.from + 72} src="whoosh.wav" v={0.3} />
      <At f={s.night.from} src="tick.wav" v={0.35} />
      {ORDERS.map((_, i) => (
        <At key={`o${i}`} f={s.night.from + NIGHT_ORDER_START + i * NIGHT_ORDER_GAP} src="ding.wav" v={0.22} />
      ))}
      <At f={s.night.from + DAWN_AT + 4} src="rise.wav" v={0.35} />
      <At f={s.cta.from + 72} src="pop.wav" v={0.4} />
    </AbsoluteFill>
  );
};

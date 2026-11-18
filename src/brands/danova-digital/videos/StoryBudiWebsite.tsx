// ============================================================
// Video: "Toko Budi Tutup Jam 02.17" — studi kasus Danova Digital
// Reels 1080x1920 @30fps, dengan voiceover (suara Siti, ElevenLabs).
//
// Fokus jasa: landing page + form pesanan (bukan toko online / payment).
// Alur: Hook (02.17, Budi belum tidur) -> Chaos (47 chat, isinya sama,
// yang telat dibales kabur) -> Insight (47 chat -> 3 beli; tokonya
// "tutup") -> Turn (status jadi Buka 24 jam, website menjawab
// pertanyaan tadi, ada form pesanan) -> Night (02.17 lagi, Budi tidur,
// pagi 6 form pesanan tercatat rapi) -> CTA.
//
// Gaya: clean startup — putih + biru muda, kartu membulat, bayangan lembut,
// subtitle kata-per-kata dari VO.
// Timeline dihitung dari story-budi/vo.json, hasil scripts/danova-digital/story-budi-vo.py.
// Versi lama: git history & ./_legacy/StoryBudiWebsite.v1.tsx
// ============================================================

import React from "react";
import { AbsoluteFill, Audio, interpolate, interpolateColors, Sequence, useCurrentFrame } from "remotion";
import { SCENES, SCENE_ORDER, SceneKey, T, TOTAL_FRAMES, VO, clamp } from "./story-budi/theme";
import { SceneChaos, SceneCta, SceneHook, SceneInsight, SceneNight, SceneTurn, sfxCues } from "./story-budi/scenes";
import { Captions } from "./story-budi/ui";
import { brandFile, sharedAudio } from "../../../shared/assets";

export const STORY_BUDI_FRAMES = TOTAL_FRAMES;

const sfx = sharedAudio;
const voFile = (id: string) => brandFile("danova-digital", `audio/story-budi/vo-${id}.mp3`);

const BG: Record<SceneKey, string> = {
  hook: T.sky,
  chaos: T.bg,
  insight: T.white,
  turn: T.sky,
  night: T.sky2,
  cta: T.sky,
};

const SCENE_EL: Record<SceneKey, React.FC> = {
  hook: SceneHook,
  chaos: SceneChaos,
  insight: SceneInsight,
  turn: SceneTurn,
  night: SceneNight,
  cta: SceneCta,
};

const FADE = 10;

/** Scene dengan fade-in / fade-out lembut. */
const Fade: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, FADE, dur - FADE, dur], [0, 1, 1, 0], clamp);
  return <AbsoluteFill style={{ opacity: o, transform: `scale(${0.985 + o * 0.015})` }}>{children}</AbsoluteFill>;
};

const Progress: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{ position: "absolute", top: 72, left: 70, right: 70, display: "flex", gap: 8, zIndex: 50 }}>
    {SCENE_ORDER.map((k) => {
      const s = SCENES[k];
      const p = Math.max(0, Math.min(1, (frame - s.from) / s.dur));
      return (
        <div key={k} style={{ flex: 1, height: 6, borderRadius: 99, background: "rgba(47,107,255,.15)", overflow: "hidden" }}>
          <div style={{ width: `${p * 100}%`, height: "100%", borderRadius: 99, background: T.blue }} />
        </div>
      );
    })}
  </div>
);

// musik turun saat ada narasi
const voiceLevel = (f: number) =>
  Math.max(0, ...VO.map((v) => interpolate(f, [v.from - 6, v.from, v.from + v.frames, v.from + v.frames + 10], [0, 1, 1, 0], clamp)));

export const StoryBudiWebsite: React.FC = () => {
  const frame = useCurrentFrame();
  const stops: number[] = [];
  const colors: string[] = [];
  SCENE_ORDER.forEach((k, i) => {
    if (i === 0) {
      stops.push(0);
      colors.push(BG[k]);
      return;
    }
    stops.push(SCENES[k].from - 10, SCENES[k].from + 6);
    colors.push(BG[SCENE_ORDER[i - 1]], BG[k]);
  });
  const bg = interpolateColors(frame, stops, colors);
  const drift = Math.sin(frame / 90) * 60;
  const musicVol = (f: number) =>
    interpolate(f, [0, 20, TOTAL_FRAMES - 30, TOTAL_FRAMES], [0, 1, 1, 0], clamp) * (0.2 - 0.13 * voiceLevel(f));

  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      {/* cahaya lembut di latar */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${20 + drift / 20}% 18%, rgba(255,255,255,.85) 0%, rgba(255,255,255,0) 45%), radial-gradient(circle at ${85 - drift / 25}% 80%, rgba(90,169,255,.18) 0%, rgba(90,169,255,0) 50%)`,
        }}
      />

      {SCENE_ORDER.map((k) => {
        const El = SCENE_EL[k];
        return (
          <Sequence key={k} from={SCENES[k].from} durationInFrames={SCENES[k].dur} layout="none" name={k}>
            <Fade dur={SCENES[k].dur}>
              <El />
            </Fade>
          </Sequence>
        );
      })}

      <Captions />
      <Progress frame={frame} />

      {/* ---------- Audio ---------- */}
      <Audio src={sfx("music.mp3")} volume={musicVol} name="Musik" />
      {VO.map((v) => (
        <Sequence key={v.id} from={v.from} durationInFrames={v.frames + 6} layout="none" name={`VO ${v.id}`}>
          <Audio src={voFile(v.id)} volume={1} />
        </Sequence>
      ))}
      {sfxCues().map(([f, src, vol], i) => (
        <Sequence key={i} from={Math.round(f)} durationInFrames={60} layout="none">
          <Audio src={sfx(src)} volume={vol} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

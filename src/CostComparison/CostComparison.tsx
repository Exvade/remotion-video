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
import { Captions } from "./Captions";
import { SceneCta } from "./SceneCta";
import { SceneDigital } from "./SceneDigital";
import { SceneHook } from "./SceneHook";
import { ScenePrint } from "./ScenePrint";
import { SceneSavings } from "./SceneSavings";
import { SCENE_ORDER, SCENES, SFX, TOTAL_FRAMES, VO, VOICE_TRACK_FILE } from "./timeline";
import { CostComparisonProps } from "./types";
import { C, SANS } from "./ui";

const audio = (f: string) => staticFile(`audio/cost-comparison/${f}`);

const SCENE_BG: Record<string, string> = {
  hook: C.paper,
  print: C.paperWarm,
  digital: C.paperSage,
  savings: C.paper,
  cta: C.wineDeep,
};

export const CostComparison: React.FC<CostComparisonProps> = ({
  physicalPricePerPcs,
  physicalQuantity,
  physicalShippingCost,
  digitalPrice,
  brandName = "Bilaa Store",
  withAudio = true,
}) => {
  const frame = useCurrentFrame();
  const physicalTotal = physicalPricePerPcs * physicalQuantity + physicalShippingCost;

  // background color crossfades into each scene over its first 20 frames
  const stops = SCENE_ORDER.flatMap((k, i) => (i === 0 ? [0] : [SCENES[k].from - 10, SCENES[k].from + 10]));
  const colors = SCENE_ORDER.flatMap((k, i) =>
    i === 0 ? [SCENE_BG[k]] : [SCENE_BG[SCENE_ORDER[i - 1]], SCENE_BG[k]],
  );
  const bg = interpolateColors(frame, stops, colors);
  const dark = frame >= SCENES.cta.from;

  // duck the music under the voice
  const musicVolume = (f: number) => {
    const talking = VO.some((v) => f >= v.at - 4 && f <= v.at + v.dur + 4);
    const fadeIn = interpolate(f, [0, 20], [0, 1], { extrapolateRight: "clamp" });
    const fadeOut = interpolate(f, [TOTAL_FRAMES - 45, TOTAL_FRAMES], [1, 0], { extrapolateLeft: "clamp" });
    return (talking ? 0.15 : 0.3) * fadeIn * fadeOut;
  };

  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      {/* soft light blobs */}
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: 999,
          left: -300 + Math.sin(frame / 60) * 60,
          top: -420,
          background: `radial-gradient(circle, ${dark ? "rgba(201,162,39,.18)" : "rgba(255,255,255,.75)"} 0%, rgba(255,255,255,0) 65%)`,
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
          background: `radial-gradient(circle, ${dark ? "rgba(0,0,0,.25)" : "rgba(201,162,39,.16)"} 0%, rgba(0,0,0,0) 65%)`,
        }}
      />

      <Sequence durationInFrames={SCENES.hook.dur} layout="none">
        <SceneHook quantity={physicalQuantity} />
      </Sequence>
      <Sequence from={SCENES.print.from} durationInFrames={SCENES.print.dur} layout="none">
        <ScenePrint quantity={physicalQuantity} pricePerPcs={physicalPricePerPcs} shippingCost={physicalShippingCost} />
      </Sequence>
      <Sequence from={SCENES.digital.from} durationInFrames={SCENES.digital.dur} layout="none">
        <SceneDigital digitalPrice={digitalPrice} />
      </Sequence>
      <Sequence from={SCENES.savings.from} durationInFrames={SCENES.savings.dur} layout="none">
        <SceneSavings physicalTotal={physicalTotal} digitalPrice={digitalPrice} />
      </Sequence>
      <Sequence from={SCENES.cta.from} durationInFrames={SCENES.cta.dur} layout="none">
        <SceneCta brandName={brandName} digitalPrice={digitalPrice} />
      </Sequence>

      <Captions />

      {/* editorial frame + header */}
      <div
        style={{
          position: "absolute",
          inset: 36,
          borderRadius: 34,
          border: `2px solid ${dark ? "rgba(201,162,39,.55)" : "rgba(140,106,14,.28)"}`,
          pointerEvents: "none",
        }}
      />
      <Header frame={frame} brandName={brandName} dark={dark} />
      <Grain />

      {withAudio && (
        <>
          <Audio src={audio("music.mp3")} volume={musicVolume} name="Musik" />
          {/* narration: one pre-aligned track, built by scripts/build-voice-track.py */}
          <Audio src={audio(VOICE_TRACK_FILE)} volume={1} name="Narasi" />
          {SFX.map((s, i) => (
            <Sequence key={`${s.file}-${i}`} from={Math.max(0, s.at)} durationInFrames={50} layout="none" name={`SFX ${s.file}`}>
              <Audio src={audio(s.file)} volume={s.volume} />
            </Sequence>
          ))}
        </>
      )}
    </AbsoluteFill>
  );
};

const Header: React.FC<{ frame: number; brandName: string; dark: boolean }> = ({ frame, brandName, dark }) => {
  const fg = dark ? C.paper : C.ink;
  return (
    <div style={{ position: "absolute", top: 76, left: 90, right: 90 }}>
      <div style={{ display: "flex", gap: 10 }}>
        {SCENE_ORDER.map((k) => {
          const { from, dur } = SCENES[k];
          const p = interpolate(frame, [from, from + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={k} style={{ flex: 1, height: 6, borderRadius: 3, background: dark ? "rgba(244,237,225,.25)" : C.line, overflow: "hidden" }}>
              <div style={{ width: `${p * 100}%`, height: "100%", background: dark ? C.gold : fg }} />
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 22,
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: 5,
          color: fg,
          opacity: 0.7,
        }}
      >
        <span>{brandName.toUpperCase()}</span>
        <span>CETAK vs DIGITAL</span>
      </div>
    </div>
  );
};

const Grain: React.FC = () => (
  <svg width="1080" height="1920" style={{ position: "absolute", inset: 0, opacity: 0.09, mixBlendMode: "multiply", pointerEvents: "none" }}>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

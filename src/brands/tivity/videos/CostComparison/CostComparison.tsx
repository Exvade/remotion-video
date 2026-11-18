import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  interpolateColors,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { Captions } from "./Captions";
import { brandFile, sharedAudio } from "../../../../shared/assets";
import { SceneCta } from "./SceneCta";
import { SceneDigital } from "./SceneDigital";
import { SceneHook } from "./SceneHook";
import { ScenePrint } from "./ScenePrint";
import { SceneSavings } from "./SceneSavings";
import {
  SCENE_ORDER,
  SCENES,
  SFX,
  TOTAL_FRAMES,
  VO,
  VOICE_TRACK_FILE,
} from "./timeline";
import { CostComparisonProps } from "./types";
import { C, Garland, LogoMark, SANS, SERIF } from "./ui";

const audio = (f: string) => brandFile("tivity", `audio/cost-comparison/${f}`);

const SCENE_BG: Record<string, string> = {
  hook: C.cream,
  print: C.blush,
  digital: C.lilac,
  savings: C.cream,
  cta: C.plumNight,
};

export const CostComparison: React.FC<CostComparisonProps> = ({
  physicalPricePerPcs,
  physicalQuantity,
  physicalShippingCost,
  digitalPrice,
  brandName = "Tivity",
  withAudio = true,
}) => {
  const frame = useCurrentFrame();
  const physicalTotal =
    physicalPricePerPcs * physicalQuantity + physicalShippingCost;

  // background color crossfades into each scene over 20 frames around the cut
  const stops = SCENE_ORDER.flatMap((k, i) =>
    i === 0 ? [0] : [SCENES[k].from - 10, SCENES[k].from + 10],
  );
  const colors = SCENE_ORDER.flatMap((k, i) =>
    i === 0 ? [SCENE_BG[k]] : [SCENE_BG[SCENE_ORDER[i - 1]], SCENE_BG[k]],
  );
  const bg = interpolateColors(frame, stops, colors);
  const dark = frame >= SCENES.cta.from;
  const garland = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  // duck the music under the voice
  const musicVolume = (f: number) => {
    const talking = VO.some((v) => f >= v.at - 4 && f <= v.at + v.dur + 4);
    const fadeIn = interpolate(f, [0, 20], [0, 1], {
      extrapolateRight: "clamp",
    });
    const fadeOut = interpolate(f, [TOTAL_FRAMES - 45, TOTAL_FRAMES], [1, 0], {
      extrapolateLeft: "clamp",
    });
    return (talking ? 0.15 : 0.3) * fadeIn * fadeOut;
  };

  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      {/* soft wisteria glow */}
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 1300,
          borderRadius: 999,
          left: -110 + Math.sin(frame / 70) * 50,
          top: 300,
          background: `radial-gradient(circle, ${dark ? "rgba(181,139,196,.22)" : "rgba(220,198,228,.55)"} 0%, rgba(255,255,255,0) 62%)`,
        }}
      />
      <Petals frame={frame} dark={dark} />
      <Garland frame={frame} grow={garland} dark={dark} />

      <Sequence durationInFrames={SCENES.hook.dur} layout="none">
        <SceneHook quantity={physicalQuantity} />
      </Sequence>
      <Sequence
        from={SCENES.print.from}
        durationInFrames={SCENES.print.dur}
        layout="none"
      >
        <ScenePrint
          quantity={physicalQuantity}
          pricePerPcs={physicalPricePerPcs}
          shippingCost={physicalShippingCost}
        />
      </Sequence>
      <Sequence
        from={SCENES.digital.from}
        durationInFrames={SCENES.digital.dur}
        layout="none"
      >
        <SceneDigital digitalPrice={digitalPrice} />
      </Sequence>
      <Sequence
        from={SCENES.savings.from}
        durationInFrames={SCENES.savings.dur}
        layout="none"
      >
        <SceneSavings
          physicalTotal={physicalTotal}
          digitalPrice={digitalPrice}
        />
      </Sequence>
      <Sequence
        from={SCENES.cta.from}
        durationInFrames={SCENES.cta.dur}
        layout="none"
      >
        <SceneCta brandName={brandName} digitalPrice={digitalPrice} />
      </Sequence>

      <Captions />
      <Header brandName={brandName} dark={dark} frame={frame} />
      <Progress frame={frame} dark={dark} />

      {withAudio && (
        <>
          <Audio src={sharedAudio("music.mp3")} volume={musicVolume} name="Musik" />
          {/* narration: one pre-aligned track, built by scripts/tivity/build-voice-track.py */}
          <Audio src={audio(VOICE_TRACK_FILE)} volume={1} name="Narasi" />
          {SFX.map((s, i) => (
            <Sequence
              key={`${s.file}-${i}`}
              from={Math.max(0, s.at)}
              durationInFrames={50}
              layout="none"
              name={`SFX ${s.file}`}
            >
              <Audio src={sharedAudio(s.file)} volume={s.volume} />
            </Sequence>
          ))}
        </>
      )}
    </AbsoluteFill>
  );
};

/** Centered logo lockup at the top (hidden on the CTA, which shows the big logo). */
const Header: React.FC<{ brandName: string; dark: boolean; frame: number }> = ({
  brandName,
  dark,
  frame,
}) => {
  const enter = interpolate(frame, [4, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hide = interpolate(
    frame,
    [SCENES.cta.from - 10, SCENES.cta.from + 6],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        opacity: enter * hide,
        transform: `translateY(${(1 - enter) * -30}px)`,
      }}
    >
      <LogoMark size={76} />
      <div style={{ textAlign: "left" }}>
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 40,
            lineHeight: 1,
            color: dark ? C.cream : C.plumDeep,
          }}
        >
          {brandName}
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: 4,
            marginTop: 6,
            color: C.muted,
          }}
        >
          UNDANGAN DIGITAL
        </div>
      </div>
    </div>
  );
};

/** Bottom progress: one segment per scene, with a blossom marking the playhead. */
const Progress: React.FC<{ frame: number; dark: boolean }> = ({
  frame,
  dark,
}) => (
  <div
    style={{
      position: "absolute",
      left: 110,
      right: 110,
      bottom: 70,
      display: "flex",
      gap: 12,
    }}
  >
    {SCENE_ORDER.map((k) => {
      const { from, dur } = SCENES[k];
      const p = interpolate(frame, [from, from + dur], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return (
        <div
          key={k}
          style={{
            flex: 1,
            height: 8,
            borderRadius: 4,
            background: dark ? "rgba(255,255,255,.18)" : C.line,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${p * 100}%`,
              height: "100%",
              borderRadius: 4,
              background: `linear-gradient(90deg, ${C.wisteria}, ${dark ? C.shine : C.plum})`,
            }}
          />
        </div>
      );
    })}
  </div>
);

/** Wisteria petals drifting down. Deterministic per index. */
const Petals: React.FC<{ frame: number; dark: boolean }> = ({
  frame,
  dark,
}) => (
  <>
    {Array.from({ length: 14 }, (_, i) => {
      const speed = 1.2 + ((i * 37) % 10) / 10;
      const y = ((frame * speed + i * 157) % 2100) - 120;
      const x = ((i * 271) % 1000) + Math.sin((frame + i * 40) / 30) * 40;
      const rot = frame * (i % 2 ? 1.6 : -1.3) + i * 30;
      const col = [C.wisteria, C.rose, C.wisteriaSoft][i % 3];
      return (
        <svg
          key={i}
          width="30"
          height="22"
          viewBox="0 0 30 22"
          style={{
            position: "absolute",
            left: x,
            top: y,
            transform: `rotate(${rot}deg)`,
            opacity: dark ? 0.55 : 0.6,
          }}
        >
          <path d="M2 11 C 8 0, 22 0, 28 11 C 22 22, 8 22, 2 11 Z" fill={col} />
        </svg>
      );
    })}
  </>
);

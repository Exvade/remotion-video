import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTIONS, SCENES } from "./timeline";
import { C, SANS } from "./ui";

/** Phrase-level subtitles synced to the voiceover. */
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cap = CAPTIONS.find((c) => frame >= c.from && frame < c.to);
  if (!cap) return null;

  const enter = spring({ frame: frame - cap.from, fps, config: { damping: 14, mass: 0.6 } });
  const out = interpolate(frame, [cap.to - 4, cap.to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const onDark = frame >= SCENES.cta.from;

  const parts = cap.hl ? cap.text.split(cap.hl) : [cap.text];

  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        top: 1480,
        display: "flex",
        justifyContent: "center",
        opacity: enter * out,
        transform: `translateY(${(1 - enter) * 26}px) scale(${0.92 + enter * 0.08})`,
      }}
    >
      <div
        style={{
          maxWidth: 900,
          padding: "20px 34px 24px",
          borderRadius: 26,
          background: onDark ? C.paper : C.ink,
          color: onDark ? C.ink : C.paper,
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 50,
          lineHeight: 1.2,
          textAlign: "center",
          boxShadow: "0 14px 30px rgba(31,27,22,.22)",
        }}
      >
        {parts.length === 2 ? (
          <>
            {parts[0]}
            <span style={{ color: onDark ? C.wine : C.gold }}>{cap.hl}</span>
            {parts[1]}
          </>
        ) : (
          cap.text
        )}
      </div>
    </div>
  );
};

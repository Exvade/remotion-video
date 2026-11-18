// ============================================================
// Character — 2D Flat Character SVG
// Karakter utama Danova Digital, bisa ganti mood/pose
// Style: Flat, minimal, tanpa outline, friendly
// ============================================================

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../brand';

type Mood = 'thinking' | 'sad' | 'happy' | 'presenting' | 'confused';

interface CharacterProps {
  mood?: Mood;
  size?: number;
  delay?: number;
  flipX?: boolean;
}

export const Character: React.FC<CharacterProps> = ({
  mood = 'happy',
  size = 300,
  delay = 0,
  flipX = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });

  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Subtle idle animation
  const breathe = interpolate(
    frame % (fps * 3),
    [0, fps * 1.5, fps * 3],
    [0, -3, 0],
  );

  const scaleX = flipX ? -1 : 1;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) scaleX(${scaleX})`,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform={`translate(0, ${breathe})`}>
          {/* Body / Shirt */}
          <rect x="55" y="110" width="90" height="80" rx="20" fill={COLORS.primary} />

          {/* Arms */}
          {mood === 'happy' ? (
            <>
              {/* Arms up */}
              <rect x="20" y="80" width="40" height="16" rx="8" fill="#E8A87C" transform="rotate(-30 20 88)" />
              <rect x="140" y="80" width="40" height="16" rx="8" fill="#E8A87C" transform="rotate(30 180 88)" />
              {/* Hands */}
              <circle cx="18" cy="68" r="10" fill="#E8A87C" />
              <circle cx="182" cy="68" r="10" fill="#E8A87C" />
            </>
          ) : mood === 'presenting' ? (
            <>
              {/* Left arm down, right arm pointing */}
              <rect x="25" y="120" width="36" height="14" rx="7" fill="#E8A87C" />
              <rect x="140" y="95" width="50" height="14" rx="7" fill="#E8A87C" transform="rotate(-20 140 102)" />
              <circle cx="192" cy="82" r="10" fill="#E8A87C" />
              <circle cx="14" cy="126" r="10" fill="#E8A87C" />
            </>
          ) : mood === 'thinking' ? (
            <>
              {/* Left arm down, right arm to chin */}
              <rect x="25" y="120" width="36" height="14" rx="7" fill="#E8A87C" />
              <rect x="130" y="90" width="30" height="14" rx="7" fill="#E8A87C" transform="rotate(-70 130 97)" />
              <circle cx="120" cy="66" r="10" fill="#E8A87C" />
              <circle cx="14" cy="126" r="10" fill="#E8A87C" />
            </>
          ) : (
            <>
              {/* Arms down (sad/confused) */}
              <rect x="22" y="125" width="38" height="14" rx="7" fill="#E8A87C" transform="rotate(10 22 132)" />
              <rect x="140" y="125" width="38" height="14" rx="7" fill="#E8A87C" transform="rotate(-10 178 132)" />
              <circle cx="12" cy="138" r="10" fill="#E8A87C" />
              <circle cx="188" cy="138" r="10" fill="#E8A87C" />
            </>
          )}

          {/* Head */}
          <circle cx="100" cy="65" r="45" fill="#F4C99B" />

          {/* Hair */}
          <ellipse cx="100" cy="35" rx="42" ry="22" fill="#4A3728" />
          <ellipse cx="68" cy="45" rx="12" ry="20" fill="#4A3728" />
          <ellipse cx="132" cy="45" rx="12" ry="20" fill="#4A3728" />

          {/* Eyes */}
          {mood === 'happy' ? (
            <>
              {/* Happy eyes (curved lines) */}
              <path d="M 80 60 Q 85 55, 90 60" stroke="#333" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 110 60 Q 115 55, 120 60" stroke="#333" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Normal dot eyes */}
              <circle cx="85" cy="62" r="4" fill="#333" />
              <circle cx="115" cy="62" r="4" fill="#333" />
            </>
          )}

          {/* Eyebrows */}
          {mood === 'thinking' && (
            <>
              <line x1="78" y1="50" x2="92" y2="48" stroke="#4A3728" strokeWidth="3" strokeLinecap="round" />
              <line x1="108" y1="46" x2="122" y2="50" stroke="#4A3728" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
          {mood === 'sad' && (
            <>
              <line x1="78" y1="48" x2="92" y2="52" stroke="#4A3728" strokeWidth="3" strokeLinecap="round" />
              <line x1="108" y1="52" x2="122" y2="48" stroke="#4A3728" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
          {mood === 'confused' && (
            <>
              <line x1="78" y1="50" x2="92" y2="48" stroke="#4A3728" strokeWidth="3" strokeLinecap="round" />
              <line x1="108" y1="48" x2="122" y2="50" stroke="#4A3728" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Mouth */}
          {mood === 'happy' ? (
            <path d="M 88 78 Q 100 92, 112 78" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          ) : mood === 'sad' ? (
            <path d="M 88 84 Q 100 74, 112 84" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          ) : mood === 'thinking' ? (
            <circle cx="108" cy="82" r="5" fill="#333" />
          ) : mood === 'confused' ? (
            <path d="M 90 80 L 110 80" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
          ) : (
            <path d="M 90 80 Q 100 86, 110 80" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}

          {/* Thinking bubble */}
          {mood === 'thinking' && (
            <>
              <circle cx="145" cy="30" r="6" fill={COLORS.white} opacity="0.9" />
              <circle cx="158" cy="16" r="10" fill={COLORS.white} opacity="0.9" />
              <text x="155" y="21" textAnchor="middle" fontSize="14" fill={COLORS.primary} fontWeight="bold">?</text>
            </>
          )}

          {/* Happy sparkles */}
          {mood === 'happy' && (
            <>
              <text x="30" y="40" fontSize="20">✨</text>
              <text x="160" y="45" fontSize="16">✨</text>
            </>
          )}

          {/* Legs / Pants */}
          <rect x="65" y="185" width="28" height="40" rx="10" fill="#2D3748" />
          <rect x="107" y="185" width="28" height="40" rx="10" fill="#2D3748" />

          {/* Shoes */}
          <rect x="60" y="218" width="36" height="14" rx="7" fill="#1A202C" />
          <rect x="104" y="218" width="36" height="14" rx="7" fill="#1A202C" />
        </g>
      </svg>
    </div>
  );
};

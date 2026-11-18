// ============================================================
// Logo — Danova Digital logo (SVG recreation)
// Recreated dari logo asli: huruf "D" biru di circle putih
// ============================================================

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../brand';
import { FONTS } from '../fonts';

interface LogoProps {
  size?: number;
  showText?: boolean;
  delay?: number;
  variant?: 'full' | 'icon' | 'watermark';
}

export const Logo: React.FC<LogoProps> = ({
  size = 80,
  showText = true,
  delay = 0,
  variant = 'full',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });

  const opacity = interpolate(progress, [0, 1], [0, variant === 'watermark' ? 0.5 : 1]);
  const scale = interpolate(progress, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      {/* Logo Icon — "D" in circle */}
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="48" fill={COLORS.white} />
        <text
          x="50"
          y="68"
          textAnchor="middle"
          fill={COLORS.primary}
          fontFamily="Arial, sans-serif"
          fontWeight="800"
          fontSize="62"
        >
          D
        </text>
      </svg>

      {/* Logo Text */}
      {showText && variant !== 'icon' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 700,
              fontSize: size * 0.4,
              color: COLORS.white,
              lineHeight: 1.1,
            }}
          >
            Danova
          </span>
          <span
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 700,
              fontSize: size * 0.4,
              color: COLORS.primary,
              lineHeight: 1.1,
            }}
          >
            Digital
          </span>
        </div>
      )}
    </div>
  );
};

// Watermark version — kecil, di pojok bawah
export const LogoWatermark: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Logo size={36} showText={false} variant="watermark" delay={0} />
    </div>
  );
};

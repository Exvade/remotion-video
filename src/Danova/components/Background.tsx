// ============================================================
// Background — Animated gradient background with floating shapes
// Dipakai di setiap slide sebagai background utama
// ============================================================

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS } from '../brand';

type BackgroundVariant = 'dark' | 'primary' | 'energetic' | 'ocean' | 'sunset';

interface BackgroundProps {
  variant?: BackgroundVariant;
  showShapes?: boolean;
}

const GRADIENT_MAP: Record<BackgroundVariant, string> = {
  dark: `linear-gradient(180deg, ${COLORS.bgDark} 0%, ${COLORS.surfaceDark} 100%)`,
  primary: `linear-gradient(135deg, ${COLORS.primary} 0%, #8B5CF6 100%)`,
  energetic: `linear-gradient(135deg, ${COLORS.orange} 0%, ${COLORS.yellow} 100%)`,
  ocean: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.electricBlue} 100%)`,
  sunset: `linear-gradient(135deg, ${COLORS.orange} 0%, ${COLORS.pink} 100%)`,
};

const FloatingShape: React.FC<{
  size: number;
  color: string;
  x: number;
  y: number;
  delay: number;
  shape: 'circle' | 'square';
}> = ({ size, color, x, y, delay, shape }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floatY = interpolate(
    (frame + delay) % (fps * 4),
    [0, fps * 2, fps * 4],
    [0, -20, 0],
  );

  const floatX = interpolate(
    (frame + delay * 1.5) % (fps * 6),
    [0, fps * 3, fps * 6],
    [0, 15, 0],
  );

  const rotation = interpolate(
    (frame + delay) % (fps * 8),
    [0, fps * 8],
    [0, 360],
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        opacity: 0.08,
        borderRadius: shape === 'circle' ? '50%' : size * 0.2,
        transform: `translateY(${floatY}px) translateX(${floatX}px) rotate(${rotation}deg)`,
      }}
    />
  );
};

export const Background: React.FC<BackgroundProps> = ({
  variant = 'dark',
  showShapes = true,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: GRADIENT_MAP[variant],
      }}
    >
      {showShapes && (
        <>
          <FloatingShape size={120} color={COLORS.primary} x={80} y={200} delay={0} shape="circle" />
          <FloatingShape size={80} color={COLORS.electricBlue} x={850} y={400} delay={30} shape="square" />
          <FloatingShape size={60} color={COLORS.orange} x={150} y={900} delay={60} shape="circle" />
          <FloatingShape size={100} color={COLORS.yellow} x={800} y={1200} delay={45} shape="square" />
          <FloatingShape size={70} color={COLORS.primary} x={500} y={1600} delay={15} shape="circle" />
          <FloatingShape size={90} color={COLORS.pink} x={900} y={100} delay={75} shape="circle" />
        </>
      )}
    </AbsoluteFill>
  );
};

// ============================================================
// BulletList — Animated bullet points appearing one by one
// Untuk list perbandingan, tips, dll
// ============================================================

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_SIZES, SPRING_CONFIG } from '../brand';
import { FONTS } from '../fonts';

export interface BulletItem {
  icon: '✅' | '❌' | '💡' | '🔥' | '⚡' | '👉' | '🎯' | string;
  text: string;
  color?: string;
}

interface BulletListProps {
  items: BulletItem[];
  startDelay?: number;
  staggerDelay?: number;
  fontSize?: number;
  iconSize?: number;
}

const BulletItemComponent: React.FC<{
  item: BulletItem;
  delay: number;
  fontSize: number;
  iconSize: number;
}> = ({ item, delay, fontSize, iconSize }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateX = interpolate(progress, [0, 1], [-40, 0]);

  const bgColor = item.icon === '✅'
    ? `${COLORS.success}15`
    : item.icon === '❌'
      ? `${COLORS.danger}15`
      : `${COLORS.primary}15`;

  const borderColor = item.icon === '✅'
    ? `${COLORS.success}30`
    : item.icon === '❌'
      ? `${COLORS.danger}30`
      : `${COLORS.primary}30`;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '20px 28px',
        borderRadius: 20,
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        width: '100%',
      }}
    >
      <span style={{ fontSize: iconSize, flexShrink: 0 }}>
        {item.icon}
      </span>
      <span
        style={{
          fontSize,
          color: item.color ?? COLORS.textPrimary,
          fontFamily: FONTS.body,
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        {item.text}
      </span>
    </div>
  );
};

export const BulletList: React.FC<BulletListProps> = ({
  items,
  startDelay = 10,
  staggerDelay = 12,
  fontSize = FONT_SIZES.body,
  iconSize = 36,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '100%',
      }}
    >
      {items.map((item, index) => (
        <BulletItemComponent
          key={index}
          item={item}
          delay={startDelay + index * staggerDelay}
          fontSize={fontSize}
          iconSize={iconSize}
        />
      ))}
    </div>
  );
};

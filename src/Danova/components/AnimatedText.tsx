// ============================================================
// AnimatedText — Text with fade-in + slide-up animation
// Komponen dasar untuk semua teks yang muncul di video
// ============================================================

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_SIZES, SPRING_CONFIG } from '../brand';
import { FONTS } from '../fonts';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  fontFamily?: 'heading' | 'body';
  textAlign?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
  lineHeight?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  fontSize = FONT_SIZES.body,
  fontWeight = 400,
  color = COLORS.textPrimary,
  fontFamily = 'body',
  textAlign = 'center',
  style = {},
  lineHeight = 1.3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontSize,
        fontWeight,
        color,
        fontFamily: fontFamily === 'heading' ? FONTS.heading : FONTS.body,
        textAlign,
        lineHeight,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

// Variant: Heading text (Poppins Bold)
export const Heading: React.FC<Omit<AnimatedTextProps, 'fontFamily' | 'fontWeight'> & { level?: 1 | 2 | 3 }> = ({
  level = 1,
  fontSize,
  ...props
}) => {
  const sizeMap = {
    1: FONT_SIZES.hook,
    2: FONT_SIZES.heading,
    3: FONT_SIZES.subheading,
  };

  return (
    <AnimatedText
      fontFamily="heading"
      fontWeight={700}
      fontSize={fontSize ?? sizeMap[level]}
      {...props}
    />
  );
};

// Variant: Body text (Inter Regular)
export const Body: React.FC<Omit<AnimatedTextProps, 'fontFamily'>> = (props) => {
  return (
    <AnimatedText
      fontFamily="body"
      fontWeight={400}
      fontSize={FONT_SIZES.body}
      {...props}
    />
  );
};

// Variant: Caption text (Inter, smaller, gray)
export const Caption: React.FC<Omit<AnimatedTextProps, 'fontFamily' | 'fontSize' | 'color'>> = (props) => {
  return (
    <AnimatedText
      fontFamily="body"
      fontWeight={400}
      fontSize={FONT_SIZES.caption}
      color={COLORS.textSecondary}
      {...props}
    />
  );
};

// Animated stat number (big, bold, with count-up effect)
export const StatNumber: React.FC<{
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  color?: string;
}> = ({ value, suffix = '', prefix = '', delay = 0, color = COLORS.yellow }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100, mass: 1 },
  });

  const displayValue = Math.round(interpolate(progress, [0, 1], [0, value]));
  const scale = interpolate(progress, [0, 0.5, 1], [0.5, 1.1, 1]);

  return (
    <div
      style={{
        fontFamily: FONTS.heading,
        fontSize: 120,
        fontWeight: 800,
        color,
        textAlign: 'center',
        transform: `scale(${scale})`,
        lineHeight: 1,
      }}
    >
      {prefix}{displayValue}{suffix}
    </div>
  );
};

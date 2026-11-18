// ============================================================
// Icons — Koleksi icon SVG untuk konten
// Semua icon business/website related dalam satu file
// ============================================================

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../brand';

interface IconProps {
  size?: number;
  color?: string;
  delay?: number;
}

const AnimatedIcon: React.FC<{
  children: React.ReactNode;
  size: number;
  delay: number;
}> = ({ children, size, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });

  const scale = interpolate(progress, [0, 1], [0, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div style={{ opacity, transform: `scale(${scale})`, width: size, height: size }}>
      {children}
    </div>
  );
};

// 🌐 Website / Globe icon
export const WebsiteIcon: React.FC<IconProps> = ({
  size = 80,
  color = COLORS.primary,
  delay = 0,
}) => (
  <AnimatedIcon size={size} delay={delay}>
    <svg viewBox="0 0 80 80" fill="none" width={size} height={size}>
      <circle cx="40" cy="40" r="35" fill={color} opacity="0.15" />
      <circle cx="40" cy="40" r="28" stroke={color} strokeWidth="3" fill="none" />
      <ellipse cx="40" cy="40" rx="14" ry="28" stroke={color} strokeWidth="2" fill="none" />
      <line x1="12" y1="40" x2="68" y2="40" stroke={color} strokeWidth="2" />
      <line x1="40" y1="12" x2="40" y2="68" stroke={color} strokeWidth="2" />
    </svg>
  </AnimatedIcon>
);

// 🏪 Store icon
export const StoreIcon: React.FC<IconProps> = ({
  size = 80,
  color = COLORS.orange,
  delay = 0,
}) => (
  <AnimatedIcon size={size} delay={delay}>
    <svg viewBox="0 0 80 80" fill="none" width={size} height={size}>
      <rect x="15" y="35" width="50" height="35" rx="4" fill={color} opacity="0.15" />
      <rect x="15" y="35" width="50" height="35" rx="4" stroke={color} strokeWidth="3" fill="none" />
      {/* Roof */}
      <path d="M10 35 L40 12 L70 35" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Door */}
      <rect x="32" y="50" width="16" height="20" rx="3" fill={color} opacity="0.3" />
      {/* Window */}
      <rect x="20" y="42" width="12" height="10" rx="2" fill={color} opacity="0.4" />
      <rect x="48" y="42" width="12" height="10" rx="2" fill={color} opacity="0.4" />
    </svg>
  </AnimatedIcon>
);

// 📱 Phone icon
export const PhoneIcon: React.FC<IconProps> = ({
  size = 80,
  color = COLORS.electricBlue,
  delay = 0,
}) => (
  <AnimatedIcon size={size} delay={delay}>
    <svg viewBox="0 0 80 80" fill="none" width={size} height={size}>
      <rect x="22" y="8" width="36" height="64" rx="8" fill={color} opacity="0.15" />
      <rect x="22" y="8" width="36" height="64" rx="8" stroke={color} strokeWidth="3" fill="none" />
      {/* Screen */}
      <rect x="27" y="18" width="26" height="40" rx="3" fill={color} opacity="0.2" />
      {/* Home button */}
      <circle cx="40" cy="65" r="3" fill={color} opacity="0.5" />
    </svg>
  </AnimatedIcon>
);

// 📊 Chart / Growth icon
export const ChartIcon: React.FC<IconProps> = ({
  size = 80,
  color = COLORS.success,
  delay = 0,
}) => (
  <AnimatedIcon size={size} delay={delay}>
    <svg viewBox="0 0 80 80" fill="none" width={size} height={size}>
      {/* Bars */}
      <rect x="15" y="50" width="12" height="20" rx="3" fill={color} opacity="0.4" />
      <rect x="34" y="35" width="12" height="35" rx="3" fill={color} opacity="0.6" />
      <rect x="53" y="18" width="12" height="52" rx="3" fill={color} opacity="0.9" />
      {/* Arrow up */}
      <path d="M20 45 L40 28 L60 12" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M50 10 L62 10 L62 22" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  </AnimatedIcon>
);

// 🕐 Clock / 24 Hours icon
export const ClockIcon: React.FC<IconProps> = ({
  size = 80,
  color = COLORS.yellow,
  delay = 0,
}) => (
  <AnimatedIcon size={size} delay={delay}>
    <svg viewBox="0 0 80 80" fill="none" width={size} height={size}>
      <circle cx="40" cy="40" r="30" fill={color} opacity="0.15" />
      <circle cx="40" cy="40" r="30" stroke={color} strokeWidth="3" fill="none" />
      {/* Hands */}
      <line x1="40" y1="40" x2="40" y2="22" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="40" x2="55" y2="40" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="40" r="3" fill={color} />
    </svg>
  </AnimatedIcon>
);

// 🔍 Google / Search icon
export const SearchIcon: React.FC<IconProps> = ({
  size = 80,
  color = COLORS.primary,
  delay = 0,
}) => (
  <AnimatedIcon size={size} delay={delay}>
    <svg viewBox="0 0 80 80" fill="none" width={size} height={size}>
      <circle cx="35" cy="35" r="22" fill={color} opacity="0.15" />
      <circle cx="35" cy="35" r="22" stroke={color} strokeWidth="3" fill="none" />
      <line x1="52" y1="52" x2="68" y2="68" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  </AnimatedIcon>
);

// Simple website browser mockup
export const BrowserMockup: React.FC<{
  size?: number;
  delay?: number;
}> = ({ size = 300, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });

  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const height = size * 0.65;

  return (
    <div style={{ opacity, transform: `scale(${scale})` }}>
      <svg viewBox="0 0 300 195" fill="none" width={size} height={height}>
        {/* Browser window */}
        <rect x="0" y="0" width="300" height="195" rx="12" fill={COLORS.cardDark} />

        {/* Title bar */}
        <rect x="0" y="0" width="300" height="30" rx="12" fill={COLORS.surfaceDark} />
        <rect x="0" y="12" width="300" height="18" fill={COLORS.surfaceDark} />

        {/* Traffic lights */}
        <circle cx="18" cy="15" r="5" fill={COLORS.danger} opacity="0.8" />
        <circle cx="34" cy="15" r="5" fill={COLORS.yellow} opacity="0.8" />
        <circle cx="50" cy="15" r="5" fill={COLORS.success} opacity="0.8" />

        {/* URL bar */}
        <rect x="70" y="8" width="160" height="14" rx="7" fill={COLORS.bgDark} />
        <text x="95" y="18" fill={COLORS.textSecondary} fontSize="7" fontFamily="monospace">
          danovadigi...
        </text>

        {/* Content area */}
        {/* Hero */}
        <rect x="15" y="40" width="130" height="12" rx="4" fill={COLORS.primary} opacity="0.6" />
        <rect x="15" y="58" width="90" height="8" rx="3" fill={COLORS.textSecondary} opacity="0.3" />
        <rect x="15" y="72" width="70" height="8" rx="3" fill={COLORS.textSecondary} opacity="0.2" />

        {/* CTA button */}
        <rect x="15" y="90" width="60" height="18" rx="9" fill={COLORS.primary} />

        {/* Image placeholder */}
        <rect x="175" y="40" width="110" height="70" rx="8" fill={COLORS.primary} opacity="0.1" />
        <circle cx="230" cy="65" r="10" fill={COLORS.primary} opacity="0.3" />

        {/* Cards */}
        <rect x="15" y="125" width="82" height="55" rx="6" fill={COLORS.surfaceDark} />
        <rect x="109" y="125" width="82" height="55" rx="6" fill={COLORS.surfaceDark} />
        <rect x="203" y="125" width="82" height="55" rx="6" fill={COLORS.surfaceDark} />

        {/* Card content lines */}
        <rect x="23" y="140" width="40" height="5" rx="2" fill={COLORS.primary} opacity="0.4" />
        <rect x="23" y="150" width="60" height="4" rx="2" fill={COLORS.textSecondary} opacity="0.2" />
        <rect x="23" y="158" width="50" height="4" rx="2" fill={COLORS.textSecondary} opacity="0.15" />

        <rect x="117" y="140" width="40" height="5" rx="2" fill={COLORS.orange} opacity="0.4" />
        <rect x="117" y="150" width="60" height="4" rx="2" fill={COLORS.textSecondary} opacity="0.2" />
        <rect x="117" y="158" width="50" height="4" rx="2" fill={COLORS.textSecondary} opacity="0.15" />

        <rect x="211" y="140" width="40" height="5" rx="2" fill={COLORS.success} opacity="0.4" />
        <rect x="211" y="150" width="60" height="4" rx="2" fill={COLORS.textSecondary} opacity="0.2" />
        <rect x="211" y="158" width="50" height="4" rx="2" fill={COLORS.textSecondary} opacity="0.15" />
      </svg>
    </div>
  );
};

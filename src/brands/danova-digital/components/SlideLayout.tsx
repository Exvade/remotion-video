// ============================================================
// SlideLayout — Consistent slide wrapper
// Semua scene HARUS dibungkus komponen ini
// ============================================================

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { LAYOUT } from '../brand';

interface SlideLayoutProps {
  children: React.ReactNode;
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end';
  gap?: number;
  padding?: number;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({
  children,
  justify = 'center',
  align = 'center',
  gap = 24,
  padding = LAYOUT.padding,
}) => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: justify,
        alignItems: align,
        padding,
        gap,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Centered content box within slide
export const ContentBox: React.FC<{
  children: React.ReactNode;
  width?: number | string;
  style?: React.CSSProperties;
}> = ({ children, width = '100%', style = {} }) => {
  return (
    <div
      style={{
        width,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Spacer component
export const Spacer: React.FC<{ height?: number }> = ({ height = 40 }) => {
  return <div style={{ height }} />;
};

// ============================================================
// Modern UI Kit & Komponen Premium untuk Danova Digital
// 100% Vector & Typography murni — Tanpa Emoji Keyboard
// ============================================================

import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../brand';
import { FONTS } from '../fonts';
import { UserIcon } from './VectorIcons';

export const useEnter = (delay = 0, damping = 14, mass = 0.8) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass } });
};

// Background Gelap Premium dengan Glow Gradient & Mesh Grid
export const PremiumBackground: React.FC<{
  glowColor?: string;
  glowPosition?: 'top' | 'center' | 'bottom';
}> = ({ glowColor = COLORS.primary, glowPosition = 'center' }) => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame / 20) * 0.08;

  const glowY = glowPosition === 'top' ? '20%' : glowPosition === 'bottom' ? '75%' : '45%';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#090D14',
        overflow: 'hidden',
      }}
    >
      {/* Radial Glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: glowY,
          width: 900,
          height: 900,
          transform: `translate(-50%, -50%) scale(${1 + pulse})`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor}33 0%, ${glowColor}00 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid Pattern halus */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          opacity: 0.6,
        }}
      />
    </div>
  );
};

// Kicker / Tagline Badge di bagian atas layar
export const TopBadge: React.FC<{
  label: string;
  color?: string;
  delay?: number;
}> = ({ label, color = COLORS.electricBlue, delay = 0 }) => {
  const enter = useEnter(delay);

  return (
    <div
      style={{
        position: 'absolute',
        top: 140,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity: enter,
        transform: `translateY(${(1 - enter) * -20}px)`,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 28px',
          borderRadius: 100,
          backgroundColor: 'rgba(255,255,255,0.06)',
          border: `1.5px solid ${color}66`,
          backdropFilter: 'blur(12px)',
          boxShadow: `0 0 20px ${color}22`,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
        <span
          style={{
            fontFamily: FONTS.heading,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 4,
            color: COLORS.white,
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

// Karakter Budi: Tech Profile Card dengan Vector Avatar Murni
export const BudiProfileCard: React.FC<{
  statusText: string;
  statusType: 'happy' | 'stress' | 'rich';
  delay?: number;
}> = ({ statusText, statusType, delay = 0 }) => {
  const frame = useCurrentFrame();
  const enter = useEnter(delay);

  const float = Math.sin((frame + delay) / 16) * 10;

  const badgeColor =
    statusType === 'stress' ? COLORS.danger : statusType === 'rich' ? COLORS.success : COLORS.yellow;

  const statusLabel =
    statusType === 'stress' ? 'Kondisi: Kewalahan' : statusType === 'rich' ? 'Kondisi: Terotomasi' : 'Profil Bisnis';

  return (
    <div
      style={{
        width: 920,
        backgroundColor: '#121722',
        border: `2px solid ${badgeColor}55`,
        borderRadius: 36,
        padding: '36px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 40px ${badgeColor}22`,
        opacity: enter,
        transform: `translateY(${(1 - enter) * 40 + float}px) scale(${0.9 + enter * 0.1})`,
      }}
    >
      {/* Vector Avatar */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 30,
          backgroundColor: '#1E2536',
          border: `2.5px solid ${badgeColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <UserIcon size={56} color={badgeColor} strokeWidth={2.2} />
      </div>

      {/* Info Budi */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontFamily: FONTS.heading,
              fontSize: 34,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            Budi Pratama
          </span>
          <span
            style={{
              padding: '6px 18px',
              borderRadius: 20,
              backgroundColor: `${badgeColor}22`,
              border: `1.5px solid ${badgeColor}`,
              color: badgeColor,
              fontFamily: FONTS.heading,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            {statusLabel}
          </span>
        </div>
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 24,
            color: COLORS.textSecondary,
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {statusText}
        </span>
      </div>
    </div>
  );
};

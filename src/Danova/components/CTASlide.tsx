// ============================================================
// CTASlide — Reusable Call-to-Action ending slide
// Dipakai sebagai scene terakhir setiap video
// ============================================================

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../brand';
import { FONTS } from '../fonts';
import { Background } from './Background';
import { SlideLayout } from './SlideLayout';
import { Logo } from './Logo';

interface CTASlideProps {
  headline?: string;
  subtext?: string;
  ctaText?: string;
}

export const CTASlide: React.FC<CTASlideProps> = ({
  headline = 'Mau punya website profesional?',
  subtext = 'Konsultasi GRATIS',
  ctaText = 'DM atau klik link di bio 👇',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // CTA button pulse animation
  const pulse = interpolate(
    frame % (fps * 2),
    [0, fps, fps * 2],
    [1, 1.05, 1],
  );

  const ctaProgress = spring({
    frame: frame - 20,
    fps,
    config: SPRING_CONFIG,
  });

  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);
  const ctaTranslateY = interpolate(ctaProgress, [0, 1], [20, 0]);

  return (
    <>
      <Background variant="primary" />
      <SlideLayout justify="center" gap={40}>
        {/* Logo */}
        <Logo size={100} showText delay={5} />

        {/* Headline */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.white,
            textAlign: 'center',
            lineHeight: 1.2,
            marginTop: 20,
          }}
        >
          {headline}
        </div>

        {/* Subtext */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 44,
            fontWeight: 600,
            color: COLORS.yellow,
            textAlign: 'center',
          }}
        >
          {subtext}
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaTranslateY}px) scale(${pulse})`,
            backgroundColor: COLORS.white,
            paddingLeft: 48,
            paddingRight: 48,
            paddingTop: 24,
            paddingBottom: 24,
            borderRadius: 60,
            marginTop: 20,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.heading,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.primary,
            }}
          >
            {ctaText}
          </span>
        </div>

        {/* Username */}
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 28,
            color: `${COLORS.white}BB`,
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          @danovadigitalcom
        </div>
      </SlideLayout>
    </>
  );
};

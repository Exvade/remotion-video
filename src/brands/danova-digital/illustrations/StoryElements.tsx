// ============================================================
// StoryElements — Komponen visual khusus storytelling
// Chat bubble, notifikasi order, & kartu masalah/solusi
// ============================================================

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../brand';
import { FONTS } from '../fonts';

// Bubble chat masuk (WhatsApp / DM Instagram style)
export const ChatBubble: React.FC<{
  text: string;
  sender?: 'customer' | 'budi';
  time?: string;
  delay?: number;
  badge?: string;
}> = ({ text, sender = 'customer', time = '02:14 AM', delay = 0, badge }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [25, 0]);
  const scale = interpolate(progress, [0, 1], [0.85, 1]);

  const isCustomer = sender === 'customer';

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCustomer ? 'flex-start' : 'flex-end',
        width: '100%',
        maxWidth: 720,
      }}
    >
      <div
        style={{
          backgroundColor: isCustomer ? '#1F2937' : COLORS.primary,
          border: `2px solid ${isCustomer ? '#374151' : COLORS.primaryLight}`,
          borderRadius: 24,
          borderBottomLeftRadius: isCustomer ? 4 : 24,
          borderBottomRightRadius: isCustomer ? 24 : 4,
          padding: '18px 26px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {badge && (
          <span
            style={{
              fontFamily: FONTS.heading,
              fontSize: 18,
              fontWeight: 700,
              color: COLORS.orange,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {badge}
          </span>
        )}
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 28,
            color: COLORS.white,
            fontWeight: 500,
          }}
        >
          {text}
        </span>
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 18,
            color: 'rgba(255,255,255,0.5)',
            alignSelf: 'flex-end',
          }}
        >
          {time}
        </span>
      </div>
    </div>
  );
};

// Notifikasi Orderan Masuk (Auto Checkout)
export const OrderNotification: React.FC<{
  orderId: string;
  customerName: string;
  amount: string;
  delay?: number;
}> = ({ orderId, customerName, amount, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [-30, 0]);
  const scale = interpolate(progress, [0, 1], [0.9, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        backgroundColor: '#111827',
        border: `2px solid ${COLORS.success}`,
        borderRadius: 24,
        padding: '20px 28px',
        width: '100%',
        maxWidth: 760,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        boxShadow: `0 10px 30px ${COLORS.success}22`,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: `${COLORS.success}22`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          flexShrink: 0,
        }}
      >
        💰
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: FONTS.heading,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.success,
            }}
          >
            ORDER MASUK ({orderId})
          </span>
          <span style={{ fontSize: 16, color: COLORS.textSecondary, fontFamily: FONTS.body }}>
            Baru saja
          </span>
        </div>
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 26,
            color: COLORS.white,
            fontWeight: 600,
            marginTop: 4,
          }}
        >
          {customerName} • {amount}
        </span>
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 18,
            color: COLORS.electricBlue,
            marginTop: 2,
          }}
        >
          Pembayaran otomatis lunas via Website ✅
        </span>
      </div>
    </div>
  );
};

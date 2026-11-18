// ============================================================
// Danova Digital — Brand Configuration
// Semua warna, font, dan style constants ada di sini.
// JANGAN hardcode warna/font di komponen — selalu import dari sini.
// ============================================================

export const COLORS = {
  // Primary
  primary: '#3366FF',
  primaryLight: '#5588FF',
  primaryDark: '#1144DD',
  electricBlue: '#00D4FF',

  // Energy Accents
  orange: '#FF6B35',
  yellow: '#FFD23F',
  pink: '#FF3D71',

  // Semantic
  success: '#00E676',
  danger: '#FF3D57',

  // Neutrals
  bgDark: '#0D1117',
  surfaceDark: '#161B22',
  cardDark: '#1C2333',
  border: '#30363D',
  white: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#8B949E',
} as const;

export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #3366FF 0%, #8B5CF6 100%)',
  energetic: 'linear-gradient(135deg, #FF6B35 0%, #FFD23F 100%)',
  dark: 'linear-gradient(180deg, #0D1117 0%, #161B22 100%)',
  ocean: 'linear-gradient(135deg, #3366FF 0%, #00D4FF 100%)',
  sunset: 'linear-gradient(135deg, #FF6B35 0%, #FF3D71 100%)',
} as const;

export const FONT_SIZES = {
  hook: 72,
  heading: 56,
  subheading: 40,
  body: 32,
  caption: 24,
  small: 20,
} as const;

export const SPRING_CONFIG = {
  damping: 15,
  stiffness: 120,
  mass: 0.8,
} as const;

export const SPRING_FAST = {
  damping: 20,
  stiffness: 200,
  mass: 0.6,
} as const;

export const SPRING_SLOW = {
  damping: 12,
  stiffness: 80,
  mass: 1,
} as const;

// Video presets
export const VIDEO = {
  REELS: { width: 1080, height: 1920, fps: 30 },
  SQUARE: { width: 1080, height: 1080, fps: 30 },
  LANDSCAPE: { width: 1920, height: 1080, fps: 30 },
} as const;

// Layout
export const LAYOUT = {
  padding: 60,
  contentWidth: 960,  // 1080 - 2*60
  contentHeight: 1800, // 1920 - 2*60
} as const;

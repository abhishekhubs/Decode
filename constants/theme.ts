// VoiceMap — Design System: Dark-mode-first brand palette

import { Platform } from 'react-native';

// ─── Core Palette ────────────────────────────────────────────────────────────
export const Palette = {
  // Primary brand colours
  deepNavy:     '#0B0F1A',
  navySurface:  '#111827',
  navyCard:     '#1A2235',
  navyBorder:   '#1F2D44',

  // Accent
  violet:       '#7C3AED',
  violetLight:  '#A78BFA',
  violetDim:    '#3B1F7A',

  // Semantic
  danger:       '#EF4444',
  dangerDim:    '#7F1D1D',
  dangerLight:  '#FCA5A5',

  warning:      '#F59E0B',
  warningDim:   '#78350F',
  warningLight: '#FCD34D',

  success:      '#10B981',
  successDim:   '#064E3B',
  successLight: '#6EE7B7',

  // Neutrals
  white:        '#FFFFFF',
  grey50:       '#F9FAFB',
  grey100:      '#F3F4F6',
  grey300:      '#D1D5DB',
  grey400:      '#9CA3AF',
  grey500:      '#6B7280',
  grey600:      '#4B5563',
  grey700:      '#374151',
  grey800:      '#1F2937',
  grey900:      '#111827',

  // Glass
  glassBg:      'rgba(255,255,255,0.05)',
  glassBorder:  'rgba(255,255,255,0.10)',
  glassDark:    'rgba(0,0,0,0.40)',
} as const;

// ─── Gradients (start → end) ──────────────────────────────────────────────────
export const Gradients = {
  brand:       ['#7C3AED', '#4F46E5'] as const,
  danger:      ['#EF4444', '#B91C1C'] as const,
  warning:     ['#F59E0B', '#D97706'] as const,
  success:     ['#10B981', '#059669'] as const,
  dark:        ['#0B0F1A', '#111827'] as const,
  card:        ['#1A2235', '#111827'] as const,
  header:      ['#1A0A3B', '#0B0F1A'] as const,
} as const;

// ─── Semantic Theme Maps ──────────────────────────────────────────────────────
export const Colors = {
  light: {
    text:           '#11181C',
    textSecondary:  '#687076',
    background:     '#F9FAFB',
    surface:        '#FFFFFF',
    tint:           '#7C3AED',
    icon:           '#687076',
    tabIconDefault: '#687076',
    tabIconSelected:'#7C3AED',
    border:         '#E5E7EB',
    card:           '#FFFFFF',
  },
  dark: {
    text:           '#ECEDEE',
    textSecondary:  '#9CA3AF',
    background:     Palette.deepNavy,
    surface:        Palette.navySurface,
    tint:           Palette.violetLight,
    icon:           '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected:Palette.violetLight,
    border:         Palette.navyBorder,
    card:           Palette.navyCard,
  },
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────
export const Fonts = Platform.select({
  ios: {
    sans:    'system-ui',
    serif:   'ui-serif',
    rounded: 'ui-rounded',
    mono:    'ui-monospace',
  },
  default: {
    sans:    'normal',
    serif:   'serif',
    rounded: 'normal',
    mono:    'monospace',
  },
  web: {
    sans:    "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif:   "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', Meiryo, 'MS PGothic', sans-serif",
    mono:    "SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
});

// ─── Spacing ──────────────────────────────────────────────────────────────────
export const Spacing = {
  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────
export const Radii = {
  sm:   8,
  md:   12,
  lg:   16,
  xl:   24,
  full: 999,
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────
export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  glow: {
    shadowColor: Palette.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 16,
  },
} as const;

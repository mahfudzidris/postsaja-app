/**
 * Colors — Corporate Trust design system
 * Indigo/Violet dual-tone palette with atmospheric helpers
 */

export const Colors = {
  // Core palette
  primary: '#4F46E5',
  'primary-light': '#EEF2FF',
  secondary: '#7C3AED',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#0F172A',
  muted: '#64748B',
  accent: '#10B981',
  border: '#E2E8F0',
  danger: '#EF4444',
  warning: '#F59E0B',
  amber: '#D97706',
  'amber-light': '#FEF3C7',
  pink: '#E1306C',
  'pink-light': '#FCE7F3',
  sky: '#0088cc',
  'sky-light': '#E0F2FE',
  blue: '#4285F4',
  'blue-light': '#DBEAFE',
  google: '#4285F4',
  facebook: '#1877F2',

  // Gray scale
  'slate-50': '#F8FAFC',
  'slate-100': '#F1F5F9',
  'slate-200': '#E2E8F0',
  'slate-300': '#CBD5E1',
  'slate-400': '#94A3B8',
  'slate-500': '#64748B',
  'slate-600': '#475569',
  'slate-700': '#334155',
  'slate-900': '#0F172A',

  // Indigo family
  indigo: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    900: '#312E81',
  },

  // Violet family
  violet: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
  },

  // Emerald family
  emerald: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    500: '#10B981',
    600: '#059669',
    700: '#065F46',
  },

  // Amber family
  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
  },

  // Red family
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
  },

  // Gradients (arrays for expo-linear-gradient)
  gradient: {
    primary: ['#4F46E5', '#7C3AED'] as const,
    primaryReverse: ['#7C3AED', '#4F46E5'] as const,
    success: ['#10B981', '#059669'] as const,
    hero: ['#EEF2FF', '#EDE9FE'] as const,
    dark: ['#312E81', '#1E1B4B'] as const,
  },

  // Glassmorphism helpers
  glass: {
    background: 'rgba(248, 250, 252, 0.80)',
    border: 'rgba(226, 232, 240, 0.50)',
    light: 'rgba(255, 255, 255, 0.70)',
  },

  // Glow/blur atmospheric colors
  blob: {
    primary: 'rgba(79, 70, 229, 0.15)',
    secondary: 'rgba(124, 58, 237, 0.10)',
    accent: 'rgba(16, 185, 129, 0.08)',
  },
} as const;

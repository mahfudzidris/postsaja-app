/**
 * Shadow tokens — Corporate Trust design system
 * Colored shadows with indigo/violet tint reinforce brand identity
 * Replaces neutral gray shadows
 *
 * Usage:
 *   import { Shadows } from '../constants/shadows';
 *   ...Platform.select({ web: { boxShadow: Shadows.card } }) || Shadows.cardNative
 */

import { Platform } from 'react-native';

// Web boxShadow strings
export const BoxShadows = {
  card: '0 4px 20px -2px rgba(79, 70, 229, 0.10)',
  cardHover: '0 10px 25px -5px rgba(79, 70, 229, 0.15), 0 8px 10px -6px rgba(79, 70, 229, 0.10)',
  button: '0 4px 14px 0 rgba(79, 70, 229, 0.30)',
  buttonHover: '0 6px 20px 0 rgba(79, 70, 229, 0.40)',
  modal: '0 20px 60px -10px rgba(79, 70, 229, 0.25)',
  none: 'none',
} as const;

// React Native shadow objects (softer, platform-native)
export const NativeShadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  card: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  cardHover: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 8,
  },
  button: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 6,
  },
  modal: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 60,
    elevation: 16,
  },
} as const;

/**
 * Cross-platform shadow helper
 * Returns boxShadow string on web, RN shadow object on native
 */
export function shadow(key: keyof typeof BoxShadows) {
  return Platform.select({
    web: { boxShadow: BoxShadows[key] },
    default: NativeShadows[key],
  });
}

export const Shadows = shadow;

/**
 * Typography tokens — Corporate Trust design system
 * Font: Plus Jakarta Sans
 * Scale: Major Third (1.250)
 */

export const FontFamily = {
  sans: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
  // Web fallback
  web: {
    sans: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

export const LineHeight = {
  tight: 1.1,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.7,
} as const;

export const LetterSpacing = {
  tight: -0.3,
  normal: 0,
  wide: 0.5,
} as const;

/**
 * Pre-configured text style presets
 */
export const TextStyles = {
  h1: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.extrabold,
    lineHeight: FontSize['3xl'] * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
  } as const,
  h2: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    lineHeight: FontSize['2xl'] * LineHeight.tight,
  } as const,
  h3: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize.xl * LineHeight.normal,
  } as const,
  subtitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.sm * LineHeight.relaxed,
  } as const,
  body: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.base * LineHeight.relaxed,
  } as const,
  caption: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.xs * LineHeight.normal,
  } as const,
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  } as const,
} as const;

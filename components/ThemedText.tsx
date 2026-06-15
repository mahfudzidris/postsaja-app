import React from 'react';
import { Text, TextProps, StyleSheet, Platform } from 'react-native';

interface ThemedTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: string;
}

const fonts =
  Platform.OS === 'web'
    ? { fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif' }
    : { fontFamily: 'System' };

export function ThemedText({
  variant = 'body',
  color,
  style,
  children,
  ...props
}: ThemedTextProps) {
  return (
    <Text
      style={[
        fonts,
        styles.base,
        styles[variant],
        color ? { color } : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: '#0F172A',
  },
  h1: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
  },
  h3: {
    fontSize: 16,
    fontWeight: '700',
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
  },
  caption: {
    fontSize: 11,
    fontWeight: '400',
    color: '#94A3B8',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    color: '#64748B',
  },
});

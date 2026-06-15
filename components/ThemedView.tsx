import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

interface ThemedViewProps extends ViewProps {
  variant?: 'card' | 'surface' | 'transparent';
}

export function ThemedView({
  variant = 'surface',
  style,
  children,
  ...props
}: ThemedViewProps) {
  return (
    <View style={[styles.base, styles[variant], style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {},
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  surface: {
    backgroundColor: '#FFFFFF',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});

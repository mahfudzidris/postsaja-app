import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

interface ToggleSwitchProps {
  value: boolean;
  onToggle: () => void;
}

export function ToggleSwitch({ value, onToggle }: ToggleSwitchProps) {
  return (
    <TouchableOpacity
      style={[styles.track, value && styles.active]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <View style={[styles.thumb, value && styles.thumbActive]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    borderRadius: 999,
    backgroundColor: '#CBD5E1',
    justifyContent: 'center',
    padding: 2,
  },
  active: {
    backgroundColor: '#4F46E5',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  thumbActive: {
    transform: [{ translateX: 20 }],
  },
});

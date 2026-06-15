import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Icon, IconName } from './Icon';
import { Colors } from '../constants/colors';

interface ChannelButtonProps {
  id: string;
  label: string;
  icon: IconName;
  iconColor: string;
  bgColor: string;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function ChannelButton({
  id,
  label,
  icon,
  iconColor,
  bgColor,
  selected,
  onToggle,
}: ChannelButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selected,
      ]}
      onPress={() => onToggle(id)}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <View style={[styles.iconWrap, { backgroundColor: bgColor }]}>
          <Icon name={icon} size={20} color={iconColor} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Icon
        name={selected ? 'check-circle' : 'circle'}
        size={20}
        color={selected ? Colors.primary : Colors['slate-300']}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
  },
  selected: {
    borderColor: Colors.primary,
    backgroundColor: Colors['primary-light'],
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, IconName } from './Icon';
import { Colors } from '../constants/colors';

interface SettingRowProps {
  label: string;
  subtitle?: string;
  right?: React.ReactNode;
  icon?: IconName;
  iconColor?: string;
  iconBg?: string;
  onPress?: () => void;
}

export function SettingRow({
  label,
  subtitle,
  right,
  icon,
  iconColor = Colors.muted,
  iconBg = Colors['slate-100'],
}: SettingRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {icon && (
          <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
            <Icon name={icon} size={18} color={iconColor} />
          </View>
        )}
        <View>
          <Text style={styles.label}>{label}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {right && <View style={styles.right}>{right}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  subtitle: {
    fontSize: 11,
    color: Colors['slate-400'],
    marginTop: 1,
  },
  right: {},
});

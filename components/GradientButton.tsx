import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from './Icon';
import { Colors } from '../constants/colors';
import { BorderRadius, Spacing } from '../constants/spacing';
import { BoxShadows } from '../constants/shadows';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Feather.glyphMap;
  variant?: 'primary' | 'success';
  size?: 'md' | 'lg';
  rounded?: boolean;
}

export function GradientButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  icon,
  variant = 'primary',
  size = 'md',
  rounded = true,
}: GradientButtonProps) {
  const colors =
    variant === 'success' ? Colors.gradient.success : Colors.gradient.primary;
  const isLarge = size === 'lg';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled || loading}
      style={[
        styles.wrapper,
        rounded && styles.rounded,
        disabled && styles.disabled,
      ]}
    >
      <LinearGradient
        colors={colors as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          isLarge ? styles.sizeLg : styles.sizeMd,
          rounded && styles.rounded,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size={isLarge ? 'small' : 'small'} />
        ) : (
          <View style={styles.content}>
            {icon && (
              <Icon name={icon} size={isLarge ? 20 : 18} color="#FFFFFF" />
            )}
            <Text
              style={[
                styles.text,
                isLarge && styles.textLg,
              ]}
            >
              {title}
            </Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    ...Platform.select({
      web: {
        boxShadow: BoxShadows.button,
      },
      default: {
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 14,
        elevation: 6,
      },
    }),
  },
  rounded: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeMd: {
    height: 48,
    paddingHorizontal: Spacing['2xl'],
  },
  sizeLg: {
    height: 56,
    paddingHorizontal: Spacing['3xl'],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  textLg: {
    fontSize: 17,
    fontWeight: '700',
  },
});

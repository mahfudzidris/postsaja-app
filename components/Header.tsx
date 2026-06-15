import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '../constants/colors';
import { BoxShadows } from '../constants/shadows';
import { FontFamily } from '../constants/typography';

interface HeaderProps {
  variant?: 'default' | 'back';
  title?: string;
  unreadCount?: number;
  rightAction?: React.ReactNode;
}

export default function Header({
  variant = 'default',
  title,
  unreadCount = 0,
  rightAction,
}: HeaderProps) {
  if (variant === 'back') {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backSection}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={22} color={Colors.text} />
          {title && <Text style={styles.titleText}>{title}</Text>}
        </TouchableOpacity>

        <View style={styles.rightSection}>
          {rightAction || (
            <>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.push('/notifications')}
                activeOpacity={0.7}
              >
                <Feather name="bell" size={22} color={Colors.muted} strokeWidth={1.5} />
                {unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.avatarButton}
                onPress={() => router.push('/edit-profile')}
                activeOpacity={0.7}
              >
                <View style={styles.avatar}>
                  <Feather name="user" size={14} color={Colors.muted} />
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoSection}
        onPress={() => router.replace('/(tabs)/create')}
        activeOpacity={0.7}
      >
        <Feather name="send" size={22} color={Colors.primary} strokeWidth={2.5} />
        <Text style={styles.logoText}>PostSaja</Text>
      </TouchableOpacity>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/notifications')}
          activeOpacity={0.7}
        >
          <Feather name="bell" size={22} color={Colors.muted} strokeWidth={1.5} />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatarButton}
          onPress={() => router.push('/edit-profile')}
          activeOpacity={0.7}
        >
          <View style={styles.avatar}>
            <Feather name="user" size={14} color={Colors.muted} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: Colors.glass.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glass.border,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: BoxShadows.none,
      },
    }),
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    color: Colors.text,
    fontFamily: FontFamily.extrabold,
  },
  backSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    fontFamily: FontFamily.bold,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EF4444',
    borderRadius: 999,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  avatarButton: {
    padding: 2,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors['slate-100'],
    borderWidth: 2,
    borderColor: Colors['slate-200'],
    alignItems: 'center',
    justifyContent: 'center',
  },
});

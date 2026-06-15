import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { NotificationItem as NotificationType } from '../types';

interface NotificationItemProps {
  item: NotificationType;
  onRetry?: () => void;
  onPress?: () => void;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 172800) return 'Yesterday';
  return `${Math.floor(diff / 86400)} days ago`;
}

const NOTIF_CONFIG: Record<string, { icon: keyof typeof Feather.glyphMap; bg: string; color: string }> = {
  success: { icon: 'check-circle', bg: '#ECFDF5', color: '#10B981' },
  failure: { icon: 'alert-circle', bg: '#FEF2F2', color: '#EF4444' },
  scheduled: { icon: 'clock', bg: '#EEF2FF', color: '#4F46E5' },
  tip: { icon: 'lightbulb', bg: '#FFFBEB', color: '#D97706' },
};

export function NotificationItemComponent({
  item,
  onRetry,
  onPress,
}: NotificationItemProps) {
  const cfg = NOTIF_CONFIG[item.type] || NOTIF_CONFIG.success;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconWrap, { backgroundColor: cfg.bg }]}>
        <Feather name={cfg.icon} size={20} color={cfg.color} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
        <Text style={styles.time}>{timeAgo(item.created_at)}</Text>
      </View>
      {item.type === 'failure' && onRetry && (
        <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors['slate-100'],
    gap: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  body: {
    fontSize: 12,
    color: Colors['slate-400'],
    marginTop: 4,
  },
  time: {
    fontSize: 10,
    color: Colors['slate-300'],
    marginTop: 6,
  },
  retryBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
  },
  retryText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#EF4444',
  },
});

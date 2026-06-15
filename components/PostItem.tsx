import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Icon } from './Icon';
import { Colors } from '../constants/colors';
import { Post } from '../types';

interface PostItemProps {
  post: Post;
  onPress?: () => void;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: keyof typeof Feather.glyphMap }> = {
  published: { label: 'Posted', color: '#065F46', bg: '#D1FAE5', icon: 'check-circle' },
  scheduled: { label: 'Scheduled', color: '#B45309', bg: '#FEF3C7', icon: 'clock' },
  failed: { label: 'Failed', color: '#B91C1C', bg: '#FEE2E2', icon: 'alert-circle' },
  draft: { label: 'Draft', color: '#475569', bg: '#F1F5F9', icon: 'file-text' },
};

const CHANNEL_CONFIG: Record<string, { label: string; bg: string; color: string; icon: keyof typeof Feather.glyphMap }> = {
  instagram: { label: 'IG', bg: '#FCE7F3', color: '#E1306C', icon: 'camera' },
  tiktok: { label: 'TT', bg: '#F1F5F9', color: '#0F172A', icon: 'music' },
  google_business: { label: 'GBP', bg: '#DBEAFE', color: '#4285F4', icon: 'store' },
  telegram: { label: 'TG', bg: '#E0F2FE', color: '#0088cc', icon: 'send' },
};

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

export function PostItem({ post, onPress }: PostItemProps) {
  const status = STATUS_CONFIG[post.status] || STATUS_CONFIG.draft;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.inner}>
        <View style={styles.thumbnail}>
          <Icon name="image" size={22} color={Colors.muted} />
        </View>
        <View style={styles.content}>
          <Text style={styles.caption} numberOfLines={1}>
            {post.caption}
          </Text>
          <View style={styles.tags}>
            {(post.channels || []).map((ch) => {
              const cfg = CHANNEL_CONFIG[ch];
              if (!cfg) return null;
              return (
                <View key={ch} style={[styles.chTag, { backgroundColor: cfg.bg }]}>
                  <Text style={[styles.chTagText, { color: cfg.color }]}>
                    {cfg.label}
                  </Text>
                </View>
              );
            })}
            <View style={[styles.statusTag, { backgroundColor: status.bg }]}>
              <Icon name={status.icon} size={10} color={status.color} />
              <Text style={[styles.statusText, { color: status.color }]}>
                {status.label}
              </Text>
            </View>
            <Text style={styles.time}>{timeAgo(post.created_at)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors['slate-100'],
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  inner: {
    flexDirection: 'row',
    gap: 12,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  caption: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  chTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  chTagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  time: {
    fontSize: 10,
    color: Colors['slate-400'],
    marginLeft: 'auto',
  },
});

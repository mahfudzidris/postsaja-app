import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface DraftItemProps {
  caption: string;
  mediaCount: number;
  hasVideo: boolean;
  editedAgo: string;
  channels: { id: string; label: string; bg: string; color: string }[];
  onDelete: () => void;
  onPress?: () => void;
}

export function DraftItem({
  caption,
  mediaCount,
  hasVideo,
  editedAgo,
  channels,
  onDelete,
  onPress,
}: DraftItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.inner}>
        <View style={styles.iconBox}>
          <Feather name="file-edit" size={22} color="#D97706" />
        </View>
        <View style={styles.content}>
          <Text style={styles.caption} numberOfLines={2}>
            {caption}
          </Text>
          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <Feather name={hasVideo ? 'video' : 'image'} size={12} color={Colors['slate-400']} />
              <Text style={styles.metaText}>
                {mediaCount} {hasVideo ? 'video' : 'media'}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="clock" size={12} color={Colors['slate-400']} />
              <Text style={styles.metaText}>Edited {editedAgo}</Text>
            </View>
          </View>
          <View style={styles.chTags}>
            {channels.map((ch) => (
              <View key={ch.id} style={[styles.chTag, { backgroundColor: ch.bg }]}>
                <Text style={[styles.chTagText, { color: ch.color }]}>{ch.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
          <Feather name="trash-2" size={18} color={Colors.danger} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
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
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFBEB',
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
  meta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: Colors['slate-400'],
  },
  chTags: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
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
  deleteBtn: {
    padding: 8,
    borderRadius: 8,
  },
});

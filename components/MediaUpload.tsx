import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Icon } from './Icon';
import { Colors } from '../constants/colors';

interface MediaItem {
  uri: string;
  type: 'image' | 'video';
}

interface MediaUploadProps {
  media: MediaItem[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export function MediaUpload({ media, onAdd, onRemove }: MediaUploadProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={[styles.zone, isHovered && styles.zoneHovered]}
        onPress={onAdd}
        activeOpacity={0.8}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <View style={styles.iconCircle}>
          <Icon name="image-plus" size={28} color={Colors.primary} />
        </View>
        <Text style={styles.addText}>Add Media</Text>
        <Text style={styles.hintText}>
          Drag images or video here, or tap to browse
        </Text>
      </TouchableOpacity>

      {media.length > 0 && (
        <View style={styles.previews}>
          {media.map((item, index) => (
            <View key={index} style={styles.thumb}>
              {item.type === 'image' ? (
                <Image source={{ uri: item.uri }} style={styles.thumbImage} />
              ) : (
                <View style={[styles.thumbImage, styles.videoThumb]}>
                  <Icon name="play" size={16} color="#FFF" />
                </View>
              )}
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => onRemove(index)}
              >
                <Icon name="x" size={12} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  zone: {
    width: '100%',
    aspectRatio: Platform.OS === 'web' ? 16 / 9 : 1,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors['slate-200'],
    backgroundColor: Colors.surface,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  zoneHovered: {
    borderColor: Colors.primary,
    backgroundColor: '#F8FAFC',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors['primary-light'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  hintText: {
    fontSize: 14,
    color: Colors['slate-400'],
    textAlign: 'center',
  },
  previews: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors['slate-200'],
    position: 'relative',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  videoThumb: {
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtn: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

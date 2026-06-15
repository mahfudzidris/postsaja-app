import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Icon } from '../../components/Icon';
import { Colors } from '../../constants/colors';
import Header from '../../components/Header';
import { ChannelButton } from '../../components/ChannelButton';
import { MediaUpload } from '../../components/MediaUpload';
import { posts } from '../../services/api';
import { CHANNELS } from '../../constants/plans';

interface MediaItem {
  uri: string;
  type: 'image' | 'video';
}

export default function CreateScreen() {
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const toggleChannel = useCallback((id: string) => {
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }, []);

  const handleAddMedia = () => {
    // In a real app, this would open image/video picker
    // For now, add a placeholder
    setMedia((prev) => [
      ...prev,
      { uri: 'https://via.placeholder.com/150', type: 'image' },
    ]);
  };

  const handleRemoveMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAiTweak = () => {
    if (!caption.trim()) {
      Alert.alert('Add Content', 'Please write a product description first.');
      return;
    }
    setAiLoading(true);
    // Simulate AI optimization
    setTimeout(() => {
      setCaption(
        `🔥 LIMITED OFFER: ${caption}\n\nVisit us today! #SupportLocal #DealOfTheDay`
      );
      setAiLoading(false);
    }, 1200);
  };

  const handleSaveDraft = async () => {
    if (!caption.trim() && media.length === 0) {
      Alert.alert('Empty Draft', 'Add a caption or media before saving as draft.');
      return;
    }
    try {
      await posts.create({
        caption,
        channels: selectedChannels,
        status: 'draft',
        media: media.map((m) => m.uri),
      });
      Alert.alert('Saved!', 'Draft saved successfully.');
    } catch {
      Alert.alert('Error', 'Failed to save draft.');
    }
  };

  const handlePost = async () => {
    if (selectedChannels.length === 0) {
      Alert.alert('Select Channels', 'Please select at least one channel to post.');
      return;
    }
    if (!caption.trim()) {
      Alert.alert('Add Content', 'Please write a product description first.');
      return;
    }

    setLoading(true);
    try {
      await posts.create({
        caption,
        channels: selectedChannels,
        status: 'published',
        media: media.map((m) => m.uri),
      });
      Alert.alert('Posted!', 'Your content has been published.');
      setCaption('');
      setMedia([]);
      setSelectedChannels([]);
    } catch {
      Alert.alert('Error', 'Failed to publish post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header />
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Media Upload */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Content Media</Text>
        <MediaUpload
          media={media}
          onAdd={handleAddMedia}
          onRemove={handleRemoveMedia}
        />
      </View>

      {/* Caption / AI Tweak */}
      <View style={styles.captionCard}>
        <View style={styles.captionHeader}>
          <Text style={styles.captionLabel}>Product Details</Text>
          <TouchableOpacity
            style={styles.aiBtn}
            onPress={handleAiTweak}
            disabled={aiLoading}
            activeOpacity={0.7}
          >
            {aiLoading ? (
              <ActivityIndicator size="small" color="#065F46" />
            ) : (
              <>
                <Icon name="wand" size={14} color="#065F46" />
                <Text style={styles.aiBtnText}>AI Tweak</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.captionInput}
          placeholder="What are you selling today? Describe your product or service..."
          placeholderTextColor={Colors['slate-400']}
          value={caption}
          onChangeText={setCaption}
          multiline
          textAlignVertical="top"
        />
        <View style={styles.captionHint}>
          <Icon name="info" size={14} color={Colors['slate-400']} />
          <Text style={styles.captionHintText}>
            Optimize for local audiences with one click.
          </Text>
        </View>
      </View>

      {/* Channel Selection */}
      <View style={styles.section}>
        <Text style={styles.channelTitle}>Where to post?</Text>
        <View style={styles.channelList}>
          {CHANNELS.map((ch) => (
            <ChannelButton
              key={ch.id}
              id={ch.id}
              label={ch.label}
              icon={ch.icon}
              iconColor={ch.color}
              bgColor={ch.bg}
              selected={selectedChannels.includes(ch.id)}
              onToggle={toggleChannel}
            />
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.postBtn, loading && { opacity: 0.7 }]}
          onPress={handlePost}
          disabled={loading}
          activeOpacity={0.9}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Text style={styles.postBtnText}>Post Saja!</Text>
              <Icon name="send" size={20} color="#FFF" />
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.draftBtn}
          onPress={handleSaveDraft}
          activeOpacity={0.8}
        >
          <Icon name="save" size={18} color={Colors['slate-600']} />
          <Text style={styles.draftBtnText}>Save as Draft</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    gap: 24,
    paddingBottom: 40,
  },
  section: {
    paddingTop: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors['slate-500'],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  captionCard: {
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
  captionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  captionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors['slate-500'],
  },
  aiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ECFDF5',
    borderRadius: 999,
  },
  aiBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
  },
  captionInput: {
    width: '100%',
    minHeight: 120,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  captionHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  captionHintText: {
    fontSize: 12,
    color: Colors['slate-400'],
  },
  channelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  channelList: {
    gap: 8,
  },
  actions: {
    gap: 12,
    paddingTop: 8,
  },

  draftBtn: {
    width: '100%',
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors['slate-200'],
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  draftBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors['slate-600'],
  },
});

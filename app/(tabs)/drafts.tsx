import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Icon } from '../../components/Icon';
import { Colors } from '../../constants/colors';
import Header from '../../components/Header';
import { DraftItem } from '../../components/DraftItem';
import { posts as postsApi } from '../../services/api';
import { Post } from '../../types';
import { CHANNELS } from '../../constants/plans';

export default function DraftsScreen() {
  const [drafts, setDrafts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDrafts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      const response = await postsApi.drafts();
      const data = response.data?.data || response.data || [];
      setDrafts(Array.isArray(data) ? data : []);
    } catch {
      // Use mock data on failure
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  const handleDelete = (id: number) => {
    Alert.alert('Delete Draft', 'Are you sure you want to delete this draft?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await postsApi.delete(id);
            setDrafts((prev) => prev.filter((d) => d.id !== id));
          } catch {
            Alert.alert('Error', 'Failed to delete draft.');
          }
        },
      },
    ]);
  };

  const getChannelConfig = (id: string) => {
    return CHANNELS.find((c) => c.id === id);
  };

  const renderItem = ({ item }: { item: Post }) => (
    <DraftItem
      caption={item.caption}
      mediaCount={(item.media || []).length}
      hasVideo={item.media?.some((m) => m.includes('video')) || false}
      editedAgo="some time"
      channels={(item.channels || []).map((ch) => {
        const cfg = getChannelConfig(ch);
        return {
          id: ch,
          label: cfg?.label?.slice(0, 2).toUpperCase() || ch.slice(0, 2).toUpperCase(),
          bg: cfg?.bg || '#F1F5F9',
          color: cfg?.color || '#64748B',
        };
      })}
      onDelete={() => handleDelete(item.id)}
    />
  );

  if (loading && drafts.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Header />
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={drafts}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => fetchDrafts(true)} tintColor={Colors.primary} />
      }
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.title}>Drafts</Text>
          <Text style={styles.subtitle}>
            {drafts.length} saved {drafts.length === 1 ? 'draft' : 'drafts'}
          </Text>
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Icon name="file-text" size={36} color={Colors['slate-300']} />
          </View>
          <Text style={styles.emptyTitle}>No drafts yet</Text>
          <Text style={styles.emptySubtitle}>Save your work-in-progress here</Text>
        </View>
      )}
    />
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
    gap: 12,
    paddingBottom: 96,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors['slate-400'],
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors['primary-light'],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors['slate-400'],
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors['slate-300'],
    marginTop: 4,
  },
});

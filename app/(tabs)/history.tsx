import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '../../constants/colors';
import Header from '../../components/Header';
import { PostItem } from '../../components/PostItem';
import { LoadMoreButton } from '../../components/LoadMoreButton';
import { posts as postsApi } from '../../services/api';
import { Post } from '../../types';

const INITIAL_SHOWN = 3;

export default function HistoryScreen() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = useCallback(async (pageNum = 1, isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      const response = await postsApi.all(pageNum);
      const data = response.data?.data || response.data || [];
      if (pageNum === 1) {
        setAllPosts(Array.isArray(data) ? data : []);
      } else {
        setAllPosts((prev) => [...prev, ...(Array.isArray(data) ? data : [])]);
      }
      setHasMore(Array.isArray(data) && data.length > 0);
    } catch (err) {
      setError('Failed to load posts. Pull to retry.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  const onRefresh = () => {
    setPage(1);
    setExpanded(false);
    fetchPosts(1, true);
  };

  const onLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  const onToggle = () => {
    setExpanded(!expanded);
  };

  const displayedPosts = expanded ? allPosts : allPosts.slice(0, INITIAL_SHOWN);

  const renderItem = ({ item }: { item: Post }) => (
    <PostItem post={item} />
  );

  if (loading && allPosts.length === 0) {
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
      data={displayedPosts}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
      }
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Post History</Text>
            <Text style={styles.subtitle}>Your recent cross-posts</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
            <Feather name="filter" size={14} color={Colors['slate-600']} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Feather name="clock" size={36} color={Colors['slate-300']} />
          </View>
          <Text style={styles.emptyTitle}>No posts yet</Text>
          <Text style={styles.emptySubtitle}>Create your first post above</Text>
        </View>
      )}
      ListFooterComponent={() => (
        <>
          {error && (
            <View style={styles.errorBox}>
              <Feather name="alert-circle" size={14} color="#EF4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          {allPosts.length > INITIAL_SHOWN && (
            <LoadMoreButton
              loading={loading}
              expanded={expanded}
              onToggle={onToggle}
            />
          )}
        </>
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
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors['slate-200'],
    borderRadius: 12,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors['slate-600'],
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
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 13,
    color: '#DC2626',
    flex: 1,
  },
});

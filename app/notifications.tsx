import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '../constants/colors';
import { NotificationItemComponent } from '../components/NotificationItem';
import { notifications as notificationsApi } from '../services/api';
import { NotificationItem } from '../types';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationsApi.all();
      const data = response.data?.data || response.data || [];
      setNotifications(Array.isArray(data) ? data : []);
    } catch {
      // Use empty state on error
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationsApi.markAllRead();
      setNotifications((prev) =>
        prev.map((n) => (n.read_at ? n : { ...n, read_at: new Date().toISOString() }))
      );
    } catch {
      // Silent fail
    }
  };

  const handleMarkRead = async (id: number) => {
    try {
      await notificationsApi.markRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n))
      );
    } catch {
      // Silent fail
    }
  };

  const today = notifications.filter((n) => {
    const d = new Date(n.created_at);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  });

  const thisWeek = notifications.filter((n) => {
    const d = new Date(n.created_at);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
    return diffDays > 0 && diffDays <= 7;
  });

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Feather name="arrow-left" size={22} color={Colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>Stay updated on your posts</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.markAllBtn} onPress={handleMarkAllRead} activeOpacity={0.7}>
          <Text style={styles.markAllText}>Mark All Read</Text>
        </TouchableOpacity>
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Feather name="bell" size={36} color={Colors['slate-300']} />
          </View>
          <Text style={styles.emptyTitle}>No notifications</Text>
          <Text style={styles.emptySubtitle}>You're all caught up!</Text>
        </View>
      ) : (
        <>
          {/* Today */}
          {today.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Today</Text>
              <View style={styles.notifList}>
                {today.map((item) => (
                  <NotificationItemComponent
                    key={item.id}
                    item={item}
                    onPress={() => handleMarkRead(item.id)}
                    onRetry={() => {}}
                  />
                ))}
              </View>
            </View>
          )}

          {/* This Week */}
          {thisWeek.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>This Week</Text>
              <View style={styles.notifList}>
                {thisWeek.map((item) => (
                  <NotificationItemComponent
                    key={item.id}
                    item={item}
                    onPress={() => handleMarkRead(item.id)}
                  />
                ))}
              </View>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    gap: 24,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    padding: 8,
    borderRadius: 12,
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
  markAllBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors['slate-200'],
    borderRadius: 12,
  },
  markAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors['slate-500'],
  },
  section: {},
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors['slate-400'],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  notifList: {
    gap: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
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

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Icon } from '../../components/Icon';
import { router } from 'expo-router';
import { Colors } from '../../constants/colors';
import Header from '../../components/Header';
import { SettingRow } from '../../components/SettingRow';
import { ToggleSwitch } from '../../components/ToggleSwitch';
import { AuthService } from '../../services/auth';
import api from '../../services/api';
import { User } from '../../types';
import { POSTING_TIMES, LANGUAGES, APP_VERSION } from '../../constants/plans';

export default function SettingsScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [postSuccess, setPostSuccess] = useState(true);
  const [postFailures, setPostFailures] = useState(true);
  const [marketingTips, setMarketingTips] = useState(false);
  const [defaultTime, setDefaultTime] = useState('12:00');
  const [language, setLanguage] = useState('en');
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [platformsLoading, setPlatformsLoading] = useState(false);

  useEffect(() => {
    loadUser();
    fetchPlatforms();
  }, []);

  // Listen for OAuth popup messages
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'social_connected') {
        fetchPlatforms();
        Alert.alert('Connected!', `${event.data.platform} connected successfully.`);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const loadUser = async () => {
    const cached = await AuthService.getCachedUser();
    if (cached) setUser(cached);
  };

  const fetchPlatforms = async () => {
    setPlatformsLoading(true);
    try {
      const res = await api.get('/platforms');
      setPlatforms(res.data.platforms || []);
    } catch {
      // Use empty
    } finally {
      setPlatformsLoading(false);
    }
  };

  const handleConnect = async (platformId: string) => {
    try {
      // First, get the connection info from backend
      const res = await api.post(`/platforms/${platformId}/connect`);
      const data = res.data;

      if (data.auth_type === 'oauth' && data.redirect_url) {
        // Open OAuth popup window
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.innerWidth - width) / 2;
        const top = window.screenY + (window.innerHeight - height) / 2;
        const popup = window.open(
          data.redirect_url,
          `${platformId}Auth`,
          `width=${width},height=${height},left=${left},top=${top},popup=1`
        );

        if (!popup) {
          // Fallback: direct navigation
          window.location.href = data.redirect_url;
          return;
        }

        // Show a message that we're waiting
        Alert.alert(
          'Waiting for authorization',
          `Complete the ${platformId} login in the popup window. This page will refresh automatically after connection.`
        );

        // Poll for popup close, then refresh
        const checkPopup = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkPopup);
            fetchPlatforms();
            Alert.alert('Connected!', `${platformId} account connected.`);
          }
        }, 1000);
      } else if (data.auth_type === 'api_key') {
        // Manual token entry for platforms that don't have OAuth configured
        const metaInput = window.prompt(`Enter your ${platformId} access token:`);
        if (!metaInput) return;

        await api.post(`/platforms/${platformId}/callback`, {
          access_token: metaInput,
        });
        Alert.alert('Connected!', `${platformId} connected successfully.`);
        fetchPlatforms();
      } else {
        Alert.alert('Info', data.message || 'Connect initiated.');
      }
    } catch (err: any) {
      // If the backend doesn't have OAuth configured, try direct prompt
      const token = window.prompt(`Enter your ${platformId} access token (for manual setup):`);
      if (!token) return;
      try {
        await api.post(`/platforms/${platformId}/callback`, {
          access_token: token,
        });
        Alert.alert('Connected!', `${platformId} connected successfully.`);
        fetchPlatforms();
      } catch (err2: any) {
        Alert.alert('Error', err2?.response?.data?.message || 'Failed to connect.');
      }
    }
  };

  const handleDisconnect = async (platformId: string) => {
    try {
      await api.delete(`/platforms/${platformId}/disconnect`);
      fetchPlatforms();
    } catch {
      // ignore
    }
  };

  const handleSignOut = async () => {
    try {
      await AuthService.logout();
      router.replace('/(auth)/login');
    } catch {
      router.replace('/(auth)/login');
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert('Delete Account', 'This action cannot be undone. Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {} },
    ]);
  };

  const planLabel = user?.plan === 'free' ? 'Free Plan' : user?.plan === 'basic' ? 'Basic Plan' : 'Pro Plan';
  const planColor = user?.plan === 'pro' ? Colors.primary : Colors['slate-500'];

  return (
    <View style={styles.wrapper}>
      <Header />
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your account and preferences</Text>
      </View>

      {/* Profile Card */}
      <TouchableOpacity
        style={styles.profileCard}
        onPress={() => router.push('/edit-profile')}
        activeOpacity={0.8}
      >
        <View style={styles.profileLeft}>
          <View style={styles.avatar}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            ) : (
              <Icon name="user" size={24} color={Colors['slate-400']} />
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'User'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'user@email.com'}</Text>
            <View style={[styles.planBadge, { backgroundColor: Colors['primary-light'] }]}>
              <Icon name="crown" size={10} color={planColor} />
              <Text style={[styles.planText, { color: planColor }]}>{planLabel}</Text>
            </View>
          </View>
        </View>
        <Icon name="chevron-right" size={20} color={Colors.primary} />
      </TouchableOpacity>

      {/* Connected Accounts */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Connected Accounts</Text>
        <View style={styles.accountList}>
          {platformsLoading ? (
            <ActivityIndicator style={{ padding: 16 }} color={Colors.primary} />
          ) : platforms.length === 0 ? (
            <Text style={{ padding: 16, color: Colors['slate-400'], fontSize: 14, textAlign: 'center' }}>
              No platforms available.
            </Text>
          ) : (
            platforms.map((p: any, i: number) => (
              <React.Fragment key={p.id}>
                {i > 0 && <View style={styles.divider} />}
                <SettingRow
                  label={p.name}
                  subtitle={p.connected ? (p.connection?.meta?.username || p.connection?.meta?.email || 'Connected') : 'Not connected'}
                  icon={p.icon || 'circle'}
                  iconColor={
                    p.id === 'instagram' ? '#E1306C' :
                    p.id === 'tiktok' ? '#0F172A' :
                    p.id === 'google_business' ? '#4285F4' :
                    p.id === 'telegram' ? '#0088cc' :
                    p.id === 'facebook' ? '#1877F2' :
                    p.id === 'twitter' ? '#1DA1F2' : Colors.primary
                  }
                  iconBg={
                    p.id === 'instagram' ? '#FCE7F3' :
                    p.id === 'tiktok' ? '#F1F5F9' :
                    p.id === 'google_business' ? '#DBEAFE' :
                    p.id === 'telegram' ? '#E0F2FE' :
                    p.id === 'facebook' ? '#E7F3FF' :
                    p.id === 'twitter' ? '#E8F5FE' : Colors['primary-light']
                  }
                  right={
                    p.connected ? (
                      <TouchableOpacity
                        style={styles.disconnectBtn}
                        onPress={() => handleDisconnect(p.id)}
                        activeOpacity={0.7}
                      >
                        <Icon name="link" size={11} color="#DC2626" />
                        <Text style={[styles.connectedText, { color: '#DC2626' }]}>Disconnect</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.connectBtn}
                        onPress={() => handleConnect(p.id)}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.connectBtnText}>Connect</Text>
                      </TouchableOpacity>
                    )
                  }
                />
              </React.Fragment>
            ))
          )}
        </View>
      </View>

      {/* Notification Preferences */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notifications</Text>
        <View style={styles.settingList}>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Post Success</Text>
              <Text style={styles.settingSub}>Notify when a post is published</Text>
            </View>
            <ToggleSwitch value={postSuccess} onToggle={() => setPostSuccess(!postSuccess)} />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Post Failures</Text>
              <Text style={styles.settingSub}>Alert when a post fails</Text>
            </View>
            <ToggleSwitch value={postFailures} onToggle={() => setPostFailures(!postFailures)} />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Marketing Tips</Text>
              <Text style={styles.settingSub}>Weekly tips & insights</Text>
            </View>
            <ToggleSwitch value={marketingTips} onToggle={() => setMarketingTips(!marketingTips)} />
          </View>
        </View>
      </View>

      {/* App Preferences */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Preferences</Text>
        <View style={styles.settingList}>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Default Posting Time</Text>
              <Text style={styles.settingSub}>Schedule posts at optimal times</Text>
            </View>
            <TouchableOpacity style={styles.selectBtn} activeOpacity={0.7}>
              <Text style={styles.selectText}>
                {POSTING_TIMES.find((t) => t.value === defaultTime)?.label || '12:00 PM'}
              </Text>
              <Icon name="chevron-down" size={14} color={Colors['slate-500']} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Language</Text>
              <Text style={styles.settingSub}>App interface language</Text>
            </View>
            <TouchableOpacity style={styles.selectBtn} activeOpacity={0.7}>
              <Text style={styles.selectText}>
                {LANGUAGES.find((l) => l.value === language)?.label || 'English'}
              </Text>
              <Icon name="chevron-down" size={14} color={Colors['slate-500']} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Account Section */}
      <View style={[styles.card, styles.dangerCard]}>
        <Text style={[styles.cardTitle, { color: '#EF4444' }]}>Account</Text>
        <TouchableOpacity style={styles.dangerRow} onPress={handleSignOut} activeOpacity={0.7}>
          <View style={styles.dangerRowLeft}>
            <Icon name="log-out" size={18} color="#EF4444" />
            <Text style={styles.dangerRowText}>Sign Out</Text>
          </View>
          <Icon name="chevron-right" size={16} color="#EF4444" />
        </TouchableOpacity>
        <View style={[styles.divider, styles.dangerDivider, { borderColor: '#FECACA' }]} />
        <TouchableOpacity style={styles.dangerRow} onPress={handleDeleteAccount} activeOpacity={0.7}>
          <View style={styles.dangerRowLeft}>
            <Icon name="trash-2" size={18} color={Colors['slate-400']} />
            <Text style={[styles.dangerRowText, { color: Colors['slate-400'] }]}>Delete Account</Text>
          </View>
          <Icon name="chevron-right" size={16} color={Colors['slate-300']} />
        </TouchableOpacity>
      </View>

      {/* Version */}
      <Text style={styles.version}>{APP_VERSION}</Text>
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
    paddingBottom: 96,
  },
  header: {
    paddingTop: 16,
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
  profileCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors['slate-100'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#EEF2FF',
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {},
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors['slate-400'],
    marginTop: 2,
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 999,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  planText: {
    fontSize: 10,
    fontWeight: '600',
  },
  card: {
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
  dangerCard: {
    borderColor: '#FECACA',
  },
  dangerDivider: {
    marginVertical: 4,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors['slate-500'],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  accountList: {
    gap: 0,
  },
  settingList: {
    gap: 0,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  settingSub: {
    fontSize: 12,
    color: Colors['slate-400'],
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors['slate-100'],
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#D1FAE5',
  },
  connectedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#065F46',
  },
  connectBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    borderRadius: 999,
  },
  connectBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: Colors['slate-200'],
    borderRadius: 8,
  },
  selectText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors['slate-600'],
  },
  dangerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
  },
  dangerRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dangerRowText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors['slate-300'],
    paddingTop: 8,
  },
});

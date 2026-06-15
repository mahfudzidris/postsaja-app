import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '../../constants/colors';
import Header from '../../components/Header';
import { SettingRow } from '../../components/SettingRow';
import { ToggleSwitch } from '../../components/ToggleSwitch';
import { AuthService } from '../../services/auth';
import { User } from '../../types';
import { POSTING_TIMES, LANGUAGES, APP_VERSION } from '../../constants/plans';

export default function SettingsScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [postSuccess, setPostSuccess] = useState(true);
  const [postFailures, setPostFailures] = useState(true);
  const [marketingTips, setMarketingTips] = useState(false);
  const [defaultTime, setDefaultTime] = useState('12:00');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const cached = await AuthService.getCachedUser();
    if (cached) setUser(cached);
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await AuthService.logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
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
              <Feather name="user" size={24} color={Colors['slate-400']} />
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'User'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'user@email.com'}</Text>
            <View style={[styles.planBadge, { backgroundColor: Colors['primary-light'] }]}>
              <Feather name="crown" size={10} color={planColor} />
              <Text style={[styles.planText, { color: planColor }]}>{planLabel}</Text>
            </View>
          </View>
        </View>
        <Feather name="chevron-right" size={20} color={Colors.primary} />
      </TouchableOpacity>

      {/* Connected Accounts */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Connected Accounts</Text>
        <View style={styles.accountList}>
          <SettingRow
            label="Instagram"
            subtitle="@your_business"
            icon="camera"
            iconColor="#E1306C"
            iconBg="#FCE7F3"
            right={
              <View style={styles.connectedBadge}>
                <Feather name="link" size={11} color="#065F46" />
                <Text style={styles.connectedText}>Connected</Text>
              </View>
            }
          />
          <View style={styles.divider} />
          <SettingRow
            label="TikTok"
            subtitle="@your_business"
            icon="music"
            iconColor="#0F172A"
            iconBg="#F1F5F9"
            right={
              <View style={styles.connectedBadge}>
                <Feather name="link" size={11} color="#065F46" />
                <Text style={styles.connectedText}>Connected</Text>
              </View>
            }
          />
          <View style={styles.divider} />
          <SettingRow
            label="Google Business"
            subtitle="Not connected"
            icon="store"
            iconColor="#4285F4"
            iconBg="#DBEAFE"
            right={
              <TouchableOpacity style={styles.connectBtn} activeOpacity={0.7}>
                <Text style={styles.connectBtnText}>Connect</Text>
              </TouchableOpacity>
            }
          />
          <View style={styles.divider} />
          <SettingRow
            label="Telegram"
            subtitle="Not connected"
            icon="send"
            iconColor="#0088cc"
            iconBg="#E0F2FE"
            right={
              <TouchableOpacity style={styles.connectBtn} activeOpacity={0.7}>
                <Text style={styles.connectBtnText}>Connect</Text>
              </TouchableOpacity>
            }
          />
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
              <Feather name="chevron-down" size={14} color={Colors['slate-500']} />
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
              <Feather name="chevron-down" size={14} color={Colors['slate-500']} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Account Section */}
      <View style={[styles.card, styles.dangerCard]}>
        <Text style={[styles.cardTitle, { color: '#EF4444' }]}>Account</Text>
        <TouchableOpacity style={styles.dangerRow} onPress={handleSignOut} activeOpacity={0.7}>
          <View style={styles.dangerRowLeft}>
            <Feather name="log-out" size={18} color="#EF4444" />
            <Text style={styles.dangerRowText}>Sign Out</Text>
          </View>
          <Feather name="chevron-right" size={16} color="#EF4444" />
        </TouchableOpacity>
        <View style={[styles.divider, { borderColor: '#FECACA' }]} />
        <TouchableOpacity style={styles.dangerRow} onPress={handleDeleteAccount} activeOpacity={0.7}>
          <View style={styles.dangerRowLeft}>
            <Feather name="trash-2" size={18} color={Colors['slate-400']} />
            <Text style={[styles.dangerRowText, { color: Colors['slate-400'] }]}>Delete Account</Text>
          </View>
          <Feather name="chevron-right" size={16} color={Colors['slate-300']} />
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
    paddingBottom: 40,
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

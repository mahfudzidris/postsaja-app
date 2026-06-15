import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { Icon } from 'components/Icon';
import { router } from 'expo-router';
import { Colors } from '../constants/colors';
import Header from '../components/Header';
import { PlanCard } from '../components/PlanCard';
import { AuthService } from '../services/auth';
import { PLANS } from '../constants/plans';
import { User } from '../types';

export default function EditProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const cached = await AuthService.getCachedUser();
    if (cached) {
      setUser(cached);
      setName(cached.name);
      setEmail(cached.email);
      setPhone(cached.phone || '');
      setBusinessName(cached.business_name || '');
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Required', 'Name and email are required.');
      return;
    }
    setSaving(true);
    try {
      // In a real app, call profile.update
      Alert.alert('Saved!', 'Profile updated successfully.');
    } catch {
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const isPro = user?.plan === 'pro';

  return (
    <View style={styles.wrapper}>
      <Header variant="back" title="Edit Profile" />
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Profile Photo */}
      <View style={styles.photoCard}>
        <View style={styles.photoSection}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              {user?.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
              ) : (
                <Icon name="user" size={32} color={Colors['slate-400']} />
              )}
            </View>
            <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
              <Icon name="camera" size={14} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.photoName}>{name || 'User'}</Text>
            <Text style={styles.photoHint}>Tap the camera icon to change photo</Text>
          </View>
        </View>
      </View>

      {/* Personal Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal Information</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={Colors['slate-400']}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="your@email.com"
            placeholderTextColor={Colors['slate-400']}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="+60 12-345 6789"
            placeholderTextColor={Colors['slate-400']}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Business Name</Text>
          <TextInput
            style={styles.input}
            value={businessName}
            onChangeText={setBusinessName}
            placeholder="Your business"
            placeholderTextColor={Colors['slate-400']}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveBtn, saving && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.9}
        >
          {saving ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Icon name="check-circle" size={18} color="#FFF" />
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Subscription Plan */}
      <View style={styles.card}>
        <View style={styles.planSectionTitle}>
          <Icon name="crown" size={18} color={Colors.primary} />
          <Text style={styles.cardTitle}>Subscription Plan</Text>
        </View>

        <View style={styles.plansRow}>
          {PLANS.map((plan, index) => (
            <View key={plan.name} style={styles.planWrapper}>
              <PlanCard
                name={plan.name}
                price={plan.price}
                features={plan.features}
                isActive={plan.name === 'Pro' && isPro}
                isCurrent={plan.name === 'Basic' && !isPro}
              />
            </View>
          ))}
        </View>

        {/* Upgrade CTA if on basic */}
        {!isPro && (
          <View style={styles.upgradeCta}>
            <View style={styles.upgradeIconWrap}>
              <Icon name="zap" size={18} color="#D97706" />
            </View>
            <View style={styles.upgradeContent}>
              <Text style={styles.upgradeTitle}>Want more power?</Text>
              <Text style={styles.upgradeDesc}>
                Upgrade to Pro for unlimited channels, unlimited posts, advanced AI captions, and
                priority support.
              </Text>
              <TouchableOpacity style={styles.upgradeBtn} activeOpacity={0.8}>
                <Text style={styles.upgradeBtnText}>Upgrade to Pro</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  photoCard: {
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
  photoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  photoName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  photoHint: {
    fontSize: 12,
    color: Colors['slate-400'],
    marginTop: 2,
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
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors['slate-500'],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  planSectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors['slate-600'],
    marginBottom: 6,
  },
  input: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: Colors['slate-200'],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.text,
  },
  saveBtn: {
    width: '100%',
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  plansRow: {
    flexDirection: 'row',
    gap: 12,
  },
  planWrapper: {
    flex: 1,
  },
  upgradeCta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  upgradeIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeContent: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400E',
  },
  upgradeDesc: {
    fontSize: 12,
    color: '#B45309',
    marginTop: 2,
  },
  upgradeBtn: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#D97706',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  upgradeBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
});

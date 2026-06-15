import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Icon } from '../../components/Icon';
import { router } from 'expo-router';
import { Colors } from '../../constants/colors';
import { GradientButton } from '../../components/GradientButton';
import { AuthService } from '../../services/auth';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms of Service');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await AuthService.register(name, email, password, confirmPassword);
      router.replace('/(tabs)/create');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth
  };

  const handleFacebookLogin = () => {
    // Placeholder for Facebook OAuth
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Icon name="send" size={28} color={Colors.primary} />
          </View>
          <Text style={styles.appName}>PostSaja</Text>
          <Text style={styles.tagline}>Start posting smarter today</Text>
        </View>

        <Text style={styles.title}>Create your account</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Icon name="alert-circle" size={14} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor={Colors['slate-400']}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor={Colors['slate-400']}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrap}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Min. 8 characters"
                placeholderTextColor={Colors['slate-400']}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} color={Colors['slate-400']} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordWrap}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Re-enter your password"
                placeholderTextColor={Colors['slate-400']}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowConfirm(!showConfirm)}
              >
                <Icon name={showConfirm ? 'eye-off' : 'eye'} size={18} color={Colors['slate-400']} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms */}
          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgreeTerms(!agreeTerms)}
            activeOpacity={0.7}
          >
            <Icon
              name={agreeTerms ? 'check-square' : 'square'}
              size={20}
              color={agreeTerms ? Colors.primary : Colors['slate-300']}
            />
            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          <GradientButton
            title="Create Account"
            icon="user-plus"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Buttons */}
        <View style={styles.socialSection}>
          <TouchableOpacity style={styles.socialBtn} onPress={handleGoogleLogin} activeOpacity={0.8}>
            <Text style={styles.socialBtnText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialBtn, styles.facebookBtn]}
            onPress={handleFacebookLogin}
            activeOpacity={0.8}
          >
            <Text style={[styles.socialBtnText, { color: '#FFF' }]}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  logoSection: { alignItems: 'center', marginBottom: 32 },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors['primary-light'],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5, color: Colors.text },
  tagline: { fontSize: 14, color: Colors['slate-400'], marginTop: 4 },
  title: { fontSize: 20, fontWeight: '700', color: Colors.text, marginBottom: 24 },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: { fontSize: 13, color: '#DC2626', flex: 1 },
  form: { gap: 16 },
  field: { gap: 6 },
  label: { fontSize: 12, fontWeight: '600', color: Colors['slate-600'] },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors['slate-200'],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: Colors.text,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      },
    }),
  },
  passwordWrap: { position: 'relative' },
  passwordInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors['slate-200'],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingRight: 44,
    fontSize: 14,
    color: Colors.text,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      },
    }),
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
    padding: 4,
  },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  termsText: { fontSize: 12, color: Colors['slate-400'], flex: 1, lineHeight: 18 },
  termsLink: { fontWeight: '600', color: Colors.primary },

  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors['slate-200'] },
  dividerText: { fontSize: 12, fontWeight: '600', color: Colors['slate-400'] },
  socialSection: { gap: 12 },
  socialBtn: {
    width: '100%',
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors['slate-200'],
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookBtn: { backgroundColor: '#1877F2', borderWidth: 0 },
  socialBtnText: { fontSize: 14, fontWeight: '600', color: Colors.text },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontSize: 14, color: Colors['slate-400'] },
  footerLink: { fontSize: 14, fontWeight: '700', color: Colors.primary },
});

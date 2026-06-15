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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await AuthService.login(email, password);
      router.replace('/(tabs)/create');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
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
          <Text style={styles.tagline}>
            Post to all your channels with one click
          </Text>
        </View>

        {/* Welcome */}
        <Text style={styles.welcomeText}>Welcome back</Text>

        {/* Error */}
        {error ? (
          <View style={styles.errorBox}>
            <Icon name="alert-circle" size={14} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Form */}
        <View style={styles.form}>
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
                placeholder="Enter your password"
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
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={18}
                  color={Colors['slate-400']}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.forgotRow}>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <GradientButton
            title="Sign In"
            icon="log-in"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            rounded={false}
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
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.socialBtnText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialBtn, styles.facebookBtn]}
            onPress={handleFacebookLogin}
            activeOpacity={0.8}
          >
            <Text style={[styles.socialBtnText, { color: '#FFF' }]}>
              Continue with Facebook
            </Text>
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.footerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors['primary-light'],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: Colors.text,
  },
  tagline: {
    fontSize: 14,
    color: Colors['slate-400'],
    marginTop: 4,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 24,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    color: '#DC2626',
    flex: 1,
  },
  form: {
    gap: 16,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors['slate-600'],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
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
  passwordWrap: {
    position: 'relative',
  },
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
  forgotRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors['slate-200'],
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors['slate-400'],
  },
  socialSection: {
    gap: 12,
  },
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
  facebookBtn: {
    backgroundColor: '#1877F2',
    borderWidth: 0,
  },
  socialBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: Colors['slate-400'],
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
});

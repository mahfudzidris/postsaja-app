import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

interface SocialButtonProps {
  provider: 'google' | 'facebook';
  onPress: () => void;
}

function GoogleIcon() {
  const React = require('react');
  const { View } = require('react-native');
  return (
    <View>
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
        <path d="M43.611 20.083H42V20H24V28H35.303C34.061 32.281 30.074 35.5 25.5 35.5C19.701 35.5 15 30.799 15 25C15 19.201 19.701 14.5 25.5 14.5C28.118 14.5 30.475 15.528 32.22 17.155L37.912 11.463C34.918 8.728 30.99 7 25.5 7C15.651 7 7.5 15.151 7.5 25C7.5 34.849 15.651 43 25.5 43C35.349 43 43.5 34.849 43.5 25C43.5 23.332 43.311 21.706 43.611 20.083Z" fill="#4285F4"/>
        <path d="M6.906 15.305L13.543 20.125C14.888 16.034 18.504 13 22.5 13C25.118 13 27.476 14.028 29.22 15.655L34.912 9.963C31.918 7.228 27.99 5.5 22.5 5.5C14.599 5.5 7.747 10.278 6.906 15.305Z" fill="#34A853"/>
        <path d="M25.5 43C30.916 43 34.774 41.326 37.738 38.707L31.565 33.438C29.894 34.669 27.826 35.5 25.5 35.5C21.395 35.5 17.704 32.343 16.477 28.206L9.917 33.19C10.737 38.221 17.58 43 25.5 43Z" fill="#FBBC05"/>
        <path d="M43.611 20.083H42V20H24V28H35.303C34.697 30.038 33.496 31.807 31.848 33.084C31.851 33.081 31.855 33.079 31.859 33.076L38.034 38.345C37.672 38.672 43.5 34.25 43.5 25C43.5 23.332 43.311 21.706 43.611 20.083Z" fill="#EA4335"/>
      </svg>
    </View>
  );
}

export function SocialButton({ provider, onPress }: SocialButtonProps) {
  const isGoogle = provider === 'google';
  return (
    <TouchableOpacity
      style={[
        styles.button,
        !isGoogle && styles.facebook,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <GoogleIcon />
      <Text style={[styles.text, !isGoogle && styles.facebookText]}>
        Continue with {isGoogle ? 'Google' : 'Facebook'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  facebook: {
    backgroundColor: '#1877F2',
    borderWidth: 0,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  facebookText: {
    color: '#FFFFFF',
  },
});

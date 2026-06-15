import React, { useEffect, useState, useCallback } from 'react';
import { Stack } from 'expo-router';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Platform,
  Text,
} from 'react-native';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { Colors } from '../constants/colors';

/**
 * Global font style for web to inject @font-face fallback
 */
export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // Ensure Google Fonts CDN link exists (already in public/index.html for production)
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const existing = document.querySelector('link[href*="fonts.googleapis.com/css2?family=Plus+Jakarta+Sans"]');
      if (!existing) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
        document.head.appendChild(link);
      }
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      // Short delay to let splash show
      const timer = setTimeout(() => setIsAuthReady(true), 200);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, fontsError]);

  if (!isAuthReady) {
    return (
      <View style={styles.loading}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="edit-profile" options={{ presentation: 'modal' }} />
        <Stack.Screen name="notifications" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
});

import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AuthService } from '../services/auth';
import { Colors } from '../constants/colors';

export default function IndexScreen() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isAuthenticated = await AuthService.isAuthenticated();
      if (isAuthenticated) {
        router.replace('/(tabs)/create');
      } else {
        router.replace('/(auth)/login');
      }
    } catch {
      router.replace('/(auth)/login');
    } finally {
      setReady(true);
    }
  };

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
});

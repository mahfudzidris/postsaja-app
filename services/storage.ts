import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const StorageService = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (isWeb) {
        return localStorage.getItem(key);
      } else {
        const SecureStore = await import('expo-secure-store');
        return SecureStore.getItemAsync(key);
      }
    } catch {
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (isWeb) {
        localStorage.setItem(key, value);
      } else {
        const SecureStore = await import('expo-secure-store');
        await SecureStore.setItemAsync(key, value);
      }
    } catch {
      // Silently fail
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      if (isWeb) {
        localStorage.removeItem(key);
      } else {
        const SecureStore = await import('expo-secure-store');
        await SecureStore.deleteItemAsync(key);
      }
    } catch {
      // Silently fail
    }
  },
};

import * as SecureStore from 'expo-secure-store';
import { auth as authApi } from './api';
import { User } from '../types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'cached_user';

export const AuthService = {
  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  async removeToken(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  },

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await authApi.login(email, password);
    const { token, user } = response.data;
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    if (user) {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    }
    return { token, user };
  },

  async register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<{ token: string; user: User }> {
    const response = await authApi.register(name, email, password, passwordConfirmation);
    const { token, user } = response.data;
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    if (user) {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    }
    return { token, user };
  },

  async logout(): Promise<void> {
    try {
      await authApi.logout();
    } catch {
      // Ignore errors on logout
    }
    await this.removeToken();
  },

  async getCachedUser(): Promise<User | null> {
    try {
      const data = await SecureStore.getItemAsync(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async fetchUser(): Promise<User> {
    const response = await authApi.user();
    const user = response.data;
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    return user;
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  },
};

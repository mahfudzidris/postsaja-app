import { StorageService } from './storage';
import { auth as authApi } from './api';
import { User } from '../types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'cached_user';

export const AuthService = {
  async getToken(): Promise<string | null> {
    return StorageService.getItem(TOKEN_KEY);
  },

  async setToken(token: string): Promise<void> {
    await StorageService.setItem(TOKEN_KEY, token);
  },

  async removeToken(): Promise<void> {
    await StorageService.removeItem(TOKEN_KEY);
    await StorageService.removeItem(USER_KEY);
  },

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await authApi.login(email, password);
    const { token, user } = response.data;
    await StorageService.setItem(TOKEN_KEY, token);
    if (user) {
      await StorageService.setItem(USER_KEY, JSON.stringify(user));
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
    await StorageService.setItem(TOKEN_KEY, token);
    if (user) {
      await StorageService.setItem(USER_KEY, JSON.stringify(user));
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
      const data = await StorageService.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async fetchUser(): Promise<User> {
    const response = await authApi.user();
    const user = response.data;
    await StorageService.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  },
};

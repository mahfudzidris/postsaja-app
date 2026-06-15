import axios from 'axios';
import { StorageService } from './storage';

const api = axios.create({
  baseURL: 'https://postsaja-backend-main-60lgtj.laravel.cloud/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor to attach auth token
api.interceptors.request.use(async (config) => {
  try {
    const token = await StorageService.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Ignore errors
  }
  return config;
});

// Interceptor for 401 responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await StorageService.removeItem('auth_token');
      await StorageService.removeItem('cached_user');
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: (email: string, password: string) =>
    api.post('/login', { email, password }),
  register: (name: string, email: string, password: string, passwordConfirmation: string) =>
    api.post('/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),
  logout: () => api.post('/logout'),
  user: () => api.get('/user'),
};

export const profile = {
  get: () => api.get('/profile'),
  update: (data: any) => api.put('/profile', data),
  updatePassword: (data: any) => api.put('/profile/password', data),
};

export const posts = {
  all: (page = 1) => api.get('/posts', { params: { page } }),
  drafts: () => api.get('/posts/drafts'),
  create: (data: any) => api.post('/posts', data),
  update: (id: number, data: any) => api.put(`/posts/${id}`, data),
  delete: (id: number) => api.delete(`/posts/${id}`),
  publish: (id: number) => api.post(`/posts/${id}/publish`),
  show: (id: number) => api.get(`/posts/${id}`),
};

export const notifications = {
  all: () => api.get('/notifications'),
  markRead: (id: number) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
};

export const plans = {
  list: () => api.get('/plans'),
  current: () => api.get('/plan/current'),
};

export default api;

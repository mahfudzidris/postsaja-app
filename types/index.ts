export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  business_name?: string;
  avatar?: string;
  plan: 'free' | 'basic' | 'pro';
  created_at: string;
}

export interface Post {
  id: number;
  caption: string;
  media: string[];
  channels: string[];
  status: 'draft' | 'published' | 'scheduled' | 'failed';
  scheduled_at?: string;
  analytics?: any;
  created_at: string;
}

export interface NotificationItem {
  id: number;
  type: string;
  title: string;
  body: string;
  data?: any;
  read_at?: string | null;
  created_at: string;
}

export interface Plan {
  name: string;
  price: number;
  features: string[];
}

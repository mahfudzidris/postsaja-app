export const PLANS = [
  {
    name: 'Basic',
    price: 29,
    features: [
      '2 social channels',
      '10 posts/month',
      'Basic AI caption',
    ],
  },
  {
    name: 'Pro',
    price: 49,
    features: [
      'Unlimited channels',
      'Unlimited posts',
      'Advanced AI + analytics',
      'Priority support',
    ],
  },
];

export const POSTING_TIMES = [
  { label: '9:00 AM', value: '09:00' },
  { label: '12:00 PM', value: '12:00' },
  { label: '3:00 PM', value: '15:00' },
  { label: '6:00 PM', value: '18:00' },
  { label: '8:00 PM', value: '20:00' },
];

export const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Bahasa Melayu', value: 'ms' },
  { label: '中文', value: 'zh' },
];

export const CHANNELS = [
  { id: 'instagram', label: 'Instagram', icon: 'camera' as const, color: '#E1306C', bg: '#FCE7F3' },
  { id: 'tiktok', label: 'TikTok', icon: 'music' as const, color: '#0F172A', bg: '#F1F5F9' },
  { id: 'google_business', label: 'Google Business', icon: 'store' as const, color: '#4285F4', bg: '#DBEAFE' },
  { id: 'telegram', label: 'Telegram', icon: 'send' as const, color: '#0088cc', bg: '#E0F2FE' },
];

export const APP_VERSION = 'PostSaja v1.0.0';

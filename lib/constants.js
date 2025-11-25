/**
 * Constants dan Configuration untuk PromptCraft
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Supabase Configuration (untuk integrasi nanti)
export const SUPABASE_CONFIG = {
  URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  PROMPT_HISTORY: 'promptHistory',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  FAVORITES: 'favorites',
  RECENT_SEARCHES: 'recentSearches',
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'PromptCraft',
  DESCRIPTION: 'Transform your simple ideas into powerful AI prompts',
  VERSION: '2.0.0',
  MAX_HISTORY_ITEMS: 10,
  MAX_FAVORITES: 50,
  DEBOUNCE_DELAY: 300, // milliseconds
  TOAST_DURATION: 3000, // milliseconds
};

// Prompt Configuration
export const PROMPT_CONFIG = {
  MIN_LENGTH: 10,
  MAX_LENGTH: 5000,
  SUGGESTIONS: [
    "a dynamic logo for an agile cybersecurity firm",
    "a minimalist website design for a coffee shop",
    "an engaging social media post about AI innovation",
    "a professional email template for client onboarding",
    "a creative marketing campaign for eco-friendly products",
    "a user-friendly mobile app interface for fitness tracking",
    "a compelling product description for smart home devices",
    "an informative blog post about sustainable living",
  ],
  CATEGORIES: [
    'Design',
    'Marketing',
    'Content Writing',
    'Development',
    'Business',
    'Education',
    'Creative',
    'Technical',
  ],
};

// UI Configuration
export const UI_CONFIG = {
  BREAKPOINTS: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  ANIMATION_DURATION: {
    fast: 150,
    base: 300,
    slow: 500,
  },
  Z_INDEX: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

// Color Palette
export const COLORS = {
  primary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
};

// Gradients
export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  dark: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  sunset: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ocean: 'linear-gradient(135deg, #2e3192 0%, #1bffff 100%)',
  fire: 'linear-gradient(135deg, #f83600 0%, #f9d423 100%)',
};

// Routes
export const ROUTES = {
  HOME: '/',
  MARKETPLACE: '/marketplace',
  MY_LIBRARY: '/marketplace/my-library',
  TEMPLATE_DETAIL: (id) => `/marketplace/template/${id}`,
  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

// API Endpoints
export const API_ENDPOINTS = {
  GENERATE_PROMPT: '/api/generate-prompt',
  TEMPLATES: {
    LIST: '/api/templates',
    GET: (id) => `/api/templates/${id}`,
    CREATE: '/api/templates',
    UPDATE: (id) => `/api/templates/${id}`,
    DELETE: (id) => `/api/templates/${id}`,
    PURCHASE: (id) => `/api/templates/${id}/purchase`,
  },
  PROMPTS: {
    SAVE: '/api/prompts/save',
    HISTORY: '/api/prompts/history',
    DELETE: (id) => `/api/prompts/${id}`,
  },
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE: '/api/user/update',
    PREFERENCES: '/api/user/preferences',
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  AUTH_ERROR: 'Authentication failed. Please sign in again.',
  NOT_FOUND: 'The requested resource was not found.',
  PERMISSION_DENIED: 'You do not have permission to perform this action.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PROMPT_GENERATED: 'Prompt generated successfully!',
  PROMPT_SAVED: 'Prompt saved to your library!',
  TEMPLATE_PURCHASED: 'Template purchased successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  COPIED_TO_CLIPBOARD: 'Copied to clipboard!',
};

// Validation Rules
export const VALIDATION = {
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  PASSWORD: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    message: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  },
  USERNAME: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
    message: 'Username must be 3-20 characters (letters, numbers, underscore only)',
  },
};

// Feature Flags (untuk A/B testing atau gradual rollout)
export const FEATURES = {
  ENABLE_MARKETPLACE: true,
  ENABLE_SOCIAL_SHARING: true,
  ENABLE_ANALYTICS: true,
  ENABLE_DARK_MODE: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_AI_SUGGESTIONS: true,
  ENABLE_COLLABORATION: false, // Coming soon
  ENABLE_API_ACCESS: false, // Coming soon
};

// Social Media Links
export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/promptcraft',
  GITHUB: 'https://github.com/promptcraft',
  DISCORD: 'https://discord.gg/promptcraft',
  LINKEDIN: 'https://linkedin.com/company/promptcraft',
  FACEBOOK: 'https://facebook.com/promptcraft',
};

// SEO Configuration
export const SEO = {
  DEFAULT_TITLE: 'PromptCraft - Transform Ideas into AI Prompts',
  TITLE_TEMPLATE: '%s | PromptCraft',
  DEFAULT_DESCRIPTION: 'Transform your simple ideas into powerful AI prompts. Join thousands of creators using PromptCraft to enhance their AI workflow.',
  DEFAULT_KEYWORDS: 'AI prompts, prompt engineering, AI tools, ChatGPT prompts, DALL-E prompts, MidJourney prompts',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://promptcraft.app',
  OG_IMAGE: '/og-image.png',
  TWITTER_HANDLE: '@promptcraft',
};

// Analytics Events
export const ANALYTICS_EVENTS = {
  PROMPT_GENERATED: 'prompt_generated',
  PROMPT_COPIED: 'prompt_copied',
  TEMPLATE_VIEWED: 'template_viewed',
  TEMPLATE_PURCHASED: 'template_purchased',
  USER_SIGNED_UP: 'user_signed_up',
  USER_SIGNED_IN: 'user_signed_in',
  SEARCH_PERFORMED: 'search_performed',
  FILTER_APPLIED: 'filter_applied',
};

// Rate Limiting
export const RATE_LIMITS = {
  PROMPT_GENERATION: {
    FREE_TIER: 10, // per hour
    PREMIUM_TIER: 100, // per hour
  },
  API_CALLS: {
    FREE_TIER: 100, // per day
    PREMIUM_TIER: 1000, // per day
  },
};

// Pricing (untuk marketplace)
export const PRICING = {
  CURRENCY: 'USD',
  COMMISSION_RATE: 0.15, // 15% platform fee
  MIN_PRICE: 0.99,
  MAX_PRICE: 999.99,
  TIERS: {
    FREE: {
      name: 'Free',
      price: 0,
      features: ['10 prompts/hour', 'Basic templates', 'Community support'],
    },
    PREMIUM: {
      name: 'Premium',
      price: 9.99,
      features: ['100 prompts/hour', 'All templates', 'Priority support', 'API access'],
    },
    ENTERPRISE: {
      name: 'Enterprise',
      price: 49.99,
      features: ['Unlimited prompts', 'Custom templates', '24/7 support', 'Advanced API', 'Team collaboration'],
    },
  },
};

export default {
  API_CONFIG,
  SUPABASE_CONFIG,
  STORAGE_KEYS,
  APP_CONFIG,
  PROMPT_CONFIG,
  UI_CONFIG,
  COLORS,
  GRADIENTS,
  ROUTES,
  API_ENDPOINTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION,
  FEATURES,
  SOCIAL_LINKS,
  SEO,
  ANALYTICS_EVENTS,
  RATE_LIMITS,
  PRICING,
};

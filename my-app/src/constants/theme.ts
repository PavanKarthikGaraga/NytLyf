// NYTLYF Theme Configuration

const DARK_COLORS = {
  // Base Colors
  background: {
    primary: '#0A0A0F',      // Main background - deep black
    secondary: '#12121A',    // Card backgrounds
    tertiary: '#1A1A24',     // Elevated surfaces
    overlay: 'rgba(0, 0, 0, 0.8)',
  },

  // Neon Accent Colors
  neon: {
    pink: '#FF2D92',         // Primary accent
    purple: '#9D4EDD',       // Secondary accent
    blue: '#00D9FF',         // Tertiary accent
    green: '#39FF14',        // Success/Live indicator
    orange: '#FF6B35',       // Warning/Hot events
    yellow: '#FFE500',       // Highlights
  },

  // Gradient Presets
  gradients: {
    primary: ['#FF2D92', '#9D4EDD'],
    secondary: ['#00D9FF', '#9D4EDD'],
    accent: ['#FF6B35', '#FF2D92'],
    dark: ['#12121A', '#0A0A0F'],
  },

  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0B0',
    tertiary: '#6B6B7B',
    accent: '#FF2D92',
    muted: '#4A4A5A',
  },

  // UI Elements
  border: {
    default: '#2A2A3A',
    focus: '#FF2D92',
    subtle: '#1F1F2F',
  },

  // Status Colors
  status: {
    success: '#39FF14',
    error: '#FF3B5C',
    warning: '#FF6B35',
    info: '#00D9FF',
    live: '#FF2D92',
  },

  // Category Colors
  categories: {
    party: '#FF2D92',
    concert: '#9D4EDD',
    meetup: '#00D9FF',
    exclusive: '#FFE500',
    festival: '#FF6B35',
    clubbing: '#39FF14',
  },
};

const LIGHT_COLORS = {
  // Base Colors
  background: {
    primary: '#F0F0F5',      // Main background - light gray
    secondary: '#FFFFFF',    // Card backgrounds - white
    tertiary: '#F8F8FA',     // Elevated surfaces
    overlay: 'rgba(255, 255, 255, 0.8)',
  },

  // Neon Accent Colors (Adjusted for light mode or kept same for brand)
  neon: {
    pink: '#E60073',         // Darker pink for contrast
    purple: '#7B2CBF',       // Darker purple
    blue: '#009ACD',         // Darker blue
    green: '#20B30E',        // Darker green
    orange: '#E64A19',       // Darker orange
    yellow: '#FBC02D',       // Darker yellow
  },

  // Gradient Presets
  gradients: {
    primary: ['#FF2D92', '#9D4EDD'],
    secondary: ['#00D9FF', '#9D4EDD'],
    accent: ['#FF6B35', '#FF2D92'],
    dark: ['#FFFFFF', '#F0F0F5'],
  },

  // Text Colors
  text: {
    primary: '#1A1A1A',
    secondary: '#5A5A6B',
    tertiary: '#8A8A9B',
    accent: '#E60073',
    muted: '#C0C0D0',
  },

  // UI Elements
  border: {
    default: '#E0E0E5',
    focus: '#E60073',
    subtle: '#EEEEF0',
  },

  // Status Colors
  status: {
    success: '#20B30E',
    error: '#DC2626',
    warning: '#E64A19',
    info: '#009ACD',
    live: '#E60073',
  },

  // Category Colors
  categories: {
    party: '#E60073',
    concert: '#7B2CBF',
    meetup: '#009ACD',
    exclusive: '#FBC02D',
    festival: '#E64A19',
    clubbing: '#20B30E',
  },
};

export const COLORS = DARK_COLORS;

export const THEME_COLORS = {
  dark: DARK_COLORS,
  light: LIGHT_COLORS,
};

export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    display: 'SpaceGrotesk-Bold',
  },

  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
} as const;

export const SHADOWS = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  neon: {
    shadowColor: '#FF2D92',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
} as const;

export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// Ad placement configuration
export const AD_CONFIG = {
  bannerHeight: 80,
  interstitialInterval: 6, // Show ad after every 6 events
  placements: {
    home_top: 'HOME_TOP_BANNER',
    home_mid: 'HOME_MID_BANNER',
    explore_inline: 'EXPLORE_INLINE',
    detail_mid: 'DETAIL_MID_BANNER',
    detail_bottom: 'DETAIL_BOTTOM_BANNER',
  },
} as const;

export type ThemeColors = typeof DARK_COLORS;
export type ThemeTypography = typeof TYPOGRAPHY;
export type ThemeSpacing = typeof SPACING;


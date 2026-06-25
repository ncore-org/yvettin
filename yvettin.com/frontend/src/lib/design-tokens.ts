// Design Tokens - YVETTIN Fashion E-commerce
// Enterprise-level design system

export const tokens = {
  // Colors
  colors: {
    // Primary
    primary: {
      DEFAULT: '#000000',
      50: '#F5F5F5',
      100: '#E5E5E5',
      200: '#D4D4D4',
      300: '#A3A3A3',
      400: '#737373',
      500: '#525252',
      600: '#404040',
      700: '#262626',
      800: '#171717',
      900: '#000000',
    },
    // Accent - Women
    women: {
      DEFAULT: '#F472B6',
      50: '#FDF2F8',
      100: '#FCE7F3',
      200: '#FBCFE8',
      300: '#F9A8D4',
      400: '#F472B6',
      500: '#EC4899',
      600: '#DB2777',
      700: '#BE185D',
    },
    // Accent - Men
    men: {
      DEFAULT: '#3B82F6',
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
    },
    // Semantic
    success: '#22C55E',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    // Background
    background: {
      DEFAULT: '#FFFFFF',
      secondary: '#F5F5F5',
      tertiary: '#FAFAFA',
    },
    // Text
    text: {
      primary: '#171717',
      secondary: '#525252',
      muted: '#737373',
      inverse: '#FFFFFF',
    },
    // Border
    border: {
      DEFAULT: '#E5E5E5',
      hover: '#D4D4D4',
      focus: '#000000',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      display: ['Inter', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      '2xs': ['0.625rem', { lineHeight: '0.875rem' }], // 10px
      xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
      base: ['1rem', { lineHeight: '1.5rem' }], // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
      '5xl': ['3rem', { lineHeight: '1.1' }], // 48px
      '6xl': ['3.75rem', { lineHeight: '1.1' }], // 60px
      '7xl': ['4.5rem', { lineHeight: '1.1' }], // 72px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.25em', // For YVETTIN logo
    },
  },

  // Spacing
  spacing: {
    0: '0',
    0.5: '0.125rem', // 2px
    1: '0.25rem', // 4px
    1.5: '0.375rem', // 6px
    2: '0.5rem', // 8px
    2.5: '0.625rem', // 10px
    3: '0.75rem', // 12px
    3.5: '0.875rem', // 14px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    7: '1.75rem', // 28px
    8: '2rem', // 32px
    9: '2.25rem', // 36px
    10: '2.5rem', // 40px
    11: '2.75rem', // 44px
    12: '3rem', // 48px
    14: '3.5rem', // 56px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
    28: '7rem', // 112px
    32: '8rem', // 128px
    36: '9rem', // 144px
    40: '10rem', // 160px
    44: '11rem', // 176px
    48: '12rem', // 192px
    52: '13rem', // 208px
    56: '14rem', // 224px
    60: '15rem', // 240px
    64: '16rem', // 256px
    72: '18rem', // 288px
    80: '20rem', // 320px
    96: '24rem', // 384px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem', // 2px
    DEFAULT: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
    // Custom
    product: '0 4px 20px -2px rgb(0 0 0 / 0.1)',
    'product-hover': '0 8px 30px -4px rgb(0 0 0 / 0.15)',
    card: '0 2px 8px rgb(0 0 0 / 0.08)',
    'card-hover': '0 8px 24px rgb(0 0 0 / 0.12)',
  },

  // Transitions
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    DEFAULT: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Z-index
  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    100: '100',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modal: '1040',
    popover: '1050',
    tooltip: '1060',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Animation
  animation: {
    'fade-in': 'fadeIn 0.3s ease-in-out',
    'fade-up': 'fadeUp 0.4s ease-out',
    'slide-in-right': 'slideInRight 0.3s ease-out',
    'scale-in': 'scaleIn 0.2s ease-out',
    'bounce-subtle': 'bounceSubtle 0.3s ease-out',
  },
} as const;

// Helper type
export type Tokens = typeof tokens;

// Export individual values for convenience
export const { colors, typography, spacing, borderRadius, boxShadow, transition, zIndex, breakpoints, animation } = tokens;

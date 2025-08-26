import { Theme } from '../types/theme';

const baseTheme = {
  fonts: {
    primary: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
    sizes: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      md: '1rem',      // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      xxl: '1.5rem',   // 24px
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem',     // 48px
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
    wide: '1536px',
  },
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
};

export const lightTheme: Theme = {
  ...baseTheme,
  colors: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryActive: '#1d4ed8',
    secondary: '#6b7280',
    secondaryHover: '#4b5563',
    secondaryActive: '#374151',
    background: '#ffffff',
    surface: '#f9fafb',
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      disabled: '#9ca3af',
    },
    border: '#e5e7eb',
    shadow: 'rgb(0 0 0 / 0.1)',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

export const darkTheme: Theme = {
  ...baseTheme,
  colors: {
    primary: '#60a5fa',
    primaryHover: '#3b82f6',
    primaryActive: '#2563eb',
    secondary: '#9ca3af',
    secondaryHover: '#d1d5db',
    secondaryActive: '#f3f4f6',
    background: '#111827',
    surface: '#1f2937',
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
      disabled: '#6b7280',
    },
    border: '#374151',
    shadow: 'rgb(0 0 0 / 0.3)',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
  },
};
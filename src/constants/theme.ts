// Constantes de tema e design system

export const COLORS = {
  // Primary colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Secondary colors
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

  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Semantic colors
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
  },
  
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
  },
  
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
  },

  // Category colors
  categories: [
    '#ef4444', // Red
    '#f97316', // Orange
    '#f59e0b', // Amber
    '#eab308', // Yellow
    '#84cc16', // Lime
    '#22c55e', // Green
    '#10b981', // Emerald
    '#14b8a6', // Teal
    '#06b6d4', // Cyan
    '#0ea5e9', // Sky
    '#3b82f6', // Blue
    '#6366f1', // Indigo
    '#8b5cf6', // Violet
    '#a855f7', // Purple
    '#d946ef', // Fuchsia
    '#ec4899', // Pink
    '#f43f5e', // Rose
  ],
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

// Light theme
export const LIGHT_THEME = {
  colors: {
    primary: COLORS.primary[600],
    primaryLight: COLORS.primary[100],
    secondary: COLORS.secondary[600],
    background: COLORS.neutral[50],
    surface: '#ffffff',
    card: '#ffffff',
    text: COLORS.neutral[900],
    textSecondary: COLORS.neutral[600],
    textMuted: COLORS.neutral[400],
    border: COLORS.neutral[200],
    borderLight: COLORS.neutral[100],
    success: COLORS.success[500],
    warning: COLORS.warning[500],
    error: COLORS.error[500],
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  spacing: SPACING,
  typography: TYPOGRAPHY,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
};

// Dark theme
export const DARK_THEME = {
  colors: {
    primary: COLORS.primary[400],
    primaryLight: COLORS.primary[900],
    secondary: COLORS.secondary[400],
    background: COLORS.neutral[900],
    surface: COLORS.neutral[800],
    card: COLORS.neutral[800],
    text: COLORS.neutral[50],
    textSecondary: COLORS.neutral[300],
    textMuted: COLORS.neutral[500],
    border: COLORS.neutral[700],
    borderLight: COLORS.neutral[600],
    success: COLORS.success[500],
    warning: COLORS.warning[500],
    error: COLORS.error[500],
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  spacing: SPACING,
  typography: TYPOGRAPHY,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
};

export type Theme = typeof LIGHT_THEME;

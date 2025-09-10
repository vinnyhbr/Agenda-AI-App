import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { LIGHT_THEME, DARK_THEME, Theme } from '../constants/theme';
import { useApp } from './AppContext';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const { state, updateSettings } = useApp();
  const [currentTheme, setCurrentTheme] = useState<Theme>(LIGHT_THEME);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const { theme: themeMode } = state.settings;
    
    let shouldUseDark = false;
    
    if (themeMode === 'dark') {
      shouldUseDark = true;
    } else if (themeMode === 'system') {
      shouldUseDark = systemColorScheme === 'dark';
    }
    
    setIsDark(shouldUseDark);
    setCurrentTheme(shouldUseDark ? DARK_THEME : LIGHT_THEME);
  }, [state.settings.theme, systemColorScheme]);

  const toggleTheme = () => {
    const newMode = isDark ? 'light' : 'dark';
    updateSettings({ theme: newMode });
  };

  const setThemeMode = (mode: 'light' | 'dark' | 'system') => {
    updateSettings({ theme: mode });
  };

  const value: ThemeContextType = {
    theme: currentTheme,
    isDark,
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

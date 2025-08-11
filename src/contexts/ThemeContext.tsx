// src/contexts/ThemeContext.tsx

import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../theme/theme';

// Define a "forma" do nosso contexto
interface ThemeContextType {
  isDarkMode: boolean;
  theme: typeof lightTheme; // O tema terá a estrutura do lightTheme
  toggleTheme: () => void;
}

// Cria o contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Cria o Provedor, que vai envolver nosso app
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme(); // Detecta o tema do celular (light/dark)
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // useMemo garante que o objeto de tema só seja recriado se o isDarkMode mudar
  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Cria um hook customizado para usar o tema mais facilmente
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};
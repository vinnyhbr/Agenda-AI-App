// src/theme/theme.ts

const common = {
  primary: '#6200EE', // Um roxo vibrante para ações principais
  secondary: '#03DAC6', // Um verde-azulado para detalhes
};

export const lightTheme = {
  dark: false,
  colors: {
    ...common,
    background: '#F5F5F5', // Fundo quase branco
    card: '#FFFFFF',       // Cor dos cards e inputs
    text: '#212121',       // Cor do texto principal
    border: '#E0E0E0',     // Cor das bordas
    notification: '#FF3B30',
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    ...common,
    background: '#121212', // Fundo escuro
    card: '#1E1E1E',       // Cor dos cards e inputs
    text: '#FFFFFF',       // Cor do texto principal
    border: '#272727',     // Cor das bordas
    notification: '#FF453A',
  },
};
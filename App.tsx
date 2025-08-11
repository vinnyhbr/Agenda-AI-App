// App.tsx (na raiz do projeto)

import 'react-native-gesture-handler';
import React, { useContext } from 'react';
// Importação adicionada para o registro do App
import { AppRegistry, Text, View, StyleSheet, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';
import appJson from './app.json';
const appName = appJson.expo.name;

// Componente que consome os contextos para teste
const MainContent = () => {
  // useTheme é um hook customizado, então está correto
  const { theme, toggleTheme, isDarkMode } = useTheme();
  
  // AuthContext precisa ser consumido com o hook useContext
  const auth = useContext(AuthContext);

  // Guarda de tipo para garantir que o contexto de autenticação carregou
  if (!auth) {
    return null; 
  }

  const { user, login, logout, isLoading } = auth;

  // O componente raiz DEVE ser uma <View> para receber o estilo
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text, fontSize: 24, marginBottom: 20 }}>
        Agenda Inteligente
      </Text>

      {user ? (
        // Este Fragment <> é correto, pois ele apenas agrupa elementos
        // e não tem estilo aplicado a ele.
        <>
          <Text style={{ color: theme.colors.text, marginBottom: 20 }}>
            Bem-vindo, {user.name}!
          </Text>
          <Button title="Sair" onPress={logout} color={theme.colors.primary} />
        </>
      ) : (
        <Button 
          title={isLoading ? "Entrando..." : "Entrar"} 
          onPress={login} 
          disabled={isLoading} 
          color={theme.colors.primary} 
        />
      )}

      <View style={{ marginTop: 40 }}>
        <Button 
          title={`Mudar para modo ${isDarkMode ? 'Claro' : 'Escuro'}`} 
          onPress={toggleTheme} 
        />
      </View>

      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </View>
  );
};

// App principal que envolve tudo com os provedores
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Linha adicionada para registrar o componente principal do aplicativo
AppRegistry.registerComponent(appName, () => App);

import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider } from './src/contexts/AppContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <ThemeProvider>
          <AuthProvider>
            <AppNavigator />
            <StatusBar style="auto" />
          </AuthProvider>
        </ThemeProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}

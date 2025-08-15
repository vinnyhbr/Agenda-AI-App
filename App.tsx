import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';



export default function App() {
  return (
    
    <AuthProvider>
      <ThemeProvider>
        {/* O NavigationContainer é essencial para que o @react-navigation funcione. */}
        <NavigationContainer>
          {/* O AppNavigator contém a lógica de qual tela mostrar (Login ou Home). */}
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}
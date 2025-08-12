import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

// O componente App agora é o responsável por "prover" os contextos
// e o container de navegação para todo o aplicativo.
export default function App() {
  return (
    // O AuthProvider deve vir primeiro para que o AppNavigator possa
    // acessar o estado de autenticação.
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
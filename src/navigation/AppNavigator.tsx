import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../contexts/AuthContext';
import { RootStackParamList, DrawerParamList } from './types';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

// O Drawer agora é um componente separado para manter a organização
function AppDrawer() {
  const { theme } = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: theme.colors.primary,
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: theme.colors.text,
        drawerLabelStyle: { marginLeft: -20, fontSize: 16 },
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Configuracoes" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

const AppNavigator = () => {
  const { user, isLoading, isProfileComplete } = useContext(AuthContext)!;
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        isProfileComplete ? (
          // Se o usuário está logado E com perfil completo, mostra o app principal (Drawer)
          <Stack.Screen name="AppDrawer" component={AppDrawer} />
        ) : (
          // Se está logado MAS sem perfil completo, mostra a tela de setup
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        )
      ) : (
        // Se não há usuário, mostra a tela de Login
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;

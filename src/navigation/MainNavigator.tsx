import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { MainTabParamList, RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';

import CalendarScreen from '../screens/main/CalendarScreen';
import EventsScreen from '../screens/main/EventsScreen';
import CategoriesScreen from '../screens/main/CategoriesScreen';
import AIScreen from '../screens/main/AIScreen';
import EventDetailsScreen from '../screens/main/EventDetailsScreen';
import EventFormScreen from '../screens/main/EventFormScreen';
import CategoryFormScreen from '../screens/main/CategoryFormScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function MainTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'folder' : 'folder-outline';
          } else if (route.name === 'AI') {
            iconName = focused ? 'bulb' : 'bulb-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{ title: 'Calendário' }}
      />
      <Tab.Screen 
        name="Events" 
        component={EventsScreen}
        options={{ title: 'Eventos' }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen}
        options={{ title: 'Categorias' }}
      />
      <Tab.Screen 
        name="AI" 
        component={AIScreen}
        options={{ title: 'IA Assistant' }}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="EventDetails" 
        component={EventDetailsScreen}
        options={{ title: 'Detalhes do Evento' }}
      />
      <Stack.Screen 
        name="EventForm" 
        component={EventFormScreen}
        options={{ title: 'Novo Evento' }}
      />
      <Stack.Screen 
        name="CategoryForm" 
        component={CategoryFormScreen}
        options={{ title: 'Nova Categoria' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Configurações' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      />
    </Stack.Navigator>
  );
}

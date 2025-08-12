import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { AuthContext } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

import type { DrawerContentComponentProps } from '@react-navigation/drawer';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { logout } = useContext(AuthContext)!;
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <Text style={[styles.headerText, { color: theme.colors.text }]}>Agenda Inteligente</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { padding: 20, alignItems: 'center' },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  footer: { padding: 20, borderTopWidth: 1 },
  logoutButton: { paddingVertical: 15 },
  logoutButtonText: { fontSize: 16, color: '#E53935', fontWeight: 'bold' },
});

export default CustomDrawerContent;
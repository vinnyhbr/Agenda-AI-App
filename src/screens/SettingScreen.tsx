import React from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { SettingsScreenNavigationProp } from '../navigation/types';


const MenuIcon: React.FC<{ color: string }> = ({ color }) => <Text style={{ color, fontSize: 28 }}>☰</Text>;

type Props = { navigation: SettingsScreenNavigationProp };

const SettingsScreen = ({ navigation }: Props) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.iconButton}>
          <MenuIcon color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>   Configurações</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.content}>
        <View style={styles.optionRow}>
          <Text style={[styles.optionText, { color: theme.colors.text }]}>Modo Escuro</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} trackColor={{ true: theme.colors.primary }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, borderBottomWidth: 1 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  iconButton: { padding: 10 },
  content: { flex: 1, padding: 20 },
  optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  optionText: { fontSize: 18 },
});

export default SettingsScreen;

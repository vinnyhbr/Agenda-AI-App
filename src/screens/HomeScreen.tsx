import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { HomeScreenNavigationProp } from '../navigation/types';

const MenuIcon: React.FC<{ color: string }> = ({ color }) => <Text style={{ color, fontSize: 28 }}>☰</Text>;

type Props = { navigation: HomeScreenNavigationProp };

const HomeScreen = ({ navigation }: Props) => {
  const { logout, user } = useContext(AuthContext)!;
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.iconButton}>
          <MenuIcon color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Início</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Bem-vindo, {user?.name}!</Text>
        <Button title="Sair (Teste)" onPress={logout} color={theme.colors.primary} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, borderBottomWidth: 1 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  iconButton: { padding: 10 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 20 },
});

export default HomeScreen;
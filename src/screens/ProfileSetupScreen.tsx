import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const ProfileSetupScreen = () => {
  const { completeProfile, user } = useContext(AuthContext)!;
  const { theme } = useTheme();
  const [jobTitle, setJobTitle] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Quase lá, {user?.name?.split(' ')[0]}!</Text>
      <Text style={[styles.subtitle, { color: theme.colors.text }]}>
        Nos diga sua profissão para uma melhor experiência.
      </Text>
      <TextInput
        placeholder="Ex: Desenvolvedor(a)"
        value={jobTitle}
        onChangeText={setJobTitle}
        placeholderTextColor={theme.colors.text}
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text, borderColor: theme.colors.border }]}
      />
      <Button title="Concluir" onPress={() => completeProfile({ jobTitle })} color={theme.colors.primary} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', opacity: 0.7, marginBottom: 30 },
  input: { height: 50, borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, fontSize: 16, marginBottom: 20 },
});

export default ProfileSetupScreen;

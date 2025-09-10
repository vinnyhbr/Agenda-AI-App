import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, state } = useAuth();
  const { theme } = useTheme();

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      await register(name.trim(), email.trim(), password);
    } catch (error) {
      // O erro já é tratado no contexto
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              Criar conta
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Preencha os dados para começar
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Nome completo</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  },
                ]}
                value={name}
                onChangeText={setName}
                placeholder="Seu nome completo"
                placeholderTextColor={theme.colors.textMuted}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  },
                ]}
                value={email}
                onChangeText={setEmail}
                placeholder="seu@email.com"
                placeholderTextColor={theme.colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Senha</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  },
                ]}
                value={password}
                onChangeText={setPassword}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor={theme.colors.textMuted}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Confirmar senha</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  },
                ]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Digite a senha novamente"
                placeholderTextColor={theme.colors.textMuted}
                secureTextEntry
              />
            </View>

            {state.error && (
              <View style={[styles.errorContainer, { backgroundColor: theme.colors.error + '20' }]}>
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                  {state.error}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.registerButton,
                { backgroundColor: theme.colors.primary },
                state.isLoading && styles.disabledButton,
              ]}
              onPress={handleRegister}
              disabled={state.isLoading}
            >
              <Text style={styles.registerButtonText}>
                {state.isLoading ? 'Criando conta...' : 'Criar conta'}
              </Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
                Já tem uma conta?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.footerLink, { color: theme.colors.primary }]}>
                  Entrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  registerButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledButton: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

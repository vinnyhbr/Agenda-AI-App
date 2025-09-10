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

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, state } = useAuth();
  const { theme } = useTheme();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      await login(email.trim(), password);
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
              Bem-vindo de volta!
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Entre na sua conta para continuar
            </Text>
          </View>

          <View style={styles.form}>
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
                placeholder="Sua senha"
                placeholderTextColor={theme.colors.textMuted}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={[styles.forgotPasswordText, { color: theme.colors.primary }]}>
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>

            {state.error && (
              <View style={[styles.errorContainer, { backgroundColor: theme.colors.error + '20' }]}>
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                  {state.error}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.loginButton,
                { backgroundColor: theme.colors.primary },
                state.isLoading && styles.disabledButton,
              ]}
              onPress={handleLogin}
              disabled={state.isLoading}
            >
              <Text style={styles.loginButtonText}>
                {state.isLoading ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
                Não tem uma conta?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={[styles.footerLink, { color: theme.colors.primary }]}>
                  Cadastre-se
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.demoInfo}>
            <Text style={[styles.demoText, { color: theme.colors.textMuted }]}>
              Demo: admin@agendaai.com / 123456
            </Text>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
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
  loginButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledButton: {
    opacity: 0.6,
  },
  loginButtonText: {
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
  demoInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  demoText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

type WelcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

export default function WelcomeScreen({ navigation }: Props) {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={[styles.logoPlaceholder, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.logoText, { color: '#FFFFFF' }]}>AI</Text>
          </View>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Agenda AI
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Sua agenda inteligente que aprende com você
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={[styles.featureIcon, { color: theme.colors.primary }]}>📅</Text>
            <Text style={[styles.featureText, { color: theme.colors.text }]}>
              Organize seus eventos de forma inteligente
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.featureIcon, { color: theme.colors.primary }]}>🤖</Text>
            <Text style={[styles.featureText, { color: theme.colors.text }]}>
              IA que sugere horários e otimiza sua agenda
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.featureIcon, { color: theme.colors.primary }]}>🔔</Text>
            <Text style={[styles.featureText, { color: theme.colors.text }]}>
              Lembretes personalizados e notificações
            </Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.primaryButtonText}>Começar Agora</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: theme.colors.border }]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.secondaryButtonText, { color: theme.colors.text }]}>
              Já tenho uma conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    flex: 1,
    justifyContent: 'center',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
  buttons: {
    gap: 16,
  },
  primaryButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

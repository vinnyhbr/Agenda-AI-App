import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCalendar } from '../../hooks/useCalendar';
import { CalendarEvent } from '../../types';

export default function CalendarScreen() {
  const { theme } = useTheme();
  const { logout, user } = useAuthContext();
  const { events, isLoading, error, refreshEvents, syncWithGoogle } = useCalendar();

  const handleSync = async () => {
    try {
      const today = new Date();
      const startTime = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
      const endTime = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString();

      await syncWithGoogle(startTime, endTime);
      Alert.alert('Sucesso', 'Calendário sincronizado com Google!');
    } catch (error: any) {
      Alert.alert('Erro', 'Erro ao sincronizar com Google Calendar');
    }
  };

  const formatEventTime = (event: CalendarEvent) => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);

    if (event.allDay) {
      return 'Dia todo';
    }

    return `${start.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })} - ${end.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  };

  const formatEventDate = (event: CalendarEvent) => {
    const date = new Date(event.startTime);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short'
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Calendário
        </Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Header com informações do usuário */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Olá, {user?.name || 'Usuário'}! 👋
          </Text>
          <Text style={[styles.cardDescription, { color: theme.colors.textSecondary }]}>
            Bem-vindo ao seu calendário inteligente
          </Text>
          <TouchableOpacity
            style={[styles.syncButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleSync}
          >
            <Ionicons name="sync" size={16} color="#FFFFFF" />
            <Text style={styles.syncButtonText}>Sincronizar com Google</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de eventos */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            📅 Seus Eventos
          </Text>

          {error && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {error}
            </Text>
          )}

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
              <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
                Carregando eventos...
              </Text>
            </View>
          ) : events.length > 0 ? (
            <ScrollView style={styles.eventsList}>
              {events.map((event) => (
                <View key={event.id} style={[styles.eventItem, { borderColor: theme.colors.border }]}>
                  <View style={styles.eventHeader}>
                    <Text style={[styles.eventTitle, { color: theme.colors.text }]}>
                      {event.title}
                    </Text>
                    <Text style={[styles.eventDate, { color: theme.colors.textSecondary }]}>
                      {formatEventDate(event)}
                    </Text>
                  </View>
                  <Text style={[styles.eventTime, { color: theme.colors.textSecondary }]}>
                    {formatEventTime(event)}
                  </Text>
                  {event.location && (
                    <Text style={[styles.eventLocation, { color: theme.colors.textSecondary }]}>
                      📍 {event.location}
                    </Text>
                  )}
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={[styles.cardDescription, { color: theme.colors.textSecondary }]}>
              Nenhum evento encontrado. Que tal criar um novo?
            </Text>
          )}
        </View>

      </View>

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  syncButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  eventsList: {
    maxHeight: 200,
    marginTop: 8,
  },
  eventItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    marginBottom: 8,
    borderRadius: 8,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  eventDate: {
    fontSize: 12,
    fontWeight: '500',
  },
  eventTime: {
    fontSize: 14,
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
  },
});

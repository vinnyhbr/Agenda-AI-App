import { useState, useEffect } from 'react';
import { CalendarEvent, CreateEventRequest } from '../types';
import calendarService from '../services/calendarService';

export interface UseCalendarReturn {
  events: CalendarEvent[];
  isLoading: boolean;
  error: string | null;
  createEvent: (eventData: CreateEventRequest) => Promise<CalendarEvent | null>;
  updateEvent: (eventId: number, eventData: CreateEventRequest) => Promise<CalendarEvent | null>;
  deleteEvent: (eventId: number) => Promise<boolean>;
  refreshEvents: () => Promise<void>;
  getEventsByRange: (startTime: string, endTime: string) => Promise<CalendarEvent[]>;
  syncWithGoogle: (startTime: string, endTime: string) => Promise<CalendarEvent[]>;
  clearError: () => void;
}

export const useCalendar = (): UseCalendarReturn => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const refreshEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Busca eventos do mês atual
      const monthEvents = await calendarService.getMonthEvents();
      setEvents(monthEvents);
    } catch (err: any) {
      console.error('Erro ao buscar eventos:', err);
      setError(err.message || 'Erro ao carregar eventos');
    } finally {
      setIsLoading(false);
    }
  };

  const createEvent = async (eventData: CreateEventRequest): Promise<CalendarEvent | null> => {
    try {
      setError(null);
      const newEvent = await calendarService.createEvent(eventData);
      
      // Adiciona o novo evento à lista
      setEvents(prev => [...prev, newEvent]);
      
      return newEvent;
    } catch (err: any) {
      console.error('Erro ao criar evento:', err);
      setError(err.message || 'Erro ao criar evento');
      return null;
    }
  };

  const updateEvent = async (eventId: number, eventData: CreateEventRequest): Promise<CalendarEvent | null> => {
    try {
      setError(null);
      const updatedEvent = await calendarService.updateEvent(eventId, eventData);
      
      // Atualiza o evento na lista
      setEvents(prev => prev.map(event => 
        event.id === eventId ? updatedEvent : event
      ));
      
      return updatedEvent;
    } catch (err: any) {
      console.error('Erro ao atualizar evento:', err);
      setError(err.message || 'Erro ao atualizar evento');
      return null;
    }
  };

  const deleteEvent = async (eventId: number): Promise<boolean> => {
    try {
      setError(null);
      await calendarService.deleteEvent(eventId);
      
      // Remove o evento da lista
      setEvents(prev => prev.filter(event => event.id !== eventId));
      
      return true;
    } catch (err: any) {
      console.error('Erro ao deletar evento:', err);
      setError(err.message || 'Erro ao deletar evento');
      return false;
    }
  };

  const getEventsByRange = async (startTime: string, endTime: string): Promise<CalendarEvent[]> => {
    try {
      setError(null);
      return await calendarService.getEventsByRange(startTime, endTime);
    } catch (err: any) {
      console.error('Erro ao buscar eventos por período:', err);
      setError(err.message || 'Erro ao buscar eventos');
      return [];
    }
  };

  const syncWithGoogle = async (startTime: string, endTime: string): Promise<CalendarEvent[]> => {
    try {
      setError(null);
      const syncedEvents = await calendarService.syncWithGoogle(startTime, endTime);
      
      // Atualiza a lista com os eventos sincronizados
      await refreshEvents();
      
      return syncedEvents;
    } catch (err: any) {
      console.error('Erro ao sincronizar com Google:', err);
      setError(err.message || 'Erro ao sincronizar com Google Calendar');
      return [];
    }
  };

  // Carrega eventos ao inicializar
  useEffect(() => {
    refreshEvents();
  }, []);

  return {
    events,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refreshEvents,
    getEventsByRange,
    syncWithGoogle,
    clearError,
  };
};

import { CalendarEvent, CreateEventRequest, PaginatedResponse } from '../types';
import apiService from './api';

export class CalendarService {
  /**
   * Cria um novo evento
   */
  async createEvent(eventData: CreateEventRequest): Promise<CalendarEvent> {
    return apiService.post<CalendarEvent>('/api/calendar/events', eventData);
  }

  /**
   * Lista eventos com paginação
   */
  async getEvents(page: number = 0, size: number = 20): Promise<PaginatedResponse<CalendarEvent>> {
    return apiService.get<PaginatedResponse<CalendarEvent>>(
      `/api/calendar/events?page=${page}&size=${size}`
    );
  }

  /**
   * Obtém eventos por período
   */
  async getEventsByRange(startTime: string, endTime: string): Promise<CalendarEvent[]> {
    const params = new URLSearchParams({
      startTime,
      endTime,
    });
    
    return apiService.get<CalendarEvent[]>(`/api/calendar/events/range?${params}`);
  }

  /**
   * Obtém um evento específico
   */
  async getEvent(eventId: number): Promise<CalendarEvent> {
    return apiService.get<CalendarEvent>(`/api/calendar/events/${eventId}`);
  }

  /**
   * Atualiza um evento
   */
  async updateEvent(eventId: number, eventData: CreateEventRequest): Promise<CalendarEvent> {
    return apiService.put<CalendarEvent>(`/api/calendar/events/${eventId}`, eventData);
  }

  /**
   * Deleta um evento
   */
  async deleteEvent(eventId: number): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`/api/calendar/events/${eventId}`);
  }

  /**
   * Sincroniza com Google Calendar
   */
  async syncWithGoogle(startTime: string, endTime: string): Promise<CalendarEvent[]> {
    const params = new URLSearchParams({
      startTime,
      endTime,
    });
    
    return apiService.post<CalendarEvent[]>(`/api/calendar/sync?${params}`);
  }

  /**
   * Obtém eventos de hoje
   */
  async getTodayEvents(): Promise<CalendarEvent[]> {
    const today = new Date();
    const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
    const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();
    
    return this.getEventsByRange(startTime, endTime);
  }

  /**
   * Obtém eventos da semana atual
   */
  async getWeekEvents(): Promise<CalendarEvent[]> {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    return this.getEventsByRange(startOfWeek.toISOString(), endOfWeek.toISOString());
  }

  /**
   * Obtém eventos do mês atual
   */
  async getMonthEvents(): Promise<CalendarEvent[]> {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
    
    return this.getEventsByRange(startOfMonth.toISOString(), endOfMonth.toISOString());
  }
}

export const calendarService = new CalendarService();
export default calendarService;

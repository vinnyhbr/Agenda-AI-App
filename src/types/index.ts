// Tipos principais da aplicação baseados na API

export interface User {
  id: number;
  email: string;
  name: string;
  profilePictureUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface CalendarEvent {
  id: number;
  googleEventId?: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  allDay: boolean;
  status: 'CONFIRMED' | 'TENTATIVE' | 'CANCELLED';
  reminderMinutes?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  allDay: boolean;
  reminderMinutes?: number;
}

export interface ChatMessage {
  id: number;
  message: string;
  response: string;
  type: 'USER_MESSAGE' | 'SYSTEM_MESSAGE';
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  actionPerformed?: string;
  calendarEventId?: string;
  createdAt: string;
}

export interface SendMessageRequest {
  message: string;
}

export interface AuthStatus {
  authenticated: boolean;
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    enabled: boolean;
    sound: boolean;
    vibration: boolean;
  };
  calendar: {
    defaultView: 'day' | 'week' | 'month';
    weekStartsOn: 0 | 1; // 0 = Sunday, 1 = Monday
  };
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  MainTabs: undefined;
  EventDetails: { eventId: string };
  EventForm: { eventId?: string; date?: string };
  CategoryForm: { categoryId?: string };
  Settings: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  OAuth2Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Calendar: undefined;
  Events: undefined;
  Categories: undefined;
  AI: undefined;
};

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  timestamp: string;
}

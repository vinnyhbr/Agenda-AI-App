// Tipos principais da aplicação

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  categoryId: string;
  userId: string;
  location?: string;
  reminders: Reminder[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reminder {
  id: string;
  eventId: string;
  type: 'notification' | 'email';
  minutesBefore: number;
  isActive: boolean;
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
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

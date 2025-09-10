import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppSettings } from '../types';

// Estado inicial da aplicação
const initialSettings: AppSettings = {
  theme: 'system',
  language: 'pt-BR',
  notifications: {
    enabled: true,
    sound: true,
    vibration: true,
  },
  calendar: {
    defaultView: 'month',
    weekStartsOn: 1, // Segunda-feira
  },
};

interface AppState {
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;
}

const initialState: AppState = {
  settings: initialSettings,
  isLoading: false,
  error: null,
};

// Actions
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'RESET_SETTINGS' };

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    
    case 'RESET_SETTINGS':
      return { ...state, settings: initialSettings };
    
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetSettings: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const updateSettings = (settings: Partial<AppSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const resetSettings = () => {
    dispatch({ type: 'RESET_SETTINGS' });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const value: AppContextType = {
    state,
    updateSettings,
    resetSettings,
    setLoading,
    setError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

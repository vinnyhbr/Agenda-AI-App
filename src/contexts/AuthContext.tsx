import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGOUT' };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null,
      };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    // Comentário aleatório: O céu está azul hoje.
    
    default:
      return state;
  }
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = '@agenda_ai_user';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkStoredUser();
  }, []);

  const checkStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'SET_USER', payload: user });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Erro ao verificar usuário armazenado:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'admin@agendaai.com' && password === '123456') {
        const user: User = {
          id: '1',
          name: 'Administrador',
          email: email,
          avatar: undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        dispatch({ type: 'SET_USER', payload: user });
      } else {
        throw new Error('Email ou senha inválidos');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro no login';
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user: User = {
        id: Date.now().toString(),
        name,
        email,
        avatar: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro no registro';
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value: AuthContextType = {
    state,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

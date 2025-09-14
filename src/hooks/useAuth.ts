import { useState, useEffect } from 'react';
import { User, AuthStatus } from '../types';
import authService from '../services/authService';

export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const status = await authService.getAuthStatus();
      
      if (status.authenticated && status.user) {
        // Se está autenticado, busca os dados completos do usuário
        const userData = await authService.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err: any) {
      console.error('Erro ao verificar status de autenticação:', err);
      setError(err.message || 'Erro ao verificar autenticação');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Salva o token
      await authService.saveToken(token);
      
      // Busca os dados do usuário
      const userData = await authService.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err: any) {
      console.error('Erro no login:', err);
      setError(err.message || 'Erro ao fazer login');
      setUser(null);
      setIsAuthenticated(false);
      // Remove token inválido
      await authService.clearLocalAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await authService.logout();
    } catch (err: any) {
      console.error('Erro no logout:', err);
      setError(err.message || 'Erro ao fazer logout');
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  // Verifica autenticação ao inicializar
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuthStatus,
    clearError,
  };
};

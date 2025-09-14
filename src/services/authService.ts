import { User, AuthStatus } from '../types';
import apiService from './api';

export class AuthService {
  /**
   * Obtém a URL para iniciar o login OAuth2 com Google
   */
  getGoogleLoginUrl(): string {
    return apiService.getOAuth2LoginUrl();
  }

  /**
   * Salva o token JWT após o redirect do OAuth2
   */
  async saveToken(token: string): Promise<void> {
    await apiService.saveAuthToken(token);
  }

  /**
   * Obtém o usuário atual autenticado
   */
  async getCurrentUser(): Promise<User> {
    return apiService.get<User>('/api/auth/me');
  }

  /**
   * Verifica o status de autenticação
   */
  async getAuthStatus(): Promise<AuthStatus> {
    try {
      return await apiService.get<AuthStatus>('/api/auth/status');
    } catch (error) {
      // Se der erro, assume que não está autenticado
      return { authenticated: false };
    }
  }

  /**
   * Realiza logout
   */
  async logout(): Promise<{ message: string }> {
    try {
      const response = await apiService.post<{ message: string }>('/api/auth/logout');
      await apiService.removeAuthToken();
      return response;
    } catch (error) {
      // Mesmo se der erro no servidor, remove o token local
      await apiService.removeAuthToken();
      throw error;
    }
  }

  /**
   * Verifica se o usuário está autenticado localmente
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const status = await this.getAuthStatus();
      return status.authenticated;
    } catch (error) {
      return false;
    }
  }

  /**
   * Remove token local (logout offline)
   */
  async clearLocalAuth(): Promise<void> {
    await apiService.removeAuthToken();
  }
}

export const authService = new AuthService();
export default authService;

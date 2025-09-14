import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiError } from '../types';

const BASE_URL = 'http://localhost:8080';

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = BASE_URL) {
    this.baseURL = baseURL;
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('auth_token');
    } catch (error) {
      console.error('Erro ao obter token:', error);
      return null;
    }
  }

  private async getHeaders(includeAuth: boolean = true): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = await this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Se não conseguir parsear o JSON, usa a mensagem padrão
      }

      const apiError: ApiError = {
        message: errorMessage,
        status: response.status,
        timestamp: new Date().toISOString(),
      };

      throw apiError;
    }

    // Se a resposta for 204 (No Content), retorna um objeto vazio
    if (response.status === 204) {
      return {} as T;
    }

    try {
      return await response.json();
    } catch (error) {
      throw new Error('Erro ao processar resposta da API');
    }
  }

  async get<T>(endpoint: string, includeAuth: boolean = true): Promise<T> {
    const headers = await this.getHeaders(includeAuth);
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: any, includeAuth: boolean = true): Promise<T> {
    const headers = await this.getHeaders(includeAuth);
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: any, includeAuth: boolean = true): Promise<T> {
    const headers = await this.getHeaders(includeAuth);
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, includeAuth: boolean = true): Promise<T> {
    const headers = await this.getHeaders(includeAuth);
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    return this.handleResponse<T>(response);
  }

  // Método específico para OAuth2 redirect
  getOAuth2LoginUrl(): string {
    return `${this.baseURL}/oauth2/authorization/google`;
  }

  // Método para salvar token após OAuth2
  async saveAuthToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem('auth_token', token);
    } catch (error) {
      console.error('Erro ao salvar token:', error);
      throw new Error('Erro ao salvar token de autenticação');
    }
  }

  // Método para remover token
  async removeAuthToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Erro ao remover token:', error);
    }
  }
}

export const apiService = new ApiService();
export default apiService;

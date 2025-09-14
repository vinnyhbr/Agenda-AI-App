import { ChatMessage, SendMessageRequest, PaginatedResponse } from '../types';
import apiService from './api';

export class ChatService {
  /**
   * Envia uma mensagem para a IA
   */
  async sendMessage(messageData: SendMessageRequest): Promise<ChatMessage> {
    return apiService.post<ChatMessage>('/api/chat/message', messageData);
  }

  /**
   * Obtém histórico de chat com paginação
   */
  async getChatHistory(page: number = 0, size: number = 20): Promise<PaginatedResponse<ChatMessage>> {
    return apiService.get<PaginatedResponse<ChatMessage>>(
      `/api/chat/history?page=${page}&size=${size}`
    );
  }

  /**
   * Obtém mensagens recentes
   */
  async getRecentMessages(): Promise<ChatMessage[]> {
    return apiService.get<ChatMessage[]>('/api/chat/recent');
  }

  /**
   * Limpa o histórico de chat
   */
  async clearHistory(): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>('/api/chat/history');
  }

  /**
   * Obtém todas as mensagens (sem paginação) - útil para chat em tempo real
   */
  async getAllMessages(): Promise<ChatMessage[]> {
    try {
      const response = await this.getChatHistory(0, 1000); // Pega muitas mensagens
      return response.content;
    } catch (error) {
      console.error('Erro ao obter todas as mensagens:', error);
      return [];
    }
  }

  /**
   * Verifica se há novas mensagens desde um timestamp
   */
  async hasNewMessages(lastMessageId: number): Promise<boolean> {
    try {
      const recent = await this.getRecentMessages();
      return recent.length > 0 && recent[0].id > lastMessageId;
    } catch (error) {
      console.error('Erro ao verificar novas mensagens:', error);
      return false;
    }
  }
}

export const chatService = new ChatService();
export default chatService;

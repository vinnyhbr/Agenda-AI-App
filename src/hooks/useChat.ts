import { useState, useEffect } from 'react';
import { ChatMessage, SendMessageRequest } from '../types';
import chatService from '../services/chatService';

export interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<ChatMessage | null>;
  loadMoreMessages: () => Promise<void>;
  clearHistory: () => Promise<boolean>;
  refreshMessages: () => Promise<void>;
  clearError: () => void;
  hasMoreMessages: boolean;
}

export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);

  const clearError = () => setError(null);

  const refreshMessages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await chatService.getChatHistory(0, 20);
      setMessages(response.content.reverse()); // Inverte para mostrar mais recentes primeiro
      setCurrentPage(0);
      setHasMoreMessages(!response.last);
    } catch (err: any) {
      console.error('Erro ao buscar mensagens:', err);
      setError(err.message || 'Erro ao carregar mensagens');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMessages = async () => {
    if (!hasMoreMessages || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const nextPage = currentPage + 1;
      const response = await chatService.getChatHistory(nextPage, 20);
      
      // Adiciona as mensagens antigas ao início da lista
      setMessages(prev => [...response.content.reverse(), ...prev]);
      setCurrentPage(nextPage);
      setHasMoreMessages(!response.last);
    } catch (err: any) {
      console.error('Erro ao carregar mais mensagens:', err);
      setError(err.message || 'Erro ao carregar mais mensagens');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (messageText: string): Promise<ChatMessage | null> => {
    if (!messageText.trim()) return null;

    try {
      setIsSending(true);
      setError(null);
      
      const messageData: SendMessageRequest = {
        message: messageText.trim(),
      };
      
      const response = await chatService.sendMessage(messageData);
      
      // Adiciona a nova mensagem ao final da lista
      setMessages(prev => [...prev, response]);
      
      return response;
    } catch (err: any) {
      console.error('Erro ao enviar mensagem:', err);
      setError(err.message || 'Erro ao enviar mensagem');
      return null;
    } finally {
      setIsSending(false);
    }
  };

  const clearHistory = async (): Promise<boolean> => {
    try {
      setError(null);
      await chatService.clearHistory();
      setMessages([]);
      setCurrentPage(0);
      setHasMoreMessages(false);
      return true;
    } catch (err: any) {
      console.error('Erro ao limpar histórico:', err);
      setError(err.message || 'Erro ao limpar histórico');
      return false;
    }
  };

  // Carrega mensagens ao inicializar
  useEffect(() => {
    refreshMessages();
  }, []);

  return {
    messages,
    isLoading,
    isSending,
    error,
    sendMessage,
    loadMoreMessages,
    clearHistory,
    refreshMessages,
    clearError,
    hasMoreMessages,
  };
};

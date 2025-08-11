// src/contexts/AuthContext.tsx

import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => void; // Simularemos o login
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulação de login
  const login = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: '123',
        name: 'Usuário Teste',
        email: 'teste@email.com',
      });
      setIsLoading(false);
    }, 1500); // Simula uma chamada de API
  };

  // Simulação de logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
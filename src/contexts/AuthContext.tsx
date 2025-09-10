import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { checkUserProfile, createUserProfile } from '../services/UserService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isProfileComplete: boolean | null;
  login: () => Promise<void>;
  logout: () => void;
  completeProfile: (profileData: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);

  const login = async () => {
    setIsLoading(true);
    try {
      // Simulação de login
      const fakeUser: User = { id: '123', name: 'Usuário Teste', email: 'teste@email.com' };
      
      // Verifica se o perfil existe no "backend"
      const profileExists = await checkUserProfile(fakeUser.id);
      
      
      setUser(fakeUser);
      setIsProfileComplete(profileExists);

    } catch (error) {
      console.error("Erro no login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsProfileComplete(null);
  };

  const completeProfile = async (profileData: any) => {
    if (!user) return;
    setIsLoading(true);
    try {
        await createUserProfile(user.id, profileData);
        setIsProfileComplete(true);
    } catch (error) {
        console.error("Erro ao completar perfil:", error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isProfileComplete, login, logout, completeProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
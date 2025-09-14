import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { Linking } from 'react-native';
import { User } from '../types';
import { useAuth as useAuthHook, UseAuthReturn } from '../hooks/useAuth';
import authService from '../services/authService';

interface AuthContextType extends Omit<UseAuthReturn, 'login'> {
  loginWithGoogle: () => Promise<void>;
  handleOAuthRedirect: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authHook = useAuthHook();

  const loginWithGoogle = async () => {
    try {
      const loginUrl = authService.getGoogleLoginUrl();
      
      // Abre a URL do OAuth2 no navegador
      const supported = await Linking.canOpenURL(loginUrl);
      if (supported) {
        await Linking.openURL(loginUrl);
      } else {
        throw new Error('Não foi possível abrir o navegador para login');
      }
    } catch (error: any) {
      console.error('Erro no login com Google:', error);
      throw error;
    }
  };

  const handleOAuthRedirect = async (token: string) => {
    try {
      await authHook.login(token);
    } catch (error: any) {
      console.error('Erro ao processar redirect OAuth:', error);
      throw error;
    }
  };

  // Configura listener para deep links OAuth2
  useEffect(() => {
    const handleDeepLink = (url: string) => {
      // Verifica se é um redirect OAuth2
      if (url.includes('/oauth2/redirect')) {
        const urlObj = new URL(url);
        const token = urlObj.searchParams.get('token');
        
        if (token) {
          handleOAuthRedirect(token).catch(error => {
            console.error('Erro ao processar token OAuth2:', error);
          });
        }
      }
    };

    // Listener para deep links
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    // Verifica se o app foi aberto com um deep link
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink(url);
      }
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  const value: AuthContextType = {
    ...authHook,
    loginWithGoogle,
    handleOAuthRedirect,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

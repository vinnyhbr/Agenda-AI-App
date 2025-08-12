import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';

// Tipos para o novo Drawer Navigator
export type DrawerParamList = {
  Inicio: undefined;
  Configuracoes: undefined;
};

// Tipos para o Stack Navigator principal (ATUALIZADO)
// Agora ele gerencia o fluxo de autenticação e o Drawer
export type RootStackParamList = {
  Login: undefined;
  ProfileSetup: undefined;
  AppDrawer: undefined; // Rota que renderiza todo o Drawer Navigator
};

// Propriedades de navegação para telas
export type ProfileSetupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileSetup'>;
export type HomeScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Inicio'>;
export type SettingsScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Configuracoes'>;

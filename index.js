import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent chama AppRegistry.registerComponent por baixo dos panos,
// mas é a maneira recomendada pelo Expo para registrar o componente raiz
// quando não se usa o Expo Router.
registerRootComponent(App);

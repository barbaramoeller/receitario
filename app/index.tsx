// Rota inicial do app. Não desenha interface: decide para onde mandar
// o usuário conforme exista ou não uma sessão guardada no aparelho.

import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { token, carregando } = useAuth();

  // Lendo o SecureStore. Dura alguns milissegundos, mas sem isso
  // o app piscaria a tela de login antes de abrir as abas.
  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#6B1E2E" />
      </View>
    );
  }

  return token ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />;
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBF6F7',
  },
});

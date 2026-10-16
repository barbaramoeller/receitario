// Rota inicial do app. Não desenha nada: só manda o usuário para o login.
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(auth)/login" />;
}

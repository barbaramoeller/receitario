// Layout do grupo de autenticação: login e cadastro, sem header.
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

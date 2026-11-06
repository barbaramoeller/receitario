// ORGANISM de navegação: junta as três abas numa experiência completa.
import { Redirect, Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/contexts/AuthContext';

export default function TabLayout() {
  const { token, carregando } = useAuth();

  // Enquanto lê o token guardado, não decide nada — senão pisca
  // a tela de login antes de entrar.
  if (carregando) return null;

  // A área logada só existe para quem tem sessão.
  // Sem isso, bastaria digitar a rota para entrar.
  if (!token) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: '#6B1E2E',
        tabBarInactiveTintColor: '#B08E96',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Receitas',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="fork.knife" color={color} />,
        }}
      />
      <Tabs.Screen
        name="porcoes"
        options={{
          title: 'Porções',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="plus.forwardslash.minus" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="componentes"
        options={{
          title: 'Componentes',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="square.grid.2x2.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

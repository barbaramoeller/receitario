// ORGANISM de navegação: junta as três abas numa experiência completa.
import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabLayout() {
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

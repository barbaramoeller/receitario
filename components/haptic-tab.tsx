// A partir da SDK 56 o expo-router não aceita mais importar de @react-navigation/*
// no código da aplicação. A API é a mesma, só muda o caminho do import.
import * as Haptics from 'expo-haptics';
import { PlatformPressable } from 'expo-router/react-navigation';
import type { BottomTabBarButtonProps } from 'expo-router/js-tabs';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Vibração leve ao pressionar a aba.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}

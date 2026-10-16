// Fallback para usar MaterialIcons no Android e na web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
export type IconSymbolName = keyof typeof MAPPING;

/**
 * Mapeamento SF Symbols -> Material Icons.
 * - Material Icons: https://icons.expo.fyi
 * - SF Symbols: app SF Symbols da Apple
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  // Ícones das abas do Receitário
  'fork.knife': 'restaurant-menu',
  'plus.forwardslash.minus': 'exposure',
  'square.grid.2x2.fill': 'grid-view',
} satisfies Record<string, MaterialIconName>;

/**
 * Ícone que usa SF Symbols no iOS e Material Icons no Android/web,
 * mantendo a aparência consistente entre plataformas.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}

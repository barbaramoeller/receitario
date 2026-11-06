import { Pressable, Text } from 'react-native';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  // Usado enquanto uma requisição está em andamento, para evitar envio duplicado.
  disabled?: boolean;
};

export function PrimaryButton({ title, onPress, disabled = false }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: '#6B1E2E',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>{title}</Text>
    </Pressable>
  );
}

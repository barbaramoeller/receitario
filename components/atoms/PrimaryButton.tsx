import { Pressable, Text } from 'react-native';

export function PrimaryButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: '#6B1E2E',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
      }}
    >
      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>{title}</Text>
    </Pressable>
  );
}
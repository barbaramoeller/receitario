import { Pressable, Text } from 'react-native';

export function OutlineButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderWidth: 1.5,
        borderColor: '#E4DEDF',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
      }}
    >
      <Text style={{ color: '#6B1E2E', fontWeight: '700', fontSize: 15 }}>{title}</Text>
    </Pressable>
  );
}

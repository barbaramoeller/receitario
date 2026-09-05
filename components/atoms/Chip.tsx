import { Pressable, Text } from 'react-native';

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: selected ? '#6B1E2E' : '#E4DEDF',
        backgroundColor: selected ? '#6B1E2E' : '#fff',
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      <Text style={{ color: selected ? '#fff' : '#3B1116', fontSize: 13 }}>{label}</Text>
    </Pressable>
  );
}
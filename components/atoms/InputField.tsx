import { Text, TextInput, TextInputProps, View } from 'react-native';

type Props = TextInputProps & { label?: string };

export function InputField({ label, style, ...props }: Props) {
  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#8A8A8A', marginBottom: 6 }}>
          {label.toUpperCase()}
        </Text>
      )}
      <TextInput
        placeholderTextColor="#B0AEB0"
        style={[
          { borderWidth: 1, borderColor: '#E4DEDF', borderRadius: 10, padding: 14, backgroundColor: '#fff' },
          style,
        ]}
        {...props}
      />
    </View>
  );
}
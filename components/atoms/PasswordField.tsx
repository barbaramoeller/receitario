import { useState } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';

type Props = TextInputProps & { label?: string };

export function PasswordField({ label, style, ...props }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#8A8A8A', marginBottom: 6 }}>
          {label.toUpperCase()}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#E4DEDF',
          borderRadius: 10,
          backgroundColor: '#fff',
          paddingRight: 14,
        }}
      >
        <TextInput
          placeholderTextColor="#B0AEB0"
          secureTextEntry={!visible}
          style={[{ flex: 1, padding: 14 }, style]}
          {...props}
        />
        <Pressable onPress={() => setVisible((v) => !v)}>
          <Text style={{ color: '#6B1E2E', fontWeight: '600', fontSize: 12 }}>
            {visible ? 'OCULTAR' : 'MOSTRAR'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

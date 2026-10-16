// ATOM — InputField
// Unidade mínima de entrada de texto. Ele não guarda o que foi digitado:
// recebe o valor pronto (value) e avisa quem o usa quando muda (onChangeText).
// Quem guarda o estado é sempre a molecule ou a screen.

import { ComponentProps } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type InputFieldProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  // Props extras do TextInput (keyboardType, autoCapitalize, multiline...)
  attributes?: ComponentProps<typeof TextInput>;
};

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  attributes,
}: InputFieldProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label.toUpperCase()}</Text> : null}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#B0AEB0"
        style={[styles.input, !!error && styles.inputError]}
        {...attributes}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8A8A8A',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E4DEDF',
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#fff',
    color: '#3B1116',
  },
  inputError: {
    borderColor: '#C0392B',
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    color: '#C0392B',
  },
});

import { Text, TextProps } from 'react-native';

export function Title({ style, ...props }: TextProps) {
  return (
    <Text
      style={[
        { fontSize: 22, fontWeight: '700', color: '#3B1116', marginBottom: 20 },
        style,
      ]}
      {...props}
    />
  );
}
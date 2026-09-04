import { InputField } from '@/components/atoms/InputField';
import { OutlineButton } from '@/components/atoms/OutlineButton';
import { PasswordField } from '@/components/atoms/PasswordField';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { router } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function entrar() {
    // TODO: integrar com autenticação real
    alert('Login efetuado!');
  }

  function criarConta() {
    router.push('/(tabs)');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FBF6F7' }}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=900&q=70&auto=format&fit=crop',
        }}
        style={{ height: 250, justifyContent: 'flex-end', padding: 24, paddingBottom: 26 }}
      >
        <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(60,13,25,0.75)' }} />
        <Text style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#E4BFC8' }}>
          Sua cozinha, registrada
        </Text>
        <Text style={{ fontSize: 40, color: '#fff', marginTop: 6 }}>Receitário</Text>
      </ImageBackground>

      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 26 }}>
        <InputField
          label="E-mail"
          placeholder="voce@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <PasswordField
          label="Senha"
          placeholder="••••••••"
          value={senha}
          onChangeText={setSenha}
        />

        <Text
          style={{
            alignSelf: 'flex-end',
            fontSize: 12.5,
            fontWeight: '500',
            color: '#9B7C84',
            marginTop: -8,
            marginBottom: 16,
          }}
          onPress={() => alert('Recuperação de senha em breve')}
        >
          Esqueci minha senha
        </Text>

        <PrimaryButton title="Entrar" onPress={entrar} />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#EEE0E4' }} />
          <Text style={{ fontSize: 11.5, color: '#B08E96' }}>ou</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#EEE0E4' }} />
        </View>

        <OutlineButton title="Criar uma conta" onPress={criarConta} />

        <Text
          style={{
            textAlign: 'center',
            fontSize: 11.5,
            lineHeight: 16,
            color: '#C0A2A9',
            marginTop: 16,
          }}
        >
          Ao entrar você concorda com os termos de uso e a política de privacidade.
        </Text>
      </ScrollView>
    </View>
  );
}

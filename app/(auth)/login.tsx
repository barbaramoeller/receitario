// SCREEN — Login
// A screen conhece a rota: ela monta o layout e decide a navegação.
// Toda a interface do formulário fica encapsulada em LoginForm.

import { router } from 'expo-router';
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

import { LoginForm } from '@/components/molecules/LoginForm';

export default function Login() {
  function entrar() {
    // TODO: integrar com autenticação real
    router.replace('/(tabs)');
  }

  return (
    <View style={styles.tela}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=900&q=70&auto=format&fit=crop',
        }}
        style={styles.capa}
      >
        <View style={styles.sombra} />
        <Text style={styles.eyebrow}>Sua cozinha, registrada</Text>
        <Text style={styles.marca}>Receitário</Text>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <LoginForm
          onSubmit={entrar}
          onCriarConta={() => router.push('/(auth)/cadastro')}
          onEsqueciSenha={() => Alert.alert('Recuperação de senha em breve')}
        />

        <Text style={styles.termos}>
          Ao entrar você concorda com os termos de uso e a política de privacidade.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#FBF6F7',
  },
  capa: {
    height: 250,
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 26,
  },
  sombra: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(60,13,25,0.75)',
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#E4BFC8',
  },
  marca: {
    fontSize: 40,
    color: '#fff',
    marginTop: 6,
  },
  conteudo: {
    padding: 24,
    paddingTop: 26,
  },
  termos: {
    textAlign: 'center',
    fontSize: 11.5,
    lineHeight: 16,
    color: '#C0A2A9',
    marginTop: 16,
  },
});

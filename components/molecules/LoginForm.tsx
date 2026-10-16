// MOLECULE — LoginForm
// Combina átomos (InputField, PasswordField, PrimaryButton, OutlineButton)
// numa função clara: autenticar. Guarda o estado dos campos e valida,
// mas NÃO navega: avisa a screen pelo onSubmit e ela decide para onde ir.

import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { InputField } from '@/components/atoms/InputField';
import { OutlineButton } from '@/components/atoms/OutlineButton';
import { PasswordField } from '@/components/atoms/PasswordField';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';

type LoginFormProps = {
  onSubmit: (email: string) => void;
  onCriarConta: () => void;
  onEsqueciSenha?: () => void;
};

export function LoginForm({ onSubmit, onCriarConta, onEsqueciSenha }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function entrar() {
    if (!email.includes('@')) {
      setErro('Informe um e-mail válido.');
      return;
    }
    if (senha.length < 6) {
      setErro('A senha precisa ter ao menos 6 caracteres.');
      return;
    }
    setErro('');
    onSubmit(email);
  }

  return (
    <View>
      <InputField
        label="E-mail"
        placeholder="voce@email.com"
        value={email}
        onChangeText={setEmail}
        attributes={{ keyboardType: 'email-address', autoCapitalize: 'none' }}
      />

      <PasswordField
        label="Senha"
        placeholder="••••••••"
        value={senha}
        onChangeText={setSenha}
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <Text style={styles.esqueci} onPress={onEsqueciSenha}>
        Esqueci minha senha
      </Text>

      <PrimaryButton title="Entrar" onPress={entrar} />

      <View style={styles.divisor}>
        <View style={styles.linha} />
        <Text style={styles.ou}>ou</Text>
        <View style={styles.linha} />
      </View>

      <OutlineButton title="Criar uma conta" onPress={onCriarConta} />
    </View>
  );
}

const styles = StyleSheet.create({
  erro: {
    fontSize: 12.5,
    color: '#C0392B',
    marginTop: -8,
    marginBottom: 8,
  },
  esqueci: {
    alignSelf: 'flex-end',
    fontSize: 12.5,
    fontWeight: '500',
    color: '#9B7C84',
    marginBottom: 16,
  },
  divisor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 20,
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEE0E4',
  },
  ou: {
    fontSize: 11.5,
    color: '#B08E96',
  },
});

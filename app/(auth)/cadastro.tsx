// SCREEN — Criar conta
// Estava dentro das abas, mas é uma tela de autenticação: o lugar dela é o grupo (auth).

import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { Chip } from '@/components/atoms/Chip';
import { InputField } from '@/components/atoms/InputField';
import { PasswordField } from '@/components/atoms/PasswordField';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Title } from '@/components/atoms/Title';
import { useAuth } from '@/contexts/AuthContext';
import { getRequestErrorMessage } from '@/services/requestError';

const RESTRICOES = ['Sem glúten', 'Sem lactose', 'Vegetariana', 'Vegana', 'Low carb', 'Nenhuma'];

export default function Cadastro() {
  const { cadastrar } = useAuth();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [selecionadas, setSelecionadas] = useState<string[]>([]);
  const [criando, setCriando] = useState(false);

  function toggle(item: string) {
    setSelecionadas((atual) =>
      atual.includes(item) ? atual.filter((r) => r !== item) : [...atual, item]
    );
  }

  async function criarConta() {
    if (!nome.trim() || !email.includes('@') || senha.length < 8) {
      Alert.alert('Revise os campos', 'Nome, e-mail válido e senha de 8 caracteres.');
      return;
    }

    setCriando(true);
    try {
      // Cria a conta e já entra, porque a confirmação por e-mail está desligada.
      await cadastrar(email.trim(), senha);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(
        'Não foi possível criar a conta',
        getRequestErrorMessage(error, 'Tente novamente em instantes.')
      );
    } finally {
      setCriando(false);
    }
  }

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Title>Criar conta</Title>

      <InputField
        label="Nome completo"
        placeholder="Como você aparece na Comunidade"
        value={nome}
        onChangeText={setNome}
      />

      <InputField
        label="E-mail"
        placeholder="voce@email.com"
        value={email}
        onChangeText={setEmail}
        attributes={{ keyboardType: 'email-address', autoCapitalize: 'none' }}
      />

      <PasswordField
        label="Senha"
        placeholder="Mínimo de 8 caracteres"
        value={senha}
        onChangeText={setSenha}
      />

      <View style={styles.chips}>
        {RESTRICOES.map((item) => (
          <Chip
            key={item}
            label={item}
            selected={selecionadas.includes(item)}
            onPress={() => toggle(item)}
          />
        ))}
      </View>

      <PrimaryButton
        title={criando ? 'Criando conta…' : 'Criar conta'}
        onPress={criarConta}
        disabled={criando}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#FAF6F5',
  },
  conteudo: {
    padding: 24,
    paddingTop: 60,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 8,
  },
});

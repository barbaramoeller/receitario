// SCREEN — Componentes
// Vitrine da biblioteca: mostra cada peça isolada, com o nível a que pertence.
// Serve para a apresentação da atividade de Atomic Design.

import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip } from '@/components/atoms/Chip';
import { InputField } from '@/components/atoms/InputField';
import { OutlineButton } from '@/components/atoms/OutlineButton';
import { PasswordField } from '@/components/atoms/PasswordField';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Title } from '@/components/atoms/Title';
import { RecipeListItem } from '@/components/molecules/RecipeListItem';

export default function Componentes() {
  const [texto, setTexto] = useState('');
  const [senha, setSenha] = useState('');
  const [ativo, setAtivo] = useState(false);
  const [evento, setEvento] = useState('Nenhuma ação ainda.');

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={styles.eyebrow}>Atomic Design</Text>
        <Text style={styles.titulo}>Biblioteca de componentes</Text>
        <Text style={styles.subtitulo}>
          Cada peça abaixo vive em components/ e não conhece nenhuma tela.
        </Text>

        <Bloco nivel="Átomo" nome="Title">
          <Title style={styles.semMargem}>Um título de seção</Title>
        </Bloco>

        <Bloco nivel="Átomo" nome="InputField">
          <InputField
            label="Buscar"
            placeholder="Digite para testar"
            value={texto}
            onChangeText={setTexto}
          />
          <Text style={styles.nota}>Valor atual: {texto || '—'}</Text>
        </Bloco>

        <Bloco nivel="Átomo" nome="PasswordField">
          <PasswordField
            label="Senha"
            placeholder="••••••••"
            value={senha}
            onChangeText={setSenha}
          />
        </Bloco>

        <Bloco nivel="Átomo" nome="PrimaryButton e OutlineButton">
          <PrimaryButton title="Ação principal" onPress={() => setEvento('Botão principal.')} />
          <OutlineButton title="Ação secundária" onPress={() => setEvento('Botão secundário.')} />
          <Text style={styles.nota}>{evento}</Text>
        </Bloco>

        <Bloco nivel="Átomo" nome="Chip">
          <View style={styles.linha}>
            <Chip label="Sem glúten" selected={ativo} onPress={() => setAtivo((v) => !v)} />
            <Chip label="Vegana" />
            <Chip label="Low carb" />
          </View>
        </Bloco>

        <Bloco nivel="Molécula" nome="RecipeListItem">
          <RecipeListItem
            titulo="Pão de queijo"
            categoria="Salgado"
            tempo="25 min"
            onRemove={() => setEvento('Removido: pão de queijo.')}
          />
        </Bloco>
      </ScrollView>
    </SafeAreaView>
  );
}

// Moldura da vitrine. Fica aqui porque só serve a esta tela.
function Bloco({
  nivel,
  nome,
  children,
}: {
  nivel: string;
  nome: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.bloco}>
      <View style={styles.blocoTopo}>
        <Text style={styles.badge}>{nivel}</Text>
        <Text style={styles.blocoNome}>{nome}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#FAF6F5',
  },
  conteudo: {
    padding: 24,
    paddingBottom: 48,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#B08E96',
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#3B1116',
    marginTop: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: '#9B7C84',
    marginTop: 4,
    marginBottom: 24,
  },
  bloco: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EEE0E4',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
  },
  blocoTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  badge: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#6B1E2E',
    backgroundColor: '#FBF1F3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
  blocoNome: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#3B1116',
  },
  linha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nota: {
    fontSize: 12.5,
    color: '#9B7C84',
    marginTop: 10,
  },
  semMargem: {
    marginBottom: 0,
  },
});

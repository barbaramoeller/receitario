// SCREEN — Receitas
// A tela agora busca os dados na API em vez de guardar uma lista fixa.
// Ela controla os quatro estados da interface: idle, loading, success e error.

import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RecipeForm } from '@/components/molecules/RecipeForm';
import { RecipeList } from '@/components/organisms/RecipeList';
import { useAuth } from '@/contexts/AuthContext';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { criarReceita, excluirReceita, listarReceitas } from '@/services/receitasApi';
import { getRequestErrorMessage } from '@/services/requestError';
import type { NovaReceita, Receita } from '@/types/receita';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Receitas() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  const { isConnected } = useNetworkStatus();
  const { sair } = useAuth();

  // Valor derivado da lista: calculado a cada render, sem estado nem efeito.
  // Guardar isso num useState exigiria mantê-lo sincronizado na mão.
  const mensagem =
    receitas.length === 0
      ? 'Nenhuma receita cadastrada'
      : receitas.length === 1
        ? 'Existe 1 receita cadastrada'
        : `Existem ${receitas.length} receitas cadastradas`;

  // Busca as receitas na API.
  // O parâmetro continuaValendo serve para descartar uma resposta que
  // chegou tarde: se a rede oscilar, duas buscas podem correr ao mesmo
  // tempo e a mais antiga sobrescreveria a mais nova.
  const carregar = useCallback(async (continuaValendo: () => boolean = () => true) => {
    setStatus('loading');
    setErro('');

    try {
      const dados = await listarReceitas();
      if (!continuaValendo()) return;
      setReceitas(dados);
      setStatus('success');
    } catch (error) {
      if (!continuaValendo()) return;
      setErro(getRequestErrorMessage(error, 'Não foi possível carregar as receitas.'));
      setStatus('error');
    }
  }, []);

  // Só busca depois de saber o estado da rede.
  // null significa que o NetInfo ainda não respondeu.
  useEffect(() => {
    if (isConnected === null) return;

    let ativo = true;

    // O lint avisa que carregar() muda o estado logo no início.
    // Aqui é intencional: é assim que o indicador de carregamento aparece
    // no mesmo instante em que a busca começa.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void carregar(() => ativo);

    // Roda quando a tela sai do ar ou quando a rede muda de novo.
    return () => {
      ativo = false;
    };
  }, [isConnected, carregar]);

  async function handleAdicionar(nova: NovaReceita) {
    setSalvando(true);
    try {
      const criada = await criarReceita(nova);
      setReceitas((atuais) => [...atuais, criada]);
    } catch (error) {
      Alert.alert(
        'Não foi possível salvar',
        getRequestErrorMessage(error, 'Tente novamente em instantes.')
      );
    } finally {
      setSalvando(false);
    }
  }

  async function handleRemover(id: string) {
    // Guarda a lista atual para poder desfazer se a API recusar.
    const anteriores = receitas;
    setReceitas((atuais) => atuais.filter((receita) => receita.id !== id));

    try {
      await excluirReceita(id);
    } catch (error) {
      setReceitas(anteriores);
      Alert.alert(
        'Não foi possível excluir',
        getRequestErrorMessage(error, 'Tente novamente em instantes.')
      );
    }
  }

  const cabecalho = (
    <View>
      <View style={styles.topo}>
        <View>
          <Text style={styles.eyebrow}>Receitário</Text>
          <Text style={styles.titulo}>Minhas receitas</Text>
        </View>
        <Pressable onPress={sair} hitSlop={8}>
          <Text style={styles.sair}>Sair</Text>
        </Pressable>
      </View>
      <Text style={styles.mensagem}>{mensagem}</Text>
      <RecipeForm onSubmit={handleAdicionar} enviando={salvando} />
    </View>
  );

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      {isConnected === false ? (
        <View style={styles.aviso}>
          <Text style={styles.avisoTexto}>
            Sem conexão. Mostrando as receitas salvas no aparelho.
          </Text>
        </View>
      ) : null}

      {status === 'loading' ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#6B1E2E" />
          <Text style={styles.centroTexto}>Carregando receitas…</Text>
        </View>
      ) : null}

      {status === 'error' ? (
        <View style={styles.centro}>
          <Text style={styles.erroTitulo}>Não deu para carregar</Text>
          <Text style={styles.centroTexto}>{erro}</Text>
          <Pressable onPress={() => carregar()} style={styles.botaoRetry}>
            <Text style={styles.botaoRetryTexto}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : null}

      {status === 'success' ? (
        <RecipeList receitas={receitas} onRemove={handleRemover} header={cabecalho} />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#FAF6F5',
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
  topo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  sair: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B1E2E',
    paddingTop: 6,
  },
  mensagem: {
    fontSize: 13,
    color: '#9B7C84',
    marginTop: 4,
    marginBottom: 20,
  },
  aviso: {
    backgroundColor: '#FDF1DF',
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  avisoTexto: {
    fontSize: 12.5,
    color: '#A66300',
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 10,
  },
  centroTexto: {
    fontSize: 13.5,
    color: '#9B7C84',
    textAlign: 'center',
  },
  erroTitulo: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3B1116',
  },
  botaoRetry: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: '#6B1E2E',
  },
  botaoRetryTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

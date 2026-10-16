// SCREEN — Receitas
// Aqui mora o estado da lista. A screen não desenha campos nem itens "na mão":
// ela só guarda os dados, define as ações e entrega tudo para os componentes.

import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NovaReceita, RecipeForm } from '@/components/molecules/RecipeForm';
import { Receita, RecipeList } from '@/components/organisms/RecipeList';

export default function Receitas() {
  const [receitas, setReceitas] = useState<Receita[]>([
    { id: '1', titulo: 'Bolo de cenoura', categoria: 'Doce', tempo: '50 min' },
    { id: '2', titulo: 'Strogonoff de frango', categoria: 'Salgado', tempo: '35 min' },
    { id: '3', titulo: 'Limonada suíça', categoria: 'Bebida', tempo: '10 min' },
  ]);

  const [mensagem, setMensagem] = useState('');

  // useEffect: roda sempre que o estado de receitas muda.
  useEffect(() => {
    if (receitas.length === 0) {
      setMensagem('Nenhuma receita cadastrada');
    } else if (receitas.length === 1) {
      setMensagem('Existe 1 receita cadastrada');
    } else {
      setMensagem(`Existem ${receitas.length} receitas cadastradas`);
    }
  }, [receitas]);

  function handleAdicionar(nova: NovaReceita) {
    setReceitas((atuais) => [
      ...atuais,
      { id: Date.now().toString(), ...nova },
    ]);
  }

  function handleRemover(id: string) {
    setReceitas((atuais) => atuais.filter((receita) => receita.id !== id));
  }

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <RecipeList
        receitas={receitas}
        onRemove={handleRemover}
        header={
          <View>
            <Text style={styles.eyebrow}>Receitário</Text>
            <Text style={styles.titulo}>Minhas receitas</Text>
            <Text style={styles.mensagem}>{mensagem}</Text>
            <RecipeForm onSubmit={handleAdicionar} />
          </View>
        }
      />
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
  mensagem: {
    fontSize: 13,
    color: '#9B7C84',
    marginTop: 4,
    marginBottom: 20,
  },
});

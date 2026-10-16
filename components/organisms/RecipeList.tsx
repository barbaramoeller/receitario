// ORGANISM — RecipeList
// Bloco maior: junta várias RecipeListItem numa FlatList.
// A FlatList é virtualizada, ou seja, só desenha os itens que estão
// visíveis na tela — diferente da ScrollView, que monta todos de uma vez.

import { ReactElement } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { RecipeListItem } from '@/components/molecules/RecipeListItem';

export type Receita = {
  id: string;
  titulo: string;
  categoria: string;
  tempo?: string;
};

type RecipeListProps = {
  receitas: Receita[];
  onRemove: (id: string) => void;
  // Conteúdo que rola junto com a lista (o formulário, por exemplo).
  header?: ReactElement;
};

export function RecipeList({ receitas, onRemove, header }: RecipeListProps) {
  return (
    <FlatList
      data={receitas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RecipeListItem
          titulo={item.titulo}
          categoria={item.categoria}
          tempo={item.tempo}
          onRemove={() => onRemove(item.id)}
        />
      )}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <View style={styles.vazio}>
          <Text style={styles.vazioTitulo}>Nenhuma receita ainda</Text>
          <Text style={styles.vazioTexto}>
            Use o formulário acima para adicionar a primeira.
          </Text>
        </View>
      }
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  conteudo: {
    padding: 24,
    paddingBottom: 48,
  },
  vazio: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 6,
  },
  vazioTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3B1116',
  },
  vazioTexto: {
    fontSize: 13,
    color: '#9B7C84',
    textAlign: 'center',
  },
});

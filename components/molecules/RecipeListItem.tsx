// MOLECULE — RecipeListItem
// Mostra UMA receita da lista. Não sabe nada sobre a lista inteira:
// recebe os dados por props e avisa quem o usa quando o botão é pressionado.

import { Pressable, StyleSheet, Text, View } from 'react-native';

type RecipeListItemProps = {
  titulo: string;
  categoria: string;
  tempo?: string;
  onRemove: () => void;
};

export function RecipeListItem({ titulo, categoria, tempo, onRemove }: RecipeListItemProps) {
  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.detalhe}>
          {categoria}
          {tempo ? ` · ${tempo}` : ''}
        </Text>
      </View>

      <Pressable onPress={onRemove} hitSlop={8} style={styles.remover}>
        <Text style={styles.removerTexto}>Remover</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EEE0E4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  info: {
    flexShrink: 1,
    gap: 3,
  },
  titulo: {
    fontSize: 15.5,
    fontWeight: '600',
    color: '#3B1116',
  },
  detalhe: {
    fontSize: 12.5,
    color: '#9B7C84',
  },
  remover: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#FBF1F3',
  },
  removerTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B1E2E',
  },
});

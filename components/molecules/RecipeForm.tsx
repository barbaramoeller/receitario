// MOLECULE — RecipeForm
// Combina três InputField e um PrimaryButton numa função clara: cadastrar receita.
// Cada campo tem seu próprio useState. O fluxo é sempre o mesmo:
// usuário digita -> onChangeText -> setTitulo -> muda o state -> renderiza de novo.

import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { InputField } from '@/components/atoms/InputField';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';

export type NovaReceita = {
  titulo: string;
  categoria: string;
  tempo: string;
};

type RecipeFormProps = {
  onSubmit: (receita: NovaReceita) => void;
};

export function RecipeForm({ onSubmit }: RecipeFormProps) {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tempo, setTempo] = useState('');
  const [erro, setErro] = useState('');

  function handleSubmit() {
    if (!titulo.trim()) {
      setErro('Informe o nome da receita.');
      return;
    }
    if (!categoria.trim()) {
      setErro('Informe a categoria.');
      return;
    }

    setErro('');
    onSubmit({
      titulo: titulo.trim(),
      categoria: categoria.trim(),
      tempo: tempo.trim() || '—',
    });

    // Limpa o formulário depois de enviar.
    setTitulo('');
    setCategoria('');
    setTempo('');
  }

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Nova receita</Text>

      <InputField
        label="Nome"
        placeholder="Bolo de cenoura"
        value={titulo}
        onChangeText={setTitulo}
      />

      <InputField
        label="Categoria"
        placeholder="Doce, salgado, bebida..."
        value={categoria}
        onChangeText={setCategoria}
      />

      <InputField
        label="Tempo de preparo"
        placeholder="40 min"
        value={tempo}
        onChangeText={setTempo}
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <PrimaryButton title="Adicionar receita" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EEE0E4',
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B1116',
    marginBottom: 16,
  },
  erro: {
    fontSize: 12.5,
    color: '#C0392B',
    marginBottom: 8,
  },
});

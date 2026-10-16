// SCREEN — Porções
// Exercício da aula de Hooks: contador com incremento e decremento,
// sem deixar o valor ficar abaixo de zero.
//
// Regra do useState: nunca altere a variável direto (porcoes = porcoes + 1).
// Sempre use a função que o hook devolve (setPorcoes), senão a tela não redesenha.

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Porcoes() {
  const [porcoes, setPorcoes] = useState(0);

  function aumentar() {
    setPorcoes(porcoes + 1);
  }

  function diminuir() {
    // Não permite valor menor que 0.
    if (porcoes === 0) return;
    setPorcoes(porcoes - 1);
  }

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <View style={styles.conteudo}>
        <Text style={styles.eyebrow}>Calculadora</Text>
        <Text style={styles.titulo}>Porções</Text>
        <Text style={styles.ajuda}>Quantas pessoas vão comer?</Text>

        <View style={styles.contador}>
          <Pressable
            onPress={diminuir}
            disabled={porcoes === 0}
            style={[styles.botao, porcoes === 0 && styles.botaoDesativado]}
          >
            <Text style={styles.botaoTexto}>−</Text>
          </Pressable>

          <Text style={styles.numero}>{porcoes}</Text>

          <Pressable onPress={aumentar} style={styles.botao}>
            <Text style={styles.botaoTexto}>+</Text>
          </Pressable>
        </View>

        <Text style={styles.rodape}>
          {porcoes === 0
            ? 'Toque no + para começar'
            : `Receita ajustada para ${porcoes} ${porcoes === 1 ? 'porção' : 'porções'}`}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#FAF6F5',
  },
  conteudo: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#B08E96',
    textAlign: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#3B1116',
    textAlign: 'center',
    marginTop: 4,
  },
  ajuda: {
    fontSize: 13,
    color: '#9B7C84',
    textAlign: 'center',
    marginTop: 4,
  },
  contador: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    marginTop: 40,
  },
  botao: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6B1E2E',
  },
  botaoDesativado: {
    backgroundColor: '#E4DEDF',
  },
  botaoTexto: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '600',
    color: '#fff',
  },
  numero: {
    fontSize: 56,
    fontWeight: '700',
    color: '#3B1116',
    minWidth: 90,
    textAlign: 'center',
  },
  rodape: {
    fontSize: 13,
    color: '#9B7C84',
    textAlign: 'center',
    marginTop: 40,
  },
});

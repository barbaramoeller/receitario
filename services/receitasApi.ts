// As operações de receita contra o banco do Supabase, via PostgREST.
// A tela nunca fala com o axios direto: ela chama estas funções.
//
// Repare que nenhuma função manda o user_id. Quem preenche é o próprio
// banco, com o default auth.uid(), lido do token. Assim o aplicativo
// não tem como criar receita no nome de outra pessoa.

import AsyncStorage from '@react-native-async-storage/async-storage';

import { apiClient } from '@/services/apiClient';
import type { NovaReceita, Receita } from '@/types/receita';

export const CACHE_KEY = 'receitas';

function normalizar(bruta: any): Receita {
  return {
    id: String(bruta.id),
    titulo: String(bruta.titulo ?? ''),
    categoria: String(bruta.categoria ?? ''),
    tempo: bruta.tempo ? String(bruta.tempo) : undefined,
  };
}

// GET /rest/v1/receitas — com cache local como rede de segurança.
// As políticas do banco garantem que só voltam as receitas do dono do token.
export async function listarReceitas(): Promise<Receita[]> {
  try {
    const response = await apiClient.get<any[]>(
      '/rest/v1/receitas?select=*&order=created_at.asc'
    );
    const receitas = response.data.map(normalizar);

    // Deu certo: guarda uma cópia para quando faltar rede.
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(receitas));
    return receitas;
  } catch (error) {
    // Falhou: tenta a cópia salva antes de desistir.
    const salvas = await AsyncStorage.getItem(CACHE_KEY);
    if (salvas) {
      return JSON.parse(salvas) as Receita[];
    }
    throw error;
  }
}

// POST /rest/v1/receitas
// O cabeçalho Prefer faz o PostgREST devolver a linha criada,
// com o id que o banco gerou. Sem ele a resposta vem vazia.
export async function criarReceita(nova: NovaReceita): Promise<Receita> {
  const response = await apiClient.post<any[]>('/rest/v1/receitas', nova, {
    headers: { Prefer: 'return=representation' },
  });
  return normalizar(response.data[0]);
}

// DELETE /rest/v1/receitas?id=eq.<id>
// No PostgREST o filtro vai na query string, não no caminho.
export async function excluirReceita(id: string): Promise<void> {
  await apiClient.delete(`/rest/v1/receitas?id=eq.${id}`);
}

// Usado ao sair da conta, para não deixar receitas de um usuário
// visíveis para quem entrar depois no mesmo aparelho.
export async function limparCache() {
  await AsyncStorage.removeItem(CACHE_KEY);
}

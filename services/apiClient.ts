// Configuração HTTP centralizada, apontando para o projeto Supabase.
//
// O Supabase usa dois cabeçalhos, com papéis diferentes:
//   apikey        — a chave pública do projeto, em TODA chamada
//   Authorization — o token do usuário logado, só quando existe sessão
//
// A chave publicável (sb_publishable_...) NÃO é um JWT, então ela nunca
// pode ir no Authorization: o servidor tentaria lê-la como token e falharia.
// Quem identifica a pessoa é só o token devolvido pelo login.
//
// O interceptor abaixo cuida disso, então nenhuma tela precisa lembrar.

import axios from 'axios';

import { getTokenEmMemoria } from '@/services/session';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const apiClient = axios.create({
  baseURL: SUPABASE_URL,
  timeout: 8000,
});

apiClient.interceptors.request.use((config) => {
  // Vai em toda chamada, inclusive nas de login e cadastro.
  config.headers.set('apikey', SUPABASE_ANON_KEY);

  // Só quando há alguém logado. Sem token, a chamada é anônima —
  // e as políticas do banco não devolvem receita nenhuma.
  const token = getTokenEmMemoria();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});
// As chamadas de autenticação contra o serviço de auth do Supabase.
// Endereços e formato vêm do GoTrue, que é o servidor de auth que ele usa.

import { apiClient } from '@/services/apiClient';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};

// POST /auth/v1/token?grant_type=password
export async function entrarRequest(email: string, senha: string) {
  const response = await apiClient.post<LoginResponse>(
    '/auth/v1/token?grant_type=password',
    { email, password: senha }
  );
  return response.data;
}

// POST /auth/v1/signup
export async function cadastrarRequest(email: string, senha: string) {
  const response = await apiClient.post('/auth/v1/signup', {
    email,
    password: senha,
  });
  return response.data;
}

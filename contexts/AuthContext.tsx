// Guarda a sessão do usuário e deixa ela disponível para o app inteiro.
// Sem isso, cada tela precisaria ler o token do SecureStore por conta própria.

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import { cadastrarRequest, entrarRequest } from '@/services/authApi';
import { limparCache } from '@/services/receitasApi';
import { apagarToken, carregarToken, salvarToken } from '@/services/session';

type AuthContextValue = {
  token: string | null;
  // true enquanto o app ainda está lendo o token guardado no aparelho.
  carregando: boolean;
  entrar: (email: string, senha: string) => Promise<void>;
  cadastrar: (email: string, senha: string) => Promise<void>;
  sair: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Ao abrir o app, tenta recuperar a sessão anterior.
  // É o que evita pedir login toda vez que a pessoa abre o aplicativo.
  useEffect(() => {
    let ativo = true;

    carregarToken()
      .then((salvo) => {
        if (ativo) setToken(salvo);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  const entrar = useCallback(async (email: string, senha: string) => {
    const dados = await entrarRequest(email, senha);
    await salvarToken(dados.access_token);
    setToken(dados.access_token);
  }, []);

  const cadastrar = useCallback(async (email: string, senha: string) => {
    await cadastrarRequest(email, senha);
    // Com a confirmação de e-mail desligada, já dá para entrar direto.
    const dados = await entrarRequest(email, senha);
    await salvarToken(dados.access_token);
    setToken(dados.access_token);
  }, []);

  const sair = useCallback(async () => {
    await apagarToken();
    await limparCache();
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, carregando, entrar, cadastrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth precisa estar dentro de um AuthProvider.');
  }
  return contexto;
}

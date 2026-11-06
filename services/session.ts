// Onde o token de acesso fica guardado no aparelho.
//
// No celular usamos o SecureStore, que grava no cofre do sistema
// (Keychain no iOS, Keystore no Android), como o slide 15 pede.
//
// O navegador não tem cofre: o SecureStore nem existe lá. Então, só na web,
// caímos para o AsyncStorage — que vira localStorage. É menos seguro, e por
// isso vale apenas para desenvolvimento. No aplicativo de verdade, que é
// onde o trabalho roda, o token nunca sai do cofre.

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const ACCESS_TOKEN_KEY = 'accessToken';
const naWeb = Platform.OS === 'web';

// Guardamos o token em memória também, para o interceptor do axios
// não precisar fazer uma leitura assíncrona a cada requisição.
let tokenEmMemoria: string | null = null;

export async function salvarToken(token: string) {
  tokenEmMemoria = token;

  if (naWeb) {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
    return;
  }
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export async function carregarToken() {
  tokenEmMemoria = naWeb
    ? await AsyncStorage.getItem(ACCESS_TOKEN_KEY)
    : await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);

  return tokenEmMemoria;
}

export async function apagarToken() {
  tokenEmMemoria = null;

  if (naWeb) {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    return;
  }
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}

export function getTokenEmMemoria() {
  return tokenEmMemoria;
}
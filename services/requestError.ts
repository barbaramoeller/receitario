// Traduz a falha técnica em uma frase que o usuário entende.
// Sem isso, a tela mostraria "Network Error" ou "Request failed with status code 500".

import axios from 'axios';

export function getRequestErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError<{ message?: unknown }>(error)) {
    return fallback;
  }

  // A requisição passou do tempo limite de 8 segundos.
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return 'A solicitação demorou muito. Tente novamente.';
  }

  // Não houve resposta: servidor fora do ar ou aparelho sem rede.
  if (!error.response) {
    return 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.';
  }

  // Se a própria API mandou uma mensagem, ela é a melhor explicação.
  const responseMessage = error.response.data?.message;
  if (typeof responseMessage === 'string' && responseMessage.trim()) {
    return responseMessage;
  }

  if (error.response.status === 404) {
    return 'Receita não encontrada no servidor.';
  }

  return `A solicitação falhou (erro ${error.response.status}). Tente novamente.`;
}

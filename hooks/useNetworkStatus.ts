// Acompanha a conexão do aparelho em tempo real.
// null = ainda não sabemos. false = sem conexão. true = conectado.

import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    // addEventListener devolve a função que cancela a inscrição.
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(Boolean(state.isConnected && state.isInternetReachable !== false));
    });

    // Devolver a função no useEffect faz o React cancelar a inscrição
    // quando a tela sai do ar. Sem isso, fica vazando listener.
    return unsubscribe;
  }, []);

  return { isConnected };
}

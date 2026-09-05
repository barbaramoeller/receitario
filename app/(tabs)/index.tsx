import { Chip } from '@/components/atoms/Chip';
import { InputField } from '@/components/atoms/InputField';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Title } from '@/components/atoms/Title';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

const RESTRICOES = ['Sem glúten', 'Sem lactose', 'Vegetariana', 'Vegana', 'Low carb', 'Nenhuma'];

export default function Index() {
  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  function toggle(item: string) {
    setSelecionadas((atual) =>
      atual.includes(item) ? atual.filter((r) => r !== item) : [...atual, item]
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAF6F5' }} contentContainerStyle={{ padding: 24, paddingTop: 60 }}>
      <Title>Criar conta</Title>

      <InputField label="Nome completo" placeholder="Como você aparece na Comunidade" />
      <InputField label="E-mail" placeholder="voce@email.com" keyboardType="email-address" />
      <InputField label="Senha" placeholder="Mínimo de 8 caracteres" secureTextEntry />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, marginBottom: 8 }}>
        {RESTRICOES.map((item) => (
          <Chip
            key={item}
            label={item}
            selected={selecionadas.includes(item)}
            onPress={() => toggle(item)}
          />
        ))}
      </View>

      <PrimaryButton title="Criar conta" onPress={() => alert('Conta criada!')} />
    </ScrollView>
  );
}
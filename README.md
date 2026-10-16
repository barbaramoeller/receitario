# Receitário

Aplicativo de receitas em React Native com Expo, desenvolvido na disciplina de
Desenvolvimento para Dispositivos Móveis (Unochapecó).

## Rodando o projeto

```bash
npm install
npx expo start
```

Abra pelo Expo Go lendo o QR code, ou pressione `w` para abrir no navegador.

O projeto usa **Expo SDK 57**. Se o Expo Go reclamar de incompatibilidade,
atualize o app no celular ou rode `npx expo install expo@^57.0.0 && npx expo install --fix`.

## Organização

O projeto segue Atomic Design: a interface reutilizável fica em `components/`
e as rotas ficam em `app/`.

```
app/
├── index.tsx              Redireciona para o login
├── _layout.tsx            Stack raiz
├── (auth)/
│   ├── login.tsx
│   └── cadastro.tsx
└── (tabs)/
    ├── _layout.tsx        Bottom tabs
    ├── index.tsx          Receitas (lista + formulário)
    ├── porcoes.tsx        Contador de porções
    └── componentes.tsx    Vitrine dos componentes

components/
├── atoms/                 Peças mínimas
│   ├── Chip.tsx
│   ├── InputField.tsx
│   ├── OutlineButton.tsx
│   ├── PasswordField.tsx
│   ├── PrimaryButton.tsx
│   └── Title.tsx
├── molecules/             Átomos combinados com uma função clara
│   ├── LoginForm.tsx
│   ├── RecipeForm.tsx
│   └── RecipeListItem.tsx
└── organisms/             Blocos maiores
    └── RecipeList.tsx
```

### A regra que mantém isso organizado

- **Átomo**: não guarda estado nem conhece tela nenhuma. Recebe props e desenha.
- **Molécula**: combina átomos e pode guardar o estado dos próprios campos,
  mas não navega — avisa quem a usa através de um callback.
- **Organismo**: junta moléculas em um bloco completo (a lista, a barra de abas).
- **Screen**: guarda os dados, decide as ações e a navegação. Não desenha
  interface "na mão".

## Conceitos aplicados

| Onde | O quê |
|---|---|
| `RecipeForm` | `useState` por campo, validação e limpeza após enviar |
| `RecipeList` | `FlatList` com `keyExtractor`, `renderItem` e `ListEmptyComponent` |
| `(tabs)/index.tsx` | `useEffect` reagindo à mudança da lista |
| `porcoes.tsx` | `useState` com regra de limite (nunca abaixo de zero) |

## Convenções

- Imports internos usam o alias `@/` (configurado no `tsconfig.json`).
- A partir da SDK 56 o Expo Router não aceita importar de `@react-navigation/*`
  no código da aplicação. Use `expo-router/react-navigation`,
  `expo-router/js-tabs` ou `expo-router/js-stack`.
- Antes de commitar: `npx tsc --noEmit` e `npx eslint .`

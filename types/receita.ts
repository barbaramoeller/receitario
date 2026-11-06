// O contrato de dados que as telas esperam receber da API.
// Deixar isso em um arquivo só evita que cada tela invente o seu formato.

export type Receita = {
  id: string;
  titulo: string;
  categoria: string;
  tempo?: string;
};

// O que o formulário envia para criar uma receita.
// Não tem id: quem gera o id é o servidor.
export type NovaReceita = {
  titulo: string;
  categoria: string;
  tempo: string;
};

export type Medico = {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
  instituicao: string;
  sobre?: string;
  email?: string;
  telefone?: string;
};

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  EditarPerfil: { usuarioId?: string };
  PerfilMedico: { medico: Medico };
};
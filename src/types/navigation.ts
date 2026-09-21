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

export type TipoDocumento = 'Receita' | 'Laudo' | 'Recomendacao';

export type DocumentoMedico = {
  id: string;
  tipo: TipoDocumento;
  titulo: string;
  dataEmissao: string;
  descricao: string;
  medicoNome: string;
  medicoEspecialidade: string;
  crm: string;
};

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  EditarPerfil: { usuarioId?: string };
  PerfilMedico: { medico: Medico };
  Documentos: undefined;
};
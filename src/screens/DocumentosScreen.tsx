import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, DocumentoMedico, TipoDocumento } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Documentos'>;

// Exemplo de dados de documentos emitidos por médicos
const DOCUMENTOS_EXEMPLO: DocumentoMedico[] = [
  {
    id: '1',
    tipo: 'Receita',
    titulo: 'Prescrição Amoxicilina 500mg',
    dataEmissao: '15/08/2026',
    descricao: 'Tomar 1 comprimido de 8 em 8 horas por 7 dias.',
    medicoNome: 'Dra. Ana Silva',
    medicoEspecialidade: 'Cardiologia',
    crm: '123456-SP',
  },
  {
    id: '2',
    tipo: 'Laudo',
    titulo: 'Laudo de Eletrocardiograma (ECG)',
    dataEmissao: '10/08/2026',
    descricao: 'Ritmo sinusal normal sem alterações de repolarização ventricular.',
    medicoNome: 'Dra. Ana Silva',
    medicoEspecialidade: 'Cardiologia',
    crm: '123456-SP',
  },
  {
    id: '3',
    tipo: 'Recomendacao',
    titulo: 'Plano de Atividade Física Adaptada',
    dataEmissao: '05/08/2026',
    descricao: 'Praticar caminhadas de 30 minutos 3x por semana.',
    medicoNome: 'Dr. Carlos Souza',
    medicoEspecialidade: 'Pediatria / Esporte',
    crm: '654321-RJ',
  },
  {
    id: '4',
    tipo: 'Receita',
    titulo: 'Pomada Dermatológica Hidratante',
    dataEmissao: '01/09/2026',
    descricao: 'Aplicar nas áreas afetadas 2 vezes ao dia após o banho.',
    medicoNome: 'Dra. Mariana Costa',
    medicoEspecialidade: 'Dermatologia',
    crm: '987654-MG',
  },
];

export default function DocumentosScreen({ navigation }: Props) {
  const [filtroTipo, setFiltroTipo] = useState<'Todos' | TipoDocumento>('Todos');

  // Filtra os documentos de acordo com a aba selecionada
  const documentosFiltrados = DOCUMENTOS_EXEMPLO.filter(
    (doc) => filtroTipo === 'Todos' || doc.tipo === filtroTipo
  );

  // Agrupa os documentos filtrados por Médico
  const documentosPorMedico = documentosFiltrados.reduce((acc, doc) => {
    if (!acc[doc.medicoNome]) {
      acc[doc.medicoNome] = {
        especialidade: doc.medicoEspecialidade,
        crm: doc.crm,
        documentos: [],
      };
    }
    acc[doc.medicoNome].documentos.push(doc);
    return acc;
  }, {} as Record<string, { especialidade: string; crm: string; documentos: DocumentoMedico[] }>);

  // Cor dos badges de tipo
  const getBadgeStyle = (tipo: TipoDocumento) => {
    switch (tipo) {
      case 'Receita':
        return 'bg-emerald-950 text-emerald-400 border-emerald-800';
      case 'Laudo':
        return 'bg-blue-950 text-blue-400 border-blue-800';
      case 'Recomendacao':
        return 'bg-amber-950 text-amber-400 border-amber-800';
    }
  };

  return (
    <View className="flex-1 bg-slate-900 px-4 pt-4">
      {/* Filtros por Categoria (Abas) */}
      <View className="flex-row mb-6 bg-slate-800 p-1.5 rounded-xl border border-slate-700 justify-between">
        {(['Todos', 'Receita', 'Laudo', 'Recomendacao'] as const).map((tipo) => (
          <TouchableOpacity
            key={tipo}
            onPress={() => setFiltroTipo(tipo)}
            className={`px-3 py-2 rounded-lg ${
              filtroTipo === tipo ? 'bg-blue-600' : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                filtroTipo === tipo ? 'text-white' : 'text-slate-400'
              }`}
            >
              {tipo === 'Recomendacao' ? 'Recomendações' : tipo === 'Receita' ? 'Receitas' : tipo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista Agrupada por Médico */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {Object.keys(documentosPorMedico).length === 0 ? (
          <Text className="text-slate-500 text-center mt-8">Nenhum documento encontrado nesta categoria.</Text>
        ) : (
          Object.entries(documentosPorMedico).map(([medicoNome, grupo]) => (
            <View key={medicoNome} className="mb-6 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              {/* Cabeçalho do Médico */}
              <View className="flex-row items-center border-b border-slate-700/60 pb-3 mb-3">
                <View className="w-10 h-10 bg-blue-600/30 rounded-full items-center justify-center mr-3">
                  <Text className="text-blue-400 font-bold">{medicoNome.charAt(0)}</Text>
                </View>
                <View>
                  <Text className="text-white font-bold text-base">{medicoNome}</Text>
                  <Text className="text-slate-400 text-xs">{grupo.especialidade} • CRM: {grupo.crm}</Text>
                </View>
              </View>

              {/* Documentos Emissos por este Médico */}
              {grupo.documentos.map((doc) => (
                <View
                  key={doc.id}
                  className="bg-slate-900 p-4 rounded-xl mb-2.5 border border-slate-700/80"
                >
                  <View className="flex-row justify-between items-start mb-2">
                    <Text className="text-white font-semibold text-base flex-1 mr-2">
                      {doc.titulo}
                    </Text>
                    <View className={`px-2 py-0.5 rounded-md border ${getBadgeStyle(doc.tipo)}`}>
                      <Text className="text-xs font-bold">{doc.tipo}</Text>
                    </View>
                  </View>

                  <Text className="text-slate-300 text-xs mb-2 leading-relaxed">
                    {doc.descricao}
                  </Text>

                  <View className="flex-row justify-between items-center mt-1 pt-2 border-t border-slate-800">
                    <Text className="text-slate-500 text-xs">Emitido em: {doc.dataEmissao}</Text>
                    <TouchableOpacity className="bg-slate-800 px-3 py-1 rounded-md border border-slate-700">
                      <Text className="text-blue-400 text-xs font-semibold">Baixar / Ver PDF</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Exemplo simples de lista de médicos para a busca
const MEDICOS_EXEMPLO = [
  { id: '1', nome: 'Dra. Ana Silva', especialidade: 'Cardiologia', instituicao: 'Hospital Central' },
  { id: '2', nome: 'Dr. Carlos Souza', especialidade: 'Pediatria', instituicao: 'Clínica São José' },
  { id: '3', nome: 'Dra. Mariana Costa', especialidade: 'Dermatologia', instituicao: 'Atendimento Online' },
];

export default function HomeScreen({ navigation }: Props) {
  const [busca, setBusca] = useState('');

  const medicosFiltrados = MEDICOS_EXEMPLO.filter(
    (medico) =>
      medico.nome.toLowerCase().includes(busca.toLowerCase()) ||
      medico.especialidade.toLowerCase().includes(busca.toLowerCase()) ||
      medico.instituicao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View className="flex-1 bg-slate-900 px-4 pt-4">
      {/* Cabeçalho do Usuário */}
      <View className="flex-row justify-between items-center mb-6 pt-2">
        <View>
          <Text className="text-slate-400 text-sm">Bem-vindo(a),</Text>
          <Text className="text-white text-2xl font-bold">Paciente</Text>
        </View>

        <TouchableOpacity
          className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700"
          onPress={() => navigation.navigate('EditarPerfil', { usuarioId: '123' })}
        >
          <Text className="text-blue-400 font-semibold">Meu Perfil</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-6">
        <Text className="text-white font-semibold text-lg mb-2">Buscar Médicos</Text>
        <TextInput
          value={busca}
          onChangeText={setBusca}
          placeholder="Pesquisar por nome, especialidade..."
          placeholderTextColor="#9ca3af"
          className="w-full bg-slate-800 text-white p-4 rounded-xl border border-slate-700"
        />
      </View>

      {/* lista de Médicos */}
      <Text className="text-slate-300 font-semibold text-md mb-3">
        {busca ? `Resultados (${medicosFiltrados.length})` : 'Médicos Disponíveis'}
      </Text>

      <FlatList
        data={medicosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-slate-800 p-4 rounded-xl mb-3 border border-slate-700 flex-row justify-between items-center">
            <View>
              <Text className="text-white font-bold text-lg">{item.nome}</Text>
              <Text className="text-blue-400 text-sm font-medium">{item.especialidade}</Text>
              <Text className="text-slate-400 text-xs mt-1">{item.instituicao}</Text>
            </View>
            <Text className="text-slate-400 text-xl font-bold">›</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text className="text-slate-500 text-center mt-4">Nenhum médico encontrado.</Text>
        }
      />
    </View>
  );
}
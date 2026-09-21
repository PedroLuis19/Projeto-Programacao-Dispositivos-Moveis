import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Medico } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// placeholde de médicos
const MEDICOS_EXEMPLO: Medico[] = [
  { 
    id: '1', 
    nome: 'Dra. Ana Silva', 
    especialidade: 'Cardiologia', 
    crm: '123456-SP',
    instituicao: 'Hospital Central',
    email: 'ana.silva@hospital.com',
    sobre: 'Especialista em cardiologia preventiva com mais de 10 anos de experiência em atendimento presencial e exames de rotina.'
  },
  { 
    id: '2', 
    nome: 'Dr. Carlos Souza', 
    especialidade: 'Pediatria', 
    crm: '654321-RJ',
    instituicao: 'Clínica São José',
    email: 'carlos.souza@clinica.com',
    sobre: 'Atendimento infantil humanizado, acompanhamento de crescimento e rotinas de vacinação.'
  },
  { 
    id: '3', 
    nome: 'Dra. Mariana Costa', 
    especialidade: 'Dermatologia', 
    crm: '987654-MG',
    instituicao: 'Atendimento Online',
    email: 'mariana.costa@telemed.com',
    sobre: 'Atendimento via telemedicina focado em diagnósticos de pele e prescrição digital.'
  },
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
      {/* Cabeçalho */}
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

      <TouchableOpacity
        className="bg-blue-600/20 border border-blue-500/40 p-4 rounded-2xl mb-6 flex-row justify-between items-center"
        onPress={() => navigation.navigate('Documentos')}
        >
        <View>
            <Text className="text-blue-400 font-bold text-base">Meus Documentos & Receitas</Text>
            <Text className="text-slate-300 text-xs mt-0.5">
            Acesse receitas, laudos e recomendações médicas
            </Text>
        </View>
        <Text className="text-blue-400 font-bold text-xl">›</Text>
        </TouchableOpacity>

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

      <FlatList
        data={medicosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="bg-slate-800 p-4 rounded-xl mb-3 border border-slate-700 flex-row justify-between items-center"
            // Passa o objeto 'item' diretamente para a tela de perfil do médico
            onPress={() => navigation.navigate('PerfilMedico', { medico: item })}
          >
            <View>
              <Text className="text-white font-bold text-lg">{item.nome}</Text>
              <Text className="text-blue-400 text-sm font-medium">{item.especialidade}</Text>
              <Text className="text-slate-400 text-xs mt-1">{item.instituicao}</Text>
            </View>
            <Text className="text-slate-400 text-xl font-bold">›</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}
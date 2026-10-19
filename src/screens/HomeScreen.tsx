import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { API_URL } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [medicos, setMedicos] = useState<any[]>([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);

  const carregarMedicos = async (termo = '') => {
    try {
      setCarregando(true);
      const url = termo 
        ? `${API_URL}/medicos?busca=${encodeURIComponent(termo)}`
        : `${API_URL}/medicos`;

      const response = await fetch(url);
      const dados = await response.json();
      setMedicos(dados);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const buscarDados = async () => {
      await carregarMedicos();
    };
    buscarDados();
  }, []);

  const handleBusca = (texto: string) => {
    setBusca(texto);
    carregarMedicos(texto);
  };

  return (
    <View className="flex-1 bg-slate-900 px-4 pt-4">
      <View className="flex-row justify-between items-center mb-4 pt-2">
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
          <Text className="text-slate-300 text-xs mt-0.5">Acesse receitas e laudos médicos</Text>
        </View>
        <Text className="text-blue-400 font-bold text-xl">›</Text>
      </TouchableOpacity>

      <TextInput
        value={busca}
        onChangeText={handleBusca}
        placeholder="Buscar médico por nome, especialidade..."
        placeholderTextColor="#9ca3af"
        className="bg-slate-800 text-white px-4 py-3 rounded-xl mb-4 border border-slate-700"
      />

      {carregando ? (
        <ActivityIndicator size="large" color="#3b82f6" className="mt-8" />
      ) : (
        <FlatList
          data={medicos}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="text-slate-500 text-center mt-8">Nenhum médico encontrado.</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-slate-800 p-4 rounded-2xl mb-3 border border-slate-700"
              onPress={() => navigation.navigate('PerfilMedico', { medico: item })}
            >
              <View className="flex-row justify-between items-start mb-1">
                <Text className="text-white font-bold text-base">{item.nome}</Text>
                <Text className="text-blue-400 text-xs font-semibold bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                  {item.especialidade}
                </Text>
              </View>
              <Text className="text-slate-400 text-xs">CRM: {item.crm} • {item.instituicao}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
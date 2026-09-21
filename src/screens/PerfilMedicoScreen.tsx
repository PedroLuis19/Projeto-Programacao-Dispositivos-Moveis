import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'PerfilMedico'>;

export default function PerfilMedicoScreen({ route, navigation }: Props) {
  // Extrai os dados do médico passados via navegação
  const { medico } = route.params;
  const [solicitado, setSolicitado] = useState(false);

  const handleSolicitarConsulta = () => {
    setSolicitado(true);
    Alert.alert('Solicitação Enviada', `Sua solicitação foi enviada para ${medico.nome}.`);
  };

  return (
    <ScrollView className="flex-1 bg-slate-900 px-4 pt-4">
      {/* Card Principal de Perfil */}
      <View className="bg-slate-800 p-6 rounded-2xl border border-slate-700 items-center mb-6">
        <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-4">
          <Text className="text-white text-3xl font-bold">
            {medico.nome.charAt(0)}
          </Text>
        </View>

        <Text className="text-white text-2xl font-bold text-center">{medico.nome}</Text>
        <Text className="text-blue-400 font-medium text-base mt-1">{medico.especialidade}</Text>
        <Text className="text-slate-400 text-sm mt-1">CRM: {medico.crm}</Text>
      </View>

      {/* Informações de Instituição e Contato */}
      <View className="bg-slate-800 p-5 rounded-2xl border border-slate-700 mb-6">
        <Text className="text-slate-300 font-bold text-lg mb-3">Informações de Atendimento</Text>
        
        <View className="mb-3">
          <Text className="text-slate-400 text-xs uppercase">Instituição / Local</Text>
          <Text className="text-white font-medium text-base">{medico.instituicao}</Text>
        </View>

        {medico.email && (
          <View className="mb-3">
            <Text className="text-slate-400 text-xs uppercase">E-mail</Text>
            <Text className="text-white font-medium text-base">{medico.email}</Text>
          </View>
        )}

        <View>
          <Text className="text-slate-400 text-xs uppercase">Sobre o Profissional</Text>
          <Text className="text-slate-300 font-normal text-sm mt-1">
            {medico.sobre || 'Médico credenciado no sistema para atendimento presencial e telemedicina.'}
          </Text>
        </View>
      </View>

      {/* Botão de Solicitação de Consulta */}
      <TouchableOpacity
        className={`w-full p-4 rounded-xl items-center mb-8 ${
          solicitado ? 'bg-emerald-600' : 'bg-blue-600'
        }`}
        onPress={handleSolicitarConsulta}
        disabled={solicitado}
      >
        <Text className="text-white font-bold text-lg">
          {solicitado ? 'Solicitação Enviada ✓' : 'Solicitar Consulta'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'EditarPerfil'>;

export default function EditarPerfilScreen({ navigation }: Props) {
  return (
    <View className="flex-1 justify-center items-center bg-slate-900 px-6">
      <Text className="text-white text-2xl font-bold mb-6">Editar Perfil</Text>

      <TextInput
        defaultValue="Pedro Luis"
        placeholderTextColor="#9ca3af"
        className="w-full bg-slate-800 text-white p-4 rounded-xl mb-4 border border-slate-700"
      />

      <TouchableOpacity 
        className="w-full bg-blue-600 p-4 rounded-xl items-center mb-4"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-white font-bold text-lg">Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}
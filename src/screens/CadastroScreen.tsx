import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

export default function CadastroScreen({ navigation }: Props) {
  return (
    <View className="flex-1 justify-center items-center bg-slate-900 px-6">
      <Text className="text-white text-2xl font-bold mb-6">Criar Conta</Text>

      <TextInput
        placeholder="Nome Completo"
        placeholderTextColor="#9ca3af"
        className="justify-center border-b-10 border-blue-500 px-2 bg-slate-800 text-white p-4 rounded-xl mb-4"
      />
      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#9ca3af"
        className="justify-center bg-slate-800 text-white p-4 rounded-xl mb-4 border border-slate-700"
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="#9ca3af"
        className="justify-center bg-slate-800 text-white p-4 rounded-xl mb-6 border border-slate-700"
      />

      <TouchableOpacity 
        className="w-full bg-emerald-600 p-4 rounded-xl items-center mb-4"
        onPress={() => navigation.navigate('Login')}
      >
        <Text className="text-white font-bold text-lg">Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text className="text-slate-400 text-sm">Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View className="flex-1 justify-center items-center bg-slate-900 px-6">
      <Text className="text-white text-3xl font-bold mb-8">MedConsu</Text>
      
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
        className="w-full bg-blue-600 p-4 rounded-xl items-center mb-4"
        onPress={() => navigation.navigate('Home')}
      >
        <Text className="text-white font-bold text-lg">Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text className="text-blue-400 text-sm">Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
// Importe a sua instância de API configurada (ajuste o caminho se necessário, ex: '../services/api')
import api from '../services/api'; 

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

export default function CadastroScreen({ navigation }: Props) {
  // 1. Criar estados para guardar os valores dos inputs
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Função que envia os dados para o FastAPI
  const handleCadastrar = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      
      // Exemplo enviando para a rota de pacientes (ajuste para /medicos se for o caso)
      await api.post('/pacientes/', {
        nome: nome,
        email: email,
        senha: senha
      });

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro. Verifique os dados ou a conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-slate-900 px-6">
      <Text className="text-white text-2xl font-bold mb-6">Criar Conta</Text>

      <TextInput
        placeholder="Nome Completo"
        placeholderTextColor="#9ca3af"
        value={nome}
        onChangeText={setNome}
        className="justify-center bg-slate-800 text-white p-4 rounded-xl mb-4 border border-slate-700 w-full"
      />
      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#9ca3af"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        className="justify-center bg-slate-800 text-white p-4 rounded-xl mb-4 border border-slate-700 w-full"
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="#9ca3af"
        value={senha}
        onChangeText={setSenha}
        className="justify-center bg-slate-800 text-white p-4 rounded-xl mb-6 border border-slate-700 w-full"
      />

      <TouchableOpacity 
        className={`w-full bg-emerald-600 p-4 rounded-xl items-center mb-4 ${loading ? 'opacity-50' : ''}`}
        onPress={handleCadastrar}
        disabled={loading}
      >
        <Text className="text-white font-bold text-lg">
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text className="text-slate-400 text-sm">Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}
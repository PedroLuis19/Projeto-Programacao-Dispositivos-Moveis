import "./global.css";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './src/types/navigation';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import EditarPerfilScreen from './src/screens/EditarPerfilScreen';
import HomeScreen from './src/screens/HomeScreen';
import PerfilMedicoScreen from './src/screens/PerfilMedicoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#0f172a' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ title: 'Cadastro' }} 
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title : 'Principal'}}
        />
        <Stack.Screen
          name="PerfilMedico"
          component={PerfilMedicoScreen}
          options={{ title : 'Informações'}}
        />
        <Stack.Screen 
          name="EditarPerfil" 
          component={EditarPerfilScreen} 
          options={{ title: 'Editar Perfil' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
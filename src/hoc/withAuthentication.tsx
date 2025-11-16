import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

/**
 * HOC para proteger páginas com autenticação
 */
export function withAuthentication<T extends object>(
  Component: React.ComponentType<T>
) {
  return function AuthenticatedComponent(props: T) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const token = await AsyncStorage.getItem('@app:token');
          
          if (!token) {
            // Usuário não autenticado, redirecionar para login
            router.replace('/');
            return;
          }
          
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Erro ao verificar autenticação:', error);
          router.replace('/');
        }
      };

      checkAuth();
    }, []);

    // Mostrar loading enquanto verifica autenticação
    if (isAuthenticated === null) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0066CC" />
        </View>
      );
    }

    // Renderizar componente se autenticado
    return <Component {...props} />;
  };
}

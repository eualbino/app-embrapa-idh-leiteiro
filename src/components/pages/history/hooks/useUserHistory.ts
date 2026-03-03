import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { UserService, GetMeResponse } from "@/src/services/api/user";

export const useUserHistory = () => {
  const [data, setData] = useState<GetMeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await UserService.getMe();
      setData(response);
    } catch (err: any) {
      console.error("Erro ao buscar dados do usuário:", err);
      setError(err?.response?.data?.message || "Erro ao carregar histórico");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refetch quando a tela ganha foco (ex: após sincronização e navegar para histórico)
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );

  return {
    user: data?.user || null,
    properties: data?.properties || [],
    isLoading,
    error,
    refetch: fetchUserData,
  };
};

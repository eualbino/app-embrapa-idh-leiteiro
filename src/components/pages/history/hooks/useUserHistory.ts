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

  // Refetch when the screen gains focus (e.g., after sync and navigating to history)
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );

  const properties = [...(data?.properties || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return {
    user: data?.user || null,
    properties,
    isLoading,
    error,
    refetch: fetchUserData,
  };
};

import { useState, useEffect } from "react";
import { UserService, GetMeResponse } from "@/src/services/api/user";

export const useUserHistory = () => {
  const [data, setData] = useState<GetMeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
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
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    user: data?.user || null,
    properties: data?.properties || [],
    isLoading,
    error,
    refetch: fetchUserData,
  };
};

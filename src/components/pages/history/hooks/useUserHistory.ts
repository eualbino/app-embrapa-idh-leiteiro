import { useMemo, useState, useCallback } from "react";
import { useAuthContext } from "@/src/contexts/AuthContext";

export const useUserHistory = () => {
  const { user, properties: rawProperties, isInitializing, refetchUser } = useAuthContext();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const properties = useMemo(
    () =>
      [...rawProperties].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [rawProperties],
  );

  const refetch = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refetchUser();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetchUser]);

  return {
    user,
    properties,
    isLoading: isInitializing,
    isRefreshing,
    error: null,
    refetch,
  };
};

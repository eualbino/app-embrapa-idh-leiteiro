import { useState, useEffect } from "react";
import { UserService, PropertySummary } from "@/src/services/api/user";

interface UseResultPDFDataResult {
  userName: string;
  userEmail: string;
  userCpf: string;
  property: PropertySummary | null;
  isLoading: boolean;
  error: string | null;
}

export const useResultPDFData = (
  propertyId: string | null,
): UseResultPDFDataResult => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userCpf, setUserCpf] = useState<string>("");
  const [property, setProperty] = useState<PropertySummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!propertyId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await UserService.getMe();

        // Define os dados do usuário
        setUserName(response.user.name);
        setUserEmail(response.user.email);
        setUserCpf(response.user.cpf);

        // Busca a propriedade específica
        const foundProperty = response.properties.find(
          (prop) => prop.id === Number(propertyId),
        );

        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          setError("Propriedade não encontrada");
        }
      } catch (err: any) {
        console.error("Erro ao buscar dados para PDF:", err);
        setError(
          err?.response?.data?.message || "Erro ao carregar dados do usuário",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [propertyId]);

  return {
    userName,
    userEmail,
    userCpf,
    property,
    isLoading,
    error,
  };
};

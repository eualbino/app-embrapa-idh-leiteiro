import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Input } from "@/src/components/commons/Input";
import { ButtonCommon } from "@/src/components/commons/Button";
import { styles } from "./styles";

export default function ConfirmCodeForgotPassword() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = params.email as string || "seu.email@exemplo.com";
  
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleConfirmCode = async () => {
    if (!code.trim()) {
      Alert.alert("Erro", "Por favor, insira o código de verificação.");
      return;
    }

    if (code.length < 4) {
      Alert.alert("Erro", "O código deve ter pelo menos 4 dígitos.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      router.push({
        pathname: "/forgot-password/reset-password",
        params: { email, code }
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        "Código inválido ou expirado. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        "Código Reenviado",
        "Um novo código foi enviado para seu e-mail."
      );
      setCode("");
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível reenviar o código. Tente novamente mais tarde."
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.card}>
        <Text style={styles.title}>Confirmar Código</Text>
        
        <Text style={styles.description}>
          Foi enviado um código para seu e-mail:
        </Text>

        <Text style={styles.emailText}>{email}</Text>

        <View style={styles.inputContainer}>
          <Input
            label="Código de Verificação"
            type="number-pad"
            placeholder="Digite o código"
            value={code}
            onChangeText={setCode}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
            maxLength={6}
          />
        </View>

        <View style={styles.buttonContainer}>
          <ButtonCommon
            onPress={handleConfirmCode}
            variant="primary"
            disabled={isLoading || isResending}
          >
            {isLoading ? "Verificando..." : "Confirmar Código"}
          </ButtonCommon>
        </View>

        <View style={styles.buttonContainer}>
          <ButtonCommon
            onPress={handleBackToLogin}
            variant="secondary"
            disabled={isLoading || isResending}
          >
            Voltar
          </ButtonCommon>
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Não recebeu o código?</Text>
          <Text 
            style={styles.resendLink}
            onPress={isResending ? undefined : handleResendCode}
          >
            {isResending ? "Reenviando..." : "Reenviar código"}
          </Text>
        </View>
      </View>
    </View>
  );
}

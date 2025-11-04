import React, { useState, useMemo } from "react";
import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { Input } from "@/src/components/commons/Input";
import { ButtonCommon } from "@/src/components/commons/Button";
import { styles } from "./styles";

export default function ResetPasswordForgotPassword() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = (params.email as string) || "";
  const code = (params.code as string) || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordValidation = useMemo(() => {
    return {
      minLength: newPassword.length >= 8,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    };
  }, [newPassword]);

  const isPasswordValid = useMemo(() => {
    return Object.values(passwordValidation).every(Boolean);
  }, [passwordValidation]);

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Por favor, insira sua nova senha.",
      });
      return;
    }

    if (!isPasswordValid) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "A senha não atende aos requisitos mínimos.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "As senhas não coincidem.",
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Toast.show({
        type: "success",
        text1: "Senha Redefinida",
        text2: "Sua senha foi redefinida com sucesso!",
      });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível redefinir a senha.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/");
  };

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.card}>
        <Text style={styles.title}>Redefinir Senha</Text>

        <Text style={styles.description}>
          Crie uma nova senha para sua conta.
        </Text>

        <View style={styles.inputContainer}>
          <Input
            label="Nova Senha"
            placeholder="Digite sua nova senha"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Input
            label="Confirmar Nova Senha"
            placeholder="Digite sua senha novamente"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <View style={styles.buttonContainer}>
          <ButtonCommon
            onPress={handleResetPassword}
            variant="primary"
            disabled={
              isLoading || !isPasswordValid || newPassword !== confirmPassword
            }
          >
            {isLoading ? "Redefinindo..." : "Redefinir Senha"}
          </ButtonCommon>
        </View>

        <View style={styles.buttonContainer}>
          <ButtonCommon
            onPress={handleBackToLogin}
            variant="secondary"
            disabled={isLoading}
          >
            Voltar ao Login
          </ButtonCommon>
        </View>
      </View>
    </View>
  );
}

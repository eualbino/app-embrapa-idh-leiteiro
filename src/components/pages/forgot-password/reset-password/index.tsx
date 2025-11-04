import React, { useState, useMemo } from "react";
import { View, Text, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
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
      Alert.alert("Erro", "Por favor, insira sua nova senha.");
      return;
    }

    if (!isPasswordValid) {
      Alert.alert("Erro", "A senha não atende aos requisitos mínimos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert("Senha Redefinida", "Sua senha foi redefinida com sucesso!", [
        {
          text: "OK",
          onPress: () => router.push("/"),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível redefinir a senha. Tente novamente mais tarde."
      );
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

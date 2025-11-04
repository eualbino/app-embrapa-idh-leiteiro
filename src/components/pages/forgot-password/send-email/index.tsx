import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Input } from "@/src/components/commons/Input";
import { ButtonCommon } from "@/src/components/commons/Button";
import { styles } from "./styles";

export default function SendEmailForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async () => {
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, insira seu e-mail.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        "E-mail Enviado",
        "Um código de verificação foi enviado para seu e-mail.",
        [
          {
            text: "OK",
            onPress: () => router.push({
              pathname: "/forgot-password/confirm-code",
              params: { email }
            }),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível enviar o e-mail. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.title}>Esqueceu a Senha?</Text>
        
        <Text style={styles.description}>
          Digite seu e-mail cadastrado e enviaremos um código de verificação
          para redefinir sua senha.
        </Text>

        <View style={styles.inputContainer}>
          <Input
            label="E-mail"
            type="email-address"
            placeholder="seu.email@exemplo.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <View style={styles.buttonContainer}>
          <ButtonCommon
            onPress={handleSendEmail}
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar Código"}
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
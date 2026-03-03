// External Libraries
import { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

// Context
import { useAuthContext } from "@/src/contexts/AuthContext";

// Components
import { Input } from "../../commons/Input";
import { ButtonCommon } from "../../commons/Button";
import { LanguageSelector } from "../../commons/LanguageSelector";

// Utils
import { formatCPFInput, unformatCPF } from "@/src/utils";

// Types
import { VIEW_LOGIN_PAGE } from "./contants";

// Style
import { styles } from "./styles";

interface LoginRegisterProps {
  initialMode?: VIEW_LOGIN_PAGE;
}

export default function LoginRegister({
  initialMode = VIEW_LOGIN_PAGE.LOGIN,
}: LoginRegisterProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [view, setView] = useState<VIEW_LOGIN_PAGE>(initialMode);

  const route = useRouter();
  const { login, register, isLoading } = useAuthContext();

  // Atualiza o view quando initialMode muda
  useEffect(() => {
    setView(initialMode);
  }, [initialMode]);

  // Validação de senha
  const passwordValidation = useMemo(() => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  }, [password]);

  const isPasswordValid = useMemo(() => {
    return Object.values(passwordValidation).every(Boolean);
  }, [passwordValidation]);

  const handleSubmit = async () => {
    if (view === VIEW_LOGIN_PAGE.LOGIN) {
      await login({
        email: email || undefined,
        cpf: cpf ? unformatCPF(cpf) : undefined,
        password,
      });
    } else {
      // Validação de senha no cadastro
      if (!isPasswordValid) {
        Toast.show({
          type: "error",
          text1: t("common.error"),
          text2: t("auth.errors.invalidPassword"),
        });
        return;
      }

      if (password !== confirmPassword) {
        Toast.show({
          type: "error",
          text1: t("common.error"),
          text2: t("auth.errors.passwordMismatch"),
        });
        return;
      }

      await register({
        name,
        email,
        cpf: unformatCPF(cpf),
        password,
      });
    }
  };

  function returnViewUser() {
    if (view === VIEW_LOGIN_PAGE.LOGIN) {
      return (
        <View>
          <Input
            label={t("common.email") + " ou CPF"}
            placeholder="email@gmail.com"
            value={email || cpf}
            onChangeText={(text) => {
              if (text.includes("@") || /[a-zA-Z]/.test(text)) {
                setEmail(text);
                setCpf("");
              } else {
                const maskedCpf = formatCPFInput(text);
                setCpf(maskedCpf);
                setEmail("");
              }
            }}
            autoComplete="email"
          />

          <Input
            label={t("common.password")}
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />
        </View>
      );
    }

    return (
      <View>
        <Input
          label={t("common.name")}
          placeholder="Marcelo Souza"
          value={name}
          onChangeText={setName}
          autoComplete="name"
        />
        <Input
          label={t("common.email")}
          placeholder="email@gmail.com.br"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
        />
        <Input
          label="CPF"
          placeholder="123.456.789-00"
          value={cpf}
          onChangeText={(text) => {
            const maskedCpf = formatCPFInput(text);
            setCpf(maskedCpf);
          }}
          keyboardType="numeric"
          maxLength={14}
        />
        <Input
          label={t("common.password")}
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />

        <View style={styles.passwordRequirements}>
          <Text
            style={[
              styles.requirementText,
              passwordValidation.minLength
                ? styles.requirementMet
                : styles.requirementNotMet,
            ]}
          >
            {passwordValidation.minLength ? "✓" : "○"}{" "}
            {t("auth.passwordRequirements.minLength")}
          </Text>
          <Text
            style={[
              styles.requirementText,
              passwordValidation.hasUpperCase
                ? styles.requirementMet
                : styles.requirementNotMet,
            ]}
          >
            {passwordValidation.hasUpperCase ? "✓" : "○"}{" "}
            {t("auth.passwordRequirements.hasUpperCase")}
          </Text>
          <Text
            style={[
              styles.requirementText,
              passwordValidation.hasLowerCase
                ? styles.requirementMet
                : styles.requirementNotMet,
            ]}
          >
            {passwordValidation.hasLowerCase ? "✓" : "○"}{" "}
            {t("auth.passwordRequirements.hasLowerCase")}
          </Text>
          <Text
            style={[
              styles.requirementText,
              passwordValidation.hasNumber
                ? styles.requirementMet
                : styles.requirementNotMet,
            ]}
          >
            {passwordValidation.hasNumber ? "✓" : "○"}{" "}
            {t("auth.passwordRequirements.hasNumber")}
          </Text>
          <Text
            style={[
              styles.requirementText,
              passwordValidation.hasSpecialChar
                ? styles.requirementMet
                : styles.requirementNotMet,
            ]}
          >
            {passwordValidation.hasSpecialChar ? "✓" : "○"}{" "}
            {t("auth.passwordRequirements.hasSpecialChar")}
          </Text>
        </View>

        <Input
          label={t("auth.confirmPassword")}
          placeholder="********"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoComplete="password"
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logosContainer}>
          <Image
            source={require("@/src/assets/images/icon.png")}
            style={styles.logoIDH}
            resizeMode="contain"
          />
        </View>
        <LanguageSelector />
        <View style={styles.container}>
          <View style={styles.containerSelectView}>
            <ButtonCommon
              onPress={() => setView(VIEW_LOGIN_PAGE.LOGIN)}
              variant={view === VIEW_LOGIN_PAGE.LOGIN ? "primary" : "secondary"}
              style={styles.buttonView}
              isActive={view === VIEW_LOGIN_PAGE.LOGIN ? true : false}
            >
              {t("auth.login")}
            </ButtonCommon>
            <ButtonCommon
              onPress={() => setView(VIEW_LOGIN_PAGE.REGISTER)}
              variant={
                view === VIEW_LOGIN_PAGE.REGISTER ? "primary" : "secondary"
              }
              style={styles.buttonView}
              isActive={view === VIEW_LOGIN_PAGE.REGISTER ? true : false}
            >
              {t("auth.register")}
            </ButtonCommon>
          </View>
          {returnViewUser()}

          {view === VIEW_LOGIN_PAGE.LOGIN && (
            <Text
              style={styles.forgotPasswordLink}
              onPress={() => route.push("/forgot-password/send-email")}
            >
              {t("auth.forgotPassword")}
            </Text>
          )}

          <ButtonCommon
            onPress={handleSubmit}
            disabled={
              isLoading ||
              (view === VIEW_LOGIN_PAGE.REGISTER &&
                (!isPasswordValid || password !== confirmPassword))
            }
          >
            {isLoading
              ? t("common.loading")
              : view === VIEW_LOGIN_PAGE.LOGIN
                ? t("auth.loginButton")
                : t("auth.registerButton")}
          </ButtonCommon>
        </View>

        <View style={[styles.logosContainer, { marginTop: 20 }]}>
          <Image
            source={require("@/src/assets/images/logo_embrapa.png")}
            style={styles.logoEmbrapa}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

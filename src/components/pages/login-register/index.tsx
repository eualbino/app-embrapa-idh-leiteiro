// External Libraries
import { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

// Context
import { useAuthContext } from "@/src/contexts/AuthContext";

// Components
import { Input } from "@/src/components/commons/Input";
import { ButtonCommon } from "@/src/components/commons/Button";
import { LanguageSelector } from "@/src/components/commons/LanguageSelector";

// Utils
import { formatCPFInput, formatPhoneInput, unformatCPF } from "@/src/utils";

// Types
import { VIEW_LOGIN_PAGE } from "./contants";

// Style
import { styles } from "./styles";

interface LoginRegisterProps {
  initialMode?: VIEW_LOGIN_PAGE;
}

async function openPdf(moduleId: number, fileName: string) {
  try {
    const asset = Asset.fromModule(moduleId);
    await asset.downloadAsync();

    if (!asset.localUri) throw new Error();

    const destUri = new FileSystem.File(FileSystem.Paths.cache, fileName);

    await new FileSystem.File(asset.localUri).copy(destUri);

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(destUri.uri, {
        mimeType: "application/pdf",
        UTI: "com.adobe.pdf",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível abrir o arquivo.",
      });
    }
  } catch (error) {
    console.error("Erro ao abrir documento:", error);
    Toast.show({
      type: "error",
      text1: "Erro",
      text2: "Não foi possível abrir o documento.",
    });
  }
}

const makeInitialForm = () => ({
  name: "",
  email: "",
  cpf: "",
  phone: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
});

type LoginForm = ReturnType<typeof makeInitialForm>;

export default function LoginRegister({
  initialMode = VIEW_LOGIN_PAGE.LOGIN,
}: LoginRegisterProps) {
  const { t } = useTranslation();
  const [form, setForm] = useState<LoginForm>(makeInitialForm());
  const [view, setView] = useState<VIEW_LOGIN_PAGE>(initialMode);

  const route = useRouter();
  const { login, register, isLoading } = useAuthContext();

  const handleFormChange = <K extends keyof LoginForm>(
    field: K,
    value: LoginForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    setView(initialMode);
  }, [initialMode]);

  useEffect(() => {
    handleFormChange("acceptedTerms", false);
  }, [view]);

  const passwordValidation = useMemo(() => {
    return {
      minLength: form.password.length >= 8,
      hasUpperCase: /[A-Z]/.test(form.password),
      hasLowerCase: /[a-z]/.test(form.password),
      hasNumber: /[0-9]/.test(form.password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
    };
  }, [form.password]);

  const isPasswordValid = useMemo(() => {
    return Object.values(passwordValidation).every(Boolean);
  }, [passwordValidation]);

  const handleSubmit = async () => {
    if (view === VIEW_LOGIN_PAGE.LOGIN) {
      await login({
        email: form.email,
        password: form.password,
      });
    } else {
      if (!form.acceptedTerms) {
        Toast.show({
          type: "error",
          text1: t("common.error"),
          text2: "Você precisa aceitar os termos para se cadastrar.",
        });
        return;
      }

      if (!isPasswordValid) {
        Toast.show({
          type: "error",
          text1: t("common.error"),
          text2: t("auth.errors.invalidPassword"),
        });
        return;
      }

      if (form.password !== form.confirmPassword) {
        Toast.show({
          type: "error",
          text1: t("common.error"),
          text2: t("auth.errors.passwordMismatch"),
        });
        return;
      }

      await register({
        name: form.name,
        email: form.email,
        cpf: unformatCPF(form.cpf),
        phone: form.phone.replace(/\D/g, ""),
        password: form.password,
      });
    }
  };

  function returnViewUser() {
    if (view === VIEW_LOGIN_PAGE.LOGIN) {
      return (
        <View>
          <Input
            label={t("common.email")}
            placeholder="email@gmail.com"
            value={form.email}
            autoCapitalize="none"
            onChangeText={(text) => handleFormChange("email", text)}
            keyboardType="email-address"
            autoComplete="email"
          />

          <Input
            label={t("common.password")}
            placeholder="********"
            value={form.password}
            onChangeText={(text) => handleFormChange("password", text)}
            autoCapitalize="none"
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
          value={form.name}
          onChangeText={(text) => handleFormChange("name", text)}
          autoComplete="name"
        />
        <Input
          label={t("common.email")}
          placeholder="email@gmail.com.br"
          value={form.email}
          onChangeText={(text) => handleFormChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <Input
          label="CPF"
          placeholder="123.456.789-00"
          value={form.cpf}
          onChangeText={(text) => handleFormChange("cpf", formatCPFInput(text))}
          keyboardType="numeric"
          maxLength={14}
        />
        <Input
          label={t("common.phone")}
          placeholder="(11) 99999-9999"
          value={form.phone}
          onChangeText={(text) => handleFormChange("phone", formatPhoneInput(text))}
          keyboardType="phone-pad"
          maxLength={15}
        />
        <Input
          label={t("common.password")}
          placeholder="********"
          value={form.password}
          onChangeText={(text) => handleFormChange("password", text)}
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
          value={form.confirmPassword}
          onChangeText={(text) => handleFormChange("confirmPassword", text)}
          secureTextEntry
          autoComplete="password"
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() =>
              handleFormChange("acceptedTerms", !form.acceptedTerms)
            }
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                form.acceptedTerms && styles.checkboxChecked,
              ]}
            >
              {form.acceptedTerms && <Text style={styles.checkboxMark}>✓</Text>}
            </View>

            <Text style={styles.checkboxLabel}>
              {"Li e aceito o "}
              <Text
                style={styles.checkboxLink}
                onPress={() =>
                  openPdf(
                    require("@/src/assets/documents/IDH_Termo_Uso_Privacidade.pdf"),
                    "IDH_Termo_Uso_Privacidade.pdf",
                  )
                }
              >
                Termo de Uso e Privacidade
              </Text>
              {" e o "}
              <Text
                style={styles.checkboxLink}
                onPress={() =>
                  openPdf(
                    require("@/src/assets/documents/IDH_Aviso_Privacidade.pdf"),
                    "IDH_Aviso_Privacidade.pdf",
                  )
                }
              >
                Aviso de Privacidade
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
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
              isActive={view === VIEW_LOGIN_PAGE.LOGIN}
            >
              {t("auth.login")}
            </ButtonCommon>
            <ButtonCommon
              onPress={() => setView(VIEW_LOGIN_PAGE.REGISTER)}
              variant={
                view === VIEW_LOGIN_PAGE.REGISTER ? "primary" : "secondary"
              }
              style={styles.buttonView}
              isActive={view === VIEW_LOGIN_PAGE.REGISTER}
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
                (!isPasswordValid ||
                  form.password !== form.confirmPassword ||
                  !form.acceptedTerms))
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

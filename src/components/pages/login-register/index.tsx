// External Libraries
import { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

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

export default function LoginRegister() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<VIEW_LOGIN_PAGE>(VIEW_LOGIN_PAGE.LOGIN);

  const route = useRouter();
  const { login, register, isLoading } = useAuthContext();

  const handleSubmit = async () => {
    if (view === VIEW_LOGIN_PAGE.LOGIN) {
      await login({
        email: email || undefined,
        cpf: cpf ? unformatCPF(cpf) : undefined,
        password,
      });
    } else {
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
            placeholder="email@gmail.com ou 123.456.789-00"
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
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logosContainer}>
        <Image
          source={require("@/src/assets/images/logo_embrapa.png")}
          style={styles.logoEmbrapa}
          resizeMode="contain"
        />
        <Image
          source={require("@/src/assets/images/logo_IDH.png")}
          style={styles.logoIDH}
          resizeMode="contain"
        />
      </View>
      <LanguageSelector />
      <View style={styles.container}>
        <Text style={styles.textHeader}>{t("auth.systemTitle")}</Text>

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

        <ButtonCommon onPress={handleSubmit} disabled={isLoading}>
          {isLoading
            ? t("common.loading")
            : view === VIEW_LOGIN_PAGE.LOGIN
              ? t("auth.loginButton")
              : t("auth.registerButton")}
        </ButtonCommon>
      </View>
    </ScrollView>
  );
}

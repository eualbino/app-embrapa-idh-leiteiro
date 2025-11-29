import { useState } from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import { Input } from "../../commons/Input";
import { VIEW_LOGIN_PAGE } from "./contants";
import { ButtonCommon } from "../../commons/Button";
import { useRouter } from "expo-router";
import { LanguageSelector } from "../../commons/LanguageSelector";
import { useAuthContext } from "@/src/contexts/AuthContext";
import { formatCPFInput, unformatCPF } from "@/src/utils";

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
    <View>
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
    </View>
  );
}

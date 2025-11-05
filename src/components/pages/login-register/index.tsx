import { useState } from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import { Input } from "../../commons/Input";
import { VIEW_LOGIN_PAGE } from "./contants";
import { ButtonCommon } from "../../commons/Button";
import { useRouter } from "expo-router";
import { LanguageSelector } from "../../commons/LanguageSelector";

export default function LoginRegister() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<VIEW_LOGIN_PAGE>(VIEW_LOGIN_PAGE.LOGIN);

  const route = useRouter();

  function returnViewUser() {
    if (view === VIEW_LOGIN_PAGE.LOGIN) {
      return (
        <View>
          <Input
            label={t("common.email")}
            placeholder="email@gmail.com.br"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
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

        <ButtonCommon onPress={() => route.push("/questions")}>
          {view === VIEW_LOGIN_PAGE.LOGIN
            ? t("auth.loginButton")
            : t("auth.registerButton")}
        </ButtonCommon>
      </View>
    </View>
  );
}

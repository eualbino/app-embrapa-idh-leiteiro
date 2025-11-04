import { useState } from "react";
import {
  View,
  Text,
} from "react-native";
import { styles } from "./styles";
import { Input } from "../../commons/Input";
import { VIEW_LOGIN_PAGE } from "./contants";
import { ButtonCommon } from "../../commons/Button";
import { useRouter } from "expo-router";

export default function LoginRegister() {
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
            label="E-mail"
            placeholder="email@gmail.com.br"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoComplete="email"
          />

          <Input
            label="Password"
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
          label="Nome"
          placeholder="Marcelo Souza"
          value={name}
          onChangeText={setName}
          autoComplete="name"
        />
        <Input
          label="E-mail"
          placeholder="email@gmail.com.br"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
        />

        <Input
          label="Password"
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
    <View style={styles.container}>
      <Text style={styles.textHeader}>
        Sistema de Avaliação Hídrica Leiteira
      </Text>

      <View style={styles.containerSelectView}>
        <ButtonCommon
          onPress={() => setView(VIEW_LOGIN_PAGE.LOGIN)}
          variant={view === VIEW_LOGIN_PAGE.LOGIN ? "primary" : "secondary"}
          style={styles.buttonView}
          isActive={view === VIEW_LOGIN_PAGE.LOGIN ? true : false}
        >
          Login
        </ButtonCommon>
        <ButtonCommon
          onPress={() => setView(VIEW_LOGIN_PAGE.REGISTER)}
          variant={view === VIEW_LOGIN_PAGE.REGISTER ? "primary" : "secondary"}
          style={styles.buttonView}
          isActive={view === VIEW_LOGIN_PAGE.REGISTER ? true : false}
        >
          Register
        </ButtonCommon>
      </View>
      {returnViewUser()}
      
      {view === VIEW_LOGIN_PAGE.LOGIN && (
        <Text 
          style={styles.forgotPasswordLink}
          onPress={() => route.push("/forgot-password/send-email")}
        >
          Esqueci minha senha
        </Text>
      )}

      <ButtonCommon onPress={() => route.push("/questions")}>
        {view === VIEW_LOGIN_PAGE.LOGIN ? "Login" : "Register"}
      </ButtonCommon>
    </View>
  );
}

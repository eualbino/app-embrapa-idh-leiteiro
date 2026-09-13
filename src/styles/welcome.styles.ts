import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 20,
    gap: 16,
  },
  logoEmbrapa: {
    width: 150,
    height: 60,
  },
  logo: {
    // Proporção do icon.png (1019x905) para o logo não ficar reduzido
    // dentro de uma caixa com aspecto muito diferente.
    width: 180,
    height: 160,
  },
  titleContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#006f36",
    textAlign: "center",
  },
  textContainer: {
    gap: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
    textAlign: "justify",
  },
  bold: {
    fontWeight: "bold",
    color: "#006f36",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  button: {
    width: "100%",
  },
});

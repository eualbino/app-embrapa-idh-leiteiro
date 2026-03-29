import { theme } from "@/src/config";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    minHeight: "100%",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoIdh: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: -20,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.primary.default,
    textAlign: "center",
    marginBottom: 16,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  primaryButton: {
    paddingVertical: 16,
  },
  secondaryButton: {
    paddingVertical: 16,
    backgroundColor: theme.colors.primary.light,
  },
  outlinedButton: {
    color: theme.colors.primary.default,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});

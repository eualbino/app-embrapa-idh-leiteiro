import { StyleSheet } from "react-native";

// Config
import { COLORS } from "@/src/config/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.default,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary.default,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
    textAlign: "center",
  },
  button: {
    marginTop: 16,
    backgroundColor: COLORS.primary.default,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    minHeight: 48,
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.text.inverse,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

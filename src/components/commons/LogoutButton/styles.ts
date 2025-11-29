import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Botão de Logout
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#D32F2F",
    borderRadius: 12,
    borderWidth: 0,
    shadowColor: "#B71C1C",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 16,
  },
  logoutIcon: {
    marginRight: 4,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 32,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },

  // Ícone
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFEBEE",
    alignSelf: "center",
    marginBottom: 20,
  },

  // Textos
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#212121",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  modalMessage: {
    fontSize: 16,
    color: "#616161",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },

  // Botões
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
    borderWidth: 0,
  },
  cancelButtonText: {
    color: "#424242",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  confirmButton: {
    backgroundColor: "#D32F2F",
    shadowColor: "#D32F2F",
    shadowOpacity: 0.3,
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

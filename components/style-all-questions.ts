import {
  StyleSheet
} from "react-native";

export const stylesQuestions = StyleSheet.create({
  containerProgressBar: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#e9e9e9ff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 15,
    marginTop: 30,
  },
  containerTextProgressBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInProgressBar: {
    fontWeight: 600,
    color: "#006f35",
    fontSize: 15,
  },

  containerResponses: {
    marginTop: 30,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#e9e9e9ff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  containerResponsesTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  responseTextTitle: {
    flex: 1,
    marginRight: 8,
    fontWeight: 600,
    color: "#006f35",
    fontSize: 18,
  },

  responseTextCategoryCount: {
    fontWeight: 600,
    color: "#006f36d2",
    fontSize: 15,
  },

  questionText: {
    fontWeight: 600,
    color: "#006f36ff",
    fontSize: 17,
  },

  questionContainerObsservation: {
    flex: 1,
    gap: 8,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#e9e9e9ff",
    backgroundColor: "#e2e2e2ff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 20,
  },

  questionTextObsservation: {
    color: "#006f36ff",
    fontWeight: 600,
    fontSize: 14
  },

  optionMainContainer: {
    marginTop: 15,
  },

  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },

  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#006f36ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#006f36ff",
  },

  questionsResponseText: {
    color: "#006f36e0",
    fontWeight: 600,
    fontSize: 15,
    flex: 1,
    flexWrap: 'wrap'
  },

  containerMainButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 15,
  },

  buttonVoltar: {
    borderWidth: 2,
    borderColor: "#e9e9e9ff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },

  buttonVoltarText: {
    fontWeight: 600,
    color: "#006f36ff",
    fontSize: 16,
  },

  buttonNext:{
    backgroundColor: "#006f36ff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },

  buttonNextText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 600,
  },

  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#e9e9e9ff",
    paddingHorizontal: 12,
    marginTop: 20,
  },
  datePickerLabel: {
    color: "#006f36ff",
    fontWeight: "600",
    fontSize: 17,
  },
  datePickerTouchable: {
    borderWidth: 2,
    borderColor: "#e9e9e9ff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9"
  },
  datePickerText: {
    color: "#006f36e0",
    fontWeight: "600",
    fontSize: 15,
  },
});
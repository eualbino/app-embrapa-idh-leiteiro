import { StyleSheet } from 'react-native';

export const stylesQuestions = StyleSheet.create({
 containerResponses: {
    marginTop: 30,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#e9e9e9ff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  questionText: {
    fontWeight: 600,
    color: "#006f36ff",
    fontSize: 17,
    marginBottom: 10,
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
  textInput: {
    borderWidth: 2,
    borderColor: "#e9e9e9ff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#fff",
    marginTop: 10,
    minHeight: 45,
    color: "#006f36ff",
    fontWeight: 600,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginVertical: 30,
  },
  nextButton: {
    backgroundColor: "#006f36ff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 600,
  },
});

export default stylesQuestions;

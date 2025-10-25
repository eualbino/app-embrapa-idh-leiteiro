import { useTheme } from "@/src/hooks/theme";
import { StyleSheet } from "react-native";

const theme = useTheme();

export const stylesQuestions = StyleSheet.create({
  containerResponses: {
    marginTop: theme.spacing.lg,
    borderWidth: theme.borders.width.thick,
    borderRadius: theme.borders.radius.lg,
    borderColor: theme.colors.border.light,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  containerQuestionInput: {
    marginBottom: theme.spacing.lg
  },
  containerQuestionRadioArea: {
    marginBottom: theme.spacing.sm
  },
  questionText: {
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.md,
    marginBottom: theme.spacing.sm,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: theme.spacing.xxs,
  },
  radio: {
    height: theme.components.radio.size,
    width: theme.components.radio.size,
    borderRadius: theme.borders.radius.lg,
    borderWidth: theme.borders.width.thick,
    borderColor: theme.colors.primary.default,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
  },
  radioSelected: {
    height: theme.components.radio.innerSize,
    width: theme.components.radio.innerSize,
    borderRadius: theme.borders.radius.lg,
    backgroundColor: theme.components.radio.selectedColor,
  },
  questionsResponseText: {
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.md,
    flex: 1,
    flexWrap: "wrap",
  },
  textInput: {
    borderWidth: theme.borders.width.thick,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borders.radius.lg,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.sizes.md,
    backgroundColor: theme.colors.background.default,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.lg,
  },
  nextButton: {
    backgroundColor: theme.colors.primary.default,
    borderRadius: theme.borders.radius.lg,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
  },
});

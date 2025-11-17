import { StyleSheet } from "react-native";
import { theme } from "@/src/config";

export const stylesQuestionsPage = StyleSheet.create({
  containerProgressBar: {
    borderRadius: theme.borders.radius.lg,
    borderWidth: theme.borders.width.thick,
    borderColor: theme.colors.border.light,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  containerTextProgressBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInProgressBar: {
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary.default,
    fontSize: theme.typography.sizes.sm,
  },

  containerResponses: {
    marginTop: theme.spacing.lg,
    borderWidth: theme.borders.width.thick,
    borderRadius: theme.borders.radius.lg,
    borderColor: theme.colors.border.light,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },

  containerResponsesTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  responseTextTitle: {
    flex: 1,
    marginRight: theme.spacing.xs,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary.default,
    fontSize: theme.typography.sizes.lg,
  },

  responseTextCategoryCount: {
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary.light,
    fontSize: theme.typography.sizes.sm,
  },

  questionText: {
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.md,
  },

  questionContainerObsservation: {
    flex: 1,
    gap: theme.spacing.xs,
    borderWidth: theme.borders.width.thick,
    borderRadius: theme.borders.radius.lg,
    borderColor: theme.colors.border.light,
    backgroundColor: theme.colors.background.muted,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },

  questionTextObsservation: {
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.sm,
  },

  optionMainContainer: {
    marginTop: theme.spacing.sm,
  },

  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: theme.spacing.xs,
  },

  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: theme.borders.width.thick,
    borderColor: theme.colors.primary.default,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
  },

  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary.default,
  },

  questionsResponseText: {
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.sm,
    flex: 1,
    flexWrap: "wrap",
  },

  containerMainButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
  },

  buttonVoltar: {
    borderWidth: theme.borders.width.thick,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borders.radius.lg,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
  },

  buttonVoltarText: {
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary.default,
    fontSize: theme.typography.sizes.md,
  },

  buttonNext: {
    backgroundColor: theme.colors.primary.default,
    borderRadius: theme.borders.radius.lg,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },

  buttonNextText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
  },

  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.xs,
    borderWidth: theme.borders.width.thick,
    borderRadius: theme.borders.radius.lg,
    borderColor: theme.colors.border.light,
    paddingHorizontal: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  datePickerLabel: {
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.md,
  },
  datePickerTouchable: {
    borderWidth: theme.borders.width.thick,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borders.radius.lg,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.background.light,
  },
  datePickerText: {
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.sm,
  },
  containerInfo: {
    marginTop: theme.spacing.xxxl,
    alignItems: "center",
    justifyContent: "center",
  },
  textHeader: {
    color: theme.colors.primary.default,
    fontSize: theme.typography.sizes.xxl,
    textAlign: "center",
    fontWeight: theme.typography.weights.semibold,
  },
  textSubHeader: {
    marginTop: theme.spacing.sm,
    color: theme.colors.primary.default,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    textAlign: "center",
  },
});

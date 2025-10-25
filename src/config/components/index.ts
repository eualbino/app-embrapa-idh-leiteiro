import { COLORS } from "../colors";
import { TYPOGRAPHY } from "../typography";
import { SPACING } from "../spacing";
import { BORDERS } from "../borders";

export const COMPONENTS = {
  button: {
    primary: {
      backgroundColor: COLORS.primary.default,
      borderRadius: BORDERS.radius.lg,
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      textColor: COLORS.text.inverse,
      fontSize: TYPOGRAPHY.sizes.md,
      fontWeight: TYPOGRAPHY.weights.semibold,
      borderWidth: 0,
      borderColor: "transparent",
      disabled: {
        backgroundColor: COLORS.primary.disabled,
        textColor: COLORS.text.disabled,
      },
    },
    secondary: {
      backgroundColor: "transparent",
      borderWidth: BORDERS.width.thick,
      borderColor: COLORS.border.default,
      borderRadius: BORDERS.radius.lg,
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      textColor: COLORS.text.primary,
      fontSize: TYPOGRAPHY.sizes.md,
      fontWeight: TYPOGRAPHY.weights.semibold,
      disabled: {
        backgroundColor: "transparent",
        textColor: COLORS.text.disabled,
        borderColor: COLORS.border.light,
      },
    },
  },

  input: {
    default: {
      backgroundColor: COLORS.background.default,
      borderWidth: BORDERS.width.thick,
      borderColor: COLORS.border.light,
      borderRadius: BORDERS.radius.xl,
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      fontSize: TYPOGRAPHY.sizes.md,
      color: COLORS.text.primary,
      fontWeight: TYPOGRAPHY.weights.semibold,
      minHeight: 45,
    },
    disabled: {
      backgroundColor: COLORS.background.muted,
      borderColor: COLORS.border.light,
      color: COLORS.text.disabled,
    },
  },

  radio: {
    size: 20,
    innerSize: 10,
    borderWidth: BORDERS.width.thick,
    borderColor: COLORS.primary.default,
    backgroundColor: COLORS.background.default,
    selectedColor: COLORS.primary.default,
    disabled: {
      borderColor: COLORS.primary.disabled,
      backgroundColor: COLORS.background.muted,
    },
  },

  container: {
    default: {
      backgroundColor: COLORS.background.default,
      borderWidth: BORDERS.width.thick,
      borderColor: COLORS.border.light,
      borderRadius: BORDERS.radius.xl,
      padding: SPACING.container.md,
      marginVertical: SPACING.md,
    },
  },

  progressBar: {
    height: 10,
    borderRadius: BORDERS.radius.lg,
    backgroundColor: COLORS.background.muted,
    filledColor: COLORS.primary.default,
  },
} as const;

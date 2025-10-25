import { StyleSheet } from 'react-native';
import { theme } from '@/src/config';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    borderWidth: theme.borders.width.thick,
    borderRadius: theme.borders.radius.lg,
    borderColor: theme.colors.border.light,
    paddingHorizontal: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  label: {
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.md,
  },
  touchable: {
    borderWidth: theme.borders.width.thick,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borders.radius.lg,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.background.light,
  },
  text: {
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.sm,
  },
});

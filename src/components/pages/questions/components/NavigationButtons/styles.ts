import { StyleSheet } from 'react-native';
import { theme } from '@/src/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
  },
});

import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING } from './spacing';
import { BORDERS } from './borders';
import { COMPONENTS } from './components';

export const theme = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  borders: BORDERS,
  components: COMPONENTS,
} as const;

export type Theme = typeof theme;
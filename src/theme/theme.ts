import { createTheme, ThemeOptions } from '@mui/material';
//
import shape from './shape';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

const themeOptions: ThemeOptions = {
  palette: { ...palette.light, mode: 'light' },
  shape,
  typography,
  breakpoints,
  shadows: shadows.light,
  customShadows: customShadows.light,
};

const theme = createTheme(themeOptions);
theme.components = componentsOverride(theme);

export default theme;

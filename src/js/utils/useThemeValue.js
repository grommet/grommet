import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../default-props';

/*
  Hook that returns theme value along with a flag to determine if we are 
  outside of a theme context provider, if so pass the base theme.
  If used outside of `<Grommet>` wrapper, falls back to base theme.
*/
const useThemeValue = () => {
  const context = useContext(ThemeContext);
  const theme = context || defaultProps.theme;
  return {
    theme,
    passThemeFlag: { ...(context === undefined ? { theme } : {}) },
  };
};

export { useThemeValue };

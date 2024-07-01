import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { defaultProps } from "../default-props";

/*
  Hook that returns theme value.
  If used outside of `<Grommet>` wrapper, falls back to default theme.
*/
var useThemeValue = function useThemeValue() {
  return useContext(ThemeContext) || defaultProps.theme;
};
export { useThemeValue };
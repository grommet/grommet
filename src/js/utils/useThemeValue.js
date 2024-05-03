import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { defaultProps } from "../default-props";

const useThemeValue = () => useContext(ThemeContext) || defaultProps.theme;

export { useThemeValue };

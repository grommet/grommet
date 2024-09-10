function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../default-props';

/*
  Hook that returns theme value along with a flag to determine if we are 
  outside of a theme context provider, if so pass the base theme.
  If used outside of `<Grommet>` wrapper, falls back to base theme.
*/
var useThemeValue = function useThemeValue() {
  var context = useContext(ThemeContext);
  var theme = context || defaultProps.theme;
  return {
    theme: theme,
    passThemeFlag: _extends({}, context === undefined ? {
      theme: theme
    } : {})
  };
};
export { useThemeValue };
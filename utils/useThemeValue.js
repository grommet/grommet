"use strict";

exports.__esModule = true;
exports.useThemeValue = void 0;
var _react = require("react");
var _styledComponents = require("styled-components");
var _defaultProps = require("../default-props");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/*
  Hook that returns theme value along with a flag to determine if we are 
  outside of a theme context provider, if so pass the base theme.
  If used outside of `<Grommet>` wrapper, falls back to base theme.
*/
var useThemeValue = exports.useThemeValue = function useThemeValue() {
  var context = (0, _react.useContext)(_styledComponents.ThemeContext);
  var theme = context || _defaultProps.defaultProps.theme;
  return {
    theme: theme,
    passThemeFlag: _extends({}, context === undefined ? {
      theme: theme
    } : {})
  };
};
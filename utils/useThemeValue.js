"use strict";

exports.__esModule = true;
exports.useThemeValue = void 0;
var _react = require("react");
var _styledComponents = require("styled-components");
var _defaultProps = require("../default-props");
/*
  Hook that returns theme value.
  If used outside of `<Grommet>` wrapper, falls back to default theme.
*/
var useThemeValue = exports.useThemeValue = function useThemeValue() {
  return (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
};
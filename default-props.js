"use strict";

exports.__esModule = true;
exports.withTheme = exports.extendDefaultTheme = exports.defaultProps = void 0;
var _utils = require("./utils");
var _base = require("./themes/base");
var defaultProps = exports.defaultProps = {
  theme: _base.base
};
var extendDefaultTheme = exports.extendDefaultTheme = function extendDefaultTheme(theme) {
  defaultProps.theme = (0, _utils.deepMerge)(_base.base, theme);
};

/*
  Pass `theme` for component which can be located outside of theme context.
  To be used as argument for `attrs` method from `styled-components`.
 */
var withTheme = exports.withTheme = function withTheme(props) {
  return {
    theme: (0, _utils.deepMerge)(defaultProps.theme, props.theme)
  };
};
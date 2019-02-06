"use strict";

exports.__esModule = true;
exports.extendDefaultTheme = exports.defaultProps = void 0;

var _utils = require("./utils");

var _base = require("./themes/base");

var defaultProps = {
  theme: _base.base
};
exports.defaultProps = defaultProps;

var extendDefaultTheme = function extendDefaultTheme(theme) {
  defaultProps.theme = (0, _utils.deepMerge)(_base.base, theme);
};

exports.extendDefaultTheme = extendDefaultTheme;
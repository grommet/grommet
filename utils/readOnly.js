"use strict";

exports.__esModule = true;
exports.readOnlyStyle = void 0;
var _styledComponents = require("styled-components");
var _background = require("./background");
var _colors = require("./colors");
var readOnlyStyle = exports.readOnlyStyle = function readOnlyStyle(theme) {
  var _theme$global$input$r, _theme$global$input$r2, _theme$global$input$r3;
  var styles = [];
  if (theme != null && (_theme$global$input$r = theme.global.input.readOnly) != null && (_theme$global$input$r = _theme$global$input$r.border) != null && _theme$global$input$r.color) styles.push((0, _styledComponents.css)(["border-color:", ";"], (0, _colors.normalizeColor)(theme.global.input.readOnly.border.color, theme)));
  if (theme != null && (_theme$global$input$r2 = theme.global.input.readOnly) != null && _theme$global$input$r2.background) styles.push((0, _background.backgroundStyle)((_theme$global$input$r3 = theme.global.input.readOnly) == null ? void 0 : _theme$global$input$r3.background, theme));
  return styles;
};
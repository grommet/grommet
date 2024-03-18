import { css } from 'styled-components';
import { backgroundStyle } from './background';
import { normalizeColor } from './colors';
export var readOnlyStyle = function readOnlyStyle(theme) {
  var _theme$global$input$r, _theme$global$input$r2, _theme$global$input$r3;
  var styles = [];
  if (theme != null && (_theme$global$input$r = theme.global.input.readOnly) != null && (_theme$global$input$r = _theme$global$input$r.border) != null && _theme$global$input$r.color) styles.push(css(["border-color:", ";"], normalizeColor(theme.global.input.readOnly.border.color, theme)));
  if (theme != null && (_theme$global$input$r2 = theme.global.input.readOnly) != null && _theme$global$input$r2.background) styles.push(backgroundStyle((_theme$global$input$r3 = theme.global.input.readOnly) == null ? void 0 : _theme$global$input$r3.background, theme));
  return styles;
};
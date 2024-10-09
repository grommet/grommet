"use strict";

exports.__esModule = true;
exports.StyledButton = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Button = require("../Button");
var _utils = require("../../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var adjustPad = function adjustPad(value, theme) {
  // resolve t-shirt size if it exists
  var vertical = typeof value === 'string' ? value : value == null ? void 0 : value.vertical;
  vertical = theme.global.edgeSize[vertical] || vertical;
  var horizontal = typeof value === 'string' ? value : value == null ? void 0 : value.horizontal;
  horizontal = theme.global.edgeSize[horizontal] || horizontal;
  var borderWidth = (0, _utils.parseMetricToNum)(theme.global.borderSize.xsmall);
  vertical = Math.max((0, _utils.parseMetricToNum)(vertical) - borderWidth, 0) + "px";
  horizontal = Math.max((0, _utils.parseMetricToNum)(horizontal) - borderWidth, 0) + "px";
  return {
    vertical: vertical,
    horizontal: horizontal
  };
};
var StyledButton = exports.StyledButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "StyledToggleGroup__StyledButton",
  componentId: "sc-13k5sx8-0"
})(["border-radius:0;border:none;", ";", " &:hover{border:none;box-shadow:none;}"], function (props) {
  return (0, _utils.roundStyle)(props.round, false, props.theme);
}, function (props) {
  var _props$theme, _props$theme2, _props$theme3, _props$theme4;
  var themePad = props.icon && !props.label && (_props$theme = props.theme) != null && (_props$theme = _props$theme.toggleGroup) != null && (_props$theme = _props$theme.button) != null && (_props$theme = _props$theme.iconOnly) != null && _props$theme.pad ? (_props$theme2 = props.theme) == null || (_props$theme2 = _props$theme2.toggleGroup) == null || (_props$theme2 = _props$theme2.button) == null || (_props$theme2 = _props$theme2.iconOnly) == null ? void 0 : _props$theme2.pad : (_props$theme3 = props.theme) == null || (_props$theme3 = _props$theme3.toggleGroup.button) == null ? void 0 : _props$theme3.pad;

  // adjust pad for "kind" themes to align with how "kind" themes
  // manages this calculation
  var pad = (_props$theme4 = props.theme) != null && (_props$theme4 = _props$theme4.button) != null && _props$theme4["default"] ? adjustPad(themePad, props.theme) : themePad;
  return (0, _utils.edgeStyle)('padding', pad, false, undefined, props.theme);
});
"use strict";

exports.__esModule = true;
exports.StyledTagButton = exports.StyledRemoveButton = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _utils = require("../../utils");
var _Button = require("../Button");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var StyledTagButton = exports.StyledTagButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "StyledTag__StyledTagButton",
  componentId: "sc-cb9fl2-0"
})(["", " ", " ", " &:hover{", " ", "}"], function (props) {
  return props.background && (0, _utils.backgroundStyle)(props.background, props.theme);
}, function (props) {
  return props.border && (0, _utils.borderStyle)(props.border, true, props.theme);
}, function (props) {
  return props.round && (0, _utils.roundStyle)(props.round, true, props.theme);
}, function (props) {
  var _props$theme;
  return props.background && props.onClick && ((_props$theme = props.theme) == null || (_props$theme = _props$theme.tag) == null || (_props$theme = _props$theme.hover) == null ? void 0 : _props$theme.background) && (0, _utils.backgroundStyle)(props.theme.tag.hover.background, props.theme);
}, function (props) {
  var _props$theme2;
  return props.border && props.onClick && ((_props$theme2 = props.theme) == null || (_props$theme2 = _props$theme2.tag) == null || (_props$theme2 = _props$theme2.hover) == null ? void 0 : _props$theme2.border) && (0, _utils.borderStyle)(props.theme.tag.hover.border, true, props.theme);
});
var StyledRemoveButton = exports.StyledRemoveButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "StyledTag__StyledRemoveButton",
  componentId: "sc-cb9fl2-1"
})(["", ""], function (props) {
  return props.round && (0, _utils.roundStyle)(props.round, true, props.theme);
});
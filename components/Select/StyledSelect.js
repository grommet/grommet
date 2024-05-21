"use strict";

exports.__esModule = true;
exports.StyledSelectDropButton = exports.StyledContainer = exports.SelectTextInput = exports.SelectOption = exports.OptionsContainer = exports.HiddenInput = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Box = require("../Box");
var _Button = require("../Button");
var _DropButton = require("../DropButton");
var _TextInput = require("../TextInput");
var _utils = require("../../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var StyledContainer = exports.StyledContainer = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledSelect__StyledContainer",
  componentId: "sc-znp66n-0"
})(["@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}", ";", ";"], function (props) {
  return props.dropHeight ? (0, _utils.sizeStyle)('max-height', props.dropHeight, props.theme) : 'max-height: inherit;';
}, function (props) {
  return props.theme.select.container && props.theme.select.container.extend;
});

// position relative is so scroll can be managed correctly
var OptionsContainer = exports.OptionsContainer = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledSelect__OptionsContainer",
  componentId: "sc-znp66n-1"
})(["position:relative;scroll-behavior:smooth;overflow:auto;outline:none;"]);
var HiddenInput = exports.HiddenInput = _styledComponents["default"].input.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledSelect__HiddenInput",
  componentId: "sc-znp66n-2"
})(["display:none;"]);
var SelectOption = exports.SelectOption = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "StyledSelect__SelectOption",
  componentId: "sc-znp66n-3"
})(["", " ", " &:focus{", "}display:block;width:100%;", ";"], function (props) {
  return props.selected && props.textComponent && _utils.selectedStyle;
}, function (props) {
  return props.active && (0, _utils.getHoverIndicatorStyle)(!props.children && !props.theme.select.options ? undefined : 'background', props.theme);
}, function (props) {
  return props.active && (0, _utils.getHoverIndicatorStyle)(!props.children && !props.theme.select.options ? undefined : 'background', props.theme);
}, function (props) {
  return props["aria-disabled"] && "cursor: default";
});
var SelectTextInput = exports.SelectTextInput = (0, _styledComponents["default"])(_TextInput.TextInput).withConfig({
  displayName: "StyledSelect__SelectTextInput",
  componentId: "sc-znp66n-4"
})(["cursor:", ";"], function (props) {
  return props.defaultCursor ? 'default' : 'pointer';
});
var StyledSelectDropButton = exports.StyledSelectDropButton = (0, _styledComponents["default"])(_DropButton.DropButton).withConfig({
  displayName: "StyledSelect__StyledSelectDropButton",
  componentId: "sc-znp66n-5"
})(["", ";", ";", ";"], function (props) {
  return !props.plainSelect && _utils.controlBorderStyle;
}, function (props) {
  var _props$theme$select;
  return (_props$theme$select = props.theme.select) == null || (_props$theme$select = _props$theme$select.control) == null ? void 0 : _props$theme$select.extend;
}, function (props) {
  var _props$theme$select2;
  return props.open && ((_props$theme$select2 = props.theme.select) == null || (_props$theme$select2 = _props$theme$select2.control) == null ? void 0 : _props$theme$select2.open);
});
"use strict";

exports.__esModule = true;
exports.StyledRadioButton = exports.StyledRadioButtonBox = exports.StyledRadioButtonIcon = exports.StyledRadioButtonLabel = exports.StyledRadioButtonInput = exports.StyledRadioButtonContainer = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var disabledStyle = "\n  opacity: 0.5;\n  cursor: default;\n";

var StyledRadioButtonContainer = _styledComponents["default"].label.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonContainer",
  componentId: "g1f6ld-0"
})(["display:flex;flex-direction:row;align-items:center;user-select:none;width:fit-content;", " ", ":hover input:not([disabled]) + div,:hover input:not([disabled]) + span{border-color:", ";}:hover{background-color:", ";}", ";"], function (props) {
  return props.disabled && disabledStyle;
}, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.radioButton.hover.border.color, props.theme);
}, function (props) {
  return (0, _utils.normalizeColor)(!props.disabled && props.theme.radioButton.hover && props.theme.radioButton.hover.background && props.theme.radioButton.hover.background.color, props.theme);
}, function (props) {
  return props.theme.radioButton.container.extend;
});

exports.StyledRadioButtonContainer = StyledRadioButtonContainer;
StyledRadioButtonContainer.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonContainer.defaultProps, _defaultProps.defaultProps);

var StyledRadioButtonInput = _styledComponents["default"].input.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonInput",
  componentId: "g1f6ld-1"
})(["opacity:0;-moz-appearance:none;width:0;height:0;margin:0;", ";"], function (props) {
  return !props.disabled && 'cursor: pointer;';
});

exports.StyledRadioButtonInput = StyledRadioButtonInput;
StyledRadioButtonInput.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonInput.defaultProps, _defaultProps.defaultProps);

var StyledRadioButtonLabel = _styledComponents["default"].span.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonLabel",
  componentId: "g1f6ld-2"
})(["", ""], function (props) {
  return props.theme.radioButton.font.weight && (0, _styledComponents.css)(["font-weight:", ";"], props.theme.radioButton.font.weight);
});

exports.StyledRadioButtonLabel = StyledRadioButtonLabel;
StyledRadioButtonLabel.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonLabel.defaultProps, _defaultProps.defaultProps);

var StyledRadioButtonIcon = _styledComponents["default"].svg.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonIcon",
  componentId: "g1f6ld-3"
})(["box-sizing:border-box;width:", ";height:", ";fill:", ";", ";"], function (props) {
  return props.theme.radioButton.icon.size || props.theme.radioButton.size;
}, function (props) {
  return props.theme.radioButton.icon.size || props.theme.radioButton.size;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.radioButton.check.color || 'control', props.theme);
}, function (props) {
  return props.theme.radioButton.icon.extend;
});

exports.StyledRadioButtonIcon = StyledRadioButtonIcon;
StyledRadioButtonIcon.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonIcon.defaultProps, _defaultProps.defaultProps);

var StyledRadioButtonBox = _styledComponents["default"].div.withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonBox",
  componentId: "g1f6ld-4"
})(["background-color:", ";", ";", ";"], function (props) {
  return props.theme.radioButton.check.background && props.theme.radioButton.check.background.color;
}, function (props) {
  return props.focus && (0, _utils.focusStyle)();
}, function (props) {
  return props.theme.radioButton.check.extend;
});

exports.StyledRadioButtonBox = StyledRadioButtonBox;
StyledRadioButtonBox.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonBox.defaultProps, _defaultProps.defaultProps);

var StyledRadioButton = _styledComponents["default"].div.withConfig({
  displayName: "StyledRadioButton",
  componentId: "g1f6ld-5"
})(["", ";"], function (props) {
  return props.theme.radioButton && props.theme.radioButton.extend;
});

exports.StyledRadioButton = StyledRadioButton;
StyledRadioButton.defaultProps = {};
Object.setPrototypeOf(StyledRadioButton.defaultProps, _defaultProps.defaultProps);
"use strict";

exports.__esModule = true;
exports.StyledSuggestions = exports.StyledIcon = exports.StyledPlaceholder = exports.StyledTextInputContainer = exports.StyledTextInput = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getPlainStyle = function getPlainStyle(plain) {
  if (plain === 'full') {
    return (0, _styledComponents.css)(["", " padding:0;"], _utils.plainInputStyle);
  }

  return plain && _utils.plainInputStyle;
};

var StyledTextInput = _styledComponents["default"].input.withConfig({
  displayName: "StyledTextInput",
  componentId: "sc-1x30a0s-0"
})(["", " ", " ", " ", " ", " ", ";"], _utils.inputStyle, function (props) {
  return getPlainStyle(props.plain);
}, function (props) {
  return props.icon && (props.reverse ? "padding-right: " + props.theme.global.edgeSize.large + ";" : "padding-left: " + props.theme.global.edgeSize.large + ";");
}, function (props) {
  return props.disabled && (0, _utils.disabledStyle)(props.theme.textInput.disabled && props.theme.textInput.disabled.opacity);
}, function (props) {
  return props.textAlign && _utils.textAlignStyle;
}, function (props) {
  return props.theme.textInput && props.theme.textInput.extend;
});

exports.StyledTextInput = StyledTextInput;
StyledTextInput.defaultProps = {};
Object.setPrototypeOf(StyledTextInput.defaultProps, _defaultProps.defaultProps);

var StyledTextInputContainer = _styledComponents["default"].div.withConfig({
  displayName: "StyledTextInput__StyledTextInputContainer",
  componentId: "sc-1x30a0s-1"
})(["position:relative;width:100%;", ";"], function (props) {
  return props.theme.textInput && props.theme.textInput.container && props.theme.textInput.container.extend;
});

exports.StyledTextInputContainer = StyledTextInputContainer;
StyledTextInputContainer.defaultProps = {};
Object.setPrototypeOf(StyledTextInputContainer.defaultProps, _defaultProps.defaultProps);

var StyledPlaceholder = _styledComponents["default"].div.withConfig({
  displayName: "StyledTextInput__StyledPlaceholder",
  componentId: "sc-1x30a0s-2"
})(["position:absolute;left:", "px;top:50%;transform:translateY(-50%);display:flex;justify-content:center;pointer-events:none;", ";"], function (props) {
  return (0, _utils.parseMetricToNum)((0, _utils.getInputPadBySide)(props, 'left')) - (0, _utils.parseMetricToNum)(props.theme.global.control.border.width);
}, function (props) {
  return props.theme.textInput && props.theme.textInput.placeholder && props.theme.textInput.placeholder.extend;
});

exports.StyledPlaceholder = StyledPlaceholder;
StyledPlaceholder.defaultProps = {};
Object.setPrototypeOf(StyledPlaceholder.defaultProps, _defaultProps.defaultProps);

var StyledIcon = _styledComponents["default"].div.withConfig({
  displayName: "StyledTextInput__StyledIcon",
  componentId: "sc-1x30a0s-3"
})(["position:absolute;display:flex;justify:center;top:50%;transform:translateY(-50%);pointer-events:none;", ""], function (props) {
  return props.reverse ? "right: " + (0, _utils.getInputPadBySide)(props, 'right') + ";" : "left: " + (0, _utils.getInputPadBySide)(props, 'left') + ";";
});

exports.StyledIcon = StyledIcon;

var StyledSuggestions = _styledComponents["default"].ol.withConfig({
  displayName: "StyledTextInput__StyledSuggestions",
  componentId: "sc-1x30a0s-4"
})(["border-top-left-radius:0;border-top-right-radius:0;margin:0;padding:0;list-style-type:none;", ";"], function (props) {
  return props.theme.textInput && props.theme.textInput.suggestions && props.theme.textInput.suggestions.extend;
});

exports.StyledSuggestions = StyledSuggestions;
StyledSuggestions.defaultProps = {};
Object.setPrototypeOf(StyledSuggestions.defaultProps, _defaultProps.defaultProps);
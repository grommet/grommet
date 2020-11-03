"use strict";

exports.__esModule = true;
exports.StyledIcon = exports.StyledMaskedInputContainer = exports.StyledMaskedInput = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var StyledMaskedInput = _styledComponents["default"].input.withConfig({
  displayName: "StyledMaskedInput",
  componentId: "sc-99vkfa-0"
})(["", " ", " ", " ", " ", ";"], _utils.inputStyle, function (props) {
  return props.plain && _utils.plainInputStyle;
}, function (props) {
  return props.icon && (props.reverse ? "padding-right: " + props.theme.global.edgeSize.large + ";" : "padding-left: " + props.theme.global.edgeSize.large + ";");
}, function (props) {
  return props.disabled && (0, _utils.disabledStyle)(props.theme.maskedInput.disabled && props.theme.maskedInput.disabled.opacity);
}, function (props) {
  return props.theme.maskedInput && props.theme.maskedInput.extend;
});

exports.StyledMaskedInput = StyledMaskedInput;

var StyledMaskedInputContainer = _styledComponents["default"].div.withConfig({
  displayName: "StyledMaskedInput__StyledMaskedInputContainer",
  componentId: "sc-99vkfa-1"
})(["position:relative;width:100%;", ";"], function (props) {
  return props.theme.maskedInput && props.theme.maskedInput.container && props.theme.maskedInput.container.extend;
});

exports.StyledMaskedInputContainer = StyledMaskedInputContainer;

var StyledIcon = _styledComponents["default"].div.withConfig({
  displayName: "StyledMaskedInput__StyledIcon",
  componentId: "sc-99vkfa-2"
})(["position:absolute;display:flex;justify:center;top:50%;transform:translateY(-50%);pointer-events:none;", ""], function (props) {
  return props.reverse ? "right: " + (0, _utils.getInputPadBySide)(props, 'right') + ";" : "left: " + (0, _utils.getInputPadBySide)(props, 'left') + ";";
});

exports.StyledIcon = StyledIcon;
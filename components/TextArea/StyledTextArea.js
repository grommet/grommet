"use strict";

exports.__esModule = true;
exports.StyledTextArea = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var plainStyle = (0, _styledComponents.css)(["border:none;width:100%;-webkit-appearance:none;"]);

var resizeStyle = function resizeStyle(resize) {
  if (resize === 'horizontal') {
    return 'resize: horizontal;';
  }

  if (resize === 'vertical') {
    return 'resize: vertical;';
  }

  if (resize) {
    return 'resize: both;';
  }

  return 'resize: none;';
};

var StyledTextArea = _styledComponents.default.textarea.withConfig({
  displayName: "StyledTextArea",
  componentId: "sc-17i3mwp-0"
})(["", " width:100%;", " ", " ", " ", " ", " &::-moz-focus-inner{border:none;outline:none;}", ";", ";"], _utils.inputStyle, function (props) {
  return props.resize !== undefined && resizeStyle(props.resize);
}, function (props) {
  return props.fillArg && 'height: 100%;';
}, function (props) {
  return props.plain && plainStyle;
}, function (props) {
  return props.disabled && (0, _utils.disabledStyle)(props.theme.textArea.disabled && props.theme.textArea.disabled.opacity);
}, _utils.placeholderStyle, function (props) {
  return props.focus && !props.plain && _utils.focusStyle;
}, function (props) {
  return props.theme.textArea && props.theme.textArea.extend;
});

exports.StyledTextArea = StyledTextArea;
StyledTextArea.defaultProps = {};
Object.setPrototypeOf(StyledTextArea.defaultProps, _defaultProps.defaultProps);
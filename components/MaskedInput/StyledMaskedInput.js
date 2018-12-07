"use strict";

exports.__esModule = true;
exports.StyledMaskedInputContainer = exports.StyledMaskedInput = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var sizeStyle = function sizeStyle(props) {
  var data = props.theme.text[props.size];
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], data.size, data.height);
};

var plainStyle = (0, _styledComponents.css)(["border:none;"]);

var StyledMaskedInput = _styledComponents.default.input.withConfig({
  displayName: "StyledMaskedInput",
  componentId: "sc-99vkfa-0"
})(["", " width:100%;", " ", " ", " &::-moz-focus-inner{border:none;outline:none;}", ";", ";"], _utils.inputStyle, function (props) {
  return props.size && sizeStyle(props);
}, function (props) {
  return props.plain && plainStyle;
}, _utils.placeholderStyle, function (props) {
  return props.focus && !props.plain && _utils.focusStyle;
}, function (props) {
  return props.theme.MaskedInput && props.theme.MaskedInput.extend;
});

exports.StyledMaskedInput = StyledMaskedInput;

var StyledMaskedInputContainer = _styledComponents.default.div.withConfig({
  displayName: "StyledMaskedInput__StyledMaskedInputContainer",
  componentId: "sc-99vkfa-1"
})(["position:relative;width:100%;"]);

exports.StyledMaskedInputContainer = StyledMaskedInputContainer;
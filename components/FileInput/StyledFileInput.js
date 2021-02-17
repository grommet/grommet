"use strict";

exports.__esModule = true;
exports.StyledFileInput = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var StyledFileInput = _styledComponents["default"].input.withConfig({
  displayName: "StyledFileInput",
  componentId: "rl7ywv-0"
})(["position:absolute;height:100%;width:100%;", " opacity:0;border:none;", " ", " &::-moz-focus-inner{border:none;outline:none;}"], _utils.inputStyle, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return props.rightOffset && "\n    width: calc(100% - " + props.rightOffset + "px);\n    right: " + props.rightOffset + "px;\n    ";
});

exports.StyledFileInput = StyledFileInput;
StyledFileInput.defaultProps = {};
Object.setPrototypeOf(StyledFileInput.defaultProps, _defaultProps.defaultProps);
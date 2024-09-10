"use strict";

exports.__esModule = true;
exports.StyledFileInput = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _utils = require("../../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var StyledFileInput = exports.StyledFileInput = _styledComponents["default"].input.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledFileInput",
  componentId: "sc-rl7ywv-0"
})(["position:absolute;height:100%;width:100%;", " font-size:0;opacity:0;border:none;", " ", " &::-moz-focus-inner{border:none;outline:none;}&::-webkit-file-upload-button{cursor:pointer;}"], _utils.inputStyle, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return props.rightOffset && "\n    width: calc(100% - " + props.rightOffset + "px);\n    right: " + props.rightOffset + "px;\n    ";
});
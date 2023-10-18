"use strict";

exports.__esModule = true;
exports.StyledTagButton = exports.StyledRemoveButton = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _defaultProps = require("../../default-props");
var _utils = require("../../utils");
var _Button = require("../Button");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var StyledTagButton = exports.StyledTagButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "StyledTag__StyledTagButton",
  componentId: "sc-cb9fl2-0"
})(["", " ", ""], function (props) {
  return props.border && (0, _utils.borderStyle)(props.border, true, props.theme);
}, function (props) {
  return props.round && (0, _utils.roundStyle)(props.round, true, props.theme);
});
StyledTagButton.defaultProps = {};
Object.setPrototypeOf(StyledTagButton.defaultProps, _defaultProps.defaultProps);
var StyledRemoveButton = exports.StyledRemoveButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "StyledTag__StyledRemoveButton",
  componentId: "sc-cb9fl2-1"
})(["", ""], function (props) {
  return props.round && (0, _utils.roundStyle)(props.round, true, props.theme);
});
StyledRemoveButton.defaultProps = {};
Object.setPrototypeOf(StyledRemoveButton.defaultProps, _defaultProps.defaultProps);
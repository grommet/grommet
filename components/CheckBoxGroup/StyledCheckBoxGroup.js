"use strict";

exports.__esModule = true;
exports.StyledCheckBoxGroup = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Box = require("../Box");

var _defaultProps = require("../../default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var StyledCheckBoxGroup = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledCheckBoxGroup",
  componentId: "sc-2nhc5d-0"
})(["", ""], function (props) {
  return props.theme.checkBoxGroup && props.theme.checkBoxGroup.container && props.theme.checkBoxGroup.container.extend;
});
exports.StyledCheckBoxGroup = StyledCheckBoxGroup;
StyledCheckBoxGroup.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxGroup.defaultProps, _defaultProps.defaultProps);
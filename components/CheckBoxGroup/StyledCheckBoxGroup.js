"use strict";

exports.__esModule = true;
exports.StyledCheckBoxGroup = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Box = require("../Box");
var _defaultProps = require("../../default-props");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var StyledCheckBoxGroup = exports.StyledCheckBoxGroup = (0, _styledComponents["default"])(_Box.Box).attrs(_defaultProps.withTheme).withConfig({
  displayName: "StyledCheckBoxGroup",
  componentId: "sc-2nhc5d-0"
})(["", ""], function (props) {
  return props.theme.checkBoxGroup && props.theme.checkBoxGroup.container && props.theme.checkBoxGroup.container.extend;
});
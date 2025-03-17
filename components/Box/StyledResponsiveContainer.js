"use strict";

exports.__esModule = true;
exports.StyledResponsiveContainer = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _styles = require("../../utils/styles");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var StyledResponsiveContainer = exports.StyledResponsiveContainer = _styledComponents["default"].div.withConfig(_styles.styledComponentsConfig).withConfig({
  displayName: "StyledResponsiveContainer",
  componentId: "sc-1v27069-0"
})(["container-type:inline-size;"]);
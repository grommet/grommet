"use strict";

exports.__esModule = true;
exports.StyledContainer = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _grommetStyles = require("grommet-styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledContainer = _styledComponents.default.div.withConfig({
  displayName: "StyledSelect__StyledContainer",
  componentId: "znp66n-0"
})(["@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}", ";", ";"], function (props) {
  return props.dropHeight ? (0, _grommetStyles.sizeStyle)('max-height', props.dropHeight, props.theme) : 'max-height: inherit;';
}, function (props) {
  return props.theme.select.container && props.theme.select.container.extend;
});

exports.StyledContainer = StyledContainer;
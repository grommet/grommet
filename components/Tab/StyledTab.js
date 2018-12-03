"use strict";

exports.__esModule = true;
exports.StyledTab = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var tabHoverStyle = (0, _styledComponents.css)(["&:hover{", " ", " ", ";}"], function (props) {
  return props.theme.tab.hover.background && (0, _styledComponents.css)(["background:", ";"], (0, _utils.normalizeColor)(props.theme.tab.hover.background, props.theme));
}, function (props) {
  return props.theme.tab.hover.color && (0, _styledComponents.css)(["color:", ";"], (0, _utils.normalizeColor)(props.theme.tab.hover.color, props.theme));
}, function (props) {
  return props.theme.tab.hover.extend;
});

var StyledTab = _styledComponents.default.div.withConfig({
  displayName: "StyledTab",
  componentId: "sc-1nnwnsb-0"
})(["", " ", " ", ""], _utils.genericStyles, function (props) {
  return !props.plain && props.theme.tab.hover && tabHoverStyle;
}, function (props) {
  return props.theme.tab.extend;
});

exports.StyledTab = StyledTab;
StyledTab.defaultProps = {};
Object.setPrototypeOf(StyledTab.defaultProps, _defaultProps.defaultProps);
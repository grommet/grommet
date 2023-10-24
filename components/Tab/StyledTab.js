"use strict";

exports.__esModule = true;
exports.StyledTab = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Box = require("../Box");
var _utils = require("../../utils");
var _defaultProps = require("../../default-props");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var tabHoverStyle = (0, _styledComponents.css)(["&:hover{", " ", " ", ";}&:focus{z-index:1;}"], function (props) {
  return props.theme.tab.hover.background && (0, _styledComponents.css)(["background:", ";"], (0, _utils.normalizeColor)(props.theme.tab.hover.background, props.theme));
}, function (props) {
  return props.theme.tab.hover.color && (0, _styledComponents.css)(["color:", ";"], (0, _utils.normalizeColor)(props.theme.tab.hover.color, props.theme));
}, function (props) {
  return props.theme.tab.hover.extend;
});
var StyledTab = exports.StyledTab = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledTab",
  componentId: "sc-1nnwnsb-0"
})(["white-space:nowrap;", " ", " ", " ", ""], _utils.genericStyles, function (props) {
  return !props.plain && !props.disabled && props.theme.tab.hover && tabHoverStyle;
}, function (props) {
  return props.disabled && props.theme.tab.disabled;
}, function (props) {
  return props.theme.tab.extend;
});
StyledTab.defaultProps = {};
Object.setPrototypeOf(StyledTab.defaultProps, _defaultProps.defaultProps);
"use strict";

exports.__esModule = true;
exports.StyledTabsHeader = exports.StyledTabs = exports.StyledTabPanel = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Box = require("../Box");
var _utils = require("../../utils");
var _defaultProps = require("../../default-props");
var _FLEX_MAP;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var StyledTabsHeader = exports.StyledTabsHeader = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledTabs__StyledTabsHeader",
  componentId: "sc-a4fwxl-0"
})(["", ";"], function (props) {
  return props.theme.tabs.header.extend;
});
StyledTabsHeader.defaultProps = {};
Object.setPrototypeOf(StyledTabsHeader.defaultProps, _defaultProps.defaultProps);
var FLEX_MAP = (_FLEX_MAP = {}, _FLEX_MAP[true] = '1 1', _FLEX_MAP[false] = '0 0', _FLEX_MAP.grow = '1 0', _FLEX_MAP.shrink = '0 1', _FLEX_MAP);
var flexStyle = (0, _styledComponents.css)(["flex:", ";"], function (props) {
  return "" + FLEX_MAP[props.flex] + (props.flex !== true ? ' auto' : '');
});
var StyledTabPanel = exports.StyledTabPanel = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTabs__StyledTabPanel",
  componentId: "sc-a4fwxl-1"
})(["min-height:0;", " ", ";"], function (props) {
  return props.flex && flexStyle;
}, function (props) {
  return props.theme.tabs.panel.extend;
});
StyledTabPanel.defaultProps = {};
Object.setPrototypeOf(StyledTabPanel.defaultProps, _defaultProps.defaultProps);
var StyledTabs = exports.StyledTabs = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledTabs",
  componentId: "sc-a4fwxl-2"
})(["", " ", ";"], _utils.genericStyles, function (props) {
  return props.theme.tabs.extend;
});
StyledTabs.defaultProps = {};
Object.setPrototypeOf(StyledTabs.defaultProps, _defaultProps.defaultProps);
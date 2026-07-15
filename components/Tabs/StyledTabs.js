"use strict";

exports.__esModule = true;
exports.StyledTabsHeader = exports.StyledTabs = exports.StyledTabPanel = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Box = require("../Box");
var _utils = require("../../utils");
var _FLEX_MAP;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var StyledTabsHeader = exports.StyledTabsHeader = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledTabs__StyledTabsHeader",
  componentId: "sc-a4fwxl-0"
})(["", ";"], function (props) {
  return props.theme.tabs.header.extend;
});
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
var StyledTabs = exports.StyledTabs = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledTabs",
  componentId: "sc-a4fwxl-2"
})(["", " ", ";"], _utils.genericStyles, function (props) {
  return props.theme.tabs.extend;
});
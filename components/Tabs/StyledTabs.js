"use strict";

exports.__esModule = true;
exports.StyledTabsHeader = exports.StyledTabs = exports.StyledTabPanel = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Box = require("../Box");
var _utils = require("../../utils");
var _FLEX_MAP; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
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
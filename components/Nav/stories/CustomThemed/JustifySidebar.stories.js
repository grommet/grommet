"use strict";

exports.__esModule = true;
exports["default"] = exports.JustifySidebar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _excluded = ["label"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var theme = {
  button: {
    padding: {
      horizontal: '12px',
      vertical: '6px'
    },
    border: {
      width: '0px',
      radius: '1px'
    }
  }
};
var SidebarButton = function SidebarButton(_ref) {
  var label = _ref.label,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({}, rest, {
    label: label
  }));
};
var SidebarNav = function SidebarNav() {
  var _useState = (0, _react.useState)(),
    active = _useState[0],
    setActive = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: theme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Nav, {
    background: "dark-2"
  }, [{
    label: 'Dashboard',
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Dashboard, null),
    justify: 'center'
  }, {
    label: 'Devices',
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Device, null),
    justify: 'end'
  }, {
    label: 'Settings',
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.SettingsOption, null),
    justify: 'between'
  }].map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(SidebarButton, {
      key: item.label,
      label: item.label,
      active: item.label === active,
      onClick: function onClick() {
        return setActive(item.label);
      },
      icon: item.icon,
      justify: item.justify
    });
  }))));
};
var JustifySidebar = exports.JustifySidebar = function JustifySidebar() {
  return /*#__PURE__*/_react["default"].createElement(SidebarNav, null);
};
JustifySidebar.storyName = 'Justify Sidebar';
var _default = exports["default"] = {
  title: 'Controls/Nav/Custom Themed/Justify Sidebar'
};
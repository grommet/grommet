"use strict";

exports.__esModule = true;
exports["default"] = exports.Sidebar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _excluded = ["label"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var SidebarButton = function SidebarButton(_ref) {
  var label = _ref.label,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    plain: true
  }, rest), function (_ref2) {
    var hover = _ref2.hover;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: hover ? 'teal' : undefined,
      pad: {
        horizontal: 'large',
        vertical: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "large"
    }, label));
  });
};
var SidebarNav = function SidebarNav() {
  var _useState = (0, _react.useState)(),
    active = _useState[0],
    setActive = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      direction: "row"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Nav, {
      background: "brand"
    }, ['Dashboard', 'Devices', 'Settings'].map(function (label) {
      return /*#__PURE__*/_react["default"].createElement(SidebarButton, {
        key: label,
        label: /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
          color: "white"
        }, label),
        active: label === active,
        onClick: function onClick() {
          return setActive(label);
        }
      });
    })))
    // </Grommet>
  );
};
var Sidebar = exports.Sidebar = function Sidebar() {
  return /*#__PURE__*/_react["default"].createElement(SidebarNav, null);
};
Sidebar.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Controls/Nav/Sidebar'
};
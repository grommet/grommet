"use strict";

exports.__esModule = true;
exports["default"] = exports.Themed = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    drop: {
      background: {
        dark: 'neutral-2',
        light: 'background-contrast'
      },
      border: {
        radius: '10px'
      },
      // impacting 'round' behavior
      zIndex: '13',
      elevation: 'large',
      // impacting the elevation
      margin: 'xsmall',
      intelligentMargin: true
    }
  }
});
var align = {
  top: 'bottom',
  left: 'right'
};
var ThemedDrop = function ThemedDrop() {
  var _useState = (0, _react.useState)(false),
    setShowDrop = _useState[1];
  var targetRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    return setShowDrop(true);
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "dark-2",
    pad: "medium",
    align: "center",
    justify: "start",
    ref: targetRef
  }, "Box"), targetRef.current && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    align: align,
    target: targetRef.current
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, "This Drop uses a custom theme"))));
};
var Themed = exports.Themed = function Themed() {
  return /*#__PURE__*/_react["default"].createElement(ThemedDrop, null);
};
Themed.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Controls/Drop/Custom Themed/Themed'
};
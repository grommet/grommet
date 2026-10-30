"use strict";

exports.__esModule = true;
exports["default"] = exports.ThinStory = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var RANGE_MIN = 0;
var RANGE_MAX = 100;
function Thin(_ref) {
  var _ref$initialRange = _ref.initialRange,
    initialRange = _ref$initialRange === void 0 ? [0, 100] : _ref$initialRange,
    label = _ref.label;
  var _useState = (0, _react.useState)(initialRange),
    range = _useState[0],
    setRange = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "small",
    pad: "xlarge"
  }, label ? /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, label) : null, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "light-4",
    height: "6px",
    direction: "row"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.RangeSelector, {
    direction: "horizontal",
    min: RANGE_MIN,
    max: RANGE_MAX,
    step: 1,
    values: range,
    onChange: function onChange(nextRange) {
      setRange(nextRange);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, range[0] + "% - " + range[1] + "%")));
}
var ThinStory = exports.ThinStory = function ThinStory() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "small"
    }, /*#__PURE__*/_react["default"].createElement(Thin, {
      label: "My Range Selector"
    }))
    // </Grommet>
  );
};
ThinStory.storyName = 'Thin';
var _default = exports["default"] = {
  title: 'Input/RangeSelector/Thin'
};
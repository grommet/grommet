"use strict";

exports.__esModule = true;
exports["default"] = exports.SelectMultipleLimited = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var defaultOptions = ['Apple', 'Orange', 'Banana', 'Grape', 'Melon', 'Strawberry', 'Kiwi', 'Mango', 'Raspberry', 'Rhubarb'];
var SelectMultipleLimited = exports.SelectMultipleLimited = function SelectMultipleLimited() {
  var _useState = (0, _react.useState)([]),
    valueMultiple = _useState[0],
    setValueMultiple = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      pad: "large",
      gap: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "SelectMultiple Limited"), /*#__PURE__*/_react["default"].createElement(_grommet.SelectMultiple, {
      limit: 5,
      help: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        direction: "row",
        justify: "between",
        flex: false,
        pad: {
          horizontal: 'xsmall',
          bottom: 'xsmall'
        }
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        size: "small"
      }, "Select up to 5")),
      value: valueMultiple,
      placeholder: "Select",
      options: defaultOptions,
      onChange: function onChange(_ref) {
        var value = _ref.value;
        setValueMultiple(value);
      }
    }))
    // </Grommet>
  );
};
SelectMultipleLimited.parameters = {
  chromatic: {
    disable: true
  }
};
SelectMultipleLimited.args = {
  full: true
};
SelectMultipleLimited.storyName = 'Limited';
var _default = exports["default"] = {
  title: 'Input/SelectMultiple/Limited'
};
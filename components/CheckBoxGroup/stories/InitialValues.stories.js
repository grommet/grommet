"use strict";

exports.__esModule = true;
exports["default"] = exports.InitialValues = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var InitialValues = exports.InitialValues = function InitialValues() {
  var _useState = (0, _react.useState)(['First', 'Second']),
    value = _useState[0],
    setValue = _useState[1];
  var _useState2 = (0, _react.useState)(['M']),
    value2 = _useState2[0],
    setValue2 = _useState2[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "large"
  }, "Initial value via options object:", /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    value: value,
    onChange: function onChange(event) {
      console.log('value: ', event.value);
      console.log('option: ', event.option);
      setValue(event.value);
    },
    options: ['First', 'Second', 'Third']
  }), "Initial value via controlled options object:", /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    labelKey: "label",
    valueKey: "id",
    value: value2,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value,
        option = _ref.option;
      console.log('nextValue: ', nextValue);
      console.log('option: ', option);
      setValue2(nextValue);
    },
    options: [{
      label: 'Maui',
      id: 'M'
    }, {
      label: 'Jerusalem',
      id: 'J'
    }, {
      label: 'Wuhan',
      id: 'W'
    }]
  }));
};
InitialValues.storyName = 'Initial values';
var _default = exports["default"] = {
  title: 'Input/CheckBoxGroup/Initial values'
};
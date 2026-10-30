"use strict";

exports.__esModule = true;
exports["default"] = exports.Indeterminate = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var Indeterminate = exports.Indeterminate = function Indeterminate() {
  var _useState = (0, _react.useState)([]),
    checked = _useState[0],
    setChecked = _useState[1];
  var checkboxes = ['fruits', 'vegetables', 'olive oil'];
  var onCheckAll = function onCheckAll(event) {
    if (event.target.checked) {
      setChecked(checkboxes);
    } else {
      setChecked([]);
    }
  };
  var onCheck = function onCheck(event, value) {
    if (event.target.checked) {
      setChecked([].concat(checked, [value]));
    } else {
      setChecked(checked.filter(function (item) {
        return item !== value;
      }));
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    checked: checked.length === 3,
    indeterminate: checked.length > 0 && checked.length < 3,
    label: "All",
    onChange: onCheckAll
  }), checkboxes.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
      key: item,
      checked: checked.includes(item),
      label: item,
      onChange: function onChange(e) {
        return onCheck(e, item);
      }
    });
  })));
};
var _default = exports["default"] = {
  title: 'Input/CheckBox/Indeterminate'
};
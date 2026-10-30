"use strict";

exports.__esModule = true;
exports["default"] = exports.WithStickyDiv = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var boxStyle = {
  position: 'relative',
  display: 'block'
};
var titleBoxBackground = {
  color: 'light-2'
};
var titleBoxStyle = {
  position: 'sticky',
  top: 0
};
var checkboxes = Array(8).fill().map(function (_, i) {
  return "item " + (i + 1);
});
var removeItemFromArray = function removeItemFromArray(array, value) {
  return array.filter(function (item) {
    return item !== value;
  });
};
var WithStickyDiv = exports.WithStickyDiv = function WithStickyDiv() {
  var _useState = (0, _react.useState)([]),
    checks = _useState[0],
    setChecks = _useState[1];
  var onCheck = function onCheck(value) {
    return function (_ref) {
      var target = _ref.target;
      if (target.checked) {
        setChecks([].concat(checks, [value]));
      } else {
        setChecks(removeItemFromArray(checks, value));
      }
    };
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "120px",
    width: "120px",
    overflow: "auto",
    style: boxStyle
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: titleBoxBackground,
    style: titleBoxStyle
  }, "Click & Scroll"), checkboxes.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
      key: item,
      checked: checks.includes(item),
      label: item,
      onChange: onCheck(item)
    });
  })));
};
WithStickyDiv.storyName = 'With sticky div';
var _default = exports["default"] = {
  title: 'Input/CheckBox/With sticky div'
};
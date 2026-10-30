"use strict";

exports.__esModule = true;
exports["default"] = exports.InsideFormField = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var options = [{
  label: 'option 1',
  value: 1
}, {
  label: 'option 2',
  value: 2
}, {
  label: 'option 3',
  value: 3
}];
var InsideFormField = exports.InsideFormField = function InsideFormField() {
  var _useState = (0, _react.useState)({}),
    value = _useState[0],
    setValue = _useState[1];
  var onChange = (0, _react.useCallback)(function (nextValue) {
    return setValue(nextValue);
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
      value: value,
      onChange: onChange,
      onSubmit: function onSubmit() {
        return console.log('Submit', value);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Label",
      name: "select"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
      name: "select",
      placeholder: "placeholder",
      options: options,
      labelKey: "label",
      valueKey: "value"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      type: "submit",
      label: "Update",
      primary: true
    })))
    // </Grommet>
  );
};
InsideFormField.storyName = 'Inside a FormField';
var _default = exports["default"] = {
  title: 'Input/Select/Inside a FormField'
};
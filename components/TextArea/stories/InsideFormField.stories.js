"use strict";

exports.__esModule = true;
exports["default"] = exports.InsideFormField = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var InsideFormField = exports.InsideFormField = function InsideFormField() {
  var _useState = (0, _react.useState)({
      name: '',
      email: '',
      value: ''
    }),
    value = _useState[0],
    setValue = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold"
    }, "TextArea as component prop of FormField"), /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "FormField label",
      htmlFor: "text-area",
      component: _grommet.TextArea,
      placeholder: "placeholder from FormField"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      type: "submit",
      label: "submit"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold"
    }, "TextArea inside FormField"), /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
      value: value,
      onChange: function onChange(nextValue) {
        return setValue(nextValue);
      },
      onSubmit: function onSubmit() {
        return console.log(value);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      name: "value",
      label: "FormField label",
      required: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
      name: "value",
      placeholder: "placeholder from TextArea"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      type: "submit",
      label: "submit"
    }))))
    // </Grommet>
  );
};
InsideFormField.storyName = 'Inside a FormField';
var _default = exports["default"] = {
  title: 'Input/TextArea/Inside a FormField'
};
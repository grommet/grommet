"use strict";

exports.__esModule = true;
exports["default"] = exports.Password = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var Password = exports.Password = function Password() {
  var _React$useState = _react["default"].useState(''),
    value = _React$useState[0],
    setValue = _React$useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large",
      width: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      password: true,
      value: value,
      onChange: function onChange(event) {
        return setValue(event.target.value);
      },
      "aria-label": "Password"
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Input/TextInput/Password'
};
"use strict";

exports.__esModule = true;
exports["default"] = exports.Icon = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var Icon = exports.Icon = function Icon() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "medium",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Search, null),
      placeholder: "search ..."
    }), /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Search, null),
      reverse: true,
      placeholder: "search ..."
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Input/TextInput/Icon'
};
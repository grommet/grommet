"use strict";

exports.__esModule = true;
exports["default"] = exports.ChildrenPlainOption = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var ChildrenPlainOption = exports.ChildrenPlainOption = function ChildrenPlainOption() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    options: {
      button: {
        childrenPlain: false
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small",
    color: "text-weak"
  }, "options.button.childrenPlain defaults to true. Setting it to false stops automatically forcing plain when Button has children."), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    hoverIndicator: "light-1",
    onClick: function onClick() {}
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Option false"))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    hoverIndicator: "light-1",
    plain: true,
    onClick: function onClick() {}
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Explicit plain"))))), /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    options: {
      button: {
        childrenPlain: false
      }
    },
    theme: {
      global: {
        font: {
          family: "-apple-system, BlinkMacSystemFont"
        }
      },
      button: {
        "default": {}
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small",
    color: "text-weak"
  }, "Same behavior applies for kind buttons."), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    hoverIndicator: "light-1",
    onClick: function onClick() {}
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Kind option false"))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    hoverIndicator: "light-1",
    plain: true,
    onClick: function onClick() {}
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Kind explicit plain"))))));
};
ChildrenPlainOption.storyName = 'Children Plain Option';
var _default = exports["default"] = {
  title: 'Controls/Button/Custom Themed/Children Plain Option'
};
"use strict";

exports.__esModule = true;
exports.useSizedIcon = void 0;
var _react = require("react");
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var useSizedIcon = exports.useSizedIcon = function useSizedIcon(icon, size, theme) {
  var _theme$icon;
  return icon && theme != null && (_theme$icon = theme.icon) != null && _theme$icon.matchSize && !icon.props.size ? /*#__PURE__*/(0, _react.cloneElement)(icon, {
    size: size
  }) : icon;
};
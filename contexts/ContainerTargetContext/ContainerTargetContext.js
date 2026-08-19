"use strict";

exports.__esModule = true;
exports.ContainerTargetContext = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var ContainerTargetContext = exports.ContainerTargetContext = /*#__PURE__*/_react["default"].createContext(typeof document === 'object' ? document.body : undefined);